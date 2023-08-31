describe('Home page', () => {
    context('1080p resolution', () => {

        beforeEach(() => {
            cy.viewport(1366, 768)
            cy.visit('http://localhost:3000/')
        })

        it('home page contains 5 random cocktails', () => {
            cy.get('.cocktailBlock').should('have.length', 5)
        })

        it('home page contains a refresh button', () => {
            cy.get('#refreshBtn').contains('Refresh')
        })

        it('home page contains a search input', () => {
            cy.get('#searchBar').invoke('attr', 'placeholder').should('eq', 'Search here...')
        })

        it('home page contains a favourites button', () => {
            cy.get('#favouriteBtn').contains('Favourites')
        })

        describe('Search', () => {
            it('user can search a cocktail', () => {
                cy.get('#searchBar').type('ACID')
                cy.get('#searchButton').click()

                cy.get('#cocktailsWrapper').contains('ACID')
            })

            it('user can clear the search', () => {
                cy.get('#searchBar').type('ACID')
                cy.get('#searchButton').click()

                cy.get('#cocktailsWrapper').contains('ACID')

                cy.get('#clearButton').click()
                cy.get('#searchBar').should('be.empty')
            })

            it('clearing the search by clicking the clear(X) buton will render another 5 cocktails', () => {
                cy.get('#searchBar').type('ACID')
                cy.get('#searchButton').click()

                cy.get('#cocktailsWrapper').contains('ACID')

                cy.get('#clearButton').click()
                cy.get('.cocktailBlock').should('have.length', 5)
            })

            it('if no search results, user will get notified', () => {
                cy.get('#searchBar').type('jin')
                cy.get('#searchButton').click()

                cy.get('.cocktailBlock').get('.emptyResultTxt').invoke('text').should('eq', 'No cocktails available for your search...')
            })
        })

        describe('Favourites', () => {
            it('when no items in favourites list, user will get notified', () => {
                cy.get('#favouriteBtn').click()
                cy.get('.favouritesWrapper').get('.emptyResultTxtFavourites').contains('No favorite items available...')
            })

            it('user can add a cocktail to favourites list from 5 cocktails', () => {
                let cocktail = 'expected text'

                cy.get('.cocktailBlock').get('.cocktailName').first().invoke('text').then(text => {
                    cocktail = text.trim()

                    cy.get('.cocktailBlock').first().find('button').click()
                    cy.get('#favouriteBtn').click()
                    cy.get('.favouritesWrapper').get('.favCocktailName').contains(cocktail)
                })
            })

            it('user can add a cocktail to favourites list from search results', () => {
                let cocktail = 'expected text'

                cy.get('#searchBar').type('ACID')
                cy.get('#searchButton').click()

                cy.get('#cocktailsWrapper').contains('ACID')

                cy.get('.cocktailBlock').get('.cocktailName').first().invoke('text').then(text => {
                    cocktail = text.trim()

                    cy.get('.cocktailBlock').first().find('button').click()
                    cy.get('#favouriteBtn').click()
                    cy.get('.favouritesWrapper').get('.favCocktailName').contains(cocktail)
                })
            })

            it('user can delete a cocktail from favourites list', () => {
                cy.get('.cocktailBlock').first().find('button').click()
                cy.get('#favouriteBtn').click()
                cy.get('.favouritesWrapper').get('.trashButtonWrapper').find('button').click()

                cy.get('.favouritesWrapper').get('.favCocktailName').should('not.exist')
            })
        })

        describe('Notification', () => {
            it('success notification appers when user add a cocktail to the favourites list', () => {
                let cocktail = 'expected text'

                cy.get('.cocktailBlock').get('.cocktailName').first().invoke('text').then(text => {
                    cocktail = text.trim()

                    cy.get('.cocktailBlock').first().find('button').click()

                    cy.get('.notification').contains(`'${cocktail}' added to the favourites!`)
                })
            })

            it('error notification apperas when user add the same cocktail twice to the favourites list', () => {
                let cocktail = 'expected text'

                cy.get('.cocktailBlock').get('.cocktailName').first().invoke('text').then(text => {
                    cocktail = text.trim()

                    cy.get('.cocktailBlock').first().find('button').click()
                    cy.get('.cocktailBlock').first().find('button').click()

                    cy.get('.notification').contains(`'${cocktail}' is already added to the favourites!`)
                })
            })

            it('success notification appears when user delete a cocktail from favourites list', () => {
                let cocktail = 'expected text'

                cy.get('.cocktailBlock').get('.cocktailName').first().invoke('text').then(text => {
                    cocktail = text.trim()

                    cy.get('.cocktailBlock').first().find('button').click()
                    cy.get('#favouriteBtn').click()
                    cy.get('.favouritesWrapper').get('.trashButtonWrapper').find('button').click()

                    cy.get('.notification').contains(`'${cocktail}' removed from favourites!`)
                })
            })

            it('error notification appears when user try to click search button without typing in search input', () => {
                cy.get('#searchButton').click()
                cy.get('.notification').contains('Type something to search!')
            })

            it('error notification appears when user try to click clear button without typing in search input', () => {
                cy.get('#clearButton').click()
                cy.get('.notification').contains('Search has been cleared already!')
            })
        })

    })
})