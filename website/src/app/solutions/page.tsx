import type { Metadata } from "next";
import { Suspense } from "react";
import { pageAlternates } from "@/lib/metadata";
import { SolutionsClient } from "./SolutionsClient";

export const metadata: Metadata = {
  alternates: pageAlternates("/solutions"),
};

export default function SolutionsPage() {
  return (
    <Suspense>
      <SolutionsClient />
    </Suspense>
  );
}
