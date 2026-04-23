import Link from "next/link";
import { Hammer, Heart, BookOpenText } from "@phosphor-icons/react/dist/ssr";
import { products } from "@/data/products";

const stats = [
  { value: "1 200+", label: "скачиваний" },
  { value: "47", label: "домиков в мире" },
  { value: "4", label: "языка" },
];

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

const quizSteps = [
  { step: "шаг 1", q: "Что у тебя есть?", opts: "руки · время · средства · голос" },
  { step: "шаг 2", q: "Сколько животных рядом?", opts: "1–2 · 4–5 · колония · не знаю" },
  { step: "шаг 3", q: "Когда хочешь начать?", opts: "на выходных · 1–2 недели · потом" },
];

const previewProducts = products.slice(0, 4);

const steps = [
  { n: 1, title: "Скачай чертёж", desc: "Выбери модель и материал — получи DXF и PDF." },
  { n: 2, title: "Собери", desc: "Сам или на ближайшем хакспейсе / CNC." },
  { n: 3, title: "Установи и расскажи", desc: "Помести во двор и поделись историей." },
];

const miniStories = [
  { city: "Брест", text: "Паша и соседи · ноябрь 2024" },
  { city: "Гродно", text: "семья Козловских · январь 2025" },
  { city: "Минск", text: "волонтёры · февраль 2025" },
];

