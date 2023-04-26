/// <reference types="cypress" />

class sauceDemoPage {
  getUsername() {
    return cy.get('[data-test="username"]');
  }

  getPassword() {
    return cy.get('[data-test="password"]');
  }

  getButtonLogin() {
    return cy.get('[data-test="login-button"]');
  }

  getErrorMessage() {
    return cy.get('[data-test="error"]');
  }

  getProduct() {
    return cy.get(".inventory_item");
  }

  getShoppingCart() {
    return cy.get(".shopping_cart_link");
  }

  getCartItem() {
    return cy.get(".cart_item");
  }

  getCartBadge() {
    return cy.get(".shopping_cart_badge");
  }

  getMenu() {
    return cy.get("#react-burger-menu-btn");
  }

  getLogout() {
    return cy.get("#logout_sidebar_link");
  }

  getFilter() {
    return cy.get('[data-test="product_sort_container"]');
  }

  getProductName() {
    return cy.get(".inventory_item_name");
  }

  getProductPict() {
    return cy.get(".inventory_item_img");
  }

  getButtonCheckout() {
    return cy.get('[data-test="checkout"]');
  }

  getFirstNameForm() {
    return cy.get('[data-test="firstName"]');
  }

  getLastNameForm() {
    return cy.get('[data-test="lastName"]');
  }

  getPostalForm() {
    return cy.get('[data-test="postalCode"]');
  }

  getButtonContinue() {
    return cy.get('[data-test="continue"]');
  }

  getDetailCheckout() {
    return cy.get(".title");
  }

  getTotalPay() {
    return cy.get(".summary_total_label");
  }

  getButtonFinish() {
    return cy.get('[data-test="finish"]');
  }
  getCompleteCheckout() {
    return cy.get("#checkout_complete_container");
  }

  getCancelCheckout() {
    return cy.get('[data-test="cancel"]');
  }

  getListCart() {
    return cy.get(".cart_list");
  }

  getReset() {
    return cy.get("#reset_sidebar_link");
  }

  getBackToShopping() {
    return cy.get('[data-test="continue-shopping"]');
  }

  getAboutMenu() {
    return cy.get("#about_sidebar_link");
  }

  getProductDetail() {
    return cy.get(".inventory_details_desc");
  }

  getProductDetailName() {
    return cy.get(".inventory_details_name");
  }

  getProductDetailPrice() {
    return cy.get(".inventory_details_price");
  }

  getProductDetailPict() {
    return cy.get(".inventory_details_img");
  }

  login(username, password) {
    this.getUsername().type(username).should("have.value", username);
    this.getPassword().type(password).should("have.value", password);
    this.getButtonLogin().click();
  }
}

export default new sauceDemoPage();
