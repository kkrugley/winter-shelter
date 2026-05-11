import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

vi.mock("@/lib/stories", () => ({
  filterStories: vi.fn().mockResolvedValue([]),
  submitStory: vi.fn().mockResolvedValue(42),
}));

import { GET, POST } from "./route";
import { filterStories, submitStory } from "@/lib/stories";

const baseBody = {
  author_name: "Иван",
  quote: "Всё получилось",
  body: "Длинный текст истории",
  product_slug: "cozy",
  city: "Минск",
  country: "BY",
};

function makeRequest(method: string, body?: object, search?: string): NextRequest {
  const url = `http://localhost/api/stories${search ?? ""}`;
  return new NextRequest(url, {
    method,
    body: body ? JSON.stringify(body) : undefined,
    headers: body ? { "content-type": "application/json" } : undefined,
  });
}

describe("GET /api/stories", () => {
  beforeEach(() => vi.clearAllMocks());

  it("calls filterStories with no filters when no params", async () => {
    const res = await GET(makeRequest("GET"));
    expect(res.status).toBe(200);
    expect(filterStories).toHaveBeenCalledWith({ product_slug: undefined, country: undefined });
  });

  it("passes product_slug filter", async () => {
    await GET(makeRequest("GET", undefined, "?product_slug=cozy"));
    expect(filterStories).toHaveBeenCalledWith({ product_slug: "cozy", country: undefined });
  });

  it("passes both filters", async () => {
    await GET(makeRequest("GET", undefined, "?product_slug=cozy&country=BY"));
    expect(filterStories).toHaveBeenCalledWith({ product_slug: "cozy", country: "BY" });
  });

  it("returns 500 when filterStories throws", async () => {
    vi.mocked(filterStories).mockRejectedValueOnce(new Error("db down"));
    const res = await GET(makeRequest("GET"));
    expect(res.status).toBe(500);
    const json = await res.json();
    expect(json).toHaveProperty("error");
  });
});

describe("POST /api/stories — validation", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns 400 when author_name is missing", async () => {
    const { author_name: _, ...noName } = baseBody;
    const res = await POST(makeRequest("POST", noName));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toMatch(/author_name/);
  });

  it("returns 400 when quote is missing", async () => {
    const { quote: _, ...noQuote } = baseBody;
    const res = await POST(makeRequest("POST", noQuote));
    expect(res.status).toBe(400);
  });

  it("returns 201 with id on valid submission", async () => {
    const res = await POST(makeRequest("POST", baseBody));
    expect(res.status).toBe(201);
    const json = await res.json();
    expect(json).toEqual({ id: 42 });
  });
});

describe("POST /api/stories — coordinate offsetting", () => {
  beforeEach(() => vi.clearAllMocks());

  it("offsets lat/lng when provided", async () => {
    const body = { ...baseBody, lat: 53.9, lng: 27.5 };
    await POST(makeRequest("POST", body));
    const [submitted] = vi.mocked(submitStory).mock.calls[0];
    expect(submitted.lat).not.toBe(53.9);
    expect(submitted.lng).not.toBe(27.5);
  });

  it("offset stays within ±0.01 degrees (~1 km) of origin", async () => {
    const lat = 53.9;
    const lng = 27.5;
    const body = { ...baseBody, lat, lng };
    await POST(makeRequest("POST", body));
    const [submitted] = vi.mocked(submitStory).mock.calls[0];
    expect(Math.abs((submitted.lat ?? 0) - lat)).toBeLessThan(0.01);
    expect(Math.abs((submitted.lng ?? 0) - lng)).toBeLessThan(0.05);
  });

  it("does not produce Infinity at lat=90 (pole)", async () => {
    const body = { ...baseBody, lat: 90, lng: 0 };
    const res = await POST(makeRequest("POST", body));
    expect(res.status).toBe(201);
    const [submitted] = vi.mocked(submitStory).mock.calls[0];
    expect(isFinite(submitted.lng ?? NaN)).toBe(true);
  });

  it("passes null lat/lng through unchanged when not provided", async () => {
    await POST(makeRequest("POST", baseBody));
    const [submitted] = vi.mocked(submitStory).mock.calls[0];
    expect(submitted.lat).toBeUndefined();
    expect(submitted.lng).toBeUndefined();
  });
});
