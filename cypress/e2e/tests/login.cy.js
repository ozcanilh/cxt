/**
 * Login Test Suite
 * Tests the login functionality of SauceDemo application
 * Covers positive and negative login scenarios
 */

describe('SauceDemo - Login Tests', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.verifyElement('.login_logo');
    cy.verifyText('.login_logo', 'Swag Labs');
  });

  it('Successfully login with valid credentials [no-login]', () => {
    cy.addContextTest(
      'Test Description',
      'Test Steps:' +
        '\n1. Visit the SauceDemo login page' +
        '\n2. Verify login page is loaded' +
        '\n3. Enter valid username: standard_user' +
        '\n4. Enter valid password: secret_sauce' +
        '\n5. Click the login button' +
        '\n6. Verify user is redirected to inventory page' +
        '\n7. Verify inventory page contains products' +
        '\n8. Verify page title is "Products"' +
        '\n\nTest Rationale: This test validates the core login functionality with valid credentials, ensuring users can successfully authenticate and access the application.' +
        '\n\nTest Script last modified by: Ozcan'
    );

    cy.login(Cypress.env('validUsername'), Cypress.env('validPassword'));
    cy.verifyInventoryPageLoaded();
  });

  it('Verify login with invalid username [no-login]', () => {
    cy.addContextTest(
      'Test Description',
      'Test Steps:' +
        '\n1. Visit the SauceDemo login page' +
        '\n2. Enter invalid username: invalid_user' +
        '\n3. Enter valid password: secret_sauce' +
        '\n4. Click the login button' +
        '\n5. Verify error message is displayed' +
        '\n6. Verify error message contains: "Epic sadface: Username and password do not match any user in this service"' +
        '\n7. Verify user remains on login page' +
        '\n\nTest Rationale: This negative test ensures the application properly handles invalid username attempts and provides appropriate error feedback.' +
        '\n\nTest Script last modified by: Ozcan'
    );

    cy.attemptLogin(Cypress.env('invalidUsername'), Cypress.env('validPassword'));
    cy.verifyLoginError(
      'Epic sadface: Username and password do not match any user in this service'
    );
    cy.verifyUrl('/');
  });

  it('Verify login with invalid password [no-login]', () => {
    cy.addContextTest(
      'Test Description',
      'Test Steps:' +
        '\n1. Visit the SauceDemo login page' +
        '\n2. Enter valid username: standard_user' +
        '\n3. Enter invalid password: wrong_password' +
        '\n4. Click the login button' +
        '\n5. Verify error message is displayed' +
        '\n6. Verify error message contains: "Epic sadface: Username and password do not match any user in this service"' +
        '\n7. Verify user remains on login page' +
        '\n\nTest Rationale: This negative test ensures the application properly handles invalid password attempts and prevents unauthorized access.' +
        '\n\nTest Script last modified by: Ozcan'
    );

    cy.attemptLogin(Cypress.env('validUsername'), Cypress.env('invalidPassword'));
    cy.verifyLoginError(
      'Epic sadface: Username and password do not match any user in this service'
    );
    cy.verifyUrl('/');
  });

  it('Verify login with empty username [no-login]', () => {
    cy.addContextTest(
      'Test Description',
      'Test Steps:' +
        '\n1. Visit the SauceDemo login page' +
        '\n2. Leave username field empty' +
        '\n3. Enter valid password: secret_sauce' +
        '\n4. Click the login button' +
        '\n5. Verify error message is displayed' +
        '\n6. Verify error message contains: "Epic sadface: Username is required"' +
        '\n7. Verify user remains on login page' +
        '\n\nTest Rationale: This test validates required field validation for username, ensuring proper error handling for empty fields.' +
        '\n\nTest Script last modified by: Ozcan'
    );

    cy.typeValue('[data-test="password"]', Cypress.env('validPassword'));
    cy.clickElement('[data-test="login-button"]');
    cy.verifyLoginError('Epic sadface: Username is required');
    cy.verifyUrl('/');
  });

  it('Verify login with empty password [no-login]', () => {
    cy.addContextTest(
      'Test Description',
      'Test Steps:' +
        '\n1. Visit the SauceDemo login page' +
        '\n2. Enter valid username: standard_user' +
        '\n3. Leave password field empty' +
        '\n4. Click the login button' +
        '\n5. Verify error message is displayed' +
        '\n6. Verify error message contains: "Epic sadface: Password is required"' +
        '\n7. Verify user remains on login page' +
        '\n\nTest Rationale: This test validates required field validation for password, ensuring proper error handling for empty fields.' +
        '\n\nTest Script last modified by: Ozcan'
    );

    cy.typeValue('[data-test="username"]', Cypress.env('validUsername'));
    cy.clickElement('[data-test="login-button"]');
    cy.verifyLoginError('Epic sadface: Password is required');
    cy.verifyUrl('/');
  });

  it('Successfully login with valid credentials - Mobile [no-login, mobile]', () => {
    cy.addContextTest(
      'Test Description',
      'Test Steps:' +
        '\n1. Set viewport to mobile size (375x667)' +
        '\n2. Visit the SauceDemo login page' +
        '\n3. Verify login page is loaded' +
        '\n4. Enter valid username: standard_user' +
        '\n5. Enter valid password: secret_sauce' +
        '\n6. Click the login button' +
        '\n7. Verify user is redirected to inventory page' +
        '\n8. Verify inventory page is responsive on mobile' +
        '\n\nTest Rationale: This test validates login functionality on mobile devices, ensuring responsive design and mobile compatibility.' +
        '\n\nTest Script last modified by: Ozcan'
    );

    cy.viewport(375, 667);
    cy.login(Cypress.env('validUsername'), Cypress.env('validPassword'));
    cy.verifyInventoryPageLoaded();
  });
});
