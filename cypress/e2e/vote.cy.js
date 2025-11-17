// ColumbiaPA300 - Cypress Test: Voting Flow
// Purpose: Validate voting form interaction, mock API, and UI feedback

describe('Voting Flow (Cypress)', () => {
  beforeEach(() => {
    cy.visit('/vote');
  });

  it('displays the voting form correctly', () => {
    cy.get('form.vote-form').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
  });

  it('submits the vote form successfully (mocked)', () => {
    cy.intercept('POST', '/.netlify/functions/submit-vote', {
      statusCode: 200,
      body: { success: true },
    }).as('submitVote');

    cy.get('input[name="name"]').type('Cypress Tester');
    cy.get('input[name="email"]').type('tester@example.com');
    cy.get('button[type="submit"]').click();

    cy.wait('@submitVote');
    cy.get('.vote-success').should('be.visible');
  });

  it('shows validation errors for empty form fields', () => {
    cy.get('button[type="submit"]').click();
    cy.get('input[name="name"]').then(($input) => {
      expect($input[0].checkValidity()).to.be.false;
    });
    cy.get('input[name="email"]').then(($input) => {
      expect($input[0].checkValidity()).to.be.false;
    });
  });
});