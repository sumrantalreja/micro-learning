# LearnAI — Micro-learning Prototype

A working prototype for a freemium AI micro-learning product targeting 4 job-seeker cohorts.

## Live Demo

Deploy to GitHub Pages using the steps below — no build step required.

---

## Deploy to GitHub Pages

### Option A — GitHub UI (fastest)

1. Create a new **public** GitHub repository (e.g. `learnai-prototype`)
2. Upload all 4 files: `index.html`, `styles.css`, `app.js`, `data.js`
3. Go to **Settings → Pages**
4. Under **Source**, select `Deploy from a branch` → `main` → `/ (root)` → **Save**
5. Wait ~60 seconds. Your site is live at `https://<your-username>.github.io/<repo-name>/`

### Option B — Git CLI

```bash
git init
git add .
git commit -m "Initial LearnAI prototype"
gh repo create learnai-prototype --public --source=. --push
# Then enable Pages in Settings → Pages → main / root
```

---

## File Structure

```
.
├── index.html   # Single-page app — all 5 views
├── styles.css   # All styles (dark theme, responsive)
├── app.js       # SPA router, view renderers, state management
└── data.js      # Course content, cohort definitions, quiz data
```

---

## What's in the Prototype

### 5 Views (clickable navigation)

| View | URL anchor | Purpose |
|------|-----------|---------|
| Landing | `#landing` | Hero, cohort cards, testimonials, freemium pitch |
| Onboarding | `#onboarding` | 3-step personalisation quiz |
| Dashboard | `#dashboard` | Learning path, module progress, upgrade sidebar |
| Lesson | `#lesson` | Video player, notes, quiz, lesson outline |
| Pricing | `#pricing` | Free / Pro / Pro+ plans with toggle |
| Metrics | `#metrics` | Funnel, KPIs, north star metrics |

### Key User Journey

```
Landing → [Find My Path] → Onboarding (3 steps) → Dashboard
  → Click free lesson → Lesson Player (video + quiz)
  → Click locked lesson → Upgrade Modal → Pricing page
```

---

## Product Design

### Target Cohorts

| Cohort | Value Prop | Path |
|--------|-----------|------|
| Fresh Graduate | Land first AI role in 90 days | AI Career Launchpad |
| Working Professional (Non-tech) | 10× productivity with AI tools, no code | AI Power User |
| Career Switcher | Transition to AI Engineering in 12 weeks | AI Engineering Transition |
| Entrepreneur | Ship first AI product in 30 days | AI Business Builder |

### Freemium Design

| Tier | Price | What's Included | Unlock Trigger |
|------|-------|----------------|---------------|
| Free | ₹0 | First 2 modules, community, 1 project template | — |
| Pro | ₹1,499/mo | Full library, live sessions, certificate, job board | Lesson paywall hit |
| Pro+ | ₹4,099/mo | Everything + 1:1 mentor + placement guarantee | Module 3+ engagement |

**Upgrade triggers built into UI:**
- Locked lesson → modal with 7-day trial CTA
- Module 3 locked state in dashboard
- Sidebar upgrade card on dashboard
- Community tab in lesson player

### Core Metrics

**North Star Metrics**
1. **Weekly Active Learners (WAL)** — users completing ≥1 lesson/week. Measures engagement.
2. **Free → Paid Conversion Rate** — % of free users upgrading within 30 days of first paywall. Measures monetisation.

**Funnel Metrics**
```
Visitors (100%) → Signup (25%) → First Lesson (64% of signups) 
  → Paywall Hit (40% of activated) → Upgrade (25% of paywall hits)
```

**Supporting Metrics**
- Day/Week/Month retention
- Average lessons per active user per week
- Monthly churn rate
- Cohort-level conversion rate

---

## Tech Stack

Vanilla HTML + CSS + JavaScript. No framework, no build step. Deploys anywhere.
