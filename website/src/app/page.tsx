import React from "react";
import Link from "next/link";
import { Hammer, Heart, BookOpenText, ArrowLineDown, PencilSimple, HouseLine } from "@phosphor-icons/react/dist/ssr";
import { products } from "@/data/products";
import { ProductIllustration } from "@/components/ui/ProductIllustration";
import { StoryCard } from "@/components/ui/StoryCard";
import { getPublishedStories } from "@/lib/stories";
import { QuizSection } from "@/components/ui/QuizSection";


const paths = [
  {
    icon: Hammer,
    title: "У меня есть руки",
    desc: "Собрать домик по чертежам или поилку PurrTap.",
    chips: ["CNC/лобзик", "фанера"],
    cta: "Выбрать чертёж →",
    href: "/solutions",
  },
  {
    icon: Heart,
    title: "Хочу поддержать",
    desc: "Рассказать о проекте, донатом или временем.",
    chips: ["share", "donate", "stories"],
    cta: "Варианты →",
    href: "/help",
  },
  {
    icon: BookOpenText,
    title: "Просто смотрю",
    desc: "Узнать, что это и кому нужно.",
    chips: ["истории", "о нас"],
    cta: "Истории людей →",
    href: "/stories",
  },
];

const previewProducts = products.slice(0, 4);

const steps = [
  { n: 1, title: "Скачай чертёж", desc: "Выбери модель и материал — получи DXF и PDF.", Icon: ArrowLineDown },
  { n: 2, title: "Собери", desc: "Сам или на ближайшем хакспейсе / CNC.", Icon: PencilSimple },
  { n: 3, title: "Установи и расскажи", desc: "Помести во двор и поделись историей.", Icon: HouseLine },
];


const statusLabel: Record<string, string> = {
  new: "НОВЫЙ",
  "coming-soon": "СКОРО",
  prototype: "прототип",
};
const statusColor: Record<string, string> = {
  available: "border-[var(--forest-pale)] text-[var(--forest)] bg-[var(--forest-pale)]",
  new: "border-transparent text-[#93430E] bg-[var(--ember-pale)]",
  "coming-soon": "border-[var(--sand-2)] text-[var(--stone)]",
  prototype: "border-[var(--sand-2)] text-[var(--stone)]",
};

