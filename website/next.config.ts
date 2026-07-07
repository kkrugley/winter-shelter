import type { NextConfig } from "next";

// 'unsafe-eval' is required in dev mode: Next.js webpack uses eval() for source maps and HMR.
const isDev = process.env.NODE_ENV === "development";

const CSP = [
  "default-src 'self'",
  // TODO: tighten to nonce-based CSP once Next.js nonce support is wired up
  isDev
    ? "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com https://challenges.cloudflare.com"
    : "script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval' https://va.vercel-scripts.com https://challenges.cloudflare.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "frame-src https://challenges.cloudflare.com",
  "img-src 'self' data: blob: https://i.vgy.me https://*.basemaps.cartocdn.com",
  "worker-src blob:",
  "connect-src 'self' ws: wss: https://basemaps.cartocdn.com https://*.basemaps.cartocdn.com https://fonts.openmaptiles.org https://va.vercel-scripts.com https://challenges.cloudflare.com https://turnstile-siteverify-safepaws.pkrugley.workers.dev",
].join("; ");

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ["@phosphor-icons/react"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Content-Security-Policy", value: CSP },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://eu-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/array/:path*",
        destination: "https://eu-assets.i.posthog.com/array/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://eu.i.posthog.com/:path*",
      },
    ];
  },
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
