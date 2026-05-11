import Image from "next/image";

export const metadata = { title: "Demo: Author Card Variants" };

// ─── shared data ──────────────────────────────────────────────────────────────
const AUTHOR = {
  name: "Паша Круглей",
  role: "автор",
  location: "Брест, Беларусь",
  status: "открыт для сотрудничества",
  quote: "«Начал с одного домика у подъезда — теперь это проект для всех.»",
  tags: ["Industrial design", "Open source", "DIY / maker"],
  links: [
    { label: "Telegram", value: "@krutoj_perec", href: "https://t.me/krutoj_perec" },
    { label: "Сайт", value: "pasza.ru", href: "https://pasza.ru/" },
  ],
};

// ─── Current (reference) ──────────────────────────────────────────────────────
function CardCurrent() {
  return (
    <div
      className="rounded-2xl p-6 flex flex-col gap-5"
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--sand-2)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl overflow-hidden shrink-0 relative" style={{ border: "1.5px solid var(--ember-soft)" }}>
          <Image src="/images/general/author-1.jpg" alt={AUTHOR.name} fill className="object-cover" sizes="56px" />
        </div>
        <div className="min-w-0">
          <strong className="text-base text-ink block leading-tight">{AUTHOR.name}</strong>
          <p className="text-xs text-ink-muted mt-0.5">{AUTHOR.role} · {AUTHOR.location}</p>
          <div className="flex items-center gap-1.5 mt-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--forest)] opacity-80 inline-block" />
            <span className="font-mono text-[10px]" style={{ color: "var(--forest-mid)" }}>{AUTHOR.status}</span>
          </div>
        </div>
      </div>

      <blockquote className="heading-card text-xl leading-snug" style={{ fontVariationSettings: '"wght" 400' }}>
        {AUTHOR.quote}
      </blockquote>

      <div className="flex flex-wrap gap-1.5">
        {AUTHOR.tags.map((tag) => (
          <span key={tag} className="px-2.5 py-1 rounded-lg text-[11px] font-mono" style={{ background: "var(--sand)", color: "var(--stone)" }}>
            {tag}
          </span>
        ))}
      </div>

      <div className="h-px" style={{ background: "var(--sand)" }} />

      <div className="flex flex-col gap-2">
        {AUTHOR.links.map(({ label, value, href }) => (
          <a
            key={label}
            href={href}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-ink"
            style={{ background: "var(--sand)" }}
          >
            <span className="font-mono text-[11px] text-ink-muted w-16 shrink-0">{label}</span>
            <span className="text-ink-muted truncate">{value}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

// ─── Variant A: Editorial Stack ───────────────────────────────────────────────
function CardEditorial() {
  return (
    <div className="rounded-2xl overflow-hidden flex flex-col" style={{ boxShadow: "var(--shadow-lift)" }}>
      {/* Banner */}
      <div
        className="relative px-6 pt-8 pb-10 flex items-end gap-5"
        style={{ background: "linear-gradient(135deg, var(--ember) 0%, var(--forest) 100%)" }}
      >
        {/* Subtle texture overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(255,255,255,.3) 4px, rgba(255,255,255,.3) 5px)",
          }}
          aria-hidden
        />

        {/* Avatar */}
        <div
          className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 z-10"
          style={{
            boxShadow: "0 0 0 2px rgba(255,255,255,.35), 0 8px 24px rgba(0,0,0,.3)",
          }}
        >
          <Image src="/images/general/author-1.jpg" alt={AUTHOR.name} fill className="object-cover" sizes="80px" />
        </div>

        {/* Name block */}
        <div className="z-10 min-w-0">
          <p className="font-mono text-[10px] tracking-widest uppercase mb-1" style={{ color: "rgba(255,255,255,.6)" }}>автор проекта</p>
          <h2 className="text-2xl font-bold leading-tight" style={{ color: "#fff", fontFamily: "var(--font-lora)" }}>
            {AUTHOR.name}
          </h2>
          <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,.75)" }}>{AUTHOR.location}</p>
        </div>
      </div>

      {/* Body */}
      <div
        className="px-6 pt-6 pb-7 flex flex-col gap-5"
        style={{ background: "var(--card-bg)", marginTop: "-1.5rem", borderRadius: "0 0 1rem 1rem" }}
      >
        {/* Status */}
        <div className="flex items-center gap-2 -mt-1">
          <span className="w-2 h-2 rounded-full shrink-0" style={{ background: "var(--forest)" }} />
          <span className="text-xs font-mono" style={{ color: "var(--forest-mid)" }}>{AUTHOR.status}</span>
        </div>

        {/* Quote with decorative mark */}
        <div className="relative pl-5">
          <span
            className="absolute left-0 top-0 leading-none select-none"
            style={{ fontSize: "3rem", color: "var(--ember)", fontFamily: "var(--font-lora)", lineHeight: 0.85, opacity: 0.7 }}
            aria-hidden
          >"</span>
          <blockquote className="text-base leading-relaxed text-ink" style={{ fontFamily: "var(--font-lora)" }}>
            {AUTHOR.quote.replace(/^«|»$/g, "")}
          </blockquote>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {AUTHOR.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-[11px] font-mono"
              style={{ background: "var(--ember-pale)", color: "var(--ember)", border: "1px solid var(--ember-wash)" }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="h-px" style={{ background: "var(--sand)" }} />

        {/* Links */}
        <div className="flex flex-col gap-1.5">
          {AUTHOR.links.map(({ label, value, href }) => (
            <a
              key={label}
              href={href}
              className="flex items-center justify-between text-sm group"
              style={{ color: "var(--stone)" }}
            >
              <span className="font-mono text-[10px] uppercase tracking-wider" style={{ color: "var(--stone)" }}>{label}</span>
              <span
                className="text-sm underline underline-offset-2 decoration-transparent group-hover:decoration-current transition-colors"
                style={{ color: "var(--ember)" }}
              >
                {value} ↗
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Variant B: Maker's Notebook ──────────────────────────────────────────────
function CardNotebook() {
  return (
    <div
      className="rounded-2xl p-6 flex flex-col gap-0"
      style={{
        background: "var(--card-bg)",
        border: "2px dashed var(--sand-2)",
        boxShadow: "4px 4px 0 var(--sand-2)",
        // subtle notebook lines
        backgroundImage: "repeating-linear-gradient(to bottom, transparent, transparent 23px, var(--sand) 23px, var(--sand) 24px)",
        backgroundPositionY: "32px",
      }}
    >
      {/* Header row */}
      <div className="flex items-start gap-4 mb-5">
        {/* "Pinned" photo */}
        <div
          className="relative w-16 h-20 rounded shrink-0 overflow-hidden"
          style={{
            transform: "rotate(-1.5deg)",
            boxShadow: "2px 4px 0 var(--sand-2), 0 8px 16px rgba(44,42,39,.15)",
            border: "3px solid #fff",
          }}
        >
          <Image src="/images/general/author-1.jpg" alt={AUTHOR.name} fill className="object-cover object-top" sizes="64px" />
        </div>

        <div className="min-w-0 pt-1">
          <h2
            className="text-2xl leading-tight"
            style={{ fontFamily: "var(--font-caveat)", color: "var(--charcoal)", fontWeight: 700 }}
          >
            {AUTHOR.name}
          </h2>
          <p className="text-xs text-ink-muted mt-0.5">{AUTHOR.role} · {AUTHOR.location}</p>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "var(--forest)" }} />
            <span className="text-[10px] font-mono" style={{ color: "var(--forest-mid)" }}>{AUTHOR.status}</span>
          </div>
        </div>
      </div>

      {/* Dashed divider */}
      <div className="border-b border-dashed mb-5" style={{ borderColor: "var(--sand-2)" }} />

      {/* Quote in Caveat */}
      <blockquote
        className="text-xl leading-snug mb-5"
        style={{ fontFamily: "var(--font-caveat)", color: "var(--charcoal)", fontWeight: 600 }}
      >
        {AUTHOR.quote}
      </blockquote>

      {/* Dashed divider */}
      <div className="border-b border-dashed mb-5" style={{ borderColor: "var(--sand-2)" }} />

      {/* Tags as #slug */}
      <div className="flex flex-wrap gap-x-3 gap-y-1 mb-5">
        {AUTHOR.tags.map((tag) => (
          <span key={tag} className="font-mono text-[12px]" style={{ color: "var(--ember)" }}>
            #{tag.toLowerCase().replace(/[\s/]+/g, "-")}
          </span>
        ))}
      </div>

      {/* Dashed divider */}
      <div className="border-b border-dashed mb-5" style={{ borderColor: "var(--sand-2)" }} />

      {/* Links as plain text */}
      <div className="flex flex-col gap-2">
        {AUTHOR.links.map(({ label, value, href }) => (
          <a
            key={label}
            href={href}
            className="flex items-center gap-2 text-sm group"
          >
            <span className="font-mono text-[11px]" style={{ color: "var(--stone)" }}>{label} →</span>
            <span
              className="underline underline-offset-2 decoration-transparent group-hover:decoration-current transition-colors"
              style={{ color: "var(--charcoal)", fontFamily: "var(--font-caveat)", fontSize: "1.1rem" }}
            >
              {value}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

// ─── Demo page ────────────────────────────────────────────────────────────────
export default function AuthorCardDemoPage() {
  const variants = [
    {
      id: "current",
      label: "Текущий",
      description: "Стандартная карточка из about/",
      component: <CardCurrent />,
    },
    {
      id: "editorial",
      label: "Вариант A — Editorial Stack",
      description: "Журнальная карточка: цветной баннер-шапка с фото + чистая нижняя секция с цитатой и тегами-пилюлями.",
      component: <CardEditorial />,
    },
    {
      id: "notebook",
      label: "Вариант B — Maker's Notebook",
      description: "Блокнот мейкера: пунктирная рамка, тетрадные линии, фото «приколото», Caveat как основной шрифт, теги как #slug.",
      component: <CardNotebook />,
    },
  ];

  return (
    <main className="min-h-screen py-16" style={{ background: "var(--cream)" }}>
      <div className="max-w-5xl mx-auto px-6">
        {/* Page header */}
        <div className="mb-14">
          <p className="font-mono text-[11px] tracking-widest uppercase mb-2" style={{ color: "var(--stone)" }}>
            demo · not linked from nav
          </p>
          <h1 className="heading-display mb-3">Карточка автора</h1>
          <p className="text-sm text-ink-muted max-w-lg">
            Три варианта компоновки для секции «Как это началось» на странице about/.
            Выберите подходящий — или возьмите идеи из нескольких.
          </p>
        </div>

        {/* Variants */}
        <div className="grid md:grid-cols-3 gap-10 items-start">
          {variants.map(({ id, label, description, component }) => (
            <div key={id} className="flex flex-col gap-4">
              <div>
                <p
                  className="font-mono text-[10px] tracking-widest uppercase mb-1"
                  style={{ color: "var(--stone)" }}
                >
                  {label}
                </p>
                <p className="text-xs text-ink-muted leading-relaxed">{description}</p>
              </div>
              {component}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
