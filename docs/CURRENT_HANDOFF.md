# Sawla Tours — Current Handoff (single source of truth)

**Last updated:** July 16, 2026
**Status:** launch-ready pending photography + deployment (see `LAUNCH_READINESS_CHECKLIST.md`)

If any other document in this repository disagrees with this file, **this file wins**.
Everything under `docs/archive/` is historical and must not be used for current work.

## Current build facts

| Fact | Value | Verified by |
|---|---|---|
| Framework | Next.js 15.5.x (App Router) · React 19 · TypeScript 5.7 · Tailwind 3.4 | `package-lock.json`, build output |
| Build routes | **140 static pages** | `npm run build` output |
| Sitemap URLs | **133** | live `/sitemap.xml` |
| Destinations | **18** | `data/destinationsPremium.json` |
| Itineraries | **36** (across 7 itinerary-backed styles; 9 style hubs total) | `data/itineraryData.ts` |
| Travel guides | **23** | `data/fieldGuideContent.ts` |
| Species profiles | **7** | `data/siteData.ts` (`SPECIES`) |
| Field notes (Moments) | **9** | `data/siteData.ts` (`MOMENTS_ARTICLES`) |
| Policy pages | 10 — **legal-reviewed and figures confirmed, July 2026** | `components/legal/LegalPageLayout.tsx` internal note |

## Generated surfaces — never edit these outputs by hand

| Surface | Generated from | Regenerate with |
|---|---|---|
| `/robots.txt` | `app/robots.ts` | build (there is **no** static robots file in `public/` — do not add one; it would override the generated route, as happened once with a `Disallow: /_next/` block) |
| `/sitemap.xml` | `app/sitemap.ts` | build |
| `public/llms.txt` + `public/ai-index.json` | `scripts/generate-ai-index.mts` | `npm run generate:ai` |

## Quality gates

```bash
npm run type-check   # tsc --noEmit (build skips TS on purpose — run this in CI)
npm run lint
npm run build        # must report 140 static pages
npm run check:docs   # fails on stale doc phrases + verifies sitemap covers all content
npm run verify:ai    # regenerates AI files and fails if they had drifted
```

## Key systems (where to look)

- **Content data (edit copy here, not in templates):** `data/itineraryData.ts`, `data/destinationsPremium.json`, `data/fieldGuideContent.ts`, `data/tourStylePageContent.ts`, `data/siteData.ts`
- **Enquiry pipeline:** `app/api/enquire/route.ts` — server-side validation (name/email/whatsapp/dates/duration), per-IP rate limiting, lead-priority tagging, guest auto-confirmation. Emails require `RESEND_API_KEY` (see `.env.example`); without it, submissions log to console.
- **Old-site migration:** ~38-rule redirect map in `next.config.js` covering every URL from the live old site's sitemap (audited July 2026). Keep for 12+ months after launch.
- **Structured data:** `lib/schema.ts` — Organization/WebSite injected once globally from `app/layout.tsx`; per-page TouristTrip/Article/Destination/FAQ/Breadcrumb schemas.
- **Photography:** see `CONTENT_AND_PHOTO_OPERATIONS.md` + root `PHOTO_SHOT_LIST.md` (162 slots, 7 tiers) + `PHOTO_RIGHTS_LEDGER.csv`.

## Environment variables

See `.env.example`. The site builds and runs with none set: `RESEND_API_KEY` /
`ENQUIRY_TO` / `ENQUIRY_FROM` (enquiry email), `NEXT_PUBLIC_GA_ID` (analytics, optional).
