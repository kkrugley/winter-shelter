import type { Metadata } from "next";
import Link from "next/link";
import { pageAlternates } from "@/lib/metadata";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { MapPinIcon, PlusIcon } from "@phosphor-icons/react/dist/ssr";
import WorkshopFinder from "./WorkshopFinder";

export const metadata: Metadata = {
  title: "Мастерские рядом",
  alternates: pageAlternates("/solutions/find-workshop"),
};

const STEPS = [
  { title: "Найди мастерскую", desc: "Выбери услугу и город — мы соберём мастерские из открытых источников и покажем их здесь." },
  { title: "Договорись о времени", desc: "Большинство мастерских рады разовым проектам для доброго дела — просто напиши им." },
  { title: "Приходи с чертежом", desc: "Скачай DXF нужного решения из каталога SafePaws и принеси свой материал." },
];

export default function FindWorkshopPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Главная</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/solutions">Решения</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Мастерские</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="heading-display mb-3">Нет инструментов — не беда</h1>
      <p className="text-base max-w-[560px] mb-10" style={{ color: "var(--stone)" }}>
        Лазерный резак или ЧПУ-станок не нужен дома — они есть в хакспейсах и мастерских по соседству.
        Приходишь со своим чертежом и материалом, оплачиваешь — уходишь с готовыми деталями.
      </p>

      <WorkshopFinder />

      <div
        className="rounded-2xl p-8 text-center mb-12"
        style={{ background: "var(--cream-2)", border: "1.5px dashed var(--sand-2)" }}
      >
        <MapPinIcon size={30} weight="duotone" style={{ color: "var(--stone)", margin: "0 auto 12px" }} />
        <h2 className="heading-card mb-2">Каталог только запускается</h2>
        <p className="text-sm max-w-[440px] mx-auto mb-6" style={{ color: "var(--stone)" }}>
          Чем больше мастерских добавит сообщество, тем полнее становится база. Знаешь подходящее место в своём городе?
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/solutions/find-workshop/add"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white transition-opacity hover:opacity-90"
            style={{ background: "var(--ember)", boxShadow: "var(--shadow-btn)" }}
          >
            <PlusIcon size={16} weight="bold" />
            Добавить мастерскую
          </Link>
        </div>
      </div>

      <h2 className="heading-sub mb-5">Как это работает</h2>
      <div className="flex flex-col gap-4 mb-4">
        {STEPS.map(({ title, desc }, i) => (
          <div key={title} className="flex gap-4">
            <span
              className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-medium"
              style={{ background: "var(--ember-pale)", color: "var(--ember-accessible)" }}
            >
              {i + 1}
            </span>
            <div>
              <p className="text-sm font-medium" style={{ color: "var(--ink)" }}>{title}</p>
              <p className="text-sm" style={{ color: "var(--stone)" }}>{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
