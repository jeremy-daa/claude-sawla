# Sawla Tours

Marketing and booking-enquiry website for **Sawla Tours**, an Addis Ababa–based
operator of private, tailor-made Ethiopia journeys.

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS · Framer Motion ·
Resend (email) · statically generated (SSG), 140 pages.

## Quick start

```bash
npm install
cp .env.example .env.local   # optional — the site runs fine without it
npm run dev                  # → http://localhost:3000
```

Requirements: **Node.js 18+**, npm 9+.

## Where to look

Three current documents cover everything — start with the first:

| Document | What it answers |
| --- | --- |
| [`docs/CURRENT_HANDOFF.md`](docs/CURRENT_HANDOFF.md) | **Single source of truth** — build facts, data model, generated surfaces, quality gates, key systems, env vars |
| [`docs/LAUNCH_READINESS_CHECKLIST.md`](docs/LAUNCH_READINESS_CHECKLIST.md) | Everything left to do before, during and after deploy |
| [`docs/CONTENT_AND_PHOTO_OPERATIONS.md`](docs/CONTENT_AND_PHOTO_OPERATIONS.md) | How to edit copy and drop in photography (with `PHOTO_SHOT_LIST.md` + `PHOTO_RIGHTS_LEDGER.csv` in the repo root) |

Everything under `docs/archive/` is historical and carries an archive banner —
do not use it for current work.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build (statically generates all 140 pages) |
| `npm run lint` / `npm run type-check` | ESLint / `tsc --noEmit` |
| `npm run generate:ai` | Regenerate `public/llms.txt` + `public/ai-index.json` from live data |
| `npm run verify:ai` | Fail if the AI discovery files have drifted from the data |
| `npm run check:docs` | Fail if current docs contain stale claims or the sitemap misses content |

Run `check:docs` and `verify:ai` after any content change — they are the guard
rails that keep documentation and AI discovery files truthful.
