import type { Metadata } from "next";
import { Suspense } from "react";
import { HelpContent } from "./HelpContent";
import { pageAlternates } from "@/lib/metadata";

export const metadata: Metadata = {
  alternates: pageAlternates("/help"),
};

export default function HelpPage() {
  return (
    <Suspense>
      <HelpContent />
    </Suspense>
  );
}
