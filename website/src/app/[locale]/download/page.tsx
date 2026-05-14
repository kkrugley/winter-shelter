import { Suspense } from "react";
import { DownloadContent } from "./DownloadContent";

export default function DownloadPage() {
  return (
    <Suspense>
      <DownloadContent />
    </Suspense>
  );
}
