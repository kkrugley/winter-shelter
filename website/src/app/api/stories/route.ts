import { NextRequest, NextResponse } from "next/server";
import { filterStories, submitStory } from "@/lib/stories";

export const runtime = "edge";

/** GET /api/stories?product_slug=cozy-shelter&country=BY */
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const product_slug = searchParams.get("product_slug") ?? undefined;
  const country = searchParams.get("country") ?? undefined;

  const stories = await filterStories({ product_slug, country });
  return NextResponse.json(stories);
}

/** POST /api/stories  — accepts a new submission */
export async function POST(req: NextRequest) {
  const body = await req.json();

  const required = ["author_name", "quote", "body", "product_slug", "city", "country"];
  for (const field of required) {
    if (!body[field]) {
      return NextResponse.json({ error: `Missing field: ${field}` }, { status: 400 });
    }
  }

  // Offset coordinates by up to 500 m in a random direction so the exact
  // shelter location is never stored (protects animals from bad actors).
  if (body.lat != null && body.lng != null) {
    const angle    = Math.random() * 2 * Math.PI;
    const distance = Math.random() * 500;
    const latRad   = (body.lat as number) * (Math.PI / 180);
    body.lat = (body.lat as number) + (distance / 111_000) * Math.cos(angle);
    body.lng = (body.lng as number) + (distance / (111_000 * Math.cos(latRad))) * Math.sin(angle);
  }

  const id = await submitStory(body);
  return NextResponse.json({ id }, { status: 201 });
}
