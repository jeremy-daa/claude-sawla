import type { MetadataRoute } from 'next'
import { DESTINATIONS, TOUR_STYLES, MOMENTS_ARTICLES, FIELD_GUIDE_SLUGS, SPECIES } from '@/data/siteData'
import { ITINERARIES } from '@/data/itineraryData'

const BASE = 'https://www.sawlatours.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString()

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE,                                   lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/enquire`,                      lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/about-us`,                     lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/why-travel-with-sawla-tours`,  lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/how-we-work`,                  lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/planning-and-pricing`,         lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/tours-by-experience`,          lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/ethiopias-popular-destinations`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/ethiopia-travel-guide`,        lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/ethiopia-wildlife/endemic-species`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/sawla-moments`,                lastModified: now, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE}/meet-our-travel-specialists`,  lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/meet-our-guides`,              lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/meet-our-drivers`,             lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/mobile-tented-camps-ethiopia`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/responsible-travel`,           lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/faq`,                          lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/testimonials`,                  lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/sawla-films`,                   lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/sawla-foundation`,              lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/trip-finder`,                   lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/legal-and-policies`,             lastModified: now, changeFrequency: 'yearly',  priority: 0.4 },
    { url: `${BASE}/booking-terms`,                  lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE}/deposit-and-payment-policy`,     lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE}/cancellation-policy`,            lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE}/force-majeure-policy`,           lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE}/travel-insurance-health-and-visa`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/photography-and-cultural-consent`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/privacy-policy`,                lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE}/cookie-policy`,                  lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE}/terms`,                         lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
  ]

  const destinationPages: MetadataRoute.Sitemap = DESTINATIONS.map(d => ({
    url: `${BASE}/ethiopias-popular-destinations/${d.slug}`,
    lastModified: now, changeFrequency: 'monthly', priority: 0.8,
  }))

  const tourStylePages: MetadataRoute.Sitemap = TOUR_STYLES.map(s => ({
    url: `${BASE}/tours-by-experience/${s.slug}`,
    lastModified: now, changeFrequency: 'monthly', priority: 0.8,
  }))

  // The 36 itinerary detail pages are the site's core product pages.
  const itineraryPages: MetadataRoute.Sitemap = ITINERARIES.map(i => ({
    url: `${BASE}/tours-by-experience/${i.styleSlug}/${i.slug}`,
    lastModified: now, changeFrequency: 'monthly', priority: 0.85,
  }))

  const momentsPages: MetadataRoute.Sitemap = MOMENTS_ARTICLES.map(a => ({
    url: `${BASE}/sawla-moments/${a.slug}`,
    lastModified: now, changeFrequency: 'monthly', priority: 0.6,
  }))

  const guidePages: MetadataRoute.Sitemap = FIELD_GUIDE_SLUGS.map(slug => ({
    url: `${BASE}/ethiopia-travel-guide/${slug}`,
    lastModified: now, changeFrequency: 'monthly', priority: 0.75,
  }))

  const speciesPages: MetadataRoute.Sitemap = SPECIES.map(s => ({
    url: `${BASE}/ethiopia-wildlife/${s.slug}`,
    lastModified: now, changeFrequency: 'monthly', priority: 0.65,
  }))

  return [...staticPages, ...destinationPages, ...tourStylePages, ...itineraryPages, ...guidePages, ...speciesPages, ...momentsPages]
}
