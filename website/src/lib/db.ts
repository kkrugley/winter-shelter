import { neon } from "@neondatabase/serverless";

// Pooled connection — used in API routes and Server Components
export const sql = neon(process.env.DATABASE_URL!);
