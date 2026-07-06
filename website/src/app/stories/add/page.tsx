"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Image from "next/image";
import { ArrowLeft, CheckCircle, MapPin, Spinner, X, UploadSimple } from "@phosphor-icons/react";

declare global {
  interface Window { turnstile?: { render: (c: HTMLElement, o: Record<string, string>) => string; remove: (id: string) => void; getResponse: (id?: string) => string } }
}

const SITEKEY = "0x4AAAAAADs9TzE7UAMqNZVI";

interface GeoResult {
  display_name: string;
  lat: string;
  lon: string;
  address: { country_code: string; city?: string; town?: string; village?: string; state?: string };
}

const PRODUCTS = [
  { slug: "cozy-shelter", label: "Cozy Shelter — компактный домик" },
  { slug: "family-shelter", label: "Family Shelter — большой домик" },
  { slug: "purrtap", label: "PurrTap — поилка" },
  { slug: "edc-feeder", label: "EDC Feeder — кормушка" },
];

const MONTHS = ["январь","февраль","март","апрель","май","июнь","июль","август","сентябрь","октябрь","ноябрь","декабрь"];

const inputCls = "w-full px-3 py-2.5 border rounded-xl text-sm bg-[var(--cream)] text-ink placeholder:text-[var(--stone)] focus:outline-none transition-colors";
const inputStyle = { borderColor: "var(--sand-2)" };
const inputFocusStyle = "focus:border-[var(--ember)]";

function Field({ label, required, hint, children }: {
  label: string; required?: boolean; hint?: string; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium" style={{ color: "var(--stone)" }}>
        {label}{required && <span style={{ color: "var(--ember)" }}> *</span>}
      </label>
      {hint && <p className="text-xs" style={{ color: "var(--stone)", opacity: 0.7 }}>{hint}</p>}
      {children}
    </div>
  );
}

