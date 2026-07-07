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
import { PostTextBlock } from "./PostTextBlock";
import { CopySiteLink } from "./CopySiteLink";

export const metadata: Metadata = {
  title: "Материалы для публикаций",
  alternates: pageAlternates("/help/press"),
};

const READY_POSTS = [
  {
    label: "Короткий (сторис, твиты, подписи)",
    text: "Нашёл проект SafePaws — ребята выкладывают бесплатные чертежи утеплённых домиков для уличных кошек. Скачал, вырезал на лазере, собрал за пару часов — и во дворе тёплый дом для кошек.\nsafepaws.ru",
  },
  {
    label: "Короткий, сезонный",
    text: "Зимой уличным кошкам буквально негде спрятаться от холода. А тут проект SafePaws с бесплатными чертежами утеплённых укрытий — двойные стены, вход не продувает, крыша под наклоном, чтоб снег не копился. Фанера рублей на 100, собирается за вечер.\nsafepaws.ru",
  },
  {
    label: "Средний, просветительский",
    text: "Зимой уличные кошки прячутся где придётся — подвалы, машины, теплотрассы. Приют построить может не каждый, а вот собрать домик по готовым чертежам — вполне.\n\nПроект SafePaws выкладывает чертежи утеплённых укрытий бесплатно — файлы, резка на лазере, сборка за вечер. Влагостойкая фанера и воздушная прослойка в стенах держат тепло не один сезон.\n\nЧем больше людей увидят чертежи, тем больше тёплых домиков появится вокруг нас.\nsafepaws.ru",
  },
  {
    label: "Средний (Telegram/VK)",
    text: "Наткнулся на SafePaws — проект, где выкладывают бесплатные чертежи укрытий для уличных кошек. Скачиваешь DXF, режешь на лазере (как минимум одна мастерская найдется каждом городе), собираешь за 1 час — и готов домик для нуждающихся.\n\nКонструкция без изысков, но рабочая: двойные стены держат тепло, угловой вход не продувает, крыша под наклоном — снег не залёживается. Есть маленькая версия на 1–2 кошки и большая, на 3-5 кошек.\nsafepaws.ru",
  },
  {
    label: "Средний, для мейкеров и DIY-аудитории",
    text: "Если есть лазерный станок и лист фанеры — вот занятие на выходной с понятным результатом. Проект SafePaws выкладывает open-hardware чертежи укрытий для уличных кошек: DXF на резку, PDF с инструкцией, лицензия CC BY 4.0, код на GitHub.\n\nИз технического: двойные стены с утеплителем, Г-образный вестибюль от ветра, наклонная крыша, держатель под миски. Собирается на ПВА, без единого шурупа. Стоимость проекта - несколько чашек кофе, но значимость - бесценна!\n\nВ планах у проекта — поилка и кормушка под 3D-печать.\nЧертежи: safepaws.ru,\nкод: github.com/kkrugley/safepaws",
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
          Варианты под разный тон, длину и площадку — бери как есть или отредактируй.
        </p>
        <div className="flex flex-col gap-3">
          {READY_POSTS.map(({ label, text }) => (
            <PostTextBlock key={label} label={label} text={text} />
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="heading-sub mb-2">Логотип и фирменный стиль</h2>
        <p className="text-sm max-w-[520px]" style={{ color: "var(--stone)" }}>
          Полный набор файлов логотипа и брендбук пока готовятся — появятся здесь. До тех пор для упоминания
          проекта достаточно текста «Safepaws» и ссылки на сайт — <CopySiteLink />.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="heading-sub mb-2">Нужны фото или цитата?</h2>
        <p className="text-sm max-w-[520px] mb-4" style={{ color: "var(--stone)" }}>
          Реальные истории и фотографии установленных домиков — на странице историй. Фото самих товаров
          можно взять в каталоге решений. Если нужно что-то конкретное для публикации (интервью, отдельные
          фото в высоком качестве) — просто напиши нам.
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
            href="/solutions"
            className="inline-flex items-center px-5 py-2.5 rounded-full border text-sm font-medium transition-colors hover:border-[var(--ember)] hover:text-[var(--ember)]"
            style={{ borderColor: "var(--sand-2)", color: "var(--stone)" }}
          >
            Смотреть каталог →
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
