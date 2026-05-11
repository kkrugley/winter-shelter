"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { CtaBlock } from "@/components/ui/CtaBlock";
import { StoryCard } from "@/components/ui/StoryCard";
import { Map, MapClusterLayer, MapPopup } from "@/components/ui/map";
import type { Story } from "@/lib/stories";
import { formatInstalledDate } from "@/lib/utils";

type ViewMode = "map" | "map-grid";
type ProductFilter = "all" | "cozy-shelter" | "family-shelter" | "purrtap";

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
  const [viewMode, setViewMode] = useState<ViewMode>("map");
  const [productF, setProductF] = useState<ProductFilter>("all");
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [allStories, setAllStories] = useState<Story[]>([]);
  const [allStoriesLoading, setAllStoriesLoading] = useState(true);
  const [showAllStories, setShowAllStories] = useState(false);
  const [popup, setPopup] = useState<{
    lng: number; lat: number;
    city: string; product_slug: string; quote: string;
    author_name: string; installed_date: string | null; photo_url: string | null;
  } | null>(null);

  function handleSetViewMode(mode: ViewMode) {
    setViewMode(mode);
    if (mode === "map") setProductF("all");
  }

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

  // Filtered stories for map (and list in map-grid mode)
  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (productF !== "all") params.set("product_slug", productF);

    fetch(`/api/stories?${params}`)
      .then((r) => r.json())
      .then((data) => setStories(Array.isArray(data) ? data : []))
      .catch(() => setStories([]))
      .finally(() => setLoading(false));
  }, [productF]);

  // All stories for the bottom section — no filters, fetched once
  useEffect(() => {
    fetch("/api/stories")
      .then((r) => r.json())
      .then((data) => setAllStories(Array.isArray(data) ? data : []))
      .catch(() => setAllStories([]))
      .finally(() => setAllStoriesLoading(false));
  }, []);

  const visibleAllStories = showAllStories ? allStories : allStories.slice(0, 6);

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">главная</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>истории</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="heading-display">Где уже стоят домики</h1>
            <p className="text-sm text-ink-muted mt-2">
              Каждая точка — реальный собранный и установленный домик или поилка.
            </p>
          </div>
          <Link
            href="/stories/add"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-white text-sm font-medium hover:bg-[#c4673d] transition-colors whitespace-nowrap"
          >
            + добавить историю
          </Link>
        </div>

        {/* Filters + view toggle */}
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
          <span className="ml-auto flex gap-2">
            <button
              onClick={() => handleSetViewMode("map")}
              aria-pressed={viewMode === "map"}
              className={`px-3 py-1 rounded-full border text-xs transition-colors ${
                viewMode === "map"
                  ? "border-accent bg-accent-soft text-accent"
                  : "border-border-soft text-ink-muted hover:border-accent/40"
              }`}
            >
              вид: карта
            </button>
            <button
              onClick={() => handleSetViewMode("map-grid")}
              aria-pressed={viewMode === "map-grid"}
              className={`px-3 py-1 rounded-full border text-xs transition-colors ${
                viewMode === "map-grid"
                  ? "border-accent bg-accent-soft text-accent"
                  : "border-border-soft text-ink-muted hover:border-accent/40"
              }`}
            >
              вид: карта + сетка
            </button>
          </span>
        </div>

        {/* Map section */}
        {viewMode === "map" ? (
          <div
            className="rounded-[16px] overflow-hidden mb-14"
            style={{ height: 440, border: "1px solid var(--sand-2)", boxShadow: "var(--shadow-card)" }}
          >
            <MapContent
              geoJson={geoJson}
              popup={popup}
              setPopup={setPopup}
            />
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1.3fr_1fr] gap-6 mb-14">
            {/* Map */}
            <div
              className="rounded-[16px] overflow-hidden"
              style={{ height: 440, border: "1px solid var(--sand-2)", boxShadow: "var(--shadow-card)" }}
            >
              <MapContent
                geoJson={geoJson}
                popup={popup}
                setPopup={setPopup}
              />
            </div>

            {/* Stories list */}
            <div
              className="rounded-[16px] overflow-y-auto flex flex-col gap-3 p-3"
              style={{ height: 440, border: "1px solid var(--sand-2)", boxShadow: "var(--shadow-card)" }}
            >
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
        )}

        {/* ALL STORIES GRID — always shows full DB, not filtered */}
        <div>
          <h2 className="heading-section mb-6">Все истории</h2>
          {allStoriesLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="rounded-[14px] animate-pulse"
                  style={{ aspectRatio: "4/3", background: "var(--sand)" }}
                />
              ))}
            </div>
          ) : allStories.length === 0 ? (
            <p className="heading-card text-xl text-ink-muted text-center py-10">
              Историй пока нет
            </p>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {visibleAllStories.map((s) => (
                  <StoryCard key={s.id} {...s} />
                ))}
              </div>
              {allStories.length > 6 && (
                <div className="mt-8 text-center">
                  <button
                    onClick={() => setShowAllStories((v) => !v)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border-soft text-sm text-ink-muted hover:border-accent/40 hover:text-ink transition-colors"
                  >
                    {showAllStories ? "скрыть" : `показать все (${allStories.length})`}
                    <svg
                      width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden
                      className={`transition-transform ${showAllStories ? "rotate-180" : ""}`}
                    >
                      <path d="M2 5L7 10L12 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* ADD STORY CTA */}
      <CtaBlock
        heading="Собрали домик? Расскажите!"
        body="Фото + пара строк — и точка появится на карте."
        links={[
          { label: "Добавить историю →", href: "/stories/add", primary: true },
        ]}
      />
    </>
  );
}

// Extracted to avoid duplicating the map + popup JSX across two layout branches
function MapContent({
  geoJson,
  popup,
  setPopup,
}: {
  geoJson: GeoJSON.FeatureCollection<GeoJSON.Point>;
  popup: {
    lng: number; lat: number;
    city: string; product_slug: string; quote: string;
    author_name: string; installed_date: string | null; photo_url: string | null;
  } | null;
  setPopup: (p: null | {
    lng: number; lat: number;
    city: string; product_slug: string; quote: string;
    author_name: string; installed_date: string | null; photo_url: string | null;
  }) => void;
}) {
  const PRODUCT_LABELS_LOCAL: Record<string, string> = {
    "cozy-shelter":   "Cozy Shelter",
    "family-shelter": "Family Shelter",
    "purrtap":        "PurrTap",
    "edc-feeder":     "EDC Feeder",
  };

  return (
    <Map center={[27.5, 53.9]} zoom={3}>
      <MapClusterLayer
        data={geoJson}
        clusterRadius={40}
        clusterMaxZoom={10}
        clusterColors={["#E8712A", "#C9561A", "#A33C0B"]}
        pointColor="#E8712A"
        onPointClick={(feature, coordinates) => {
          const p = feature.properties;
          if (!p) return;
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
            <div style={{ height: 3, background: "var(--ember)", borderRadius: "12px 12px 0 0" }} />
            <div className="flex flex-col gap-2.5" style={{ padding: "10px 12px 12px" }}>
              <div className="flex items-center justify-between gap-3">
                <span
                  className="text-[11px] font-medium px-2 py-0.5 rounded-full shrink-0"
                  style={{ background: "var(--ember-pale)", color: "#93430E" }}
                >
                  {PRODUCT_LABELS_LOCAL[popup.product_slug] ?? popup.product_slug}
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
              <p
                className="heading-quote leading-snug"
                style={{ fontVariationSettings: '"wght" 700' }}
              >
                {popup.quote}
              </p>
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
  );
}
