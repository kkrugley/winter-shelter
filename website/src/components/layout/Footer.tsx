import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations("Footer");

  const cols = [
    {
      title: t("colSolutions"),
      links: [
        { href: "/solutions/cozy-shelter", label: "Cozy Shelter" },
        { href: "/solutions/family-shelter", label: "Family Shelter" },
        { href: "/solutions/purrtap", label: "PurrTap" },
        { href: "/solutions", label: t("allSolutions") },
      ],
    },
    {
      title: t("colParticipation"),
      links: [
        { href: "/help?card=build", label: t("build") },
        { href: "/help?card=install", label: t("install") },
        { href: "/help?card=share", label: t("share") },
        { href: "/help", label: t("allWays") },
      ],
    },
    {
      title: t("colContact"),
      links: [
        { href: "mailto:kkrugley@proton.me", label: "Email" },
        { href: "https://t.me/safepaws_help", label: "Telegram" },
        { href: "/about", label: t("aboutProject") },
        { href: "https://github.com/kkrugley/safepaws", label: t("githubProject") },
      ],
    },
  ];

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
              {t("tagline")}
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
            {t("ctaText")}
          </p>
          <Link
            href="/download"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[var(--ember)] text-white text-sm font-medium hover:opacity-90 transition-all hover:-translate-y-px"
            style={{ boxShadow: "var(--shadow-btn)" }}
          >
            {t("ctaButton")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
