# Sri OS — Deploy Guide

## Option A: Firebase Hosting (recommended — works on phone + laptop)

```bash
# 1. Install Firebase CLI
npm install -g firebase-tools

# 2. Login
firebase login

# 3. Init (from project root)
firebase init hosting
# select: use existing project OR create new
# public directory: dist
# single-page app: YES
# overwrite dist/index.html: NO

# 4. Build + deploy
npm run build
firebase deploy

# Your URL: https://your-project.web.app
# Works on phone, laptop, anywhere
```

## Option B: Netlify (drag and drop, 2 minutes)

```bash
npm run build
# Go to netlify.com/drop
# Drag the /dist folder into the browser
# Get instant live URL
```

## Option C: Local network only

```bash
npm run build
npm install -g serve
serve -s dist -l 5000
# Access from phone on same WiFi: http://YOUR_PC_IP:5000
# Find your IP: ip addr show (Linux) or ipconfig (Windows)
```

## Home screen (Android)
Open URL in Chrome → three dots → Add to Home Screen → name it "Sri OS"

## Home screen (iPhone)
Open URL in Safari → Share → Add to Home Screen

## Making changes
- Edit files in /src/pages/ or /src/data/constants.js
- npm run build → redeploy
- All your data lives in localStorage — never lost on redeploy
