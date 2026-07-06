import type { Metadata } from "next";
import { siteUrl } from "@/lib/site";

export function pageAlternates(path: string): Metadata["alternates"] {
  return {
    canonical: siteUrl(path),
  };
}
