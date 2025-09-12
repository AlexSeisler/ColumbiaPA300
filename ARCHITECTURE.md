# ColumbiaPA300 - System Architecture

## 🎯 Purpose

ColumbiaPA300 was built as a **civic engagement platform** for the Borough of Columbia’s 300th Anniversary.  
It provided residents and students with an **end-to-end digital hub** for:

- Logo submissions (100+ entries)
- Community voting (18-round contest, ~150 participants)
- Donations (~$1,500 total raised)
- Media uploads (photos/videos)
- Civic storytelling (timeline, history, event pages)

---

## 🛠 Core Architecture Overview

The system was designed as a **serverless application** deployed on Netlify with **React frontend + Netlify Functions backend**.

### 🔹 Frontend (React + Vite)
- React 19 + Vite 6.3
- `react-router-dom` for page navigation
- Public pages:
  - `/` → Home
  - `/vote` → Community voting
  - `/media` → Media uploads
  - `/donate` → Stripe donations
  - `/contact` → Contact form
  - `/thank-you` → Donation confirmation
  - `/privacy` → Privacy policy
  - 404 fallback
- Styled with per-page CSS modules (to be migrated to Tailwind in Milestone 2)

---

### 🔹 Backend (Netlify Functions)
Serverless functions handle interactivity, persistence, and integrations:

- `create-checkout-session.js` → Stripe donations (recurring + one-time)
- `submit-vote.js` → Vote submission & validation (Airtable persistence)
- `submitForm.js` → Student logo submissions (Airtable + Google Drive + Slack alert)
- `mediaUpload.js` → Media uploads (direct binary transfer → Drive)
- `createResumableUpload.js` → Large-file resumable uploads (Drive)
- `notifySlackResumable.js` → Slack notifications for large file uploads

---

### 🔹 Data & Storage
- **Airtable** → Votes + student logo submissions
- **Google Drive** → File storage for logos & media uploads
- **Stripe** → Donation handling (Checkout sessions)
- **Slack Webhooks** → Real-time alerts for submissions and uploads

---

## 🔗 System Data Flow

```mermaid
flowchart TD

A[Resident / Student] -->|Frontend (React)| B[Netlify Hosting]

B -->|Logo Submission| C[Netlify Function: submitForm]
C --> D[Airtable: Submissions]
C --> E[Google Drive: Logos]
C --> F[Slack Notification]

B -->|Vote Submission| G[Netlify Function: submit-vote]
G --> H[Airtable: Votes]

B -->|Donation| I[Netlify Function: create-checkout-session]
I --> J[Stripe Checkout]
J --> K[Donation Records]

B -->|Media Upload| L[Netlify Function: mediaUpload / createResumableUpload]
L --> M[Google Drive: Media]
L --> F[Slack Notification]
```

## 🧩 Subsystem Breakdown

Subsystem	Implementation	Purpose
frontend_ui	React + Vite	Public site: submissions, voting, donations, uploads
api_gateway	Netlify Functions	API surface for submissions, votes, uploads, donations
database	Airtable	Stores submissions and votes
storage	Google Drive	File storage (logos, media uploads)
payments	Stripe Checkout	One-time + recurring donations
notifications	Slack Webhooks	Alerts for uploads and submissions
observability	Backfilled screenshots	No live metrics stack; adoption proof via screenshots
auth	Lightweight form validation	No login; name/email/phone captured per user

## ⚡ Architecture Strengths

Real-world integrations: Stripe, Airtable, Google APIs, Slack

Civic trust: Designed for a real public borough campaign

Scalable hosting: Netlify Functions & static frontend (no infra overhead)

E2E system: From logo submissions → voting → donations → archival