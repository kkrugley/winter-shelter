import type { RawWorkshop, ServiceType } from "../workshops";
import { fromOsm } from "./osm";
import { fromWebSearch } from "./websearch";

export interface SourceQuery {
  service: ServiceType;
  city: string;
  cityNorm: string;
  country?: string | null;
  lat?: number | null;
  lng?: number | null;
}

export type SourceAdapter = (q: SourceQuery) => Promise<RawWorkshop[]>;

/** RU search keywords per service — used to build external queries. */
export const SERVICE_KEYWORDS: Record<ServiceType, string[]> = {
  laser: ["лазерная резка фанеры", "лазерная резка", "лазерная гравировка"],
  milling: ["фрезеровка ЧПУ фанеры", "фрезеровка ЧПУ", "фрезеровка", "ЧПУ станок"],
  "3d-print": ["3D печать", "3D-печать"],
};

const PER_SOURCE_TIMEOUT_MS = 8_000;

/** fetch() with an abort-based timeout; adapters stay responsive on slow sources. */
export async function fetchWithTimeout(
  url: string,
  init: RequestInit = {},
  timeoutMs = PER_SOURCE_TIMEOUT_MS,
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Fan out to every source in parallel (pipeline step 3). Each adapter is
 * best-effort: it returns [] when its key is missing or it errors, so the
 * overall search degrades gracefully (OSM always works, needs no key).
 */
export async function collectFromSources(q: SourceQuery): Promise<RawWorkshop[]> {
  const adapters: SourceAdapter[] = [fromOsm, fromWebSearch];

  const settled = await Promise.allSettled(adapters.map((a) => a(q)));
  const results: RawWorkshop[] = [];
  for (const s of settled) {
    if (s.status === "fulfilled") results.push(...s.value);
  }
  return results;
}
