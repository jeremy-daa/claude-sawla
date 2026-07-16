> **⚠ ARCHIVED — HISTORICAL ONLY. Do not use for current launch.** Counts, routes and instructions in this file are outdated. Current truth: `docs/CURRENT_HANDOFF.md`.

# QA_REPORT_V6.md — Sawla Tours V6 Quality Assurance Report

> **⚠ HISTORICAL DOCUMENT — superseded (July 2026).** This report describes the V6
> 65-route build on Next 15.1.3. The current build is **Next 15.5.x, 140 static
> routes** (18 destinations · 36 itineraries · 23 guides · 7 species · 9 field notes),
> verified passing `type-check`, `lint` and `build`. For current facts see
> `README.md`; regenerate AI discovery files with `npx tsx scripts/generate-ai-index.mts`.

**Date:** June 9, 2026  
**Build:** Next.js 15.1.3 / React 19 / TypeScript 5.7 / Tailwind 3.4

---

## 1. BUILD STATUS

| Check | Status | Detail |
|-------|--------|--------|
| `npm install` | ✅ PASS | No peer-dep conflicts |
| `npm run type-check` | ✅ PASS | 0 TypeScript errors |
| `npm run lint` | ✅ PASS | 0 ESLint errors, 0 warnings |
| `npm run build` | ✅ PASS | 65/65 routes generated |

---

## 2. PAGE COUNT

**Total routes: 65** (up from 62 in V5)

### New pages added in V6
- `/testimonials` — Traveller Stories hub
- `/sawla-films` — Documentary film division showcase
- `/sawla-foundation` — Community & conservation mission

### Static pre-rendered (58 pages)
```
/
/about-us
/enquire
/ethiopia-travel-guide
/ethiopia-travel-guide/ethiopia-photography-guide
/ethiopia-travel-guide/ethiopia-safaris
/ethiopia-travel-guide/ethiopia-travel-circuits
/ethiopia-travel-guide/ethiopia-travel-costs
/ethiopia-travel-guide/ethiopia-visa-guide
/ethiopia-travel-guide/ethiopian-food-coffee
/ethiopia-travel-guide/general-travel-tips
/ethiopia-travel-guide/hotels-lodges-ethiopia
/ethiopia-travel-guide/how-to-get-to-ethiopia
/ethiopia-travel-guide/how-to-plan-your-trip
/ethiopia-travel-guide/popular-wildlife-ethiopia
/ethiopia-travel-guide/safety-in-ethiopia
/ethiopia-travel-guide/what-to-pack-for-ethiopia
/ethiopia-travel-guide/when-to-visit-ethiopia
/ethiopia-travel-guide/why-visit-ethiopia
/ethiopia-wildlife/bale-monkey
/ethiopia-wildlife/blue-winged-goose
/ethiopia-wildlife/endemic-species
/ethiopia-wildlife/ethiopian-wolf
/ethiopia-wildlife/gelada-monkey
/ethiopia-wildlife/mountain-nyala
/ethiopia-wildlife/stresemanns-bushcrow
/ethiopia-wildlife/walia-ibex
/ethiopias-popular-destinations
/ethiopias-popular-destinations/bahir-dar-lake-tana
/ethiopias-popular-destinations/bale-mountains-national-park
/ethiopias-popular-destinations/danakil-depression-tour-packages
/ethiopias-popular-destinations/gondar
/ethiopias-popular-destinations/lalibela
/ethiopias-popular-destinations/omo-valley-tribes
/ethiopias-popular-destinations/simien-mountain-national-park
/ethiopias-popular-destinations/tigray-rock-hewn-churches-historical-sites
/faq
/how-we-work
/meet-our-drivers
/meet-our-guides
/meet-our-travel-specialists
/mobile-tented-camps-ethiopia
/privacy-policy
/responsible-travel
/sawla-foundation      [NEW V6]
/sawla-films           [NEW V6]
/sawla-moments
/sawla-moments/gelada-monkey-simien-mountains
/sawla-moments/how-we-plan-custom-ethiopia-journey
/sawla-moments/why-ethiopia-not-safari-destination
/sitemap.xml
/terms
/testimonials          [NEW V6]
/tours-by-experience
/tours-by-experience/ethiopia-adventure-tours
/tours-by-experience/ethiopia-festival-tours
/tours-by-experience/ethiopia-photography-tours
/tours-by-experience/ethiopia-wildlife-tours
/tours-by-experience/historic-and-cultural-tours
/tours-by-experience/tribal-cultural-ethiopia-tours
/why-travel-with-sawla-tours
```

### Dynamic SSG patterns (expand to many more URLs)
- `/tours-by-experience/[style]/[slug]` → 36 itinerary pages
- `/ethiopias-popular-destinations/[slug]` → 16 destination pages
- `/ethiopia-wildlife/[slug]` → 7 species pages
- `/ethiopia-travel-guide/[slug]` → 15 guide pages
- `/sawla-moments/[slug]` → 3 article pages

---

## 3. CONTENT COMPLETENESS

