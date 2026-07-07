import { NextRequest, NextResponse } from "next/server";
import { submitIdea } from "@/lib/ideas";
import { getClientIp, createRateLimiter } from "@/lib/rate-limit";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { getPostHogClient } from "@/lib/posthog-server";

const rateLimiter = createRateLimiter(5, 60_000);

const FIELD_LIMITS: Record<string, number> = {
  author_name:  100,
  title:        200,
  description: 2000,
  photo_url:    300,
};

/** POST /api/ideas — accepts a new idea submission */
export async function POST(req: NextRequest) {
  if (rateLimiter(getClientIp(req))) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const contentLength = Number(req.headers.get("content-length") ?? 0);
  if (contentLength > 50_000) {
    return NextResponse.json({ error: "Request too large" }, { status: 413 });
  }

  const body = await req.json();

  const token = body["cf-turnstile-response"] ?? "";
  const verification = await verifyTurnstileToken(token);
  if (!verification.success) {
    return NextResponse.json({ error: "Bot verification failed" }, { status: 403 });
  }

  const required = ["author_name", "title", "description"];
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

  try {
    const id = await submitIdea(body);
    const posthog = getPostHogClient();
    posthog.capture({
      distinctId: "anonymous",
      event: "idea_created",
      properties: {
        category: body.category ?? undefined,
        has_photo: Boolean(body.photo_url),
      },
    });
    return NextResponse.json({ id }, { status: 201 });
  } catch (err) {
    console.error("[/api/ideas POST]", err);
    return NextResponse.json({ error: "Failed to submit idea" }, { status: 500 });
  }
}
