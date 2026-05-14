"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { DownloadSimple, CheckCircle } from "@phosphor-icons/react";
import { products, getAvailableProducts } from "@/data/products";

type Step = 1 | 2 | 3;

interface TranslatedNextStep { label: string; title: string; desc: string; linkLabel: string }

const NEXT_STEP_HREFS = [null, "https://t.me/safepaws_help", "/stories/add"];

const downloadableProducts = getAvailableProducts().filter(
  (p) => p.downloads.length > 0
);

export function DownloadContent() {
  const t = useTranslations("Download");
  const tCommon = useTranslations("Common");
  const tProducts = useTranslations("Products");

  const searchParams = useSearchParams();
  const paramSlug = searchParams?.get("product") ?? "";
  const validSlug = downloadableProducts.some((p) => p.slug === paramSlug)
    ? paramSlug
    : "cozy-shelter";

  const [step, setStep] = useState<Step>(1);
  const [selectedSlug, setSelectedSlug] = useState<string>(validSlug);
  const [selectedVariant, setSelectedVariant] = useState<string>("6mm");
  const [done, setDone] = useState(false);

  const selectedProduct = products.find((p) => p.slug === selectedSlug);
  const selectedDownload = selectedProduct?.downloads.find(
    (d) => d.variant === selectedVariant
  );

  const nextSteps = t.raw("nextSteps") as TranslatedNextStep[];

  const translatedDownloads: Record<string, string> = selectedProduct
    ? ((tProducts.raw(selectedProduct.slug) as { downloads?: Record<string, string> }).downloads ?? {})
    : {};

  if (done) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20 text-center">
        <CheckCircle size={56} weight="duotone" className="text-accent mx-auto mb-6" />
        <h1 className="heading-display mb-4">{t("doneTitle")}</h1>
        <p className="text-sm text-ink-muted mb-8">{t("doneDesc")}</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/stories/add"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-white text-sm font-medium hover:bg-[#c4673d] transition-colors"
          >
            {t("doneShare")}
          </Link>
          <Link
            href="/solutions"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border-soft text-ink text-sm hover:bg-accent-soft transition-colors"
          >
            {t("doneMore")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">{tCommon("breadHome")}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{t("breadDownload")}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="heading-display mb-2">{t("heading")}</h1>
      <p className="text-sm text-ink-muted mb-10">{t("subheading")}</p>

      <div className="flex items-center gap-3 mb-10">
        {([1, 2, 3] as Step[]).map((n, i) => (
          <div key={n} className="flex items-center gap-3 flex-1">
            <div
              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-mono shrink-0 transition-colors ${
                step >= n
                  ? "border-accent bg-accent text-white"
                  : "border-border-soft text-ink-muted"
              }`}
            >
              {n}
            </div>
            <span className={`text-sm font-medium transition-colors ${step >= n ? "text-ink" : "text-ink-muted"}`}>
              {[t("stepModel"), t("stepMaterial"), t("stepFile")][i]}
            </span>
            {n < 3 && (
              <div className={`flex-1 h-0.5 transition-colors ${step > n ? "bg-accent" : "bg-border-soft"}`} />
            )}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="border border-border-soft rounded-xl p-6">
          <span className="font-mono text-xs text-ink-muted block mb-4">{t("step1Header")}</span>
          <h2 className="heading-sub mb-6">{t("step1Title")}</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {downloadableProducts.map((p) => {
              const pT = tProducts.raw(p.slug) as { capacity: string };
              return (
                <button
                  key={p.slug}
                  onClick={() => setSelectedSlug(p.slug)}
                  className={`border-2 rounded-xl overflow-hidden text-left transition-colors ${
                    selectedSlug === p.slug ? "border-accent" : "border-border-soft hover:border-accent/40"
                  }`}
                >
                  <div className="relative h-[120px] w-full overflow-hidden">
                    <Image
                      src={p.images[0]}
                      alt={p.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 90vw, 200px"
                    />
                    {selectedSlug === p.slug && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full border border-accent/40 bg-accent-soft text-xs text-accent">
                        {t("selected")}
                      </span>
                    )}
                  </div>
                  <div className="p-3">
                    <strong className="heading-card text-lg block">{p.name}</strong>
                    <p className="text-xs text-ink-muted">{pT.capacity}</p>
                  </div>
                </button>
              );
            })}
          </div>
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => setStep(2)}
              className="px-6 py-2.5 rounded-lg bg-accent text-white text-sm font-medium hover:bg-[#c4673d] transition-colors"
            >
              {t("btnNext")}
            </button>
          </div>
        </div>
      )}

      {step === 2 && selectedProduct && (
        <div className="border border-border-soft rounded-xl p-6">
          <span className="font-mono text-xs text-ink-muted block mb-4">{t("step2Header")}</span>
          <h2 className="heading-sub mb-2">{t("step2Title")}</h2>
          <p className="text-sm text-ink-muted mb-6">
            {t("step2ModelLabel")} <strong>{selectedProduct.name}</strong>
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {selectedProduct.downloads.map((d) => (
              <button
                key={d.variant}
                onClick={() => setSelectedVariant(d.variant)}
                className={`border-2 rounded-xl p-5 text-left transition-colors ${
                  selectedVariant === d.variant
                    ? "border-accent bg-accent-soft"
                    : "border-border-soft hover:border-accent/40"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <strong className="text-sm text-ink">{translatedDownloads[d.variant] ?? d.label}</strong>
                  {d.recommended && (
                    <span className="px-2 py-0.5 rounded-full border border-accent/40 bg-accent text-white text-xs">
                      {t("recommended")}
                    </span>
                  )}
                </div>
                <p className="text-xs text-ink-muted">{t("sizeLabel")} {d.size}</p>
              </button>
            ))}
          </div>
          <div className="mt-6 flex justify-between">
            <button
              onClick={() => setStep(1)}
              className="px-4 py-2.5 rounded-lg border border-border-soft text-ink text-sm hover:bg-accent-soft transition-colors"
            >
              {t("btnBack")}
            </button>
            <button
              onClick={() => setStep(3)}
              className="px-6 py-2.5 rounded-lg bg-accent text-white text-sm font-medium hover:bg-[#c4673d] transition-colors"
            >
              {t("btnNext")}
            </button>
          </div>
        </div>
      )}

      {step === 3 && selectedProduct && selectedDownload && (
        <div className="border border-border-soft rounded-xl p-6">
          <span className="font-mono text-xs text-ink-muted block mb-4">{t("step3Header")}</span>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="heading-card mb-1">
                {selectedProduct.name} · {translatedDownloads[selectedDownload.variant] ?? selectedDownload.label}
              </h3>
              <p className="text-sm text-ink-muted">
                Safepaws{selectedProduct.name.replace(" ", "")}.zip · {selectedDownload.size}
              </p>
              <p className="text-xs text-ink-muted mt-1">{t("step3Inside")}</p>
            </div>
            <a
              href={selectedDownload.file}
              download
              onClick={() => {
                fetch("/api/downloads", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ product_slug: selectedSlug }),
                }).catch(() => {});
                setTimeout(() => setDone(true), 500);
              }}
              className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-white text-sm font-medium hover:bg-[#c4673d] transition-colors"
            >
              <DownloadSimple size={18} weight="bold" />
              {t("btnDownload")}
            </a>
          </div>
          <div className="mt-6">
            <button
              onClick={() => setStep(2)}
              className="px-4 py-2.5 rounded-lg border border-border-soft text-ink text-sm hover:bg-accent-soft transition-colors"
            >
              {t("btnBack")}
            </button>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-5 mt-10">
        {nextSteps.map(({ label, title, desc, linkLabel }, i) => (
          <div key={i} className="border border-border-soft rounded-xl p-5">
            <span className="font-mono text-xs text-ink-muted block mb-2">{label}</span>
            <h4 className="heading-card text-xl mb-2">{title}</h4>
            <p className="text-xs text-ink-muted mb-3">{desc}</p>
            {NEXT_STEP_HREFS[i] && (
              <Link href={NEXT_STEP_HREFS[i]!} className="text-xs text-accent hover:underline">
                {linkLabel}
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
