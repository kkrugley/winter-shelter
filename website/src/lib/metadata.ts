import type { Metadata } from "next";
import { siteUrl } from "@/lib/site";

const LOCALES = ["ru", "be", "pl", "en"] as const;

export function pageAlternates(path: string, locale: string): Metadata["alternates"] {
  return {
    canonical: siteUrl(path, locale),
    languages: {
      ...Object.fromEntries(LOCALES.map((l) => [l, siteUrl(path, l)])),
      "x-default": siteUrl(path, "ru"),
    },
  };
}
