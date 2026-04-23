import Link from "next/link";

const cols = [
  {
    title: "Решения",
    links: [
      { href: "/solutions/cozy-shelter", label: "Cozy Shelter" },
      { href: "/solutions/family-shelter", label: "Family Shelter" },
      { href: "/solutions/purrtap", label: "PurrTap" },
      { href: "/solutions", label: "Все решения →" },
    ],
  },
  {
    title: "Участие",
    links: [
      { href: "/help#build", label: "Собрать домик" },
      { href: "/help#install", label: "Поставить поилку" },
      { href: "/help#share", label: "Рассказать" },
      { href: "/help", label: "Все способы →" },
    ],
  },
  {
    title: "Связь",
    links: [
      { href: "https://github.com/kkrugley/safepaws", label: "GitHub" },
      { href: "https://t.me/safepaws", label: "Telegram" },
      { href: "mailto:kkrugley@proton.me", label: "Email" },
      { href: "/about", label: "О проекте" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border-soft bg-[#F5F1EB] mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🐾</span>
              <span className="font-hand text-2xl text-accent">SafePaws</span>
            </div>
            <p className="text-sm text-ink-muted leading-relaxed">
              Открытый проект: чертежи и решения для уличных животных.
            </p>
            <p className="text-xs text-ink-muted mt-3">CC BY 4.0 · 2023–2026</p>
          </div>

          {/* Nav columns */}
          {cols.map(({ title, links }) => (
            <div key={title}>
              <div className="font-mono text-xs uppercase tracking-wider text-ink-muted mb-3">
                {title}
              </div>
              <ul className="space-y-2">
                {links.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-ink-muted hover:text-accent transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 pt-6 border-t border-border-soft flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-ink-muted">
            Каждый домик — это шанс на жизнь.
          </p>
          <Link
            href="/download"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-accent text-white text-sm font-medium hover:bg-[#c4673d] transition-colors"
          >
            Скачать первый чертёж →
          </Link>
        </div>
      </div>
    </footer>
  );
}
