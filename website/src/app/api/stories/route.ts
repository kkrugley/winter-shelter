import { NextRequest, NextResponse } from "next/server";
import { filterStories, submitStory } from "@/lib/stories";
import { getClientIp, createRateLimiter } from "@/lib/rate-limit";

const rateLimiter = createRateLimiter(5, 60_000);

/** GET /api/stories?product_slug=cozy-shelter&country=BY */
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const product_slug = searchParams.get("product_slug") ?? undefined;
  const country = searchParams.get("country") ?? undefined;

  try {
    const stories = await filterStories({ product_slug, country });
    return NextResponse.json(stories);
  } catch (err) {
    console.error("[/api/stories GET]", err);
    return NextResponse.json({ error: "Failed to load stories" }, { status: 500 });
  }
}

const FIELD_LIMITS: Record<string, number> = {
  author_name:   100,
  quote:         300,
  body:         1000,
  product_slug:  100,
  city:          100,
  country:        10,
  telegram:       50,
  photo_url:     300,
  installed_date: 10,
};

/** POST /api/stories  — accepts a new submission */
export async function POST(req: NextRequest) {
  if (rateLimiter(getClientIp(req))) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const contentLength = Number(req.headers.get("content-length") ?? 0);
  if (contentLength > 50_000) {
    return NextResponse.json({ error: "Request too large" }, { status: 413 });
  }

  const body = await req.json();

  const required = ["author_name", "quote", "body", "product_slug", "city", "country"];
  for (const field of required) {
    if (!body[field]) {
      return NextResponse.json({ error: `Missing field: ${field}` }, { status: 400 });
    }
  }

  for (const [field, max] of Object.entries(FIELD_LIMITS)) {
    if (typeof body[field] === "string" && body[field].length > max) {
      return NextResponse.json({ error: `Field too long: ${field}` }, { status: 400 });
    }
  }

  // Offset coordinates by up to 500 m in a random direction so the exact
  // shelter location is never stored (protects animals from bad actors).
  if (body.lat != null && body.lng != null) {
    const angle    = Math.random() * 2 * Math.PI;
    const distance = Math.random() * 500;
    const latRad   = (body.lat as number) * (Math.PI / 180);
    const cosLat   = Math.cos(latRad);
    body.lat = (body.lat as number) + (distance / 111_000) * Math.cos(angle);
    // NOTE: clamp cosLat to avoid division by near-zero at poles (lat ≈ ±90°)
    body.lng = (body.lng as number) + (distance / (111_000 * Math.max(Math.abs(cosLat), 0.001))) * Math.sin(angle);
  }

  try {
    const id = await submitStory(body);
    return NextResponse.json({ id }, { status: 201 });
  } catch (err) {
    console.error("[/api/stories POST]", err);
    return NextResponse.json({ error: "Failed to submit story" }, { status: 500 });
  }
}
