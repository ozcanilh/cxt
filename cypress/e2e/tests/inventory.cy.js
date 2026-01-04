/**
 * Inventory Page Test Suite
 * Tests the inventory page functionality including product sorting
 * Covers sorting by price (low to high and high to low)
 */

describe('SauceDemo - Inventory Page Tests', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.verifyElement('.login_logo');
    cy.login(Cypress.env('validUsername'), Cypress.env('validPassword'));
    cy.verifyInventoryPageLoaded();
  });

  it('Sort products by price - Low to High', () => {
    cy.addContextTest(
      'Test Description',
      'Test Steps:' +
        '\n1. Login to SauceDemo with valid credentials' +
        '\n2. Verify inventory page is loaded' +
        '\n3. Select "Price (low to high)" from sort dropdown' +
        '\n4. Verify prices are sorted in ascending order' +
        '\n5. Log the sorted prices for verification' +
        '\n\nTest Rationale: This test validates the price sorting functionality (low to high), ensuring users can effectively filter products by price. This is a critical e-commerce feature that helps users find affordable options.' +
        '\nExpected Behavior: Products should be displayed with lowest price first, ascending to highest price.' +
        '\n\nTest Script last modified by: Ozcan'
    );
    cy.sortProducts('lohi');
    cy.verifyPricesSorted('lohi');
  });

  it('Sort products by price - High to Low', () => {
    cy.addContextTest(
      'Test Description',
      'Test Steps:' +
        '\n1. Login to SauceDemo with valid credentials' +
        '\n2. Verify inventory page is loaded' +
        '\n3. Select "Price (high to low)" from sort dropdown' +
        '\n4. Verify prices are sorted in descending order' +
        '\n5. Log the sorted prices for verification' +
        '\n\nTest Rationale: This test validates the price sorting functionality (high to low), ensuring users can effectively filter products by price. This feature is important for users looking for premium or higher-priced items.' +
        '\nExpected Behavior: Products should be displayed with highest price first, descending to lowest price.' +
        '\n\nTest Script last modified by: Ozcan'
    );
    cy.sortProducts('hilo');
    cy.verifyPricesSorted('hilo');
  });
});
