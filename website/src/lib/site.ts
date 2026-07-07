export const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://safepaws.ru";

export function siteUrl(path: string): string {
  return `${BASE_URL}${path}`;
}
