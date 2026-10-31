# Cypress Learning Roadmap

This roadmap starts from the current demo: a basic HTML login form, a Cypress
configuration, and Cypress installed as a development dependency. 

## Getting started

Setting up and installing cypress:

```bash
npm init -y
npm install cypress --save-dev
```

From this directory, open the Cypress app:

```bash
npx cypress open
```

Choose **E2E Testing**, then select a browser. To run tests headlessly later:

```bash
npx cypress run
```

The current `index.html` is static and does not implement login behavior. For
browser tests, serve it through a local development server (for example, VS
Code Live Server) and set Cypress's `baseUrl` to that server's address in
`cypress.config.js`. Add meaningful app behavior as you reach the relevant
stages; a test should verify what the app actually does.

## Roadmap

| Stage | Focus | Practice and milestone |
|---|---|---|
| 1. First test | Spec files, `describe`, `it`, `cy.visit`, and Cypress's command log | Create `cypress/e2e/login.cy.js`. Visit the demo and assert that its heading and username/password fields are visible. |
| 2. Finding elements and interacting | `cy.get`, `cy.contains`, `.type`, `.click`, and `.should` | Fill in the login form and assert the entered values. Prefer stable selectors such as `data-cy="username"` over styling classes or fragile positional selectors. |
| 3. Reliable tests | Cypress retries, automatic waiting, test isolation, and clear assertions | Assert a visible result rather than adding fixed `cy.wait(...)` delays. Keep tests independent so each can run by itself. |
| 4. App behavior and forms | HTML constraints, validation, success/error states, and navigation | Add simple local login behavior to the demo. Test empty fields, invalid input, and a successful login, including the user-visible result for each case. |
| 5. Network and test data | `cy.intercept`, aliases, fixtures, and controlled API responses | Build a small list or search page. Stub loading, empty, success, and error responses; assert the UI for each response without depending on a live service. |
| 6. Reusable test design | Custom commands, shared setup, configuration, and test organization | Extract repeated actions only when they improve clarity. Keep assertions in tests, and use Cypress's built-in retry behavior rather than creating a Selenium-style wait helper. |
| 7. Running in CI | `cypress run`, headless execution, environment configuration, and failure artifacts | Run the suite in a clean checkout and add a CI job after the local suite is stable. Keep credentials and environment-specific values out of source control. |
| 8. Capstone | End-to-end planning and regression coverage | Create a small task manager or shopping-cart demo and cover its most important user journeys from start to finish. Document how to run the app and tests. |

## Starter test example

After adding stable `data-cy` attributes to the demo form, a first test could
look like this:

```js
describe("Demo login page", () => {
  it("shows the login form", () => {
    cy.visit("/");

    cy.contains("h1", "Welcome to the demo app").should("be.visible");
    cy.get('[data-cy="username"]').should("be.visible");
    cy.get('[data-cy="password"]').should("be.visible");
  });
});
```

The selectors in this example are a suggested small app improvement; the
current HTML uses `id="username"` and `id="password"` instead. Either add
`data-cy` attributes or use the existing IDs until then.

## Project ideas

1. **Login form** — Extend this demo with client-side validation and clear
   success and error messages. Cover keyboard and mouse submission, required
   fields, and the result after login.
2. **Task manager** — Add, complete, filter, and delete tasks. Test empty
   states, persistence (if implemented), and the main workflow.
3. **Product search** — Search, filter, and open a product detail page. Use
   `cy.intercept` to exercise loading, no-results, and server-error states.
4. **Shopping cart** — Add and remove products, change quantities, and verify
   totals. Keep checkout local or mocked; do not use real payment services.
5. **Capstone: mini storefront** — Combine search, product details, cart, and
   a mocked checkout into a coherent set of user journeys. Focus on a small
   number of dependable, high-value tests rather than testing every detail.

## Completion checklist

- I can write a spec that visits a page, interacts with it, and verifies a
  user-visible outcome.
- My tests use stable selectors and do not rely on arbitrary sleep delays.
- Tests are isolated, repeatable, and useful when they fail.
- I can stub an API response and test both success and failure states.
- I can run the suite locally in both the Cypress app and headlessly.
- My capstone README explains how to start the app and run its tests.

## Suggested learning references

- [Cypress documentation](https://docs.cypress.io/)
- [Cypress best practices](https://docs.cypress.io/app/core-concepts/best-practices)
- [Cypress testing your app](https://docs.cypress.io/app/end-to-end-testing/testing-your-app)
