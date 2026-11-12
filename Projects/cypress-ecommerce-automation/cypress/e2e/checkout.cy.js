describe('Checkout', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.login('standard_user', 'secret_sauce')
        cy.getDataTest('login-button').click()

        cy.getDataTest('inventory-list')
        .find('[data-test="inventory-item"]')
        .each(($item) => {
            cy.wrap($item).find(".pricebar").
            find('button[data-test*="add-to-cart"]').click()  
        })
        cy.getDataTest('shopping-cart-link').click()
    })

    // REQ-CHECK-001
    it('Checkout Shopping Cart', () => {
        cy.getDataTest('title').should('have.text','Your Cart')
        cy.getDataTest('checkout').click()
        cy.getDataTest('title').should('have.text','Checkout: Your Information')
    })

    // REQ-CHECK-002
    it('Checkout Cart Information', () => {
        cy.getDataTest('title').should('have.text','Your Cart')
        cy.getDataTest('checkout').click()
        cy.getDataTest('title').should('have.text','Checkout: Your Information')

        cy.getDataTest("firstName").type("John")
        cy.getDataTest("lastName").type("Smith")
        cy.getDataTest("postalCode").type("12345")
        cy.getDataTest('continue').click()
    })

    // REQ-CHECK-003, REQ-CHECK-004, REQ-CHECK-005
    it('Validate Checkout Cart Information', () => {
        cy.getDataTest('title').should('have.text','Your Cart')
        cy.getDataTest('checkout').click()
        cy.getDataTest('title').should('have.text','Checkout: Your Information')

        // No fName
        cy.getDataTest("firstName").clear()
        cy.getDataTest("lastName").type("Smith")
        cy.getDataTest("postalCode").type("12345")
        cy.getDataTest('continue').click()
        cy.getDataTest('error').should('have.text','Error: First Name is required')

        // No lName
        cy.getDataTest("firstName").type("John")
        cy.getDataTest("lastName").clear()
        // cy.getDataTest("postalCode").clear().type("12345")
        cy.getDataTest('continue').click()
        cy.getDataTest('error').should('have.text','Error: Last Name is required')

        // No Postcode
        // cy.getDataTest("firstName").type("John")
        cy.getDataTest("lastName").type("Smith")
        cy.getDataTest("postalCode").clear()
        cy.getDataTest('continue').click()
        cy.getDataTest('error').should('have.text','Error: Postal Code is required')

        // No fName, lName, Postcode
        cy.getDataTest("firstName").clear()
        cy.getDataTest("lastName").clear()
        // cy.getDataTest("postalCode").clear()
        cy.getDataTest('continue').click()
        cy.getDataTest('error').should('have.text','Error: First Name is required')
    })

    // REQ-CHECK-006, REQ-CHECK-007
    it('Checkout Overview Page', () => {
        cy.getDataTest('title').should('have.text','Your Cart')
        cy.getDataTest('checkout').click()
        cy.getDataTest('title').should('have.text','Checkout: Your Information')

        cy.getDataTest("firstName").type("John")
        cy.getDataTest("lastName").type("Smith")
        cy.getDataTest("postalCode").type("12345")
        cy.getDataTest('continue').click()

        cy.getDataTest('title').should('have.text','Checkout: Overview')
        let itemTotal = 0
        let taxValue = 0
        cy.getDataTest('cart-list')
        .find('[data-test="inventory-item"]')
        .each(($item) => {

            // shows that all items display the correct information
            cy.wrap($item).find('[data-test*="title-link"]').should('be.visible')
            cy.wrap($item).find('[data-test="inventory-item-desc"]').should('be.visible')
            cy.wrap($item).find('[data-test="inventory-item-price"]').should('be.visible')
            cy.wrap($item).find('[data-test="inventory-item-price"]').invoke('text').then((value) => {
                itemTotal = itemTotal + parseFloat(value.replace('$',''))  
            })
        })
        .then(() => {
            // tax is calculated as 8%
            taxValue = (itemTotal * 0.08).toFixed(2)

            // checks with the calculated total and tax with the displayed value
            cy.getDataTest("subtotal-label").should('contain', itemTotal)
            cy.getDataTest("tax-label").should('contain', taxValue)

        })

    })

    // REQ-CHECK-008
    it('Complete the order', () => {
        cy.getDataTest('title').should('have.text','Your Cart')
        cy.getDataTest('checkout').click()
        cy.getDataTest('title').should('have.text','Checkout: Your Information')

        cy.getDataTest("firstName").type("John")
        cy.getDataTest("lastName").type("Smith")
        cy.getDataTest("postalCode").type("12345")
        cy.getDataTest('continue').click()
        cy.getDataTest('finish').click()
        cy.getDataTest('title').should('have.text','Checkout: Complete!')
        cy.getDataTest('complete-header').should('be.visible')
    })

})


