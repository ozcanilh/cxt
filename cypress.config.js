const { defineConfig } = require('cypress');
const { beforeRunHook, afterRunHook } = require('cypress-mochawesome-reporter/lib');

module.exports = defineConfig({
  projectId: 'saucedemo-automation',
  env: {
    validUsername: 'standard_user',
    validPassword: 'secret_sauce',
    invalidUsername: 'invalid_user',
    invalidPassword: 'wrong_password',
  },
  retries: {
    runMode: 2,
    openMode: 0,
  },
  screenshotOnRunFailure: true,
  video: true,
  videosFolder: 'cypress/videos',
  screenshotsFolder: 'cypress/screenshots',
  waitForAnimations: true,
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 30000,
  viewportWidth: 1280,
  viewportHeight: 720,
  requestTimeout: 10000,
  responseTimeout: 30000,

  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'SauceDemo Test Report',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    overwrite: false,
    saveJson: true,
  },

  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    chromeWebSecurity: false,
    experimentalMemoryManagement: true,
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);

      on('before:run', async (details) => {
        console.log('🚀 Starting test run...');
        await beforeRunHook(details);
      });

      on('after:run', async (results) => {
        console.log('✅ Test run completed');
        if (results.totalFailed > 0) {
          console.error(`❌ ${results.totalFailed} test(s) failed`);
        } else {
          console.log(`✅ All ${results.totalPassed} tests passed!`);
        }
        await afterRunHook();
      });

      // Browser launch options for better performance
      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.family === 'chromium') {
          launchOptions.args.push('--disable-dev-shm-usage');
          launchOptions.args.push('--disable-gpu');
        }
        return launchOptions;
      });

      return config;
    },
  },
});
