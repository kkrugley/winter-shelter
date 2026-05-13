import { NextRequest, NextResponse } from "next/server";
import { submitIdea } from "@/lib/ideas";

/** POST /api/ideas — accepts a new idea submission */
export async function POST(req: NextRequest) {
  const body = await req.json();

  const required = ["author_name", "title", "description"];
  for (const field of required) {
    if (!body[field]) {
      return NextResponse.json({ error: `Missing field: ${field}` }, { status: 400 });
    }
  }

  try {
    const id = await submitIdea(body);
    return NextResponse.json({ id }, { status: 201 });
  } catch (err) {
    console.error("[/api/ideas POST]", err);
    return NextResponse.json({ error: "Failed to submit idea" }, { status: 500 });
  }
}
