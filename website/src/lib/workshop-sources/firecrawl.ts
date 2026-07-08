import { fetchWithTimeout } from "./index";

const FIRECRAWL_URL = "https://api.firecrawl.dev/v1/scrape";
const FIRECRAWL_TIMEOUT_MS = 20_000; // scraping + extraction is slower than a plain API

export interface ScrapedListing {
  title?: string;
  url?: string;
  phone?: string;
  description?: string;
}

/**
 * Scrape a classifieds search page and LLM-extract listing rows via Firecrawl.
 * Returns [] when FIRECRAWL_API_KEY is missing or anything fails.
 */
export async function firecrawlListings(searchUrl: string): Promise<ScrapedListing[]> {
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
        url: searchUrl,
        formats: ["json"],
        jsonOptions: {
          prompt:
            "Extract every service listing on this classifieds search page. " +
            "For each: the listing title, its absolute URL, phone if shown, and a short description.",
          schema: {
            type: "object",
            properties: {
              listings: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    title: { type: "string" },
                    url: { type: "string" },
                    phone: { type: "string" },
                    description: { type: "string" },
                  },
                },
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
    data?: { json?: { listings?: ScrapedListing[] } };
  };
  return data.data?.json?.listings ?? [];
}
