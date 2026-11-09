describe('Inventory', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.login('standard_user', 'secret_sauce')
    cy.getDataTest('login-button').click()
  })

    // checks how many products/inventory items in the list
    it('Pass', () => {      
        cy.getDataTest('inventory-list')
        .find('[data-test="inventory-item"]')
        .should('have.length',6)
    })
    









})