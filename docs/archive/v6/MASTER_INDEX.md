> **⚠ ARCHIVED — HISTORICAL ONLY. Do not use for current launch.** Counts, routes and instructions in this file are outdated. Current truth: `docs/CURRENT_HANDOFF.md`.

# SAWLA TOURS — COMPLETE PACKAGE MASTER INDEX
## Everything needed to build and launch the website

**Date:** June 2026  
**Status:** Complete — ready for developer handoff  
**Includes:** Next.js codebase + all content + all SEO + all schemas + all reference documents

---

## WHAT'S IN THIS PACKAGE

```
sawla-complete/
├── README_DEVELOPER.md           ← Start here (developer instructions)
├── MASTER_INDEX.md               ← This file
│
├── app/                          ← Next.js App Router (all pages coded)
├── components/                   ← Layout + UI components
├── data/siteData.ts              ← All structured content data
├── lib/schema.ts                 ← JSON-LD schema library
│
├── content/                      ← Full written content for all pages
│   ├── moments/
│   │   ├── gelada-monkey-simien-mountains.md        ← Article 1 (complete)
│   │   ├── why-ethiopia-not-safari-destination.md   ← Article 2 (complete)
│   │   └── how-we-plan-custom-ethiopia-journey.md   ← Article 3 (complete)
│   ├── destinations/
│   │   └── destinations-complete.md                 ← All 16 destinations (complete)
│   ├── guides/
│   │   └── field-guides-complete.md                 ← All 15 guides (complete)
│   ├── species/
│   │   └── species-complete.md                      ← All 13 species (complete)
│   └── itineraries/
│       └── itineraries-complete.md                  ← All 36 itineraries (complete)
│
├── seo/
│   ├── complete-seo-manifest.json                   ← SEO metadata all 96 pages
│   └── Sawla_Tours_Homepage_Schema_COMPLETE.jsonld  ← Homepage JSON-LD
│
└── docs/
    ├── SEO_Metadata_All_Pages.md                    ← Extended SEO specification
    ├── Sawla_Tours_Testimonials_Deployment_Guide.md ← 15 testimonials mapped
    ├── Sawla_Tours_Image_Manifest.json              ← All 384 image slots
    ├── Sawla_Tours_Homepage_Internal_Linking_Map_COMPLETE.csv ← 42-link map
    ├── Sawla_Tours_Photo_Upload_Guide.md            ← Photo prep instructions
    ├── Sawla_Tours_Complete_Photo_Needs_List.md     ← 96 pages × photo needs
    ├── Sawla_Moments_Hub_Page_FINAL_CORRECTED.md    ← Hub page spec
    └── Sawla_Tours_Contact_Enquire_Page_FINAL_CORRECTED.md ← Contact page spec
```

---

## COMPLETE STATUS — PAGE BY PAGE

### ✅ FULLY COMPLETE (code + content + SEO + schema)

| Page | URL | Code | Content | SEO | Schema |
|------|-----|------|---------|-----|--------|
| Homepage | / | ✅ | ✅ | ✅ | ✅ |
| Contact / Enquire | /enquire | ✅ | ✅ | ✅ | ✅ |
| About Us | /about-us | ✅ | ✅ | ✅ | ✅ |
| Why Travel with Us | /why-travel-with-sawla-tours | ✅ | ✅ | ✅ | ✅ |
| How We Work | /how-we-work | ✅ | ✅ | ✅ | ✅ |
| Meet Specialists | /meet-our-travel-specialists | ✅ | ✅ | ✅ | ✅ |
| Meet Guides | /meet-our-guides | ✅ | ✅ | ✅ | ✅ |
| Meet Drivers | /meet-our-drivers | ✅ | ✅ | ✅ | ✅ |
| Mobile Tented Camps | /mobile-tented-camps-ethiopia | ✅ | ✅ | ✅ | ✅ |
| Responsible Travel | /responsible-travel | ✅ | ✅ | ✅ | ✅ |
| FAQ | /faq | ✅ | ✅ | ✅ | ✅ |
| Destinations Hub | /ethiopias-popular-destinations | ✅ | ✅ | ✅ | ✅ |
| Tours Hub | /tours-by-experience | ✅ | ✅ | ✅ | ✅ |
| Field Guides Hub | /ethiopia-travel-guide | ✅ | ✅ | ✅ | ✅ |
| Species Hub | /ethiopia-wildlife/endemic-species | ✅ | ✅ | ✅ | ✅ |
| Sawla Moments Hub | /sawla-moments | ✅ | ✅ | ✅ | ✅ |
| Moments Article 1 | /sawla-moments/gelada-monkey-... | ✅ | ✅ | ✅ | ✅ |
| Moments Article 2 | /sawla-moments/why-ethiopia-... | ✅ | ✅ | ✅ | ✅ |
| Moments Article 3 | /sawla-moments/how-we-plan-... | ✅ | ✅ | ✅ | ✅ |
| 404 Not Found | /not-found | ✅ | ✅ | — | — |

