"use client";

import { useState } from "react";
import Link from "next/link";

const stories = [
  {
    city: "Минск",
    country: "BY",
    product: "Cozy Shelter",
    date: "04.26",
    author: "Лена",
    quote: "«5 котят пережили зиму»",
    text: "Поставили у магазина, 2 кота сразу заселились. Соседи тоже стали кормить.",
  },
  {
    city: "Брест",
    country: "BY",
    product: "Family Shelter",
    date: "11.24",
    author: "Паша",
    quote: "«2 домика у дома»",
    text: "Собрали за выходные с другом, теперь здесь живёт 4 кота. Утром видно следы в снегу.",
  },
  {
    city: "Варшава",
    country: "PL",
    product: "PurrTap",
    date: "02.26",
    author: "Марта",
    quote: "«Поилка у подъезда»",
    text: "Поилка не замерзала при −18°C. Коты пьют каждый день, проверяла.",
  },
  {
    city: "Гродно",
    country: "BY",
    product: "Cozy Shelter",
    date: "01.25",
    author: "Козловские",
    quote: "«Семейная сборка»",
    text: "Построил по чертежам для кошек во дворе. Отлично работает даже в сильный мороз.",
  },
  {
    city: "Вильнюс",
    country: "LT",
    product: "Family Shelter",
    date: "12.24",
    author: "Indrė",
    quote: "«Три домика у парка»",
    text: "Установили три домика рядом с парком. Местные волонтёры помогают с кормом.",
  },
  {
    city: "Гомель",
    country: "BY",
    product: "PurrTap",
    date: "03.25",
    author: "Коля",
    quote: "«За 20 минут»",
    text: "Сделал за 20 минут из пустой бутылки. Простейшая инструкция, работает отлично.",
  },
];

type ProductFilter = "all" | "Cozy Shelter" | "Family Shelter" | "PurrTap";
type CountryFilter = "all" | "BY" | "PL" | "LT";

