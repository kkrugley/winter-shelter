"use client";

import { useState } from "react";
import Link from "next/link";
import { SlidersHorizontal, CaretDown, Eraser } from "@phosphor-icons/react";
import { products, type ProductMaterial, type ProductCategory, type ProductStatus } from "@/data/products";
import { getProductContent } from "@/data/productContent";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ProductIllustration } from "@/components/ui/ProductIllustration";
import { NotifyModal } from "@/components/ui/NotifyModal";

function toggle<T>(set: Set<T>, value: T): Set<T> {
  const next = new Set(set);
  if (next.has(value)) next.delete(value); else next.add(value);
  return next;
}

function solutionsCount(n: number): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return `${n} решение`;
  if ([2, 3, 4].includes(mod10) && ![12, 13, 14].includes(mod100)) return `${n} решения`;
  return `${n} решений`;
}

const statusColor: Record<string, string> = {
  available: "border-[var(--forest-pale)] text-[var(--forest)] bg-[var(--forest-pale)]",
  "coming-soon": "border-[var(--sand-2)] text-[var(--stone)]",
};

const statusLabel: Record<string, string> = {
  available: "Готов",
  "coming-soon": "Скоро",
};

export function SolutionsClient() {
  const [types, setTypes] = useState<Set<ProductCategory>>(new Set());
  const [materials, setMaterials] = useState<Set<ProductMaterial>>(new Set());
  const [statuses, setStatuses] = useState<Set<ProductStatus>>(new Set());
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [notifyProduct, setNotifyProduct] = useState<{ slug: string; name: string } | null>(null);

  const activeFilterCount = [types.size > 0, materials.size > 0, statuses.size > 0].filter(Boolean).length;

  const filtered = products.filter((p) => {
    if (types.size > 0 && !types.has(p.category)) return false;
    if (statuses.size > 0 && !statuses.has(p.status)) return false;
    if (materials.size > 0 && !p.materials.some((m) => materials.has(m))) return false;
    return true;
  });

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Главная</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Решения</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8">
          <div>
            <h1 className="heading-display">Каталог решений</h1>
            <p className="text-sm text-ink-muted mt-2">Всё, что можно собрать или установить. Фильтруй по цели и материалу.</p>
          </div>
          <span className="font-mono text-xs text-ink-muted whitespace-nowrap">
            {solutionsCount(filtered.length)} · Обновлено в апреле 2026
          </span>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <button
            onClick={() => setFiltersOpen((v) => !v)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border font-mono text-xs text-ink-muted transition-colors hover:border-[var(--stone)]"
            style={{ borderColor: filtersOpen ? "var(--ember)" : "var(--sand-2)", color: filtersOpen ? "#C55C1C" : undefined }}
          >
            <SlidersHorizontal size={13} />
            Фильтры
            {activeFilterCount > 0 && (
              <span className="flex h-4 w-4 items-center justify-center rounded-full text-[10px] bg-[var(--ember-pale)] text-[#C55C1C]">
                {activeFilterCount}
              </span>
            )}
            <CaretDown
              size={13}
              className="transition-transform duration-200"
              style={{ transform: filtersOpen ? "rotate(180deg)" : "rotate(0deg)" }}
            />
          </button>
          {activeFilterCount > 0 && (
            <ClearChip
              label="Сбросить"
              onClick={() => { setTypes(new Set()); setMaterials(new Set()); setStatuses(new Set()); }}
            />
          )}
        </div>

        <div
          className="grid transition-[grid-template-rows] duration-200 ease-in-out"
          style={{ gridTemplateRows: filtersOpen ? "1fr" : "0fr" }}
        >
          <div className="overflow-hidden">
            <div
              className="border rounded-xl p-4 mb-8 flex flex-col gap-3"
              style={{ borderColor: "var(--sand)", background: "var(--cream)" }}
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs text-ink-muted w-16 shrink-0">Тип</span>
                {(["shelter", "hydration", "feeding"] as const).map((v) => (
                  <FilterChip
                    key={v}
                    active={types.has(v)}
                    onClick={() => setTypes((s) => toggle(s, v))}
                    label={{ shelter: "Укрытия", hydration: "Поение", feeding: "Кормление" }[v]}
                  />
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs text-ink-muted w-16 shrink-0">Материал</span>
                {(["wood", "plastic", "metal", "recycled"] as const).map((v) => (
                  <FilterChip
                    key={v}
                    active={materials.has(v)}
                    onClick={() => setMaterials((s) => toggle(s, v))}
                    label={{ wood: "Фанера", plastic: "Пластик", metal: "Металл", recycled: "Переработка" }[v]}
                  />
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs text-ink-muted w-16 shrink-0">Статус</span>
                {(["available", "coming-soon"] as const).map((v) => (
                  <FilterChip
                    key={v}
                    active={statuses.has(v)}
                    onClick={() => setStatuses((s) => toggle(s, v))}
                    label={{ available: "Готов", "coming-soon": "Скоро" }[v]}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="heading-card text-ink-muted text-center py-20">Ничего не найдено по этим фильтрам</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((p) => {
              const pT = getProductContent(p.slug)!;
              return (
                <div
                  key={p.slug}
                  className={`border rounded-[16px] overflow-hidden flex flex-col transition-all hover:-translate-y-0.5 ${p.status === "coming-soon" ? "opacity-70" : ""}`}
                  style={{ borderColor: "var(--sand)", background: "var(--card-bg)", boxShadow: "var(--shadow-card)" }}
                >
                  <ProductIllustration
                    slug={p.slug}
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
                    <p className="text-xs" style={{ color: "var(--stone)" }}>{pT.capacity}</p>
                    <p className="text-sm line-clamp-2" style={{ color: "var(--stone)" }}>{pT.subtitle}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {pT.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 text-xs rounded-full border" style={{ borderColor: "var(--sand-2)", color: "var(--stone)" }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-auto pt-2 flex gap-2">
                      <Link
                        href={`/solutions/${p.slug}`}
                        className="flex-1 text-center px-3 py-1.5 rounded-full border text-xs transition-colors"
                        style={{ borderColor: "var(--sand-2)", color: "var(--stone)" }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--ember)"; e.currentTarget.style.color = "var(--ember)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--sand-2)"; e.currentTarget.style.color = "var(--stone)"; }}
                      >
                        Детали →
                      </Link>
                      {p.status === "available" && p.downloads.length > 0 ? (
                        <Link
                          href={`/download?product=${p.slug}`}
                          className="flex-1 text-center px-3 py-1.5 rounded-full bg-[var(--ember)] text-white text-xs hover:opacity-90 transition-colors"
                        >
                          Скачать
                        </Link>
                      ) : (
                        <button
                          onClick={() => setNotifyProduct({ slug: p.slug, name: p.name })}
                          className="flex-1 px-3 py-1.5 rounded-full border text-xs transition-colors"
                          style={{ borderColor: "var(--sand-2)", color: "var(--stone)" }}
                          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--ember)"; e.currentTarget.style.color = "var(--ember)"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--sand-2)"; e.currentTarget.style.color = "var(--stone)"; }}
                        >
                          Уведомить
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {notifyProduct && (
        <NotifyModal
          productName={notifyProduct.name}
          productSlug={notifyProduct.slug}
          onClose={() => setNotifyProduct(null)}
        />
      )}

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
            <h3 className="heading-sub mb-3">Не знаешь, с чего начать?</h3>
            <p className="text-sm mb-8" style={{ color: "var(--stone)" }}>Пройди короткий квиз — подскажем, какое решение подойдёт твоей ситуации.</p>
            {/* TODO(dev): добавить кнопку "Сравнить решения" → /solutions/compare (страница ещё не создана) */}
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/#quiz"
                className="px-6 py-3 rounded-full bg-[var(--ember)] text-white text-sm font-medium hover:opacity-90 transition-all hover:-translate-y-px"
                style={{ boxShadow: "var(--shadow-btn)" }}
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

function FilterChip({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
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

function ClearChip({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border font-mono text-xs text-ink-muted transition-colors hover:border-[var(--stone)]"
      style={{ borderColor: "var(--sand-2)" }}
    >
      <Eraser size={13} />
      {label}
    </button>
  );
}
