/// <reference types="cypress" />
import { faker } from "@faker-js/faker";
import sauceDemoPage from "../pages/sauceDemo";

describe("Testing website sauce demo", () => {
  beforeEach(() => {
    cy.visit("https://www.saucedemo.com/");
    // cy.viewport(600, 900);
    cy.viewport(1600, 900);

    // do login
    sauceDemoPage.login(Cypress.env("VALID_USERNAME"), Cypress.env("VALID_PASSWORD"));
  });

  it("should be able to show 6 products", () => {
    cy.url().should("include", "inventory.html");
    sauceDemoPage.getProduct().should("have.length", 6);
  });

  it("should be able to add product to shopping cart", () => {
    cy.url().should("include", "inventory.html");
    sauceDemoPage.getProduct().eq(0).should("contain", "Sauce Labs Backpack");
    sauceDemoPage.getButtonAddCart().eq(0).click();
    sauceDemoPage.getShoppingCart().click();
    sauceDemoPage.getCartItem().should("contain", "Sauce Labs Backpack");
  });

  it("should be able to add every product to shopping cart", () => {
    cy.url().should("include", "inventory.html");
    sauceDemoPage.getButtonAddCart().each(($el, index, $list) => {
      cy.wrap($el).click();
    });
    sauceDemoPage.getCartBadge().should("contain", "6");
  });

  it("should be able to delete product at shopping cart", () => {
    cy.url().should("include", "inventory.html");
    sauceDemoPage.getButtonAddCart().eq(1).click();
    sauceDemoPage.getShoppingCart().click();
    sauceDemoPage.getRemoveCartItem().click();
  });

  it("should be able to logout", () => {
    cy.url().should("include", "inventory.html");
    sauceDemoPage.getMenu().click();
    sauceDemoPage.getLogout().click();
    cy.url().should("include", "/");
  });

  it("should be able to show decription of product", () => {
    cy.url().should("include", "inventory.html");
    sauceDemoPage.getProductPict().eq(0).click();
    cy.url().should("include", "/inventory-item");
    sauceDemoPage.getProductDetailPict().should("be.visible");
    sauceDemoPage.getProductDetail().should("be.visible");
    sauceDemoPage.getProductDetailName().should("be.visible");
    sauceDemoPage.getProductDetailPrice().should("be.visible");
  });

  it("should be able to checkout product", () => {
    cy.url().should("include", "inventory.html");
    sauceDemoPage.getProduct().eq(0);
    sauceDemoPage.getButtonAddCart().eq(0).click();
    sauceDemoPage.getShoppingCart().click();
    sauceDemoPage.getButtonCheckout().click();
    cy.url().should("include", "/checkout-step-one.html");
    sauceDemoPage.getFirstNameForm().type("Dian").should("have.value", "Dian");
    sauceDemoPage.getLastNameForm().type("Anggun").should("have.value", "Anggun");
    sauceDemoPage.getPostalForm().type("3661").should("have.value", "3661");
    sauceDemoPage.getButtonContinue().click();
    cy.url().should("include", "checkout-step-two.html");
    sauceDemoPage.getDetailCheckout().should("contain", "Checkout: Overview");
    sauceDemoPage.getTotalPay().should("be.visible");
    sauceDemoPage.getButtonFinish().click();
    cy.url().should("include", "checkout-complete.html");
    sauceDemoPage.getCompleteCheckout().should("contain", "Thank you for your order!");
  });

  it("should be able to cancel checkout product", () => {
    const firstname = faker.name.firstName();
    const lastname = faker.name.lastName();
    const postalCode = faker.address.zipCode();

    cy.url().should("include", "inventory.html");
    sauceDemoPage.getProduct().eq(0);
    sauceDemoPage.getButtonAddCart().eq(0).click();
    sauceDemoPage.getShoppingCart().click();
    sauceDemoPage.getButtonCheckout().click();
    cy.url().should("include", "/checkout-step-one.html");
    sauceDemoPage.getFirstNameForm().type(firstname, { delay: 300 }).should("have.value", firstname);
    sauceDemoPage.getLastNameForm().type(lastname, { delay: 300 }).should("have.value", lastname);
    sauceDemoPage.getPostalForm().type(postalCode, { delay: 300 }).should("have.value", postalCode);
    sauceDemoPage.getButtonContinue().click();
    cy.url().should("include", "checkout-step-two.html");
    sauceDemoPage.getDetailCheckout().should("contain", "Checkout: Overview");
    sauceDemoPage.getCancelCheckout().click();
  });

  it("Should show error message if form fields are not filled ", () => {
    cy.url().should("include", "inventory.html");
    sauceDemoPage.getProduct().eq(0);
    sauceDemoPage.getButtonAddCart().eq(0).click();
    sauceDemoPage.getShoppingCart().click();
    sauceDemoPage.getButtonCheckout().click();
    cy.url().should("include", "/checkout-step-one.html");
    sauceDemoPage.getButtonContinue().click();
    sauceDemoPage.getErrorMessage().should("contain", "Error: First Name is required");
  });

  it("Should show error message if form fields are not filled ", () => {
    cy.url().should("include", "inventory.html");
    sauceDemoPage.getProduct().eq(0);
    sauceDemoPage.getButtonAddCart().eq(0).click();
    sauceDemoPage.getShoppingCart().click();
    sauceDemoPage.getButtonCheckout().click();
    cy.url().should("include", "/checkout-step-one.html");
    sauceDemoPage.getFirstNameForm().type("Dian").should("have.value", "Dian");
    sauceDemoPage.getButtonContinue().click();
    sauceDemoPage.getErrorMessage().should("contain", "Error: Last Name is required");
  });

  it("Should show error message if form fields are not filled ", () => {
    cy.url().should("include", "inventory.html");
    sauceDemoPage.getProduct().eq(0);
    sauceDemoPage.getButtonAddCart().eq(0).click();
    sauceDemoPage.getShoppingCart().click();
    sauceDemoPage.getButtonCheckout().click();
    cy.url().should("include", "/checkout-step-one.html");
    sauceDemoPage.getFirstNameForm().type("Dian").should("have.value", "Dian");
    sauceDemoPage.getLastNameForm().type("Anggun").should("have.value", "Anggun");
    sauceDemoPage.getButtonContinue().click();
    sauceDemoPage.getErrorMessage().should("contain", "Error: Postal Code is required");
  });

  it("should be able to remove product", () => {
    cy.url().should("include", "inventory.html");
    sauceDemoPage.getButtonAddCart().each(($el, index, $list) => {
      cy.wrap($el).click();
    });
    sauceDemoPage.getButtonRemove().eq(1).click();
    sauceDemoPage.getShoppingCart().click();
    sauceDemoPage.getListCart().not(':contains("Sauce Labs Bike Light")');
  });

  it("should be able to remove product", () => {
    cy.url().should("include", "inventory.html");
    sauceDemoPage.getButtonAddCart().each(($el, index, $list) => {
      cy.wrap($el).click();
    });
    sauceDemoPage.getCartBadge().should("contain", "6");
    sauceDemoPage.getMenu().click();
    sauceDemoPage.getReset().click();
    sauceDemoPage.getCartBadge().should("not.be.exist");
  });

  it("should be able to back into inventory page by click continue shopping", () => {
    cy.url().should("include", "inventory.html");
    sauceDemoPage.getButtonAddCart().eq(0).click();
    sauceDemoPage.getShoppingCart().click();
    cy.url().should("include", "cart.html");
    sauceDemoPage.getBackToShopping().click();
    cy.url().should("include", "inventory.html");
  });

  it("should redirect to about page", () => {
    cy.url().should("include", "inventory.html");
    sauceDemoPage.getMenu().click();
    sauceDemoPage.getAboutMenu().click().should("have.attr", "href", "https://saucelabs.com/");
  });

  it.only("should able to sort the pricing by asc", () => {
    cy.wrap([]).as("prices");

    sauceDemoPage.getProduct().each(($el, index, $list) => {
      cy.wrap($el)
        .find(".inventory_item_price")
        .invoke("text")
        .then((text) => {
          cy.get("@prices").then((price) => {
            const validPrice = Number(text.replace("$", ""));
            price.push(validPrice);
          });
        });
    });

    cy.get("@prices").then((prices) => {
      prices.sort((a, b) => a - b);
    });

    sauceDemoPage.getFilter().select(2);

    cy.get("@prices").then((prices) => {
      sauceDemoPage.getProduct().each(($el, index, $list) => {
        cy.wrap($el)
          .find(".inventory_item_price")
          .invoke("text")
          .then((actualPrice) => {
            expect(`$${prices[index]}`).to.equal(actualPrice);
          });
      });
    });
  });

  it.only("should able to sort the pricing by desc", () => {
    cy.wrap([]).as("prices");

    sauceDemoPage.getProduct().each(($el, index, $list) => {
      cy.wrap($el)
        .find(".inventory_item_price")
        .invoke("text")
        .then((text) => {
          cy.get("@prices").then((prices) => {
            const validPrice = Number(text.replace("$", ""));
            prices.push(validPrice);
          });
        });
    });

    cy.get("@prices").then((prices) => {
      prices.sort((a, b) => b - a);
    });

    sauceDemoPage.getFilter().select(3);

    cy.get("@prices").then((prices) => {
      sauceDemoPage.getProduct().each(($el, index, $list) => {
        cy.wrap($el)
          .find(".inventory_item_price")
          .invoke("text")
          .then((actualPrice) => {
            expect(`$${prices[index]}`).to.equal(actualPrice);
          });
      });
    });
  });
});
