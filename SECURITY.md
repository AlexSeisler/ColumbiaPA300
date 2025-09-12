# ColumbiaPA300 - Security Notes

## 🎯 Purpose

This document outlines the **security considerations** for ColumbiaPA300.  
As a civic-facing platform handling **PII, file uploads, and payments**, security was a key part of the system design.

---

## 🔑 Core Risks

### 1. Personally Identifiable Information (PII)
- **Collected:** Name, email, phone number, school, grade (via forms + voting).
- **Storage:** Airtable (submission + vote records).
- **Risks:**
  - Exposure if Airtable API credentials are leaked.
  - Sensitive school/student data requires special care.
- **Mitigations:**
  - No secrets committed to repo (managed via `.env` + `netlify.toml`).
  - Minimal PII stored (only what was required for submissions/votes).
  - Access limited to civic admins.

---

### 2. File Uploads
- **Collected:** Logos (student art), community media (photos/videos).
- **Storage:** Google Drive (separate folders by type).
- **Risks:**
  - Arbitrary file uploads (malware, oversized files).
  - Public sharing of inappropriate content.
- **Mitigations:**
  - Size limits enforced (500MB max).
  - Separate Drive folders per category.
  - Civic admins manually reviewed before publishing content.
  - Slack alerts sent for every new upload.

---

### 3. Payments
- **Processor:** Stripe Checkout.
- **Risks:**
  - Donation flow could be a target for fraud or key exposure.
  - PCI compliance requirements.
- **Mitigations:**
  - All payment data handled by **Stripe Checkout** (no card data stored on ColumbiaPA300).
  - Stripe keys stored securely in `.env` only.
  - Donation tiers pre-configured (validated against Stripe price IDs).

---

### 4. Environment Variables & Secrets
- **Risks:**
  - API keys (Airtable, Stripe, Google, Slack) exposed in repo → catastrophic leak.
- **Mitigations:**
  - `.gitignore` includes `.env` → never committed.
  - `netlify.toml` references `.env` for build/runtime.
  - All keys rotated and revoked post-project.

---

## 📋 Security-by-Design Principles

1. **Least Privilege** → Only necessary fields collected; no broad auth required.
2. **Zero Secrets in Repo** → All sensitive data lives in `.env` or Netlify environment variables.
3. **Externalized Risk** → Stripe handles payments, Drive handles files, Airtable stores PII.
4. **Transparency** → Civic admins received real-time Slack alerts for uploads/submissions.

---

## ⚡ Gaps & Future Improvements

- No automated malware scanning for uploads.
- No structured logging or intrusion detection.
- Airtable lacks encryption-at-rest guarantees compared to a dedicated DB.
- Civic admins handled content moderation manually.

---

## ✅ Recruiter-Facing Takeaway

ColumbiaPA300 demonstrates **security-aware design** even in a civic project context:

- Protected PII collection.  
- Safe payments via Stripe Checkout.  
- Controlled uploads with admin review.  
- No secrets in repo.  

While lightweight, the platform was built with **real-world security practices** appropriate for a civic campaign deployment.