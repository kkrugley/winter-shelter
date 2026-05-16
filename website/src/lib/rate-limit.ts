export function getClientIp(req: { headers: { get: (key: string) => string | null } }): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

export function createRateLimiter(maxRequests: number, windowMs: number) {
  const store = new Map<string, { count: number; windowStart: number }>();

  return function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const entry = store.get(ip);

    if (!entry || now - entry.windowStart > windowMs) {
      store.set(ip, { count: 1, windowStart: now });
      return false;
    }

    if (entry.count >= maxRequests) return true;

    entry.count++;
    return false;
  };
}
