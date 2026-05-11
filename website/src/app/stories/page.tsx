"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { StoryCard } from "@/components/ui/StoryCard";
import { Map, MapClusterLayer, MapPopup, MapControls } from "@/components/ui/map";
import type { Story } from "@/lib/stories";
import { formatInstalledDate } from "@/lib/utils";

type ProductFilter = "all" | "cozy-shelter" | "family-shelter" | "purrtap";
type CountryFilter = "all" | "BY" | "PL" | "LT";

const PRODUCT_LABELS: Record<string, string> = {
  "cozy-shelter":   "Cozy Shelter",
  "family-shelter": "Family Shelter",
  "purrtap":        "PurrTap",
  "edc-feeder":     "EDC Feeder",
};

const PRODUCT_FILTER_LABELS: Record<ProductFilter, string> = {
  "all":            "все",
  "cozy-shelter":   "Cozy Shelter",
  "family-shelter": "Family Shelter",
  "purrtap":        "PurrTap",
};

export default function StoriesPage() {
  const [productF, setProductF] = useState<ProductFilter>("all");
  const [countryF, setCountryF] = useState<CountryFilter>("all");
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [popup, setPopup] = useState<{
    lng: number; lat: number;
    city: string; product_slug: string; quote: string;
    author_name: string; installed_date: string | null; photo_url: string | null;
  } | null>(null);

  const geoJson = useMemo(() => ({
    type: "FeatureCollection" as const,
    features: stories
      .filter((s): s is Story & { lat: number; lng: number } => s.lat != null && s.lng != null)
      .map((s) => ({
        type: "Feature" as const,
        geometry: { type: "Point" as const, coordinates: [s.lng, s.lat] as [number, number] },
        properties: {
          id: s.id,
          city: s.city,
          product_slug: s.product_slug,
          quote: s.quote,
          author_name: s.author_name,
          installed_date: s.installed_date,
          photo_url: s.photo_url ?? null,
        },
      })),
  }), [stories]);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (productF !== "all") params.set("product_slug", productF);
    if (countryF !== "all") params.set("country", countryF);

    fetch(`/api/stories?${params}`)
      .then((r) => r.json())
      .then((data) => setStories(Array.isArray(data) ? data : []))
      .catch(() => setStories([]))
      .finally(() => setLoading(false));
  }, [productF, countryF]);

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
            <h1 className="heading-display">Где уже стоят домики</h1>
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
          {(["all", "cozy-shelter", "family-shelter", "purrtap"] as ProductFilter[]).map((v) => (
            <button
              key={v}
              onClick={() => setProductF(v)}
              className={`px-3 py-1 rounded-full border text-xs transition-colors ${
                productF === v
                  ? "border-accent bg-accent-soft text-accent"
                  : "border-border-soft text-ink-muted hover:border-accent/40"
              }`}
            >
              {PRODUCT_FILTER_LABELS[v]}
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
          {/* Map */}
          <div
            className="rounded-[16px] overflow-hidden"
            style={{ height: 440, border: "1px solid var(--sand-2)", boxShadow: "var(--shadow-card)" }}
          >
            <Map center={[27.5, 53.9]} zoom={3}>

              <MapClusterLayer
                data={geoJson}
                clusterRadius={40}
                clusterMaxZoom={10}
                clusterColors={["#E8712A", "#C9561A", "#A33C0B"]}
                pointColor="#E8712A"
                onPointClick={(feature, coordinates) => {
                  const p = feature.properties;
                  setPopup({
                    lng: coordinates[0],
                    lat: coordinates[1],
                    city:           p.city,
                    product_slug:   p.product_slug,
                    quote:          p.quote,
                    author_name:    p.author_name,
                    installed_date: p.installed_date,
                    photo_url:      p.photo_url,
                  });
                }}
              />

              {popup && (
                <MapPopup
                  longitude={popup.lng}
                  latitude={popup.lat}
                  closeButton={false}
                  closeOnClick={false}
                  focusAfterOpen={false}
                  onClose={() => setPopup(null)}
                  className="p-0 bg-transparent border-0 shadow-none rounded-none max-w-none"
                >
                  <div style={{ minWidth: 140, maxWidth: 240, width: "max-content", background: "var(--cream)", borderRadius: 12, overflow: "hidden" }}>
                    {/* Ember accent line */}
                    <div style={{ height: 3, background: "var(--ember)", borderRadius: "12px 12px 0 0" }} />

                    <div className="flex flex-col gap-2.5" style={{ padding: "10px 12px 12px" }}>
                      {/* Badges row + close */}
                      <div className="flex items-center justify-between gap-3">
                        <span
                          className="text-[11px] font-medium px-2 py-0.5 rounded-full shrink-0"
                          style={{ background: "var(--ember-pale)", color: "#93430E" }}
                        >
                          {PRODUCT_LABELS[popup.product_slug] ?? popup.product_slug}
                        </span>
                        <button
                          onClick={() => setPopup(null)}
                          className="w-5 h-5 flex items-center justify-center rounded-full transition-colors hover:bg-[var(--sand)] shrink-0"
                          style={{ color: "var(--stone)", opacity: 0.6 }}
                          aria-label="Закрыть"
                        >
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
                            <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                          </svg>
                        </button>
                      </div>

                      {/* Quote */}
                      <p
                        className="heading-quote leading-snug"
                        style={{ fontVariationSettings: '"wght" 700' }}
                      >
                        {popup.quote}
                      </p>

                      {/* Meta */}
                      <p
                        className="font-mono text-[11px] tracking-wide"
                        style={{ color: "var(--stone)", opacity: 0.75 }}
                      >
                        {popup.author_name}
                        {popup.installed_date ? ` · ${formatInstalledDate(popup.installed_date)}` : ""}
                      </p>
                    </div>
                  </div>
                </MapPopup>
              )}
            </Map>
          </div>

          {/* Stories list */}
          <div className="flex flex-col gap-3 overflow-y-auto max-h-[480px] pr-1">
            {loading && (
              <div className="heading-card text-xl text-ink-muted text-center py-10">Загрузка…</div>
            )}
            {!loading && stories.map((s) => (
              <div
                key={s.id}
                className="border border-border-soft rounded-lg p-4 hover:border-accent/40 transition-colors flex gap-3"
              >
                <div className="ph w-24 min-h-[80px] shrink-0 rounded-lg border-0 text-xs">ф</div>
                <div className="flex-1 flex flex-col gap-1">
                  <div className="flex flex-wrap gap-1.5">
                    <span className="inline-block px-2 py-0.5 rounded-full border text-xs border-[var(--sand-2)] text-[var(--stone)] bg-[#FFFDF7]">
                      {s.city}
                    </span>
                    <span className="inline-block px-2 py-0.5 rounded-full border text-xs border-transparent bg-[var(--ember-pale)] text-[#93430E]">
                      {PRODUCT_LABELS[s.product_slug] ?? s.product_slug}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-ink">{s.quote}</p>
                  <p className="text-xs text-ink-muted">
                    {s.author_name}{s.installed_date ? ` · ${formatInstalledDate(s.installed_date)}` : ""}
                  </p>
                </div>
              </div>
            ))}
            {!loading && stories.length === 0 && (
              <div className="heading-card text-xl text-ink-muted text-center py-10">
                Нет историй по этим фильтрам
              </div>
            )}
          </div>
        </div>

        {/* ALL STORIES GRID */}
        <div>
          <h2 className="heading-section mb-6">Все истории</h2>
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="rounded-[14px] animate-pulse"
                  style={{ aspectRatio: "4/3", background: "var(--sand)" }}
                />
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {stories.map((s) => (
                <StoryCard key={s.id} {...s} />
              ))}
            </div>
          )}
          {!loading && stories.length === 0 && (
            <p className="heading-card text-xl text-ink-muted text-center py-10">
              Нет историй по этим фильтрам
            </p>
          )}
        </div>
      </div>

      {/* ADD STORY CTA */}
      <section className="py-14 bg-accent-soft">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="heading-section mb-3">Собрал домик? Расскажи.</h2>
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
