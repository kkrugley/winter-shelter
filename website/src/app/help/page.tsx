"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
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
  Drop,
  MapPin,
  PencilSimple,
  MegaphoneSimple,
  Heart,
  Globe,
  Handshake,
  UsersThree,
} from "@phosphor-icons/react";

type Cap = "all" | "hands" | "time" | "money" | "voice";

const ways = [
  {
    slug: "build",
    icon: Hammer,
    title: "Скачайте файлы",
    desc: "Скачайте файлы любого из продуктов и изготовьте его! Построенный вами домик, или установленная поилка непременно найдет нуждающегося!",
    chips: ["Производство", "Инструменты"],
    caps: ["hands"] as Cap[],
    cta: "К каталогу →",
    href: "/solutions",
    dashed: false,
  },
  {
    slug: "story",
    icon: PencilSimple,
    title: "Предложить идею",
    desc: "Придумали что-то новое для помощи хвостатым? Заполните форму - мы обязательное воплотим это в жизнь!",
    chips: ["Помощь", "Идеи"],
    caps: ["time", "voice"] as Cap[],
    cta: "Заполните форму →",
    href: "/solutions/add",
    dashed: false,
  },
  {
    slug: "share",
    icon: MegaphoneSimple,
    title: "Поделиться",
    desc: "Расскажите о проекте в соцсетях, перешлите друзьям и семье - предложите вместе построить домик на выходных!",
    chips: ["Помощь", "Соц сети"],
    caps: ["voice"] as Cap[],
    cta: "Поделиться ↗",
    href: "/about#share",
    dashed: false,
  },
  {
    slug: "donate",
    icon: Heart,
    title: "Поддержать",
    desc: "Деньги пойдут на материалы для прототипов новых решений и изготовление существующих.",
    chips: ["Развитие", "Поддержка проекта"],
    caps: ["money"] as Cap[],
    cta: "Поддержать →",
    href: null,
    dashed: false,
  },
  {
    slug: "community",
    icon: UsersThree,
    title: "Сообщество в Telegram",
    desc: "Канал в Telegram, где обсуждаем установки и помогаем новичкам.",
    chips: ["Telegram", "Чат"],
    caps: ["time", "voice"] as Cap[],
    cta: "Вступить →",
    href: "https://t.me/safepaws_help",
    dashed: false,
  },
  {
    slug: "partner",
    icon: Handshake,
    title: "Партнёрство",
    desc: "Хакспейсы, приюты, частная компания — готовы сотрудничать со всеми.",
    chips: ["Взаимопомощь", "Сотрудничество"],
    caps: ["money", "voice"] as Cap[],
    cta: "Написать →",
    href: "mailto:kkrugley@proton.me",
    dashed: false,
  },
  {
    slug: "translate",
    icon: Globe,
    title: "Перевести сайт",
    desc: "Помогите перевести сайт на другие языки! Если вы опытный разработчик или инженер - помогите улучшить сайт или продукты. Все исходники хранятся на GitHub.",
    chips: ["Перевод", "Развитие", "Разработка"],
    caps: ["time"] as Cap[],
    cta: "Открыть GitHub →",
    href: "https://github.com/kkrugley/safepaws",
    dashed: false,
  },
];

const capFilters: { key: Cap; label: string; emoji: string }[] = [
  { key: "all", label: "Показать всё", emoji: "" },
  { key: "hands", label: "Инструменты", emoji: "🔨" },
  { key: "time", label: "Время", emoji: "🕐" },
  { key: "money", label: "Финансы", emoji: "💸" },
  { key: "voice", label: "Аудитория", emoji: "📱" },
];

function HelpPageContent() {
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

  const filtered = ways.filter(
    (w) => cap === "all" || w.caps.includes(cap)
  );

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Главная</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Как помочь</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="heading-display mb-3">Помогать можно по-разному!</h1>
        <p className="text-base text-ink-muted mb-10 max-w-[560px]">
          Не у всех есть инструменты и навыки. Не у всех есть время или деньги. Но у каждого есть хоть что-то.
        </p>

        {/* Filter */}
        <div className="border border-border-soft rounded-xl p-4 mb-10 flex flex-wrap gap-3 items-center">
          <span className="font-mono text-xs text-ink-muted">У меня есть:</span>
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

        {/* 9-card grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(({ slug, icon: Icon, title, desc, chips, cta, href, dashed }: { slug: string; icon: React.ElementType; title: string; desc: string; chips: string[]; cta: string; href: string | null; dashed: boolean; caps: Cap[] }) => {
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
                <Icon
                  size={32}
                  weight="duotone"
                  className="text-ink-muted"
                />
                <h3 className="heading-card">{title}</h3>
                <p className="text-sm text-ink-muted flex-1">{desc}</p>
                <div className="flex flex-wrap gap-2">
                  {chips.map((c) => (
                    <span
                      key={c}
                      className="px-2 py-0.5 rounded-full border border-border-soft text-xs text-ink-muted"
                    >
                      {c}
                    </span>
                  ))}
                </div>
                <Link
                  href={href ?? "?donate=open"}
                  className="inline-flex items-center text-sm font-medium hover:underline mt-1 text-ink"
                >
                  {cta}
                </Link>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="heading-card text-ink-muted text-center py-20">
            Нет способов для этого фильтра
          </div>
        )}
      </div>

      {/* BIG CALL */}
      <CtaBlock
        heading="Пока ты читаешь это, на улице –5°C."
        body="Любое действие с этой страницы — шаг в правильную сторону."
        links={[
          { label: "Самое простое: поделиться", href: "/", primary: true, action: 'copy' as const },
          { label: "Пройти квиз",                    href: "/#quiz" },
        ]}
      />

    </>
  );
}

export default function HelpPage() {
  return (
    <Suspense>
      <HelpPageContent />
    </Suspense>
  );
}
