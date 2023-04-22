/// <reference types="cypress" />

import sauceDemoPage from "../pages/sauceDemo";

describe("Testing website sauce demo", () => {
  beforeEach(() => {
    cy.visit("https://www.saucedemo.com/");
    // cy.viewport(600, 900);
    cy.viewport(1600, 900);
  });

  it("should login with valid username and password", () => {
    sauceDemoPage.getUsername().type("standard_user").should("have.value", "standard_user");
    sauceDemoPage.getPassword().type("secret_sauce").should("have.value", "secret_sauce");
    sauceDemoPage.getButtonLogin().click()
    cy.url().should("include", "inventory.html")
  });

  it("can not login with invalid password", () => {
    sauceDemoPage.getUsername().type("standard_user").should("have.value", "standard_user");
    sauceDemoPage.getPassword().type("secretsauce").should("have.value", "secretsauce");
    sauceDemoPage.getButtonLogin().click()
    sauceDemoPage.getErrorMessage().should("contain" , "Epic sadface: Username and password do not match any user in this service")
  })

  it("can not login with locked out user" , () => {
    sauceDemoPage.getUsername().type("locked_out_user").should("have.value", "locked_out_user");
    sauceDemoPage.getPassword().type("secret_sauce").should("have.value", "secret_sauce");
    sauceDemoPage.getButtonLogin().click()
    sauceDemoPage.getErrorMessage().should("contain" , "Epic sadface: Sorry, this user has been locked out.")
  })

  it("should login with problem user" , () => {
    sauceDemoPage.getUsername().type("problem_user").should("have.value", "problem_user");
    sauceDemoPage.getPassword().type("secret_sauce").should("have.value", "secret_sauce");
    sauceDemoPage.getButtonLogin().click()
    cy.url().should("include", "inventory.html")
  })

  it("should login with performance glitch user" , () => {
    sauceDemoPage.getUsername().type("performance_glitch_user").should("have.value", "performance_glitch_user");
    sauceDemoPage.getPassword().type("secret_sauce").should("have.value", "secret_sauce");
    sauceDemoPage.getButtonLogin().click()
    cy.url().should("include", "inventory.html")
  })

  it("should be able to show 6 products" , () => {
    sauceDemoPage.getUsername().type("standard_user").should("have.value", "standard_user");
    sauceDemoPage.getPassword().type("secret_sauce").should("have.value", "secret_sauce");
    sauceDemoPage.getButtonLogin().click()
    cy.url().should("include", "inventory.html")
    sauceDemoPage.getProduct().should("have.length" ,6)
  })

  it("should be able to add product to shopping cart" , () => {
    sauceDemoPage.getUsername().type("standard_user").should("have.value", "standard_user");
    sauceDemoPage.getPassword().type("secret_sauce").should("have.value", "secret_sauce");
    sauceDemoPage.getButtonLogin().click()
    cy.url().should("include", "inventory.html")
    sauceDemoPage.getProduct().eq(0).should("contain","Sauce Labs Backpack")
    sauceDemoPage.getButtonAddCart().eq(0).click()
    sauceDemoPage.getShoppingCart().click()
    sauceDemoPage.getCartItem().should("contain","Sauce Labs Backpack")
  })

  it("should be able to add every product to shopping cart" , () => {
    sauceDemoPage.getUsername().type("standard_user").should("have.value", "standard_user");
    sauceDemoPage.getPassword().type("secret_sauce").should("have.value", "secret_sauce");
    sauceDemoPage.getButtonLogin().click()
    cy.url().should("include", "inventory.html")
    sauceDemoPage.getButtonAddCart().each(($el, index, $list) =>{
      cy.wrap($el).click()
    })
    sauceDemoPage.getCartBadge().should("contain","6")
  })

  it("should be able to delete product at shopping cart" , () => {
    sauceDemoPage.getUsername().type("standard_user").should("have.value", "standard_user");
    sauceDemoPage.getPassword().type("secret_sauce").should("have.value", "secret_sauce");
    sauceDemoPage.getButtonLogin().click()
    cy.url().should("include", "inventory.html")
    sauceDemoPage.getButtonAddCart().eq(1).click()
    sauceDemoPage.getShoppingCart().click()
    sauceDemoPage.getRemoveCartItem().click()
  })

  it("should be able to logout" , () => {
    sauceDemoPage.getUsername().type("standard_user").should("have.value", "standard_user");
    sauceDemoPage.getPassword().type("secret_sauce").should("have.value", "secret_sauce");
    sauceDemoPage.getButtonLogin().click()
    cy.url().should("include", "inventory.html")
    sauceDemoPage.getMenu().click()
    sauceDemoPage.getLogout().click()
    cy.url().should("include", "/")
  })

  it("should be able to show decription of product" , () => {
    sauceDemoPage.getUsername().type("standard_user").should("have.value", "standard_user");
    sauceDemoPage.getPassword().type("secret_sauce").should("have.value", "secret_sauce");
    sauceDemoPage.getButtonLogin().click()
    cy.url().should("include", "inventory.html")
    sauceDemoPage.getProductPict().eq(0).click()
    cy.url().should("include", "/inventory-item")
    sauceDemoPage.getProductDetailPict().should("be.visible")
    sauceDemoPage.getProductDetail().should("be.visible")
    sauceDemoPage.getProductDetailName().should("be.visible")
    sauceDemoPage.getProductDetailPrice().should("be.visible")
  })

  it("should be able to checkout product" , () => {
    sauceDemoPage.getUsername().type("standard_user").should("have.value", "standard_user");
    sauceDemoPage.getPassword().type("secret_sauce").should("have.value", "secret_sauce");
    sauceDemoPage.getButtonLogin().click()
    cy.url().should("include", "inventory.html")
    sauceDemoPage.getProduct().eq(0)
    sauceDemoPage.getButtonAddCart().eq(0).click()
    sauceDemoPage.getShoppingCart().click()
    sauceDemoPage.getButtonCheckout().click()
    cy.url().should("include","/checkout-step-one.html")
    sauceDemoPage.getFirstNameForm().type("Dian").should("have.value", "Dian");
    sauceDemoPage.getLastNameForm().type("Anggun").should("have.value", "Anggun");
    sauceDemoPage.getPostalForm().type("3661").should("have.value", "3661");
    sauceDemoPage.getButtonContinue().click()
    cy.url().should("include", "checkout-step-two.html")
    sauceDemoPage.getDetailCheckout().should("contain", "Checkout: Overview")
    sauceDemoPage.getTotalPay().should("be.visible")
    sauceDemoPage.getButtonFinish().click()
    cy.url().should("include", "checkout-complete.html")
    sauceDemoPage.getCompleteCheckout().should("contain", "Thank you for your order!")
  })

  it("should be able to cancel checkout product" , () => {
    sauceDemoPage.getUsername().type("standard_user").should("have.value", "standard_user");
    sauceDemoPage.getPassword().type("secret_sauce").should("have.value", "secret_sauce");
    sauceDemoPage.getButtonLogin().click()
    cy.url().should("include", "inventory.html")
    sauceDemoPage.getProduct().eq(0)
    sauceDemoPage.getButtonAddCart().eq(0).click()
    sauceDemoPage.getShoppingCart().click()
    sauceDemoPage.getButtonCheckout().click()
    cy.url().should("include","/checkout-step-one.html")
    sauceDemoPage.getFirstNameForm().type("Dian").should("have.value", "Dian");
    sauceDemoPage.getLastNameForm().type("Anggun").should("have.value", "Anggun");
    sauceDemoPage.getPostalForm().type("3661").should("have.value", "3661");
    sauceDemoPage.getButtonContinue().click()
    cy.url().should("include", "checkout-step-two.html")
    sauceDemoPage.getDetailCheckout().should("contain", "Checkout: Overview")
    sauceDemoPage.getCancelCheckout().click()
  })

  it("Should show error message if form fields are not filled " , () => {
    sauceDemoPage.getUsername().type("standard_user").should("have.value", "standard_user");
    sauceDemoPage.getPassword().type("secret_sauce").should("have.value", "secret_sauce");
    sauceDemoPage.getButtonLogin().click()
    cy.url().should("include", "inventory.html")
    sauceDemoPage.getProduct().eq(0)
    sauceDemoPage.getButtonAddCart().eq(0).click()
    sauceDemoPage.getShoppingCart().click()
    sauceDemoPage.getButtonCheckout().click()
    cy.url().should("include","/checkout-step-one.html")
    sauceDemoPage.getButtonContinue().click()
    sauceDemoPage.getErrorMessage().should("contain","Error: First Name is required")
  })

  it("Should show error message if form fields are not filled " , () => {
    sauceDemoPage.getUsername().type("standard_user").should("have.value", "standard_user");
    sauceDemoPage.getPassword().type("secret_sauce").should("have.value", "secret_sauce");
    sauceDemoPage.getButtonLogin().click()
    cy.url().should("include", "inventory.html")
    sauceDemoPage.getProduct().eq(0)
    sauceDemoPage.getButtonAddCart().eq(0).click()
    sauceDemoPage.getShoppingCart().click()
    sauceDemoPage.getButtonCheckout().click()
    cy.url().should("include","/checkout-step-one.html")
    sauceDemoPage.getFirstNameForm().type("Dian").should("have.value", "Dian");
    sauceDemoPage.getButtonContinue().click()
    sauceDemoPage.getErrorMessage().should("contain","Error: Last Name is required")
  })

  it("Should show error message if form fields are not filled " , () => {
    sauceDemoPage.getUsername().type("standard_user").should("have.value", "standard_user");
    sauceDemoPage.getPassword().type("secret_sauce").should("have.value", "secret_sauce");
    sauceDemoPage.getButtonLogin().click()
    cy.url().should("include", "inventory.html")
    sauceDemoPage.getProduct().eq(0)
    sauceDemoPage.getButtonAddCart().eq(0).click()
    sauceDemoPage.getShoppingCart().click()
    sauceDemoPage.getButtonCheckout().click()
    cy.url().should("include","/checkout-step-one.html")
    sauceDemoPage.getFirstNameForm().type("Dian").should("have.value", "Dian");
    sauceDemoPage.getLastNameForm().type("Anggun").should("have.value", "Anggun");
    sauceDemoPage.getButtonContinue().click()
    sauceDemoPage.getErrorMessage().should("contain","Error: Postal Code is required")
  })

  it("should be able to remove product" , () => {
    sauceDemoPage.getUsername().type("standard_user").should("have.value", "standard_user");
    sauceDemoPage.getPassword().type("secret_sauce").should("have.value", "secret_sauce");
    sauceDemoPage.getButtonLogin().click()
    cy.url().should("include", "inventory.html")
    sauceDemoPage.getButtonAddCart().each(($el, index, $list) =>{
      cy.wrap($el).click()
    })
    sauceDemoPage.getButtonRemove().eq(1).click()
    sauceDemoPage.getShoppingCart().click()
    sauceDemoPage.getListCart().not(':contains("Sauce Labs Bike Light")')
  })

  it("should be able to remove product" , () => {
    sauceDemoPage.getUsername().type("standard_user").should("have.value", "standard_user");
    sauceDemoPage.getPassword().type("secret_sauce").should("have.value", "secret_sauce");
    sauceDemoPage.getButtonLogin().click()
    cy.url().should("include", "inventory.html")
    sauceDemoPage.getButtonAddCart().each(($el, index, $list) =>{
      cy.wrap($el).click()
    })
    sauceDemoPage.getCartBadge().should("contain","6")
    sauceDemoPage.getMenu().click()
    sauceDemoPage.getReset().click()
    sauceDemoPage.getCartBadge().should("not.be.exist")
  })


  it("should be able to back into inventory page by click continue shopping" , () => {
    sauceDemoPage.getUsername().type("standard_user").should("have.value", "standard_user");
    sauceDemoPage.getPassword().type("secret_sauce").should("have.value", "secret_sauce");
    sauceDemoPage.getButtonLogin().click()
    cy.url().should("include", "inventory.html")
    sauceDemoPage.getButtonAddCart().eq(0).click()
    sauceDemoPage.getShoppingCart().click()
    cy.url().should("include", "cart.html")
    sauceDemoPage.getBackToShopping().click()
    cy.url().should("include", "inventory.html")
  })

  it("should redirect to about page" , () => {
    sauceDemoPage.getUsername().type("standard_user").should("have.value", "standard_user");
    sauceDemoPage.getPassword().type("secret_sauce").should("have.value", "secret_sauce");
    sauceDemoPage.getButtonLogin().click()
    cy.url().should("include", "inventory.html")
    sauceDemoPage.getMenu().click()
    sauceDemoPage.getAboutMenu().click()
    .should("have.attr", "href", "https://saucelabs.com/");
  })

})  