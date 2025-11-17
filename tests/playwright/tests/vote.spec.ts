import { test, expect } from '@playwright/test';
import { selectors } from '../helpers/selectors';
import { retry } from '../helpers/retry';
import { navigate } from '../helpers/utils';

// ColumbiaPA300 - Voting Flow Automation Test
// Purpose: Validate form submission, Airtable integration (mocked), and UI success state

const mockVote = {
  name: 'Test User',
  email: 'testuser@example.com',
  choice: 'Community Engagement',
};

test.describe('Voting Flow', () => {
  test.beforeEach(async ({ page }) => {
    await navigate(page, '/vote');
  });

  test('should display the voting form', async ({ page }) => {
    await expect(page.locator(selectors.votePage.form)).toBeVisible();
    await expect(page.locator(selectors.votePage.submitButton)).toBeVisible();
  });

  test('should submit the voting form and show success message', async ({ page }) => {
    await page.fill(selectors.votePage.nameInput, mockVote.name);
    await page.fill(selectors.votePage.emailInput, mockVote.email);

    // Intercept network request to mock Netlify function
    await page.route('**/\\.netlify/functions/submit-vote', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true }),
      });
    });

    await retry(async () => {
      await page.click(selectors.votePage.submitButton);
    });

    // Validate post-submission success state
    await expect(page.locator(selectors.votePage.successMessage)).toBeVisible({ timeout: 5000 });
  });

  test('should handle form validation errors gracefully', async ({ page }) => {
    await page.click(selectors.votePage.submitButton);

    const nameValid = await page
      .locator(selectors.votePage.nameInput)
      .evaluate((el: HTMLInputElement) => el.validity.valid);

    const emailValid = await page
      .locator(selectors.votePage.emailInput)
      .evaluate((el: HTMLInputElement) => el.validity.valid);

    expect(nameValid).toBeFalsy();
    expect(emailValid).toBeFalsy();
  });
});