export default async function HomePage() {
  const allStories = await getPublishedStories().catch(() => []);
  const miniStories = allStories.sort(() => Math.random() - 0.5).slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-14 pb-12">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="heading-display md:text-6xl mb-5">
              Зима приходит.{" "}
              <span className="scribble-underline">
                Им некуда спрятаться.
              </span>
            </h1>
            <p className="text-base md:text-lg mb-8 max-w-[440px] leading-relaxed" style={{ color: "var(--stone)" }}>
              SafePaws — открытые чертежи домиков и поилок для бездомных кошек.<br></br><br></br>
              Скачай, собери, установи — или помоги иначе.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/help"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--ember)] text-white text-sm font-medium transition-all hover:opacity-90 hover:-translate-y-px"
                style={{ boxShadow: "var(--shadow-btn)" }}
              >
                Начать помогать →
              </Link>
              <Link
                href="/solutions"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[var(--sand-2)] text-ink text-sm font-medium hover:border-[var(--stone)] transition-colors"
              >
                Посмотреть каталог
              </Link>
            </div>
          </div>
          <div className="ph min-h-[300px] md:min-h-[360px]" style={{ boxShadow: "var(--shadow-lift)" }}>
            фото котов зимой / hero · 16:10
          </div>
        </div>
      </section>

      {/* 3-PATH FORK + QUIZ */}
      <section className="py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="heading-section mb-8">Как ты хочешь помочь?</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {paths.map(({ icon: Icon, title, desc, chips, cta, href }) => (
              <div
                key={href}
                className="relative overflow-hidden border border-[var(--sand)] rounded-[20px] p-7 flex flex-col gap-3 transition-all hover:-translate-y-0.5"
                style={{ background: "var(--card-bg)", boxShadow: "var(--shadow-card)" }}
              >
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: "linear-gradient(180deg, var(--ember-pale) 0%, transparent 40%)", opacity: 0.45 }}
                />
                <div
                  className="relative z-10 w-14 h-14 rounded-[14px] flex items-center justify-center border border-[var(--sand-2)]"
                  style={{ background: "var(--cream)", color: "var(--ember)" }}
                >
                  <Icon size={26} weight="duotone" />
                </div>
                <h3 className="relative z-10 heading-card" style={{ marginTop: 6 }}>{title}</h3>
                <p className="relative z-10 text-sm leading-[1.5]" style={{ color: "var(--stone)" }}>{desc}</p>
                <div className="relative z-10 flex flex-wrap gap-1.5">
                  {chips.map((c) => (
                    <span
                      key={c}
                      className="px-2.5 py-1 rounded-full border text-xs font-medium"
                      style={{ borderColor: "var(--sand-2)", background: "var(--cream)", color: "var(--stone)" }}
                    >
                      {c}
                    </span>
                  ))}
                </div>
                <Link
                  href={href}
                  className="relative z-10 mt-auto inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
                  style={{ color: "var(--ember-accessible)", paddingTop: 8 }}
                >
                  {cta}
                </Link>
              </div>
            ))}
          </div>

          <QuizSection />
        </div>
      </section>

      {/* CATALOG PREVIEW */}
      <section id="catalog" className="py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="heading-section">Каталог решений</h2>
            <Link href="/solutions" className="link-script hidden sm:block hover:underline">
              все решения →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {previewProducts.map((p) => (
              <div
                key={p.slug}
                className={`border rounded-[16px] overflow-hidden flex flex-col transition-all hover:-translate-y-0.5 ${p.status === "coming-soon" ? "opacity-70" : ""}`}
                style={{ borderColor: "var(--sand)", background: "var(--cream)", boxShadow: "var(--shadow-pale)" }}
              >
                <ProductIllustration
                  slug={p.slug}
                  isNew={p.status === "new"}
                  badge={p.status === "available" ? p.capacity : (statusLabel[p.status] ?? p.status)}
                  badgeColor={p.status === "new" ? "ember" : undefined}
                  className="aspect-[5/4] border-b border-dashed"
                  style={{ borderColor: "var(--sand-2)" }}
                />
                <div className="p-4 flex flex-col flex-1 gap-2">
                  <strong className="heading-card text-lg">{p.name}</strong>
                  <p className="text-xs" style={{ color: "var(--stone)" }}>{p.subtitle}</p>
                  <div className="mt-auto pt-2">
                    <Link
                      href={`/solutions/${p.slug}`}
                      aria-label={`${p.status === "coming-soon" || p.status === "prototype" ? "Узнать о" : p.category === "hydration" ? "Как установить" : "Детали о"} ${p.name}`}
                      className="inline-flex items-center gap-1 text-xs font-medium transition-colors hover:underline"
                      style={{ color: "var(--ember)" }}
                    >
                      {p.status === "coming-soon" || p.status === "prototype"
                        ? "Узнать →"
                        : p.category === "hydration"
                        ? "Как установить →"
                        : "Детали →"}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 sm:hidden text-center">
            <Link href="/solutions" className="link-script text-xl hover:underline">Все решения →</Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="heading-section mb-8">Как это работает</h2>

          {/* Desktop: card + dashed connector + card */}
          <div
            className="hidden md:grid items-stretch mt-2"
            style={{ gridTemplateColumns: "1fr 44px 1fr 44px 1fr", gap: 0 }}
          >
            {steps.map(({ n, title, desc, Icon }, i) => (
              <React.Fragment key={n}>
                <div
                  className="relative flex flex-col gap-3 rounded-[16px] border p-6"
                  style={{
                    background: "var(--card-bg)",
                    borderColor: "var(--sand)",
                    boxShadow: "var(--shadow-card)",
                    minHeight: 200,
                  }}
                >
                  {/* Step number + title */}
                  <div className="flex items-center gap-3.5">
                    <span
                      className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 font-hand text-lg"
                      style={{ background: "var(--ember)", color: "#FFF6EC", letterSpacing: "-0.01em" }}
                    >
                      {n}
                    </span>
                    <strong className="heading-card leading-tight">{title}</strong>
                  </div>
                  {/* Description */}
                  <p className="text-sm leading-relaxed" style={{ color: "var(--stone)" }}>{desc}</p>
                  {/* Corner icon */}
                  <div
                    className="absolute bottom-4 right-4"
                    style={{ color: "var(--forest-mid)", opacity: 0.55 }}
                  >
                    <Icon size={40} weight="light" />
                  </div>
                </div>
                {/* Dashed connector (not after last item) */}
                {i < steps.length - 1 && (
                  <div
                    key={`conn-${n}`}
                    style={{
                      alignSelf: "center",
                      height: 2,
                      backgroundImage: "linear-gradient(90deg, var(--ember-soft) 50%, transparent 50%)",
                      backgroundSize: "8px 2px",
                      backgroundRepeat: "repeat-x",
                    }}
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Mobile: vertical stack */}
          <div className="flex flex-col gap-4 md:hidden">
            {steps.map(({ n, title, desc, Icon }) => (
              <div
                key={n}
                className="relative flex gap-4 items-start rounded-[16px] border p-5"
                style={{ background: "var(--card-bg)", borderColor: "var(--sand)", boxShadow: "var(--shadow-card)" }}
              >
                <span
                  className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 font-hand text-lg"
                  style={{ background: "var(--ember)", color: "#FFF6EC", letterSpacing: "-0.01em" }}
                >
                  {n}
                </span>
                <div className="flex-1">
                  <strong className="heading-card text-lg block mb-1">{title}</strong>
                  <p className="text-sm" style={{ color: "var(--stone)" }}>{desc}</p>
                </div>
                <div style={{ color: "var(--forest-mid)", opacity: 0.55 }}>
                  <Icon size={32} weight="light" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STORIES STRIP */}
      <section className="py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="heading-section">Истории</h2>
            <Link href="/stories" className="link-script hidden sm:block hover:underline">
              все истории →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {miniStories.map((s) => (
              <StoryCard key={s.id} {...s} />
            ))}
          </div>
          <div className="mt-4 sm:hidden text-center">
            <Link href="/stories" className="link-script text-xl hover:underline">Все истории →</Link>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div
            className="relative overflow-hidden rounded-[24px] px-8 py-14 text-center"
            style={{
              background: "var(--ember-pale)",
              border: "1px solid var(--ember-soft)",
              boxShadow: "var(--shadow-lift)",
            }}
          >
            {/* Radial depth overlays */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 15% 75%, rgba(232,113,42,.09), transparent 38%), radial-gradient(circle at 85% 25%, rgba(61,107,79,.06), transparent 38%)",
              }}
            />

            {/* Paw prints — decorative background */}
            <span
              className="absolute pointer-events-none select-none"
              style={{ top: "18%", left: "7%", transform: "rotate(-20deg)", fontSize: 34, opacity: 0.13, filter: "grayscale(1) sepia(0.4)" }}
              aria-hidden
            >🐾</span>
            <span
              className="absolute pointer-events-none select-none"
              style={{ bottom: "20%", right: "10%", transform: "rotate(15deg)", fontSize: 34, opacity: 0.13, filter: "grayscale(1) sepia(0.4)" }}
              aria-hidden
            >🐾</span>
            <span
              className="absolute pointer-events-none select-none"
              style={{ top: "55%", left: "17%", transform: "rotate(8deg)", fontSize: 22, opacity: 0.11, filter: "grayscale(1) sepia(0.4)" }}
              aria-hidden
            >🐾</span>
            <span
              className="absolute pointer-events-none select-none"
              style={{ top: "22%", right: "16%", transform: "rotate(-10deg)", fontSize: 22, opacity: 0.11, filter: "grayscale(1) sepia(0.4)" }}
              aria-hidden
            >🐾</span>

            {/* Content */}
            <h2
              className="heading-display relative"
              style={{ fontSize: "clamp(36px, 3.2vw, 52px)" }}
            >
              Готов начать?
            </h2>
            <p className="relative text-sm mt-3 mb-8" style={{ color: "var(--stone)" }}>
              Все файлы бесплатные и открытые.
            </p>
            <div className="relative flex flex-wrap gap-3 justify-center">
              <Link
                href="/solutions"
                className="px-6 py-3 rounded-full bg-[var(--ember)] text-white text-sm font-medium hover:opacity-90 transition-all hover:-translate-y-px"
                style={{ boxShadow: "var(--shadow-btn)" }}
              >
                Открыть каталог
              </Link>
              <Link
                href="/help"
                className="px-6 py-3 rounded-full border text-ink text-sm font-medium hover:border-[var(--stone)] transition-colors"
                style={{ background: "#FFFDF7", borderColor: "var(--sand-2)" }}
              >
                Как помочь без инструментов
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
