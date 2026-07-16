# Content & Photo Operations

How content and imagery are edited, added and replaced on this site — the operational
companion to `CURRENT_HANDOFF.md`.

## Photography system (the remaining visible placeholder task)

**The two working documents (repo root):**
- **`PHOTO_SHOT_LIST.md`** — the authoritative list: 162 named slots in 7 launch-priority
  tiers, each with exact filename, subject direction and minimum size. Generated from
  live code + data; supersedes all archived photo lists (whose counts conflicted).
- **`PHOTO_RIGHTS_LEDGER.csv`** — one row per slot with `source`
  (archive | films | licensed | shoot), `rights_reference` and `status`
  (needed → selected → graded → placed). Keep this current as images land.

**Drop-in workflow — no code changes needed per image:**
1. Export JPG at the slot's minimum width (quality ~80), named exactly as listed.
2. Place in `public/images/`.
3. Update the ledger row to `placed`.
4. After a tier completes, run the integration pass (next/image conversion for that
   tier, per-page OG images, coverage check).

**Alt text is already wired.** Destination pages pull authored `heroAlt`/`cardAlt`
from `data/destinationsPremium.json`; itinerary heroes carry an authored entity label;
everything else derives a readable label from the filename automatically
(`components/ui/PlaceholderImage.tsx`). When writing new authored alts, describe the
actual photo and include the place/entity name once — no keyword stuffing.

**Sourcing rules (mixed pipeline):**
- Must be real Sawla imagery: staff, guides, drivers, vehicles, camps, office,
  the three enquiry-page trust shots, and **all Omo Valley portraits** (consent
  chain must be Sawla's own).
- May be licensed (commercial web license, never editorial-only): pure landscapes,
  wildlife, architecture exteriors, aerials.
- Sawla Films 4K frame grabs are ideal hero sources (export ≥1920px).
- Apply one unifying grade: warm, slightly desaturated, earthy — matches the
  ivory/volcanic/gold palette; avoid the oversaturated stock look.
- Heroes sit under dark gradient overlays with ivory text — choose frames with
  calm lower halves and depth.

**Species pages exception:** the 7 wildlife pages currently use live placehold.co
URLs in `data/siteData.ts`. When real wildlife photos exist, replace those URLs and
then remove `placehold.co` from `images.remotePatterns` in `next.config.js`.

## Content editing (copy lives in data, not templates)

| To change… | Edit |
|---|---|
| A journey's days, route logic, inclusions | `data/itineraryData.ts` |
| A destination's copy, facts, alt text, SEO | `data/destinationsPremium.json` |
| A travel-guide article | `data/fieldGuideContent.ts` |
| A tour-style hub page | `data/tourStylePageContent.ts` |
| Nav, testimonials, contact details, socials | `data/siteData.ts` |

Counts (18 destinations, 36 journeys…) render from data everywhere — adding an entry
updates every reference sitewide automatically, including the sitemap and the
all-journeys index.

**After any content change:** `npm run generate:ai` (refresh AI discovery files),
then `npm run build`. `npm run check:docs` will catch content/sitemap desync.

**Voice standard** (enforced in past editorial passes; keep it): calm, expert,
Ethiopian, warm, grounded, trustworthy, not exaggerated. Replace empty superlatives
with concrete verified facts. Never edit client testimonial quotes.
