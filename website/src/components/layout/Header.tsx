"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { List, X } from "@phosphor-icons/react";
import { useState } from "react";

const nav = [
  { href: "/solutions", label: "Решения" },
  { href: "/help", label: "Как помочь" },
  { href: "/stories", label: "Истории" },
  { href: "/about", label: "О нас" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border-soft bg-paper/95 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 shrink-0"
          onClick={() => setOpen(false)}
        >
          <span className="text-2xl">🐾</span>
          <span className="font-hand text-2xl text-accent">SafePaws</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {nav.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors hover:bg-accent-soft hover:text-accent ${
                pathname === href
                  ? "text-accent bg-accent-soft"
                  : "text-ink-muted"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link
            href="/download"
            className="hidden sm:inline-flex items-center px-4 py-1.5 rounded-lg bg-accent text-white text-sm font-medium hover:bg-[#c4673d] transition-colors"
          >
            Скачать
          </Link>
          <button
            className="md:hidden p-2 rounded-md text-ink-muted hover:bg-accent-soft"
            onClick={() => setOpen((v) => !v)}
            aria-label="Меню"
          >
            {open ? <X size={20} /> : <List size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border-soft bg-paper px-4 pb-4">
          {nav.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`block py-2.5 text-sm font-medium border-b border-border-soft last:border-0 ${
                pathname === href ? "text-accent" : "text-ink"
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/download"
            onClick={() => setOpen(false)}
            className="mt-3 flex items-center justify-center px-4 py-2 rounded-lg bg-accent text-white text-sm font-medium"
          >
            Скачать чертежи
          </Link>
        </div>
      )}
    </header>
  );
}
