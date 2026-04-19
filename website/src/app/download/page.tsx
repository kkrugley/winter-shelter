"use client";

import { useState } from "react";
import Link from "next/link";
import { DownloadSimple, CheckCircle } from "@phosphor-icons/react";
import { products, getAvailableProducts } from "@/data/products";

type Step = 1 | 2 | 3;

const downloadableProducts = getAvailableProducts().filter(
  (p) => p.downloads.length > 0
);

export default function DownloadPage() {
  const [step, setStep] = useState<Step>(1);
  const [selectedSlug, setSelectedSlug] = useState<string>("cozy-shelter");
  const [selectedVariant, setSelectedVariant] = useState<string>("6mm");
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const selectedProduct = products.find((p) => p.slug === selectedSlug);
  const selectedDownload = selectedProduct?.downloads.find(
    (d) => d.variant === selectedVariant
  );

  if (done) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20 text-center">
        <CheckCircle size={56} weight="duotone" className="text-accent mx-auto mb-6" />
        <h1 className="font-hand text-5xl text-ink mb-4">Скачивание начато!</h1>
        <p className="text-sm text-ink-muted mb-8">
          Если файл не скачался — нажми кнопку ещё раз. Спасибо, что помогаешь
          животным!
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/stories/add"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-white text-sm font-medium hover:bg-[#c4673d] transition-colors"
          >
            Расскажи, когда построишь →
          </Link>
          <Link
            href="/solutions"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border-soft text-ink text-sm hover:bg-accent-soft transition-colors"
          >
            Ещё решения
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      {/* Breadcrumb */}
      <div className="font-mono text-xs text-ink-muted mb-8">
        <Link href="/" className="hover:text-accent">главная</Link>
        {" / "}
        <span className="text-accent">скачать</span>
      </div>

      <h1 className="font-hand text-5xl text-ink mb-2">Скачать чертежи</h1>
      <p className="text-sm text-ink-muted mb-10">
        Три шага: выбери модель, материал, получи файл. Всё бесплатно.
      </p>

      {/* Progress */}
      <div className="flex items-center gap-3 mb-10">
        {([1, 2, 3] as Step[]).map((n, i) => (
          <div key={n} className="flex items-center gap-3 flex-1">
            <div
              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-mono shrink-0 transition-colors ${
                step >= n
                  ? "border-accent bg-accent text-white"
                  : "border-border-soft text-ink-muted"
              }`}
            >
              {n}
            </div>
            <span
              className={`text-sm font-medium transition-colors ${
                step >= n ? "text-ink" : "text-ink-muted"
              }`}
            >
              {["модель", "материал", "файл"][i]}
            </span>
            {n < 3 && (
              <div
                className={`flex-1 h-0.5 transition-colors ${
                  step > n ? "bg-accent" : "bg-border-soft"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1 */}
      {step === 1 && (
        <div className="border border-border-soft rounded-xl p-6">
          <span className="font-mono text-xs text-ink-muted block mb-4">
            шаг 1 / 3
          </span>
          <h2 className="font-hand text-3xl text-ink mb-6">Выбери модель</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {downloadableProducts.map((p) => (
              <button
                key={p.slug}
                onClick={() => setSelectedSlug(p.slug)}
                className={`border-2 rounded-xl overflow-hidden text-left transition-colors ${
                  selectedSlug === p.slug
                    ? "border-accent"
                    : "border-border-soft hover:border-accent/40"
                }`}
              >
                <div
                  className={`ph min-h-[120px] rounded-none border-0 text-sm ${
                    selectedSlug === p.slug ? "bg-accent-soft/60" : ""
                  }`}
                >
                  {p.name}
                </div>
                <div className="p-3">
                  <strong className="font-hand text-lg text-ink block">
                    {p.name}
                  </strong>
                  <p className="text-xs text-ink-muted">{p.capacity}</p>
                  {selectedSlug === p.slug && (
                    <span className="mt-2 inline-block px-2 py-0.5 rounded-full border border-accent/40 bg-accent-soft text-xs text-accent">
                      выбрано
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => setStep(2)}
              className="px-6 py-2.5 rounded-lg bg-accent text-white text-sm font-medium hover:bg-[#c4673d] transition-colors"
            >
              Далее →
            </button>
          </div>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && selectedProduct && (
        <div className="border border-border-soft rounded-xl p-6">
          <span className="font-mono text-xs text-ink-muted block mb-4">
            шаг 2 / 3
          </span>
          <h2 className="font-hand text-3xl text-ink mb-2">Выбери материал</h2>
          <p className="text-sm text-ink-muted mb-6">
            Модель: <strong>{selectedProduct.name}</strong>
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {selectedProduct.downloads.map((d) => (
              <button
                key={d.variant}
                onClick={() => setSelectedVariant(d.variant)}
                className={`border-2 rounded-xl p-5 text-left transition-colors ${
                  selectedVariant === d.variant
                    ? "border-accent bg-accent-soft"
                    : "border-border-soft hover:border-accent/40"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <strong className="text-sm text-ink">{d.label}</strong>
                  {d.recommended && (
                    <span className="px-2 py-0.5 rounded-full border border-accent/40 bg-accent text-white text-xs">
                      рекомендовано
                    </span>
                  )}
                </div>
                <p className="text-xs text-ink-muted">Размер: {d.size}</p>
              </button>
            ))}
          </div>
          <div className="mt-6 flex justify-between">
            <button
              onClick={() => setStep(1)}
              className="px-4 py-2.5 rounded-lg border border-border-soft text-ink text-sm hover:bg-accent-soft transition-colors"
            >
              ← Назад
            </button>
            <button
              onClick={() => setStep(3)}
              className="px-6 py-2.5 rounded-lg bg-accent text-white text-sm font-medium hover:bg-[#c4673d] transition-colors"
            >
              Далее →
            </button>
          </div>
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && selectedProduct && selectedDownload && (
        <div className="border border-border-soft rounded-xl p-6">
          <span className="font-mono text-xs text-ink-muted block mb-4">
            шаг 3 / 3
          </span>
          <h2 className="font-hand text-3xl text-ink mb-2">Получи файл</h2>
          <p className="text-sm text-ink-muted mb-6">
            {selectedProduct.name} · {selectedDownload.label} · {selectedDownload.size}
          </p>

          <div className="bg-accent-soft border border-accent/20 rounded-xl p-5 mb-5">
            <div className="flex flex-wrap gap-3 mb-4">
              <a
                href={selectedDownload.file}
                download
                onClick={() => setTimeout(() => setDone(true), 500)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-white text-sm font-medium hover:bg-[#c4673d] transition-colors"
              >
                <DownloadSimple size={18} weight="bold" />
                Скачать DXF + PDF
              </a>
            </div>
            <p className="text-xs text-ink-muted">
              {selectedDownload.size} · CC BY 4.0 · бесплатно
            </p>
          </div>

          <div className="border border-border-soft rounded-xl p-5">
            <label className="font-mono text-xs text-ink-muted block mb-2">
              email для получения ссылки (опционально)
            </label>
            <div className="flex gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="flex-1 px-3 py-2 border border-border-soft rounded-lg text-sm bg-paper text-ink placeholder:text-ink-muted/50 focus:outline-none focus:border-accent"
              />
              <button className="px-4 py-2 rounded-lg border border-border-soft text-ink text-sm hover:bg-accent-soft transition-colors">
                Отправить
              </button>
            </div>
            <p className="text-xs text-ink-muted mt-2">
              Пришлём ссылку и уведомление об обновлениях.
            </p>
          </div>

          <div className="mt-6">
            <button
              onClick={() => setStep(2)}
              className="px-4 py-2.5 rounded-lg border border-border-soft text-ink text-sm hover:bg-accent-soft transition-colors"
            >
              ← Назад
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
