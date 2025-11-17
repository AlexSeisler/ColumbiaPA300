import { Builder, By, until } from 'selenium-webdriver';

const BASE_URL = 'https://columbiapa300.netlify.app';

(async function voteFlow() {
  console.log('\n🚀 ColumbiaPA300 — Selenium UI Automation Demo');
  console.log('--------------------------------------------');
  console.log('🎯 Scenario: User Voting Flow');
  console.log('🧩 Framework: Selenium WebDriver (Node.js + Chrome)\n');

  let driver;
  try {
    // Initialize driver
    driver = await new Builder().forBrowser('chrome').build();
    console.log('🌐 Launching Chrome browser...');

    // Navigate to page
    console.log(`🔗 Navigating to: ${BASE_URL}/vote`);
    await driver.get(`${BASE_URL}/vote`);

    // Wait for form
    console.log('⌛ Waiting for voting form to appear...');
    const form = await driver.wait(until.elementLocated(By.css('form')), 10000);
    console.log('✅ Form detected:', !!form);

    // Fill in form fields
    console.log('\n🖋️  Filling out form...');
    await driver.findElement(By.css('input[name="name"]')).sendKeys('Test User');
    await driver.findElement(By.css('input[name="email"]')).sendKeys('test@example.com');

    // Submit form
    console.log('📨 Submitting vote...');
    await driver.findElement(By.css('button[type="submit"]')).click();

    // Wait for success message
    console.log('⌛ Waiting for success or thank-you message...');
    await driver.wait(until.elementLocated(By.css('.vote-success, .thank-you')), 10000);

    console.log('\n✅ SUCCESS: Vote flow completed successfully!');
  } catch (err: any) {
    console.error('\n❌ TEST FAILED!');
    console.error('--------------------------------------------');
    console.error('🧠 Error Type:', err.name || 'Unknown');
    console.error('💬 Message:', err.message || 'No message provided.');
    if (err.stack) console.error('\n🧾 Stack Trace:\n', err.stack);
    console.error('--------------------------------------------\n');
  } finally {
    if (driver) {
      console.log('🧹 Closing browser...');
      await driver.quit();
    }
    console.log('🏁 Selenium demo finished.\n');
  }
})();
