# SAWLA TOURS — DEVELOPER HANDOFF README
## Next.js 15 · TypeScript · Tailwind CSS · App Router

**Version:** 1.0.0 — Production-ready foundation  
**Prepared by:** Sawla Tours content & strategy team  
**Date:** June 2026  
**Estimated integration work remaining:** 20–30 hours

---

## QUICK START

```bash
cd sawla-tours
npm install
npm run dev
# → http://localhost:3000
```

Requirements: Node.js 18+ · npm 9+

---

## PROJECT STRUCTURE

```
sawla-tours/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx                # Root layout — fonts, metadata, Header/Footer
│   ├── globals.css               # Design system — tokens, utilities, base styles
│   ├── page.tsx                  # Homepage (full implementation)
│   ├── not-found.tsx             # 404 page
│   ├── enquire/page.tsx          # Contact / Enquire page
│   ├── about-us/page.tsx         # About Us main
│   ├── why-travel-with-sawla-tours/page.tsx
│   ├── how-we-work/page.tsx
│   ├── meet-our-travel-specialists/page.tsx
│   ├── meet-our-guides/page.tsx
│   ├── meet-our-drivers/page.tsx
│   ├── mobile-tented-camps-ethiopia/page.tsx
│   ├── responsible-travel/page.tsx
│   ├── faq/page.tsx
│   ├── ethiopias-popular-destinations/
│   │   ├── page.tsx              # Destinations hub
│   │   └── [slug]/page.tsx       # Individual destination (dynamic)
│   ├── tours-by-experience/
│   │   ├── page.tsx              # Tour styles hub
│   │   ├── [style]/page.tsx      # Tour style listing (dynamic)
│   │   └── [style]/[slug]/page.tsx # Individual itinerary (dynamic)
│   ├── ethiopia-travel-guide/
│   │   ├── page.tsx              # Field guides hub
│   │   └── [slug]/page.tsx       # Individual guide (dynamic)
│   ├── ethiopia-wildlife/
│   │   ├── endemic-species/page.tsx  # Species hub
│   │   └── [slug]/page.tsx           # Individual species (dynamic)
│   └── sawla-moments/
│       ├── page.tsx              # Sawla Moments hub
│       └── [slug]/page.tsx       # Individual article (dynamic)
├── components/
│   ├── layout/
│   │   ├── Header.tsx            # Fixed nav with dropdowns + mobile hamburger
│   │   ├── Footer.tsx            # 4-column footer
│   │   └── WhatsAppButton.tsx    # Fixed floating WhatsApp button
│   └── ui/
│       ├── PlaceholderImage.tsx  # Development placeholder (swap for next/image)
│       └── SchemaScript.tsx      # JSON-LD injector for <head>
├── data/
│   └── siteData.ts               # ALL content data — destinations, tours, testimonials
├── lib/
│   └── schema.ts                 # JSON-LD schemas for all page types
├── public/
│   └── images/                   # Add real images here (see naming convention below)
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── README_DEVELOPER.md
```

---

## DESIGN SYSTEM

### Colors (Tailwind custom tokens)

| Token | Hex | Usage |
|-------|-----|-------|
| `ivory` | `#FAF7F2` | Page background |
| `charcoal` | `#1C1C1A` | Dark sections, text |
| `gold` | `#C4931A` | Accent, CTAs, labels |
| `amber` | `#E8A838` | Hover states |
| `warmgrey` | `#5C5A54` | Body text |
| `sand` | `#E8DDC7` | Borders, card backgrounds |
| `coffee` | `#6B4A2F` | Warm accents |

Use as Tailwind classes: `bg-ivory`, `text-charcoal`, `border-sand`, `text-gold`, etc.

### Typography

- **Display headings:** `font-display` (Cormorant Garamond, weight 300)
- **Body / UI:** `font-body` (DM Sans)
- **Display sizes:** `text-display-xl`, `text-display-lg`, `text-display-md`, `text-display-sm`
- **Body sizes:** `text-body-lg` (1.125rem), `text-body-md` (1rem), `text-body-sm` (0.875rem)
- **Labels:** `text-label` + `label-eyebrow` utility class

### Reusable CSS utility classes (in globals.css)

```css
.container-max     /* max-w-container with responsive padding */
.section-padding   /* py-28 section spacing */
.section-padding-sm /* py-16 compact section */
.label-eyebrow     /* small uppercase gold tracking label */
.heading-display   /* display serif font + letter spacing */
.pull-quote        /* left-border blockquote styling */
.btn-primary       /* dark fill button */
.btn-ghost         /* outline button dark */
.btn-ghost-light   /* outline button light (on dark bg) */
.card-hover        /* translateY + shadow on hover */
.image-overlay     /* gradient overlay for image cards */
.hero-video-container /* full-height hero video wrapper */
```

