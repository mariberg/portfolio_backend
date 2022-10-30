const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents() {
      // implement node event listeners here
    },
    baseUrl: "https://x9yxbl5ntc.execute-api.eu-west-2.amazonaws.com/prod/",
  },
  video: false,
  screenshotOnRunFailure: false
});
