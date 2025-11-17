// SPA-safe navigation helper for React Router apps
import type { Page } from '@playwright/test';
export const navigate = async (page: Page, path: string) => {
  const baseURL = 'https://columbiapa300.netlify.app/';
  const url = `${baseURL}${path.startsWith('/') ? path : `/${path}`}`;
  await page.goto(url, { waitUntil: 'networkidle' });
};
