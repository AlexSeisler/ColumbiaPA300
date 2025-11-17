const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8888',
    video: false,
    screenshotsFolder: 'cypress/screenshots',
    downloadsFolder: 'cypress/downloads',
    supportFile: 'cypress/support/e2e.js',
    setupNodeEvents(on, config) {
      // You can add mock intercepts or tasks here
    },
  },
});