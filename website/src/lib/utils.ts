import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** "2024-11-01" → "11.24" */
export function formatInstalledDate(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  const yy = String(d.getUTCFullYear()).slice(2);
  return `${mm}.${yy}`;
}
