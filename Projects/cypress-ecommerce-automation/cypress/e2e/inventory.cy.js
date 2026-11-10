describe('Inventory', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.login('standard_user', 'secret_sauce')
    cy.getDataTest('login-button').click()
  })

    // REQ-PROD-001
    it('Enters Product Page', () => {
      cy.getDataTest('secondary-header').within(() => {
        cy.getDataTest('title').should('have.text','Products')
        cy.getDataTest('product-sort-container').should('exist')
      })      

      cy.getDataTest('inventory-list')
      .find('[data-test="inventory-item"]')
      .should('not.be.empty')
    })
    
    // REQ-PROD-002
    it('Get Name and Price', () => {

      cy.getDataTest('inventory-list')
      .find('[data-test="inventory-item"]')
      .each(($item) => {
    
        // checks if image exist
        cy.wrap($item).find('.inventory_item_img').should('exist')
        
        // finds and checks the image link
        cy.wrap($item).find('.inventory_item_img').find('a')
        .invoke('attr','data-test').should('contain','img-link')

        // checks if item has a title
        cy.wrap($item).getDataTest('inventory-item-name').should('exist')

        // checks if item has a description and price
        cy.wrap($item).getDataTest('inventory-item-description').should('exist')
        cy.wrap($item).getDataTest('inventory-item-price').should('exist')

      })
  
    })

    // REQ-PROD-003 in Ascending order by name
    it('Sort Items AZ', () => {

      // select A-Z Order
      cy.getDataTest('product-sort-container').select('az')

      let itemNamesArray = []
      let sorted_itemNamesArray = []

      cy.getDataTest('inventory-list')
      .find('[data-test="inventory-item"]').each(($item) => {
        cy.wrap($item).find('[data-test="inventory-item-name"]').
        invoke('text').then((name) => {
          itemNamesArray.push(name.trim())
        })
      }).then(() => {
        
        sorted_itemNamesArray = [...itemNamesArray].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
        expect(itemNamesArray).to.deep.equal(sorted_itemNamesArray)
        cy.log(JSON.stringify(itemNamesArray))
        cy.log(JSON.stringify(sorted_itemNamesArray))
      })
    })

    // REQ-PROD-004 in Descending order by name
    it('Sort Items ZA', () => {

      // select A-Z Order
      cy.getDataTest('product-sort-container').select('za')

      let itemNamesArray = []
      let sorted_itemNamesArray = []

      cy.getDataTest('inventory-list')
      .find('[data-test="inventory-item"]').each(($item) => {
        cy.wrap($item).find('[data-test="inventory-item-name"]').
        invoke('text').then((name) => {
          itemNamesArray.push(name.trim())
        })
      }).then(() => {
        
        sorted_itemNamesArray = [...itemNamesArray].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' })).reverse()
        expect(itemNamesArray).to.deep.equal(sorted_itemNamesArray)
        cy.log(JSON.stringify(itemNamesArray))
        cy.log(JSON.stringify(sorted_itemNamesArray))
      })
    })

  })