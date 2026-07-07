"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { isExternalHref } from "@/lib/utils";
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
  HammerIcon,
  PencilSimpleIcon,
  MegaphoneSimpleIcon,
  HeartIcon,
  GlobeIcon,
  HandshakeIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react";

type Cap = "all" | "hands" | "time" | "money" | "voice";

const WAY_STRUCTURE: { slug: string; icon: React.ElementType; caps: Cap[]; href: string | null; dashed: boolean; title: string; desc: string; chips: string[]; cta: string }[] = [
  { slug: "build",     icon: HammerIcon,         caps: ["hands"],          href: "/solutions",                          dashed: false, title: "Скачайте файлы", desc: "Скачайте файлы любого из продуктов и изготовьте его! Построенный вами домик или установленная поилка непременно найдёт нуждающегося!", chips: ["Производство", "Инструменты"], cta: "К каталогу →" },
  { slug: "story",     icon: PencilSimpleIcon,   caps: ["time", "voice"],  href: "/solutions/add",                      dashed: false, title: "Предложить идею", desc: "Придумали что-то новое для помощи хвостатым? Заполните форму — мы обязательно воплотим это в жизнь!", chips: ["Помощь", "Идеи"], cta: "Заполните форму →" },
  { slug: "share",     icon: MegaphoneSimpleIcon,caps: ["voice"],          href: "/about#share",                        dashed: false, title: "Поделиться", desc: "Расскажите о проекте в соцсетях, перешлите друзьям и семье — предложите вместе построить домик на выходных!", chips: ["Помощь", "Соц сети"], cta: "Поделиться ↗" },
  { slug: "donate",    icon: HeartIcon,          caps: ["money"],          href: null,                                   dashed: false, title: "Поддержать", desc: "Деньги пойдут на материалы для прототипов новых решений и изготовление существующих.", chips: ["Развитие", "Поддержка проекта"], cta: "Поддержать →" },
  { slug: "community", icon: UsersThreeIcon,     caps: ["time", "voice"],  href: "https://t.me/safepaws_help",          dashed: false, title: "Сообщество в Telegram", desc: "Канал в Telegram, где обсуждаем установки и помогаем новичкам.", chips: ["Telegram", "Чат"], cta: "Вступить →" },
  { slug: "partner",   icon: HandshakeIcon,      caps: ["money", "voice"], href: "?mail-form=open",                     dashed: false, title: "Партнёрство", desc: "Хакспейсы, приюты, частная компания — готовы сотрудничать со всеми.", chips: ["Взаимопомощь", "Сотрудничество"], cta: "Написать →" },
  { slug: "translate", icon: GlobeIcon,          caps: ["time"],           href: "https://github.com/kkrugley/safepaws", dashed: false, title: "Перевести сайт", desc: "Помогите перевести сайт на другие языки! Если вы опытный разработчик или инженер — помогите улучшить сайт или продукты. Все исходники хранятся на GitHub.", chips: ["Перевод", "Развитие", "Разработка"], cta: "Открыть GitHub →" },
];

const CAP_FILTERS: { key: Cap; label: string; emoji: string }[] = [
  { key: "all",   label: "Показать всё", emoji: "" },
  { key: "hands", label: "Инструменты",  emoji: "🔨" },
  { key: "time",  label: "Время",        emoji: "🕐" },
  { key: "money", label: "Финансы",      emoji: "💸" },
  { key: "voice", label: "Аудитория",    emoji: "📱" },
];

export function HelpContent() {
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

  const filtered = WAY_STRUCTURE.filter((w) => cap === "all" || w.caps.includes(cap));

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
              <BreadcrumbPage>Как помочь</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="heading-display mb-3">Помогать можно по-разному!</h1>
        <p className="text-base text-ink-muted mb-10 max-w-[560px]">Не у всех есть инструменты и навыки. Не у всех есть время или деньги. Но у каждого есть хоть что-то.</p>

        <div className="border border-border-soft rounded-xl p-4 mb-10 flex flex-wrap gap-3 items-center">
          <span className="font-mono text-xs text-ink-muted">У меня есть:</span>
          {CAP_FILTERS.map(({ key, label, emoji }) => (
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
                    target={isExternalHref(href) ? "_blank" : undefined}
                    rel={isExternalHref(href) ? "noopener noreferrer" : undefined}
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
          <div className="heading-card text-ink-muted text-center py-20">Нет способов для этого фильтра</div>
        )}
      </div>

      <CtaBlock
        heading="Пока ты читаешь это, на улице –5°C."
        body="Любое действие с этой страницы — шаг в правильную сторону."
        links={[
          { label: "Самое простое: поделиться", href: "/", primary: true, action: "copy" as const },
          { label: "Пройти квиз",  href: "/#quiz" },
        ]}
      />
    </>
  );
}
