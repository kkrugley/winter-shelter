import { NextRequest, NextResponse } from "next/server";
import { getClientIp, createRateLimiter } from "@/lib/rate-limit";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { getPostHogClient } from "@/lib/posthog-server";
import {
  SERVICE_TYPES,
  submitManualWorkshop,
  type ServiceType,
} from "@/lib/workshops";

const rateLimiter = createRateLimiter(5, 60_000);

const FIELD_LIMITS: Record<string, number> = {
  name: 120,
  contact: 300,
  website: 300,
  comment: 1000,
  city: 100,
  country: 2,
};

/** POST /api/workshops/add — manual submission, services stored as confirmed. */
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

  for (const field of ["name", "contact", "city"] as const) {
    if (!body[field] || typeof body[field] !== "string" || !body[field].trim()) {
      return NextResponse.json({ error: `Missing field: ${field}` }, { status: 400 });
    }
  }
  for (const [field, max] of Object.entries(FIELD_LIMITS)) {
    if (typeof body[field] === "string" && body[field].length > max) {
      return NextResponse.json({ error: `Field too long: ${field}` }, { status: 400 });
    }
  }

  const services = (Array.isArray(body.services) ? body.services : []).filter(
    (s: unknown): s is ServiceType => SERVICE_TYPES.includes(s as ServiceType),
  );
  if (services.length === 0) {
    return NextResponse.json({ error: "Select at least one service" }, { status: 400 });
  }

  try {
    const id = await submitManualWorkshop({
      name: body.name,
      contact: body.contact,
      website: typeof body.website === "string" ? body.website : undefined,
      services,
      comment: typeof body.comment === "string" ? body.comment : undefined,
      city: body.city,
      country: typeof body.country === "string" ? body.country : undefined,
      lat: typeof body.lat === "number" ? body.lat : undefined,
      lng: typeof body.lng === "number" ? body.lng : undefined,
    });

    getPostHogClient().capture({
      distinctId: "anonymous",
      event: "workshop_created",
      properties: { city: body.city, services },
    });

    return NextResponse.json({ id }, { status: 201 });
  } catch (err) {
    console.error("[/api/workshops/add POST]", err);
    return NextResponse.json({ error: "Failed to submit workshop" }, { status: 500 });
  }
}