export default function AddStoryPage() {
  const [form, setForm] = useState({
    author_name: "",
    telegram: "",
    quote: "",
    body: "",
    product_slug: "",
    city: "",
    country: "",
    lat: "",
    lng: "",
    month: "",
    year: "",
  });

  const [cityQuery, setCityQuery] = useState("");
  const [geoResults, setGeoResults] = useState<GeoResult[]>([]);
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoSelected, setGeoSelected] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [photoUploading, setPhotoUploading] = useState(false);
  const [photoError, setPhotoError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const quoteEditableRef = useRef<HTMLSpanElement>(null);

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const turnstileRef = useRef<HTMLDivElement>(null);
  const turnstileId = useRef<string | null>(null);

  async function uploadPhoto(file: File) {
    setPhotoError("");
    setPhotoUploading(true);
    setPhotoPreview(URL.createObjectURL(file));
    setPhotoUrl(null);

    const body = new FormData();
    body.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Ошибка загрузки");
      setPhotoUrl(data.url);
    } catch (err) {
      setPhotoError(err instanceof Error ? err.message : "Ошибка загрузки");
      setPhotoPreview(null);
    } finally {
      setPhotoUploading(false);
    }
  }

  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) uploadPhoto(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadPhoto(file);
  }

  function removePhoto() {
    setPhotoPreview(null);
    setPhotoUrl(null);
    setPhotoError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  useEffect(() => {
    if (geoSelected || cityQuery.length < 3) {
      setGeoResults([]);
      return;
    }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setGeoLoading(true);
      try {
        const res = await fetch(`/api/geocode?q=${encodeURIComponent(cityQuery)}`);
        const data: GeoResult[] = await res.json();
        setGeoResults(data);
      } catch {
        setGeoResults([]);
      } finally {
        setGeoLoading(false);
      }
    }, 400);
  }, [cityQuery, geoSelected]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (turnstileRef.current && window.turnstile && !turnstileId.current) {
        turnstileId.current = window.turnstile.render(turnstileRef.current, {
          sitekey: SITEKEY,
          "data-action": "turnstile-spin-v1",
        });
      }
    };
    document.body.appendChild(script);
    return () => { if (turnstileId.current && window.turnstile) window.turnstile.remove(turnstileId.current); };
  }, []);

  function selectCity(result: GeoResult) {
    const cityName =
      result.address.city ||
      result.address.town ||
      result.address.village ||
      result.address.state ||
      result.display_name.split(",")[0];
    const country = (result.address.country_code ?? "").toUpperCase();
    setForm((f) => ({ ...f, city: cityName, country, lat: result.lat, lng: result.lon }));
    setCityQuery(cityName);
    setGeoResults([]);
    setGeoSelected(true);
  }

  function set(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.author_name)   { setError("Заполни поле: имя");    return; }
    if (!form.product_slug)  { setError("Заполни поле: продукт"); return; }
    if (!form.quote)         { setError("Заполни поле: цитата");   return; }
    if (!form.city || !form.country) { setError("Заполни поле: город"); return; }

    let installed_date: string | undefined;
    if (form.month && form.year) {
      const mm = String(MONTHS.indexOf(form.month) + 1).padStart(2, "0");
      installed_date = `${form.year}-${mm}-01`;
    }

    setSubmitting(true);

    const token = window.turnstile?.getResponse(turnstileId.current ?? undefined);
    if (!token) { setError("Подтвердите, что вы не робот"); setSubmitting(false); return; }

    try {
      const res = await fetch("/api/stories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          author_name:  form.author_name,
          telegram:     form.telegram || undefined,
          quote:        `«${form.quote}»`,
          body:         form.body || `${form.author_name} не поделился своей историей`,
          product_slug: form.product_slug,
          city:         form.city,
          country:      form.country,
          lat:          form.lat ? parseFloat(form.lat) : undefined,
          lng:          form.lng ? parseFloat(form.lng) : undefined,
          photo_url:    photoUrl ?? undefined,
          installed_date,
          "cf-turnstile-response": token,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Ошибка отправки");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Что-то пошло не так");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20 text-center">
        <CheckCircle size={52} weight="duotone" style={{ color: "var(--ember)", margin: "0 auto 16px" }} />
        <h1 className="heading-section mb-3">Спасибо!</h1>
        <p className="text-sm mb-8" style={{ color: "var(--stone)" }}>Твоя история получена. Мы проверим её и добавим на карту — обычно это занимает 1–2 дня.</p>
        <Link
          href="/stories"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white transition-opacity hover:opacity-90"
          style={{ background: "var(--ember)" }}
        >
          Смотреть все истории →
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Главная</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/stories">Истории</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Добавить новую</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="heading-display mb-2">Поделись историей</h1>
      <p className="text-sm mb-10" style={{ color: "var(--stone)" }}>
        {"Расскажи, какое из наших решений вы воплотили в жизнь?\nПосле проверки история появится на карте.".split("\n").map((line, i) => <span key={i}>{line}{i === 0 && <br />}</span>)}
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">

        <Field label="О чём хотите рассказать?" required>
          <div className="grid sm:grid-cols-2 gap-2">
            {PRODUCTS.map((p) => (
              <button
                key={p.slug}
                type="button"
                onClick={() => set("product_slug", p.slug)}
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl border text-sm text-left transition-all"
                style={{
                  borderColor: form.product_slug === p.slug ? "var(--ember)" : "var(--sand-2)",
                  background: form.product_slug === p.slug ? "var(--ember-pale)" : "var(--cream)",
                  color: form.product_slug === p.slug ? "#93430E" : "var(--stone)",
                  fontWeight: form.product_slug === p.slug ? 500 : 400,
                }}
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: form.product_slug === p.slug ? "var(--ember)" : "var(--sand-2)" }}
                />
                {p.label}
              </button>
            ))}
          </div>
        </Field>

        <div className="h-px" style={{ background: "var(--sand-2)" }} />

        <Field label="Твоё имя" required hint="Как подписать историю">
          <input
            type="text"
            value={form.author_name}
            onChange={(e) => set("author_name", e.target.value)}
            placeholder="Достаточно просто имени, или абстрактного «волонтёры»"
            className={`${inputCls} ${inputFocusStyle}`}
            style={inputStyle}
          />
        </Field>

        <Field label="Цитата — одна фраза о результате" required hint="Короткая фраза, которая войдёт в карточку. Например: «Создали укрытие для 4 кошек во дворе»">
          <div
            className="relative flex items-center rounded-xl border transition-colors focus-within:border-[var(--ember)] cursor-text"
            style={{ ...inputStyle, background: "var(--cream)" }}
            onClick={() => quoteEditableRef.current?.focus()}
          >
            <span className="pl-3 text-sm select-none font-medium shrink-0" style={{ color: "var(--ember)" }}>«</span>
            <span
              ref={quoteEditableRef}
              contentEditable
              suppressContentEditableWarning
              role="textbox"
              aria-label="Цитата"
              data-placeholder="5 котят пережили зиму"
              onInput={(e) => {
                const text = e.currentTarget.textContent ?? "";
                if (text.length > 70) {
                  e.currentTarget.textContent = text.slice(0, 70);
                  const range = document.createRange();
                  range.selectNodeContents(e.currentTarget);
                  range.collapse(false);
                  window.getSelection()?.removeAllRanges();
                  window.getSelection()?.addRange(range);
                }
                set("quote", e.currentTarget.textContent?.slice(0, 70) ?? "");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") e.preventDefault();
              }}
              className="quote-editable py-2.5 px-1 bg-transparent text-sm text-ink focus:outline-none min-w-[4px] whitespace-nowrap"
              style={{ outline: "none" }}
            />
            <span className="pl-1 pr-3 text-sm select-none font-medium shrink-0" style={{ color: "var(--ember)" }}>»</span>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs tabular-nums pointer-events-none select-none" style={{ color: "var(--stone)", opacity: 0.45 }}>
              {form.quote.length}/70
            </span>
          </div>
        </Field>

        <Field label="Telegram (необязательно)" hint="Если захотим уточнить детали или поблагодарить">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm select-none" style={{ color: "var(--stone)" }}>@</span>
            <input
              type="text"
              value={form.telegram}
              onChange={(e) => set("telegram", e.target.value.replace(/^@/, ""))}
              placeholder="username"
              className={`${inputCls} ${inputFocusStyle} pl-7`}
              style={inputStyle}
            />
          </div>
        </Field>

        <Field label="Место" required hint="Достаточно названия города, но если хотите указать точнее — пожалуйста! Для вашей приватности координаты будут смещены на 500 метров в случайную сторону.">
          <div className="relative">
            <input
              type="text"
              value={cityQuery}
              onChange={(e) => { setCityQuery(e.target.value); setGeoSelected(false); }}
              placeholder="Минск, Варшава, Вильнюс…"
              className={`${inputCls} ${inputFocusStyle} pr-9`}
              style={inputStyle}
              autoComplete="off"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "var(--stone)", opacity: 0.5 }}>
              {geoLoading
                ? <Spinner size={14} className="animate-spin" />
                : <MapPin size={14} weight={form.lat ? "fill" : "regular"} style={{ color: form.lat ? "var(--ember)" : undefined }} />
              }
            </span>
            {geoResults.length > 0 && (
              <ul
                className="absolute z-20 top-full left-0 right-0 mt-1 rounded-xl border overflow-hidden shadow-md"
                style={{ background: "var(--cream)", borderColor: "var(--sand-2)" }}
              >
                {geoResults.map((r, i) => (
                  <li key={i}>
                    <button
                      type="button"
                      onClick={() => selectCity(r)}
                      className="w-full text-left px-3 py-2.5 text-sm hover:bg-[var(--sand)] transition-colors"
                      style={{ color: "var(--ink)" }}
                    >
                      {r.display_name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {form.lat && (
            <p className="text-xs flex items-center gap-1" style={{ color: "var(--stone)", opacity: 0.7 }}>
              <MapPin size={11} weight="fill" style={{ color: "var(--ember)" }} />
              {form.city}, {form.country} · {parseFloat(form.lat).toFixed(4)}, {parseFloat(form.lng).toFixed(4)}
            </p>
          )}
        </Field>

        <Field label="Когда установил?" hint="Примерно — достаточно месяца и года">
          <div className="grid grid-cols-2 gap-3">
            <select
              value={form.month}
              onChange={(e) => set("month", e.target.value)}
              className={`${inputCls} ${inputFocusStyle}`}
              style={inputStyle}
            >
              <option value="">Месяц</option>
              {MONTHS.map((m) => <option key={m}>{m}</option>)}
            </select>
            <select
              value={form.year}
              onChange={(e) => set("year", e.target.value)}
              className={`${inputCls} ${inputFocusStyle}`}
              style={inputStyle}
            >
              <option value="">Год</option>
              {years.map((y) => <option key={y}>{y}</option>)}
            </select>
          </div>
        </Field>

        <div className="h-px" style={{ background: "var(--sand-2)" }} />

        <Field label="Фото" hint="JPG, PNG, WEBP — до 10 МБ">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="hidden"
            onChange={handleFileInput}
          />
          {photoPreview ? (
            <div className="relative rounded-xl overflow-hidden" style={{ aspectRatio: "4/3" }}>
              <Image src={photoPreview} alt="превью" fill className="object-cover" unoptimized />
              {photoUploading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2" style={{ background: "rgba(44,42,39,0.55)" }}>
                  <Spinner size={28} className="animate-spin" style={{ color: "#fff" }} />
                  <span className="text-xs text-white font-medium">Загружаю…</span>
                </div>
              )}
              {photoUrl && !photoUploading && (
                <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: "rgba(44,42,39,0.6)", color: "#fff" }}>
                  <CheckCircle size={13} weight="fill" style={{ color: "#7EC86E" }} />
                  Загружено
                </div>
              )}
              <button
                type="button"
                onClick={removePhoto}
                className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
                style={{ background: "rgba(44,42,39,0.6)" }}
                aria-label="Удалить фото"
              >
                <X size={14} style={{ color: "#fff" }} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              className="w-full flex flex-col items-center justify-center gap-2.5 rounded-xl border-2 border-dashed py-10 transition-colors"
              style={{ borderColor: dragOver ? "var(--ember)" : "var(--sand-2)", background: dragOver ? "var(--ember-pale)" : "var(--sand)" }}
            >
              <UploadSimple size={24} style={{ color: dragOver ? "var(--ember)" : "var(--stone)", opacity: dragOver ? 1 : 0.5 }} />
              <span className="text-sm" style={{ color: "var(--stone)" }}>
                Перетащи фото или <span style={{ color: "var(--ember)" }}>выбери файл</span>
              </span>
            </button>
          )}
          {photoError && (
            <p className="text-xs px-3 py-2 rounded-lg" style={{ background: "#FFF0EC", color: "#93430E" }}>
              {photoError}
            </p>
          )}
        </Field>

        {error && (
          <p className="text-sm px-4 py-3 rounded-xl" style={{ background: "#FFF0EC", color: "#93430E", border: "1px solid #F5C4AF" }}>
            {error}
          </p>
        )}

        <div ref={turnstileRef} data-action="turnstile-spin-v1" className="flex justify-center" />

        <button
          type="submit"
          disabled={submitting || photoUploading}
          className="w-full py-3 rounded-full text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2"
          style={{ background: "var(--ember)", boxShadow: "var(--shadow-btn)" }}
        >
          {submitting
            ? <><Spinner size={16} className="animate-spin" /> Отправляю…</>
            : photoUploading
            ? <><Spinner size={16} className="animate-spin" /> Загружаю фото…</>
            : "Отправить историю →"
          }
        </button>

        <p className="text-xs text-center" style={{ color: "var(--stone)", opacity: 0.7 }}>Мы проверим историю вручную — обычно 1–2 дня — и добавим точку на карту.</p>
      </form>

      <div className="mt-8">
        <Link href="/stories" className="inline-flex items-center gap-2 text-sm hover:underline transition-colors" style={{ color: "var(--stone)" }}>
          <ArrowLeft size={14} />
          Все истории
        </Link>
      </div>
    </div>
  );
}
