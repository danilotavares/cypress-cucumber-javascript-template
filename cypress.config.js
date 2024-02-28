const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");

async function setupNodeEvents(on, config) {
  await preprocessor.addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    createBundler({
      plugins: [createEsbuildPlugin.default(config)],
    })
  );

  return config;
}

module.exports = defineConfig({
  e2e: {
    specPattern: "**/*.feature",
    chromeWebSecurity: true,
    defaultCommandTimeout: 80000,
    pageLoadTimeout: 80000,
    video: false,
    screenshotOnRunFailure: false,
    experimentalModifyObstructiveThirdPartyCode: true,
    viewportWidth: 1366,
    viewportHeight: 768,
    retries: 2,
    reporter: "junit",
    reporterOptions: {
      mochaFile: "cypress/cucumber-results/results-[hash].xml",
      toConsole: true,
    },
    setupNodeEvents,
  }
})