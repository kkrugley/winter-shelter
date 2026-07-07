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
import { CopyPostButton } from "./CopyPostButton";

export const metadata: Metadata = {
  title: "Материалы для публикаций",
  alternates: pageAlternates("/help/press"),
};

const READY_POSTS = [
  {
    label: "Короткий пост",
    text: "SafePaws — открытый проект с бесплатными чертежами домиков и поилок для уличных кошек. Скачал DXF, вырезал на лазере или собрал вручную — и у одной кошки есть укрытие на зиму. safepaws.ru",
  },
  {
    label: "Личная история",
    text: "Собрал(а) домик SafePaws для кошек во дворе — заняло меньше вечера, а чертежи и инструкция бесплатные. Если рядом с тобой тоже зимуют уличные кошки — посмотри safepaws.ru, там четыре готовых решения под разные ресурсы: руки, время, деньги или просто желание рассказать.",
  },
  {
    label: "Призыв к друзьям",
    text: "Ищу тех, кто готов помочь уличным кошкам этой зимой: safepaws.ru — открытый проект с бесплатными чертежами домиков и поилок. Даже если нет времени и инструментов — можно просто задонатить или переслать это сообщение дальше.",
  },
];

export default function PressPage() {
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
            <BreadcrumbPage>Материалы для публикаций</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="heading-display mb-3">Материалы для публикаций</h1>
      <p className="text-base max-w-[560px] mb-12" style={{ color: "var(--stone)" }}>
        Готовишь пост, видео или репост о SafePaws? Здесь — тексты, которые можно скопировать целиком
        или переписать под себя.
      </p>

      <section className="mb-12">
        <h2 className="heading-sub mb-1">Готовые тексты</h2>
        <p className="text-sm mb-5" style={{ color: "var(--stone)" }}>
          Три варианта под разный тон — бери как есть или отредактируй.
        </p>
        <div className="flex flex-col gap-3">
          {READY_POSTS.map(({ label, text }) => (
            <div
              key={label}
              className="rounded-xl p-5 border flex flex-col gap-3"
              style={{ borderColor: "var(--sand-2)", background: "var(--card-bg)" }}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-mono uppercase tracking-wide" style={{ color: "var(--stone)" }}>
                  {label}
                </span>
                <CopyPostButton text={text} />
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "var(--ink)" }}>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="heading-sub mb-2">Логотип и фирменный стиль</h2>
        <p className="text-sm max-w-[520px]" style={{ color: "var(--stone)" }}>
          Полный набор файлов логотипа и брендбук пока готовятся — появятся здесь. До тех пор для упоминания
          проекта достаточно текста «SafePaws» или лапки 🐾.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="heading-sub mb-2">Нужны фото или цитата?</h2>
        <p className="text-sm max-w-[520px] mb-4" style={{ color: "var(--stone)" }}>
          Реальные истории и фотографии установленных домиков — на странице историй. Если нужно что-то
          конкретное для публикации (интервью, отдельные фото в высоком качестве) — просто напиши нам.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/stories"
            className="inline-flex items-center px-5 py-2.5 rounded-full border text-sm font-medium transition-colors hover:border-[var(--ember)] hover:text-[var(--ember)]"
            style={{ borderColor: "var(--sand-2)", color: "var(--stone)" }}
          >
            Смотреть истории →
          </Link>
          <Link
            href="/help/press?mail-form=open"
            className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-medium text-white transition-opacity hover:opacity-90"
            style={{ background: "var(--ember)", boxShadow: "var(--shadow-btn)" }}
          >
            Написать нам
          </Link>
        </div>
      </section>
    </div>
  );
}
