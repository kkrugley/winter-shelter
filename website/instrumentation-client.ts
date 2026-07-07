import posthog from "posthog-js";
import type { PostHogConfig } from "posthog-js";
import * as Sentry from "@sentry/nextjs";

// The "[Dead Clicks] failed to load script" console error comes from the
// Heatmaps feature's internal rage/dead-click helper, not from the top-level
// capture_dead_clicks toggle (that one is unrelated and already off below).
// capture_heatmaps is the actual switch — it isn't in posthog-js's public
// PostHogConfig type yet, hence the intersection cast.
const config: Partial<PostHogConfig> & { capture_heatmaps?: boolean } = {
  api_host: "/ingest",
  ui_host: "https://eu.posthog.com",
  defaults: "2026-01-30",
  capture_exceptions: true,
  capture_dead_clicks: false,
  capture_heatmaps: false,
  debug: process.env.NODE_ENV === "development",
};

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN!, config);

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: process.env.NODE_ENV === "development" ? 1.0 : 0.1,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  enableLogs: true,
  integrations: [Sentry.replayIntegration()],
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
