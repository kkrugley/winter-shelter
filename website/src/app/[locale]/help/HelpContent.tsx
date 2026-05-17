"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link, useRouter, usePathname } from "@/i18n/navigation";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { CtaBlock } from "@/components/ui/CtaBlock";
import {
  Hammer,
  PencilSimple,
  MegaphoneSimple,
  Heart,
  Globe,
  Handshake,
  UsersThree,
} from "@phosphor-icons/react";

type Cap = "all" | "hands" | "time" | "money" | "voice";

interface TranslatedWay { title: string; desc: string; chips: string[]; cta: string }

const WAY_STRUCTURE: { slug: string; icon: React.ElementType; caps: Cap[]; href: string | null; dashed: boolean }[] = [
  { slug: "build",     icon: Hammer,         caps: ["hands"],           href: "/solutions",                     dashed: false },
  { slug: "story",     icon: PencilSimple,   caps: ["time", "voice"],   href: "/solutions/add",                 dashed: false },
  { slug: "share",     icon: MegaphoneSimple,caps: ["voice"],            href: "/about#share",                   dashed: false },
  { slug: "donate",    icon: Heart,          caps: ["money"],            href: null,                             dashed: false },
  { slug: "community", icon: UsersThree,     caps: ["time", "voice"],   href: "https://t.me/safepaws_help",     dashed: false },
  { slug: "partner",   icon: Handshake,      caps: ["money", "voice"],  href: "mailto:safepaws.help@proton.me",      dashed: false },
  { slug: "translate", icon: Globe,          caps: ["time"],             href: "https://github.com/kkrugley/safepaws", dashed: false },
];

export function HelpContent() {
  const t = useTranslations("Help");
  const tCommon = useTranslations("Common");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const cardParam = searchParams?.get("card") ?? null;

  const [cap, setCap] = useState<Cap>("all");
  const [highlighted, setHighlighted] = useState<string | null>(cardParam);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (cardParam) {
      setHighlighted(cardParam);
      timerRef.current = setTimeout(() => setHighlighted(null), 3000);
    } else {
      setHighlighted(null);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [cardParam]);

  const tWays = t.raw("ways") as TranslatedWay[];
  const ways = WAY_STRUCTURE.map((s, i) => ({ ...s, ...tWays[i] }));

  const capFilters: { key: Cap; label: string; emoji: string }[] = [
    { key: "all",   label: t("filterAll"),   emoji: "" },
    { key: "hands", label: t("filterHands"), emoji: "🔨" },
    { key: "time",  label: t("filterTime"),  emoji: "🕐" },
    { key: "money", label: t("filterMoney"), emoji: "💸" },
    { key: "voice", label: t("filterVoice"), emoji: "📱" },
  ];

  const filtered = ways.filter((w) => cap === "all" || w.caps.includes(cap));

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">{tCommon("breadHome")}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{t("breadHelp")}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="heading-display mb-3">{t("heading")}</h1>
        <p className="text-base text-ink-muted mb-10 max-w-[560px]">{t("subheading")}</p>

        <div className="border border-border-soft rounded-xl p-4 mb-10 flex flex-wrap gap-3 items-center">
          <span className="font-mono text-xs text-ink-muted">{t("filterLabel")}</span>
          {capFilters.map(({ key, label, emoji }) => (
            <button
              key={key}
              onClick={() => setCap(key)}
              className={`px-3 py-1.5 rounded-full border text-xs transition-colors ${
                cap === key
                  ? "border-accent bg-accent-soft text-accent"
                  : "border-border-soft text-ink-muted hover:border-accent/40 hover:text-accent"
              }`}
            >
              {emoji && <span className="mr-1">{emoji}</span>}
              {label}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(({ slug, icon: Icon, title, desc, chips, cta, href, dashed }) => {
            const isHighlighted = highlighted === slug;
            return (
              <div
                key={slug}
                className={`rounded-xl p-6 flex flex-col gap-3 border bg-paper transition-colors duration-500 hover:border-accent ${
                  dashed ? "border-dashed" : ""
                } ${
                  isHighlighted
                    ? "border-accent"
                    : dashed
                    ? "border-accent/30"
                    : "border-border-soft"
                }`}
              >
                <Icon size={32} weight="duotone" className="text-ink-muted" />
                <h3 className="heading-card">{title}</h3>
                <p className="text-sm text-ink-muted flex-1">{desc}</p>
                <div className="flex flex-wrap gap-2">
                  {chips.map((c) => (
                    <span key={c} className="px-2 py-0.5 rounded-full border border-border-soft text-xs text-ink-muted">
                      {c}
                    </span>
                  ))}
                </div>
                {href === null ? (
                  <button
                    onClick={() => router.push(`${pathname}?donate=open`)}
                    className="inline-flex items-center text-sm font-medium hover:underline mt-1 text-ink"
                  >
                    {cta}
                  </button>
                ) : (
                  <Link
                    href={href}
                    className="inline-flex items-center text-sm font-medium hover:underline mt-1 text-ink"
                  >
                    {cta}
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="heading-card text-ink-muted text-center py-20">{t("noResults")}</div>
        )}
      </div>

      <CtaBlock
        heading={t("ctaHeading")}
        body={t("ctaBody")}
        links={[
          { label: t("ctaShare"), href: "/", primary: true, action: "copy" as const },
          { label: t("ctaQuiz"),  href: "/#quiz" },
        ]}
      />
    </>
  );
}
