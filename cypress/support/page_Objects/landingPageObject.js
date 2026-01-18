class Navigations {
  // Navbar elements - Getters
  get industriesButton() {
    return  cy.contains('button', 'Industries');
  }

  get productsButton() {
    return cy.contains('button','Products');
  }

  get servicesButton() {
    return cy.contains('button','Services');
  }


  get aboutUsButton() {
    return cy.contains('button', 'Who We Are');
  }

  get eventsButton() {
    return cy.contains('button', 'Events');
  }

  get insightsButton() {
    return cy.contains('a.text-sm','Insights');
  }

  get contactUsButton() {
    return cy.get('.fixed > div.hidden > .rounded-full');
  }

  get getInTouchButton() {
    return cy.contains('Get in touch');
  }

  get readMoreButton() {
    return cy.contains('Read More');
  }

  get productLogo() {
    return cy.get('.flex-shrink-0 > .object-cover');
  }

  static industriesComponents = [
    { name: "Financial Institutions", url: "fininst", label: "Financial Institutions" },
    { name: "Fintechs", url: "fintech", label: "Fintech" },
    { name: "Regulators", url: "reg", label: "Regulators" },
    { name: "Logistics", url: "log", label: "Logistics" },
    { name: "Oil and Gas", url: "og", label: "Oil and Gas" },
    { name: "Technology", url: "tech", label: "Technology" },
    { name: "Education", url: "edu", label: "Education" },
    { name: "Agriculture", url: "agric", label: "Agriculture" }
  ];

static servicesComponents = {
  "Strategy & Governance": [
    { name: ".font-semibold > .flex-1", label: "capabilities?capability=bus-ass&tab=1" },
    { name: ".hidden > .space-y-4 > :nth-child(3)", label: "capabilities?capability=bus-ass&tab=2" },
    { name: ".hidden > .space-y-4 > :nth-child(4)", label: "capabilities?capability=bus-ass&tab=3" },
    { name: ".hidden > .space-y-4 > :nth-child(5)", label: "capabilities?capability=bus-ass&tab=4" }
  ],
  "Business Transformation": [
    { name: ".hidden > .space-y-4 > .font-semibold", label: "capabilities?capability=bus-trans&tab=1" },
    { name: ".text-gray-600", label: "capabilities?capability=bus-trans&tab=2" }
  ],
  "Engineering": [
    { name: ".space-y-4 > .font-semibold", label: "capabilities?capability=eng&tab=1" },
    { name: ".hidden > .space-y-4 > :nth-child(3)", label: "capabilities?capability=eng&tab=2" },
    { name: ".space-y-4 > :nth-child(4)", label: "capabilities?capability=eng&tab=3" },
    { name: ".space-y-4 > :nth-child(5)", label: "capabilities?capability=eng&tab=4" }
  ],
  "Product": [
    { name: ".hidden > .space-y-4 > :nth-child(2)", label: "capabilities?capability=prod&tab=1" },
    { name: ".hidden > .space-y-4 > :nth-child(3)", label: "capabilities?capability=prod&tab=2" },
    { name: " .hidden > .space-y-4 > :nth-child(4)", label: "capabilities?capability=prod&tab=3" },
    { name: ".space-y-4 > :nth-child(5)", label: "capabilities?capability=prod&tab=4" },
    { name: ".space-y-4 > :nth-child(6)", label: "capabilities?capability=prod&tab=5" },
    { name: ".space-y-4 > :nth-child(7)", label: "capabilities?capability=prod&tab=6" }
  ],
  "Industry Based Training": [
    //Information security and management systems ISO27001
    { name: ".overflow-y-auto > .font-semibold", label: "capabilities?capability=ind-train&tab=1&view=detailed" },
    //ISO 27032 Lead Cybersecurity Manager
    { name: ".overflow-y-auto > :nth-child(2)", label: "capabilities?capability=ind-train&view=detailed&tab=2" },
    //ISO 27017 Lead Cloud Security Manager
    { name: ".overflow-y-auto > :nth-child(3)", label: "capabilities?capability=ind-train&view=detailed&tab=3" },
    //ISO 22301 Lead Business Continuity Manager
    { name: ".overflow-y-auto > :nth-child(4)", label: "capabilities?capability=ind-train&view=detailed&tab=4" },
    //ISO 20000 Lead IT Service Management
    { name: ".overflow-y-auto > :nth-child(5)", label: "capabilities?capability=ind-train&view=detailed&tab=5" },
    //ISO 9001 Quality Management
    { name: ".overflow-y-auto > :nth-child(6)", label: "capabilities?capability=ind-train&view=detailed&tab=6" },
    //PROJECT MANAGEMENT PROFESSIONAL PMP
    { name: ".overflow-y-auto > :nth-child(7)", label: "capabilities?capability=ind-train&view=detailed&tab=7" },
    //CYBERSECURITY
    { name: ".overflow-y-auto > :nth-child(8)", label: "capabilities?capability=ind-train&view=detailed&tab=8" },
    //COBIT 2019 FOUNDATION
    { name: ".overflow-y-auto > :nth-child(9)", label: "capabilities?capability=ind-train&view=detailed&tab=9" },
    //THE OPEN GROUP ARCHITECTURE FORUM TOGAF 9.2
    { name: ".overflow-y-auto > :nth-child(10)", label: "capabilities?capability=ind-train&view=detailed&tab=10" },
    //NDPR | GDPR DATA PROTECTION TRAINING AND ACCREDITATION
    { name: ".overflow-y-auto > :nth-child(11)", label: "capabilities?capability=ind-train&view=detailed&tab=11" },
    //SECURE CODING TRAINING (APPLICATIONS SECURITY MANAGEMENT)
    { name: ".overflow-y-auto > :nth-child(12)", label: "capabilities?capability=ind-train&view=detailed&tab=12" },
    //DEVOPS
    { name: ".overflow-y-auto > :nth-child(13)", label: "capabilities?capability=ind-train&view=detailed&tab=13" },
    //CISSP CERTIFIED INFORMATION SYSTEMS SECURITY PROFESSIONAL
    { name: ".overflow-y-auto > :nth-child(14)", label: "capabilities?capability=ind-train&view=detailed&tab=14" },
    //ISO 45001 OCCUPATIONAL HEALTH & SAFETY MANAGEMENT SYSTEM
    { name: ".overflow-y-auto > :nth-child(15)", label: "capabilities?capability=ind-train&view=detailed&tab=15" },
    //CMMI DEV L3 (CAPABILITY MATURITY MODEL INTEGRATION L3)
    { name: ".overflow-y-auto > :nth-child(16)", label: "capabilities?capability=ind-train&view=detailed&tab=16" }
  ],
  "Impact Based Training": [
    { name: ".group", button: ".inline-block", label: "academy.opexconsult.com", isExternal: true }
  ]
};

 aboutUsComponents = [{"Who We Are":[
        "About Us",
        "Leadership",
        "Our Partners",
        "Our Policies",
        "VISIT PAGE"
    ]}];
  // Helper getters
  industriesDropdownItem(industry) {
    return cy.contains(industry);
  }

  productsDropdownItem(product) {
    return cy.contains(product);
  }

  productLabel(label) {
    return cy.contains(label);
  }
// click items
  clickItem(service) {
    return cy.contains(service);
  }

  //Action Methods
// Change this to find the element and type into it
typeIntoElement(selector, text) {
  cy.get(selector).should('be.visible').clear().type(text);
  return this;
}

getElement(selector) {
  return cy.get(selector);
}
  

  // Setters
  clickItem(item) {
    cy.contains(item).click();
  }
clickElements(element) {
    cy.get(element).click();
  }
  pageElements(element) {
    return cy.get(element);
  }
// Navigation click methods
  clickIndustriesButton() {
    this.industriesButton.click();
  }

  clickProductsButton() {
    this.productsButton.click();
  }

  clickServicesButton() {
    this.servicesButton.click();
  }

  clickAboutUsButton() {
    this.aboutUsButton.click();
  }

  clickEventsButton() {
    this.eventsButton.click();
  }

  clickInsightsButton() {
    this.insightsButton.click();
  }

  clickContactUsButton() {
    this.contactUsButton.click();
  }

  clickIndustryItem(industry) {
    this.industriesDropdownItem(industry).click();
  }

  clickProductItem(product) {
    this.productsDropdownItem(product).click();
  }

  clickReadMoreButton() {
    this.readMoreButton.click();
  }

  clickProductLogo() {
    this.productLogo.click();
  }

  // ////////SMOKE /////Verify landing page loads successfully with all key elements
  verifySiteLaunch() {
    cy.log('Verifying that the Site is up and running');
    this.verifyTextIsVisible('Get in touch');
    this.verifyTextIsVisible('Industries');
    this.verifyTextIsVisible('Products');
    this.verifyTextIsVisible('Services');
    cy.log('✅✅✅ Site Launch Verification Complete');
    return this;
  }

  ////// Testing ALL INDUSTRIES COMPONENTS functionality ////////
  exploreIndustries() {
  cy.log('🧪 Test to confirm all Industries components are fully functional');
  cy.contains('.space-x-8 > :nth-child(1) > span', 'Industries').click()

  Navigations.industriesComponents.forEach((industry, index) => {
    cy.log(`Testing Industry ${index + 1}/${Navigations.industriesComponents.length}: ${industry.name}`);

    // Wrap everything in a single chain
    cy.wrap(null).then(() => {
      cy.log(`   → Clicking on: ${industry.name}`);
      this.clickIndustryItem(industry.name);

      cy.log(`   → Verifying URL contains: industries?industry=${industry.url}`);
      this.verifyUrlContains(`industries?industry=${industry.url}`);

      cy.log(`   → Verifying text visible: ${industry.label}`);
      this.verifyTextIsVisible(industry.label);

      cy.log(`   → Clicking Read More button`);
      this.clickReadMoreButton();

      cy.log(`   → Verifying redirected to Insight page`);
      this.verifyUrlContains('Insight');

      cy.log(`   → Reopening Industries dropdown for next iteration`);
      this.clickIndustriesButton();

      cy.log(`✅ Industry ${industry.name} ${index + 1} completed successfully\n`);
    })

    // Add a slight delay (e.g., 500ms) between iterations
    .wait(600)
  });

  cy.wrap(null).then(() => {
    cy.log('✅✅✅ Industries Exploration Complete');
  });
}

  // Products components
  static productsComponents = [
    { name: "RegTech365", label: "Checkout RegTech365 For More" },
    { name: "FarmsAgora", label: "Checkout FarmsAgora For More" },
    { name: "OpexA", label: "Checkout OpexA For More" }
  ];

exploreProducts(){
this.clickProductsButton()
const items = Navigations.productsComponents
  cy.wrap(items).each((item, index) => {
    cy.log(` Tab ${index + 1}`);
    cy.wait(1000);
    cy.contains('button', item.name)     
      .click()
      cy.contains('body', item.label).should('be.visible');
  });
    cy.log('✅✅✅  Test Complete')


}

/////Business Assurance[SERVICES]///////
testBusinessAssurance() {
  cy.log('🧪Testing Business Assurance');
  this.clickServicesButton();
  this.clickItem('Strategy & Governance');

  const items = Navigations.servicesComponents["Strategy & Governance"];

  cy.wrap(items).each((item, index) => {

    cy.log(` Tab ${index + 1}`);
    cy.wait(1000);
    cy.get(item.name)     
      .click()
      cy.url()
      .should('include', item.label);
  });
    cy.log('✅✅✅  Test Complete')
}


////////////////Business Transformation [SERVICES]////////
testBusinessTransformationServices() {
  cy.log('🧪Testing Business Transformation Services');
   this.clickServicesButton();
  this.clickItem('Strategy & Governance');
  cy.wait(1000);
  this.clickElements(".flex > :nth-child(2) > .block")
  const items = Navigations.servicesComponents["Business Transformation"];
  cy.wrap(items).each((item, index) => {

    cy.log(` Tab ${index + 1}`);

    cy.get(item.name)     
      .click()
      cy.url()
      .should('include', item.label);
  });
    cy.log('✅✅✅  Test Complete')
}

////////////////////test CONTACT US form functionality and error handling/////////////
testContactUsForm() {
  cy.log('🧪 Contact Us Form Functionality Test');
  this.clickContactUsButton();
  cy.wait(2000);
  // Action: Fill out contact us form
  this.typeIntoElement('[name="name"]', Navigations.goodInputs.fullName);
  this.typeIntoElement('[name="email"]', Navigations.goodInputs.standardEmail); 
  this.getElement('[name="title"]').select('Mr');
  this.getElement('[name="title"]').should('have.value', 'mr');
  this.typeIntoElement('[name="company"]', Navigations.goodInputs.companyName);
  this.typeIntoElement('[name="role"]', Navigations.goodInputs.jobTitle);

  // Handling the Dropdown/Select field
  this.getElement('[name="purpose"]').select('Consultation'); 
  
  // Verification
  this.getElement('[name="purpose"]').should('have.value', 'consultation');
  this.typeIntoElement('[name="message"]', 'Hello Opex, this is a test to ensure your contact form works correctly ;-) Yours Truly Ayooluwa.');
 cy.contains('button', 'Submit').click();
 //assertion for recaptcha error message for form automation attempts
this.getElement('body')
  .contains('Please complete the reCAPTCHA', { timeout: 8000 })
  .should('be.visible');
  cy.log('✅✅✅ Contact Us Form Functionality Test Complete');
}
 
//////////////////////////////////DATA HANDLING INPUTS//////////////////////////////////////////////////
static goodInputs = {
  fullName: "John Alexander Doe",
  firstName: "John",
  lastName: "Doe",
   standardTitle: ['Mr', 'Mrs', 'Esq', 'Pastor', 'Ms. '],
  standardEmail: "john.doe@opexconsult.com",
  jobTitle: "QA Engineer",
  companyName: "Opex Consulting Ltd",
  phone: "+234 812 345 6789",
  message: "I am interested in exploring Strategy and Governance services for our Q4 digital transformation roadmap. Please reach out with available consultation slots.",
  purpose: "Consultation"
};

static invalidInputs = {
  invalidEmail: "john.doe@opexconsult", // Missing TLD
  shortName: "J", // Too short 
  numericName: "John123", // Contains numbers
  specialCharName: "John@Doe", // Contains special characters
  longName: "J".repeat(256), // Excessively long name
  longMessage: "A".repeat(2001), // Excessively long message
  invalidPhone: "123ABC4567" // Contains letters
};

static badInputs = {
  scriptPayload: `<script>alert('xss')</script>`,
  htmlPayload: `<img src=x onerror=alert(1)>`,
  sqlPayload: `' OR 1=1 --`,
xssEmail: `tester<script>alert(1)</script>me@example.com`,
  xssHtmlMessage: `<script>document.body.innerHTML='HACKED'</script>`
};




////////////////////////////////////Industry Based Training Services////////////////////////////////////////////////////////////
testIndustryBasedTrainingServices() {
  cy.log('🧪 Testing Industry Based Training Services');
 this.clickServicesButton();  
 this.clickItem('Strategy & Governance');
  cy.wait(2000);
  this.clickElements(":nth-child(5) > .block") 
  cy.wait(3000);
  this.getElement(
  'body > div.mt-\\[65px\\].w-full > main > div > div > div.flex-grow > div > div > div:nth-child(1) > div > div.p-6 > div.flex.gap-4.mt-auto.pt-4.border-t.border-\\[\\#89B5D9\\]\\/20'
)
  .find('button')
  .contains('Learn More')
  .should('be.visible')
  .click();
  const items = Navigations.servicesComponents["Industry Based Training"];
  cy.wrap(items).each((item, index) => {
    cy.log(` Tab ${index + 1}`);
    cy.get(item.name)     
      .click()
      cy.url()
      .should('include', item.label);
  });
  cy.wait(1000);
    this.clickElements(":nth-child(5) > .block") 
  cy.wait(3000);
  this.getElement('div.p-6')
  .contains('button', 'Enroll Now')
  .should('be.visible')
  .click();
  this.typeIntoElement('#firstName', Navigations.goodInputs.firstName);
  this.typeIntoElement('#lastName', Navigations.goodInputs.lastName);
  this.typeIntoElement('#email', Navigations.goodInputs.standardEmail);
  this.typeIntoElement('#phone', Navigations.goodInputs.phone);
  this.typeIntoElement('#company', Navigations.goodInputs.companyName);
  this.typeIntoElement('#role', Navigations.goodInputs.jobTitle);
  cy.contains('button', 'Register Now')
  .should('be.visible')
  .and('not.be.disabled')
  .click();
 this.verifyTextIsVisible('Registration Confirmed', { timeout: 50000 })
  cy.log('✅✅✅  Test Complete')
}

/////////Product Services//////////////
testProductServices() {
 cy.log('🧪  Product Services Testing ');
 this.clickServicesButton();
  this.clickItem('Strategy & Governance');
  cy.wait(1000);
  this.clickElements(":nth-child(4) > .block")
  const items = Navigations.servicesComponents["Product"];
  cy.wrap(items).each((item, index) => {
    cy.log(` Tab ${index + 1}`);
    cy.get(item.name)     
      .click()
      cy.url()
      .should('include', item.label);
  });
  cy.log('✅✅✅  Test Complete')
}

///////////Engineering Services////////////
testEngineeringServices() {
  cy.log('🧪 Testing Engineering Services');
 this.clickServicesButton();
  this.clickItem('Strategy & Governance');
  cy.wait(1000);
  this.clickElements(":nth-child(3) > .block")
  const items = Navigations.servicesComponents["Engineering"];
  cy.wrap(items).each((item, index) => {
    cy.log(` Tab ${index + 1}`);
    cy.get(item.name)     
      .click()
      cy.url()
      .should('include', item.label);
  });
    cy.log('✅✅✅  Test Complete')
}


//////////////Impact Based Training Services///////////////////////
testImpactBasedTrainingServices() {
  cy.log('🧪 Verifying Academy navigation via network intercept');

  cy.intercept(
    {
      method: 'GET',
      url: 'https://academy.opexconsult.com/**',
      resourceType: 'document',
    }
  ).as('academyNavigation');

  this.clickServicesButton();
  this.clickItem('Strategy & Governance');
  this.clickElements(':nth-child(6) > .block');

  const items = Navigations.servicesComponents["Impact Based Training"];

  cy.wrap(items).each((item, index) => {
    cy.log(`🧪 Tab ${index + 1}`);

    this.clickElements(item.name);

    cy.get(item.button)
      .invoke('removeAttr', 'target')
      .click();
      
    // ASSERT NAVIGATION ATTEMPT 
    cy.url('https://academy.opexconsult.com/').should('include', 'https://academy.opexconsult.com/');
    // Reset state
    cy.visit('https://opexconsult.com/capabilities?capability=imp-base&tab=1');
  });

  cy.log('✅✅✅Impact Based Training Academy navigation verified via intercept and works as expected');
}

//////////Who We Are Components//////////////////////
static wWAtabNames=[
  "About Us",
  "Leadership", 
  "Our Partners",
  "Our Policies"
]

static whoWeAreComponents = [
    //Leadership components
    { name: ".flex > :nth-child(2) > .block", endPoint: "who-we-are?section=leadership" },
    //Our Partners components
    { name: ":nth-child(3) > .block", endPoint: "who-we-are?section=partners" },
    //Our Policies components
    { name: ":nth-child(4) > .block", endPoint: "who-we-are?section=policy" }
  ];


testWhoWeAreComponents() {
  cy.log('🧪 Testing Who We Are Components');
 this.clickAboutUsButton();  
  cy.wait(1000);
  cy.log(` Clicking on: ${Navigations.wWAtabNames[0]}`);
  this.clickElements('.flex-grow > .flex-col > :nth-child(1)');
  this.verifyUrlContains('who-we-are?section=about-us');
  const items = Navigations.whoWeAreComponents;
  cy.wrap(items).each((item, index) => {
    cy.log(` Tab ${index + 1}`);  
    cy.log(` Resolving: ${Navigations.wWAtabNames[index + 1]}`);
    cy.get(item.name)     
      .click()
      cy.url()
      .should('include', item.endPoint);
  });
    cy.log('✅✅✅  Test Complete')
}

static testEventsComponents = ['.p-6 > .font-sans', 'Who We Are']
//Events Components
testEventsComponents() {
  cy.log('🧪 Testing Events Components');
  this.clickEventsButton();  
  cy.wait(1000);
  cy.get(Navigations.testEventsComponents[0]);
  cy.contains(Navigations.testEventsComponents[1]).should('be.visible');
  cy.log('✅✅✅  Test Complete')
}

static insightsRepo = ['.text-3xl', 'Resources and insights', 'Insight']
//Test insights components navigation
testInsightsComponents() {
  cy.log('🧪 Testing Insights Components Navigation');
  this.clickInsightsButton();  
  cy.wait(1000);
  cy.contains(Navigations.insightsRepo[0], Navigations.insightsRepo[1]);
  this.verifyUrlContains(Navigations.insightsRepo[2]);
  cy.log('✅✅✅  Test Complete')
}

/////////////////////////////////////////////////////////////////////Security Test Methods/////////////////////////////////////////////////////////////////////

// Footer subscription form XSS protection test
testFooterSubscribeFormFieldxssProtection() {
   cy.log('🧪 Testing Footer Subscription Form Security Check');
   this.typeIntoElement('input[placeholder="Enter your Email', Navigations.badInputs.xssEmail)
  cy.wait(1000);
  cy.contains('button', 'Subscribe').should('be.visible').click();
  this.getElement('body').contains('Subscribed').should('not.exist')

  // Test specific endpoint that handles subscriptions
 
 //cy.intercept('POST', '**/subscribe**').as('subscribeRequest');
 //cy.wait('@subscribeRequest').then((interception) => {
   // expect(interception.response.statusCode).to.not.eq(200);
  //});
}

//testing enrollment form for security vulnerabilities
testUserEnrollmentFormXSSProtection() {
  cy.log('🧪 Testing User Enrollment Form XSS / Malicious Input Test');
 this.clickServicesButton();  
 this.clickItem('Strategy & Governance');
  cy.wait(3000);
  this.clickElements(":nth-child(5) > .block") 
  cy.wait(3000);
  this.getElement('div.p-6')
  .contains('button', 'Enroll Now')
  .should('be.visible')
  .click();
  this.typeIntoElement('#firstName', Navigations.invalidInputs.specialCharName);
  this.typeIntoElement('#lastName', Navigations.invalidInputs.numericName);
  this.typeIntoElement('#email', Navigations.goodInputs.standardEmail);
  this.typeIntoElement('#phone', Navigations.goodInputs.phone);
  this.typeIntoElement('#company', Navigations.badInputs.scriptPayload);
  this.typeIntoElement('#role', Navigations.goodInputs.jobTitle);
  cy.contains('button', 'Register Now')
  .should('be.visible')
  .and('not.be.disabled')
  .click();
cy.wait(12000);
cy.get('body').should('not.contain', 'Registration Confirmed')
cy.log('✅✅✅  Test Complete');
}

testFooterSubscribeFormFieldFunctionality() {
  cy.log('🧪 Testing Footer Subscription mail functionality');
 this.clickServicesButton();  
 this.clickItem('Strategy & Governance');
  cy.wait(3000);
  this.typeIntoElement('input[placeholder="Enter your Email"]', Navigations.goodInputs.standardEmail);
  cy.contains('button', 'Subscribe').should('be.visible').click();
  // Test specific endpoint that handles subscriptions
  cy.intercept('POST', '**/subscribe**').as('subscribeRequest');
  cy.wait('@subscribeRequest').then((interception) => {
    expect(interception.response.statusCode).to.eq(200);
  })
  cy.log('❌❌❌Subscription form failed functionality test');
  
  // 1. Setup the API Intercept before the action happens
  cy.log('✅✅✅ Footer Subscription box functionality test complete'); 
}
  ///////////////////////////////////////////////////////////////////////Assertion Methods///////////////////////////////////////////////////////////////////////////////////
  verifyElementIsVisible(element) {
    element.should('be.visible');
    return this;
  }

  verifyTextIsVisible(text) {
    cy.contains(text).should('be.visible');
    return this;
  }

  verifyUrlContains(url) {
    cy.url().should('include', url);
    return this;
  }

  // Navigation Methods
  navigateToHomePage() {
    cy.visit('/');
    return this;
  }

  // Data Methods
  setTestData(key, value) {
    cy.wrap(null).then(() => {
      Cypress.env(key, value);
    });
    return this;
  }

  getTestData(key) {
    return Cypress.env(key);
  }
}

// Export the class for use in test files
module.exports = new Navigations();
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////