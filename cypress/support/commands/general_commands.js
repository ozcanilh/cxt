/**
 * General Commands - Reusable Cypress custom commands
 * These commands provide common functionality across all tests
 */

const addContext = require('mochawesome/addContext');

/**
 * @memberof cy
 * @method addContextTest
 * @description Add test context information for Mochawesome reports
 * @param {String} title - Context title
 * @param {String} value - Context value/description
 */
Cypress.Commands.add('addContextTest', (title, value) => {
  cy.once('test:after:run', (test) => {
    addContext({ test }, { title, value });
  });
});

/**
 * @memberof cy
 * @method clickElement
 * @description Click on a visible element
 * @param {String} element - CSS selector
 */
Cypress.Commands.add('clickElement', (element) => {
  cy.get(element).should('be.visible').click();
});

/**
 * @memberof cy
 * @method clickElementForce
 * @description Force click on an element (bypasses actionability checks)
 * @param {String} element - CSS selector
 */
Cypress.Commands.add('clickElementForce', (element) => {
  cy.get(element).should('be.visible').click({ force: true });
});

/**
 * @memberof cy
 * @method typeValue
 * @description Type text into an input field
 * @param {String} element - CSS selector
 * @param {String} value - Text to type
 */
Cypress.Commands.add('typeValue', (element, value) => {
  cy.get(element).should('be.visible').clear().type(value);
});

/**
 * @memberof cy
 * @method verifyText
 * @description Verify element contains specific text
 * @param {String} element - CSS selector
 * @param {String} text - Expected text
 */
Cypress.Commands.add('verifyText', (element, text) => {
  cy.get(element).should('be.visible').should('contain', text);
});

/**
 * @memberof cy
 * @method verifyElement
 * @description Verify element is visible and exists
 * @param {String} element - CSS selector
 */
Cypress.Commands.add('verifyElement', (element) => {
  cy.get(element).should('be.visible').should('exist');
});

/**
 * @memberof cy
 * @method verifyElementNotExist
 * @description Verify element does not exist
 * @param {String} element - CSS selector
 */
Cypress.Commands.add('verifyElementNotExist', (element) => {
  cy.get(element).should('not.exist');
});

/**
 * @memberof cy
 * @method clearInput
 * @description Clear input field
 * @param {String} element - CSS selector
 */
Cypress.Commands.add('clearInput', (element) => {
  cy.get(element).should('be.visible').clear();
});

/**
 * @memberof cy
 * @method selectDropdown
 * @description Select option from dropdown
 * @param {String} element - CSS selector
 * @param {String} value - Value to select
 */
Cypress.Commands.add('selectDropdown', (element, value) => {
  cy.get(element).should('be.visible').select(value);
});

/**
 * @memberof cy
 * @method verifyUrl
 * @description Verify current URL contains expected value
 * @param {String} expectedUrl - Expected URL or URL fragment
 */
Cypress.Commands.add('verifyUrl', (expectedUrl) => {
  cy.url().should('include', expectedUrl);
});

/**
 * @memberof cy
 * @method verifyAttributeValue
 * @description Verify element attribute has specific value
 * @param {String} element - CSS selector
 * @param {String} attribute - Attribute name
 * @param {String} value - Expected attribute value
 */
Cypress.Commands.add('verifyAttributeValue', (element, attribute, value) => {
  cy.get(element).should('have.attr', attribute, value);
});
