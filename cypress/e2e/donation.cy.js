// ColumbiaPA300 - Cypress Test: Donation Flow
// Purpose: Validate donation form submission, mock Stripe redirect, and UI success feedback

describe('Donation Flow (Cypress)', () => {
  beforeEach(() => {
    cy.visit('/donate');
  });

  it('renders donation form elements correctly', () => {
    cy.get('input[name="amount"]').should('be.visible');
    cy.get('input[name="email"]').should('be.visible');
    cy.get('button:contains("Donate")').should('be.visible');
  });

  it('submits donation form successfully (mocked Stripe session)', () => {
    cy.intercept('POST', '/.netlify/functions/create-checkout-session', {
      statusCode: 200,
      body: { url: '/thank-you' },
    }).as('createSession');

    cy.get('input[name="amount"]').type('50');
    cy.get('input[name="email"]').type('donor@example.com');
    cy.get('button:contains("Donate")').click();

    cy.wait('@createSession');
    cy.url().should('include', '/thank-you');
    cy.get('.thank-you-page h1').should('be.visible');
  });

  it('shows validation errors when inputs are empty', () => {
    cy.get('button:contains("Donate")').click();
    cy.get('input[name="amount"]').then(($input) => {
      expect($input[0].checkValidity()).to.be.false;
    });
    cy.get('input[name="email"]').then(($input) => {
      expect($input[0].checkValidity()).to.be.false;
    });
  });
});