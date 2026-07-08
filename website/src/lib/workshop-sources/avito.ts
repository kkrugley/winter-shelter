import type { RawWorkshop } from "../workshops";
import { SERVICE_KEYWORDS, type SourceAdapter } from "./index";
import { firecrawlListings } from "./firecrawl";

/**
 * Avito service listings (Russia) via Firecrawl. Only invoked for RU by the
 * orchestrator; returns [] without FIRECRAWL_API_KEY.
 */
export const fromAvito: SourceAdapter = async (q) => {
  const keyword = SERVICE_KEYWORDS[q.service][0];
  const search = new URL("https://www.avito.ru/rossiya/predlozheniya_uslug");
  search.searchParams.set("q", `${keyword} ${q.city}`);

  const listings = await firecrawlListings(search.toString());
  return listings
    .filter((l) => l.url)
    .map((l): RawWorkshop => ({
      source: "avito",
      source_url: l.url!,
      name: l.title ?? null,
      phone: l.phone ?? null,
      description: l.description ?? null,
      city: q.city,
      country: q.country ?? "RU",
    }));
};
