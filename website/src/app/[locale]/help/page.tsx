import { Suspense } from "react";
import { HelpContent } from "./HelpContent";

export default function HelpPage() {
  return (
    <Suspense>
      <HelpContent />
    </Suspense>
  );
}
