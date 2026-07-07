import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** True for absolute http(s) URLs — used to decide whether a link should open in a new tab. */
export function isExternalHref(href: string): boolean {
  return /^https?:\/\//.test(href)
}

/** "2024-11-01" → "11.24". Returns "" for null or unparseable strings. */
export function formatInstalledDate(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  const yy = String(d.getUTCFullYear()).slice(2);
  return `${mm}.${yy}`;
}

/** "2024-11-01" → "Ноябрь 2024" (locale-aware). Returns "" for null or unparseable strings. */
export function formatInstalledDateLong(iso: string | null, locale = "ru"): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat(locale, { month: "long", year: "numeric", timeZone: "UTC" }).format(d);
}
