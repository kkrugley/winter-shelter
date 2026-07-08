import type { RawWorkshop } from "../workshops";
import { SERVICE_KEYWORDS, type SourceAdapter } from "./index";
import { firecrawlListings } from "./firecrawl";

/**
 * Kufar service listings (Belarus) via Firecrawl. Only invoked for BY by the
 * orchestrator; returns [] without FIRECRAWL_API_KEY.
 */
export const fromKufar: SourceAdapter = async (q) => {
  const keyword = SERVICE_KEYWORDS[q.service][0];
  const search = new URL("https://www.kufar.by/l/uslugi");
  search.searchParams.set("query", `${keyword} ${q.city}`);

  const listings = await firecrawlListings(search.toString());
  return listings
    .filter((l) => l.url)
    .map((l): RawWorkshop => ({
      source: "kufar",
      source_url: l.url!,
      name: l.title ?? null,
      phone: l.phone ?? null,
      description: l.description ?? null,
      city: q.city,
      country: q.country ?? "BY",
    }));
};
