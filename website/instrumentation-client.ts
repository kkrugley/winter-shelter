import type { PostHogConfig } from "posthog-js";
import * as Sentry from "@sentry/nextjs";

// Error tracking stays synchronous — Next.js runs this file before hydration
// specifically so Sentry can catch early render/hydration crashes. Replay and
// PostHog are heavier (recording setup, autocapture wiring) and aren't needed
// for that first paint, so they're loaded lazily below once the browser is idle.
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: process.env.NODE_ENV === "development" ? 1.0 : 0.1,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  enableLogs: true,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;

function loadDeferredAnalytics() {
  import("@sentry/nextjs").then((lazySentry) => {
    Sentry.addIntegration(lazySentry.replayIntegration());
  });

  import("posthog-js").then(({ default: posthog }) => {
    // The "[Dead Clicks] failed to load script" console error comes from the
    // Heatmaps feature's internal rage/dead-click helper, not from the top-level
    // capture_dead_clicks toggle (that one is unrelated and already off below).
    // capture_heatmaps is the actual switch — it isn't in posthog-js's public
    // PostHogConfig type yet, hence the intersection cast.
    const config: Partial<PostHogConfig> & { capture_heatmaps?: boolean } = {
      api_host: "/ingest",
      ui_host: "https://eu.posthog.com",
      defaults: "2026-01-30",
      // Sentry is the dedicated error tracker (see above) — letting PostHog also
      // capture exceptions double-reports every JS error and burns PostHog's event quota.
      capture_exceptions: false,
      capture_dead_clicks: false,
      capture_heatmaps: false,
      debug: process.env.NODE_ENV === "development",
    };

    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN!, config);
  });
}

if (typeof window !== "undefined") {
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(loadDeferredAnalytics, { timeout: 4000 });
  } else {
    setTimeout(loadDeferredAnalytics, 1);
  }
}
