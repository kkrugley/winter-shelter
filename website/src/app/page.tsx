import type { Metadata } from "next";
import React from "react";
import { pageAlternates } from "@/lib/metadata";
import Image from "next/image";
import Link from "next/link";
import { HammerIcon, HeartIcon, BookOpenTextIcon, ArrowLineDownIcon, PencilSimpleIcon, HouseLineIcon } from "@phosphor-icons/react/dist/ssr";
import { products } from "@/data/products";
import { getProductContent } from "@/data/productContent";
import { ProductCardImage } from "@/components/ui/ProductCardImage";
import { StoryCard } from "@/components/ui/StoryCard";
import { getPublishedStories } from "@/lib/stories";
import { QuizSection } from "@/components/ui/QuizSection";
import { CtaBlock } from "@/components/ui/CtaBlock";

const PATH_HREFS = ["/solutions", "/help", "/stories"];
const PATH_ICONS = [HammerIcon, HeartIcon, BookOpenTextIcon];
const STEP_ICONS = [ArrowLineDownIcon, PencilSimpleIcon, HouseLineIcon];

const previewProducts = products.slice(0, 4);

const HERO_RING_GAP = 3;
const HERO_RING_WIDTH = 3;
const HERO_TILT = 2;

const PATHS = [
  { title: "У меня есть инструмент", desc: "Хочу собрать домик или одно из других устройств!", chips: ["ЧПУ-станок", "3Д принтер"], cta: "Выбрать чертёж →" },
  { title: "Хочу поддержать", desc: "Хочу рассказать о проекте или поддержать финансово.", chips: ["Поделиться", "Поддержать"], cta: "Варианты →" },
  { title: "Заинтересовался", desc: "Хочу узнать о проекте больше и как я могу помочь.", chips: ["Истории", "О Проекте"], cta: "Истории людей →" },
];

const STEPS = [
  { title: "Скачай", desc: "Выберите нужный продукт и загрузите соответствующие файлы: DXF — для лазерной резки, STL — для 3Д-печати" },
  { title: "Собери", desc: "Изготовьте детали своими силами или в ближайшей мастерской. Сборка максимально проста — справится каждый!" },
  { title: "Установи", desc: "Установите домики в подходящем месте и поделитесь своей историей!" },
];

export const metadata: Metadata = {
  alternates: pageAlternates("/"),
};

