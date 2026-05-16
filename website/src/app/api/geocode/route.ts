import { NextRequest, NextResponse } from "next/server";
import { getClientIp, createRateLimiter } from "@/lib/rate-limit";

const rateLimiter = createRateLimiter(20, 60_000);

// Nominatim ToS requires a User-Agent that identifies the application and contact
const USER_AGENT = "SafePaws/1.0 (https://safepaws.ru; contact@safepaws.ru)";

export async function GET(req: NextRequest) {
  if (rateLimiter(getClientIp(req))) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const q = req.nextUrl.searchParams.get("q");
  if (!q || q.trim().length < 3) {
    return NextResponse.json({ error: "Query too short" }, { status: 400 });
  }

  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("q", q);
  url.searchParams.set("format", "json");
  url.searchParams.set("addressdetails", "1");
  url.searchParams.set("limit", "5");
  url.searchParams.set("featuretype", "city");

  const upstream = await fetch(url.toString(), {
    headers: {
      "User-Agent": USER_AGENT,
      "Accept-Language": req.headers.get("accept-language") ?? "ru",
    },
  });

  if (!upstream.ok) {
    return NextResponse.json({ error: "Geocoding service unavailable" }, { status: 502 });
  }

  const data = await upstream.json();
  return NextResponse.json(data);
}
