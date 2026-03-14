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

This repository currently contains the **marketing/landing page** for Bondedd, built with **React, TypeScript, Vite, Tailwind CSS, and Framer Motion**.

### Project structure

- `frontend/` – React + Vite app for the landing page  
  - `public/` – fonts and static assets (including university logos)  
  - `src/`  
    - `components/landing/` – all landing sections (`Hero`, `Navbar`, `FeatureGrid`, `HowItWorks`, `AppDemoRow`, `LogoCloud`, `WhyChoose`, `QuoteSection`, `FAQSection`, `Footer`, etc.)  
    - `pages/` – `LandingPage.tsx` wires all sections together  
    - `index.css` – Tailwind and custom styles  
  - `tailwind.config.js` – Tailwind theme (fonts, colors, radii)

There is no backend in this repo yet; it is purely the marketing front-end.

### Getting started

.env setup: 
VITE_SUPABASE_URL=https://gydjbbcqakaufdoehkqc.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_CziMIZFJP2ldscKOvwnBeQ_uUUrxS6I
VITE_MAPBOX_ACCESS_TOKEN=pk.eyJ1IjoicmFnaGF2c2FyYXZhbmFuIiwiYSI6ImNtbW83NG5tYzBiMDEycnEyZnJmdXpkejEifQ.bqlU5RXlpSdSwgucnS9MvA

From the `frontend` folder:

```bash
cd frontend
npm install
npm run dev
```

Then open `http://localhost:5173` (Vite may choose a slightly different port) to view the landing page.

### Dependencies overview

The full dependency list lives in `frontend/DEPENDENCIES.md`, but the core stack is:

- `react`, `react-dom` – UI framework  
- `framer-motion` – animations, scroll effects, and microinteractions  
- `tailwindcss`, `postcss`, `autoprefixer` – styling system  
- `vite` – dev server and build tool  
- `typescript` – static typing  
