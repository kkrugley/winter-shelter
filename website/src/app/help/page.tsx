"use client";

import { useState } from "react";
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
    icon: Hammer,
    title: "Собрать домик",
    desc: "Скачай чертёж, вырежи и установи. Или найди ближайший хакспейс.",
    chips: ["2 часа", "фанера"],
    caps: ["hands"] as Cap[],
    cta: "К каталогу →",
    href: "/solutions",
    accent: true,
  },
  {
    icon: Drop,
    title: "Поставить PurrTap",
    desc: "Простая поилка из бутылки. Инструкция на 1 страницу.",
    chips: ["20 минут", "бутылка"],
    caps: ["hands", "time"] as Cap[],
    cta: "Инструкция →",
    href: "/solutions/purrtap",
    accent: true,
  },
  {
    icon: MapPin,
    title: "Забрать готовый",
    desc: "В 3 городах мы собираем домики партиями — можешь забрать и поставить.",
    chips: ["Минск", "Брест", "Гродно"],
    caps: ["time"] as Cap[],
    cta: "Записаться →",
    href: "/about#contact",
    accent: false,
  },
  {
    icon: MegaphoneSimple,
    title: "Рассказать",
    desc: "Поделиться в соцсетях, переслать другу с CNC.",
    chips: ["Telegram", "5 минут"],
    caps: ["voice"] as Cap[],
    cta: "Поделиться →",
    href: "/about#share",
    accent: false,
  },
  {
    icon: PencilSimple,
    title: "Добавить историю",
    desc: "Уже есть домик? Добавь точку на карту и фото. Это мотивирует других.",
    chips: ["2 фото", "пара строк"],
    caps: ["time", "voice"] as Cap[],
    cta: "Форма истории →",
    href: "/stories/add",
    accent: false,
  },
  {
    icon: Heart,
    title: "Поддержать",
    desc: "Донат идёт на материалы и раздачу готовых домиков.",
    chips: ["любая сумма"],
    caps: ["money"] as Cap[],
    cta: "Поддержать →",
    href: "/about#donate",
    accent: false,
  },
  {
    icon: Globe,
    title: "Перевести сайт",
    desc: "Помоги локализовать на другой язык — файлы в GitHub.",
    chips: ["язык", "удалённо"],
    caps: ["time"] as Cap[],
    cta: "Открыть GitHub →",
    href: "https://github.com/kkrugley/safepaws",
    accent: false,
  },
  {
    icon: Handshake,
    title: "Партнёрство",
    desc: "Хакспейс, приют, компания — готовы сотрудничать.",
    chips: ["организация"],
    caps: ["time", "voice"] as Cap[],
    cta: "Написать →",
    href: "mailto:kkrugley@proton.me",
    accent: false,
  },
  {
    icon: UsersThree,
    title: "Сообщество в Telegram",
    desc: "Канал в Telegram, где обсуждаем установки и помогаем новичкам.",
    chips: ["Telegram"],
    caps: ["time", "voice"] as Cap[],
    cta: "Вступить →",
    href: "https://t.me/safepaws_help",
    accent: false,
    dashed: true,
  },
];

const capFilters: { key: Cap; label: string; emoji: string }[] = [
  { key: "all", label: "всё показать", emoji: "" },
  { key: "hands", label: "руки/инструмент", emoji: "🔨" },
  { key: "time", label: "время", emoji: "🕐" },
  { key: "money", label: "средства", emoji: "💸" },
  { key: "voice", label: "голос/сеть", emoji: "📱" },
];

export default function HelpPage() {
  const [cap, setCap] = useState<Cap>("all");

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
              <BreadcrumbLink href="/">главная</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>как помочь</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="heading-display mb-3">Помогать можно по-разному.</h1>
        <p className="text-base text-ink-muted mb-10 max-w-[560px]">
          Не у всех есть лобзик. Не у всех есть время. Но у каждого есть хоть
          что-то. Вот пути.
        </p>

        {/* Filter */}
        <div className="border border-border-soft rounded-xl p-4 mb-10 flex flex-wrap gap-3 items-center">
          <span className="font-mono text-xs text-ink-muted">у меня есть:</span>
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
          {filtered.map(({ icon: Icon, title, desc, chips, cta, href, accent, dashed }) => (
            <div
              key={title}
              className={`rounded-xl p-6 flex flex-col gap-3 border ${
                dashed
                  ? "border-dashed border-accent/30 bg-paper"
                  : accent
                  ? "bg-accent-soft border-accent/20"
                  : "bg-paper border-border-soft"
              }`}
            >
              <Icon
                size={32}
                weight="duotone"
                className={accent ? "text-accent" : "text-ink-muted"}
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
                href={href}
                className={`inline-flex items-center text-sm font-medium hover:underline mt-1 ${
                  accent ? "text-accent" : "text-ink"
                }`}
              >
                {cta}
              </Link>
            </div>
          ))}
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
