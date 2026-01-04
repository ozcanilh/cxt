/**
 * Inventory Commands - Custom commands for inventory/product functionality
 */
import InventoryPage from '../../e2e/pages/inventoryPage';

const inventoryPage = new InventoryPage();

/**
 * @memberof cy
 * @method sortProducts
 * @description Sort products using dropdown
 * @param {String} sortOption - Sort option value (lohi, hilo, az, za)
 */
Cypress.Commands.add('sortProducts', (sortOption) => {
  cy.verifyElement(inventoryPage.getProductSortContainer());
  cy.selectDropdown(inventoryPage.getProductSortContainer(), sortOption);
});

/**
 * @memberof cy
 * @method sortProductsByPriceLowToHigh
 * @description Sort products by price (low to high)
 */
Cypress.Commands.add('sortProductsByPriceLowToHigh', () => {
  cy.sortProducts('lohi');
});

/**
 * @memberof cy
 * @method sortProductsByPriceHighToLow
 * @description Sort products by price (high to low)
 */
Cypress.Commands.add('sortProductsByPriceHighToLow', () => {
  cy.sortProducts('hilo');
});

/**
 * @memberof cy
 * @method getProductPrices
 * @description Get all product prices as numbers
 * @returns {Array} Array of prices as numbers
 */
Cypress.Commands.add('getProductPrices', () => {
  return cy.get(inventoryPage.getInventoryItemPrice()).then(($prices) => {
    const prices = [];
    $prices.each((index, element) => {
      const priceText = Cypress.$(element).text().replace('$', '');
      prices.push(parseFloat(priceText));
    });
    return cy.wrap(prices);
  });
});

/**
 * @memberof cy
 * @method verifyPricesSortedLowToHigh
 * @description Verify products are sorted by price from low to high
 */
Cypress.Commands.add('verifyPricesSortedLowToHigh', () => {
  cy.getProductPrices().then((prices) => {
    const sortedPrices = [...prices].sort((a, b) => a - b);
    expect(prices).to.deep.equal(sortedPrices);
    cy.log('Prices are correctly sorted Low to High:', prices.join(' < '));
  });
});

/**
 * @memberof cy
 * @method verifyPricesSortedHighToLow
 * @description Verify products are sorted by price from high to low
 */
Cypress.Commands.add('verifyPricesSortedHighToLow', () => {
  cy.getProductPrices().then((prices) => {
    const sortedPrices = [...prices].sort((a, b) => b - a);
    expect(prices).to.deep.equal(sortedPrices);
    cy.log('Prices are correctly sorted High to Low:', prices.join(' > '));
  });
});

/**
 * @memberof cy
 * @method verifyInventoryPageLoaded
 * @description Verify inventory page is fully loaded
 */
Cypress.Commands.add('verifyInventoryPageLoaded', () => {
  cy.verifyElement(inventoryPage.getInventoryContainer());
  cy.verifyElement(inventoryPage.getProductSortContainer());
  cy.verifyText(inventoryPage.getPageTitle(), 'Products');
  cy.get(inventoryPage.getInventoryItem()).should('have.length.greaterThan', 0);
});
