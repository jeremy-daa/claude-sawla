# Sawla Tours — Developer Handoff

Production-ready Next.js 15 website for **Sawla Tours**, an Ethiopia-based private tour operator.
Built with App Router, TypeScript, Tailwind CSS, and Framer Motion.

> **Note:** Sawla Tours and Sawla Films are two separate websites. This package is **Sawla Tours only**.

---

## 1. Quick Start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (62 routes, all pass)
npm start          # serve production build
```

Requirements: Node 18+ (built/tested on Node 24).

---

## 2. Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + custom design tokens in `app/globals.css` |
| Animation | Framer Motion 11 (`components/ui/AnimateIn.tsx`) |
| Fonts | Cormorant Garamond (display) + DM Sans (body) via `next/font` |
| SEO | Per-page metadata + JSON-LD (`lib/schema.ts`) |

---

## 3. Design System

Defined in `tailwind.config.ts` + `app/globals.css`:

- **Volcanic Rock** `#2a2724` — dark sections, headers
- **Ivory** `#f8f6f1` — base background
- **Teff Gold** `#c9941a` — accents, CTAs
- Typography scale, spacing, motion easing all tokenised
- Reusable button classes: `.btn-primary`, `.btn-gold`, `.btn-ghost`, `.btn-ghost-light`
- `.container-max`, `.section-padding`, `.heading-display`, `.label-eyebrow`, `.pull-quote`

---

## 4. Project Structure

```
app/
  page.tsx                                  Homepage (12 sections + Trip Wizard)
  about-us/                                 Founder story, values, team, timeline
  why-travel-with-sawla-tours/              Social proof, testimonials, comparison
  how-we-work/                              4-step process, FAQ
  enquire/                                  Contact form (+ /api/enquire route)
  ethiopias-popular-destinations/
    page.tsx                                Destinations hub
    [slug]/page.tsx                         16 destination pages (dynamic)
  tours-by-experience/
    page.tsx                                Tour styles hub
    [style]/page.tsx                        6 style pages
    [style]/[slug]/page.tsx                 Itinerary pages (dynamic)
  ethiopia-travel-guide/
    page.tsx                                Guide hub (15 guides)
    [slug]/page.tsx                         Individual guide pages
  ethiopia-wildlife/[slug]/                 Species pages
  meet-our-travel-specialists/              Planning team
  meet-our-guides/                          Field guides
  meet-our-drivers/                         Drivers
  mobile-tented-camps-ethiopia/             Camp expeditions
  responsible-travel/                       Conservation commitments
  sawla-moments/                            Editorial hub + articles
  privacy-policy/  terms/                   Legal
  sitemap.ts                                Dynamic sitemap (all routes)

components/
  layout/   Header.tsx, Footer.tsx, WhatsAppButton.tsx
  home/     HeroSection.tsx, TripWizard.tsx
  ui/       AnimateIn.tsx, ScrollToTop.tsx, PlaceholderImage.tsx, SchemaScript.tsx

data/
  siteData.ts              SITE config, NAV, destinations, tour styles, testimonials
  destinationContent.ts    Rich content for all 16 destinations
  itineraryData.ts         Tour itineraries with day-by-day
  fieldGuideContent.ts     Travel guide article content

lib/schema.ts              JSON-LD builders (Article, Breadcrumb, FAQ, ItemList, etc.)
public/
  brand/                   Sawla Tours logo (white + dark PNG)
  videos/sawla-hero.mp4    Homepage hero video (Sawla Films footage)
  robots.txt
```

---

## 5. Before Launch — Developer Checklist

These are intentionally left for the developer with real credentials/assets:

- [ ] **Images** — Replace `<PlaceholderImage>` output with real photos. Component is in
      `components/ui/PlaceholderImage.tsx`; swap to `next/image` with real `/public/images/...` paths.
- [ ] **Enquiry email** — Wire a provider in `app/api/enquire/route.ts` (Resend snippet is stubbed in comments).
- [ ] **Google Analytics** — Add GA4 ID in `app/layout.tsx` (placeholder comment present).
- [ ] **Favicon set** — Add `favicon.ico`, `apple-touch-icon.png`, `site.webmanifest` to `public/`.
- [ ] **Maps embed** — Optional Google Maps on the enquire page.
- [ ] **Verify business details** — Phone `+251 705 783 06`, email, tourism license number in `data/siteData.ts`.
- [ ] **Hero video** — Currently 14MB single file. Recommend generating a smaller mobile-optimised version
      and adding a `<source media="(max-width:768px)">` in `components/home/HeroSection.tsx`.

---

## 6. SEO / AIO / GEO Notes

- Every page sets exact metadata: titles 50–60 chars, descriptions 150–160 chars.
- Canonical URLs, Open Graph, and Twitter Card on all primary pages.
- JSON-LD across the site: Organization, TravelAgency, TouristDestination, TouristTrip,
  Article, FAQPage, BreadcrumbList, ItemList, Speakable.
- Hidden `sr-only` entity blocks on key pages provide AI/LLM-crawler context.
- `app/sitemap.ts` generates the full sitemap automatically; `public/robots.txt` references it.

---

## 7. Build Status

```
✓ Compiled successfully
✓ 62/62 routes generated
```

Static where possible, SSG for dynamic content collections, on-demand for parameterised tour routes.
