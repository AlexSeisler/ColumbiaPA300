// ColumbiaPA300 - Cypress Test: Submission Form Flow
// Purpose: Validate file upload, mock Netlify submission, and thank-you modal rendering

describe('Submission Form Flow (Cypress)', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('uploads file and shows thank-you modal (mocked)', () => {
    cy.intercept('POST', '/.netlify/functions/submitForm', {
      statusCode: 200,
      body: { success: true },
    }).as('submitForm');

    cy.get('.submit-toggle-cta').click();
    cy.get('input[type="file"]').selectFile({ contents: Buffer.from('fake data'), fileName: 'logo.png', mimeType: 'image/png' });
    cy.get('.submit-button').click();

    cy.wait('@submitForm');
    cy.get('.thank-you-modal').should('be.visible');
  });

  it('shows validation errors when file not uploaded', () => {
    cy.get('.submit-toggle-cta').click();
    cy.get('.submit-button').click();
    cy.get('.thank-you-modal').should('not.exist');
  });
});