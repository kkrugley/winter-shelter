import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

const stats = [
  { value: "1 200+", label: "скачиваний" },
  { value: "47", label: "установленных" },
  { value: "4", label: "страны" },
  { value: "4", label: "языка" },
];

const timeline = [
  {
    year: "2023",
    title: "Первый домик",
    desc: "Паша сделал один домик для кошек у подъезда. Потом второй. Потом соседи попросили чертёж.",
  },
  {
    year: "2024 зима",
    title: "SafePaws запущен",
    desc: "Появился сайт, два чертежа стали доступны всем. Первые скачивания из 4 стран.",
  },
  {
    year: "2024 весна",
    title: "PurrTap",
    desc: "Добавлена поилка PurrTap — простой способ помочь без инструментов.",
  },
  {
    year: "2025",
    title: "Расширение",
    desc: "Более 1200 скачиваний, 47 подтверждённых установок. В разработке: EDC Feeder, Colony Kit.",
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* Breadcrumb */}
      <div className="font-mono text-xs text-ink-muted mb-8">
        <Link href="/" className="hover:text-accent">главная</Link>
        {" / "}
        <span className="text-accent">о проекте</span>
      </div>

      {/* Mission hero */}
      <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-ink-muted block mb-4">
            миссия
          </span>
          <h1 className="font-hand text-5xl md:text-6xl text-ink mb-5">
            Добро должно быть{" "}
            <span
              style={{
                textDecoration: "underline",
                textDecorationStyle: "wavy",
                textDecorationColor: "var(--sp-accent)",
                textUnderlineOffset: "6px",
              }}
            >
              простым.
            </span>
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
        <div className="ph min-h-[280px]">фото автора / команды</div>
      </div>

      {/* Stats */}
      <div className="bg-[#F5F1EB] rounded-2xl p-8 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(({ value, label }) => (
            <div key={label}>
              <span className="font-mono text-xs text-ink-muted block mb-1">
                {label}
              </span>
              <div className="font-hand text-4xl text-ink">{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Story */}
      <div className="mb-16">
        <span className="font-mono text-xs uppercase tracking-wider text-ink-muted block mb-4">
          история
        </span>
        <h2 className="font-hand text-4xl text-ink mb-8">Как это началось</h2>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-4 text-sm text-ink-muted leading-relaxed">
            <p>
              В 2023-м Паша сделал один домик для кошек у подъезда. Потом
              второй. Потом соседи попросили чертёж.
            </p>
            <p>
              Так и появился SafePaws — чтобы чертёж, который уже есть, мог
              скачать и сделать каждый.
            </p>
            <p>
              Сегодня в проекте 2 модели домиков, поилка PurrTap, и в планах
              кормушка EDC.
            </p>
            <p>
              Проект остаётся открытым и бесплатным. Все чертежи — под
              лицензией CC BY 4.0.
            </p>
          </div>
          <div className="ph min-h-[240px]">фото домиков / работы</div>
        </div>
      </div>

      {/* Timeline */}
      <div className="mb-16">
        <span className="font-mono text-xs uppercase tracking-wider text-ink-muted block mb-6">
          хронология
        </span>
        <div className="space-y-0">
          {timeline.map(({ year, title, desc }, i) => (
            <div key={year} className="flex gap-5">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-accent-soft border-2 border-accent/30 flex items-center justify-center shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                </div>
                {i < timeline.length - 1 && (
                  <div className="w-0.5 flex-1 bg-border-soft my-1" />
                )}
              </div>
              <div className="pb-8">
                <span className="font-mono text-xs text-ink-muted">{year}</span>
                <h3 className="font-hand text-2xl text-ink mt-1 mb-2">{title}</h3>
                <p className="text-sm text-ink-muted">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-accent-soft border border-accent/20 rounded-2xl p-8 text-center">
        <h2 className="font-hand text-4xl text-ink mb-3">
          Присоединиться к проекту
        </h2>
        <p className="text-sm text-ink-muted mb-6">
          Неважно, что у тебя есть — руки, время, голос или средства.
          Каждый вклад важен.
        </p>
        <Link
          href="/help"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-white text-sm font-medium hover:bg-[#c4673d] transition-colors"
        >
          Как помочь <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
