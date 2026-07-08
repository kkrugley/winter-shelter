import { fetchWithTimeout } from "./index";

const FIRECRAWL_URL = "https://api.firecrawl.dev/v1/search";
const FIRECRAWL_TIMEOUT_MS = 20_000; // scraping + extraction is slower than a plain API
const RESULT_LIMIT = 5; // keep credit spend low

export interface WebSearchResult {
  title?: string;
  url?: string;
  description?: string;
  phone?: string;
}

/**
 * Firecrawl's web search ("поиск в сети"), capped at 5 results and scoped to
 * a location so results skew local. Each hit is scraped for a small JSON
 * extraction only (no markdown/html) to keep credit spend low. `/v1/search`
 * has no `parsers` option (unlike `/v1/scrape`), so PDF hits still parse
 * with Firecrawl's default behavior. Returns [] when FIRECRAWL_API_KEY is
 * missing or anything fails.
 */
export async function firecrawlSearch(query: string, location: string): Promise<WebSearchResult[]> {
  const key = process.env.FIRECRAWL_API_KEY;
  if (!key) return [];

  const res = await fetchWithTimeout(
    FIRECRAWL_URL,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        query,
        limit: RESULT_LIMIT,
        location,
        scrapeOptions: {
          formats: ["json"],
          jsonOptions: {
            prompt:
              "Extract this business/service listing: its name, a phone number if shown, " +
              "and a short description of what it offers.",
            schema: {
              type: "object",
              properties: {
                name: { type: "string" },
                phone: { type: "string" },
                description: { type: "string" },
              },
            },
          },
        },
      }),
    },
    FIRECRAWL_TIMEOUT_MS,
  );
  if (!res.ok) return [];

  const data = (await res.json()) as {
    success?: boolean;
    data?: {
      title?: string;
      url?: string;
      description?: string;
      json?: { name?: string; phone?: string; description?: string };
    }[];
  };

  return (data.data ?? []).map((r): WebSearchResult => ({
    title: r.json?.name ?? r.title,
    url: r.url,
    description: r.json?.description ?? r.description,
    phone: r.json?.phone,
  }));
}
