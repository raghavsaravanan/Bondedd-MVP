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
