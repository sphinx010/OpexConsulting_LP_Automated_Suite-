// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:


import './commands'
import addContext from 'mochawesome/addContext'

Cypress.on('test:after:run', (test, runnable) => {
  if (test.state !== 'failed') return

  const fullTitle = runnable.titlePath().slice(1).join(' -- ')
  const screenshotFile = `${fullTitle} (failed).png`

  // Report HTML lives in: cypress/reports/html/
  // Screenshots copied into: cypress/reports/html/screenshots/
  const reportRelativePath = `screenshots/${Cypress.spec.name}/${screenshotFile}`

  addContext({ test }, reportRelativePath)
})






//////////////////////////////
//Runs after every test
// Automatically screenshots only failures
// Works in local runs + CI
// Gets picked up by Mochawesome automatically
//////////////////////////////