const statusLabel: Record<string, string> = {
  available: "готов",
  new: "NEW",
  "coming-soon": "скоро",
  prototype: "прототип",
};
const statusColor: Record<string, string> = {
  available: "border-green-300 text-green-700 bg-green-50",
  new: "border-accent/40 text-accent bg-accent-soft",
  "coming-soon": "border-border-soft text-ink-muted",
  prototype: "border-border-soft text-ink-muted",
};

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-14 pb-12">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="font-hand text-5xl md:text-6xl leading-tight text-ink mb-5">
              Зима приходит.{" "}
              <span
                style={{
                  textDecoration: "underline",
                  textDecorationStyle: "wavy",
                  textDecorationColor: "var(--sp-accent)",
                  textUnderlineOffset: "6px",
                }}
              >
                Им некуда спрятаться.
              </span>
            </h1>
            <p className="text-base md:text-lg text-ink-muted mb-8 max-w-[440px] leading-relaxed">
              SafePaws — открытые чертежи домиков и поилок для бездомных кошек.
              Скачай, собери, установи — или помоги иначе.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/help"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-white text-sm font-medium hover:bg-[#c4673d] transition-colors"
              >
                Начать помогать →
              </Link>
              <Link
                href="/solutions"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border-soft text-ink text-sm font-medium hover:bg-accent-soft transition-colors"
              >
                Посмотреть каталог
              </Link>
            </div>
            <div className="flex flex-wrap gap-3 mt-5">
              {stats.map((s) => (
                <span
                  key={s.label}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-accent/30 bg-accent-soft text-sm text-ink-muted"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
                  {s.value} {s.label}
                </span>
              ))}
            </div>
          </div>
          <div className="ph min-h-[300px] md:min-h-[360px]">
            фото котов зимой / hero · 16:10
          </div>
        </div>
      </section>

      {/* 3-PATH FORK + QUIZ */}
      <section className="bg-[#F5F1EB] py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="font-hand text-4xl text-ink mb-8">Как ты хочешь помочь?</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {paths.map(({ icon: Icon, title, desc, chips, cta, href }) => (
              <div
                key={href}
                className="bg-accent-soft border border-accent/20 rounded-xl p-6 flex flex-col gap-3"
              >
                <Icon size={32} weight="duotone" className="text-accent" />
                <h3 className="font-hand text-2xl text-ink">{title}</h3>
                <p className="text-sm text-ink-muted">{desc}</p>
                <div className="flex flex-wrap gap-2">
                  {chips.map((c) => (
                    <span
                      key={c}
                      className="px-2 py-0.5 rounded-full border border-accent/40 text-xs text-accent"
                    >
                      {c}
                    </span>
                  ))}
                </div>
                <Link
                  href={href}
                  className="mt-auto inline-block px-4 py-1.5 rounded-lg border border-accent/30 text-sm font-medium text-accent hover:bg-accent hover:text-white transition-colors"
                >
                  {cta}
                </Link>
              </div>
            ))}
          </div>

          {/* QUIZ ENTRY */}
          <div className="mt-5 rounded-xl border-2 border-dashed border-accent/40 bg-accent-soft/30 p-6">
            <div className="flex flex-col lg:flex-row lg:items-center gap-5">
              <div className="flex-1">
                <span className="inline-block px-2 py-0.5 rounded-full border border-accent/40 bg-accent-soft text-xs text-accent mb-2">
                  опросник · 30 сек
                </span>
                <h3 className="font-hand text-2xl text-ink mb-1">Не уверен, какой путь твой?</h3>
                <p className="text-sm text-ink-muted">
                  3 коротких вопроса — подскажем, какое решение ближе именно тебе.
                </p>
              </div>
              <div className="flex gap-3 shrink-0">
                <Link
                  href="/help"
                  className="px-5 py-2.5 rounded-lg bg-accent text-white text-sm font-medium hover:bg-[#c4673d] transition-colors"
                >
                  Подобрать за 30 сек →
                </Link>
                <button className="px-4 py-2.5 rounded-lg border border-border-soft text-ink-muted text-sm hover:bg-paper transition-colors">
                  позже
                </button>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-3 items-stretch">
              {quizSteps.map(({ step, q, opts }) => (
                <div key={step} className="bg-paper rounded-lg p-3 border border-border-soft">
                  <span className="inline-block px-2 py-0.5 rounded-full border border-border-soft text-xs text-ink-muted mb-2">{step}</span>
                  <p className="text-sm font-medium text-ink mb-1">{q}</p>
                  <p className="text-xs text-ink-muted">{opts}</p>
                </div>
              ))}
              <div className="bg-accent-soft rounded-lg p-3 border border-accent/20">
                <span className="inline-block px-2 py-0.5 rounded-full border border-accent/40 text-xs text-accent mb-2">результат</span>
                <p className="text-sm font-medium text-ink mb-1">Рекомендация + файл</p>
                <p className="text-xs text-ink-muted">напр. Cozy 6 мм + истории похожих</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATALOG PREVIEW */}
      <section className="py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-hand text-4xl text-ink">Каталог решений</h2>
            <Link href="/solutions" className="font-hand text-xl text-accent hover:underline hidden sm:block">
              все решения →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {previewProducts.map((p) => (
              <div
                key={p.slug}
                className={`border border-border-soft rounded-xl overflow-hidden flex flex-col ${p.status === "coming-soon" ? "opacity-70" : ""}`}
              >
                <div className={`ph min-h-[130px] rounded-none border-0 border-b border-dashed border-border-soft ${p.status === "new" ? "bg-accent-soft/60" : ""}`}>
                  {p.name} · рендер
                </div>
                <div className="p-4 flex flex-col flex-1 gap-2">
                  <div className="flex items-center justify-between">
                    <strong className="font-hand text-lg text-ink">{p.name}</strong>
                    <span className={`px-2 py-0.5 rounded-full border text-xs ${statusColor[p.status] ?? statusColor["coming-soon"]}`}>
                      {statusLabel[p.status] ?? p.status}
                    </span>
                  </div>
                  <p className="text-xs text-ink-muted">{p.capacity}</p>
                  <div className="mt-auto pt-2 flex gap-2">
                    <Link
                      href={`/solutions/${p.slug}`}
                      className="flex-1 text-center px-3 py-1.5 rounded-lg border border-border-soft text-xs text-ink hover:border-accent/40 hover:text-accent transition-colors"
                    >
                      Детали →
                    </Link>
                    {(p.status === "available" || p.status === "new") && (
                      <Link
                        href="/download"
                        className="flex-1 text-center px-3 py-1.5 rounded-lg bg-accent text-white text-xs hover:bg-[#c4673d] transition-colors"
                      >
                        Скачать
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 sm:hidden text-center">
            <Link href="/solutions" className="text-sm text-accent hover:underline">Все решения →</Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-14 bg-[#F5F1EB]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="font-hand text-4xl text-ink mb-8">Как это работает</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {steps.map(({ n, title, desc }) => (
              <div key={n} className="bg-paper border border-border-soft rounded-xl p-6 flex gap-4 items-start">
                <span className="w-9 h-9 rounded-full border-2 border-accent text-accent font-mono text-sm flex items-center justify-center shrink-0 font-medium">
                  {n}
                </span>
                <div>
                  <strong className="text-sm text-ink block mb-1">{title}</strong>
                  <p className="text-sm text-ink-muted">{desc}</p>
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
            <h2 className="font-hand text-4xl text-ink">Истории</h2>
            <Link href="/stories" className="font-hand text-xl text-accent hover:underline hidden sm:block">
              все истории →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {miniStories.map(({ city, text }) => (
              <div key={city} className="border border-border-soft rounded-xl overflow-hidden">
                <div className="ph min-h-[160px] rounded-none border-0 border-b border-dashed border-border-soft">
                  {city} · фото
                </div>
                <div className="p-4">
                  <strong className="font-hand text-xl text-ink block mb-1">{city}, 2 домика</strong>
                  <p className="text-xs text-ink-muted">{text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 sm:hidden text-center">
            <Link href="/stories" className="text-sm text-accent hover:underline">Все истории →</Link>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-14 bg-accent-soft">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-hand text-4xl text-ink mb-3">Готов начать?</h2>
          <p className="text-sm text-ink-muted mb-8">Все файлы бесплатные и открытые.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/solutions"
              className="px-6 py-3 rounded-lg bg-accent text-white text-sm font-medium hover:bg-[#c4673d] transition-colors"
            >
              Открыть каталог
            </Link>
            <Link
              href="/help"
              className="px-6 py-3 rounded-lg border border-accent/30 text-ink text-sm font-medium hover:bg-paper transition-colors"
            >
              Как помочь без инструментов
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
