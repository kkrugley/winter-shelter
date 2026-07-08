import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheckIcon, FileTextIcon, CookieIcon, ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { pageAlternates } from "@/lib/metadata";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { DeleteDataButton } from "./DeleteDataButton";

export const metadata: Metadata = {
  title: "Правовая информация",
  alternates: pageAlternates("/legal"),
};

const DOCUMENTS = [
  {
    href: "/legal/privacy",
    icon: ShieldCheckIcon,
    title: "Политика конфиденциальности",
    desc: "Какие данные собирают сайт и Telegram-бот, зачем и кому передаются.",
  },
  {
    href: "/legal/terms",
    icon: FileTextIcon,
    title: "Пользовательское соглашение",
    desc: "Условия использования сайта, бота, лицензия на чертежи и правила публикаций.",
  },
  {
    href: "/legal/cookies",
    icon: CookieIcon,
    title: "Cookies и трекеры",
    desc: "Какие аналитические и антиспам-инструменты используются на сайте.",
  },
];

export default function LegalPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Главная</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbPage>Правовая информация</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="heading-display mb-3">Правовая информация</h1>
      <p className="text-base max-w-[560px] mb-10" style={{ color: "var(--stone)" }}>
        Документы о том, как устроены сайт safepaws.ru и Telegram-бот проекта: какие данные
        собираются, на каких условиях используется контент и как запросить удаление своих данных.
      </p>

      <div className="flex flex-col gap-3 mb-12">
        {DOCUMENTS.map(({ href, icon: Icon, title, desc }) => (
          <Link
            key={href}
            href={href}
            className="group flex items-center gap-4 rounded-2xl p-5 border transition-colors hover:border-[var(--ember)]"
            style={{ background: "var(--card-bg)", borderColor: "var(--sand-2)" }}
          >
            <span
              className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
              style={{ background: "var(--ember-pale)", color: "var(--ember)" }}
            >
              <Icon size={20} weight="bold" />
            </span>
            <span className="flex-1">
              <span className="block heading-sub text-base mb-0.5">{title}</span>
              <span className="block text-sm" style={{ color: "var(--stone)" }}>{desc}</span>
            </span>
            <ArrowRightIcon size={16} className="shrink-0 text-[var(--stone)] transition-transform group-hover:translate-x-0.5 group-hover:text-[var(--ember)]" />
          </Link>
        ))}
      </div>

      <div
        className="rounded-2xl p-6 border flex flex-col sm:flex-row sm:items-center gap-4 justify-between"
        style={{ background: "var(--ember-pale)", borderColor: "var(--ember-soft)" }}
      >
        <div>
          <h2 className="heading-sub text-base mb-1">Хочешь удалить свои данные?</h2>
          <p className="text-sm" style={{ color: "var(--stone)" }}>
            Например, если раньше добавил(а) историю, идею или подписался(лась) на рассылку — и
            теперь хочешь, чтобы это удалили.
          </p>
        </div>
        <DeleteDataButton />
      </div>
    </div>
  );
}
