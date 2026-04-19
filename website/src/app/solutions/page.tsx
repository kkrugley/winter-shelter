"use client";

import { useState } from "react";
import Link from "next/link";
import { products } from "@/data/products";

type FilterType = "all" | "shelter" | "hydration" | "feeding";
type FilterMaterial = "all" | "3mm" | "6mm" | "other";
type FilterStatus = "all" | "available" | "new" | "coming-soon" | "prototype";

const statusLabel: Record<string, string> = {
  available: "готов",
  new: "NEW",
  "coming-soon": "скоро",
  prototype: "прототип",
};

const statusColor: Record<string, string> = {
  available: "border-green-300 text-green-700 bg-green-50",
  new: "border-accent/40 text-accent bg-accent-soft",
  "coming-soon": "border-border-soft text-ink-muted",
  prototype: "border-border-soft text-ink-muted",
};

export default function SolutionsPage() {
  const [type, setType] = useState<FilterType>("all");
  const [material, setMaterial] = useState<FilterMaterial>("all");
  const [status, setStatus] = useState<FilterStatus>("all");

  const filtered = products.filter((p) => {
    if (type !== "all" && p.category !== type) return false;
    if (status !== "all" && p.status !== status) return false;
    if (material === "3mm" && !p.downloads.some((d) => d.variant === "3mm"))
      return false;
    if (material === "6mm" && !p.downloads.some((d) => d.variant === "6mm"))
      return false;
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* Breadcrumb */}
      <div className="font-mono text-xs text-ink-muted mb-6">
        <Link href="/" className="hover:text-accent">
          главная
        </Link>{" "}
        /{" "}
        <span className="text-accent">решения</span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8">
        <div>
          <h1 className="font-hand text-5xl text-ink">Каталог решений</h1>
          <p className="text-sm text-ink-muted mt-2">
            Всё, что можно собрать или установить. Фильтруй по цели и материалу.
          </p>
        </div>
        <span className="font-mono text-xs text-ink-muted whitespace-nowrap">
          {filtered.length} решени{filtered.length === 1 ? "е" : "я"} · обновлено 04.26
        </span>
      </div>

      {/* Filters */}
      <div className="border border-border-soft rounded-xl p-4 mb-8 flex flex-wrap gap-3 items-center">
        <span className="font-mono text-xs text-ink-muted">тип:</span>
        {(["all", "shelter", "hydration", "feeding"] as const).map((v) => (
          <FilterChip
            key={v}
            active={type === v}
            onClick={() => setType(v)}
            label={
              { all: "все", shelter: "укрытия", hydration: "поение", feeding: "кормление" }[v]
            }
          />
        ))}
        <span className="font-mono text-xs text-ink-muted ml-2">материал:</span>
        {(["all", "3mm", "6mm", "other"] as const).map((v) => (
          <FilterChip
            key={v}
            active={material === v}
            onClick={() => setMaterial(v)}
            label={
              { all: "все", "3mm": "3 мм фанера", "6mm": "6 мм фанера", other: "другое" }[v]
            }
          />
        ))}
        <span className="font-mono text-xs text-ink-muted ml-2">статус:</span>
        {(["all", "available", "new", "coming-soon"] as const).map((v) => (
          <FilterChip
            key={v}
            active={status === v}
            onClick={() => setStatus(v as FilterStatus)}
            label={
              { all: "все", available: "готов", new: "NEW", "coming-soon": "скоро" }[v]
            }
          />
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-ink-muted font-hand text-2xl">
          Ничего не найдено по этим фильтрам
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p) => (
            <Link
              key={p.slug}
              href={`/solutions/${p.slug}`}
              className="group border border-border-soft rounded-xl overflow-hidden hover:border-accent/40 transition-colors"
            >
              <div
                className={`ph min-h-[150px] rounded-none border-0 border-b border-dashed border-border-soft ${
                  p.status === "new" ? "bg-accent-soft/60" : ""
                }`}
              >
                {p.name} · рендер
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <strong className="font-hand text-xl text-ink">{p.name}</strong>
                  <span
                    className={`px-2 py-0.5 rounded-full border text-xs ${
                      statusColor[p.status] ?? statusColor["coming-soon"]
                    }`}
                  >
                    {statusLabel[p.status] ?? p.status}
                  </span>
                </div>
                <p className="text-xs text-ink-muted mb-3">{p.capacity}</p>
                <p className="text-sm text-ink-muted line-clamp-2">{p.description}</p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 text-xs rounded-full border border-border-soft text-ink-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-4 text-sm font-medium text-accent group-hover:underline">
                  Подробнее →
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-full border text-xs transition-colors ${
        active
          ? "border-accent bg-accent-soft text-accent"
          : "border-border-soft text-ink-muted hover:border-accent/40 hover:text-accent"
      }`}
    >
      {label}
    </button>
  );
}
