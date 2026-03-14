# Bondedd

Bondedd is a platform that brings everything happening on campus into one place so students never miss out.

Students discover events, explore campus activities, save things they care about, and connect with their campus community — all from one app.

The goal of Bondedd is simple: make campus life easier to discover.

---

## Product vision

Campus events are fragmented.

Students currently find events through:

- flyers  
- Instagram posts  
- group chats  
- email newsletters  
- university portals

Most events are easy to miss.

Bondedd solves this by creating one centralized platform for campus discovery.

Students can:

- discover events happening today  
- explore campus organizations  
- save events they want to attend  
- submit events to share with the community

---

## Core features

### Home feed

A personalized feed showing:

- events happening today  
- trending events  
- recommended events

### Explore

Search and browse events by:

- category  
- campus  
- organization  
- date

### Saved events

Students can bookmark events they want to attend and view them later.

### Event creation

Students and organizations can submit events to share with their campus.

### Profiles

Users can manage:

- interests  
- saved events  
- campus preferences

---

## This repo

This repository contains the current Bondedd frontend, built with **React, TypeScript, Vite, Tailwind CSS, Framer Motion, Supabase, and Mapbox**.

### Project structure

- `frontend/` – React + Vite app for the product experience  
  - `public/` – fonts and static assets (including university logos)  
  - `src/`  
    - `components/landing/` – marketing and launch-facing sections  
    - `components/app/`, `components/explore/`, `components/map/`, `components/ui/` – in-product UI  
    - `pages/` – route-level screens for landing, auth, onboarding, home, explore, saved, notifications, create, organizations, profile, and event detail  
    - `index.css` – Tailwind and custom styles  
  - `tailwind.config.js` – Tailwind theme (fonts, colors, radii)
  - `supabase/` – schema, migrations, and local SQL helpers

The app relies on Supabase for data/auth and Mapbox for map rendering.

### Getting started

From the `frontend` folder:

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

Then open `http://localhost:5173` (Vite may choose a slightly different port) to view the app.

Populate `frontend/.env.local` with valid values for:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_MAPBOX_ACCESS_TOKEN`

You can also verify the codebase from a clean checkout with:

```bash
cd frontend
npm run build
```

### Dependencies overview

The full dependency list lives in `frontend/DEPENDENCIES.md`, but the core stack is:

- `react`, `react-dom` – UI framework  
- `framer-motion` – animations, scroll effects, and microinteractions  
- `tailwindcss`, `postcss`, `autoprefixer` – styling system  
- `vite` – dev server and build tool  
- `typescript` – static typing  
