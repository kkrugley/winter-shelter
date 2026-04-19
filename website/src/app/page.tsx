import Link from "next/link";
import { Hammer, Heart, BookOpenText, ArrowRight } from "@phosphor-icons/react/dist/ssr";
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
    title: "У меня есть средства",
    desc: "Поддержать проект финансово или материалами.",
    chips: ["любая сумма", "материалы"],
    cta: "Поддержать →",
    href: "/help#support",
  },
  {
    icon: BookOpenText,
    title: "Я хочу узнать больше",
    desc: "Разобраться в проблеме и способах помочь.",
    chips: ["истории", "статистика"],
    cta: "Узнать →",
    href: "/about",
  },
];

const problemStats = [
  { num: "700 тыс.", label: "бездомных животных только в Беларуси" },
  { num: "−25°C", label: "минимальная температура зимой" },
  { num: "80%", label: "кошек погибают первой зимой на улице" },
];

const previewProducts = products.slice(0, 3);

const miniStories = [
  {
    city: "Брест",
    product: "Cozy Shelter",
    text: "Поставили у магазина, 2 кота сразу заселились.",
  },
  {
    city: "Минск",
    product: "Family Shelter",
    text: "Собрали за выходные, теперь здесь живёт 4 кота.",
  },
  {
    city: "Гродно",
    product: "PurrTap",
    text: "Поилка не замерзала при −18°C, коты довольны.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-14 pb-12">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-block font-mono text-xs uppercase tracking-wider text-ink-muted mb-4 border border-border-soft rounded px-2 py-0.5">
              миссия · 1 секция
            </span>
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
                href="/solutions"
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

      {/* 3-PATH FORK */}
      <section className="bg-[#F5F1EB] py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-xs uppercase tracking-wider text-ink-muted">
              развилка
            </span>
            <span className="text-sm text-ink-muted border border-dashed border-ink-muted/40 rounded px-2 py-0.5">
              ← главное: сразу понять, куда идти
            </span>
          </div>
          <h2 className="font-hand text-4xl text-ink mb-8">
            Как ты хочешь помочь?
          </h2>
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
                      className="px-2 py-0.5 rounded-full border border-accent/30 text-xs text-accent"
                    >
                      {c}
                    </span>
                  ))}
                </div>
                <Link
                  href={href}
                  className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
                >
                  {cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM STATS */}
      <section className="py-14 bg-ink text-paper">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <span className="font-mono text-xs uppercase tracking-wider text-paper/40 mb-6 block">
            проблема в цифрах
          </span>
          <div className="grid md:grid-cols-3 gap-8">
            {problemStats.map(({ num, label }) => (
              <div key={label}>
                <div className="font-hand text-5xl text-accent mb-2">{num}</div>
                <p className="text-sm text-paper/70">{label}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link
              href="/about"
              className="inline-flex items-center gap-1 text-sm text-paper/70 hover:text-paper transition-colors"
            >
              Узнать больше <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* SOLUTIONS PREVIEW */}
      <section className="py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-hand text-4xl text-ink">Наши решения</h2>
            <Link
              href="/solutions"
              className="text-sm text-accent hover:underline hidden sm:block"
            >
              Все решения →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {previewProducts.map((p) => (
              <Link
                key={p.slug}
                href={`/solutions/${p.slug}`}
                className="group border border-border-soft rounded-xl overflow-hidden hover:border-accent/40 transition-colors"
              >
                <div className="ph min-h-[150px] rounded-none border-0 border-b border-dashed border-border-soft">
                  {p.name} · рендер
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <strong className="font-hand text-xl text-ink">
                      {p.name}
                    </strong>
                    <StatusChip status={p.status} />
                  </div>
                  <p className="text-sm text-ink-muted">{p.capacity}</p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 text-xs rounded-full border border-border-soft text-ink-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-6 sm:hidden text-center">
            <Link href="/solutions" className="text-sm text-accent hover:underline">
              Все решения →
            </Link>
          </div>
        </div>
      </section>

      {/* MINI STORIES MAP */}
      <section className="py-14 bg-[#F5F1EB]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-hand text-4xl text-ink">Где уже стоят домики</h2>
            <Link
              href="/stories"
              className="text-sm text-accent hover:underline hidden sm:block"
            >
              Все истории →
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="ph min-h-[260px]">карта точек · Leaflet / заглушка</div>
            <div className="space-y-3">
              {miniStories.map(({ city, product, text }) => (
                <div
                  key={city}
                  className="bg-paper border border-border-soft rounded-lg p-4"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs text-ink-muted">
                      📍 {city}
                    </span>
                    <span className="px-2 py-0.5 rounded-full border border-accent/30 text-xs text-accent">
                      {product}
                    </span>
                  </div>
                  <p className="text-sm text-ink">{text}</p>
                </div>
              ))}
              <Link
                href="/stories/add"
                className="block text-center py-3 rounded-lg border border-dashed border-accent/40 text-sm text-accent hover:bg-accent-soft transition-colors"
              >
                + Добавить свою историю
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function StatusChip({ status }: { status: string }) {
  const labels: Record<string, string> = {
    available: "готов",
    new: "NEW",
    "coming-soon": "скоро",
    prototype: "прототип",
  };
  const colors: Record<string, string> = {
    available: "border-green-300 text-green-700 bg-green-50",
    new: "border-accent/40 text-accent bg-accent-soft",
    "coming-soon": "border-border-soft text-ink-muted",
    prototype: "border-border-soft text-ink-muted",
  };
  return (
    <span className={`px-2 py-0.5 rounded-full border text-xs ${colors[status] ?? colors["coming-soon"]}`}>
      {labels[status] ?? status}
    </span>
  );
}
