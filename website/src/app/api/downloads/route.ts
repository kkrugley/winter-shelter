import { NextResponse } from "next/server";
import { logDownload } from "@/lib/stats";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  await logDownload((body as { product_slug?: string }).product_slug ?? null);
  return NextResponse.json({ ok: true });
}
