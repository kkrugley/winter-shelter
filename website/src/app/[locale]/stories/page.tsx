import type { Metadata } from "next";
import { pageAlternates } from "@/lib/metadata";
import { StoriesClient } from "./StoriesClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return { alternates: pageAlternates("/stories", locale) };
}

export default function StoriesPage() {
  return <StoriesClient />;
}
