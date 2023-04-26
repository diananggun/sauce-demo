import sauceDemoPage from "../pages/sauceDemo";

describe("Authentication", () => {
  beforeEach(() => {
    cy.visit("https://www.saucedemo.com/");
    // cy.viewport(600, 900);
    cy.viewport(1600, 900);
  });

  it("should login with valid username and password", () => {
    sauceDemoPage.login(Cypress.env("VALID_USERNAME"), Cypress.env("VALID_PASSWORD"));
    cy.url().should("include", "inventory.html");
  });

  it("can not login with invalid password", () => {
    sauceDemoPage.login(Cypress.env("VALID_USERNAME"), Cypress.env("INVALID_PASSWORD"));
    sauceDemoPage
      .getErrorMessage()
      .should("contain", "Epic sadface: Username and password do not match any user in this service");
  });

  it("can not login with locked out user", () => {
    sauceDemoPage.login(Cypress.env("LOCKED_USERNAME"), Cypress.env("VALID_PASSWORD"))
    sauceDemoPage.getErrorMessage().should("contain", "Epic sadface: Sorry, this user has been locked out.");
  });

  it("should login with problem user", () => {
    sauceDemoPage.login(Cypress.env("PROBLEM_USERNAME"), Cypress.env("VALID_PASSWORD"))
    cy.url().should("include", "inventory.html");
  });

  it("should login with performance glitch user", () => {
    sauceDemoPage.login(Cypress.env("GLITCH_USERNAME"), Cypress.env("VALID_PASSWORD"))
    cy.url().should("include", "inventory.html");
  });
});
