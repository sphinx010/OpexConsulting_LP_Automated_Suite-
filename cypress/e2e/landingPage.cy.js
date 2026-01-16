
///////////////////////////////////////////////////////////////////////TEST FILE: cypress/e2e/landingPage.cy.js//////////////////////////////////////////////////////////////////////
//Find the instructions to run specific tests at the bottom of this file
//Below is the main test file for Opex landing page tests
describe('Testing Opex landing page test features', function() {

  const navigations = require('../support/page_Objects/landingPageObject');

  beforeEach(function() {
    cy.visit('/');
  });

  // -------------------- SMOKE TESTS --------------------

  it('[SMOKE] confirms successful site launch', () => {
    navigations.verifySiteLaunch();
  });

  // -------------------- PRIMARY NAVIGATION --------------------

  it('[REGRESSION][INDUSTRIES] explores all industries navigation functionality', () => {
    navigations.exploreIndustries();
  });

  it('[REGRESSION][PRODUCTS] explores all products navigation functionality', () => {
    navigations.exploreProducts();
  });

  // -------------------- SERVICES NAVIGATION --------------------

  it('[REGRESSION][SERVICES] tests services navigation components (Business Assurance)', () => {
    navigations.testBusinessAssurance();
  });

  it('[REGRESSION][SERVICES] test services navigation components (Business Transformation)', () => {
    navigations.testBusinessTransformationServices();
  });

  it('[REGRESSION][SERVICES] test services navigation components (Engineering)', () => {
    navigations.testEngineeringServices();
  });

  it('[REGRESSION][SERVICES] tests services navigation components (Product)', () => {
    navigations.testProductServices();
  });

  // -------------------- TRAINING & ENROLLMENT --------------------

  it('[REGRESSION][TRAINING] tests services navigation components (Industry Bases Training navigation and enrollment)', () => {
    navigations.testIndustryBasedTrainingServices();
  });

  it('[REGRESSION][TRAINING] test services navigation components (Impact Based Training)', () => {
    navigations.testImpactBasedTrainingServices();
  });

  // -------------------- FORMS --------------------

  it('[REGRESSION][FORMS] tests Contact Us form functionality', () => {
    navigations.testContactUsForm();
  });

  // -------------------- SECURITY --------------------

  it('[SECURITY][XSS] test footer subscription email for cross-site scripting vulnerability', () => {
    navigations.testFooterSubscribeFormFieldxssProtection();
  });

  it('[SECURITY][XSS] test user enrollment form for cross-site scripting vulnerability', () => {
    navigations.testUserEnrollmentFormXSSProtection();
  });

  // -------------------- FOOTER --------------------

  it('[REGRESSION][FOOTER] tests footer subscription box functionality', () => {
    navigations.testFooterSubscribeFormFieldFunctionality();
  });

  // -------------------- INFORMATIONAL PAGES --------------------

  it('[REGRESSION][INFO] tests Who We Are components navigation', () => {
    navigations.testWhoWeAreComponents();
  });

  it('[FOCUS][EVENTS] tests Events components navigation', () => {
    navigations.testEventsComponents();
  });

  it('[REGRESSION][INFO] tests Insights components navigation', () => {
    navigations.testInsightsComponents();
 });
});

//////////////////////////////////////////////////////////////////////NOTE TO TESTERS/////////////////////////////////////////////////////////////////////
// : Run in terminal using the following commands to execute specific tags or test files:
// -npx cypress run  Will run all tests in headless mode
// -npx cypress open  Will open Cypress Test Runner in interactive mode
//  - npx cypress run --env grep=SMOKE
//  - npx cypress run --env grep=SECURITY
//  - npx cypress run --env grep=FOCUS
//  - npx cypress run --env grep=REGRESSION
//  - npx cypress run --env grep=NAV
//  - npx cypress run --env grep=FORMS
//  - npx cypress run --env grep=FOOTER
//  - npx cypress run --env grep="SECURITY|SMOKE "
//   Example above is to run multiple tags of choice 
//  - To run a single test file: npx cypress run --spec "cypress/e2e/landingPage.cy.js"
//  - To run headed (visible) mode: npx cypress run --headed --spec "cypress/e2e/landingPage.cy.js"
//  - To run in interactive mode: npx cypress open  --env grep=SMOKE
//  - To record tests to Cypress Dashboard: npx cypress run --record --key <record-key> --env grep=SMOKE
//  - To generate Mochawesome report: npx cypress run --env grep=SMOKE --reporter mochawesome
//  - To generate Mochawesome report and record to Cypress Dashboard: 
//      npx cypress run --record --key <record-key> --env grep=SMOKE --reporter mochawesome
//  --- Thank You -- 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////