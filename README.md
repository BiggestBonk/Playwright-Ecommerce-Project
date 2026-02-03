# Amazon E2E Test Automation

This is a test automation suite I built for amazon.com.au using Playwright and Typescript.

## Features:
- Page Object Model architecture
- Authenticated user flows
- Cross-browser testing (Chrome and Firefox)
- CI/CD using GitHub actions
- HTML reports with accompanying screenshots

## Prerequisites:
- Node.js 18 or above
- npm or yarn (or any other package installer you might prefer)

## Installation:
```bash
npm install
npx playwright install
```

## Running Tests
```bash
# Run all tests
npm test

# Run a specific test file
npx playwright test search.spec.ts (or another file, e.g. checkout.spec.ts)

# Run in headed mode 
npx playwright test --headed
```