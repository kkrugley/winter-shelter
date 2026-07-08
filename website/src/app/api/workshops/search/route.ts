import { NextRequest, NextResponse } from "next/server";
import { getClientIp, createRateLimiter } from "@/lib/rate-limit";
import {
  SERVICE_TYPES,
  normalizeCity,
  getCachedSearch,
  isCacheFresh,
  recordSearch,
  getWorkshopCards,
  upsertWorkshop,
  attachService,
  type ServiceType,
} from "@/lib/workshops";
import { collectFromSources } from "@/lib/workshop-sources";

// Live searches hit external sources, so keep the limit tight.
const rateLimiter = createRateLimiter(10, 60_000);

/** POST /api/workshops/search — body { service, city, lat?, lng?, country? } */
export async function POST(req: NextRequest) {
  if (rateLimiter(getClientIp(req))) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: {
    service?: string;
    city?: string;
    lat?: number;
    lng?: number;
    country?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const service = body.service as ServiceType;
  if (!SERVICE_TYPES.includes(service)) {
    return NextResponse.json({ error: "Invalid service" }, { status: 400 });
  }
  const city = (body.city ?? "").trim();
  if (city.length < 2) {
    return NextResponse.json({ error: "City required" }, { status: 400 });
  }

  const cityNorm = normalizeCity(city);
  const country = body.country ?? null;
  const lat = body.lat ?? null;
  const lng = body.lng ?? null;

  try {
    // Step 2 — cache check.
    const cached = await getCachedSearch(cityNorm, service);
    if (cached && isCacheFresh(cached)) {
      await recordSearch({ city, cityNorm, country, service, lat, lng, liveRun: false });
      const cards = await getWorkshopCards(cityNorm, service);
      return NextResponse.json({ cards, fromCache: true });
    }

    // Step 3 — live fetch from external sources.
    const raws = await collectFromSources({ service, city, cityNorm, country, lat, lng });

    // Step 4 — persist (dedup handled in upsertWorkshop), each service pending.
    for (const raw of raws) {
      try {
        const id = await upsertWorkshop(raw);
        await attachService(id, service, "pending");
      } catch (err) {
        console.error("[workshops/search] persist failed", err);
      }
    }

    const cards = await getWorkshopCards(cityNorm, service);
    await recordSearch({
      city,
      cityNorm,
      country,
      service,
      lat,
      lng,
      liveRun: true,
      resultCount: cards.length,
    });

    return NextResponse.json({ cards, fromCache: false });
  } catch (err) {
    console.error("[/api/workshops/search POST]", err);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
