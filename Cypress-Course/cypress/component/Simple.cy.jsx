describe("Simple component test", () => {
  it("renders a heading", () => {
    cy.mount(<h1>Hello Cypress</h1>);

    cy.get("h1").should("have.text", "Hello Cypress");
  });
});