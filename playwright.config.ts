import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: process.env.CI ? 1 : undefined,
  // reporter: '',
  use: {
    baseURL: 'http://127.0.0.1:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
        name: 'voiceover',
        grep: /@voiceover/,
        timeout: 5 * 60 * 1000,
        use: {
            ...devices['Desktop Safari'],
            headless: false,
        },
    },
    {
        name: 'nvda',
        grep: /@nvda/,
        timeout: 5 * 60 * 1000,
        use: {
            ...devices['Desktop Firefox'],
            headless: false,
        },
    },
  ],
  webServer: {
    command: 'yarn start',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: !process.env.CI,
  },
});
