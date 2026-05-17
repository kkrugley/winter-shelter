'use client'

import Link from "next/link";
import { useState } from "react";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";

interface CtaLink {
  label: string;
  href: string;
  primary?: boolean;
  action?: 'link' | 'copy';
}

interface CtaBlockProps {
  heading: ReactNode;
  body?: string;
  links: CtaLink[];
}

const primaryCls = "px-6 py-3 rounded-full bg-[var(--ember)] text-white text-sm font-medium hover:opacity-90 transition-all hover:-translate-y-px";
const primaryStyle = { boxShadow: "var(--shadow-btn)" };
const ghostCls   = "px-6 py-3 rounded-full border text-ink text-sm font-medium hover:border-[var(--stone)] transition-colors";
const ghostStyle = { background: "#FFFDF7", borderColor: "var(--sand-2)" };

export function CtaBlock({ heading, body, links }: CtaBlockProps) {
  const t = useTranslations("Common");
  const [copiedHref, setCopiedHref] = useState<string | null>(null);

  function handleCopy(href: string) {
    const url = window.location.origin + href;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedHref(href);
      setTimeout(() => setCopiedHref(null), 2000);
    });
  }

  return (
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
          {/* Radial depth */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 15% 75%, rgba(232,113,42,.09), transparent 38%), radial-gradient(circle at 85% 25%, rgba(61,107,79,.06), transparent 38%)",
            }}
          />

          {/* Paw prints */}
          <span className="absolute pointer-events-none select-none" style={{ top: "18%",    left: "7%",   transform: "rotate(-20deg)", fontSize: 34, opacity: 0.13, filter: "grayscale(1) sepia(0.4)" }} aria-hidden>🐾</span>
          <span className="absolute pointer-events-none select-none" style={{ bottom: "20%", right: "10%", transform: "rotate(15deg)",  fontSize: 34, opacity: 0.13, filter: "grayscale(1) sepia(0.4)" }} aria-hidden>🐾</span>
          <span className="absolute pointer-events-none select-none" style={{ top: "55%",    left: "17%",  transform: "rotate(8deg)",   fontSize: 22, opacity: 0.11, filter: "grayscale(1) sepia(0.4)" }} aria-hidden>🐾</span>
          <span className="absolute pointer-events-none select-none" style={{ top: "22%",    right: "16%", transform: "rotate(-10deg)", fontSize: 22, opacity: 0.11, filter: "grayscale(1) sepia(0.4)" }} aria-hidden>🐾</span>

          {/* Content */}
          <h2 className="heading-display relative" style={{ fontSize: "clamp(36px, 3.2vw, 52px)" }}>
            {heading}
          </h2>
          {body && (
            <p className="relative text-sm mt-3 mb-8" style={{ color: "var(--stone)" }}>
              {body}
            </p>
          )}
          <div className="relative flex flex-wrap gap-3 justify-center" style={{ marginTop: body ? 0 : 32 }}>
            {links.map(({ label, href, primary, action = 'link' }) => {
              const cls   = primary ? primaryCls   : ghostCls;
              const style = primary ? primaryStyle : ghostStyle;

              if (action === 'copy') {
                const copied = copiedHref === href;
                return (
                  <button key={href} onClick={() => handleCopy(href)} className={cls} style={style}>
                    {copied ? t('copiedLink') : label}
                  </button>
                );
              }

              return (
                <Link key={href} href={href} className={cls} style={style}>
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
