"use client";

import Image from "next/image";
import { useState } from "react";
import { formatInstalledDate } from "@/lib/utils";

const PRODUCT_LABELS: Record<string, string> = {
  "cozy-shelter":   "Cozy Shelter",
  "family-shelter": "Family Shelter",
  "purrtap":        "PurrTap",
  "edc-feeder":     "EDC Feeder",
};

function PhotoPlaceholder() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
      <svg width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <rect x="1" y="1" width="26" height="22" rx="3" stroke="#7A6F63" strokeWidth="1.4" strokeOpacity="0.5"/>
        <circle cx="8.5" cy="7.5" r="2.5" stroke="#7A6F63" strokeWidth="1.4" strokeOpacity="0.5"/>
        <path d="M1 16 L8 10 L14 15 L19 11 L27 18" stroke="#7A6F63" strokeWidth="1.4" strokeOpacity="0.5" strokeLinejoin="round" strokeLinecap="round"/>
      </svg>
      <span
        className="font-mono text-[10px] tracking-[0.14em] uppercase"
        style={{ color: "var(--stone)", opacity: 0.6 }}
      >
        Фото
      </span>
    </div>
  );
}

export interface StoryCardData {
  city: string;
  product_slug: string;
  quote: string;
  author_name: string;
  installed_date: string | null;
  photo_url?: string | null;
}

export function StoryCard({ city, product_slug, quote, author_name, installed_date, photo_url }: StoryCardData) {
  const [imgError, setImgError] = useState(false);
  const productLabel = PRODUCT_LABELS[product_slug] ?? product_slug;
  const dateLabel = formatInstalledDate(installed_date);
  const showPhoto = photo_url && !imgError;

  return (
    <div className="flex flex-col gap-3">
      {/* Photo */}
      <div
        className="relative rounded-[14px] overflow-hidden"
        style={{
          aspectRatio: "4 / 3",
          background: "var(--sand)",
          border: "1px solid var(--sand-2)",
          boxShadow: "var(--shadow-card)",
          backgroundImage:
            "linear-gradient(180deg, rgba(44,42,39,.04), transparent 40%), repeating-linear-gradient(45deg, transparent 0 18px, rgba(44,42,39,.025) 18px 19px)",
        }}
      >
        {showPhoto ? (
          <Image
            src={photo_url}
            alt={`${city} — ${quote}`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onError={() => setImgError(true)}
          />
        ) : (
          <PhotoPlaceholder />
        )}

        {/* Badge: city — top-left */}
        <span
          className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full border text-xs font-medium"
          style={{ borderColor: "var(--sand-2)", background: "#FFFDF7CC", color: "var(--stone)", backdropFilter: "blur(4px)" }}
        >
          {city}
        </span>

        {/* Badge: product — top-right */}
        <span
          className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full border text-xs font-medium"
          style={{ borderColor: "transparent", background: "var(--ember-pale)", color: "#93430E", backdropFilter: "blur(4px)" }}
        >
          {productLabel}
        </span>
      </div>

      {/* Text */}
      <div className="flex flex-col gap-1.5">
        <h3 className="heading-quote" style={{ marginTop: 2 }}>{quote}</h3>
        <p className="text-sm" style={{ color: "var(--stone)" }}>
          {author_name}{dateLabel ? ` · ${dateLabel}` : ""}
        </p>
      </div>
    </div>
  );
}
