"use client";

import { useState } from "react";
import { Check, DownloadSimple, Copy, CaretDown } from "@phosphor-icons/react";
import type { Product } from "@/data/products";
import type { LineItem, ProductMaterialsConfig } from "@/data/materials";

// TODO(dev): i18n + multi-currency — сейчас все label/spec в products.ts (не через ru.json),
// цены захардкожены в BYN. Нужно: 1) перенести label/spec позиций в messages/*.json,
// 2) добавить базовую валюту BYN и пересчёт в валюту локали через публичный курс (напр. NBRBapi).

// ─── Types ────────────────────────────────────────────────────────────────────

interface CalcState {
  qty: number;
  thickness: "3" | "6";
  extras: Record<string, boolean>;
  struck: Record<string, boolean>;
  spareSheet: boolean;
}

type CalcRow = LineItem & {
  qtyTotal: number;
  lineCost: number;
  inList: boolean;
  struck: boolean;
};

interface CalcResult {
  rows: CalcRow[];
  materialsCost: number;
  servicesCost: number;
}

// ─── Calc logic ───────────────────────────────────────────────────────────────

function runCalc(config: ProductMaterialsConfig, state: CalcState): CalcResult {
  let materialsCost = 0;
  let servicesCost = 0;

  const rows = config.items.map((item): CalcRow => {
    const inList = state.extras[item.id] ?? true;
    const struck = state.struck[item.id] ?? false;
    const counted = inList && !struck;

    let qty = item.perUnit * state.qty;
    const unitPrice = item.priceByThickness
      ? item.priceByThickness[state.thickness]
      : (item.price ?? 0);

    if (item.id === "sheet" && item.scrapFactor && state.spareSheet) {
      qty += Math.ceil(state.qty / item.scrapFactor);
    }
    if (item.unit === "лист" || item.unit === "шт" || item.unit === "изд.") {
      qty = Math.ceil(qty);
    }

    const lineCost = counted ? Math.round(qty * unitPrice * 100) / 100 : 0;
    if (counted) {
      if (item.kind === "service") servicesCost += lineCost;
      else materialsCost += lineCost;
    }

    return { ...item, qtyTotal: qty, lineCost, inList, struck };
  });

  return {
    rows,
    materialsCost: Math.round(materialsCost),
    servicesCost: Math.round(servicesCost),
  };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmtQty(n: number, unit: string): string {
  if (unit === "мл" && n >= 1000) return `${(n / 1000).toFixed(1).replace(".", ",")} л`;
  if (unit === "г" && n >= 1000) return `${(n / 1000).toFixed(2).replace(".", ",")} кг`;
  return `${n} ${unit}`;
}


function fmtCost(n: number): string {
  return n === 0 ? "0" : n.toLocaleString("ru-RU");
}

function todayStr(): string {
  const d = new Date();
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${dd} · ${mm} · ${d.getFullYear()}`;
}

function buildTextList(
  product: Product,
  config: ProductMaterialsConfig | undefined,
  state: CalcState,
  result: CalcResult,
): string {
  if (!config) return "";
  const lines = [
    `Список закупок — ${product.name}`,
    `Дата: ${todayStr().replace(/ · /g, ".")}  Количество: ${state.qty} шт`,
    "",
  ];
  for (const row of result.rows) {
    if (!row.inList) continue;
    // struck = already have → [✓]; not struck = still need to buy → [ ]
    const tick = row.struck ? "[✓]" : "[ ]";
    const cost = row.struck ? "—" : `${fmtCost(row.lineCost)} BYN`;
    lines.push(`${tick} ${row.label} (${row.spec}) — ${fmtQty(row.qtyTotal, row.unit)} — ${cost}`);
  }
  lines.push("", "─".repeat(40));
  lines.push(`Материалы: ${result.materialsCost} BYN`);
  if (result.servicesCost > 0) lines.push(`Услуги: ${result.servicesCost} BYN`);
  lines.push("", "Цены ориентировочные");
  return lines.join("\n");
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function NbCheckbox({ checked, onClick }: { checked: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      role="checkbox"
      aria-checked={checked}
      style={{
        width: 18, height: 18,
        border: `1.6px solid ${checked ? "rgba(44,42,39,.35)" : "var(--sand-2)"}`,
        borderRadius: 3,
        background: checked ? "var(--ember-pale)" : "rgba(255,255,255,0.6)",
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", flexShrink: 0, position: "relative", top: 4,
        transition: "background .12s, border-color .12s",
      }}
    >
      {checked && <Check size={11} weight="bold" color="var(--ember)" />}
    </button>
  );
}

// Replaces ::after pseudo-element for the pen-strike effect
function StrikeLine({ top = "52%" }: { top?: string | number }) {
  return (
    <span
      aria-hidden="true"
      style={{
        position: "absolute", left: -3, right: -3, top,
        height: 2, background: "var(--ember)",
        transform: "rotate(-1.2deg)", borderRadius: 2, opacity: 0.8,
        pointerEvents: "none", display: "block",
      }}
    />
  );
}

function TotRow({ label, value }: { label: string; value: string }) {
  return (
    <>
      <div style={{ height: 30 }} />
      <div style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--stone)", lineHeight: 1, display: "flex", alignItems: "center" }}>
        {label}
      </div>
      <div style={{ height: 30 }} />
      <div style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--charcoal)", textAlign: "right", lineHeight: 1, display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
        {value}
      </div>
    </>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function MaterialsCalculator({ product }: { product: Product }) {
  const config = product.materialsConfig;
  if (!config) return null;

  const hasSheet = config.items.some((i) => i.id === "sheet");
  const hasServices = config.items.some((i) => i.kind === "service");

  const [state, setState] = useState<CalcState>(() => ({
    qty: 1,
    thickness: config.defaultThickness ?? "6",
    extras: Object.fromEntries(
      config.items.map((i) => [i.id, true])
    ),
    struck: {},
    spareSheet: false,
  }));

  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyHovered, setCopyHovered] = useState(false);

  const result = runCalc(config, state);
  const totalCost = result.materialsCost + result.servicesCost;

  function handleCheck(item: LineItem) {
    setState((s) => {
      const next = !(s.extras[item.id] ?? true);
      return {
        ...s,
        extras: { ...s.extras, [item.id]: next },
        // clear strike when removing from list
        struck: next ? s.struck : { ...s.struck, [item.id]: false },
      };
    });
  }

  function handleStrikeZone(row: CalcRow) {
    if (!row.inList) return;
    setState((s) => ({ ...s, struck: { ...s.struck, [row.id]: !s.struck[row.id] } }));
  }

  function handleDownload() {
    const text = buildTextList(product, config, state, result);
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `safepaws-${product.slug}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function handleCopy() {
    const text = buildTextList(product, config, state, result);
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (!expanded) {
    return (
      <button
        onClick={() => setExpanded(true)}
        aria-expanded={false}
        style={{
          display: "flex", alignItems: "center", gap: 0,
          maxWidth: 640, width: "100%",
          background: "var(--cream)",
          borderRadius: 12,
          boxShadow: "0 1px 0 rgba(44,42,39,.06), 0 8px 24px -16px rgba(44,42,39,.18)",
          overflow: "hidden",
          border: "none", cursor: "pointer", textAlign: "left",
        }}
      >
        {/* Spiral strip */}
        <div
          aria-hidden="true"
          style={{
            width: 36, alignSelf: "stretch", flexShrink: 0,
            background: "var(--sand)",
            borderRight: "1px solid var(--sand-2)",
            display: "flex", flexDirection: "column",
            justifyContent: "space-around",
            padding: "12px 0",
          }}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              style={{
                width: 12, height: 12, borderRadius: "50%", margin: "0 auto",
                background: "radial-gradient(circle at 35% 35%, #4d4944 0%, #2a2825 65%, #1a1816 100%)",
                boxShadow: "inset 0 -1px 2px rgba(0,0,0,.4), 0 1px 0 rgba(255,255,255,.25)",
                display: "block", flexShrink: 0,
              }}
            />
          ))}
        </div>

        {/* Text */}
        <div style={{ padding: "18px 20px", flex: 1 }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--forest)", opacity: 0.65, marginBottom: 4 }}>
            список закупок
          </div>
          <div style={{ fontFamily: "var(--font-script)", fontSize: 26, fontWeight: 700, color: "var(--forest)", lineHeight: 1.1, marginBottom: 4 }}>
            {product.name}
          </div>
          <div style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--stone)" }}>
            Посчитай материалы и стоимость сборки
          </div>
        </div>

        {/* Expand caret */}
        <div style={{ padding: "0 20px", display: "flex", alignItems: "center", gap: 6, flexShrink: 0, color: "var(--ember)", fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 500 }}>
          Открыть
          <CaretDown size={14} weight="bold" />
        </div>
      </button>
    );
  }

  return (
    <div
      style={{
        position: "relative",
        maxWidth: 640,
        background: "var(--cream)",
        borderRadius: 12,
        boxShadow: "0 1px 0 rgba(44,42,39,.06), 0 24px 56px -32px rgba(44,42,39,.22)",
        backgroundImage: "linear-gradient(180deg, rgba(61,107,79,.14) 1px, transparent 1px)",
        backgroundSize: "100% 30px",
        backgroundPosition: "0 44px",
        overflow: "hidden",
        paddingTop: 36,
      }}
    >
      {/* Spiral binding */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", left: 0, right: 0, top: 0,
          height: 30, background: "var(--sand)",
          borderBottom: "1px solid var(--sand-2)",
          display: "flex", justifyContent: "space-around",
          padding: "0 24px", alignItems: "center", zIndex: 2,
        }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <span
            key={i}
            style={{
              width: 14, height: 14, borderRadius: "50%",
              background: "radial-gradient(circle at 35% 35%, #4d4944 0%, #2a2825 65%, #1a1816 100%)",
              boxShadow: "inset 0 -2px 2px rgba(0,0,0,.4), inset 0 1px 1px rgba(255,255,255,.2), 0 1px 0 rgba(255,255,255,.35)",
              display: "inline-block", flexShrink: 0,
            }}
          />
        ))}
      </div>

      {/* Scotch tape */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", top: 22, right: -12,
          width: 90, height: 22,
          background: "rgba(255,235,130,0.55)",
          transform: "rotate(8deg)",
          boxShadow: "0 2px 6px rgba(44,42,39,.1)",
          zIndex: 3, pointerEvents: "none",
        }}
      />

      {/* Amber margin line */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", left: 56, top: 0, bottom: 0,
          width: 1, background: "rgba(232,113,42,.45)", zIndex: 0,
        }}
      />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, padding: "18px 32px 28px 84px" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: 14 }}>
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--forest)", opacity: 0.65, marginBottom: 4 }}>
              список закупок
            </div>
            <div style={{ position: "relative", display: "inline-block" }}>
              {/* Product name in Caveat script */}
              <span style={{ fontFamily: "var(--font-script)", fontSize: 38, fontWeight: 700, color: "var(--ember)", letterSpacing: "-0.01em", lineHeight: 1 }}>
                {product.name}
              </span>
              {/* Handwritten SVG underline */}
              <span
                aria-hidden="true"
                style={{
                  position: "absolute", left: -2, right: -4, bottom: -2, height: 6, display: "block",
                  backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 8' preserveAspectRatio='none'><path d='M2 5 C 30 2, 60 7, 100 4 S 170 6, 198 3' stroke='%23E8712A' stroke-width='2' fill='none' stroke-linecap='round'/></svg>")`,
                  backgroundSize: "100% 100%", backgroundRepeat: "no-repeat",
                }}
              />
            </div>
            {/* Capacity subtitle — Inter, muted */}
            <div style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--stone)", marginTop: 6, lineHeight: 1.2 }}>
              — {product.capacity}
            </div>
          </div>

          {/* Date — Caveat script, ember, rotated */}
          <div style={{ flexShrink: 0, textAlign: "right" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--stone)", opacity: 0.6, marginBottom: 2 }}>
              дата
            </div>
            <div style={{ fontFamily: "var(--font-script)", fontSize: 18, color: "var(--ember)", transform: "rotate(-2deg)", lineHeight: 1, display: "inline-block" }}>
              {todayStr()}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", margin: "10px 0 14px" }}>

          {/* Qty stepper */}
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--charcoal)", display: "inline-flex", alignItems: "center", gap: 8 }}>
            строю:
            <span style={{ display: "inline-flex", alignItems: "center", background: "rgba(255,255,255,.7)", border: "1px solid var(--sand-2)", borderRadius: 999, padding: 3 }}>
              <button
                onClick={() => setState((s) => ({ ...s, qty: Math.max(1, s.qty - 1) }))}
                disabled={state.qty <= 1}
                style={{ width: 26, height: 26, borderRadius: "50%", background: "var(--cream)", color: "var(--charcoal)", fontSize: 16, display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: state.qty <= 1 ? "not-allowed" : "pointer", opacity: state.qty <= 1 ? 0.35 : 1, border: "none" }}
              >−</button>
              <span style={{ minWidth: 32, textAlign: "center", fontFamily: "var(--font-mono)", fontWeight: 500, fontSize: 13, color: "var(--charcoal)" }}>{state.qty}</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--stone)", paddingRight: 8 }}>шт</span>
              <button
                onClick={() => setState((s) => ({ ...s, qty: Math.min(config.qtyMax, s.qty + 1) }))}
                disabled={state.qty >= config.qtyMax}
                style={{ width: 26, height: 26, borderRadius: "50%", background: "var(--cream)", color: "var(--charcoal)", fontSize: 16, display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: state.qty >= config.qtyMax ? "not-allowed" : "pointer", opacity: state.qty >= config.qtyMax ? 0.35 : 1, border: "none" }}
              >+</button>
            </span>
          </span>

          {/* Thickness selector */}
          {config.supportsThickness && (
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--charcoal)", display: "inline-flex", alignItems: "center", gap: 8 }}>
              фанера:
              <span style={{ display: "inline-flex", gap: 4 }}>
                {(["3", "6"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setState((s) => ({ ...s, thickness: t }))}
                    style={{
                      padding: "3px 11px",
                      border: `1.5px solid ${state.thickness === t ? "var(--ember)" : "var(--sand-2)"}`,
                      borderRadius: 999,
                      background: state.thickness === t ? "var(--ember-pale)" : "transparent",
                      fontFamily: "var(--font-sans)", fontSize: 13,
                      color: state.thickness === t ? "var(--ember)" : "var(--stone)",
                      fontWeight: state.thickness === t ? 500 : 400,
                      cursor: "pointer", transition: "all .15s",
                    }}
                  >{t} мм</button>
                ))}
              </span>
            </span>
          )}

          {/* Spare sheet checkbox */}
          {hasSheet && (
            <label
              onClick={() => setState((s) => ({ ...s, spareSheet: !s.spareSheet }))}
              style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--charcoal)", cursor: "pointer", userSelect: "none" }}
            >
              <span style={{ width: 16, height: 16, border: `1.5px solid ${state.spareSheet ? "var(--ember)" : "var(--sand-2)"}`, borderRadius: 3, display: "inline-flex", alignItems: "center", justifyContent: "center", background: state.spareSheet ? "var(--ember-pale)" : "rgba(255,255,255,.6)", flexShrink: 0, transition: "all .12s" }}>
                {state.spareSheet && <Check size={10} weight="bold" color="var(--ember)" />}
              </span>
              + запасной лист
            </label>
          )}
        </div>

        {/* Hint */}
        <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--stone)", margin: "0 0 4px", lineHeight: 1.4, opacity: 0.8 }}>
          клик по <b style={{ color: "var(--ember)", fontWeight: 600 }}>чекбоксу</b> — вкл/выкл · клик по <b style={{ color: "var(--ember)", fontWeight: 600 }}>тексту строки</b> — вычеркнуть «уже есть»
        </p>

        {/* Item list */}
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {result.rows.map((row) => (
            <li
              key={row.id}
              style={{ display: "grid", gridTemplateColumns: "22px 1fr auto auto", gap: 10, alignItems: "baseline", minHeight: 60, paddingTop: 2 }}
            >
              <NbCheckbox checked={row.inList} onClick={() => handleCheck(row)} />

              {/* Strike zone — click to cross out */}
              <div
                onClick={() => handleStrikeZone(row)}
                style={{
                  gridColumn: "2 / 5", display: "grid",
                  gridTemplateColumns: "1fr auto auto", gap: 10,
                  alignItems: "baseline", cursor: "pointer",
                  opacity: row.inList ? 1 : 0.38,
                  transition: "opacity .15s",
                }}
              >
                {/* Label + spec */}
                <div style={{ position: "relative" }}>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 500, color: row.struck ? "var(--stone)" : "var(--charcoal)", lineHeight: 1, display: "block" }}>
                    {row.label}
                    {row.kind === "service" && (
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ember)", opacity: 0.65, marginLeft: 6 }}>
                        услуга
                      </span>
                    )}
                  </span>
                  <span style={{ display: "block", fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--stone)", lineHeight: "30px", opacity: row.struck ? 0.5 : 0.75 }}>
                    {row.spec}{row.optional ? " · опц." : ""}
                  </span>
                  {row.struck && <StrikeLine top={7} />}
                </div>

                {/* Qty */}
                <div style={{ position: "relative" }}>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: row.struck ? "var(--stone)" : "var(--charcoal)", whiteSpace: "nowrap" }}>
                    {row.inList ? fmtQty(row.qtyTotal, row.unit) : "—"}
                  </span>
                  {row.struck && <StrikeLine />}
                </div>

                {/* Price — Caveat script */}
                <div style={{ position: "relative", minWidth: 56, textAlign: "right" }}>
                  <span style={{ fontFamily: "var(--font-script)", fontSize: 19, color: row.struck ? "var(--stone)" : "var(--ember)", whiteSpace: "nowrap", fontWeight: 600, lineHeight: 1 }}>
                    {!row.inList || row.struck ? "—" : fmtCost(row.lineCost)}
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, color: "var(--stone)", marginLeft: 2, fontWeight: 400 }}>BYN</span>
                  </span>
                  {row.struck && <StrikeLine />}
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Wavy divider */}
        <div aria-hidden="true" style={{ height: 30, display: "flex", alignItems: "center" }}>
          <svg viewBox="0 0 800 14" preserveAspectRatio="none" style={{ width: "100%", height: 10, color: "var(--forest)", opacity: 0.4 }}>
            <path d="M2 8 C 80 4, 160 12, 240 7 S 400 10, 480 6 S 640 11, 798 7" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" />
          </svg>
        </div>

        {/* Totals */}
        <div style={{ display: "grid", gridTemplateColumns: "22px 1fr auto auto", gap: 10 }}>
          <TotRow label="материалы" value={`${result.materialsCost} BYN`} />
          {hasServices && result.servicesCost > 0 && (
            <TotRow label="услуги" value={`${result.servicesCost} BYN`} />
          )}
          {/* Grand total */}
          <div style={{ gridColumn: "1 / 5", display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 14, height: 56, marginTop: 4 }}>
            <span style={{ fontFamily: "var(--font-script)", fontSize: 22, color: "var(--ember)", transform: "rotate(-3deg)", lineHeight: 1 }}>
              купить ↘
            </span>
            <span style={{ position: "relative", padding: "10px 22px", fontFamily: "var(--font-script)", fontSize: 42, color: "var(--ember)", fontWeight: 700, lineHeight: 0.9 }}>
              {/* SVG oval */}
              <svg
                aria-hidden="true"
                viewBox="0 0 200 80"
                preserveAspectRatio="none"
                style={{ position: "absolute", inset: "-4px -8px", width: "calc(100% + 16px)", height: "calc(100% + 8px)", pointerEvents: "none" }}
              >
                <ellipse cx="100" cy="40" rx="94" ry="34" stroke="var(--ember)" strokeWidth="2.4" fill="none" strokeLinecap="round" />
                <ellipse cx="100" cy="40" rx="90" ry="30" stroke="var(--ember)" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.5" />
              </svg>
              {totalCost}
              <small style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--ember)", marginLeft: 4, fontWeight: 500, opacity: 0.75 }}>BYN</small>
            </span>
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", marginTop: 20 }}>
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all hover:opacity-90"
            style={{ fontFamily: "var(--font-sans)", background: "var(--ember)", color: "var(--cream)", border: "1.5px solid var(--ember-accessible)", boxShadow: "2px 2px 0 rgba(171,78,26,.25)", cursor: "pointer" }}
          >
            <DownloadSimple size={15} />
            Скачать список
          </button>
          <button
            onClick={handleCopy}
            onMouseEnter={() => setCopyHovered(true)}
            onMouseLeave={() => setCopyHovered(false)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm transition-all"
            style={{
              fontFamily: "var(--font-sans)",
              background: "rgba(255,255,255,.7)",
              color: copied ? "var(--forest)" : "var(--charcoal)",
              border: `1.5px solid ${copied ? "var(--forest)" : copyHovered ? "var(--stone)" : "var(--sand-2)"}`,
              cursor: "pointer",
            }}
          >
            {copied ? <Check size={15} color="var(--forest)" /> : <Copy size={15} />}
            {copied ? "Скопировано!" : "Скопировать"}
          </button>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--stone)", marginLeft: "auto", opacity: 0.75 }}>
            цены ориентировочные
          </span>
          <button
            onClick={() => setExpanded(false)}
            style={{
              fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--stone)",
              background: "none", border: "none", cursor: "pointer",
              display: "inline-flex", alignItems: "center", gap: 4,
              opacity: 0.6, padding: "0 2px", marginTop: 10,
            }}
          >
            <CaretDown size={12} style={{ transform: "rotate(180deg)" }} />
            Свернуть
          </button>
        </div>

      </div>
    </div>
  );
}
