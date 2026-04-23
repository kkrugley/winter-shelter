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
        <div className="bg-[#F5F1EB] rounded-2xl p-8 mb-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(({ value, label }) => (
              <div key={label}>
                <span className="font-mono text-xs text-ink-muted block mb-1">{label}</span>
                <div className="font-hand text-4xl text-ink">{value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Story of project */}
        <div className="mb-14">
          <h2 className="font-hand text-4xl text-ink mb-8">Как это началось</h2>
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div className="space-y-4 text-sm text-ink-muted leading-relaxed">
              <p>В 2023-м Паша сделал один домик для кошек у подъезда. Потом второй. Потом соседи попросили чертёж.</p>
              <p>Так и появился SafePaws — чтобы чертёж, который уже есть, мог скачать и сделать каждый.</p>
              <p>Сегодня в проекте 2 модели домиков, поилка PurrTap, и в планах кормушка EDC.</p>
            </div>
            {/* Author card */}
            <div className="bg-[#F5F1EB] border border-border-soft rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-accent-soft border-2 border-accent/30 flex items-center justify-center font-hand text-2xl text-accent">П</div>
                <div>
                  <strong className="text-sm text-ink block">Паша · автор проекта</strong>
                  <p className="text-xs text-ink-muted">Брест · делаю это в свободное время</p>
                </div>
              </div>
              <p className="font-hand text-xl text-ink mb-4">
                «Привет, я Паша. Если хочется помочь — пиши в Telegram.»
              </p>
              <div className="flex gap-2">
                <a
                  href="https://t.me/safepaws"
                  className="px-4 py-2 rounded-lg border border-border-soft text-sm text-ink hover:border-accent/40 hover:text-accent transition-colors"
                >
                  Telegram
                </a>
                <a
                  href="mailto:kkrugley@proton.me"
                  className="px-4 py-2 rounded-lg border border-border-soft text-sm text-ink-muted hover:border-accent/40 transition-colors"
                >
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-14">
          <h2 className="font-hand text-4xl text-ink mb-8">Шаги проекта</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {timeline.map(({ year, title, desc }) => (
              <div key={year} className="border border-border-soft rounded-xl p-5">
                <span className="font-mono text-xs text-ink-muted block mb-3">{year}</span>
                <strong className="font-hand text-xl text-ink block mb-2">{title}</strong>
                <p className="text-xs text-ink-muted">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Partners */}
        <div className="mb-14">
          <h2 className="font-hand text-4xl text-ink mb-8">Кто помогает</h2>
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
        <div className="bg-accent-soft border border-accent/20 rounded-2xl p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-hand text-4xl text-ink mb-3">Связаться</h2>
              <p className="text-sm text-ink-muted">
                Вопрос, предложение, партнёрство — пиши любым способом.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <a
                href="https://t.me/safepaws"
                className="flex items-center justify-center px-5 py-2.5 rounded-lg border border-border-soft text-sm text-ink hover:border-accent/40 hover:text-accent transition-colors"
              >
                Telegram · @safepaws
              </a>
              <a
                href="mailto:kkrugley@proton.me"
                className="flex items-center justify-center px-5 py-2.5 rounded-lg border border-border-soft text-sm text-ink hover:border-accent/40 hover:text-accent transition-colors"
              >
                Email · kkrugley@proton.me
              </a>
              <a
                href="https://github.com/kkrugley/winter-shelter"
                className="flex items-center justify-center px-5 py-2.5 rounded-lg border border-border-soft text-sm text-ink hover:border-accent/40 hover:text-accent transition-colors"
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
