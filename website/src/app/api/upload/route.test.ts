import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { NextRequest } from "next/server";

function makeFile(opts: { type?: string; size?: number; name?: string }): File {
  const { type = "image/jpeg", size = 1024, name = "photo.jpg" } = opts;
  const content = new Uint8Array(size);
  return new File([content], name, { type });
}

function makeUploadRequest(file: File | null): NextRequest {
  const form = new FormData();
  if (file) form.append("file", file);
  return new NextRequest("http://localhost/api/upload", {
    method: "POST",
    body: form,
  });
}

describe("POST /api/upload", () => {
  const originalEnv = process.env.VGY_API;

  beforeEach(() => {
    process.env.VGY_API = "test-api-key";
  });

  afterEach(() => {
    process.env.VGY_API = originalEnv;
    vi.restoreAllMocks();
  });

  it("returns 500 when VGY_API env is not set", async () => {
    delete process.env.VGY_API;
    const { POST } = await import("./route");
    const res = await POST(makeUploadRequest(makeFile({})));
    expect(res.status).toBe(500);
  });

  it("returns 400 when no file is provided", async () => {
    const { POST } = await import("./route");
    const res = await POST(makeUploadRequest(null));
    expect(res.status).toBe(400);
  });

  it("returns 400 for disallowed mime type", async () => {
    const { POST } = await import("./route");
    const file = makeFile({ type: "text/plain", name: "hack.txt" });
    const res = await POST(makeUploadRequest(file));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toMatch(/JPG|PNG|WEBP|GIF/);
  });

  it("returns 400 when file exceeds 10 MB", async () => {
    const { POST } = await import("./route");
    const file = makeFile({ size: 11 * 1024 * 1024 });
    const res = await POST(makeUploadRequest(file));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toMatch(/10/);
  });

  it("returns 200 with url on successful upload", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      json: async () => ({ error: false, image: "https://i.vgy.me/abc.jpg" }),
    }));
    const { POST } = await import("./route");
    const file = makeFile({ type: "image/jpeg", size: 500 * 1024 });
    const res = await POST(makeUploadRequest(file));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.url).toBe("https://i.vgy.me/abc.jpg");
  });

  it("returns 502 when vgy.me reports an error", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      json: async () => ({ error: true }),
    }));
    const { POST } = await import("./route");
    const file = makeFile({ type: "image/png", size: 100 });
    const res = await POST(makeUploadRequest(file));
    expect(res.status).toBe(502);
  });
});
