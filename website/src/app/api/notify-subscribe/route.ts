import { NextRequest, NextResponse } from "next/server";

const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY ?? "";
const MAILERLITE_GROUP_ID = process.env.MAILERLITE_GROUP_ID ?? "";

export async function POST(req: NextRequest) {
  if (!MAILERLITE_API_KEY) {
    return NextResponse.json({ error: "Not configured" }, { status: 503 });
  }

  let email: string;
  let productSlug: string | undefined;

  try {
    const body = await req.json();
    email = (body.email ?? "").trim().toLowerCase();
    productSlug = body.productSlug ?? undefined;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 422 });
  }

  const payload: Record<string, unknown> = {
    email,
    fields: productSlug ? { product_interest: productSlug } : {},
    groups: MAILERLITE_GROUP_ID ? [MAILERLITE_GROUP_ID] : [],
    status: "active",
  };

  const res = await fetch("https://connect.mailerlite.com/api/subscribers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${MAILERLITE_API_KEY}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("[notify-subscribe] MailerLite error", res.status, text);
    return NextResponse.json({ error: "Subscription failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
