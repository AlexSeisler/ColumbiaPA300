import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/playwright/tests',

  // Global test behavior
  timeout: 45_000, // 45s per test
  retries: process.env.CI ? 2 : 1,
  fullyParallel: true,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'tests/playwright/reports', open: 'never' }],
  ],

  // ✅ Note: Dev server auto-launch is skipped since we’re using the live Netlify build
  webServer: undefined,

  use: {
    baseURL: 'https://columbiapa300.netlify.app/', // ✅ Permanent live demo target
    headless: false, // ✅ Allows headed mode to open browsers visually
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10_000,
    navigationTimeout: 15_000,
  },

  // Multi-browser matrix for cross-browser testing
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
