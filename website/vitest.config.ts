import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "node",
    globals: true,
    // Dummy URL so modules that import the Neon client load without a real DB;
    // the HTTP driver only connects on an actual query, which unit tests avoid.
    env: {
      DATABASE_URL: "postgres://test:test@localhost/test",
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
