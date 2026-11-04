describe('Test Various Examples', () => {
    beforeEach(() => {
        cy.visit('/examples')
    })

    it("Multi-page Testings", () => {
        cy.getDataTest('nav-why-cypress').click();
        cy.location("pathname").should("equal", "/")

        cy.getDataTest('nav-overview').click();
        cy.location("pathname").should("equal", "/overview")

        cy.getDataTest('nav-fundamentals').click();
        cy.location("pathname").should("equal", "/fundamentals")

        cy.getDataTest('nav-forms').click();
        cy.location("pathname").should("equal", "/forms")

        cy.getDataTest('nav-examples').click();
        cy.location("pathname").should("equal", "/examples")

        cy.getDataTest('nav-components').click();
        cy.location("pathname").should("equal", "/component")

        cy.getDataTest('nav-best-practices').click();
        cy.location("pathname").should("equal", "/best-practices")
    })

    it.only("intercepts", () => {
        cy.intercept('POST', 'http://localhost:3000/examples', {
            fixture: 'example.json'
        })

        cy.getDataTest('post-button').click();

    })

    it("grudges", () => {
        
        cy.contains('Add Some Grudges')
        
        cy.getDataTest('clear-grudges-button').should('not.exist')

        cy.getDataTest('grudge-list').within(() => {
            cy.get('li').should('have.length', 0)
        })

        cy.getDataTest('grudge-input').within(() => {
            cy.get('input').type('Grudge 1')
            
        })
        cy.getDataTest('add-grudge-button').click()

        cy.getDataTest('grudge-list-title').should('contain.text', 'Grudges')

        cy.getDataTest('grudge-list').within(() => {
            cy.get('li').should('have.length', 1)
        })

        cy.getDataTest('grudge-input').within(() => {
        cy.get('input').type('Grudge 2')
            
        })
        cy.getDataTest('add-grudge-button').click()

        cy.getDataTest('grudge-list').within(() => {
            cy.get('li').should('have.length', 2)
            cy.get('li').its(0).should('contains.text', 'Grudge 1')
            cy.get('li').its(1).should('contains.text', 'Grudge 2')
        })

        cy.getDataTest('grudge-list').within(() => {
            cy.get('li').should('have.length', 2)
            cy.get('li').its(0).within(() => {
                cy.get('button').click()
            })
            cy.get('li').should('have.length', 1)
            cy.get('li').its(0).should('contains.text', 'Grudge 2')
        })

        cy.getDataTest('clear-grudges-button').click()

            cy.getDataTest('grudge-list').within(() => {
            cy.get('li').should('have.length', 0)
        })

        cy.getDataTest('grudge-list-title').should('contain.text', 'Add Some Grudges')
    })


})