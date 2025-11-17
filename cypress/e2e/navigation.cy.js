// ColumbiaPA300 - Cypress Test: Navigation Flow
// Purpose: Validate main navigation links and route transitions

describe('Navigation Flow (Cypress)', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('navigates between pages using header links', () => {
    cy.get('header').should('be.visible');

    cy.get('a[href="/vote"]').click();
    cy.url().should('include', '/vote');
    cy.get('form.vote-form').should('be.visible');

    cy.get('a[href="/donate"]').click();
    cy.url().should('include', '/donate');
    cy.get('button:contains("Donate")').should('be.visible');

    cy.intercept('POST', '/.netlify/functions/create-checkout-session', {
      statusCode: 200,
      body: { url: '/thank-you' },
    }).as('mockStripe');

    cy.get('button:contains("Donate")').click();
    cy.wait('@mockStripe');
    cy.url().should('include', '/thank-you');

    cy.get('a[href="/"]').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });

  it('maintains header visibility across route transitions', () => {
    cy.get('header').should('be.visible');
    cy.get('a[href="/vote"]').click();
    cy.get('header').should('be.visible');

    cy.get('a[href="/donate"]').click();
    cy.get('header').should('be.visible');
  });
});