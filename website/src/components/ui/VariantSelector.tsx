"use client";

import { useState } from "react";
import { DownloadButton } from "@/components/DownloadButton";
import type { ProductDownload } from "@/data/products";

interface Props {
  downloads: ProductDownload[];
  labels: Record<string, string>;
  slug: string;
  recommendedLabel: string;
  chooseVariantLabel: string;
  sizeAndLicense: string;
}

export function VariantSelector({
  downloads,
  labels,
  slug,
  recommendedLabel,
  chooseVariantLabel,
  sizeAndLicense,
}: Props) {
  const defaultVariant = downloads.find((d) => d.recommended)?.variant ?? downloads[0]?.variant;
  const [selected, setSelected] = useState(defaultVariant);

  const active = downloads.find((d) => d.variant === selected);

  return (
    <div className="bg-accent-soft border border-accent/20 rounded-xl p-5">
      <span className="font-mono text-xs text-ink-muted block mb-3">{chooseVariantLabel}</span>
      <div className="flex flex-wrap gap-2 mb-4">
        {downloads.map((d) => (
          <button
            key={d.variant}
            type="button"
            onClick={() => setSelected(d.variant)}
            className={`px-3 py-1 rounded-full border text-xs cursor-pointer transition-colors ${
              selected === d.variant
                ? "border-accent bg-accent text-white"
                : "border-border-soft text-ink-muted hover:border-accent/40"
            }`}
          >
            {labels[d.variant] ?? d.label}
            {d.recommended ? recommendedLabel : ""}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        {active && (
          <DownloadButton href={active.file} productSlug={slug} />
        )}
        <a
          href="/files/SafePawsManual.pdf"
          download
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border-soft text-ink text-sm hover:bg-paper transition-colors"
        >
          Скачать инструкцию
        </a>
      </div>
      {active && (
        <p className="text-xs text-ink-muted mt-3">{active.size} · {sizeAndLicense}</p>
      )}
    </div>
  );
}
