import type { Metadata } from "next";
import Link from "next/link";
import { pageAlternates } from "@/lib/metadata";
import { getStats } from "@/lib/stats";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Отчёт расходов",
  alternates: pageAlternates("/help/spendings"),
};

const SPENDING_CATEGORIES = [
  { title: "Материалы", desc: "Фанера, крепёж и PETG для готовых домиков и поилок, которые волонтёры устанавливают на местах." },
  { title: "Хостинг и домен", desc: "Сайт safepaws.ru, база данных и рассылка — постоянные небольшие расходы на инфраструктуру." },
  { title: "Прототипы", desc: "Материалы и печать для новых решений, прежде чем чертёж попадёт в открытый каталог." },
];

export default async function SpendingsPage() {
  const stats = await getStats();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Главная</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/help">Как помочь</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Отчёт расходов</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="heading-display mb-3">Куда идут пожертвования</h1>
      <p className="text-base max-w-[560px] mb-10" style={{ color: "var(--stone)" }}>
        SafePaws — волонтёрский проект без штата и офиса. Все взносы уходят напрямую на материалы,
        инфраструктуру сайта и разработку новых решений.
      </p>

      <div className="grid sm:grid-cols-3 gap-4 mb-4">
        {[
          { value: String(stats.installations || 0), label: "установленных решений" },
          { value: String(stats.downloads || 0),      label: "скачиваний чертежей" },
          { value: String(stats.countries || 0),       label: "стран" },
        ].map(({ value, label }) => (
          <div
            key={label}
            className="rounded-xl p-5 text-center"
            style={{ background: "var(--card-bg)", border: "1px solid var(--sand-2)" }}
          >
            <p style={{ fontFamily: "var(--font-lora)", fontSize: "2rem", fontWeight: 700, color: "var(--ember)", lineHeight: 1 }}>
              {value}
            </p>
            <p className="text-xs mt-1.5" style={{ color: "var(--stone)" }}>{label}</p>
          </div>
        ))}
      </div>
      <p className="text-xs mb-12" style={{ color: "var(--stone)", opacity: 0.75 }}>
        Реальный эффект от пожертвований — то, что мы можем показать честно уже сейчас.
      </p>

      <section className="mb-12">
        <h2 className="heading-sub mb-4">На что уходят деньги</h2>
        <p className="text-sm mb-5" style={{ color: "var(--stone)" }}>
          Подробную постатейную бухгалтерию мы пока не ведём публично — проект небольшой, и большая часть
          трат идёт напрямую волонтёрам на материалы. Основные направления:
        </p>
        <div className="flex flex-col gap-3">
          {SPENDING_CATEGORIES.map(({ title, desc }) => (
            <div
              key={title}
              className="rounded-xl p-5 border"
              style={{ borderColor: "var(--sand-2)", background: "var(--card-bg)" }}
            >
              <p className="text-sm font-medium mb-1" style={{ color: "var(--ink)" }}>{title}</p>
              <p className="text-sm" style={{ color: "var(--stone)" }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="heading-sub mb-2">Нужна детализация?</h2>
        <p className="text-sm max-w-[520px] mb-4" style={{ color: "var(--stone)" }}>
          Если поддерживаешь проект крупной суммой или на регулярной основе и хочешь видеть построчный отчёт —
          напиши нам, пришлём актуальные цифры напрямую.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/help/spendings?mail-form=open"
            className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-medium text-white transition-opacity hover:opacity-90"
            style={{ background: "var(--ember)", boxShadow: "var(--shadow-btn)" }}
          >
            Написать нам
          </Link>
          <Link
            href="/help"
            className="inline-flex items-center px-5 py-2.5 rounded-full border text-sm font-medium transition-colors hover:border-[var(--ember)] hover:text-[var(--ember)]"
            style={{ borderColor: "var(--sand-2)", color: "var(--stone)" }}
          >
            Другие способы помочь →
          </Link>
        </div>
      </section>
    </div>
  );
}
