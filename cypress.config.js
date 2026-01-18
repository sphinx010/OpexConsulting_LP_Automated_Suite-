const { defineConfig } = require('cypress')

module.exports = defineConfig({
  //TOP//
screenshotOnRunFailure: true,
screenshotsFolder: 'cypress/screenshots',
  reporter: 'cypress-mochawesome-reporter',
  //MID//
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: false,
    json: true,
    embeddedScreenshots: true,
    screenshotOnRunFailure: true,
    inlineAssets: true,
    timestamp: 'mmddyyyy_HHMMss'
  },

  e2e: {
    baseUrl: "https://opexconsult.com",
    viewportWidth: 1600,
    viewportHeight: 1280,

    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on)
      return config
    }
  }
})
