import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright E2E configuration for WeJustice demo.
 *
 * - Chromium only (demo scope)
 * - Screenshot on failure
 * - Dev server auto-start on port 3001
 */
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "list",
  timeout: 30_000,

  use: {
    baseURL: "http://localhost:3001",
    screenshot: "only-on-failure",
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  webServer: {
    command: "npm run dev",
    port: 3001,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
