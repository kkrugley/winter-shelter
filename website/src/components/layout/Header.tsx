"use client";

import Image from "next/image";
import { usePathname } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import { List, X } from "@phosphor-icons/react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { LangSwitcher } from "./LangSwitcher";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const t = useTranslations("Nav");

  const nav = [
    { href: "/solutions", label: t("solutions") },
    { href: "/help", label: t("help") },
    { href: "/stories", label: t("stories") },
    { href: "/about", label: t("about") },
  ];

  return (
    <header
      className="sticky top-0 z-50 border-b border-[var(--sand)]"
      style={{ backdropFilter: "saturate(1.2) blur(10px)", background: "color-mix(in oklab, var(--cream) 84%, transparent)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 shrink-0"
          onClick={() => setOpen(false)}
        >
          <Image src="/images/favicon/favicon.svg" alt="" width={28} height={28} aria-hidden unoptimized />
          <span className="heading-logo">SafePaws</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {nav.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors hover:bg-[var(--ember-pale)] hover:text-[var(--charcoal)] ${
                pathname === href
                  ? "text-[var(--charcoal)] bg-[var(--ember-pale)]"
                  : "text-[var(--stone)]"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <LangSwitcher />
          <Link
            href="/download"
            className="hidden sm:inline-flex items-center px-4 py-1.5 rounded-full bg-[var(--ember)] text-white text-sm font-medium transition-all hover:opacity-90 hover:-translate-y-px"
            style={{ boxShadow: "var(--shadow-btn)" }}
          >
            {t("download")}
          </Link>
          <button
            className="md:hidden p-2 rounded-full text-[var(--stone)] hover:bg-[var(--ember-pale)]"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t("menuClose") : t("menuOpen")}
          >
            {open ? <X size={20} /> : <List size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-[var(--sand)] bg-[var(--cream)] px-4 pb-4">
          {nav.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`block py-2.5 text-sm font-medium border-b border-[var(--sand)] last:border-0 ${
                pathname === href ? "text-[var(--ember)]" : "text-ink"
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/download"
            onClick={() => setOpen(false)}
            className="mt-3 flex items-center justify-center px-4 py-2 rounded-full bg-[var(--ember)] text-white text-sm font-medium hover:opacity-90 transition-all"
          >
            {t("downloadFull")}
          </Link>
        </div>
      )}
    </header>
  );
}
