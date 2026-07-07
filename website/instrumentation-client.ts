import posthog from "posthog-js";
import type { PostHogConfig } from "posthog-js";

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
