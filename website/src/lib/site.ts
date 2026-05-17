export const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://safepaws.ru";

export const DEFAULT_LOCALE = "ru";

export function siteUrl(path: string, locale: string): string {
  const prefix = locale === DEFAULT_LOCALE ? "" : `/${locale}`;
  return `${BASE_URL}${prefix}${path}`;
}
