# ⚡ Sri OS — Personal Life Command Center

A mobile-first personal productivity web app built with React + Vite + Tailwind CSS.
Deployed at: **https://sripathi-os.netlify.app**

---

## What is this?

Sri OS is a gamified daily operating system built around one core idea: your life has too many parallel tracks running simultaneously — job search, Masters exams, side project, content creation, German learning, gym — and a generic todo app can't handle that. This app gives each track a dedicated space, ties everything to a daily habit system with XP and streaks, and adapts to whether you're having a work day, free day, or exam day.

Built specifically around Vedic astrology timing (Rahu–Saturn antardasha ending Sep 2026, Rahu–Mercury starting after) and real life constraints: unpredictable part-time job shifts, 3 upcoming exams, no phone at workplace, limited time.

---

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS v3 |
| Routing | React Router v6 |
| State | React useState + useCallback |
| Storage | localStorage (Firebase-ready) |
| Hosting | Netlify (free tier) |
| Icons | Emoji (no icon library dependency) |

---

## Project Structure

```
sripathi-os/
├── public/
│   └── _redirects          ← Netlify SPA routing fix (/* /index.html 200)
├── src/
│   ├── data/
│   │   └── constants.js    ← ALL app data: habits, modes, projects, exams, levels
│   ├── hooks/
│   │   └── useStorage.js   ← localStorage persistence + all app state logic
│   ├── components/
│   │   ├── Auth.jsx        ← Password gate (sessionStorage based)
│   │   ├── Nav.jsx         ← Bottom navigation bar
│   │   └── UI.jsx          ← Shared components: Card, XPBar, Badge, ProgressRing etc.
│   ├── pages/
│   │   ├── Today.jsx       ← Daily mode selector + habit checklist (home screen)
│   │   ├── Habits.jsx      ← Full habit overview + XP level map
│   │   ├── Projects.jsx    ← 6 project streams with progress + stale detection
│   │   ├── Exams.jsx       ← 3 exam subjects with hours/day calculator
│   │   ├── Content.jsx     ← Content pipeline (Idea→Scripted→Filmed→Edited→Posted)
│   │   ├── Weekly.jsx      ← Sunday review with auto XP tally + history
│   │   └── Settings.jsx    ← Export/import JSON backup + reset
│   ├── App.jsx             ← Router + Auth wrapper
│   ├── main.jsx            ← React entry point
│   └── index.css           ← Tailwind + global styles
├── index.html              ← PWA meta tags, theme color, viewport
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## The 6 Pages

### ⚡ Today (Home)
The first thing you see every morning. Pick your mode — Work Day, Free Day, or Exam Day — and the habit list auto-filters to show only what's relevant for that mode. Check off habits to earn XP. Streak counter increments every day you open the app. Level badge updates when you cross XP thresholds.

### 🏆 Habits
Full overview of all habits grouped by category. Shows which habits apply to which mode, XP value per habit, level progression map from Seedling (0 XP) to Saturn Slayer (1500+ XP), and current streak.

### 📦 Projects
All 6 active streams tracked in one place:
- Werkstudent Job Search
- Job Application Automator (side project)
- Masters Exams
- Content Creation (locked until Aug 16)
- German Language (A2 → B1)
- Cloud Fabric Certificate (locked until Aug 15)

Each card has: progress ring, status selector, next action field, notes, weekly target, last updated timestamp. Cards go red if not updated in 7+ days (stale detection).

### 📚 Exams
Three subjects: ITSM, DS, ES — all starting July 22, 2026. Each subject card tracks study hours vs target hours and calculates exactly how many hours/day you need to hit your target before the exam date. Color coded: green (manageable), amber (moderate), red (critical — start immediately). Active recall rules pinned at the bottom.

### 📱 Content
Content pipeline board for new Instagram + YouTube accounts (Tech + Life in Germany angle). Three tabs:
- **Pipeline** — Kanban-style status tracking from Idea to Posted
- **Ideas bank** — 9 pre-loaded content ideas, tap to add to pipeline
- **Strategy** — account setup checklist, 3 content pillars, hashtag strategy

### ⚙️ Settings
- Export all data as JSON backup file (do this every Sunday)
- Import from backup JSON
- Hard reset (clears all localStorage)
- Firebase migration notes

---

## The 3 Day Modes

| Mode | When to use | Max XP | Focus |
|---|---|---|---|
| 🔴 Work Day | Part-time job shift called | 45 XP | 4 non-negotiables + 1 micro-task |
| 🟢 Free Day | No job, full day available | 165 XP | Deep work: gym + project + study + content |
| 🟡 Exam Day | July exam period | 125 XP | Study blocks first, everything else secondary |

---

## XP Level System

| XP | Level | Badge |
|---|---|---|
| 0–100 | 1 | 🌱 Seedling |
| 101–300 | 2 | 🔥 Spark |
| 301–600 | 3 | ⚡ Live Wire |
| 601–1000 | 4 | 🛡️ Iron Will |
| 1001–1500 | 5 | 🚀 Launch Mode |
| 1500+ | 6 | 🌌 Saturn Slayer |

Weekly target: **400+ XP**. A full free day = 165 XP max. A work day = 45 XP max.

---

## Habit List

### Every day (all modes)
| Habit | XP | Note |
|---|---|---|
| 🇩🇪 German — 20 min | 15 | Commute counts |
| 💧 2L water | 5 | Non-negotiable |
| 🌙 In bed by midnight | 10 | Saturn armor |
| ✍️ 1 sentence journal | 5 | One honest line |

### Work Day only
| Habit | XP | Note |
|---|---|---|
| ⚡ 1 micro-task (30 min max) | 10 | Project / app / script |

### Free Day
| Habit | XP | Note |
|---|---|---|
| 💪 Gym / workout | 20 | Non-negotiable |
| 🤖 Side project — 45 min | 25 | One feature, no rabbit holes |
| 📚 Study block 1 — 90 min | 30 | Active recall only |
| 📱 Content — film/edit/post | 20 | Batch 3 pieces |
| 📤 Job application sent | 15 | 3/week minimum |
| 💼 LinkedIn post/engage | 10 | Visibility compounds |
| 🍳 Meal prep (2 days) | 10 | Cook once, eat twice |

### Exam Day
| Habit | XP | Note |
|---|---|---|
| 📚 Study block 1 — 90 min | 30 | Hardest subject first |
| 📖 Study block 2 — 90 min | 30 | Past paper > notes |
| 📝 Study block 3 — revision | 20 | Weak subject focus |
| 🚶 Movement — 30 min | 15 | Clears cortisol |

---

## Data & Storage

All data lives in `localStorage` under these keys:

| Key | Contents |
|---|---|
| `sri_xp` | Total XP earned |
| `sri_streak` | Current day streak |
| `sri_last` | Last active date |
| `sri_days` | All day data (mode + checked habits) keyed by date |
| `sri_projects` | Project progress, status, notes, next actions |
| `sri_exams` | Exam subject data (dates, hours, notes) |
| `sri_content` | Content pipeline items |
| `sri_reviews` | Weekly review history (last 12 weeks) |
| `sri_weekxp` | XP earned per week (for auto weekly tally) |

**Important:** localStorage is per-browser per-device. Data is not synced across devices. Export a JSON backup every Sunday from Settings. Future plan: migrate to Firebase Firestore (only requires rewriting `src/hooks/useStorage.js`).

---

## How to Run Locally

```bash
# Install dependencies (one time only)
npm install

