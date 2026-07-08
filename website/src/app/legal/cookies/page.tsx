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

export const metadata: Metadata = {
  title: "Политика cookies и трекеров",
  alternates: pageAlternates("/legal/cookies"),
};

const TOOLS = [
  {
    name: "PostHog",
    purpose: "Продуктовая аналитика — какие страницы открывают, на что нажимают.",
    detail: "Хостится в ЕС, запросы идут через собственный прокси /ingest. Захват ошибок, «мёртвых» кликов и тепловых карт отключён.",
  },
  {
    name: "Sentry",
    purpose: "Отслеживание технических ошибок и сбоев рендера.",
    detail: "При ошибке может записываться сессия (действия перед сбоем), чтобы понять причину и исправить баг.",
  },
  {
    name: "Vercel Speed Insights",
    purpose: "Метрики скорости загрузки страниц.",
    detail: "Обезличенные технические показатели производительности.",
  },
  {
    name: "Cloudflare Turnstile",
    purpose: "Проверка «не робот» на формах (истории, идеи, мастерские, подписка).",
    detail: "Не показывает капчу и не используется в рекламных целях — только антиспам-проверка при отправке формы.",
  },
];

export default function CookiesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Главная</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/legal">Правовая информация</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Cookies и трекеры</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="heading-display mb-3">Политика cookies и трекеров</h1>
      <p className="text-sm mb-10" style={{ color: "var(--stone)" }}>
        Последнее обновление: 8 июля 2026 г.
      </p>

      <div className="flex flex-col gap-10 text-sm leading-relaxed" style={{ color: "var(--ink)" }}>
        <section>
          <h2 className="heading-sub mb-3">Что мы используем</h2>
          <p style={{ color: "var(--stone)" }}>
            Сайт использует cookies и похожие технологии (localStorage, идентификаторы браузера) только
            для аналитики, диагностики ошибок и защиты форм от спама — без рекламных сетей и без
            кросс-сайтового отслеживания.
          </p>
        </section>

        <section>
          <h2 className="heading-sub mb-4">Инструменты</h2>
          <div className="flex flex-col gap-5">
            {TOOLS.map((t) => (
              <div key={t.name} className="pb-5 border-b" style={{ borderColor: "var(--sand)" }}>
                <h3 className="font-medium mb-1" style={{ color: "var(--ink)" }}>{t.name}</h3>
                <p style={{ color: "var(--stone)" }}>{t.purpose}</p>
                <p className="mt-1 text-xs" style={{ color: "var(--stone)" }}>{t.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="heading-sub mb-3">Как отключить</h2>
          <p style={{ color: "var(--stone)" }}>
            Вы можете заблокировать эти технологии настройками браузера (запрет cookies и localStorage
            для сайта) или расширениями-блокировщиками трекеров — работа сайта при этом не нарушится,
            перестанет собираться только аналитика.
          </p>
        </section>

        <section>
          <h2 className="heading-sub mb-3">Подробнее</h2>
          <p style={{ color: "var(--stone)" }}>
            Общее описание того, какие данные собираются и зачем — в{" "}
            <Link href="/legal/privacy" className="underline hover:text-[var(--ember)]">
              политике конфиденциальности
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
