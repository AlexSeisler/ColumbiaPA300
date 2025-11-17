// Simple retry utility for stabilizing Playwright tests with transient conditions
// Usage: await retry(async () => await page.click('selector'));

export async function retry(action: () => Promise<void>, attempts = 3, delay = 1000) {
  for (let i = 0; i < attempts; i++) {
    try {
      await action();
      return; // Success, exit retry loop
    } catch (error: unknown) {
      // Narrow error type safely
      const message =
        error instanceof Error
          ? error.message
          : typeof error === 'string'
          ? error
          : 'Unknown error';

      if (i === attempts - 1) throw error;

      console.warn(`Retrying (${i + 1}/${attempts}) due to error: ${message}`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}
