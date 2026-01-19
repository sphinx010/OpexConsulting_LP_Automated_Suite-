


---

# 🌎 Opex Consulting – Cypress Automation Framework

![CI](https://github.com/sphinx010/OpexConsulting_LP_Automated_Suite-/actions/workflows/cypress.yml/badge.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18-green)
![Cypress](https://img.shields.io/badge/cypress-automation-brightgreen)
![License](https://img.shields.io/badge/license-ISC-blue)

---

## 📌 Framework Overview

This repository contains a **production-grade End-to-End test automation framework** built with **Cypress** to validate the Opex Consulting website.

The framework validates:

✔ Navigation flows
✔ UI content
✔ Forms & submissions
✔ Cross-domain routing
✔ Security (XSS & malicious inputs)
✔ Automated reporting
✔ CI execution with GitHub Actions
✔ Artifact generation (HTML reports, screenshots)

---

## 🛠 Technology Stack
| Tool           | Purpose             |
|----------------|---------------------|
| Cypress        | UI Test Automation  |
| JavaScript     | Test Development    |
| Mochawesome    | Test Reporting      |
| Node.js        | Runtime Environment |
| GitHub Actions | CI/CD Pipeline      |
| Git            | Version Control     |

---

## 📂 Project Structure

```
OpexTest__Automation
│
├─ .github
│   └─ workflows
│       └─ cypress.yml       # CI pipeline
│
├─ cypress
│   ├─ e2e                   # Test specs
│   ├─ support               # Hooks & commands
│   ├─ fixtures              # Test data
│   ├─ screenshots           # Failure screenshots
│   ├─ videos                # Run recordings
│   └─ reports               # Mochawesome output
│
├─ scripts
│   ├─ injectText.js         # Custom report branding
│   └─ copyScreenshots.js    # Attach screenshots
│
├─ cypress.config.js
├─ package.json
└─ README.md
```

---

## 🧪 Test Coverage

### Navigation

* Industries
* Products
* Services
* Events
* Who We Are

### Forms

* Contact Us
* Enrollment
* Footer subscription

### Security

* XSS payload injection
* HTML injection
* SQL-like payloads
* Input validation

### Training & External

* Industry Based Training
* Impact Based Training (Academy redirects)

---

## ⚙ Setup Instructions

###  Install Node.js

Download:

```
https://nodejs.org
```

Verify:

```bash
node -v
npm -v
```

---

### Clone Repository

```bash
git clone https://github.com/sphinx010/OpexConsulting_LP_Automated_Suite-.git
cd OpexConsulting_LP_Automated_Suite-
```

---

### Install Dependencies

```bash
npm install
```

---

## ▶ Running Tests Guide

### Open Cypress UI

```bash
npx cypress open
```

### Run headless

```bash
npm run cy:run
```

### Run full pipeline

```bash
npm run test:ci
```
### Merge Json Reports

```bash
npm run report:merge
```

### Generate HTML reports

```bash
npm run report:generate
```

### Add Custom INFO & Branding

```bash
npm run report:customize
```

### Embed Screenshots 

```bash
npm run report:copy:screenshots
```


### Storage Management

```bash
npm run clean:reports
```


This command:
✔ Cleans reports
✔ Runs tests
✔ Merges JSON
✔ Generates HTML
✔ Injects branding
✔ Attaches screenshots

---

## 📊 Reporting

## 📈 CI Analytics (Last 30 Runs)

> Updated automatically by GitHub Actions after each run.

```
Analytics (Last 30 Runs)
```

![Pass rate trend](https://raw.githubusercontent.com/sphinx010/OpexConsulting_LP_Automated_Suite-/gh-pages/charts/pass_rate.svg)
![Duration trend](https://raw.githubusercontent.com/sphinx010/OpexConsulting_LP_Automated_Suite-/gh-pages/charts/duration.svg)
![Failures trend](https://raw.githubusercontent.com/sphinx010/OpexConsulting_LP_Automated_Suite-/gh-pages/charts/failures.svg)

 Upload mochawesom artifacts here for live analytics:
[View Live Analytics here...](https://opexqaanalytics.netlify.app/)






After execution:

```
cypress/reports
```

You will get:

* HTML report
* JSON data
* Screenshots (on failure)

---

## Custom Report Branding

we inject a custom banner into reports:

✔ Project name
✔ Engineer name
✔ Environment

Script:

```
scripts/injectText.js
```

---

## 📸 Screenshots & Videos

| Type        | Location               |
| ----------- | ---------------------- |
| Screenshots | `cypress/screenshots/` |
| Videos      | `cypress/videos/`      |

Screenshots auto-capture on failures.

---

## ⚙ CI/CD – GitHub Actions

Pipeline runs on:

* Push
* Pull Requests

### CI Steps

1. Install dependencies
2. Run Cypress
3. Generate report
4. Upload artifacts

Artifacts:

* HTML report
* Screenshots

Download:

```
GitHub → Actions → Run → Artifacts
```

---

## 📦 Artifacts Generated

| Name               | Purpose          |
| ------------------ | ---------------- |
| mochawesome-report | HTML report      |
| screenshots        | Failure evidence |

---

## 🏗 Architecture

```text
Developer
   |
   v
GitHub Push
   |
   v
GitHub Actions
   |
   v
Node + Cypress
   |
   v
Browser Automation
   |
   v
Mochawesome Reports
   |
   v
Artifacts (HTML, Screenshots)
```

---

## 📈 Metrics Tracked

✔ Pass/Fail rate
✔ Execution time
✔ Regression stability
✔ Coverage growth

---

## 🔐 Security Validation

The framework validates:

* Script injection
* HTML injection
* Malicious payloads
* Input sanitization

---

## Available exe Scripts

```bash
npm run cy:run
npm run test:ci
npm run clean:reports
npm run report:merge
npm run report:generate
npm run report:customize
npm run report:copy:screenshots
```

---

## 🧹 Clean Reports or Clear old Artifacts

```bash
npm run clean:reports
```

##  Executed by

**Ayooluwa Paul Obembe**
QA Automation Engineer

---

## ⭐ Future Enhancements

* Test analytics dashboard
* Slack notifications
* Email reports
* Docker execution
* Parallel runs
* Cloud grids

---

##  Final Notes

This framework:

✔ Scalable
✔ CI-ready
✔ Enterprise-grade
✔ Easy to extend

---

###  Ready for Production Testing



---


