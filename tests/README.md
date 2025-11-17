# ColumbiaPA300 Automated Testing Overview

## Frameworks
- **Playwright** – Primary E2E framework (flows: Vote, Donation, Submission, Navigation)
- **Selenium** – Cross-browser compatibility and UI validation
- **Cypress** – Component-level UX and form validation

## Folder Structure
```
/tests/
  ├── playwright/
  │     ├── tests/          # Playwright test specs
  │     ├── helpers/        # Utilities (selectors, retry logic)
  │     └── reports/        # HTML test reports
  ├── selenium/             # Python Selenium test suite
  └── README.md             # This file

/cypress/
  ├── e2e/                  # Cypress test specs
  ├── support/              # Commands and config helpers
  └── screenshots/          # Failure screenshots
```

## Run Commands
```bash
npm run test:pw        # Run Playwright tests
npm run test:cypress   # Run Cypress tests
pytest tests/selenium  # Run Selenium tests
```

## Output Artifacts
- **Screenshots:** `/tests/playwright/reports/` and `/cypress/screenshots/`
- **Reports:** `/tests/playwright/reports/` (HTML) and `/tests/selenium/reports/`

## CI/CD Integration
A GitHub Actions workflow (`.github/workflows/e2e-tests.yml`) will automatically run all three frameworks in headless mode for continuous validation.