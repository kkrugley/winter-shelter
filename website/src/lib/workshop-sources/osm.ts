import type { RawWorkshop } from "../workshops";
import { fetchWithTimeout, SERVICE_KEYWORDS, type SourceAdapter } from "./index";

const OVERPASS_URL = "https://overpass-api.de/api/interpreter";
const SEARCH_RADIUS_M = 25_000;
const MAX_RESULTS = 40;

interface OverpassElement {
  type: "node" | "way" | "relation";
  id: number;
  lat?: number;
  lon?: number;
  center?: { lat: number; lon: number };
  tags?: Record<string, string>;
}

function buildAddress(tags: Record<string, string>): string | null {
  const parts = [
    tags["addr:street"],
    tags["addr:housenumber"],
    tags["addr:city"],
  ].filter(Boolean);
  return parts.length ? parts.join(", ") : null;
}

/**
 * OpenStreetMap via the Overpass API — free, no key. Best-effort: matches
 * makerspaces plus features whose name contains a service keyword, within a
 * radius of the geocoded city center.
 */
export const fromOsm: SourceAdapter = async (q) => {
  if (q.lat == null || q.lng == null) return [];

  const keywordRe = SERVICE_KEYWORDS[q.service]
    .map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|");

  const around = `around:${SEARCH_RADIUS_M},${q.lat},${q.lng}`;
  const ql = `[out:json][timeout:8];
(
  nwr(${around})[name~"${keywordRe}",i];
  nwr(${around})[leisure=hackerspace];
  nwr(${around})[craft=metal_construction];
);
out center ${MAX_RESULTS};`;

  const res = await fetchWithTimeout(OVERPASS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `data=${encodeURIComponent(ql)}`,
  });
  if (!res.ok) return [];

  const data = (await res.json()) as { elements?: OverpassElement[] };
  const out: RawWorkshop[] = [];

  for (const el of data.elements ?? []) {
    const tags = el.tags ?? {};
    const name = tags.name;
    if (!name) continue;

    const lat = el.lat ?? el.center?.lat ?? null;
    const lon = el.lon ?? el.center?.lon ?? null;

    out.push({
      source: "osm",
      source_url: `https://www.openstreetmap.org/${el.type}/${el.id}`,
      source_ref: `${el.type}/${el.id}`,
      name,
      phone: tags["contact:phone"] ?? tags.phone ?? null,
      website: tags["contact:website"] ?? tags.website ?? null,
      address: buildAddress(tags),
      description: tags.description ?? null,
      city: q.city,
      country: q.country ?? null,
      lat,
      lng: lon,
    });
  }
  return out;
};
