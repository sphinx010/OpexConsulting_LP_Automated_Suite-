const { defineConfig } = require('cypress')

module.exports = defineConfig({
reporter: 'mochawesome',
reporterOptions: {
  reportDir: 'cypress/reports',
  overwrite: false,
  html: false,
  json: true,
   timestamp: "mmddyyyy_HHMMss"
},

  e2e: {
    baseUrl: "https://opexconsult.com",

    viewportWidth: 1600,
    viewportHeight: 1280,

    setupNodeEvents(on, config) {
      // keep this empty unless you need plugins
      return config
    }
  }
})
