"use client";

import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Image from "next/image";
import { ArrowLeft, CheckCircle, Spinner, X, UploadSimple } from "@phosphor-icons/react";

interface TranslatedCategory { slug: string; label: string }

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

export default function AddIdeaPage() {
  const t = useTranslations("SolutionsAdd");
  const tCommon = useTranslations("Common");

  const CATEGORIES = t.raw("categories") as TranslatedCategory[];

  const [form, setForm] = useState({
    author_name: "",
    telegram: "",
    title: "",
    description: "",
    category: "",
  });

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [photoUploading, setPhotoUploading] = useState(false);
  const [photoError, setPhotoError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function uploadPhoto(file: File) {
    setPhotoError("");
    setPhotoUploading(true);
    setPhotoPreview(URL.createObjectURL(file));
    setPhotoUrl(null);

    const body = new FormData();
    body.append("file", file);

    try {
      const res = await fetch("/api/upload/ideas", { method: "POST", body });
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

  function set(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.author_name)  { setError(t("errorName"));  return; }
    if (!form.title)        { setError(t("errorTitle")); return; }
    if (!form.description)  { setError(t("errorDesc"));  return; }

    setSubmitting(true);
    try {
      const res = await fetch("/api/ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          author_name: form.author_name,
          telegram:    form.telegram || undefined,
          title:       form.title,
          description: form.description,
          category:    form.category || undefined,
          photo_url:   photoUrl ?? undefined,
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
        <h1 className="heading-section mb-3">{t("successTitle")}</h1>
        <p className="text-sm mb-8" style={{ color: "var(--stone)" }}>{t("successDesc")}</p>
        <Link
          href="/solutions"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white transition-opacity hover:opacity-90"
          style={{ background: "var(--ember)" }}
        >
          {t("successLink")}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">{tCommon("breadHome")}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/solutions">{t("breadSolutions")}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{t("breadAdd")}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="heading-display mb-2">{t("heading")}</h1>
      <p className="text-sm mb-10" style={{ color: "var(--stone)" }}>
        {t("subheading").split("\n").map((line, i) => <span key={i}>{line}{i === 0 && <br />}</span>)}
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">

        <Field label={t("fieldCategory")}>
          <div className="grid sm:grid-cols-3 gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c.slug}
                type="button"
                onClick={() => set("category", form.category === c.slug ? "" : c.slug)}
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl border text-sm text-left transition-all"
                style={{
                  borderColor: form.category === c.slug ? "var(--ember)" : "var(--sand-2)",
                  background:  form.category === c.slug ? "var(--ember-pale)" : "var(--cream)",
                  color:       form.category === c.slug ? "#93430E" : "var(--stone)",
                  fontWeight:  form.category === c.slug ? 500 : 400,
                }}
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: form.category === c.slug ? "var(--ember)" : "var(--sand-2)" }}
                />
                {c.label}
              </button>
            ))}
          </div>
        </Field>

        <div className="h-px" style={{ background: "var(--sand-2)" }} />

        <Field label={t("fieldTitle")} required hint={t("fieldTitleHint")}>
          <input
            type="text"
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            placeholder={t("fieldTitlePlaceholder")}
            className={`${inputCls} ${inputFocusStyle}`}
            style={inputStyle}
          />
        </Field>

        <Field label={t("fieldDesc")} required hint={t("fieldDescHint")}>
          <textarea
            rows={5}
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            placeholder={t("fieldDescPlaceholder")}
            className={`${inputCls} ${inputFocusStyle} resize-none`}
            style={inputStyle}
          />
        </Field>

        <div className="h-px" style={{ background: "var(--sand-2)" }} />

        <Field label={t("fieldAuthor")} required hint={t("fieldAuthorHint")}>
          <input
            type="text"
            value={form.author_name}
            onChange={(e) => set("author_name", e.target.value)}
            placeholder={t("fieldAuthorPlaceholder")}
            className={`${inputCls} ${inputFocusStyle}`}
            style={inputStyle}
          />
        </Field>

        <Field label={t("fieldTelegram")} hint={t("fieldTelegramHint")}>
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

        <div className="h-px" style={{ background: "var(--sand-2)" }} />

        <Field label={t("fieldPhoto")} hint={t("fieldPhotoHint")}>
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
                  <span className="text-xs text-white font-medium">{t("photoUploading")}</span>
                </div>
              )}
              {photoUrl && !photoUploading && (
                <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: "rgba(44,42,39,0.6)", color: "#fff" }}>
                  <CheckCircle size={13} weight="fill" style={{ color: "#7EC86E" }} />
                  {t("photoUploaded")}
                </div>
              )}
              <button
                type="button"
                onClick={removePhoto}
                className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
                style={{ background: "rgba(44,42,39,0.6)" }}
                aria-label={t("photoRemoveLabel")}
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
                {t("photoDrop")} <span style={{ color: "var(--ember)" }}>{t("photoSelect")}</span>
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

        <button
          type="submit"
          disabled={submitting || photoUploading}
          className="w-full py-3 rounded-full text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2"
          style={{ background: "var(--ember)", boxShadow: "var(--shadow-btn)" }}
        >
          {submitting
            ? <><Spinner size={16} className="animate-spin" /> {t("submitting")}</>
            : photoUploading
            ? <><Spinner size={16} className="animate-spin" /> {t("uploadingPhoto")}</>
            : t("submit")
          }
        </button>

        <p className="text-xs text-center" style={{ color: "var(--stone)", opacity: 0.7 }}>{t("submitNote")}</p>
      </form>

      <div className="mt-8">
        <Link href="/solutions" className="inline-flex items-center gap-2 text-sm hover:underline transition-colors" style={{ color: "var(--stone)" }}>
          <ArrowLeft size={14} />
          {t("backLink")}
        </Link>
      </div>
    </div>
  );
}
