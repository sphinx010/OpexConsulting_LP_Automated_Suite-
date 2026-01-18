# Opex Consulting Cypress Automation Framework

![CI](https://github.com/sphinx010/OpexConsulting_LP_Automated_Suite-/actions/workflows/cypress.yml/badge.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18-green)
![Cypress](https://img.shields.io/badge/cypress-automation-brightgreen)
![License](https://img.shields.io/badge/license-ISC-blue)

## Overview

This repository contains an end-to-end test automation framework built with Cypress to validate the Opex Consulting website.

Coverage includes:
- Navigation flows
- UI content
- Forms and submissions
- Security checks (XSS and payload injection)
- CI execution with GitHub Actions

## Technology Stack

| Tool           | Purpose             |
|----------------|---------------------|
| Cypress        | UI Test Automation  |
| JavaScript     | Test Development    |
| Mochawesome    | Test Reporting      |
| Node.js        | Runtime Environment |
| GitHub Actions | CI/CD Pipeline      |
| Git            | Version Control     |

## Project Structure

```
OpexTest__Automation
├── .github/workflows/cypress.yml
├── cypress
│   ├── e2e
│   ├── fixtures
│   ├── reports
│   ├── screenshots
│   ├── support
│   └── videos
├── dashboard
│   ├── app.js
│   ├── index.html
│   ├── styles.css
│   └── charts
├── scripts
│   ├── copyScreenshotsToReports.js
│   ├── generateCharts.js
│   └── generateReportIndex.js
├── cypress.config.js
└── package.json
```

## Running Tests

Open Cypress UI:

```bash
npx cypress open
```

Run headless:

```bash
npm run cy:run
```

Run full pipeline locally:

```bash
npm run test:ci
```

## Reporting

Open Dashboard: https://sphinx010.github.io/OpexConsulting_LP_Automated_Suite-/dashboard/

Chart previews:
![Pass rate](https://sphinx010.github.io/OpexConsulting_LP_Automated_Suite-/dashboard/charts/passrate.svg)
![Duration](https://sphinx010.github.io/OpexConsulting_LP_Automated_Suite-/dashboard/charts/duration.svg)
![Failures](https://sphinx010.github.io/OpexConsulting_LP_Automated_Suite-/dashboard/charts/failures.svg)

Latest summary: dashboard/charts/summary.md

## Reports and Artifacts

After execution, reports are available in:

```
cypress/reports
```

You will get:
- Dashboard UI (GitHub Pages)
- Mochawesome JSON output
- Screenshots (on failure)

The CI workflow uploads a zipped dashboard bundle containing:
- dashboard/**
- cypress/reports/index.json
- cypress/reports/mochawesome*.json
- cypress/reports/screenshots/**

## Scripts

```bash
npm run clean:reports
npm run cy:run
npm run report:merge
npm run report:index
npm run report:copy:screenshots
npm run report:charts
npm run test:ci
```

Script details:
- `clean:reports`: deletes `cypress/reports` so each run starts clean.
- `cy:run`: runs Cypress headless and writes Mochawesome JSON to `cypress/reports`.
- `report:merge`: merges timestamped Mochawesome JSON files into `cypress/reports/mochawesome.json`.
- `report:index`: generates `cypress/reports/index.json` pointing to the latest report.
- `report:copy:screenshots`: copies `cypress/screenshots` into `cypress/reports/screenshots`.
- `report:charts`: generates static SVG previews and `dashboard/charts/summary.md`.
- `test:ci`: runs the full local pipeline (clean, run, merge, index, screenshots, charts).

## Executed by

Ayooluwa Paul Obembe
QA Automation Engineer
