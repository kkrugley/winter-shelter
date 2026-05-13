"use client";

import { DownloadSimple } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";

interface Props {
  href: string;
  productSlug: string;
  label?: string;
}

export function DownloadButton({ href, productSlug, label }: Props) {
  const t = useTranslations("ProductSlug");
  const resolvedLabel = label ?? t("downloadBtn");
  const handleClick = () => {
    // fire-and-forget — не блокируем скачивание
    fetch("/api/downloads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product_slug: productSlug }),
    }).catch(() => {});
  };

  return (
    <a
      href={href}
      download
      onClick={handleClick}
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-white text-sm font-medium hover:bg-[#c4673d] transition-colors"
    >
      <DownloadSimple size={16} weight="bold" />
      {resolvedLabel}
    </a>
  );
}
