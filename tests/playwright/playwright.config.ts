import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/playwright/tests',
  timeout: 30000,
  retries: 1,
  reporter: [['list'], ['html', { outputFolder: 'tests/playwright/reports' }]],
  use: {
    baseURL: 'http://localhost:8888',
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
  ],
});