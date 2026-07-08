"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import posthog from "posthog-js";
import {
  ScissorsIcon,
  WrenchIcon,
  CubeIcon,
  MapPinIcon,
  SpinnerIcon,
  ArrowSquareOutIcon,
  ThumbsUpIcon,
  ThumbsDownIcon,
} from "@phosphor-icons/react";

type ServiceType = "laser" | "milling" | "3d-print";

const SERVICES: { slug: ServiceType; icon: typeof ScissorsIcon; label: string; desc: string }[] = [
  { slug: "laser", icon: ScissorsIcon, label: "Лазерная резка", desc: "Идеально для наших домиков" },
  { slug: "milling", icon: WrenchIcon, label: "ЧПУ-фрезеровка", desc: "На будущее" },
  { slug: "3d-print", icon: CubeIcon, label: "3D-печать", desc: "Корпуса PurrTap" },
];

const SOURCE_LABELS: Record<string, string> = {
  vk: "VK", avito: "Avito", kufar: "Kufar", osm: "OSM", web: "Веб-поиск", manual: "От волонтёра",
};

interface GeoResult {
  display_name: string;
  lat: string;
  lon: string;
  address: { country_code: string; city?: string; town?: string; village?: string; state?: string };
}

interface WorkshopCard {
  workshop_service_id: number;
  workshop_id: number;
  service: ServiceType;
  status: "pending" | "confirmed" | "hidden";
  relevant_votes: number;
  name: string | null;
  source: string;
  source_url: string | null;
  website: string | null;
  address: string | null;
  description: string | null;
  city: string;
}

const inputCls =
  "w-full px-3 py-2.5 border rounded-xl text-sm bg-[var(--cream)] text-ink placeholder:text-[var(--stone)] focus:outline-none focus:border-[var(--ember)] transition-colors";

