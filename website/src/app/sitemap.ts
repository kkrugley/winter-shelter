import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { BASE_URL, siteUrl } from "@/lib/site";

const LOCALES = ["ru", "be", "pl", "en"] as const;

function alternates(path: string) {
  return {
    languages: {
      ...Object.fromEntries(LOCALES.map((l) => [l, siteUrl(path, l)])),
      "x-default": siteUrl(path, "ru"),
    },
  };
}

const STATIC_PAGES: {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}[] = [
  { path: "/",          changeFrequency: "weekly",  priority: 1.0 },
  { path: "/solutions", changeFrequency: "weekly",  priority: 0.9 },
  { path: "/download",  changeFrequency: "monthly", priority: 0.9 },
  { path: "/about",     changeFrequency: "monthly", priority: 0.7 },
  { path: "/help",      changeFrequency: "monthly", priority: 0.7 },
  { path: "/stories",   changeFrequency: "weekly",  priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    for (const page of STATIC_PAGES) {
      entries.push({
        url: siteUrl(page.path, locale),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: alternates(page.path),
      });
    }

    for (const product of products) {
      entries.push({
        url: siteUrl(`/solutions/${product.slug}`, locale),
        changeFrequency: "monthly",
        priority: product.status === "available" ? 0.8 : 0.4,
        alternates: alternates(`/solutions/${product.slug}`),
      });
    }
  }

  return entries;
}
