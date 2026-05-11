import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_BYTES = 10 * 1024 * 1024; // 10 MB

export async function POST(req: NextRequest) {
  const userkey = process.env.VGY_API;
  if (!userkey) {
    return NextResponse.json({ error: "Upload not configured" }, { status: 500 });
  }

  const incoming = await req.formData();
  const file = incoming.get("file");

  if (!file || typeof file === "string") {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: "Допустимые форматы: JPG, PNG, WEBP, GIF" }, { status: 400 });
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "Файл больше 10 МБ" }, { status: 400 });
  }

  const body = new FormData();
  body.append("file", file);
  body.append("userkey", userkey);

  const vgy = await fetch("https://vgy.me/upload", { method: "POST", body });
  const data = await vgy.json();

  if (data.error) {
    return NextResponse.json({ error: "Ошибка загрузки на хостинг" }, { status: 502 });
  }

  // vgy.me returns `image` as the direct CDN link (https://i.vgy.me/xxx.png)
  return NextResponse.json({ url: data.image as string });
}
