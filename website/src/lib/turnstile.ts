const WORKER_URL = "https://turnstile-siteverify-safepaws.pkrugley.workers.dev";

export async function verifyTurnstileToken(token: string): Promise<{ success: boolean }> {
  const res = await fetch(WORKER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });
  return res.json();
}