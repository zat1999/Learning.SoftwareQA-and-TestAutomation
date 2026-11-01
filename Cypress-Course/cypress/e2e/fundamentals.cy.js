describe('Fundamentals test', () => {
  
  // runs before each 'IT' (individual test) block
  beforeEach(() => {
    cy.visit('/fundamentals')
  })

  it('Contains correct header text', () => {
    cy.get('[data-test="fundamentals-header"]').contains(/Testing Fundamentals/i) // loose assertion, case insensitive
    cy.get('[data-test="fundamentals-header"]').should('contain.text', 'Testing') // strict assertion
  })
  it('Accordion works correctly', () => {
    cy.contains(/Your tests will exist in a describe block/i).should('not.be.visible')
    cy.get('[data-test="accordion-item-1"] div[role="button"]').click()
    cy.contains(/Your tests will exist in a describe block/i).should('be.visible')
    cy.get('[data-test="accordion-item-1"] div[role="button"]').click()
    cy.contains(/Your tests will exist in a describe block/i).should('not.be.visible')
  })
  it('Custom command works correctly', () => {
      cy.getDataTest('fundamentals-header').contains(/Testing Fundamentals/i)
      cy.getDataTest('accordion-item-1').contains(/Your tests will exist in a describe block/i).should('not.be.visible')
      cy.getDataTest('accordion-item-1').find('div[role="button"]').click() // find the button within the accordion item and click it, .get() would search the entire DOM for the button
      cy.getDataTest('accordion-item-1').contains(/Your tests will exist in a describe block/i).should('be.visible')
  })


})