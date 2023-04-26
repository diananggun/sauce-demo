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
    sauceDemoPage.getUsername().type("locked_out_user").should("have.value", "locked_out_user");
    sauceDemoPage.getPassword().type("secret_sauce").should("have.value", "secret_sauce");
    sauceDemoPage.getButtonLogin().click();
    sauceDemoPage.getErrorMessage().should("contain", "Epic sadface: Sorry, this user has been locked out.");
  });

  it("should login with problem user", () => {
    sauceDemoPage.getUsername().type("problem_user").should("have.value", "problem_user");
    sauceDemoPage.getPassword().type("secret_sauce").should("have.value", "secret_sauce");
    sauceDemoPage.getButtonLogin().click();
    cy.url().should("include", "inventory.html");
  });

  it("should login with performance glitch user", () => {
    sauceDemoPage
      .getUsername()
      .type("performance_glitch_user")
      .should("have.value", "performance_glitch_user");
    sauceDemoPage.getPassword().type("secret_sauce").should("have.value", "secret_sauce");
    sauceDemoPage.getButtonLogin().click();
    cy.url().should("include", "inventory.html");
  });
});