---

## IMAGE MANAGEMENT

### Development (current state)
All images use `<PlaceholderImage>` component which renders labelled, colour-coded placeholders from placehold.co. The domain is already added to `next.config.js`.

### Swapping to real images

**Step 1** — Add real photos to `/public/images/` following this structure:
```
/public/images/
  /home/
  /destinations/
    /lalibela/
    /simien-mountains/
    ... (one folder per destination)
  /tours/
    /historic/
    /wildlife/
    ... etc
  /guides/
  /species/
  /about/
  /camp/
  /moments/
```

**Step 2** — Replace `<PlaceholderImage>` with `<Image>` from next/image:

```tsx
// Before
<PlaceholderImage
  filename="dest-lalibela-hero.jpg"
  width={1920}
  height={1080}
  category="destination"
/>

// After
import Image from 'next/image'
<Image
  src="/images/destinations/lalibela/dest-lalibela-hero.jpg"
  alt="Rock-hewn churches of Lalibela, Ethiopia at dawn"
  width={1920}
  height={1080}
  priority  /* add on above-fold hero images only */
  className="object-cover w-full h-full"
/>
```

### Image naming convention
```
dest-[destination-slug]-hero.jpg         (1920×1080)
dest-[destination-slug]-gallery-1.jpg    (1200×800)
tour-[itinerary-slug]-hero.jpg           (1920×1080)
guide-[guide-slug]-hero.jpg              (1920×1080)
species-[species-slug]-portrait.jpg      (1920×1080)
about-[person-name]-portrait.jpg         (800×800 square)
about-vehicle-fleet-lineup.jpg           (1200×800)
camp-[feature].jpg                       (1200×800)
moments-[article-slug]-hero.jpg          (1920×1080)
home-hero-main.jpg                       (1920×1080)
```

---

## HERO VIDEO

The homepage hero has a `<video>` element ready for the Sawla Films footage.

**When video is ready:**
1. Export two versions from Sawla Films:
   - Desktop: `public/videos/sawla-hero-desktop.mp4` — 1080p, ≤10 MB
   - Mobile: `public/videos/sawla-hero-mobile.mp4` — 720p, ≤6 MB

2. Uncomment the `<source>` lines in `app/page.tsx`:
```tsx
<source src="/videos/sawla-hero-desktop.mp4" type="video/mp4" media="(min-width: 768px)" />
<source src="/videos/sawla-hero-mobile.mp4" type="video/mp4" />
```

3. Update the poster image path.

---

## CONTENT MANAGEMENT

### Where content lives
All structured data (destinations, tour styles, testimonials, species, articles) is in `/data/siteData.ts`.

### Long-form page content
Dynamic pages (destinations, guides, species, articles) are designed to render MDX content from `/content/` directory.

**Create this directory structure:**
```
content/
  destinations/
    lalibela.md
    simien-mountain-national-park.md
    ... (16 files — use content from the delivered markdown files)
  itineraries/
    classic-northern-ethiopia-10-days.md
    ... (36 files)
  guides/
    when-to-visit-ethiopia.md
    ... (15 files)
  species/
    ethiopian-wolf.md
    ... (13 files)
  moments/
    gelada-monkey-simien-mountains.md
    why-ethiopia-not-safari-destination.md
    how-we-plan-custom-ethiopia-journey.md
```

**All markdown content files are in the delivered content package.**

### Rendering MDX
Install MDX support:
```bash
npm install @next/mdx @mdx-js/loader @mdx-js/react
```

Or use `next-mdx-remote` for dynamic rendering:
```bash
npm install next-mdx-remote
```

---

## FORM INTEGRATION

The enquiry form in `app/enquire/page.tsx` posts to `/api/enquire`.

**Create the API route:**
```
app/api/enquire/route.ts
```

Options:
- **Resend** (recommended): Email forwarding to `explore@sawlatours.com` + auto-reply
- **Nodemailer** with SMTP: Direct email
- **Formspree**: Zero-code, add action URL to form

Include:
- Honeypot spam protection (already in form HTML)
- Auto-reply confirmation to traveler
- Google Analytics event: `contact_form_submitted`

---

## SEO CHECKLIST

