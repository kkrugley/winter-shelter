import type { RawWorkshop } from "../workshops";
import { SERVICE_KEYWORDS, type SourceAdapter } from "./index";
import { firecrawlSearch } from "./firecrawl";

/**
 * General web search via Firecrawl (their "поиск в сети" product), scoped to
 * the searched city. Replaces the old per-site (VK/Avito/Kufar) adapters.
 * Returns [] without FIRECRAWL_API_KEY.
 */
export const fromWebSearch: SourceAdapter = async (q) => {
  const keyword = SERVICE_KEYWORDS[q.service][0];
  const query = `${keyword} ${q.city}`;
  const location = q.country ? `${q.city}, ${q.country}` : q.city;

  const results = await firecrawlSearch(query, location);
  return results
    .filter((r) => r.url)
    .map((r): RawWorkshop => ({
      source: "web",
      source_url: r.url!,
      name: r.title ?? null,
      phone: r.phone ?? null,
      description: r.description ?? null,
      city: q.city,
      country: q.country ?? null,
    }));
};
