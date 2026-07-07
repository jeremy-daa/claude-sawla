# LAUNCH_CHECKLIST_V6.md — Sawla Tours Pre-Launch Checklist

**Version:** V6  
**Date:** June 9, 2026

---

## CRITICAL (site will not work correctly without these)

### Code & Build
- [x] `npm run type-check` passes (0 errors)
- [x] `npm run lint` passes (0 errors)
- [x] `npm run build` completes (65/65 routes)
- [x] All pages render without errors

### Environment
- [ ] `RESEND_API_KEY` set in production environment
- [ ] `NEXT_PUBLIC_GA_ID` set for Google Analytics (or remove placeholder)
- [ ] `SITE.url` in `data/siteData.ts` updated to live domain
- [ ] `metadataBase` in `app/layout.tsx` updated to live domain

### Contact & Identity
- [ ] `explore@sawlatours.com` verified as real inbox
- [ ] `+251 705 783 06` confirmed correct number
- [ ] WhatsApp number matches phone number
- [ ] Addis Ababa address correct

---

## REQUIRED (launch without = incomplete experience)

### Photography (biggest gap)
- [ ] Homepage hero poster image (`home-hero-poster.jpg` → `public/images/hubs/`)
- [ ] Destinations hub hero poster (`destinations-hub-hero.jpg`)
- [ ] Tours hub hero poster (`tours-hub-hero.jpg`)
- [ ] Travel guide hub hero poster (`guide-hub-hero.jpg`)
- [ ] All 16 destination hero images (`dest-{slug}-hero.jpg`)
- [ ] All 16 destination card images (`dest-{slug}-card.jpg`)
- [ ] All 36 itinerary hero images (`tour-{slug}-hero.jpg`)
- [ ] 6 tour style hub cards (`tour-hub-{style}.jpg`)
- [ ] 7 species portraits (`species-{slug}-portrait.jpg`)
- [ ] 15 field guide images
- [ ] Team / people photos
- [ ] Sawla Moments article images
- [ ] See `IMAGE_QUICK_REFERENCE.md` for complete spec

### Content
- [ ] Real client testimonials — replace placeholder quotes in `/testimonials`
- [ ] Sawla Films YouTube channel has content (currently linked to @sawlafilms)
- [ ] Founder bio verified and complete in `/about-us`
- [ ] Guide/driver/specialist profiles verified

---

## IMPORTANT (affects SEO, trust, conversion)

### SEO
- [ ] Google Search Console verified
- [ ] Google Analytics GA4 connected
- [ ] Bing Webmaster Tools submitted
- [ ] Sitemap submitted to Google Search Console
- [ ] robots.txt reviewed for production (currently allows all)

### Trust
- [ ] TripAdvisor listing claimed and active
- [ ] Google Business Profile claimed and complete
- [ ] Ethiopian Tourism Organization license details verified
- [ ] Social media accounts active and linked correctly:
  - [ ] Instagram: @sawlatours
  - [ ] TikTok: @sawlatours
  - [ ] Twitter: @SawlaTours
  - [ ] Facebook: sawlatours
  - [ ] YouTube: @sawlafilms
  - [ ] TripAdvisor: sawlat
  - [ ] Google: verified listing

### Enquiry Form
- [ ] Test form submission end-to-end (fills, submits, email received)
- [ ] Auto-reply email configured (optional but professional)
- [ ] Spam honeypot field present (`_honey`)
- [ ] Form accessible from WhatsApp link in mobile nav

---

## GOOD TO HAVE (improve post-launch)

### Content
- [ ] 9+ Sawla Moments articles (currently 3)
- [ ] Trip Finder questionnaire tool
- [ ] More destinations added (currently 16, could expand)
- [ ] Additional itineraries per style
- [ ] Video gallery on Sawla Films page

### Technical
- [ ] CDN configured for video/image delivery (optional with Next.js)
- [ ] Error monitoring (Sentry or similar)
- [ ] Uptime monitoring
- [ ] Backup and disaster recovery plan

---

## LEGAL

- [ ] Privacy Policy reviewed by legal counsel
- [ ] Terms of Service reviewed
- [ ] Cookie consent if analytics active (GDPR)
- [ ] `robots.txt` reviewed
- [ ] Photography consent documented for all images featuring people
- [ ] Testimonial consent documented for all client quotes

---

## FINAL VERIFICATION

Before go-live, verify on staging:

- [ ] Homepage loads correctly on mobile and desktop
- [ ] Navigation opens/closes on mobile
- [ ] Enquiry form submits successfully
- [ ] All social media links open correct profiles
- [ ] WhatsApp button opens correct number
- [ ] Sitemap accessible at /sitemap.xml
- [ ] robots.txt accessible at /robots.txt
- [ ] llms.txt accessible at /llms.txt
- [ ] 404 page renders correctly
- [ ] Video hero loads on homepage (after real images added)
- [ ] No browser console errors on key pages

---

## COMPETION ESTIMATE

| Area | Completion |
|------|-----------|
| Code & architecture | 100% |
| Content (text) | 92% |
| Design & UX | 85% |
| Photography | 5% |
| SEO (on-page) | 90% |
| SEO (off-page/GSC) | 0% |
| Trust signals | 65% |
| Conversion system | 80% |
| Technical (build, lint) | 100% |
| Documentation | 95% |
| **Overall** | **~82%** |

The remaining 18% is almost entirely photography + production environment setup.