- [ ] `metadataBase` in `app/layout.tsx` — set to actual domain
- [ ] All `<Image>` tags have descriptive `alt` text (provided in content package)
- [ ] JSON-LD `SchemaScript` injected on all pages (already in layout and page files)
- [ ] 301 redirect: `/contact-us` → `/enquire` (in `next.config.js` — already configured)
- [ ] Canonical URLs set correctly (via `metadata.alternates.canonical` per page)
- [ ] `robots.txt` → create `public/robots.txt`
- [ ] `sitemap.xml` → create `app/sitemap.ts` using Next.js sitemap API
- [ ] Submit to Google Search Console after launch

**robots.txt** (`public/robots.txt`):
```
User-agent: *
Allow: /
Sitemap: https://www.sawlatours.com/sitemap.xml
```

---

## ANALYTICS & TRACKING

Recommended: Google Analytics 4 via `@next/third-parties`

```bash
npm install @next/third-parties
```

```tsx
// In app/layout.tsx
import { GoogleAnalytics } from '@next/third-parties/google'
<GoogleAnalytics gaId="G-XXXXXXXXXX" />
```

**Conversion events to implement (in relevant components):**
```
contact_form_started
contact_form_submitted
whatsapp_clicked
homepage_hero_cta_click
homepage_tour_style_click
homepage_destination_card_click
article_shared
```

---

## WHATSAPP INTEGRATION

The floating button is in `components/layout/WhatsAppButton.tsx`.

**Update the phone number in `data/siteData.ts`:**
```ts
whatsapp: 'https://wa.me/25170578306?text=...'
```
Verify the actual number before launch against the live Sawla Tours contact.

---

## NEWSLETTER

The newsletter form in `app/sawla-moments/page.tsx` needs an email service.

**Recommended: Kit (ConvertKit)**
1. Create form in Kit dashboard
2. Replace the `<form>` action with the Kit embed endpoint
3. Add GDPR consent note for EU visitors (already in design — wire up logic)

---

## CRITICAL BEFORE LAUNCH

1. [ ] **Phone number** — verify `+251 705 783 06` is correct in `data/siteData.ts`
2. [ ] **Tourism license** — add verified license number to About Us and trust blocks
3. [ ] **Real testimonials** — all 15 testimonials are in `data/siteData.ts` — confirm permission to publish each
4. [ ] **Google Maps embed** — add office embed URL in `app/enquire/page.tsx` (search "SAWLA_TOURS_OFFICE_COORDINATES")
5. [ ] **Social media URLs** — verify Instagram/Facebook/YouTube links in `data/siteData.ts`
6. [ ] **301 redirect** — confirm ethiorenaissancetours.com → sawlatours.com is live at DNS level
7. [ ] **eVisa URL** — confirm `https://www.evisa.gov.et` is still the correct official URL
8. [ ] **Favicon** — add `public/favicon.ico` and `public/apple-touch-icon.png`

---

## PERFORMANCE TARGETS

| Metric | Target |
|--------|--------|
| LCP | < 2.5s |
| CLS | < 0.1 |
| FID/INP | < 200ms |
| Lighthouse score | ≥ 90 |

Key optimizations already configured:
- `next/image` with WebP/AVIF formats
- Cormorant + DM Sans via `next/font` (no layout shift)
- Schema scripts injected server-side
- Placeholder images lazy-loaded

---

## DEPLOYMENT

Recommended: **Vercel** (zero-config for Next.js)

```bash
npm run build    # Verify no TypeScript errors
vercel --prod    # Deploy
```

Set environment variables in Vercel dashboard:
```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
RESEND_API_KEY=re_xxxxx           (if using Resend for form)
```

---

## CONTENT FILES DELIVERED

All 93 pages of content are in the content package:

| Section | Files | Location |
|---------|-------|---------|
| 36 itineraries | .md | /content-package/itineraries/ |
| 16 destinations | .md | /content-package/destinations/ |
| 15 field guides | .md | /content-package/guides/ |
| 13 species | .md | /content-package/species/ |
| 3 Sawla Moments articles | .md | /content-package/moments/ |
| 8 About Us pages | .md | /content-package/about/ |
| JSON-LD schemas | .jsonld | /content-package/schemas/ |
| Image manifest | .json | /content-package/Sawla_Tours_Image_Manifest.json |
| Internal linking map | .csv | /content-package/Sawla_Tours_Homepage_Internal_Linking_Map_COMPLETE.csv |
| Photo upload guide | .md | /content-package/Sawla_Tours_Photo_Upload_Guide.md |

---

*Good luck with the build. Sawla Tours is going live.*