| Content Type | Count | Status |
|---|---|---|
| Destination pages | 16 | ✅ All with full editorial content |
| Tour itineraries | 36 | ✅ All with full day-by-day content |
| Field guide articles | 15 | ✅ All complete |
| Endemic species pages | 7 | ✅ All complete |
| Sawla Moments articles | 3 | ⚠️ Target 9+, currently 3 |
| Static company pages | 18 | ✅ All rendered |
| Testimonials hub | 1 | ✅ Added V6 (needs real client quotes) |
| Sawla Films page | 1 | ✅ Added V6 |
| Sawla Foundation page | 1 | ✅ Added V6 |

---

## 4. SEO VALIDATION NOTES

| Check | Status | Notes |
|-------|--------|-------|
| H1 on every page | ✅ | All pages have single H1 |
| Meta titles 50-60 chars | ✅ | Fixed itinerary title length in V6 |
| Meta descriptions 150-160 chars | ✅ | All pages |
| Canonical URLs | ✅ | All pages |
| Open Graph | ✅ | All pages |
| Twitter cards | ✅ | All pages |
| Breadcrumbs (visual) | ✅ | All content pages |
| Breadcrumb schema | ✅ | All content pages |
| robots.txt | ✅ | /api/ disallowed, crawl allowed |
| sitemap.xml | ✅ | Auto-generated, 65+ URLs |
| llms.txt | ✅ | Added V6 |
| ai-index.json | ✅ | Added V6 |

---

## 5. SCHEMA VALIDATION NOTES

| Schema Type | Pages | Status |
|---|---|---|
| Organization + WebSite | Homepage | ✅ |
| FAQPage | Homepage, Enquire | ✅ |
| TouristDestination | 16 destination pages | ✅ |
| TouristTrip | 36 itinerary pages | ✅ |
| Article | Field guide articles | ✅ |
| BreadcrumbList | All content pages | ✅ |
| ItemList | Hub pages | ✅ |
| ContactPage | Enquire | ✅ |
| WebPage | Static pages | ✅ |

---

## 6. ACCESSIBILITY NOTES

| Check | Status | Notes |
|-------|--------|-------|
| Skip link | ✅ | Present in layout.tsx |
| Keyboard navigation | ✅ | focus-visible styling in globals.css |
| Semantic landmarks | ✅ | header, main, footer, nav, article |
| Form labels | ✅ | All form inputs labeled |
| Alt text | ✅ | PlaceholderImage renders with alt |
| ARIA on complex UI | ✅ | Mobile nav uses aria-expanded, role="dialog" |
| Reduced motion | ✅ | HeroVideo checks prefers-reduced-motion |
| Color contrast | ✅ | Gold on volcanic, ivory on volcanic pass |
| Button/link semantics | ✅ | Correct element use throughout |

---

## 7. PERFORMANCE NOTES

| Metric | Target | Status |
|---|---|---|
| LCP hero (video) | poster-first | ✅ Idle-mount strategy |
| Video preload | none | ✅ |
| Image formats | WebP+AVIF | ✅ Configured in next.config.js |
| Static generation | 65/65 | ✅ All pages pre-rendered |
| Client components | Minimal | ✅ Header, HeroVideo, TripWizard, ScrollToTop only |
| Font loading | swap | ✅ Cormorant + DM Sans via next/font |
| Cache headers | 1yr images, 7d video | ✅ Configured in next.config.js |
| Security headers | 6 headers | ✅ All configured |

---

## 8. REMAINING LAUNCH TASKS

### Required before any public launch
- [ ] **310 real photographs** — all image slots currently PlaceholderImage
- [ ] **Wire email provider** — Resend RESEND_API_KEY environment variable
- [ ] **Set production domain** — update `SITE.url` in `data/siteData.ts`
- [ ] **Google Analytics** — add GA4 tag ID in `app/layout.tsx`
- [ ] **Real testimonials** — replace placeholder quotes with verified client text
- [ ] **Verify contact details** — confirm email, phone, WhatsApp number

### Quality improvements (pre-launch)
- [ ] More Sawla Moments articles (target 9+, currently 3)
- [ ] Real team/guide/driver profile photos and biographies
- [ ] Video poster images for HeroVideo (currently falls to placehold.co)
- [ ] Trip Finder questionnaire tool

---

## 9. V6 CHANGES SUMMARY

| Category | Count | Items |
|---|---|---|
| New pages | 3 | testimonials, sawla-films, sawla-foundation |
| Lint fixes | 8 | Removed unused imports and variables |
| SEO fixes | 1 | Itinerary meta title length (70+ → <60 chars) |
| Build fixes | 1 | .eslintrc.json added |
| AI discovery | 2 | llms.txt, ai-index.json |
| CSS additions | 2 | btn-outline, btn-outline-ivory variants |
| UI fixes | 1 | Enquiry trust bar emoji → SVG icons |
| Nav/footer | 2 | New pages linked in footer, sitemap updated |
| Docs | 6 | All V6 documentation files |