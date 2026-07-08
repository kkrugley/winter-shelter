import { sql } from "./db";

// ── Domain vocabularies ──────────────────────────────────────
export type ServiceType = "laser" | "milling" | "3d-print";
export type WorkshopSource = "vk" | "avito" | "kufar" | "osm" | "manual";
export type ServiceStatus = "pending" | "confirmed" | "hidden";
export type VoteValue = "relevant" | "irrelevant";

export const SERVICE_TYPES: ServiceType[] = ["laser", "milling", "3d-print"];

// ── Tunables ─────────────────────────────────────────────────
export const CACHE_TTL_DAYS = 30; // how long a live search stays "fresh"
export const MIN_CACHED_RESULTS = 4; // fewer than this → re-run live search
export const HIDE_STREAK = 3; // consecutive "irrelevant" votes that hide a card
export const GRID_LIMIT = 8; // 4×2 card grid

// ── Row shapes ───────────────────────────────────────────────
export interface Workshop {
  id: number;
  created_at: string;
  last_seen_at: string;
  source: WorkshopSource;
  source_url: string | null;
  source_ref: string | null;
  name: string | null;
  phone: string | null;
  website: string | null;
  address: string | null;
  description: string | null;
  city: string;
  city_norm: string;
  country: string | null;
  lat: number | null;
  lng: number | null;
}

/** workshops × workshop_services join — one card in the results grid. */
export interface WorkshopCard {
  workshop_service_id: number;
  workshop_id: number;
  service: ServiceType;
  status: ServiceStatus;
  relevant_votes: number;
  name: string | null;
  source: WorkshopSource;
  source_url: string | null;
  website: string | null;
  address: string | null;
  description: string | null;
  city: string;
}

export interface SearchQueryRow {
  id: number;
  created_at: string;
  searched_at: string;
  city: string;
  city_norm: string;
  country: string | null;
  service: ServiceType;
  lat: number | null;
  lng: number | null;
  result_count: number;
  search_count: number;
}

/** Normalized workshop coming out of an external-source adapter. */
export interface RawWorkshop {
  source: WorkshopSource;
  source_url?: string | null;
  source_ref?: string | null;
  name?: string | null;
  phone?: string | null;
  website?: string | null;
  address?: string | null;
  description?: string | null;
  city: string;
  country?: string | null;
  lat?: number | null;
  lng?: number | null;
}

export interface ManualWorkshopSubmission {
  name: string;
  contact: string; // free-form: website / social / phone
  services: ServiceType[];
  comment?: string;
  city: string;
  country?: string;
  lat?: number;
  lng?: number;
}

// ── Normalizers (cache & dedup keys) ─────────────────────────
export function normalizeCity(city: string): string {
  return city.trim().toLowerCase();
}

/** Digits-only phone with a leading "+", or null if there's nothing usable. */
export function normalizePhone(phone?: string | null): string | null {
  if (!phone) return null;
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 6 ? `+${digits}` : null;
}

// ── Cache bookkeeping (pipeline step 2) ──────────────────────
export async function getCachedSearch(
  cityNorm: string,
  service: ServiceType,
): Promise<SearchQueryRow | null> {
  const rows = await sql`
    SELECT * FROM search_queries
    WHERE city_norm = ${cityNorm} AND service = ${service}
    LIMIT 1
  `;
  return (rows[0] as SearchQueryRow) ?? null;
}

/** Fresh = searched recently AND yielded enough results to serve from cache. */
export function isCacheFresh(row: SearchQueryRow): boolean {
  const ageMs = Date.now() - new Date(row.searched_at).getTime();
  const withinTtl = ageMs < CACHE_TTL_DAYS * 24 * 60 * 60 * 1000;
  return withinTtl && row.result_count >= MIN_CACHED_RESULTS;
}

/**
 * Upsert the cache row for a (city, service). Pass `liveRun: true` when we
 * actually hit external sources so `searched_at`/`result_count` are refreshed;
 * a cache hit only bumps `search_count`.
 */
