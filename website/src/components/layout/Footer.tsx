import Image from "next/image";
import Link from "next/link";
import { isExternalHref } from "@/lib/utils";

const cols = [
  {
    title: "Решения",
    links: [
      { href: "/solutions?type=shelter", label: "Укрытия" },
      { href: "/solutions?type=hydration", label: "Поилки" },
      { href: "/solutions?type=feeding", label: "Кормушки" },
      { href: "/solutions", label: "Все решения →" },
    ],
  },
  {
    title: "Участие",
    links: [
      { href: "/help?card=share", label: "Рассказать" },
      { href: "/help?card=build", label: "Собрать домик" },
      { href: "/help?card=install", label: "Поставить поилку" },
      { href: "/help", label: "Все способы →" },
    ],
  },
  {
    title: "Связь",
    links: [
      { href: "?mail-form=open", label: "Email" },
      { href: "https://t.me/safepaws_help", label: "Telegram" },
      { href: "/about", label: "О проекте" },
      { href: "/legal", label: "Правовая информация" },
    ],
  },
];

export function Footer() {

  return (
    <footer className="border-t border-[var(--sand)] mt-auto" style={{ background: "#F7F1E5" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <Image src="/images/favicon/favicon.svg" alt="" width={24} height={24} aria-hidden unoptimized />
              <span className="heading-logo">SafePaws</span>
            </div>
            <p className="text-sm text-[var(--stone)] leading-relaxed">
              Решения для помощи уличным животным
            </p>
            <p className="text-xs text-[var(--stone)] mt-3">CC BY 4.0 · 2025–{new Date().getFullYear()}</p>
          </div>

          {/* Nav columns */}
          {cols.map(({ title, links }) => (
            <div key={title}>
              <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--stone)] mb-3">
                {title}
              </div>
              <ul className="space-y-2">
                {links.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      target={isExternalHref(href) ? "_blank" : undefined}
                      rel={isExternalHref(href) ? "noopener noreferrer" : undefined}
                      className="text-sm text-[var(--stone)] hover:text-[var(--ember)] transition-colors"
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
        <div className="mt-10 pt-6 border-t border-[var(--sand)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[var(--stone)]">
            Каждый домик — это шанс на жизнь.
          </p>
          <Link
            href="/download"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[var(--ember)] text-white text-sm font-medium hover:opacity-90 transition-all hover:-translate-y-px"
            style={{ boxShadow: "var(--shadow-btn)" }}
          >
            Скачать первый чертёж →
          </Link>
        </div>
      </div>
    </footer>
  );
}