export default function WorkshopFinder() {
  const [service, setService] = useState<ServiceType | null>(null);

  const [cityQuery, setCityQuery] = useState("");
  const [geoResults, setGeoResults] = useState<GeoResult[]>([]);
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoSelected, setGeoSelected] = useState(false);
  const [place, setPlace] = useState<{ city: string; country: string; lat: string; lng: string } | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [cards, setCards] = useState<WorkshopCard[]>([]);
  const [searching, setSearching] = useState(false);
  const [searched, setSearched] = useState(false);
  const [voted, setVoted] = useState<Record<number, "relevant" | "irrelevant">>({});

  // City autocomplete against the existing Nominatim proxy.
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

  async function runSearch() {
    if (!service || !place) return;
    setSearching(true);
    setSearched(true);
    setVoted({});
    try {
      const res = await fetch("/api/workshops/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service,
          city: place.city,
          country: place.country,
          lat: Number(place.lat),
          lng: Number(place.lng),
        }),
      });
      const data = await res.json();
      setCards(Array.isArray(data.cards) ? data.cards : []);
      posthog.capture("workshop_search", { service, city: place.city, from_cache: data.fromCache });
    } catch {
      setCards([]);
    } finally {
      setSearching(false);
    }
  }

  async function vote(card: WorkshopCard, value: "relevant" | "irrelevant") {
    setVoted((v) => ({ ...v, [card.workshop_service_id]: value }));
    try {
      const res = await fetch("/api/workshops/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workshop_service_id: card.workshop_service_id, vote: value }),
      });
      const data = await res.json();
      if (data.status === "hidden") {
        setCards((cs) => cs.filter((c) => c.workshop_service_id !== card.workshop_service_id));
      }
    } catch {
      // keep the optimistic state; a failed vote just won't persist
    }
  }

  return (
    <div className="mb-12">
      {/* Step 1 — pick a service */}
      <div className="grid sm:grid-cols-3 gap-4 mb-4">
        {SERVICES.map(({ icon: Icon, label, desc, slug }) => {
          const active = service === slug;
          return (
            <button
              key={slug}
              type="button"
              onClick={() => setService(slug)}
              className="rounded-xl p-5 border flex flex-col gap-2 text-left transition-all"
              style={{
                borderColor: active ? "var(--ember)" : "var(--sand-2)",
                borderWidth: active ? 2 : 1,
                background: active ? "var(--ember-pale)" : "var(--card-bg)",
              }}
            >
              <Icon size={26} weight="duotone" style={{ color: "var(--ember)" }} />
              <p className="text-sm font-medium" style={{ color: "var(--ink)" }}>{label}</p>
              <p className="text-xs" style={{ color: "var(--stone)" }}>{desc}</p>
            </button>
          );
        })}
      </div>

      {/* Step 1 — city input, fades in once a service is chosen */}
      <div
        className="transition-all duration-500 overflow-visible"
        style={{
          opacity: service ? 1 : 0,
          maxHeight: service ? 220 : 0,
          transform: service ? "translateY(0)" : "translateY(-8px)",
          pointerEvents: service ? "auto" : "none",
        }}
      >
        <div className="relative mb-2 pt-2">
          <input
            type="text"
            value={cityQuery}
            onChange={(e) => { setCityQuery(e.target.value); setGeoSelected(false); setPlace(null); }}
            placeholder="Твой город — например, Минск"
            className={inputCls}
            style={{ borderColor: "var(--sand-2)" }}
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
        <button
          type="button"
          onClick={runSearch}
          disabled={!place || searching}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          style={{ background: "var(--ember)", boxShadow: "var(--shadow-btn)" }}
        >
          {searching ? <><SpinnerIcon size={16} className="animate-spin" /> Ищем…</> : "Найти мастерские"}
        </button>
      </div>

      {/* Steps 5–6 — result cards */}
      {searched && !searching && cards.length === 0 && (
        <p className="text-sm mt-6" style={{ color: "var(--stone)" }}>
          Пока ничего не нашли в этом городе. Знаешь подходящее место?{" "}
          <Link href="/solutions/find-workshop/add" className="underline" style={{ color: "var(--ember-accessible)" }}>Добавь его вручную →</Link>
        </p>
      )}

      {cards.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {cards.map((card) => {
            const didVote = voted[card.workshop_service_id];
            return (
              <div
                key={card.workshop_service_id}
                className="rounded-xl p-4 border flex flex-col gap-2"
                style={{ borderColor: "var(--sand-2)", background: "var(--card-bg)" }}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded" style={{ background: "var(--ember-pale)", color: "var(--ember-accessible)" }}>
                    {SOURCE_LABELS[card.source] ?? card.source}
                  </span>
                  {card.status === "confirmed" && (
                    <span className="text-[10px]" style={{ color: "var(--stone)" }}>✓ проверено</span>
                  )}
                </div>
                <p className="text-sm font-medium leading-snug" style={{ color: "var(--ink)" }}>
                  {card.name ?? "Мастерская"}
                </p>
                {card.address && <p className="text-xs" style={{ color: "var(--stone)" }}>{card.address}</p>}

                {card.source_url && (
                  <a
                    href={card.source_url}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="inline-flex items-center gap-1 text-xs mt-1 hover:underline"
                    style={{ color: "var(--ember-accessible)" }}
                  >
                    <ArrowSquareOutIcon size={13} /> Открыть
                  </a>
                )}

                <div className="mt-auto pt-2 flex gap-2">
                  <button
                    type="button"
                    disabled={Boolean(didVote)}
                    onClick={() => vote(card, "relevant")}
                    className="flex-1 inline-flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs border transition-colors disabled:opacity-50"
                    style={{
                      borderColor: didVote === "relevant" ? "var(--ember)" : "var(--sand-2)",
                      background: didVote === "relevant" ? "var(--ember-pale)" : "transparent",
                      color: "var(--stone)",
                    }}
                  >
                    <ThumbsUpIcon size={13} /> Релевантно
                  </button>
                  <button
                    type="button"
                    disabled={Boolean(didVote)}
                    onClick={() => vote(card, "irrelevant")}
                    className="flex-1 inline-flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs border transition-colors disabled:opacity-50"
                    style={{ borderColor: "var(--sand-2)", color: "var(--stone)" }}
                  >
                    <ThumbsDownIcon size={13} /> Не то
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