export async function recordSearch(opts: {
  city: string;
  cityNorm: string;
  country?: string | null;
  service: ServiceType;
  lat?: number | null;
  lng?: number | null;
  liveRun: boolean;
  resultCount?: number;
}): Promise<void> {
  const { city, cityNorm, country, service, lat, lng, liveRun, resultCount } = opts;
  await sql`
    INSERT INTO search_queries
      (city, city_norm, country, service, lat, lng, result_count, search_count, searched_at)
    VALUES
      (${city}, ${cityNorm}, ${country ?? null}, ${service}, ${lat ?? null}, ${lng ?? null},
       ${resultCount ?? 0}, 1, NOW())
    ON CONFLICT (city_norm, service) DO UPDATE SET
      search_count = search_queries.search_count + 1,
      searched_at  = CASE WHEN ${liveRun} THEN NOW() ELSE search_queries.searched_at END,
      result_count = CASE WHEN ${liveRun} THEN ${resultCount ?? 0} ELSE search_queries.result_count END,
      country      = COALESCE(${country ?? null}, search_queries.country),
      lat          = COALESCE(${lat ?? null}, search_queries.lat),
      lng          = COALESCE(${lng ?? null}, search_queries.lng)
  `;
}

// ── Listing (pipeline step 5) ────────────────────────────────
/** Cards for a city+service: confirmed & pending only, confirmed first. */
export async function getWorkshopCards(
  cityNorm: string,
  service: ServiceType,
  limit: number = GRID_LIMIT,
): Promise<WorkshopCard[]> {
  const rows = await sql`
    SELECT
      s.id            AS workshop_service_id,
      w.id            AS workshop_id,
      s.service,
      s.status,
      s.relevant_votes,
      w.name,
      w.source,
      w.source_url,
      w.website,
      w.address,
      w.description,
      w.city
    FROM workshop_services s
    JOIN workshops w ON w.id = s.workshop_id
    WHERE w.city_norm = ${cityNorm}
      AND s.service = ${service}
      AND s.status <> 'hidden'
    ORDER BY (s.status = 'confirmed') DESC, s.relevant_votes DESC, w.created_at DESC
    LIMIT ${limit}
  `;
  return rows as WorkshopCard[];
}

// ── Writes (pipeline step 4) ─────────────────────────────────
/** Insert a workshop, deduping by source_url then normalized phone. Returns its id. */
export async function upsertWorkshop(raw: RawWorkshop): Promise<number> {
  const phone = normalizePhone(raw.phone);
  const cityNorm = normalizeCity(raw.city);

  if (raw.source_url) {
    const hit = await sql`SELECT id FROM workshops WHERE source_url = ${raw.source_url} LIMIT 1`;
    if (hit[0]) return bumpSeen((hit[0] as { id: number }).id);
  }
  if (phone) {
    const hit = await sql`SELECT id FROM workshops WHERE phone = ${phone} LIMIT 1`;
    if (hit[0]) return bumpSeen((hit[0] as { id: number }).id);
  }

  try {
    const rows = await sql`
      INSERT INTO workshops
        (source, source_url, source_ref, name, phone, website, address, description,
         city, city_norm, country, lat, lng)
      VALUES
        (${raw.source}, ${raw.source_url ?? null}, ${raw.source_ref ?? null}, ${raw.name ?? null},
         ${phone}, ${raw.website ?? null}, ${raw.address ?? null}, ${raw.description ?? null},
         ${raw.city}, ${cityNorm}, ${raw.country ?? null}, ${raw.lat ?? null}, ${raw.lng ?? null})
      RETURNING id
    `;
    return (rows[0] as { id: number }).id;
  } catch {
    // Concurrent insert tripped a partial unique index — re-select the winner.
    if (raw.source_url) {
      const hit = await sql`SELECT id FROM workshops WHERE source_url = ${raw.source_url} LIMIT 1`;
      if (hit[0]) return bumpSeen((hit[0] as { id: number }).id);
    }
    if (phone) {
      const hit = await sql`SELECT id FROM workshops WHERE phone = ${phone} LIMIT 1`;
      if (hit[0]) return bumpSeen((hit[0] as { id: number }).id);
    }
    throw new Error("Failed to upsert workshop");
  }
}

async function bumpSeen(id: number): Promise<number> {
  await sql`UPDATE workshops SET last_seen_at = NOW() WHERE id = ${id}`;
  return id;
}

