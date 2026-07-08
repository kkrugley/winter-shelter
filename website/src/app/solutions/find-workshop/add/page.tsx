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
import { ArrowLeftIcon, CheckCircleIcon, MapPinIcon, PaperPlaneTiltIcon, SpinnerIcon } from "@phosphor-icons/react";
import posthog from "posthog-js";

declare global {
  interface Window {
    turnstile?: {
      render: (c: HTMLElement, o: Record<string, string>) => string;
      remove: (id: string) => void;
      getResponse: (id?: string) => string;
    };
  }
}

const SITEKEY = "0x4AAAAAADs9TzE7UAMqNZVI";
const CONTACT_EMAIL = "safepaws.help@proton.me";

type ServiceType = "laser" | "milling" | "3d-print";

// UI label → service slug. "Другое" carries no slug (informational only).
const CAPABILITY_OPTIONS: { label: string; slug: ServiceType | null }[] = [
  { label: "Лазерная резка", slug: "laser" },
  { label: "ЧПУ-фрезеровка", slug: "milling" },
  { label: "3D-печать", slug: "3d-print" },
  { label: "Другое", slug: null },
];

interface GeoResult {
  display_name: string;
  lat: string;
  lon: string;
  address: { country_code: string; city?: string; town?: string; village?: string; state?: string };
}

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

