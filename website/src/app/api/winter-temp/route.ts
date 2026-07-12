import { NextRequest, NextResponse } from "next/server";
import { getClientIp, createRateLimiter } from "@/lib/rate-limit";

const rateLimiter = createRateLimiter(20, 60_000);

const CACHE_TTL_MS = 24 * 60 * 60 * 1000;
const cache = new Map<string, { value: number; expires: number }>();

const WINTER_MONTHS = new Set([12, 1, 2]);
const YEARS_BACK = 5;

function cacheKey(lat: number, lon: number): string {
  return `${lat.toFixed(1)},${lon.toFixed(1)}`;
}

export async function GET(req: NextRequest) {
  if (rateLimiter(getClientIp(req))) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const latHeader = req.headers.get("x-vercel-ip-latitude");
  const lonHeader = req.headers.get("x-vercel-ip-longitude");
  if (!latHeader || !lonHeader) {
    return NextResponse.json({ error: "No geolocation available" }, { status: 404 });
  }

  const latitude = Number(latHeader);
  const longitude = Number(lonHeader);
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    return NextResponse.json({ error: "Invalid geolocation" }, { status: 400 });
  }

  const key = cacheKey(latitude, longitude);
  const cached = cache.get(key);
  if (cached && cached.expires > Date.now()) {
    return NextResponse.json({ tempC: cached.value });
  }

  const now = new Date();
  const startDate = `${now.getUTCFullYear() - YEARS_BACK}-12-01`;
  const endDate = `${now.getUTCFullYear()}-02-28`;

  const url = new URL("https://archive-api.open-meteo.com/v1/archive");
  url.searchParams.set("latitude", String(latitude));
  url.searchParams.set("longitude", String(longitude));
  url.searchParams.set("start_date", startDate);
  url.searchParams.set("end_date", endDate);
  url.searchParams.set("daily", "temperature_2m_min");
  url.searchParams.set("timezone", "auto");

  let upstream: Response;
  try {
    upstream = await fetch(url.toString());
  } catch {
    return NextResponse.json({ error: "Weather service unavailable" }, { status: 502 });
  }

  if (!upstream.ok) {
    return NextResponse.json({ error: "Weather service unavailable" }, { status: 502 });
  }

  const data = await upstream.json();
  const dates: string[] = data?.daily?.time ?? [];
  const mins: (number | null)[] = data?.daily?.temperature_2m_min ?? [];

  const winterMins: number[] = [];
  for (let i = 0; i < dates.length; i++) {
    const month = Number(dates[i].slice(5, 7));
    const value = mins[i];
    if (WINTER_MONTHS.has(month) && typeof value === "number") {
      winterMins.push(value);
    }
  }

  if (winterMins.length === 0) {
    return NextResponse.json({ error: "No winter data" }, { status: 404 });
  }

  const average = winterMins.reduce((sum, v) => sum + v, 0) / winterMins.length;
  const tempC = Math.round(average);

  cache.set(key, { value: tempC, expires: Date.now() + CACHE_TTL_MS });

  return NextResponse.json({ tempC });
}
