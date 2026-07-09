import type { Metadata } from "next";
import { pageAlternates } from "@/lib/metadata";
import { getPublishedStories } from "@/lib/stories";
import { StoriesClient } from "./StoriesClient";

export const metadata: Metadata = {
  alternates: pageAlternates("/stories"),
};

export default async function StoriesPage() {
  const initialStories = await getPublishedStories().catch(() => []);
  return <StoriesClient initialStories={initialStories} />;
}
