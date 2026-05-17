import type { Metadata } from "next";
import { pageAlternates } from "@/lib/metadata";
import { SolutionsClient } from "./SolutionsClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return { alternates: pageAlternates("/solutions", locale) };
}

export default function SolutionsPage() {
  return <SolutionsClient />;
}
