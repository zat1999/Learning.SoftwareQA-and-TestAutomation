// Test case for login functionality
// describe func, describes a group of tests
describe('Login Functionality', () => {
    // it-log describes a single test case
    it('Should load the page and display the login form', () => {
        
        cy.visit('index.html') // open the webpage (file:// path)
        
        // assertions
        cy.get('h1').should('contain', 'Welcome to the demo app')
        cy.get('#username').should('be.visible')                        //username input can be seen
        cy.get('#password').should('exist')                             // should exist even if not visible
        cy.get('button[type="submit"]').should('have.text', 'Login').should('be.visible')    // submit button has correct text       
    })
})