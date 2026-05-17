import { sql } from "./db";

export type IdeaStatus = "pending" | "reviewed" | "implemented" | "declined";

export interface IdeaSubmission {
  author_name: string;
  telegram?: string;
  title: string;
  description: string;
  category?: string;
  photo_url?: string;
}

/** Submit a new idea (status = pending) */
export async function submitIdea(data: IdeaSubmission): Promise<number> {
  const rows = await sql`
    INSERT INTO ideas
      (author_name, telegram, title, description, category, photo_url)
    VALUES
      (${data.author_name}, ${data.telegram ?? null}, ${data.title}, ${data.description},
       ${data.category ?? null}, ${data.photo_url ?? null})
    RETURNING id
  `;
  return (rows[0] as { id: number }).id;
}
