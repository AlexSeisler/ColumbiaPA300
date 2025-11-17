// Simple retry utility for stabilizing Playwright tests with transient conditions
// Usage: await retry(async () => await page.click('selector'));

export async function retry(action: () => Promise<void>, attempts = 3, delay = 1000) {
  for (let i = 0; i < attempts; i++) {
    try {
      await action();
      return; // Success, exit retry loop
    } catch (error) {
      if (i === attempts - 1) throw error;
      console.warn(`Retrying (${i + 1}/${attempts}) due to error:`, error.message);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}