import type { MetadataRoute } from 'next'

const BASE = 'https://www.sawlatours.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  }
}
