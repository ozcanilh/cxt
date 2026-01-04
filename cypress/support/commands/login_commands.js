/**
 * Login Commands - Custom commands for login functionality
 */
import LoginPage from '../../e2e/pages/loginPage';
import InventoryPage from '../../e2e/pages/inventoryPage';

const loginPage = new LoginPage();
const inventoryPage = new InventoryPage();

/**
 * @memberof cy
 * @method login
 * @description Login to SauceDemo application (assumes already on login page)
 * @param {String} username - Username
 * @param {String} password - Password
 */
Cypress.Commands.add('login', (username, password) => {
  cy.typeValue(loginPage.getUsernameField(), username);
  cy.typeValue(loginPage.getPasswordField(), password);
  cy.clickElement(loginPage.getLoginButton());
  cy.verifyElement(inventoryPage.getInventoryContainer());
  cy.verifyUrl('/inventory.html');
});

/**
 * @memberof cy
 * @method attemptLogin
 * @description Attempt login without waiting for success (for negative tests)
 * @param {String} username - Username
 * @param {String} password - Password
 */
Cypress.Commands.add('attemptLogin', (username, password) => {
  cy.typeValue(loginPage.getUsernameField(), username);
  cy.typeValue(loginPage.getPasswordField(), password);
  cy.clickElement(loginPage.getLoginButton());
});

/**
 * @memberof cy
 * @method verifyLoginError
 * @description Verify login error message is displayed
 * @param {String} expectedMessage - Expected error message
 */
Cypress.Commands.add('verifyLoginError', (expectedMessage) => {
  cy.verifyElement(loginPage.getErrorMessage());
  cy.verifyText(loginPage.getErrorMessage(), expectedMessage);
});
