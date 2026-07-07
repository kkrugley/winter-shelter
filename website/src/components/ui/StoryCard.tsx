"use client";

import Image from "next/image";
import { useState } from "react";
import { Info } from "@phosphor-icons/react";
import { formatInstalledDateLong } from "@/lib/utils";

const PRODUCT_LABELS: Record<string, string> = {
  "cozy-shelter":   "Cozy Shelter",
  "family-shelter": "Family Shelter",
  "purrtap":        "PurrTap",
  "edc-feeder":     "EDC Feeder",
};

function PhotoPlaceholder({ label }: { label: string }) {
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
        {label}
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
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const productLabel = PRODUCT_LABELS[product_slug] ?? product_slug;
  const dateLabel = formatInstalledDateLong(installed_date);
  const showPhoto = photo_url && !imgError;
  const isEtsyAutopost = quote === "Etsy Autopost";

  return (
    <div className="flex flex-col gap-3">
      {/* Photo */}
      <div
        className="relative rounded-[14px] overflow-hidden"
        style={{
          position: "relative",
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
          <PhotoPlaceholder label="Фото" />
        )}

        {/* Badges: product + city — top-left row */}
        <div className="absolute top-2.5 left-2.5 flex gap-1.5">
          <span
            className="px-2.5 py-0.5 rounded-full border text-xs font-medium"
            style={{ borderColor: "transparent", background: "var(--ember-pale)", color: "#93430E", backdropFilter: "blur(4px)" }}
          >
            {productLabel}
          </span>
          <span
            className="px-2.5 py-0.5 rounded-full border text-xs font-medium"
            style={{ borderColor: "var(--sand-2)", background: "#FFFDF7CC", color: "var(--stone)", backdropFilter: "blur(4px)" }}
          >
            {city}
          </span>
        </div>

        {/* Etsy autopost info icon — top-right */}
        {isEtsyAutopost && (
          <div className="absolute top-2.5 right-2.5">
            <button
              type="button"
              onMouseEnter={() => setTooltipVisible(true)}
              onMouseLeave={() => setTooltipVisible(false)}
              onFocus={() => setTooltipVisible(true)}
              onBlur={() => setTooltipVisible(false)}
              aria-label="Тот же чертёж домика SafePaws, что продаётся на Etsy под другим брендом для западного рынка."
              className="p-1.5 rounded-full transition-colors hover:bg-white/70"
              style={{ background: "#FFFDF7CC", color: "var(--stone)", backdropFilter: "blur(4px)" }}
            >
              <Info size={16} />
            </button>
            {tooltipVisible && (
              <div
                className="absolute top-full right-0 mt-2 w-56 rounded-xl px-3 py-2 text-xs z-10"
                style={{
                  background: "#1e1209",
                  color: "var(--cream)",
                  boxShadow: "var(--shadow-lift)",
                }}
                role="tooltip"
              >
                Тот же чертёж домика SafePaws, что продаётся на Etsy под другим брендом для западного рынка.
                <div
                  className="absolute right-3 bottom-full w-0 h-0"
                  style={{
                    borderLeft: "5px solid transparent",
                    borderRight: "5px solid transparent",
                    borderBottom: "5px solid #1e1209",
                  }}
                />
              </div>
            )}
          </div>
        )}
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
