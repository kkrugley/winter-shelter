"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { routing } from "@/i18n/routing";

// Sets document.documentElement.lang on the client so the html element
// reflects the active locale even though html/body live in the root layout.
export function LocaleSync() {
  const pathname = usePathname();
  useEffect(() => {
    const firstSegment = pathname.split("/")[1] ?? "";
    const locale = (routing.locales as readonly string[]).includes(firstSegment)
      ? firstSegment
      : routing.defaultLocale;
    document.documentElement.lang = locale;
  }, [pathname]);
  return null;
}
