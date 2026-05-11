"use client";

import { useState } from "react";
import Link from "next/link";
import { products } from "@/data/products";
import { ProductIllustration } from "@/components/ui/ProductIllustration";

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
  available: "border-[var(--forest-pale)] text-[var(--forest)] bg-[var(--forest-pale)]",
  new: "border-transparent text-[#C55C1C] bg-[var(--ember-pale)]",
  "coming-soon": "border-[var(--sand-2)] text-[var(--stone)]",
  prototype: "border-[var(--sand-2)] text-[var(--stone)]",
};

export default function SolutionsPage() {
  const [type, setType] = useState<FilterType>("all");
  const [material, setMaterial] = useState<FilterMaterial>("all");
  const [status, setStatus] = useState<FilterStatus>("all");

  const filtered = products.filter((p) => {
    if (type !== "all" && p.category !== type) return false;
    if (status !== "all" && p.status !== status) return false;
    if (material === "3mm" && !p.downloads.some((d) => d.variant === "3mm")) return false;
    if (material === "6mm" && !p.downloads.some((d) => d.variant === "6mm")) return false;
    return true;
  });

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Breadcrumb */}
        <div className="font-mono text-xs text-ink-muted mb-6">
          <Link href="/" className="hover:text-accent">главная</Link>
          {" / "}
          <span className="text-accent">решения</span>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8">
          <div>
            <h1 className="heading-display">Каталог решений</h1>
            <p className="text-sm text-ink-muted mt-2">
              Всё, что можно собрать или установить. Фильтруй по цели и материалу.
            </p>
          </div>
          <span className="font-mono text-xs text-ink-muted whitespace-nowrap">
            {filtered.length} решени{filtered.length === 1 ? "е" : "я"} · обновлено 04.26
          </span>
        </div>

        {/* Filters */}
        <div className="border rounded-xl p-4 mb-8 flex flex-wrap gap-3 items-center" style={{ borderColor: "var(--sand)", background: "var(--cream)" }}>
          <span className="font-mono text-xs text-ink-muted">тип:</span>
          {(["all", "shelter", "hydration", "feeding"] as const).map((v) => (
            <FilterChip
              key={v}
              active={type === v}
              onClick={() => setType(v)}
              label={{ all: "все", shelter: "укрытия", hydration: "поение", feeding: "кормление" }[v]}
            />
          ))}
          <span className="font-mono text-xs text-ink-muted ml-2">материал:</span>
          {(["all", "3mm", "6mm", "other"] as const).map((v) => (
            <FilterChip
              key={v}
              active={material === v}
              onClick={() => setMaterial(v)}
              label={{ all: "все", "3mm": "3 мм фанера", "6mm": "6 мм фанера", other: "другое" }[v]}
            />
          ))}
          <span className="font-mono text-xs text-ink-muted ml-2">статус:</span>
          {(["all", "available", "new", "coming-soon"] as const).map((v) => (
            <FilterChip
              key={v}
              active={status === v}
              onClick={() => setStatus(v as FilterStatus)}
              label={{ all: "все", available: "готов", new: "NEW", "coming-soon": "скоро" }[v]}
            />
          ))}
          <span className="ml-auto">
            <button className="px-3 py-1 rounded-full border border-border-soft text-xs text-ink-muted">
              сортировка: популярные ▾
            </button>
          </span>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="heading-card text-ink-muted text-center py-20">
            Ничего не найдено по этим фильтрам
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((p) => (
              <div
                key={p.slug}
                className={`border rounded-[16px] overflow-hidden flex flex-col transition-all hover:-translate-y-0.5 ${p.status === "coming-soon" || p.status === "prototype" ? "opacity-70" : ""}`}
                style={{ borderColor: "var(--sand)", background: "var(--card-bg)", boxShadow: "var(--shadow-card)" }}
              >
                <ProductIllustration
                  slug={p.slug}
                  isNew={p.status === "new"}
                  className="aspect-[5/4] border-b border-dashed"
                  style={{ borderColor: "var(--sand-2)" }}
                />
                <div className="p-4 flex flex-col flex-1 gap-2">
                  <div className="flex items-center justify-between">
                    <strong className="heading-card text-xl">{p.name}</strong>
                    <span className={`px-2 py-0.5 rounded-full border text-xs ${statusColor[p.status] ?? statusColor["coming-soon"]}`}>
                      {statusLabel[p.status] ?? p.status}
                    </span>
                  </div>
                  <p className="text-xs" style={{ color: "var(--stone)" }}>{p.capacity}</p>
                  <p className="text-sm line-clamp-2" style={{ color: "var(--stone)" }}>{p.description}</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {p.tags.map((t) => (
                      <span key={t} className="px-2 py-0.5 text-xs rounded-full border" style={{ borderColor: "var(--sand-2)", color: "var(--stone)" }}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto pt-2 flex gap-2">
                    <Link
                      href={`/solutions/${p.slug}`}
                      className="flex-1 text-center px-3 py-1.5 rounded-full border text-xs transition-colors hover:border-[var(--ember)] hover:text-[var(--ember)]"
                      style={{ borderColor: "var(--sand-2)", color: "var(--stone)" }}
                    >
                      Детали →
                    </Link>
                    {(p.status === "available" || p.status === "new") && p.downloads.length > 0 ? (
                      <Link
                        href="/download"
                        className="flex-1 text-center px-3 py-1.5 rounded-full bg-[var(--ember)] text-white text-xs hover:opacity-90 transition-colors"
                      >
                        Скачать
                      </Link>
                    ) : (
                      <button
                        className="flex-1 px-3 py-1.5 rounded-full border text-xs transition-colors hover:border-[var(--ember)]"
                        style={{ borderColor: "var(--sand-2)", color: "var(--stone)" }}
                      >
                        Уведомить
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Compare CTA */}
      <section className="py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div
            className="relative overflow-hidden rounded-[24px] px-8 py-12 text-center"
            style={{
              background: "linear-gradient(180deg, var(--ember-pale) 0%, var(--cream) 100%)",
              border: "1px solid var(--ember-soft)",
              boxShadow: "var(--shadow-lift)",
            }}
          >
            <h3 className="heading-sub mb-3">Не знаешь, что выбрать?</h3>
            <p className="text-sm mb-8" style={{ color: "var(--stone)" }}>Сравни решения рядом или пройди квиз.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/download"
                className="px-6 py-3 rounded-full bg-[var(--ember)] text-white text-sm font-medium hover:opacity-90 transition-all hover:-translate-y-px"
                style={{ boxShadow: "var(--shadow-btn)" }}
              >
                Сравнить все →
              </Link>
              <Link
                href="/help"
                className="px-6 py-3 rounded-full border text-ink text-sm font-medium hover:border-[var(--stone)] transition-colors"
                style={{ borderColor: "var(--sand-2)" }}
              >
                Пройти квиз
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
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
      className="px-3 py-1 rounded-full border text-xs transition-colors"
      style={{
        borderColor: active ? "var(--ember)" : "var(--sand-2)",
        background: active ? "var(--ember-pale)" : "transparent",
        color: active ? "#C55C1C" : "var(--stone)",
      }}
    >
      {label}
    </button>
  );
}
