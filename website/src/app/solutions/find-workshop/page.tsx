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
import { MapPin, Scissors, Cube, Wrench, Plus, ArrowSquareOut } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Мастерские рядом",
  alternates: pageAlternates("/solutions/find-workshop"),
};

const CAPABILITIES = [
  { icon: Scissors, label: "Лазерная резка", desc: "Точный рез фанеры 3–6 мм для домиков" },
  { icon: Wrench,   label: "ЧПУ-фрезеровка", desc: "Для более сложных деталей и партий" },
  { icon: Cube,     label: "3D-печать",      desc: "Корпуса PurrTap и мелкие детали" },
];

const STEPS = [
  { title: "Найди мастерскую", desc: "В каталоге ниже или на hackerspaces.ru — там собраны хакспейсы разных городов." },
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
        Приходишь со своим чертежом и материалом, платишь за час аренды или бартером — уходишь с готовыми деталями.
      </p>

      <div className="grid sm:grid-cols-3 gap-4 mb-12">
        {CAPABILITIES.map(({ icon: Icon, label, desc }) => (
          <div
            key={label}
            className="rounded-xl p-5 border flex flex-col gap-2"
            style={{ borderColor: "var(--sand-2)", background: "var(--card-bg)" }}
          >
            <Icon size={26} weight="duotone" style={{ color: "var(--ember)" }} />
            <p className="text-sm font-medium" style={{ color: "var(--ink)" }}>{label}</p>
            <p className="text-xs" style={{ color: "var(--stone)" }}>{desc}</p>
          </div>
        ))}
      </div>

      <div
        className="rounded-2xl p-8 text-center mb-12"
        style={{ background: "var(--cream-2)", border: "1.5px dashed var(--sand-2)" }}
      >
        <MapPin size={30} weight="duotone" style={{ color: "var(--stone)", margin: "0 auto 12px" }} />
        <h2 className="heading-card mb-2">Каталог только запускается</h2>
        <p className="text-sm max-w-[440px] mx-auto mb-6" style={{ color: "var(--stone)" }}>
          Мы собираем первые мастерские от волонтёров — список появится здесь. Знаешь подходящее место в своём городе?
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/solutions/find-workshop/add"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white transition-opacity hover:opacity-90"
            style={{ background: "var(--ember)", boxShadow: "var(--shadow-btn)" }}
          >
            <Plus size={16} weight="bold" />
            Добавить мастерскую
          </Link>
          <a
            href="https://hackerspaces.ru"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm transition-colors hover:border-[var(--ember)] hover:text-[var(--ember)]"
            style={{ borderColor: "var(--sand-2)", color: "var(--stone)" }}
          >
            hackerspaces.ru
            <ArrowSquareOut size={15} />
          </a>
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
