import type { Metadata } from "next";
import { pageAlternates } from "@/lib/metadata";
import { StoriesClient } from "./StoriesClient";

export const metadata: Metadata = {
  alternates: pageAlternates("/stories"),
};

export default function StoriesPage() {
  return <StoriesClient />;
}
