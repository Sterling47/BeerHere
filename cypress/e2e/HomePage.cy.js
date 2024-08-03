describe('Breweries', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://api.openbrewerydb.org/v1/breweries?per_page=200&page=1', { 
      fixture: 'breweries.json'
    }).as('getBreweries');
    cy.visit('http://127.0.0.1:5173/');
  });

  it('should display 5 brewery cards', () => {
    cy.wait('@getBreweries').its('response.statusCode').should('eq', 200);
    cy.get('.brew_card').should('have.length', 5);
  });

  it('should show the NavBar', () => {
    cy.get('.navbar').should('be.visible');
  });

  it('should display the correct string in the HeroSection', () => {
    cy.get('.hero-section h1').should('contain.text', 'Have No Fear! The Beer is HERE!');
  });

  it('should display the correct city options', () => {
    cy.get('.form_wrapper select').first().children().should('have.length', 4); // 3 cities + 1 default option
    cy.get('.form_wrapper select').first().contains('Atlanta');
    cy.get('.form_wrapper select').first().contains('Phoenix');
    cy.get('.form_wrapper select').first().contains('Denver');
  });

  it('should display the correct type options', () => {
    cy.get('.form_wrapper select').last().children().should('have.length', 11); // 10 types + 1 default option
    cy.get('.form_wrapper select').last().contains('micro');
    cy.get('.form_wrapper select').last().contains('nano');
    cy.get('.form_wrapper select').last().contains('regional');
    cy.get('.form_wrapper select').last().contains('brewpub');
    cy.get('.form_wrapper select').last().contains('large');
    cy.get('.form_wrapper select').last().contains('planning');
    cy.get('.form_wrapper select').last().contains('bar');
    cy.get('.form_wrapper select').last().contains('contract');
    cy.get('.form_wrapper select').last().contains('proprietor');
    cy.get('.form_wrapper select').last().contains('closed');
  });

  it('should filter breweries by city', () => {
    cy.get('.form_wrapper select').first().select('Atlanta');
    cy.wait(500)
    cy.get('.brew_card').should('have.length.gt', 0).each(($el) => {
      cy.wrap($el).should('contain.text', 'City:Atlanta');
    });
  });
});