/** Attach a service to a workshop (idempotent). */
export async function attachService(
  workshopId: number,
  service: ServiceType,
  status: ServiceStatus = "pending",
): Promise<void> {
  await sql`
    INSERT INTO workshop_services (workshop_id, service, status)
    VALUES (${workshopId}, ${service}, ${status})
    ON CONFLICT (workshop_id, service) DO NOTHING
  `;
}

/**
 * Record a vote and recompute the service's status atomically (pipeline step 7).
 * Rules: any "relevant" → confirmed, streak reset; HIDE_STREAK consecutive
 * "irrelevant" with zero relevant → hidden. A duplicate voter is a no-op.
 * Returns the resulting status and whether the vote was actually counted.
 */
export async function castVote(
  workshopServiceId: number,
  voterHash: string,
  vote: VoteValue,
): Promise<{ status: ServiceStatus; counted: boolean } | null> {
  const rows = await sql`
    WITH ins AS (
      INSERT INTO workshop_votes (workshop_service_id, voter_hash, vote)
      VALUES (${workshopServiceId}, ${voterHash}, ${vote})
      ON CONFLICT (workshop_service_id, voter_hash) DO NOTHING
      RETURNING vote
    ),
    upd AS (
      UPDATE workshop_services s SET
        relevant_votes    = s.relevant_votes   + (SELECT count(*) FROM ins WHERE vote = 'relevant'),
        irrelevant_votes  = s.irrelevant_votes + (SELECT count(*) FROM ins WHERE vote = 'irrelevant'),
        irrelevant_streak = CASE
          WHEN (SELECT vote FROM ins) = 'relevant'   THEN 0
          WHEN (SELECT vote FROM ins) = 'irrelevant' THEN s.irrelevant_streak + 1
          ELSE s.irrelevant_streak END,
        status = CASE
          WHEN (SELECT vote FROM ins) = 'relevant' THEN 'confirmed'
          WHEN (SELECT vote FROM ins) = 'irrelevant'
               AND s.relevant_votes = 0
               AND s.irrelevant_streak + 1 >= ${HIDE_STREAK} THEN 'hidden'
          ELSE s.status END,
        updated_at = NOW()
      WHERE s.id = ${workshopServiceId} AND EXISTS (SELECT 1 FROM ins)
      RETURNING status
    )
    SELECT
      COALESCE(
        (SELECT status FROM upd),
        (SELECT status FROM workshop_services WHERE id = ${workshopServiceId})
      ) AS status,
      EXISTS (SELECT 1 FROM ins) AS counted
  `;
  const row = rows[0] as { status: ServiceStatus | null; counted: boolean } | undefined;
  if (!row || row.status === null) return null; // unknown service id
  return { status: row.status, counted: row.counted };
}

export interface ServiceVoteState {
  status: ServiceStatus;
  relevant_votes: number;
  irrelevant_votes: number;
  irrelevant_streak: number;
}

/**
 * Pure mirror of the status recompute performed in `castVote`'s SQL. Kept in
 * sync with that query and exported so the transition rules are unit-testable.
 */
export function reduceServiceState(s: ServiceVoteState, vote: VoteValue): ServiceVoteState {
  if (vote === "relevant") {
    return { ...s, relevant_votes: s.relevant_votes + 1, irrelevant_streak: 0, status: "confirmed" };
  }
  const irrelevant_streak = s.irrelevant_streak + 1;
  const status: ServiceStatus =
    s.relevant_votes === 0 && irrelevant_streak >= HIDE_STREAK ? "hidden" : s.status;
  return { ...s, irrelevant_votes: s.irrelevant_votes + 1, irrelevant_streak, status };
}

/** Manual submission from the /find-workshop/add form — services go in confirmed. */
export async function submitManualWorkshop(data: ManualWorkshopSubmission): Promise<number> {
  const looksLikeUrl = /^https?:\/\//i.test(data.contact.trim());
  const id = await upsertWorkshop({
    source: "manual",
    source_url: looksLikeUrl ? data.contact.trim() : null,
    website: looksLikeUrl ? data.contact.trim() : null,
    phone: looksLikeUrl ? null : data.contact,
    name: data.name,
    description: data.comment ?? null,
    city: data.city,
    country: data.country ?? null,
    lat: data.lat ?? null,
    lng: data.lng ?? null,
  });
  for (const service of data.services) {
    await attachService(id, service, "confirmed");
  }
  return id;
}
