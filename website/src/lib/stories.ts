import { sql } from "./db";
export { formatInstalledDate } from "./utils";

export type StoryStatus = "pending" | "published" | "rejected";

export interface Story {
  id: number;
  submitted_at: string;
  status: StoryStatus;
  author_name: string;
  telegram: string | null;
  quote: string;
  body: string;
  photo_url: string | null;
  installed_date: string | null;  // ISO date string YYYY-MM-DD
  product_slug: string;
  city: string;
  country: string;
  lat: number | null;
  lng: number | null;
}

export interface StorySubmission {
  author_name: string;
  telegram?: string;
  quote: string;
  body: string;
  photo_url?: string;
  installed_date?: string;
  product_slug: string;
  city: string;
  country: string;
  lat?: number;
  lng?: number;
}

/** All published stories, newest first */
export async function getPublishedStories(): Promise<Story[]> {
  const rows = await sql`
    SELECT * FROM stories
    WHERE  status = 'published'
    ORDER  BY installed_date DESC NULLS LAST, submitted_at DESC
  `;
  return rows as Story[];
}

/** Published stories with optional filters */
export async function filterStories(opts: {
  product_slug?: string;
  country?: string;
  limit?: number;
}): Promise<Story[]> {
  const { product_slug, country, limit } = opts;

  if (product_slug && country) {
    const rows = await sql`
      SELECT * FROM stories
      WHERE  status = 'published'
        AND  product_slug = ${product_slug}
        AND  country = ${country}
      ORDER  BY (photo_url IS NOT NULL) DESC,
                installed_date DESC NULLS LAST,
                submitted_at DESC
      ${limit ? sql`LIMIT ${limit}` : sql``}
    `;
    return rows as Story[];
  }

  if (product_slug) {
    const rows = await sql`
      SELECT * FROM stories
      WHERE  status = 'published'
        AND  product_slug = ${product_slug}
      ORDER  BY (photo_url IS NOT NULL) DESC,
                installed_date DESC NULLS LAST,
                submitted_at DESC
      ${limit ? sql`LIMIT ${limit}` : sql``}
    `;
    return rows as Story[];
  }

  if (country) {
    const rows = await sql`
      SELECT * FROM stories
      WHERE  status = 'published'
        AND  country = ${country}
      ORDER  BY (photo_url IS NOT NULL) DESC,
                installed_date DESC NULLS LAST,
                submitted_at DESC
      ${limit ? sql`LIMIT ${limit}` : sql``}
    `;
    return rows as Story[];
  }

  return getPublishedStories();
}

/** Submit a new story (status = pending) */
export async function submitStory(data: StorySubmission): Promise<number> {
  const rows = await sql`
    INSERT INTO stories
      (author_name, telegram, quote, body, photo_url, installed_date,
       product_slug, city, country, lat, lng)
    VALUES
      (${data.author_name}, ${data.telegram ?? null}, ${data.quote}, ${data.body},
       ${data.photo_url ?? null}, ${data.installed_date ?? null},
       ${data.product_slug}, ${data.city}, ${data.country},
       ${data.lat ?? null}, ${data.lng ?? null})
    RETURNING id
  `;
  return (rows[0] as { id: number }).id;
}

