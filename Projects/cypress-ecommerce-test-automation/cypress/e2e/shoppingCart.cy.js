describe('ShoppingCart', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.login('standard_user', 'secret_sauce')
    cy.getDataTest('login-button').click()
  })
  
    // REQ-CART-001, REQ-CART-002
    it('Add Product(s) to Cart', () => {
        cy.getDataTest('inventory-list')
        .find('[data-test="inventory-item"]')
        .each(($item) => {

            cy.wrap($item).find(".pricebar").
            find('button[data-test*="add-to-cart"]').click()
        
        })

    })

    // REQ-CART-003
    it('Remove products from cart from inventory page', () => {
        let cartItems = 0;

        // add products to cart
        cy.getDataTest('inventory-list')
        .find('[data-test="inventory-item"]')
        .each(($item) => {
            cartItems++
            cy.wrap($item).find(".pricebar").
            find('button[data-test*="add-to-cart"]').click()
            
        }).then(() => {
            cy.getDataTest('shopping-cart-link').should('have.attr', 'aria-label', `Cart, ${cartItems} items`)
        })

        cy.getDataTest('inventory-list')
        .find('[data-test="inventory-item"]')
        .each(($item) => {
            cartItems++
            cy.wrap($item).find(".pricebar").
            find('button[data-test*="remove"]').click()

        }).then(() => {
            cy.getDataTest('shopping-cart-link').should('have.attr', 'aria-label', 'Cart, empty')
        })
    })


    // REQ-CART-004, REQ-CART-006
    it('Remove products from cart from cart page', () => {
        cy.getDataTest('inventory-list')
        .find('[data-test="inventory-item"]')
        .each(($item) => {

            cy.wrap($item).find(".pricebar").
            find('button[data-test*="add-to-cart"]').click()
        
        })

        // go to cart page
        cy.getDataTest('shopping-cart-link').click()
        cy.getDataTest('title').should('have.text','Your Cart')
        cy.getDataTest('cart-list').should('not.have.length',0)

        cy.getDataTest('cart-list')
        .find('[data-test="inventory-item"]')
        .each(($item) => {

            cy.wrap($item).find(".item_pricebar").
            find('button[data-test*="remove"]').click()
        })

        // returns back to main page
        cy.getDataTest('continue-shopping').click()
        cy.getDataTest('title').should('contain','Products')

    })

    // REQ-CART-005
    it('Check details on product from cart page', () => {
        cy.getDataTest('inventory-list')
        .find('[data-test="inventory-item"]')
        .each(($item) => {

            cy.wrap($item).find(".pricebar").
            find('button[data-test*="add-to-cart"]').click()
        
        })

        // go to cart page
        cy.getDataTest('shopping-cart-link').click()
        cy.getDataTest('title').should('have.text','Your Cart')
        cy.getDataTest('cart-list').should('not.have.length',0)

        cy.getDataTest('cart-list')
        .find('[data-test="inventory-item"]')
        .each(($item) => {

            // checks for title, description and price
            cy.wrap($item).find('[data-test*="title-link"]').should('not.be.empty')
            cy.wrap($item).find('[data-test="inventory-item-desc"]').should('not.be.empty')
            cy.wrap($item).find('[data-test="inventory-item-price"]').should('not.be.empty')
        })


    })

})