export default function StoriesPage() {
  const [productF, setProductF] = useState<ProductFilter>("all");
  const [countryF, setCountryF] = useState<CountryFilter>("all");

  const filtered = stories.filter((s) => {
    if (productF !== "all" && s.product !== productF) return false;
    if (countryF !== "all" && s.country !== countryF) return false;
    return true;
  });

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Breadcrumb */}
        <div className="font-mono text-xs text-ink-muted mb-6">
          <Link href="/" className="hover:text-accent">главная</Link>
          {" / "}
          <span className="text-accent">истории</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-hand text-5xl text-ink">Где уже стоят домики</h1>
            <p className="text-sm text-ink-muted mt-2">
              Каждая точка — реальный собранный и установленный домик или поилка.
            </p>
          </div>
          <Link
            href="/stories/add"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-white text-sm font-medium hover:bg-[#c4673d] transition-colors whitespace-nowrap"
          >
            + добавить историю
          </Link>
        </div>

        {/* Filters */}
        <div className="border border-border-soft rounded-xl p-4 mb-8 flex flex-wrap gap-3 items-center">
          {(["all", "Cozy Shelter", "Family Shelter", "PurrTap"] as ProductFilter[]).map((v) => (
            <button
              key={v}
              onClick={() => setProductF(v)}
              className={`px-3 py-1 rounded-full border text-xs transition-colors ${
                productF === v
                  ? "border-accent bg-accent-soft text-accent"
                  : "border-border-soft text-ink-muted hover:border-accent/40"
              }`}
            >
              {v === "all" ? "все" : v}
            </button>
          ))}
          <span className="font-mono text-xs text-ink-muted ml-2">страна:</span>
          {(["all", "BY", "PL", "LT"] as CountryFilter[]).map((v) => (
            <button
              key={v}
              onClick={() => setCountryF(v)}
              className={`px-3 py-1 rounded-full border text-xs transition-colors ${
                countryF === v
                  ? "border-accent bg-accent-soft text-accent"
                  : "border-border-soft text-ink-muted hover:border-accent/40"
              }`}
            >
              {v === "all" ? "все" : v}
            </button>
          ))}
          <span className="ml-auto flex gap-2">
            <button className="px-3 py-1 rounded-full border border-border-soft text-xs text-ink-muted">вид: карта</button>
            <button className="px-3 py-1 rounded-full border border-accent bg-accent-soft text-xs text-accent">вид: карта + сетка</button>
          </span>
        </div>

        {/* Map + Stories list */}
        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-6 mb-14">
          {/* Map placeholder */}
          <div className="ph min-h-[440px] relative">
            <div className="absolute top-4 left-4 bg-paper border border-border-soft rounded-lg px-3 py-2">
              <span className="font-mono text-xs text-ink-muted">47 точек</span>
              <p className="text-xs font-medium text-ink mt-0.5">BY 28 · PL 12 · LT 5 · другие 2</p>
            </div>
            {[
              { top: "20%", left: "30%" },
              { top: "35%", left: "40%" },
              { top: "50%", left: "25%" },
              { top: "45%", left: "60%" },
              { top: "60%", left: "45%" },
              { top: "30%", left: "70%" },
              { top: "70%", left: "55%" },
            ].map((pos, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 rounded-full bg-accent border-2 border-white shadow-sm"
                style={{ top: pos.top, left: pos.left }}
              />
            ))}
          </div>

          {/* Stories list */}
          <div className="flex flex-col gap-3 overflow-y-auto max-h-[480px] pr-1">
            {filtered.map(({ city, country, product, date, author, quote }) => (
              <div
                key={`${city}-${product}`}
                className="border border-border-soft rounded-lg p-4 hover:border-accent/40 transition-colors flex gap-3"
              >
                <div className="ph w-24 min-h-[80px] shrink-0 rounded-lg border-0 text-xs">ф</div>
                <div className="flex-1">
                  <span className={`inline-block px-2 py-0.5 rounded-full border text-xs mb-1 ${product === "PurrTap" ? "border-accent/40 text-accent" : "border-border-soft text-ink-muted"}`}>
                    {city} · {product}
                  </span>
                  <p className="text-sm font-medium text-ink">{quote}</p>
                  <p className="text-xs text-ink-muted mt-1">{author} · {date}</p>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="text-center py-10 font-hand text-xl text-ink-muted">
                Нет историй по этим фильтрам
              </div>
            )}
          </div>
        </div>

        {/* ALL STORIES GRID */}
        <div>
          <h2 className="font-hand text-4xl text-ink mb-6">Все истории</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(({ city, country, product, date, author, quote, text }) => (
              <div key={`grid-${city}-${product}`} className="border border-border-soft rounded-xl overflow-hidden">
                <div className="ph min-h-[140px] rounded-none border-0 border-b border-dashed border-border-soft">
                  фото · {city}
                </div>
                <div className="p-4">
                  <span className={`inline-block px-2 py-0.5 rounded-full border text-xs mb-2 ${product === "PurrTap" ? "border-accent/40 text-accent" : "border-border-soft text-ink-muted"}`}>
                    {city}
                  </span>
                  <p className="text-sm font-medium text-ink mb-1">{quote}</p>
                  <p className="text-xs text-ink-muted mb-3">{author} · {date}</p>
                  <button className="text-xs text-accent hover:underline">Читать →</button>
                </div>
              </div>
            ))}
          </div>
          {filtered.length > 0 && (
            <div className="text-center mt-8">
              <button className="px-6 py-2.5 rounded-lg border border-border-soft text-sm text-ink hover:border-accent/40 transition-colors">
                Загрузить ещё
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ADD STORY CTA */}
      <section className="py-14 bg-accent-soft">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-hand text-4xl text-ink mb-3">Собрал домик? Расскажи.</h2>
          <p className="text-sm text-ink-muted mb-8">
            2 фото + пара строк — и точка появится на карте.
          </p>
          <Link
            href="/stories/add"
            className="px-6 py-3 rounded-lg bg-accent text-white text-sm font-medium hover:bg-[#c4673d] transition-colors"
          >
            Добавить историю →
          </Link>
        </div>
      </section>
    </>
  );
}
