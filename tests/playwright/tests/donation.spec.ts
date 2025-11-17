import { test, expect } from '@playwright/test';
import { selectors } from '../helpers/selectors';
import { retry } from '../helpers/retry';

// ColumbiaPA300 - Donation Flow Automation Test
// Purpose: Validate donation form submission, mock Stripe redirect, and success message

const mockDonation = {
  email: 'donor@example.com',
  amount: '25',
};

test.describe('Donation Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/donate');
  });

  test('should display the donation form', async ({ page }) => {
    await expect(page.locator(selectors.donationPage.amountInput)).toBeVisible();
    await expect(page.locator(selectors.donationPage.donateButton)).toBeVisible();
  });

  test('should submit donation form and show success message', async ({ page }) => {
    // Mock Stripe checkout API route
    await page.route('**/\.netlify/functions/create-checkout-session', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ url: '/thank-you' }),
      });
    });

    await page.fill(selectors.donationPage.amountInput, mockDonation.amount);
    await page.fill(selectors.donationPage.emailInput, mockDonation.email);

    await retry(async () => {
      await page.click(selectors.donationPage.donateButton);
    });

    // Expect redirect or success message
    await page.waitForTimeout(1500);
    const thankYouVisible = await page.locator(selectors.donationPage.successMessage).isVisible();
    expect(thankYouVisible).toBeTruthy();
  });

  test('should handle missing input validation', async ({ page }) => {
    await page.click(selectors.donationPage.donateButton);

    const amountValid = await page.locator(selectors.donationPage.amountInput).evaluate((el) => el.validity.valid);
    const emailValid = await page.locator(selectors.donationPage.emailInput).evaluate((el) => el.validity.valid);

    expect(amountValid).toBeFalsy();
    expect(emailValid).toBeFalsy();
  });
});