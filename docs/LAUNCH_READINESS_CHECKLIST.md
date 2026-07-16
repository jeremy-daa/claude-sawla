# Launch Readiness Checklist — current checks only

Companion to `CURRENT_HANDOFF.md`. Work top to bottom; everything code-side above
this list is already done and verified.

## Before deploy

- [ ] **Photography** — work through root `PHOTO_SHOT_LIST.md` tier by tier, tracking
      source/rights in `PHOTO_RIGHTS_LEDGER.csv`. Rule: anything presented as
      "this is us" (people, vehicles, camps, office) must be real Sawla imagery;
      never license Omo portraits. After each tier lands in `public/images/`,
      run the integration pass (next/image swap, OG images, coverage check).
- [ ] Set env vars on the host: `RESEND_API_KEY`, `ENQUIRY_TO`, `ENQUIRY_FROM`
      (+ optional `NEXT_PUBLIC_GA_ID`)
- [ ] Send one test enquiry on the deployed preview and confirm: team notification
      arrives, guest auto-confirmation arrives, reply-to is the guest's address
- [ ] Quality gates green: `type-check`, `lint`, `build` (140 pages), `check:docs`, `verify:ai`
- [ ] Add a square brand logo ≥112×112px to `public/brand/` (search-result display)

## Deploy

- [ ] Deploy to **www.sawlatours.com — the same domain as the old site** (the
      redirect map in `next.config.js` only protects equity on the same domain)
- [ ] Immediately after DNS: spot-check 5 old URLs redirect correctly, e.g.
      `/ethiopias-popular-destinations/gonder`, `/tours-by-experience/ethiopia-festival-tours/timket-festival-ethiopia`,
      `/ethiopian-tour-themes`, `/contact-us`, `/tours-by-experience/addis-ababa-day-tours/7`
- [ ] Verify live `/robots.txt` does **not** contain `Disallow: /_next/`
- [ ] Verify live `/sitemap.xml` returns 133 URLs

## First week

- [ ] Verify property in **Google Search Console** and **Bing Webmaster Tools**;
      submit `/sitemap.xml` in both
- [ ] URL-Inspect 5–10 top old URLs in GSC — confirm Google sees the redirects
- [ ] Run PageSpeed Insights on the live homepage (local perf numbers were noisy;
      this is the honest one) and Rich Results Test on one itinerary page
- [ ] 15-minute real-phone walkthrough: mobile sticky enquiry bar on an itinerary
      page, Trip Wizard end-to-end, nav menu, footer

## Weeks 2–8

- [ ] Check GSC Coverage / Not-found weekly — add a redirect for any stray old URL
      that surfaces from external links
- [ ] Expect a 1–3 week ranking wobble while Google recrawls — normal, don't react
- [ ] Consider a branded **u/SawlaTours** Reddit account (current footer/schema link
      uses the unbranded auto-generated handle; swap in `data/siteData.ts`,
      `lib/schema.ts`, footer)
- [ ] Keep all migration redirects for **12+ months minimum**
