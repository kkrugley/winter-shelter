"use client";

import { useState } from "react";
import Link from "next/link";

const stories = [
  {
    city: "Брест",
    country: "BY",
    product: "Cozy Shelter",
    date: "декабрь 2024",
    author: "Анна",
    text: "Поставили у магазина, 2 кота сразу заселились. Соседи тоже стали кормить.",
  },
  {
    city: "Минск",
    country: "BY",
    product: "Family Shelter",
    date: "ноябрь 2024",
    author: "Дима",
    text: "Собрали за выходные с другом, теперь здесь живёт 4 кота. Утром видно следы в снегу.",
  },
  {
    city: "Гродно",
    country: "BY",
    product: "PurrTap",
    date: "январь 2025",
    author: "Настя",
    text: "Поилка не замерзала при −18°C. Коты пьют каждый день, проверяла.",
  },
  {
    city: "Варшава",
    country: "PL",
    product: "Cozy Shelter",
    date: "февраль 2025",
    author: "Marek",
    text: "Построил по чертежам для кошек во дворе. Отлично работает даже в сильный мороз.",
  },
  {
    city: "Вильнюс",
    country: "LT",
    product: "Family Shelter",
    date: "декабрь 2024",
    author: "Indrė",
    text: "Установили три домика рядом с парком. Местные волонтёры помогают с кормом.",
  },
  {
    city: "Гомель",
    country: "BY",
    product: "PurrTap",
    date: "март 2025",
    author: "Коля",
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* Breadcrumb */}
      <div className="font-mono text-xs text-ink-muted mb-6">
        <Link href="/" className="hover:text-accent">главная</Link>
        {" / "}
        <span className="text-accent">истории</span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-hand text-5xl text-ink">
            Где уже стоят домики
          </h1>
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
            {v === "all" ? "все страны" : v}
          </button>
        ))}
      </div>

      {/* Map + Stories grid */}
      <div className="grid lg:grid-cols-5 gap-6">
        {/* Map placeholder */}
        <div className="lg:col-span-3">
          <div className="ph min-h-[440px] relative">
            <span className="absolute inset-0 flex items-center justify-center font-hand text-xl text-ink-muted">
              карта точек · Leaflet / заглушка
            </span>
            {/* Pin dots */}
            {[
              { top: "20%", left: "30%" },
              { top: "35%", left: "40%" },
              { top: "50%", left: "25%" },
              { top: "45%", left: "60%" },
              { top: "60%", left: "45%" },
              { top: "30%", left: "70%" },
            ].map((pos, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 rounded-full bg-accent border-2 border-white shadow-sm"
                style={{ top: pos.top, left: pos.left }}
              />
            ))}
          </div>
        </div>

        {/* Stories list */}
        <div className="lg:col-span-2 space-y-4 overflow-y-auto max-h-[480px] pr-1">
          {filtered.map(({ city, country, product, date, author, text }) => (
            <div
              key={`${city}-${product}`}
              className="border border-border-soft rounded-lg p-4 hover:border-accent/40 transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-xs text-ink-muted">
                  📍 {city}
                </span>
                <span className="px-1.5 py-0.5 rounded border border-border-soft text-xs text-ink-muted">
                  {country}
                </span>
                <span className="px-2 py-0.5 rounded-full border border-accent/30 text-xs text-accent ml-auto">
                  {product}
                </span>
              </div>
              <p className="text-sm text-ink mb-2">{text}</p>
              <div className="flex items-center gap-2 text-xs text-ink-muted">
                <span>{author}</span>
                <span>·</span>
                <span>{date}</span>
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
    </div>
  );
}
