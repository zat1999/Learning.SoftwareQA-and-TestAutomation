describe("Forms Test", () => {
    beforeEach(() => {
        cy.visit("/forms");
    });

    it("Test Subscribe Form", () => {

        // setting aliases
        cy.getDataTest("subscribe-form").find('input').as("emailInput");    

        // Test the form submission
        // valid email
        cy.contains(/Testing Forms/i)  
        cy.contains(/Successfully subbed: test@example.com!/i).should('not.exist')
        cy.get("@emailInput").type("test@example.com");
        cy.getDataTest("subscribe-button").click();
        cy.contains(/Successfully subbed: test@example.com!/i).should('exist');
        
        cy.wait(3000); // wait for the message to disappear
        cy.contains(/Successfully subbed: test@example.com!/i).should('not.exist')
        
        // invalid email
        cy.contains(/Invalid email: test@example.io!/i).should('not.exist')
        cy.get("@emailInput").type("test@example.io");
        cy.getDataTest("subscribe-button").click();
        cy.contains(/Invalid email: test@example.io!/i).should('exist');    

        cy.wait(3000); // wait for the message to disappear
        cy.contains(/Invalid email: test@example.io!/i).should('not.exist')

        // empty email
        cy.contains(/fail!/i).should('not.exist');
        cy.getDataTest("subscribe-button").click();
        cy.contains(/fail!/i).should('exist'); 
    });

})

