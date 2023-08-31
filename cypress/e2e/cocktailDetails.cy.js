describe('Cocktail page', () => {
    context('1080p resolution', () => {
        beforeEach(() => {
            cy.viewport(1366, 768)
            cy.visit('http://localhost:3000/')
        })

        it('user can click on a cocktail from home page and go to the cocktail detail page', () => {
            let cocktail = 'expected text'

            cy.get('.cocktailBlock').get('.cocktailName').first().invoke('text').then(text => {
                cocktail = text.trim()

                cy.get('.cocktailBlock').get('.cocktailName').first().click()
                cy.get('#cocktailsWrapper').contains(cocktail)
            })
        })

        it('user can search a cocktail and go to the cocktail detail page', () => {
            cy.get('#searchBar').type('ACID')
            cy.get('#searchButton').click()

            cy.get('#cocktailsWrapper').contains('ACID').click()
            cy.get('#cocktailsWrapper').contains('ACID')
        })

        it('user can go back to search results from cocktail detail page', () => {
            cy.get('#searchBar').type('ACID')
            cy.get('#searchButton').click()

            cy.get('#cocktailsWrapper').contains('ACID').click()
            cy.get('#cocktailsWrapper').contains('Home').click()

            cy.get('.cocktailBlock').should('have.length', 1)
        })

        it('user can click on a cocktail and then add it to favourites list', () => {
            let cocktail = 'expected text'

            cy.get('.cocktailBlock').get('.cocktailName').first().invoke('text').then(text => {
                cocktail = text.trim()

                cy.get('.cocktailBlock').get('.cocktailName').first().click()
                cy.get('.heartButton_details').click()

                cy.get('#favouriteBtn').click()
                cy.get('.favouritesWrapper').get('.favCocktailName').contains(cocktail)
            })
        })
    })
})