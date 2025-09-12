# ColumbiaPA300 - Civic Engagement Platform 🎉

ColumbiaPA300 is a **public-facing civic platform** built for the **300-year anniversary celebration of Columbia, PA**.  
It enabled **student logo submissions, community voting, donations, and civic media uploads** - serving 100+ residents, students, and civic organizers.

---

## 🌐 Live Demo

- **Was Live At (Client Production URL):** [https://columbiapa300.com](https://columbiapa300.netlify.app/)  
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

👥 100+ active users (residents, students, civic organizers)

🖼️ 100+ logo submissions

🗳️ 150+ votes cast in structured contest rounds

💵 $1,500+ in donations collected

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
/src → React frontend (components, pages, styles)
/netlify → Backend functions (API gateway)
/public → Static assets (logos, screenshots)
/docs → Documentation (architecture, security, integrations)
```
---

## 📊 Context

📜 Case Study
ColumbiaPA300 was built as part of a civic engagement initiative for the Columbia Borough’s 300-year anniversary.
It demonstrates the ability to deliver a production ready platform with real users, payments, and community trust.

📌 Supporting System: SMMAA (prototype) → social media marketing automation for campaign traffic (not deployed, but tied to ColumbiaPA300).

📄 License
MIT — Open for educational and referenced use.