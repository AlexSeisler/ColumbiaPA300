# ColumbiaPA300 - Civic Engagement Platform 🎉

[![Live Demo on Netlify](https://img.shields.io/badge/Live-Demo-green?logo=netlify)](https://columbiapa300.netlify.app)

ColumbiaPA300 is a **public-facing civic platform** built for the **300-year anniversary celebration of Columbia, PA**.  
It enabled **student logo submissions, community voting, donations, and civic media uploads** - serving 100+ residents, students, and civic organizers.

---

## 🌐 Live Demo

- **Client Production URL (archived):** [https://columbiapa300.com](https://columbiapa300.netlify.app/)  
- **Archived Deployment (Netlify):** [https://columbiapa300.netlify.app/](https://columbiapa300.netlify.app/)  
- **Repo Owner:** [Alex Seisler](https://github.com/AlexSeisler)

---

## ✨ Features

- 🖼️ **Logo Contest System** → 100+ student submissions + structured 18-round voting.  
- 💳 **Donations** → recurring + one-time via **Stripe Checkout** (~$1.5k collected).  
- 📂 **Media Uploads** → community-driven photos/videos stored in **Google Drive**.  
- 🗳️ **Voting System** → secure Airtable persistence with validation.  
- 📢 **Slack Notifications** → real-time alerts for submissions/uploads.  
- 🏛️ **Civic Storytelling** → timeline + content pages celebrating Columbia’s history.

---
## 📊 Impact

👥 **100+** active users (residents, students, civic organizers)

🖼️ **100+** logo submissions

🔳 **150+** votes cast in structured contest rounds

💵 **$1,500+** in donations collected

🌐 **5.8K Views / 2.1K Reach** on campaign content (Meta metrics)

📷 Dozens of civic media uploads archived

---

## 🔧 Tech Stack

**Frontend**
- React 19 + Vite 6.3  
- Tailwind CSS + Framer Motion (UI polish, animations)  
- React Router DOM  

**Backend (Serverless via Netlify Functions)**
- Stripe API → donations  
- Airtable → votes + submissions  
- Google Drive (service account) → file storage  
- Slack Webhooks → notifications  

**Infrastructure**
- Hosting: Netlify (CI/CD deploys)  
- Secrets: `.env` + `netlify.toml`  
- Monitoring: Slack alerts + logs  

---

## 🗂️ Repository Structure

```text
ColumbiaPA300/
├── public/                 # Static assets (logos, civic branding, screenshots)
├── src/                    # React frontend
│   ├── components/         # UI components (Header, Footer, Forms, Timeline)
│   ├── pages/              # Route-level pages (Home, Vote, Donate, Media)
│   └── styles/             # CSS modules (per section/page)
│
├── netlify/functions/      # Serverless backend functions
│   ├── create-checkout-session.js   # Stripe donations
│   ├── submit-vote.js               # Airtable voting
│   ├── submitForm.js                # Logo submissions
│   └── mediaUpload.js               # File uploads (Drive + Slack)
│
├── tests/                  # Automated QA layer (Priority 1 Integration)
│   ├── playwright/         # Primary E2E test suite (multi-browser)
│   │   ├── tests/
│   │   │   ├── donation.spec.ts
│   │   │   ├── navigation.spec.ts
│   │   │   ├── submission.spec.ts
│   │   │   └── vote.spec.ts
│   │   ├── helpers/
│   │   │   ├── selectors.ts
│   │   │   └── retry.ts
│   │   └── playwright.config.ts
│   └── selenium/           # WebDriver-based legacy validation
│       └── test_vote_flow.ts
│
├── .github/workflows/      # CI/CD pipeline stubs
│   └── e2e-tests.yml
│
├── docs/                   # Documentation (architecture, security, metrics)
├── package.json
├── vite.config.js
└── README.md
```

---

## 🔍 QA Automation Layer (Priority 1)

This repository includes a **multi-framework UI automation system** implemented for demonstration and CI/CD simulation purposes.

### 🔧 Frameworks
- **Playwright**: End-to-end browser automation with trace + video reporting
- **Selenium**: WebDriver-based test showcase
- **Cypress (Deferred)**: Optional component-level UX testing

### 🔄 Commands
```bash
npx playwright test                # Run all E2E tests
npx playwright test --headed       # Run in visible browser mode
npx playwright show-report         # View last Playwright report
npx ts-node tests/selenium/test_vote_flow.ts  # Selenium demo test
```

### 🛠️ CI/CD Integration
- Workflow: `.github/workflows/e2e-tests.yml` (matrix-ready pipeline)
- Output: HTML reports, screenshots, and trace logs
- Status: **Demo-ready, offline-safe, CI-configurable**

### 📊 Coverage
| Flow | Framework | Purpose |
|------|------------|----------|
| **Voting** | Playwright / Selenium | Validates Airtable submission + UI updates |
| **Donation** | Playwright | Validates Stripe redirect + form logic |
| **Submission** | Playwright | Validates logo submission form + Thank You page |
| **Navigation** | Playwright | Validates page routing and consistency |

### 🔗 Reports & Artifacts
- `/tests/playwright/reports/` → HTML + trace + screenshots
- `/tests/selenium/` → Console output for WebDriver runs

---

## 📄 Documentation

- [ARCHITECTURE.md](./ARCHITECTURE.md) → System design and data flow  
- [INTEGRATIONS.md](./INTEGRATIONS.md) → Airtable, Stripe, Google Drive, Slack integrations  
- [SECURITY.md](./SECURITY.md) → Data handling, Stripe PII considerations, file upload risks  
- [AAO_HANDOFF_OVERVIEW.md](./docs/AAO_HANDOFF_OVERVIEW.md) → Professional positioning context for QA automation  
- [SYSTEM_ARCHITECT_CONTEXT_OVERVIEW.md](./docs/SYSTEM_ARCHITECT_CONTEXT_OVERVIEW.md) → Architectural rationale + validation notes  

---

## 💡 Author & Ownership
- **Architect:** System Architect A  
- **Executor:** DevBot  
- **Owner:** [Alex Seisler](https://github.com/AlexSeisler)  

---

## 🔒 License
MIT — Open for educational and reference use.
