# REVIEW_AUDIT_V6.md — Sawla Tours V6 Elite Review

**Date:** June 9, 2026  
**Reviewer:** V6 Elite Pass  
**Build:** Next.js 15.1.3 / React 19 / TypeScript 5.7 / Tailwind 3.4

---

## 1. WHAT IS ALREADY STRONG

### Technical Foundation
- ✅ Next.js 15 App Router with full TypeScript (zero tsc errors)
- ✅ Clean route architecture: 24 page templates → 62+ static pre-rendered URLs
- ✅ Server components by default, client components only where required
- ✅ Security headers (HSTS, CSP, X-Frame-Options, Referrer-Policy)
- ✅ Video/image cache headers (7-day video, 1-year image immutable)
- ✅ Sitemap.ts auto-generated
- ✅ robots.txt in place
- ✅ Canonical URLs in metadata for all pages
- ✅ Open Graph metadata on all pages
- ✅ JSON-LD schema on every page type
- ✅ WhatsApp floating button
- ✅ ScrollToTop component
- ✅ Skip navigation link

### Design System
- ✅ Correct brand palette (Volcanic Rock #2a2724, Teff Gold #c9941a, Ivory #f8f6f1)
- ✅ Cormorant Garamond display / DM Sans body correctly applied
- ✅ AnimateIn / AnimateStagger (Framer Motion, scroll-reveals)
- ✅ Responsive: mobile-first grid, correct breakpoints
- ✅ HeroVideo component with idle-mount (no LCP block, poster-first)
- ✅ Logo properly trimmed (was 90% padding), now fills header correctly
- ✅ Full favicon suite (16/32/180/192/512px, multi-res .ico)
- ✅ Web manifest for PWA/installable
- ✅ OG share image (1200×630)

### Content Architecture
- ✅ 16 destination pages with full rich editorial content
- ✅ 15 field guide articles (all complete)
- ✅ 7 endemic species pages (all complete)
- ✅ 36 itineraries (6 per style) with full day-by-day content
- ✅ 3 Sawla Moments articles
- ✅ Inclusions-on-request model (Black Tomato benchmark)
- ✅ Photo metadata index (310+ images inventoried)
- ✅ Photography system documentation
- ✅ 7 social media platforms in footer

### API & Forms
- ✅ Enquiry API route with input sanitization and validation
- ✅ Email provider scaffold (Resend-ready)
- ✅ CORS + security appropriate for serverless

---

## 2. WHAT IS PARTIALLY DONE

### Pages — Exist but need upgrades
- ⚠️ **Enquiry page**: Single-step form. V6 requires multi-step flow with richer fields (WhatsApp, comfort level, budget range, special interests, country)
- ⚠️ **About Us**: Content is structured but founder section is thin (no real story, no real biography)
- ⚠️ **Sawla Moments hub**: Only 3 articles; hub lists them but page feels sparse
- ⚠️ **FAQ**: Good questions, but missing schema for all answers
- ⚠️ **Destination [slug] template**: Renders content but lacks related itineraries, related guides sidebar, and sticky CTA on long-form pages
- ⚠️ **Itinerary [slug] template**: Day-by-day renders, but no related destinations widget, no sticky enquiry panel, no map placeholder
- ⚠️ **Meet Our Guides / Drivers / Specialists**: Pages exist but are very thin — no real team member profiles, generic content only
- ⚠️ **Mobile Tented Camps**: Page exists but needs richer visual layout

### SEO/AIO
- ⚠️ Some meta title lengths exceed 60 chars (itinerary + style name combined is 70+)
- ⚠️ Meta description on itinerary pages falls back to overview excerpt — not crafted
- ⚠️ No `llms.txt` — missing AI discovery
- ⚠️ No `ai-index.json` — missing GEO/LLM structured index
- ⚠️ `lib/schema.ts` TouristTrip schema missing `touristType` on some pages
- ⚠️ Review schema referenced in docs but no actual Review/AggregateRating schema (correct — no fake reviews)

### Design
- ⚠️ Footer social icons use hover tooltip that appears below icon — gets clipped on small screens
- ⚠️ Trust bar on enquiry uses emoji — inconsistent with luxury brand aesthetic
- ⚠️ Some heading sizes inconsistent between mobile breakpoints

---

## 3. WHAT IS MISSING

### Pages — Not in codebase at all
- ❌ `/testimonials` — Testimonials hub page
- ❌ `/sawla-foundation` — Responsible/community mission page
- ❌ `/sawla-films` — Film division showcase page
- ❌ `/trip-finder` — Trip Finder / quiz tool

### Files
- ❌ `.eslintrc.json` — ESLint is interactive (blocks `npm run lint` in CI)
- ❌ `public/llms.txt` — AI model discovery file
- ❌ `public/ai-index.json` — LLM/GEO structured index
- ❌ `CHANGELOG_V6.md`
- ❌ `QA_REPORT_V6.md`
- ❌ `CONTENT_MATRIX_V6.csv`
- ❌ `MEDIA_REPLACEMENT_GUIDE_V6.md`
- ❌ `SEO_AIO_GEO_LLM_REPORT_V6.md`
- ❌ `LAUNCH_CHECKLIST_V6.md`

### Features
- ❌ Multi-step enquiry form (currently single-step)
- ❌ Sticky enquiry CTA on long destination/itinerary pages
- ❌ Related content blocks (related itineraries on destination pages)
- ❌ Real testimonials (content correctly absent, but hub page missing)
- ❌ Trip Finder / questionnaire flow
- ❌ Sawla Foundation trust/community page
- ❌ Sawla Films cinematic showcase page

---

## 4. WHAT IS BROKEN

- ❌ `npm run lint` — interactive (no .eslintrc.json). Will fail in CI/CD.
- ⚠️ Enquiry form trust bar uses emoji icons — minor but inconsistent

---

## 5. WHAT IS FAKE OR PLACEHOLDER

- ⚠️ All 93 images use `PlaceholderImage` (colored boxes via placehold.co) — correct temporary state, photo system documented
- ⚠️ Hero video poster images reference non-existent JPGs (home-hero-poster.jpg, destinations-hub-hero.jpg etc.) — poster falls through to color box
- ⚠️ `explore@sawlatours.com` — should be verified real address before launch
- ⚠️ Phone `+251 705 783 06` — should be verified before launch
- ⚠️ Founding date "2009" and "Addis Ababa" — assumed correct, must be verified
- ⚠️ Testimonials page missing — no fake reviews committed (GOOD), but need real client quotes before launch

---

## 6. WHAT MUST BE FIXED BEFORE LAUNCH

### Critical (blocks launch)
1. **Add `.eslintrc.json`** — `npm run lint` interactive prompt blocks CI
2. **Add `/testimonials` page** — hub listed in nav/footer references but 404s
3. **Add `public/llms.txt`** — AI search discovery
4. **Add `public/ai-index.json`** — GEO/LLM structured index
5. **310 real photographs** — all 93 image slots currently placeholders
6. **Wire email provider** — Resend (or similar) RESEND_API_KEY in env
7. **Set real domain** in `data/siteData.ts` → `SITE.url`
8. **Google Analytics** — GA4 tag ID in `app/layout.tsx`

### Important (pre-launch quality)
9. **Upgrade enquiry form** to multi-step flow
10. **Add `/sawla-films` page** — referenced in social, schema, and About page
11. **Add `/sawla-foundation` page** — responsible travel narrative
12. **Add sticky enquiry CTA** on destination/itinerary long pages
13. **Add related content blocks** (itineraries on destination pages)
14. **Improve team pages** (guides, specialists, drivers) with real profiles
15. **Fix meta title length** on itinerary pages (currently 70+ chars)

---

## 7. LOCAL COMPETITOR READINESS SCORE

**Benchmark:** Ethiopian tour operators (Abyssinia, Village Ethiopia, Ethiopian Quadrant, Nile Safaris, Tessema's)

| Category | Score | Notes |
|---|---|---|
| Design quality | 9.2/10 | Significantly ahead of all local competitors |
| Content depth | 8.5/10 | 36 itineraries + 16 destinations far exceeds most |
| Technical SEO | 8.0/10 | Strong, missing llms.txt and ai-index |
| Performance | 8.5/10 | Video poster-first, idle-mount |
| Mobile UX | 8.0/10 | Solid, some spacing issues |
| Trust signals | 7.0/10 | Missing testimonials hub, thin team pages |
| Conversion | 7.5/10 | Enquiry exists, needs multi-step upgrade |

**Overall vs. local competitors: 85th percentile — clearly premium leader**

---

## 8. INTERNATIONAL LUXURY BENCHMARK READINESS SCORE

**Benchmark:** Singita, andBeyond, Rhino Africa, Expert Africa, Black Tomato, Journeys by Design

| Category | Score | Notes |
|---|---|---|
| Design quality | 7.5/10 | Good system, placeholder images limit judgment |
| Content depth | 7.0/10 | Good volume, some pages thin (team, moments) |
| Photography | 3.0/10 | 310 placeholders — biggest gap |
| Technical SEO | 7.5/10 | Missing AI discovery files |
| Performance | 7.5/10 | Good strategy, needs real image verification |
| Trust signals | 6.0/10 | Missing testimonials, thin team content |
| Conversion UX | 6.5/10 | Enquiry functional, not luxury-grade flow |
| Accessibility | 7.0/10 | Solid foundations, some gaps |

**Overall vs. international luxury: 68th percentile — strong foundation, photography is decisive gap**

---

## 9. PRIORITY ACTION LIST

### P0 — Do Now (before any ZIP delivery)
- [x] Write this audit
- [ ] Add `.eslintrc.json`
- [ ] Add `llms.txt`
- [ ] Add `ai-index.json`
- [ ] Add `/testimonials` page
- [ ] Add `/sawla-films` page
- [ ] Add `/sawla-foundation` page
- [ ] Upgrade enquiry to multi-step
- [ ] Fix itinerary meta title length
- [ ] Add sticky enquiry CTA on destination/itinerary pages
- [ ] Add related itineraries block on destination pages
- [ ] Create all V6 documentation

### P1 — Before Launch (photographer delivers)
- [ ] 310 real photographs
- [ ] Wire Resend email
- [ ] Add Google Analytics GA4
- [ ] Set live domain
- [ ] Real client testimonials

### P2 — Post-launch enhancements
- [ ] Trip Finder questionnaire
- [ ] Real guide/driver profile photos and bios
- [ ] Sawla Films video gallery
- [ ] More Sawla Moments articles (target: 12+)
