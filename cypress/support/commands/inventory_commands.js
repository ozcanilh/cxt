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
 * @method verifyPricesSorted
 * @description Verify products are sorted by price in specified order
 * @param {String} sortOrder - Sort order: 'lohi' (low to high) or 'hilo' (high to low)
 */
Cypress.Commands.add('verifyPricesSorted', (sortOrder) => {
  cy.getProductPrices().then((prices) => {
    let sortedPrices;
    let logMessage;
    let separator;

    if (sortOrder === 'lohi') {
      sortedPrices = [...prices].sort((a, b) => a - b);
      logMessage = 'Prices are correctly sorted Low to High:';
      separator = ' < ';
    } else if (sortOrder === 'hilo') {
      sortedPrices = [...prices].sort((a, b) => b - a);
      logMessage = 'Prices are correctly sorted High to Low:';
      separator = ' > ';
    } else {
      throw new Error(`Invalid sort order: ${sortOrder}. Use 'lohi' or 'hilo'.`);
    }

    expect(prices).to.deep.equal(sortedPrices);
    cy.log(logMessage, prices.join(separator));
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
