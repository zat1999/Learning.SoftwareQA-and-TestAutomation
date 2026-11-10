describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  
  
  it('Pass', () => {  
    cy.getDataTest('secondary-header').should('not.exist')
    cy.login('standard_user', 'secret_sauce')
    cy.getDataTest('login-button').click()
    cy.getDataTest('secondary-header').should('exist')        // imo better if check via url but url is the same for login and menu page.
    cy.getDataTest('secondary-header').within(() => {
      cy.getDataTest('title').contains("Products")
    })
    
    cy.get("#react-burger-menu-btn").click()                // get the menu button and click it via ID
    cy.getDataTest("logout-sidebar-link").click()
    cy.getDataTest('secondary-header').should('not.exist')
  })

  it('Fail', () => {
    cy.login('standard_users', 'secret_sauce')  // wrong username, correct password
    cy.getDataTest('login-button').click()
    cy.getDataTest('error').contains(/Username and password do not match any user in this service/i)
    
    cy.login('standard_user', 'secret_sauces')  // correct username, wrong username
    cy.getDataTest('login-button').click()
    cy.getDataTest('error').contains(/Username and password do not match any user in this service/i)
  
    cy.login('', 'secret_sauces')  // no username
    cy.getDataTest('login-button').click()
    cy.getDataTest('error').contains(/Username is required/i)

    cy.login('standard_user', '')  // no password
    cy.getDataTest('login-button').click()
    cy.getDataTest('error').contains(/Password is required/i)

    cy.login('', '')  // no username and no password
    cy.getDataTest('login-button').click()
    cy.getDataTest('error').contains(/Username is required/i)
  })

  it('Fail - locked_out users', () => {

    cy.login('locked_out_user', 'secret_sauce')  // locked out user, correct password
    cy.getDataTest('login-button').click()
    cy.getDataTest('error').contains(/Sorry, this user has been locked out./i)
    
    cy.login('locked_out_user', 'secret_sauces')  // locked out user, wrong password
    cy.getDataTest('login-button').click()
    cy.getDataTest('error').contains(/Username and password do not match any user in this service/i)
    
  })

})