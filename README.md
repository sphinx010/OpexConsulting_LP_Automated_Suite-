# Opex Consulting – Cypress Automation Framework
---

## 📌 Framework Overview

This repository contains a **production-grade End-to-End test automation framework** built with **Cypress** to validate the Opex Consulting website.

The framework is designed and structured to mirror **real enterprise QA automation practices**, with strong emphasis on **CI-driven execution, reporting, analytics, and security validation**.

The framework validates:

✔ End-to-end navigation flows
✔ UI content and layout consistency
✔ Forms and user submissions
✔ Cross-domain routing and external redirects
✔ Security vulnerabilities (XSS & malicious inputs)
✔ Automated reporting and metrics generation
✔ CI execution with GitHub Actions
✔ Artifact generation (HTML reports, JSON data, screenshots)

---

## 🛠 Technology Stack

| Tool           | Purpose             |
| -------------- | ------------------- |
| Cypress        | UI Test Automation  |
| JavaScript     | Test Development    |
| Mochawesome    | Test Reporting      |
| Node.js        | Runtime Environment |
| GitHub Actions | CI/CD Pipeline      |
| Git            | Version Control     |

---

## 📂 Project Structure

```text
OpexTest__Automation
│
├─ .github/
│  └─ workflows/
│     └─ cypress.yml
│
├─ cypress/
│  ├─ e2e/
│  │  └─ landingPage.cy.js
│  ├─ fixtures/
│  │  └─ landingPage.json
│  ├─ reports/
│  │  ├─ Bug_REPORT_R1/
│  │  └─ screenshots/
│  ├─ screenshots/
│  │  └─ landingPage.cy.js/
│  └─ support/
│     ├─ page_object_model/
│     │  └─ landingPageObject.js
│     ├─ commands.js
│     └─ e2e.js
│
├─ scripts/
│  ├─ copyScreenshots.js
│  ├─ generateMetrics.js
│  ├─ injectText.js
│  └─ renderCharts.js
│
├─ cypress.config.js
├─ package.json
├─ package-lock.json
├─ OPEX_LANDING_PAGE_Automation_BUG_REPORT.pdf
└─ README.md
```

---

## 🧪 Test Coverage

### Navigation

• Industries
• Products
• Services
• Events
• Who We Are

### Forms

• Contact Us
• Enrollment
• Footer subscription

### Security

• XSS payload injection
• HTML injection
• SQL-like payloads
• Input validation

### Training & External

• Industry Based Training
• Impact Based Training (Academy redirects)

---

## ⚙ Setup Instructions

### Install Node.js

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

### Run Headless

```bash
npm run cy:run
```

### Run Full CI Pipeline

```bash
npm run test:ci
```

### Merge JSON Reports

```bash
npm run report:merge
```

### Generate HTML Reports

```bash
npm run report:generate
```

### Add Custom Info & Branding

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

This workflow:

✔ Cleans previous reports
✔ Executes tests
✔ Merges JSON output
✔ Generates HTML reports
✔ Injects custom branding
✔ Attaches screenshots to reports

---

## 📊 Reporting

## 📈 CI Analytics (Last 30 Runs)

> Automatically updated by GitHub Actions after each workflow execution.

```
Analytics (Last 30 Runs)
```

![Pass rate trend](https://raw.githubusercontent.com/sphinx010/OpexConsulting_LP_Automated_Suite-/gh-pages/charts/pass_rate.svg)

![Duration trend](https://raw.githubusercontent.com/sphinx010/OpexConsulting_LP_Automated_Suite-/gh-pages/charts/duration.svg)

![Failures trend](https://raw.githubusercontent.com/sphinx010/OpexConsulting_LP_Automated_Suite-/gh-pages/charts/failures.svg)

➡ **Live Analytics App (upload ********`debug.json`******** for interactive insights):**
[https://opexqaanalytics.netlify.app/](https://opexqaanalytics.netlify.app/)

---

After execution, the following artifacts are available under:

```text
cypress/reports
```

• HTML test report
• JSON metrics data
• Screenshots on failure
• Live analytics rendered directly in the README

---

## 🧩 Custom Report Branding

A custom banner is dynamically injected into the reports, including:

✔ Project name
✔ Engineer name
✔ Environment

Script responsible:

```text
scripts/injectText.js
```

---

## 📸 Screenshots & Videos

| Type        | Location               |
| ----------- | ---------------------- |
| Screenshots | `cypress/screenshots/` |
| Videos      | `cypress/videos/`      |

Screenshots are automatically captured on test failures.

---

## ⚙ CI/CD – GitHub Actions

The pipeline runs on:

• Push events
• Pull requests

### CI Steps

1. Install dependencies
2. Execute Cypress tests
3. Generate reports
4. Upload artifacts

Artifacts available for download:

• HTML report
• Screenshots

Path:

```text
GitHub → Actions → Workflow Run → Artifacts
```

---

## 📦 Artifacts Generated

| Name               | Purpose          |
| ------------------ | ---------------- |
| mochawesome-report | HTML test report |
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
README Live Analytics (per run)
   |
   v
Artifacts (HTML, Screenshots)
```

---

## 📈 Metrics Tracked

✔ Pass / Fail rate
✔ Execution time
✔ Regression stability
✔ Coverage growth

---

## 🔐 Security Validation

The framework validates against:

• Script injection attacks
• HTML injection
• Malicious payloads
• Input sanitization

---

## 📜 Available NPM Scripts

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

## 🧹 Clean Reports or Clear Old Artifacts

```bash
npm run clean:reports
```

---

## 👤 Executed By

**Ayooluwa Paul Obembe**
QA Automation Engineer

---

## ⭐ Future Enhancements

• Expanded test analytics dashboard
• Slack notifications
• Email reports
• Dockerized execution
• Parallel test execution
• Cloud execution grids

---

## 🏁 Final Notes

This framework is:

✔ Scalable
✔ CI-ready
✔ Enterprise-grade
✔ Easy to extend

---

### ✅ Ready for Production Testing
