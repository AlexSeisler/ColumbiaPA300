import { test, expect } from '@playwright/test';
import { selectors } from '../helpers/selectors';
import { retry } from '../helpers/retry';

// ColumbiaPA300 - Navigation Flow Automation Test
// Purpose: Validate header navigation, route transitions, and UI consistency

test.describe('Navigation Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should navigate between Home, Vote, Donate, and Thank You pages', async ({ page }) => {
    // Navigate to Vote page
    await retry(async () => {
      await page.click(selectors.header.voteLink);
    });
    await expect(page).toHaveURL(/.*vote/);
    await expect(page.locator(selectors.votePage.form)).toBeVisible();

    // Navigate to Donate page
    await retry(async () => {
      await page.click(selectors.header.donateLink);
    });
    await expect(page).toHaveURL(/.*donate/);
    await expect(page.locator(selectors.donationPage.donateButton)).toBeVisible();

    // Simulate thank-you redirect check
    await page.route('**/\.netlify/functions/create-checkout-session', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ url: '/thank-you' }),
      });
    });

    await page.click(selectors.donationPage.donateButton);
    await page.waitForURL(/.*thank-you/);
    await expect(page.locator(selectors.donationPage.successMessage)).toBeVisible();

    // Return Home
    await retry(async () => {
      await page.click(selectors.header.homeLink);
    });
    await expect(page).toHaveURL(/.*\//);
  });

  test('should maintain header visibility on route changes', async ({ page }) => {
    const header = page.locator('header');

    await expect(header).toBeVisible();
    await page.click(selectors.header.voteLink);
    await expect(header).toBeVisible();

    await page.click(selectors.header.donateLink);
    await expect(header).toBeVisible();
  });
});