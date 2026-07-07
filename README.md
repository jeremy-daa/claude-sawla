# Sawla Tours

Marketing and booking-enquiry website for **Sawla Tours**, an Addis Ababa–based
operator of private, tailor-made Ethiopia journeys.

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS · Framer Motion ·
Resend (email) · statically generated (SSG), 140 pages.

---

## Quick start

```bash
npm install
cp .env.example .env.local   # optional — the site runs fine without it
npm run dev                  # → http://localhost:3000
```

Requirements: **Node.js 18+**, npm 9+.

### Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build (statically generates all 140 pages) |
| `npm run start` | Serve the production build (run `build` first) |
| `npm run lint` | ESLint |
| `npm run type-check` | `tsc --noEmit` |

---

## Project shape

```
app/                 # App Router pages + route handlers (api/enquire)
components/           # UI, layout, home, forms, legal components
data/                # Source of truth — itineraries, destinations, guides, styles, site data
lib/                 # schema.ts (JSON-LD), conversionTracking.ts
public/              # Static assets (see the image note below)
docs/, seo/, strategy/, content/   # Reference material and content packages
```

Full architecture, data-model, and integration notes live in
**`README_DEVELOPER.md`**, **`DEVELOPER_HANDOFF.md`**, and **`MASTER_INDEX.md`**.

---

## Content data model (where to edit copy)

All visible copy is data-driven — edit these, not the templates:

- `data/itineraryData.ts` — the 36 journeys (day-by-day, route logic, accommodation, inclusions)
- `data/destinationsPremium.json` — the 18 destination profiles
- `data/fieldGuideContent.ts` — the 23 travel-guide articles
- `data/tourStylePageContent.ts` — the 9 tour-style hub pages
- `data/siteData.ts` — nav, testimonials, tour styles, contact details

Counts render from data (`PREMIUM_DESTINATIONS.length`, etc.), so adding an entry
updates every "18 destinations / 36 journeys" reference across the site automatically.

---

## Images

The site currently renders styled `PlaceholderImage` components keyed by filename.
When real photography is ready, drop files into `public/images/` matching those
filenames — no code changes needed. Alt text is already wired: destination pages
pull authored `heroAlt`/`cardAlt` from data, and everything else derives a readable
label from the filename automatically. See `PHOTOGRAPHY_IMPLEMENTATION_GUIDE.md`.

---

## Before going live

1. **Set `RESEND_API_KEY`** (in `.env.local` locally, or the host's env in production)
   so enquiries email instead of logging to the console. Optionally set
   `NEXT_PUBLIC_GA_ID` for analytics.
2. **Confirm the business figures** in the policy pages — deposit %, balance-due
   window, cancellation tiers, refund/quote-validity timelines. They are internally
   consistent but must be verified against real Sawla policy.
3. **Legal review** of the 10 policy pages by a qualified professional (see the
   internal notes in `components/legal/LegalPageLayout.tsx`).
4. **Add real photography** (see above).
5. **Deploy** (Vercel recommended for Next.js), then verify in Google Search Console
   and run PageSpeed Insights against the live URL.

Accessibility, Best-Practices and SEO all score 100 in Lighthouse; structured data
(JSON-LD), `sitemap.xml`, and `robots.txt` are generated automatically.
