#  SauceDemo Test Automation Framework

[![Cypress Tests](https://img.shields.io/badge/tests-Cypress-brightgreen)](https://www.cypress.io/)
[![Page Object Model](https://img.shields.io/badge/pattern-Page%20Object%20Model-blue)](https://martinfowler.com/bliki/PageObject.html)
[![Mochawesome Reports](https://img.shields.io/badge/reports-Mochawesome-orange)](https://www.npmjs.com/package/mochawesome)
[![Prettier](https://img.shields.io/badge/code%20style-Prettier-ff69b4)](https://prettier.io/)

A comprehensive Cypress test automation framework for **SauceDemo** application, implementing best practices with Page Object Model design pattern, cross-browser testing, and multi-device support.

---

## Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Test Execution](#-test-execution)
- [Test Reports](#-test-reports)
- [Code Quality](#-code-quality)
- [Code Formatting](#-code-formatting)
- [CI/CD Integration](#-cicd-integration)
- [Slack Integration](#-slack-integration)
- [Test Cases](#-test-cases)
- [Contributing](#-contributing)

---

##  Overview

This project provides a robust test automation framework for the SauceDemo e-commerce application. It covers critical functionalities including:

- ✅ User authentication (login/logout)
- ✅ Product sorting by price (low to high, high to low)
- ✅ Multi-device testing (mobile, tablet, desktop)
- ✅ Cross-browser testing (Chrome, Firefox, Electron)
- ✅ Comprehensive test reporting with Mochawesome

**Application Under Test:** https://www.saucedemo.com

---

## Features

### Test Automation Features

-  **Page Object Model** - Maintainable and scalable test architecture
- **Chrome Browser Testing** - Optimized for Chrome (most used browser)
**Multi-Device Testing** - Mobile (375x667), Tablet (768x1024), Desktop (1280x720)
- **Custom Commands** - Reusable test functions for consistent execution
- **HTML Reports** - Beautiful Mochawesome reports with charts and screenshots
-  **Code Formatting** - Consistent code style with Prettier
- **CI/CD Ready** - GitHub Actions workflow included
- **Screenshots on Failure** - Automatic screenshot capture on test failures

### Framework Highlights

- No hardcoded waits - uses Cypress automatic waiting
- Environment variable configuration
- Parallel test execution (3 viewports)
- Comprehensive error handling
- Detailed test context in reports
- Slack integration for test notifications

---

## Project Structure

```
cxt/
├── .github/
│   └── workflows/
│       └── cypress-tests.yml        # CI/CD pipeline configuration
├── cypress/
│   ├── e2e/
│   │   ├── pages/                   # Page Object Models
│   │   │   ├── loginPage.js         # Login page selectors and methods
│   │   │   └── inventoryPage.js     # Inventory page selectors and methods
│   │   └── tests/                   # Test specifications
│   │       ├── login.cy.js          # Login test cases
│   │       └── inventory.cy.js      # Inventory page test cases
│   ├── fixtures/                    # Test data files
│   │   └── example.json
│   ├── reports/                     # Test reports (generated)
│   │   └── mochawesome/
│   ├── screenshots/                 # Screenshots on failure (generated)
│   ├── support/
│   │   ├── commands/                # Custom Cypress commands
│   │   │   ├── general_commands.js  # Generic reusable commands
│   │   │   ├── login_commands.js    # Login-specific commands
│   │   │   └── inventory_commands.js # Inventory-specific commands
│   │   └── e2e.js                   # Cypress configuration and imports
│   └── videos/                      # Test execution videos (generated)
├── .prettierrc                      # Prettier configuration
├── .prettierignore                  # Prettier ignore rules
├── cypress.config.js                # Cypress main configuration
├── package.json                     # Dependencies and scripts
└── README.md                        # This file
```

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18.x or higher)
- **npm** (version 9.x or higher)
- **Git** (for cloning the repository)

Check your versions:

```bash
node --version
npm --version
git --version
```

---

## Installation

### 1. Clone the Repository

```bash
cd cxt
```

### 2. Install Dependencies

```bash
npm install
```

This will install:

- Cypress (v15.8.1)
- Mochawesome Reporter
- Prettier
- All other required dependencies

### 3. Verify Installation

```bash
npx cypress verify
```

You should see: Verified Cypress!

---

##  Test Execution

### Interactive Mode (Cypress Test Runner)

Open Cypress Test Runner with a visual interface:

```bash
npm run cy:open
```

This allows you to:

- Select and run individual tests
- See real-time test execution
- Debug tests interactively
- Time-travel through test steps

### Headless Mode (CI/CD)

Run all tests in headless mode:

```bash
npm run cy:run
```

### Browser-Specific Execution

Run tests with Chrome:

```bash
npm run cy:chrome      # Chrome browser (default)
```

### Device/Viewport-Specific Execution

Run tests with specific viewport sizes:

```bash
npm run cy:mobile      # Mobile (375x667)
npm run cy:tablet      # Tablet (768x1024)
npm run cy:desktop     # Desktop (1280x720)
```

### Run Specific Test Files

Run only login tests:

```bash
npx cypress run --spec "cypress/e2e/tests/login.cy.js"
```

Run only inventory tests:

```bash
npx cypress run --spec "cypress/e2e/tests/inventory.cy.js"
```

### Run All Tests with Reports

Clean previous reports and run all tests:

```bash
npm run test:all
```

---

## Test Reports

### Report Locations

After test execution, reports are generated in:

```
cypress/
├── reports/
│   └── html/                # HTML reports with charts
│       ├── index.html       # Main report file (open in browser)
│       └── index.json       # JSON report data
├── screenshots/             # Screenshots on test failures
│   └── [test-name]/
│       └── [failure].png
└── videos/                  # Video recordings of test runs
    └── [test-name].mp4
```

### Viewing Reports

#### Mochawesome HTML Report

Open the report in your browser:

```bash
open cypress/reports/html/index.html
```

**Report Features:**

-  Test execution summary (passed/failed/pending)
- Interactive charts and graphs
- Test duration metrics
-  Embedded screenshots
-  Detailed test steps with context
-  Test case descriptions and rationale

#### Screenshots

Screenshots are automatically captured on test failures:

```bash
open cypress/screenshots/
```

#### Videos

View test execution videos:

```bash
open cypress/videos/
```

### Clean Reports

Remove all generated reports:

```bash
npm run clean-reports
```

---

##  Code Quality

### ESLint

This project uses **ESLint** with Airbnb base configuration for code quality:

```bash
npm run lint          # Check for linting errors
npm run lint:fix      # Auto-fix linting errors
```

**Configuration:**

- Extends Airbnb base configuration
- Cypress plugin enabled
- No-only-tests plugin (prevents committing .only tests)

### Husky & Lint-Staged

Git hooks are configured to ensure code quality:

**Pre-commit Hook:**

- Runs ESLint on staged files
- Runs Prettier check on staged files
- Prevents committing code with linting errors

**Setup:**

Husky is automatically installed via `npm install` (prepare script).

---

##  Code Formatting

This project uses **Prettier** for consistent code formatting.

### Configuration

Settings are defined in `.prettierrc`:

```json
{
  "semi": true,
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "trailingComma": "es5",
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

### Format Code

Format all JavaScript and JSON files:

```bash
npm run format
```

Check formatting without making changes:

```bash
npm run format:check
```

Format specific files:

```bash
npx prettier --write "cypress/e2e/tests/login.cy.js"
```

### IDE Integration

**VS Code:**

1. Install "Prettier - Code formatter" extension
2. Enable "Format on Save" in settings
3. Set Prettier as default formatter

**IntelliJ IDEA / WebStorm:**

1. Go to Settings → Languages & Frameworks → JavaScript → Prettier
2. Enable Prettier
3. Check "On save"

---

## Slack Integration

### Overview

This project includes Slack integration to automatically send test results to your Slack channel after each test run.

### Setup

1. **Create a Slack Incoming Webhook:**
   - Visit https://api.slack.com/messaging/webhooks
   - Create a new Slack app
   - Enable Incoming Webhooks
   - Add webhook to your desired channel (e.g., `#engineering-tests-results`)
   - Copy the webhook URL

2. **Add to GitHub Secrets:**
   - Go to your GitHub repository
   - Settings → Secrets and variables → Actions
   - Add new secret: `SLACK_WEBHOOK_URL`
   - Paste your webhook URL

3. **Test Locally (Optional):**

```bash
# Set environment variable
export SLACK_WEBHOOK_URL="your-webhook-url"

# Run tests
npm run cy:run

# Send notification
npm run send-slack
```

### Notification Content

Test results include:

- ✅/⚠️ Status (PASSED/FAILED)
- Test counts (Total, Passed, Failed, Skipped)
- Pass percentage
- Duration
- Browser and viewport information
- Branch and commit details
- Link to GitHub Actions run

### Example Notification

```
✅ SauceDemo Cypress Test Results
Status: PASSED | Total: 15 | Passed: 15 | Failed: 0 | Skipped: 0 | Pass %: 100% | Duration: 2.45 min
Browser: chrome | Viewport: 1280x720 | Branch: main | Commit: a1b2c3d | Run By: ozcan
View Details on GitHub Actions
```
---

## CI/CD Integration

### GitHub Actions

This project includes a comprehensive GitHub Actions workflow for automated testing.

**Workflow File:** `.github/workflows/cypress-tests.yml`

### Workflow Features

✅ **Parallel Execution:**

- 3 containers run simultaneously (Desktop 1280x720)
- Faster test execution with parallel processing

✅ **Report Merging:**

- Automatic merging of test reports from all containers
- Single consolidated HTML report

✅ **Automatic Artifacts:**

- Test reports
- Screenshots (on failure)
- Videos
- Slack notifications

✅ **Triggers:**

- Scheduled runs (weekdays at 9:00 UTC)
- Manual workflow dispatch

### Running in CI/CD

Tests automatically run when you:

```bash
git push origin main
```

Or create a pull request to main/master/develop.

### View Results

1. Go to your GitHub repository
2. Click "Actions" tab
3. Select the latest workflow run
4. View test results and download artifacts

### Manual Trigger

You can manually trigger the workflow from GitHub:

1. Go to Actions tab
2. Select "Cypress Tests" workflow
3. Click "Run workflow"

---

## Test Strategy Highlights

### Why These Tests?

#### Login Tests

**Rationale:**

-  Critical security feature
-  Gateway to all functionality
-  User experience foundation
-  Must work across all devices

#### Product Sorting Tests 

**Rationale:**

-  Directly impacts purchase decisions
- users rely on sorting/filtering
- higher conversion with effective sorting
-  Must be responsive across devices

### Testing Approach

- **Risk-based testing** - Focus on high-impact features
- **Page Object Model** - Maintainable architecture
- **Custom commands** - Reusable test logic
- **Multi-device** - Comprehensive coverage
- **No hardcoded waits** - Cypress automatic waiting
- **Detailed reporting** - Mochawesome with context

---

## Custom Commands

### General Commands

**File:** `cypress/support/commands/general_commands.js`

| Command               | Purpose                | Example                                           |
| --------------------- | ---------------------- | ------------------------------------------------- |
| `cy.clickElement()`   | Click visible element  | `cy.clickElement('[data-test="login"]')`          |
| `cy.typeValue()`      | Type text into field   | `cy.typeValue('[data-test="username"]', 'user')`  |
| `cy.verifyText()`     | Verify element text    | `cy.verifyText('.title', 'Products')`             |
| `cy.verifyElement()`  | Verify element exists  | `cy.verifyElement('.inventory_list')`             |
| `cy.selectDropdown()` | Select dropdown option | `cy.selectDropdown('[data-test="sort"]', 'lohi')` |

---
