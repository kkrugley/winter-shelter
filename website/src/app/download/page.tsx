import type { Metadata } from "next";
import { Suspense } from "react";
import { DownloadContent } from "./DownloadContent";
import { pageAlternates } from "@/lib/metadata";

export const metadata: Metadata = {
  alternates: pageAlternates("/download"),
};

export default function DownloadPage() {
  return (
    <Suspense>
      <DownloadContent />
    </Suspense>
  );
}
