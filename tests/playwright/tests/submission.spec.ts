import { test, expect } from '@playwright/test';
import { selectors } from '../helpers/selectors';
import { retry } from '../helpers/retry';
import { navigate } from '../helpers/utils';

// ColumbiaPA300 - Submission Form Flow Automation Test
// Purpose: Validate logo upload, mock Netlify function call, and success modal behavior

test.describe('Submission Form Flow', () => {
  test.beforeEach(async ({ page }) => {
    await navigate(page, '/');
  });

  test('should open submission modal and upload file successfully', async ({ page }) => {
    await page.click(selectors.submissionForm.openButton);
    const fileChooserPromise = page.waitForEvent('filechooser');

    await retry(async () => {
      const fileChooser = await fileChooserPromise;
      await fileChooser.setFiles({
        name: 'test-logo.png',
        mimeType: 'image/png',
        buffer: Buffer.from('fake image data'),
      });
    });

    await page.route('**/\\.netlify/functions/submitForm', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true }),
      });
    });

    await retry(async () => {
      await page.click(selectors.submissionForm.uploadButton);
    });

    await expect(page.locator(selectors.submissionForm.thankYouModal)).toBeVisible({
      timeout: 4000,
    });
  });

  test('should handle missing file upload gracefully', async ({ page }) => {
    await page.click(selectors.submissionForm.openButton);
    await page.click(selectors.submissionForm.uploadButton);

    const modalVisible = await page.locator(selectors.submissionForm.thankYouModal).isVisible();
    expect(modalVisible).toBeFalsy();
  });
});
