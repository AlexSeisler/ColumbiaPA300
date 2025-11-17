// Centralized selectors for Playwright UI automation tests
// Provides consistent reference points for critical elements

export const selectors = {
  header: {
    donateLink: 'a.donate-link',
    voteLink: 'a[href="/vote"]',
    homeLink: 'a[href="/"]',
  },
  votePage: {
    form: 'form.vote-form',
    nameInput: 'input[name="name"]',
    emailInput: 'input[name="email"]',
    submitButton: 'button[type="submit"]',
    successMessage: '.vote-success',
  },
  donationPage: {
    amountInput: 'input[name="amount"]',
    emailInput: 'input[name="email"]',
    donateButton: 'button:has-text("Donate")',
    successMessage: '.thank-you-page h1',
  },
  submissionForm: {
    openButton: '.submit-toggle-cta',
    fileInput: 'input[type="file"]',
    uploadButton: '.submit-button',
    thankYouModal: '.thank-you-modal',
  },
};