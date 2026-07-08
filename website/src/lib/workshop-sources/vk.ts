import type { RawWorkshop } from "../workshops";
import { fetchWithTimeout, SERVICE_KEYWORDS, type SourceAdapter } from "./index";

const VK_API_VERSION = "5.199";
const MAX_RESULTS = 20;

interface VkGroup {
  id: number;
  name?: string;
  screen_name?: string;
  description?: string;
}

/**
 * VK communities via groups.search. Needs VK_SERVICE_TOKEN; returns [] without
 * it. Query is "<service keyword> <city>" so results skew local.
 */
export const fromVk: SourceAdapter = async (q) => {
  const token = process.env.VK_SERVICE_TOKEN;
  if (!token) return [];

  const keyword = SERVICE_KEYWORDS[q.service][0];
  const url = new URL("https://api.vk.com/method/groups.search");
  url.searchParams.set("q", `${keyword} ${q.city}`);
  url.searchParams.set("type", "group");
  url.searchParams.set("count", String(MAX_RESULTS));
  url.searchParams.set("access_token", token);
  url.searchParams.set("v", VK_API_VERSION);

  const res = await fetchWithTimeout(url.toString());
  if (!res.ok) return [];

  const data = (await res.json()) as {
    response?: { items?: VkGroup[] };
    error?: unknown;
  };
  if (data.error || !data.response?.items) return [];

  return data.response.items.map((g): RawWorkshop => {
    const slug = g.screen_name ?? `club${g.id}`;
    return {
      source: "vk",
      source_url: `https://vk.com/${slug}`,
      source_ref: String(g.id),
      name: g.name ?? null,
      description: g.description ?? null,
      city: q.city,
      country: q.country ?? null,
    };
  });
};