export default function AddWorkshopPage() {
  const [name, setName] = useState("");
  const [capabilities, setCapabilities] = useState<string[]>([]);
  const [contact, setContact] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Geocoded city (reuses the Nominatim proxy for country/lat/lng)
  const [cityQuery, setCityQuery] = useState("");
  const [geoResults, setGeoResults] = useState<GeoResult[]>([]);
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoSelected, setGeoSelected] = useState(false);
  const [place, setPlace] = useState<{ city: string; country: string; lat: string; lng: string } | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const turnstileRef = useRef<HTMLDivElement>(null);
  const turnstileId = useRef<string | null>(null);

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
        setGeoResults(await res.json());
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
          "data-action": "workshop-add",
        });
      }
    };
    document.body.appendChild(script);
    return () => { if (turnstileId.current && window.turnstile) window.turnstile.remove(turnstileId.current); };
  }, []);

  function selectCity(result: GeoResult) {
    const cityName =
      result.address.city || result.address.town || result.address.village ||
      result.address.state || result.display_name.split(",")[0];
    setPlace({
      city: cityName,
      country: (result.address.country_code ?? "").toUpperCase(),
      lat: result.lat,
      lng: result.lon,
    });
    setCityQuery(cityName);
    setGeoResults([]);
    setGeoSelected(true);
  }

  function toggleCapability(cap: string) {
    setCapabilities((prev) => prev.includes(cap) ? prev.filter((c) => c !== cap) : [...prev, cap]);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!name.trim())    { setError("Заполни поле: название мастерской"); return; }
    if (!place)          { setError("Выбери город из подсказок"); return; }
    if (!contact.trim()) { setError("Заполни поле: контакт для связи"); return; }

    const services = CAPABILITY_OPTIONS
      .filter((o) => o.slug && capabilities.includes(o.label))
      .map((o) => o.slug as ServiceType);
    if (services.length === 0) {
      setError("Отметь хотя бы одну услугу (лазер, фрезеровка или 3D-печать)");
      return;
    }

    setSubmitting(true);
    const token = window.turnstile?.getResponse(turnstileId.current ?? undefined);
    if (!token) { setError("Подтвердите, что вы не робот"); setSubmitting(false); return; }

    try {
      const res = await fetch("/api/workshops/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          contact,
          services,
          comment: comment.trim() || undefined,
          city: place.city,
          country: place.country,
          lat: Number(place.lat),
          lng: Number(place.lng),
          "cf-turnstile-response": token,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "request failed");
      }
      posthog.capture("workshop_form_submitted", { city: place.city, services });
      setSubmitted(true);
    } catch (err) {
      posthog.captureException(err);
      setError("Не получилось отправить — попробуй ещё раз или напиши нам на " + CONTACT_EMAIL);
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20 text-center">
        <CheckCircleIcon size={52} weight="duotone" style={{ color: "var(--ember)", margin: "0 auto 16px" }} />
        <h1 className="heading-section mb-3">Спасибо!</h1>
        <p className="text-sm mb-8" style={{ color: "var(--stone)" }}>
          Мастерская добавлена в каталог — она уже видна другим по твоему городу.
        </p>
        <Link
          href="/solutions/find-workshop"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white transition-opacity hover:opacity-90"
          style={{ background: "var(--ember)" }}
        >
          К каталогу мастерских →
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
            <BreadcrumbLink href="/solutions/find-workshop">Мастерские</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Добавить</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="heading-display mb-2">Добавить мастерскую</h1>
      <p className="text-sm mb-10" style={{ color: "var(--stone)" }}>
        Знаешь хакспейс, фаблаб или столярку с нужным оборудованием? Добавь — мастерская сразу
        появится в каталоге для твоего города.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <Field label="Название мастерской" required hint="Хакспейс, фаблаб, столярка — как угодно">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Хакспейс «Нейрон»"
            className={`${inputCls} ${inputFocusStyle}`}
            style={inputStyle}
          />
        </Field>

        <Field label="Город" required hint="Начни вводить и выбери из подсказок">
          <div className="relative">
            <input
              type="text"
              value={cityQuery}
              onChange={(e) => { setCityQuery(e.target.value); setGeoSelected(false); setPlace(null); }}
              placeholder="Минск"
              className={`${inputCls} ${inputFocusStyle}`}
              style={inputStyle}
            />
            {geoLoading && (
              <SpinnerIcon size={16} className="animate-spin absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "var(--stone)" }} />
            )}
            {geoResults.length > 0 && (
              <ul className="absolute z-10 mt-1 w-full rounded-xl border overflow-hidden" style={{ borderColor: "var(--sand-2)", background: "var(--cream)" }}>
                {geoResults.slice(0, 5).map((r, i) => (
                  <li key={i}>
                    <button
                      type="button"
                      onClick={() => selectCity(r)}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-[var(--ember-pale)] transition-colors flex items-center gap-2"
                      style={{ color: "var(--ink)" }}
                    >
                      <MapPinIcon size={14} style={{ color: "var(--stone)" }} />
                      <span className="truncate">{r.display_name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Field>

        <Field label="Что там есть?" required hint="Отметь всё подходящее">
          <div className="grid sm:grid-cols-2 gap-2">
            {CAPABILITY_OPTIONS.map(({ label }) => (
              <button
                key={label}
                type="button"
                onClick={() => toggleCapability(label)}
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl border text-sm text-left transition-all"
                style={{
                  borderColor: capabilities.includes(label) ? "var(--ember)" : "var(--sand-2)",
                  background: capabilities.includes(label) ? "var(--ember-pale)" : "var(--cream)",
                  color: capabilities.includes(label) ? "#93430E" : "var(--stone)",
                  fontWeight: capabilities.includes(label) ? 500 : 400,
                }}
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: capabilities.includes(label) ? "var(--ember)" : "var(--sand-2)" }}
                />
                {label}
              </button>
            ))}
          </div>
        </Field>

        <div className="h-px" style={{ background: "var(--sand-2)" }} />

        <Field label="Контакт для связи" required hint="Сайт, соцсети или телефон мастерской">
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="t.me/workshop_neuron или +375…"
            className={`${inputCls} ${inputFocusStyle}`}
            style={inputStyle}
          />
        </Field>

        <Field label="Комментарий (необязательно)" hint="Условия аренды, часы работы, что-то ещё важное">
          <textarea
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Открыты по будням с 18:00, для волонтёрских проектов — бесплатно"
            className={`${inputCls} ${inputFocusStyle} resize-none`}
            style={inputStyle}
          />
        </Field>

        <div ref={turnstileRef} />

        {error && (
          <p className="text-sm px-4 py-3 rounded-xl" style={{ background: "#FFF0EC", color: "#93430E", border: "1px solid #F5C4AF" }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 rounded-full text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2"
          style={{ background: "var(--ember)", boxShadow: "var(--shadow-btn)" }}
        >
          {submitting ? (
            <><SpinnerIcon size={16} className="animate-spin" /> Отправляю…</>
          ) : (
            <><PaperPlaneTiltIcon size={16} weight="bold" /> Добавить в каталог</>
          )}
        </button>

        <p className="text-xs text-center" style={{ color: "var(--stone)", opacity: 0.7 }}>
          Если что-то пойдёт не так — просто напиши на {CONTACT_EMAIL}.
        </p>
      </form>

      <div className="mt-8">
        <Link href="/solutions/find-workshop" className="inline-flex items-center gap-2 text-sm hover:underline transition-colors" style={{ color: "var(--stone)" }}>
          <ArrowLeftIcon size={14} />
          Каталог мастерских
        </Link>
      </div>
    </div>
  );
}
