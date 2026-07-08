import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { getClientIp, createRateLimiter } from "@/lib/rate-limit";
import { castVote, type VoteValue } from "@/lib/workshops";

const rateLimiter = createRateLimiter(30, 60_000);
const VOTE_SALT = process.env.VOTE_SALT ?? "safepaws-workshop-votes";

/** Stable per-voter token: one vote per IP per service, no raw IP stored. */
function voterHash(ip: string): string {
  return createHash("sha256").update(`${VOTE_SALT}:${ip}`).digest("hex");
}

/** POST /api/workshops/vote — body { workshop_service_id, vote } */
export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  if (rateLimiter(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: { workshop_service_id?: number; vote?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const id = Number(body.workshop_service_id);
  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ error: "Invalid workshop_service_id" }, { status: 400 });
  }
  const vote = body.vote as VoteValue;
  if (vote !== "relevant" && vote !== "irrelevant") {
    return NextResponse.json({ error: "Invalid vote" }, { status: 400 });
  }

  try {
    const result = await castVote(id, voterHash(ip), vote);
    if (!result) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(result);
  } catch (err) {
    console.error("[/api/workshops/vote POST]", err);
    return NextResponse.json({ error: "Vote failed" }, { status: 500 });
  }
}
