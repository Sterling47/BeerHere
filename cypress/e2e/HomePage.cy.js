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
    cy.get('.form_wrapper select').first().children().should('have.length', 4);
    cy.get('.form_wrapper select').first().contains('Atlanta');
    cy.get('.form_wrapper select').first().contains('Phoenix');
    cy.get('.form_wrapper select').first().contains('Denver');
  });

  it('should display the correct type options', () => {
    cy.get('.form_wrapper select').last().children().should('have.length', 11); 
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

  it('should filter breweries by type', () => {
    cy.get('.form_wrapper select').first().select('Phoenix'); 
    cy.wait(500); 
    cy.get('.form_wrapper select').last().select('micro');
    cy.wait(500);
    cy.get('.brew_card').should('have.length.gt', 0);
  });

  it('should show an error message when the API call fails', () => {
    cy.intercept('GET', 'https://api.openbrewerydb.org/v1/breweries?per_page=200&page=1', {
      statusCode: 500
    }).as('getBreweriesFailed');
    cy.visit('http://127.0.0.1:5173/');
    cy.wait('@getBreweriesFailed');
    cy.get('.error-message').should('contain', 'Failed to load breweries');
  });
});

describe('Home Page Error Handling', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://api.openbrewerydb.org/v1/breweries?per_page=200&page=1', {
      statusCode: 500,
      body: 'Internal Server Error',
    }).as('getBreweriesFailed');
    cy.visit('http://127.0.0.1:5173/');
  });

  it('should show an error message when the API call fails', () => {
    cy.wait('@getBreweriesFailed');
    cy.get('.error-message').should('contain', 'Failed to load breweries');
  });
});

describe('Navbar Navigation', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://api.openbrewerydb.org/v1/breweries?per_page=200&page=1', { fixture: 'breweries.json' }).as('getBreweries');
    cy.visit('http://127.0.0.1:5173/');
    cy.wait('@getBreweries');
  });

  it('should navigate to All Breweries page and display the FilterBar and all breweries', () => {
    cy.get('.navbar').contains('All Breweries').click();
    cy.url().should('include', '/AllBreweries');
    cy.get('.form_wrapper').should('be.visible');
    cy.fixture('breweries.json').then((breweries) => {
      const threeCitiesBreweries = breweries.filter(brewery =>
        brewery.city === 'Atlanta' ||
        brewery.city === 'Denver' ||
        brewery.city === 'Phoenix'
      );

      cy.get('.brew_card').should('have.length', threeCitiesBreweries.length);
      threeCitiesBreweries.forEach((brewery) => {
        cy.get('.brew_card').contains(brewery.name).scrollIntoView().should('be.visible');
      });
    });
  });

  describe('All Breweries Navigation', () => {
    beforeEach(() => {
      cy.intercept('GET', 'https://api.openbrewerydb.org/v1/breweries?per_page=200&page=1', { fixture: 'breweries.json' }).as('getBreweries');
      cy.visit('http://127.0.0.1:5173/');
      cy.wait('@getBreweries');
    });
  
    it('should navigate to the detail page when a brewery card is clicked', () => {
      cy.get('.navbar').contains('All Breweries').click();
      cy.url().should('include', '/AllBreweries');
      cy.fixture('breweries.json').then((breweries) => {
        const brewery = breweries.find(b => b.city === 'Atlanta' || b.city === 'Denver' || b.city === 'Phoenix');
        cy.get('.brew_card').contains(brewery.name).click();
        cy.url().should('include', `/detail/${brewery.id}`);
        cy.get('.detail-section h2').should('contain', brewery.name);
        cy.get('.detail-section').should('contain', `Brewery Type: ${brewery.brewery_type}`);
        cy.get('.detail-section').should('contain', `This brewery is Located in ${brewery.city}`);
      });
    });
  });
});
