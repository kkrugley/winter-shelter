import { sql } from "./db";

export interface Stats {
  installations: number;
  countries: number;
  languages: number;
  downloads: number;
}

export async function getStats(): Promise<Stats> {
  const [installsRes, countriesRes, downloadsRes] = await Promise.all([
    sql`SELECT COUNT(*)::int AS count FROM stories WHERE status = 'published'`,
    sql`SELECT COUNT(DISTINCT country)::int AS count FROM stories WHERE status = 'published'`,
    sql`SELECT COUNT(*)::int AS count FROM downloads`.catch(() => [{ count: 0 }]),
  ]);

  return {
    installations: (installsRes[0] as { count: number }).count,
    countries: (countriesRes[0] as { count: number }).count,
    languages: 4,
    downloads: (downloadsRes[0] as { count: number }).count,
  };
}

export async function logDownload(productSlug: string | null): Promise<void> {
  await sql`INSERT INTO downloads (product_slug) VALUES (${productSlug})`;
}