# Start dev server with hot reload
npm run dev
# Opens at http://localhost:5173

# Access from phone on same WiFi
npm run dev -- --host
# Use the Network: URL shown in terminal
```

## How to Build & Deploy

```bash
# Build production version
npm run build
# Creates /dist folder

# Deploy to Netlify
# Drag /dist folder to netlify.com/drop
# OR if connected to GitHub: auto-deploys on push
```

---

## How to Make Changes

**Change a habit XP value:**
Edit `src/data/constants.js` → find `HABITS` array → change `xp:` value

**Add a new habit:**
```js
{ id:"reading", label:"Read 20 min", icon:"📖", xp:10, modes:["free","exam"], note:"Non-fiction only." },
```

**Change the password:**
Edit `src/components/Auth.jsx` → change `const PASSWORD = "sri2026"`

**Change exam subjects:**
Edit `src/data/constants.js` → find `EXAM_SUBJECTS` array

**Change accent colors:**
Edit `src/data/constants.js` → find `MODES` object → change `accent`, `accentBg`, `accentLight`

**Add a new page:**
1. Create `src/pages/NewPage.jsx`
2. Add route in `src/App.jsx`
3. Add nav item in `src/components/Nav.jsx`

---

## Password

Default password: `sri2026`
Change it in `src/components/Auth.jsx` before deploying.
Uses `sessionStorage` — you enter it once per browser session.

---

## Astrological Context (why the timing matters)

The app is built around Vedic astrology dasha periods:
- **Rahu–Saturn antardasha** (now → Sep 2026): grind period, delayed recognition, discipline required
- **Rahu–Mercury antardasha** (Sep 2026 → Mar 2028): tech visibility, communication sharpens, best career window
- **Jupiter in Cancer** (now → Jul 2026): active tailwind for job search and networking — closing soon
- **Jupiter in Virgo** (Jul 2027 → Aug 2028): skill recognition peak — the window everything is building toward

The XP system, mode structure, and locked projects (Content locked until Aug 16, Fabric until Aug 15) are all calibrated to these windows.

---

## Notion Integration

The app links to a Notion workspace for long-form notes. Links are in `src/data/constants.js` under `NOTION_LINKS`. Each section has a "Open in Notion ↗" button that opens the corresponding Notion page. Data does not sync — Notion is for notes, the app is for tracking.

---

## Planned Improvements (post-exam, after Aug 2026)

- [ ] Firebase Firestore backend (cross-device sync)
- [ ] Push notifications (daily 8am mode reminder)
- [ ] GitHub auto-deploy on push
- [ ] Content posting date + overdue flagging
- [ ] German vocabulary mini-tracker
- [ ] Werkstudent application log with company + status
- [ ] Weekly XP chart (last 8 weeks trend)

---

*Built June 2026. Stack: React + Vite + Tailwind + React Router. Hosted on Netlify.*
