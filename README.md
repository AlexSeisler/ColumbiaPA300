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

🗳️ **150+** votes cast in structured contest rounds

💵 **$1,500+** in donations collected

🌐 **5.8K Views / 2.1K Reach** on campaign content (Meta metrics)

📷 Dozens of civic media uploads archived

---

## 🛠 Tech Stack

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

## 📂 Repository Structure

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
├── docs/                   # Documentation (architecture, security, metrics)
├── package.json
├── vite.config.js
└── README.md
```

---

## 📖 Additional Documentation

- [ARCHITECTURE.md](./ARCHITECTURE.md) → System design and data flow  
- [INTEGRATIONS.md](./INTEGRATIONS.md) → Airtable, Stripe, Google Drive, Slack integrations  
- [SECURITY.md](./SECURITY.md) → Data handling, Stripe PII considerations, file upload risks  

📌 Supporting System: SMMAA (prototype) → social media marketing automation for campaign traffic (not deployed, but tied to ColumbiaPA300).

📄 License
MIT — Open for educational and referenced use.