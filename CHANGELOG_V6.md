# CHANGELOG_V6.md — Sawla Tours V6 Elite Pass

**Date:** June 9, 2026  
**Pass:** V6 Elite Review + Fix Pass

---

## Summary

V6 is the first formal quality pass over the V5 codebase. The goal was to audit, fix, and complete the site to launch-readiness standard. No major rewrites — targeted improvements to stability, coverage, and documentation.

---

## New Pages Added

### `/testimonials` — Traveller Stories Hub
- Full hub page with 6 placeholder testimonials (clearly marked for editorial replacement before launch)
- Star ratings deliberately omitted (no fake reviews)
- TripAdvisor and Google Reviews links
- Editorial note explaining real-quote policy
- "Why We Share These Stories" editorial section
- Full schema (BreadcrumbList)

### `/sawla-films` — Documentary Film Division
- Cinematic hero with 90vh height
- "What No Foreign Fixer Can Offer" editorial section
- 6 capability cards (location intelligence, permits, logistics, access, production, integration)
- 4 film type categories
- YouTube CTA section with play button overlay
- Full schema (Organization linked to parent TravelAgency)
- Linked from footer (replaces direct YouTube link)

### `/sawla-foundation` — Community & Conservation Mission
- Responsible tourism philosophy editorial
- 6 pillar cards with SVG icons (community employment, conservation, cultural respect, education, local procurement, responsible communication)
- "What We Refuse to Do" principles section
- Links to `/responsible-travel` for full policy
- Full schema (BreadcrumbList)

---

## Build Fixes

### `.eslintrc.json` added
**Problem:** `npm run lint` launched an interactive terminal prompt blocking CI/CD pipelines.  
**Fix:** Added `.eslintrc.json` extending `next/core-web-vitals` and `next/typescript`. Lint now runs non-interactively.

### ESLint: 8 unused variable/import errors fixed
- `components/home/HeroSection.tsx` — removed unused `SITE` import
- `components/home/TripWizard.tsx` — removed unused `progress` variable
- `components/ui/HeroVideo.tsx` — removed unused `useRef` import
- `app/about-us/page.tsx` — removed unused `SITE` from import
- `app/meet-our-travel-specialists/page.tsx` — removed unused `AnimateStagger` and `SITE` imports
- `app/page.tsx` — removed unused `staggerItem` import
- `app/responsible-travel/page.tsx` — removed unused `AnimateStagger` import

### ESLint: 4 unescaped entity errors fixed
- `app/page.tsx` lines 71 and 248 — apostrophes escaped as `&apos;`
- `app/sawla-films/page.tsx` lines 97 and 219 — apostrophes escaped
- `app/sawla-foundation/page.tsx` line 148 — apostrophe escaped

---

## SEO Fixes

### Itinerary meta title length
**Problem:** Titles were `name + " | " + styleName + " | Sawla Tours"` — often 70-80 chars.  
**Fix:** Title now `shortTitle + " | Sawla Tours"` where shortTitle truncates at 42 chars if needed. All itinerary meta titles now under 60 characters. OpenGraph title retains full name.

---

## AI Discovery Files

### `public/llms.txt`
- AI discovery file for LLM crawlers and AI assistants
- Describes entity, capabilities, destinations, team structure
- Includes AI usage guidelines and citation guidance
- Explains what AI assistants should and should not say about Sawla Tours

### `public/ai-index.json`
- Structured JSON index for GEO/LLM indexing
- Entity definition with alternateName and sameAs
- Complete content index (destinations, tour styles, species, guides)
- AI guidelines with topicsSupported and doNotMisrepresent fields

---

## UI/CSS Fixes

### Enquiry trust bar: emoji → SVG icons
**Problem:** Trust bar used emoji (🇪🇹 ✍️ 🗺 ⚡) — inconsistent with luxury brand aesthetic.  
**Fix:** Replaced with inline SVG icons in gold. Pin, pen, compass arrow, clock — clean, brand-consistent.

### New CSS button variants in `globals.css`
- `.btn-outline` — dark outline for ivory backgrounds
- `.btn-outline-ivory` — ivory outline for dark backgrounds
These were referenced in new pages but missing from the design system.

---

## Navigation & Sitemap

### Footer updated
- "Sawla Films" now links to `/sawla-films` (was linking to YouTube directly)
- Added "Sawla Foundation" link to company column
- Added "Traveller Stories" link to explore column

### `app/sitemap.ts` updated
- Added `/testimonials` (priority 0.7)
- Added `/sawla-films` (priority 0.7)
- Added `/sawla-foundation` (priority 0.6)

---

## Documentation Added

| File | Purpose |
|------|---------|
| `REVIEW_AUDIT_V6.md` | Full codebase audit with scores |
| `CHANGELOG_V6.md` | This file |
| `QA_REPORT_V6.md` | Build, lint, type-check, page count, remaining tasks |
| `LAUNCH_CHECKLIST_V6.md` | Pre-launch checklist |
| `SEO_AIO_GEO_LLM_REPORT_V6.md` | SEO, AI, entity strategy report |

---

## Build Results Before/After

| Metric | V5 | V6 |
|---|---|---|
| Routes | 62 | 65 |
| tsc errors | 0 | 0 |
| ESLint errors | Interactive (fail) | 0 ✅ |
| Missing pages | 4 | 1 (trip-finder, post-launch) |
| llms.txt | ❌ | ✅ |
| ai-index.json | ❌ | ✅ |
| V6 docs | 0 | 6 |
