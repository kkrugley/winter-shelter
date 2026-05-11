import Image from "next/image";
import Link from "next/link";
import { getStats } from "@/lib/stats";
import { RoadmapZigzag, type TimelineItem } from "@/components/RoadmapZigzag";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const BADGE_TILTS = [-1.1, 0.8, -0.6, 1.3];

const timeline: TimelineItem[] = [
  { year: "2023 · осень", title: "Первый домик", desc: "Прототип у подъезда." },
  { year: "2024 · весна", title: "Cozy v1", desc: "Первый публичный чертёж." },
  { year: "2024 · зима", title: "Family + сайт", desc: "4 языка, Vercel." },
  { year: "2026", title: "PurrTap · redesign", desc: "Новый сайт + каталог.", future: true },
];

// About image card — adjust ring gap, ring width (px), and tilt (degrees, positive = clockwise)
const ABOUT_RING_GAP = 3;
const ABOUT_RING_WIDTH = 3;
const ABOUT_TILT = -2;

const partners = [
  "Хакспейс Брест",
  "Приют «Дом»",
  "Волонтёры Минск",
  "И 40+ других",
];

export default async function AboutPage() {
  const stats = await getStats();

  const badgeItems = [
    {
      value: stats.downloads > 0 ? `${stats.downloads.toLocaleString("ru")}+` : "1 200+",
      label: "скачиваний",
    },
    { value: String(stats.installations || "47"), label: "установленных" },
    { value: String(stats.countries || "4"), label: "стран" },
    { value: String(stats.languages), label: "языка" },
  ];

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">главная</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>о проекте</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Mission hero */}
        <div className="grid md:grid-cols-2 gap-10 items-center mb-14">
          <div>
            <h1 className="heading-display md:text-6xl mb-5">
              Добро должно быть{" "}
              <span className="scribble-underline">простым.</span>
            </h1>
            <p className="text-base text-ink-muted leading-relaxed mb-6 max-w-[520px]">
              SafePaws — открытый проект: чертежи и решения, чтобы любой человек
              мог с минимальным усилием помочь уличным животным пережить зиму.
            </p>
            <div className="flex flex-wrap gap-3">
              {badgeItems.map(({ value, label }, i) => (
                <div
                  key={label}
                  style={{
                    transform: `rotate(${BADGE_TILTS[i % BADGE_TILTS.length]}deg)`,
                    border: "2px dashed var(--sand-2)",
                    background: "var(--card-bg)",
                    boxShadow: "3px 3px 0 var(--sand-2)",
                    borderRadius: "10px",
                    padding: "8px 14px 10px",
                  }}
                >
                  <span
                    className="font-mono block"
                    style={{
                      fontSize: "0.5625rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      color: "var(--stone)",
                      marginBottom: "2px",
                    }}
                  >
                    {label}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-lora)",
                      fontSize: "1.625rem",
                      fontWeight: 700,
                      color: "var(--ember)",
                      lineHeight: 1,
                      display: "block",
                    }}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div
            className="hero-card overflow-hidden rounded-2xl"
            style={{
              ["--hero-tilt-base" as string]: `${ABOUT_TILT}deg`,
              boxShadow: "var(--shadow-lift)",
              outline: `${ABOUT_RING_WIDTH}px solid var(--ember)`,
              outlineOffset: `${ABOUT_RING_GAP}px`,
            }}
          >
            <Image
              src="/images/general/about-1.jpeg"
              alt="Команда SafePaws"
              width={1376}
              height={768}
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Story of project */}
        <div className="mb-14">
          <h2 className="heading-section mb-8">Как это началось</h2>
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div className="space-y-4 text-sm text-ink-muted leading-relaxed">
              <p>В 2023-м Паша сделал один домик для кошек у подъезда. Потом второй. Потом соседи попросили чертёж.</p>
              <p>Так и появился SafePaws — чтобы чертёж, который уже есть, мог скачать и сделать каждый.</p>
              <p>Сегодня в проекте 2 модели домиков, поилка PurrTap, и в планах кормушка EDC.</p>
            </div>
            {/* Author card — Maker's Notebook style, 24px baseline grid */}
            {/* Outer div handles rotation; inner keeps the background flat to avoid jagged lines */}
            <div
              className="max-w-xs mx-auto md:ml-auto md:mr-20 md:mx-0"
              style={{ transform: "rotate(1.2deg)" }}
            >
            <div
              className="rounded-2xl"
              style={{
                position: "relative",
                background: "var(--card-bg)",
                border: "2px dashed var(--sand-2)",
                boxShadow: "4px 4px 0 var(--sand-2)",
                padding: "24px",
                overflow: "hidden",
              }}
            >
              {/* Ruled lines as real DOM elements — render crisply at any rotation */}
              {Array.from({ length: 20 }, (_, i) => (
                <div
                  key={i}
                  aria-hidden
                  style={{
                    position: "absolute",
                    top: `${(i + 1) * 24}px`,
                    left: 0,
                    right: 0,
                    height: "1px",
                    background: "var(--sand)",
                  }}
                />
              ))}
              {/* Header: photo (72px = 3 lines) + info (3 lines) → total 72px + mb 24px */}
              <div className="flex items-start gap-4" style={{ marginBottom: "24px" }}>
                <div
                  className="relative shrink-0 overflow-hidden"
                  style={{
                    width: "56px",
                    height: "72px",
                    borderRadius: "2px",
                    border: "3px solid #fff",
                    transform: "rotate(-1.5deg)",
                    boxShadow: "2px 4px 0 var(--sand-2), 0 6px 14px rgba(44,42,39,.14)",
                  }}
                >
                  <Image src="/images/general/author-1.jpg" alt="Паша Круглей" fill className="object-cover object-top" sizes="56px" />
                </div>
                <div style={{ lineHeight: "24px" }}>
                  <strong
                    className="block"
                    style={{ fontFamily: "var(--font-caveat)", fontSize: "1.375rem", fontWeight: 700, color: "var(--charcoal)", lineHeight: "24px" }}
                  >Паша Круглей</strong>
                  <p style={{ fontSize: "0.75rem", color: "var(--stone)", lineHeight: "24px" }}>автор · Брест, Беларусь</p>
                  <div className="flex items-center gap-1.5" style={{ lineHeight: "24px" }}>
                    <span className="shrink-0 rounded-full" style={{ width: "6px", height: "6px", background: "var(--forest)", display: "inline-block" }} />
                    <span className="font-mono" style={{ fontSize: "0.625rem", color: "var(--forest-mid)" }}>открыт для сотрудничества</span>
                  </div>
                </div>
              </div>

              {/* Dashed rule — falls on a line */}
              <div style={{ borderTop: "1px dashed var(--sand-2)", marginBottom: "24px" }} />

              {/* Quote: Caveat font, line-height 24px → stays on grid regardless of wrap count */}
              <blockquote
                style={{
                  fontFamily: "var(--font-caveat)",
                  fontSize: "1.2rem",
                  fontWeight: 600,
                  color: "var(--charcoal)",
                  lineHeight: "24px",
                  marginBottom: "24px",
                }}
              >
                «Начал с одного домика у подъезда — теперь это проект для всех.»
              </blockquote>

              {/* Tags as #slug, height = 24px */}
              <div className="flex flex-wrap gap-x-3" style={{ lineHeight: "24px", marginBottom: "24px" }}>
                {["Industrial design", "Open source", "DIY / maker"].map((tag) => (
                  <span
                    key={tag}
                    className="font-mono"
                    style={{ fontSize: "0.75rem", color: "var(--ember)" }}
                  >#{tag.toLowerCase().replace(/[\s/]+/g, "-")}</span>
                ))}
              </div>

              {/* Dashed rule */}
              <div style={{ borderTop: "1px dashed var(--sand-2)", marginBottom: "24px" }} />

              {/* Contact links — each 24px tall */}
              {[
                { label: "Telegram", value: "@krutoj_perec", href: "https://t.me/krutoj_perec" },
                { label: "Сайт", value: "pasza.ru", href: "https://pasza.ru/" },
              ].map(({ label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-2 group"
                  style={{ lineHeight: "24px" }}
                >
                  <span className="font-mono shrink-0" style={{ fontSize: "0.6875rem", color: "var(--stone)" }}>{label} →</span>
                  <span
                    className="underline underline-offset-2 decoration-transparent group-hover:decoration-current transition-colors"
                    style={{ fontFamily: "var(--font-caveat)", fontSize: "1.1rem", color: "var(--charcoal)" }}
                  >{value}</span>
                </a>
              ))}
            </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-14">
          <h2 className="heading-section mb-8">Шаги проекта</h2>
          <RoadmapZigzag items={timeline} />
        </div>

        {/* Partners */}
        <div className="mb-14">
          <h2 className="heading-section mb-8">Кто помогает</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {partners.map((name) => (
              <div key={name} className="border border-border-soft rounded-xl p-5 text-center">
                <div className="ph mb-3" style={{ minHeight: "60px" }}>лого</div>
                <strong className="text-sm text-ink">{name}</strong>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div
          className="relative overflow-hidden rounded-2xl p-8"
          style={{
            background: "linear-gradient(180deg, var(--ember-pale) 0%, var(--cream) 100%)",
            border: "1px solid var(--ember-soft)",
            boxShadow: "var(--shadow-lift)",
          }}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="heading-section mb-3">Связаться</h2>
              <p className="text-sm text-ink-muted">
                Вопрос, предложение, партнёрство — пиши любым способом.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <a
                href="https://t.me/safepaws_help"
                className="flex items-center justify-center px-5 py-2.5 rounded-full border text-sm text-ink hover:border-[var(--ember)] hover:text-[var(--ember)] transition-colors"
                style={{ borderColor: "var(--sand-2)" }}
              >
                Telegram · @safepaws_help
              </a>
              <a
                href="mailto:kkrugley@proton.me"
                className="flex items-center justify-center px-5 py-2.5 rounded-full border text-sm text-ink hover:border-[var(--ember)] hover:text-[var(--ember)] transition-colors"
                style={{ borderColor: "var(--sand-2)" }}
              >
                Email · kkrugley@proton.me
              </a>
              <a
                href="https://github.com/kkrugley/safepaws"
                className="flex items-center justify-center px-5 py-2.5 rounded-full border text-sm text-ink hover:border-[var(--ember)] hover:text-[var(--ember)] transition-colors"
                style={{ borderColor: "var(--sand-2)" }}
              >
                GitHub · kkrugley/safepaws
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
