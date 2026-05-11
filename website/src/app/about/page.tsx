import Image from "next/image";
import Link from "next/link";

const stats = [
  { value: "1 200+", label: "скачиваний" },
  { value: "47", label: "установленных" },
  { value: "4", label: "страны" },
  { value: "4", label: "языка" },
];

const timeline = [
  { year: "2023 · осень", title: "Первый домик", desc: "Прототип у подъезда." },
  { year: "2024 · весна", title: "Cozy v1", desc: "Первый публичный чертёж." },
  { year: "2024 · зима", title: "Family + сайт", desc: "4 языка, Vercel." },
  { year: "2026", title: "PurrTap · redesign", desc: "Новый сайт + каталог." },
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

export default function AboutPage() {
  return (
    <>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Breadcrumb */}
        <div className="font-mono text-xs text-ink-muted mb-8">
          <Link href="/" className="hover:text-accent">главная</Link>
          {" / "}
          <span className="text-accent">о проекте</span>
        </div>

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
            <div className="flex flex-wrap gap-2">
              {["open source", "CC BY 4.0", "2023 →"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full border border-border-soft text-xs text-ink-muted"
                >
                  {tag}
                </span>
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

        {/* Stats */}
        <div className="rounded-2xl p-8 mb-14 border" style={{ background: "var(--sand)", borderColor: "var(--sand-2)" }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(({ value, label }) => (
              <div key={label}>
                <span className="font-mono text-xs block mb-1" style={{ color: "var(--stone)" }}>{label}</span>
                <div className="heading-section" style={{ fontVariationSettings: '"wght" 400' }}>{value}</div>
              </div>
            ))}
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
            {/* Author card */}
            <div
              className="rounded-2xl p-6 flex flex-col gap-5"
              style={{
                background: "var(--card-bg)",
                border: "1px solid var(--sand-2)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              {/* Header */}
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center font-hand text-3xl shrink-0"
                  style={{
                    background: "linear-gradient(135deg, var(--ember-pale) 0%, var(--ember-wash) 100%)",
                    border: "1.5px solid var(--ember-soft)",
                    color: "var(--ember)",
                    boxShadow: "0 2px 8px rgba(232,113,42,.15)",
                  }}
                >П</div>
                <div className="min-w-0">
                  <strong className="text-base text-ink block leading-tight">Паша Круглей</strong>
                  <p className="text-xs text-ink-muted mt-0.5">автор · Брест, Беларусь</p>
                  {/* Status dot */}
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--forest)] opacity-80 inline-block" />
                    <span className="font-mono text-[10px]" style={{ color: "var(--forest-mid)" }}>открыт для сотрудничества</span>
                  </div>
                </div>
              </div>

              {/* Quote */}
              <blockquote
                className="heading-card text-xl leading-snug"
                style={{ fontVariationSettings: '"wght" 400' }}
              >
                «Начал с одного домика у подъезда — теперь это проект для всех.»
              </blockquote>

              {/* Role tags */}
              <div className="flex flex-wrap gap-1.5">
                {["Industrial design", "Open source", "DIY / maker"].map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-mono"
                    style={{ background: "var(--sand)", color: "var(--stone)" }}
                  >{tag}</span>
                ))}
              </div>

              {/* Divider */}
              <div className="h-px" style={{ background: "var(--sand)" }} />

              {/* Contact links */}
              <div className="flex flex-col gap-2">
                {[
                  { label: "Telegram", value: "@safepaws", href: "https://t.me/safepaws_help" },
                  { label: "Email", value: "kkrugley@proton.me", href: "mailto:kkrugley@proton.me" },
                  { label: "GitHub", value: "kkrugley / winter-shelter", href: "https://github.com/kkrugley/winter-shelter" },
                ].map(({ label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="author-contact-link flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-ink"
                    style={{ background: "var(--sand)" }}
                  >
                    <span className="font-mono text-[11px] text-ink-muted w-16 shrink-0">{label}</span>
                    <span className="text-ink-muted truncate">{value}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-14">
          <h2 className="heading-section mb-8">Шаги проекта</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {timeline.map(({ year, title, desc }) => (
              <div key={year} className="border rounded-xl p-5" style={{ borderColor: "var(--sand)", background: "var(--cream)" }}>
                <span className="font-mono text-xs block mb-3" style={{ color: "var(--stone)" }}>{year}</span>
                <strong className="heading-card text-xl block mb-2">{title}</strong>
                <p className="text-xs text-ink-muted">{desc}</p>
              </div>
            ))}
          </div>
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
                Telegram · @safepaws
              </a>
              <a
                href="mailto:kkrugley@proton.me"
                className="flex items-center justify-center px-5 py-2.5 rounded-full border text-sm text-ink hover:border-[var(--ember)] hover:text-[var(--ember)] transition-colors"
                style={{ borderColor: "var(--sand-2)" }}
              >
                Email · kkrugley@proton.me
              </a>
              <a
                href="https://github.com/kkrugley/winter-shelter"
                className="flex items-center justify-center px-5 py-2.5 rounded-full border text-sm text-ink hover:border-[var(--ember)] hover:text-[var(--ember)] transition-colors"
                style={{ borderColor: "var(--sand-2)" }}
              >
                GitHub · safepaws/website
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