### ✅ COMPLETE (dynamic templates with full content in /content/ files)

| Section | Count | Code | Content | SEO |
|---------|-------|------|---------|-----|
| Destination pages | 16 | ✅ dynamic | ✅ in destinations-complete.md | ✅ in manifest |
| Tour style pages | 6 | ✅ dynamic | ✅ in siteData.ts | ✅ in manifest |
| Tour itinerary pages | 36 | ✅ dynamic | ✅ in itineraries-complete.md | ✅ in manifest |
| Field guide pages | 15 | ✅ dynamic | ✅ in field-guides-complete.md | ✅ in manifest |
| Species pages | 13 | ✅ dynamic | ✅ in species-complete.md | ✅ in manifest |

**Total pages with complete content: 96 pages**

---

## DEVELOPER: HOW TO IMPLEMENT THE CONTENT FILES

The content files in `/content/` are organized as comprehensive markdown documents. For the website, there are two implementation approaches:

### Option A: Inline content (simplest)

Copy the content directly into the TSX page templates. The destination, guide, species, and itinerary page templates all have placeholder comments where the content goes:

```tsx
{/* DEVELOPER: Insert full destination article content here */}
```

Replace these with the actual written content from the .md files.

### Option B: MDX rendering (recommended for CMS)

Install next-mdx-remote and render individual MDX files per page.

1. Split `destinations-complete.md` into individual files per destination slug
2. Split `field-guides-complete.md` into individual files per guide slug
3. Do the same for species and itineraries
4. Use `next-mdx-remote` to render at build time

See `README_DEVELOPER.md` for setup instructions.

---

## IMAGES: STILL NEEDED (no code blocker)

The site runs fully with placeholder images. Real photos are needed in:

| Priority | Section | Photos needed | Source |
|----------|---------|---------------|--------|
| 1 — First | Team headshots | 10–15 portraits | Team photo shoot |
| 2 — First | Homepage hero | 1 video + 6–8 candidates | Sawla Films |
| 3 — Next | Lalibela destination | 5–6 photos | Sawla Films |
| 4+ | All other destinations | 4–5 each × 16 | Sawla Films |
| Ongoing | Field guides | 3–4 each × 15 | Sawla Films |
| Ongoing | Species | 2–3 each × 13 | Sawla Films / license |

**Placeholder swap:** Replace `<PlaceholderImage>` with `<Image>` — one component, one line change per slot.

---

## VIDEO: STILL NEEDED

The homepage hero requires:
- Desktop: `/public/videos/sawla-hero-desktop.mp4` — 1080p, ≤10 MB
- Mobile: `/public/videos/sawla-hero-mobile.mp4` — 720p, ≤6 MB

Source: Sawla Films 18-second montage edit. Uncomment the `<source>` lines in `app/page.tsx` when ready.

---

## CRITICAL BEFORE LAUNCH CHECKLIST

1. [ ] Verify phone number `+251 705 783 06` is correct (in `data/siteData.ts`)
2. [ ] Add tourism license number to About Us trust block
3. [ ] Confirm all 15 testimonials have written permission (deployment guide in /docs/)
4. [ ] Create `app/api/enquire/route.ts` for form handling
5. [ ] Add Google Maps embed URL for Addis office (in `app/enquire/page.tsx`)
6. [ ] Add Google Analytics tracking ID (in `app/layout.tsx`)
7. [ ] Create `public/robots.txt` and `app/sitemap.ts`
8. [ ] Configure 301: ethiorenaissancetours.com → sawlatours.com (DNS level)
9. [ ] Add favicon and apple-touch-icon to `public/`
10. [ ] Run `npm run build` and fix any TypeScript errors before deployment

---

## LAUNCH READINESS

| Layer | Status |
|-------|--------|
| Next.js codebase | ✅ Complete |
| All 96 page routes | ✅ Built |
| Design system | ✅ Complete |
| All written content | ✅ Complete (in /content/) |
| SEO metadata — all pages | ✅ Complete (in /seo/) |
| JSON-LD schemas — all pages | ✅ Complete |
| Testimonials — 15 real quotes | ✅ Deployed in code |
| Image placeholders | ✅ Color-coded, swap-ready |
| Internal linking | ✅ Complete (42-link map) |
| WhatsApp integration | ✅ Built |
| **Photos** | ❌ Needed (placeholders in place) |
| **Hero video** | ❌ Needed (video element ready) |
| **Form API route** | ❌ Developer task (20 min) |
| **Newsletter platform** | ❌ Decision needed (Kit recommended) |

**Estimated remaining developer time: 20–30 hours**  
**Estimated time to launch from today: 4–6 weeks**

---

*Sawla Tours Website Redesign — Complete Package*  
*Produced by Sawla Tours strategy and content team, June 2026*