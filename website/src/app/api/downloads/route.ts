import { NextResponse } from "next/server";
import { logDownload } from "@/lib/stats";
import { getPostHogClient } from "@/lib/posthog-server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const productSlug = (body as { product_slug?: string }).product_slug ?? null;
  await logDownload(productSlug);

  const posthog = getPostHogClient();
  posthog.capture({
    distinctId: "anonymous",
    event: "download_recorded",
    properties: { product_slug: productSlug },
  });

  return NextResponse.json({ ok: true });
}
