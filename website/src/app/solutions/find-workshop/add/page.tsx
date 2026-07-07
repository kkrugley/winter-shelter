"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ArrowLeftIcon, CheckCircleIcon, PaperPlaneTiltIcon, SpinnerIcon } from "@phosphor-icons/react";
import { submitContactForm } from "@/lib/web3forms";
import posthog from "posthog-js";

const CONTACT_EMAIL = "safepaws.help@proton.me";

const CAPABILITY_OPTIONS = [
  "Лазерная резка",
  "ЧПУ-фрезеровка",
  "3D-печать",
  "Другое",
];

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

function buildMessage(fields: {
  name: string; city: string; capabilities: string[]; contact: string; comment: string;
}) {
  const lines = [
    `Мастерская: ${fields.name}`,
    `Город: ${fields.city}`,
    `Возможности: ${fields.capabilities.length ? fields.capabilities.join(", ") : "не указаны"}`,
    `Контакт: ${fields.contact}`,
    "",
    fields.comment.trim() ? `Комментарий: ${fields.comment.trim()}` : null,
  ].filter((line): line is string => Boolean(line));
  return lines.join("\n");
}

export default function AddWorkshopPage() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [capabilities, setCapabilities] = useState<string[]>([]);
  const [contact, setContact] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function toggleCapability(cap: string) {
    setCapabilities((prev) => prev.includes(cap) ? prev.filter((c) => c !== cap) : [...prev, cap]);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!name.trim())    { setError("Заполни поле: название мастерской"); return; }
    if (!city.trim())    { setError("Заполни поле: город"); return; }
    if (!contact.trim()) { setError("Заполни поле: контакт для связи"); return; }

    setSubmitting(true);
    try {
      await submitContactForm({
        subject: `Новая мастерская: ${name}`,
        message: buildMessage({ name, city, capabilities, contact, comment }),
      });
      posthog.capture("workshop_form_submitted");
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
          Заявка получена — мы проверим мастерскую и добавим её в каталог.
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
        Каталог пока небольшой, поэтому заявки обрабатываются вручную: форма подготовит письмо со всеми
        данными — просто отправь его, и мы добавим мастерскую после проверки.
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

        <Field label="Город" required>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Минск"
            className={`${inputCls} ${inputFocusStyle}`}
            style={inputStyle}
          />
        </Field>

        <Field label="Что там есть?" hint="Отметь всё подходящее">
          <div className="grid sm:grid-cols-2 gap-2">
            {CAPABILITY_OPTIONS.map((cap) => (
              <button
                key={cap}
                type="button"
                onClick={() => toggleCapability(cap)}
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl border text-sm text-left transition-all"
                style={{
                  borderColor: capabilities.includes(cap) ? "var(--ember)" : "var(--sand-2)",
                  background: capabilities.includes(cap) ? "var(--ember-pale)" : "var(--cream)",
                  color: capabilities.includes(cap) ? "#93430E" : "var(--stone)",
                  fontWeight: capabilities.includes(cap) ? 500 : 400,
                }}
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: capabilities.includes(cap) ? "var(--ember)" : "var(--sand-2)" }}
                />
                {cap}
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
            <><PaperPlaneTiltIcon size={16} weight="bold" /> Отправить нам</>
          )}
        </button>

        <p className="text-xs text-center" style={{ color: "var(--stone)", opacity: 0.7 }}>
          Заявка придёт нам напрямую. Если что-то пойдёт не так — просто напиши на {CONTACT_EMAIL}.
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
