/**
 * LoginPage - Page Object Model for SauceDemo Login Page
 * Contains all selectors and getter methods for the login page elements
 */
class LoginPage {
  constructor() {
    this.elements = {
      usernameField: '[data-test="username"]',
      passwordField: '[data-test="password"]',
      loginButton: '[data-test="login-button"]',
      errorMessage: '[data-test="error"]'
    };
  }

  getUsernameField() {
    return this.elements.usernameField;
  }

  getPasswordField() {
    return this.elements.passwordField;
  }

  getLoginButton() {
    return this.elements.loginButton;
  }

  getErrorMessage() {
    return this.elements.errorMessage;
  }
}

export default LoginPage;