export default async function HomePage() {
  const allStories = await getPublishedStories().catch(() => []);
  // eslint-disable-next-line react-hooks/purity -- Server Component: runs once on server, Math.random is safe here
  const miniStories = allStories.filter((s) => s.photo_url).sort(() => Math.random() - 0.5).slice(0, 3);

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
              {"SafePaws — бесплатные чертежи домиков и поилок для бездомных кошек.\nСкачай, собери, установи — или помоги иначе.".split("\n").map((line, i) => (
                <span key={i}>{line}{i === 0 && <br />}</span>
              ))}
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
          <div
            className="hero-card overflow-hidden rounded-2xl"
            style={{
              ["--hero-tilt-base" as string]: `${HERO_TILT}deg`,
              boxShadow: "var(--shadow-lift)",
              outline: `${HERO_RING_WIDTH}px solid var(--ember)`,
              outlineOffset: `${HERO_RING_GAP}px`,
            }}
          >
            <Image
              src="/images/general/hero-1.avif"
              alt="Бездомные кошки зимой"
              width={1376}
              height={768}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
      </section>

      {/* 3-PATH FORK + QUIZ */}
      <section className="py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="heading-section mb-8">Как ты хочешь помочь?</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {PATHS.map(({ title, desc, chips, cta }, i) => {
              const Icon = PATH_ICONS[i];
              const href = PATH_HREFS[i];
              return (
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
                    prefetch={href === "/stories" ? false : undefined}
                    className="relative z-10 mt-auto inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
                    style={{ color: "var(--ember-accessible)", paddingTop: 8 }}
                  >
                    {cta}
                  </Link>
                </div>
              );
            })}
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
            {previewProducts.map((p) => {
              const pT = getProductContent(p.slug)!;
              const badge = p.status === "available" ? pT.capacity : "В разработке!";
              return (
                <div
                  key={p.slug}
                  className={`relative border rounded-[16px] overflow-hidden flex flex-col transition-all hover:-translate-y-0.5 ${p.status === "coming-soon" ? "opacity-70" : ""}`}
                  style={{ borderColor: "var(--sand)", background: "var(--cream)", boxShadow: "var(--shadow-pale)" }}
                >
                  <Link
                    href={`/solutions/${p.slug}`}
                    aria-label={p.name}
                    className="absolute inset-0 z-[1]"
                  />
                  <ProductCardImage
                    slug={p.slug}
                    image={p.images[0]}
                    alt={p.name}
                    badge={badge}
                    className="aspect-[5/4] border-b border-dashed"
                    style={{ borderColor: "var(--sand-2)" }}
                  />
                  <div className="p-4 flex flex-col flex-1 gap-2">
                    <div className="relative z-[2] flex flex-col gap-2">
                      <strong className="heading-card text-lg">{p.name}</strong>
                      <p className="text-xs" style={{ color: "var(--stone)" }}>{pT.subtitle}</p>
                    </div>
                    <div className="relative z-[2] mt-auto pt-2">
                      <Link
                        href={`/solutions/${p.slug}`}
                        aria-label={`${p.status === "coming-soon" ? "Узнать →" : p.category === "hydration" ? "Как установить →" : "Детали →"} ${p.name}`}
                        className="inline-flex items-center gap-1 text-xs font-medium transition-colors hover:underline"
                        style={{ color: "var(--ember)" }}
                      >
                        {p.status === "coming-soon"
                          ? "Узнать →"
                          : p.category === "hydration"
                          ? "Как установить →"
                          : "Детали →"}
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 sm:hidden text-center">
            <Link href="/solutions" className="link-script text-xl hover:underline">Все решения →</Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="heading-section mb-8">Как это работает?</h2>

          <div
            className="hidden md:grid items-stretch mt-2"
            style={{ gridTemplateColumns: "1fr 44px 1fr 44px 1fr", gap: 0 }}
          >
            {STEPS.map(({ title, desc }, i) => {
              const Icon = STEP_ICONS[i];
              const n = i + 1;
              return (
                <React.Fragment key={n}>
                  <div
                    className="relative flex flex-col gap-3 rounded-[16px] border p-6"
                    style={{ background: "var(--card-bg)", borderColor: "var(--sand)", boxShadow: "var(--shadow-card)", minHeight: 200 }}
                  >
                    <div className="flex items-center gap-3.5">
                      <span
                        className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 font-hand text-lg"
                        style={{ background: "var(--ember)", color: "#FFF6EC", letterSpacing: "-0.01em" }}
                      >
                        {n}
                      </span>
                      <strong className="heading-card leading-tight">{title}</strong>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--stone)" }}>{desc}</p>
                    <div className="absolute bottom-4 right-4" style={{ color: "var(--forest-mid)", opacity: 0.55 }}>
                      <Icon size={40} weight="light" />
                    </div>
                  </div>
                  {i < STEPS.length - 1 && (
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
              );
            })}
          </div>

          <div className="flex flex-col gap-4 md:hidden">
            {STEPS.map(({ title, desc }, i) => {
              const Icon = STEP_ICONS[i];
              const n = i + 1;
              return (
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
              );
            })}
          </div>
        </div>
      </section>

      {/* STORIES STRIP */}
      <section className="py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="heading-section">Истории</h2>
            <Link href="/stories" prefetch={false} className="link-script hidden sm:block hover:underline">
              все истории →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {miniStories.map((s) => (
              <StoryCard key={s.id} {...s} />
            ))}
          </div>
          <div className="mt-4 sm:hidden text-center">
            <Link href="/stories" prefetch={false} className="link-script text-xl hover:underline">Все истории →</Link>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <CtaBlock
        heading="Готовы начать?"
        body="Все файлы бесплатные и открытые."
        links={[
          { label: "Открыть каталог", href: "/solutions", primary: true },
          { label: "Как помочь без инструментов", href: "/help" },
        ]}
      />
    </>
  );
}
