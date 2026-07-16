/** @type {import("next").NextConfig} */
const nextConfig = {
  compress: true,
  poweredByHeader: false,
  experimental: { cpus: 1, optimizeCss: true },
  // TypeScript is validated separately with `npm run type-check`; skipping duplicate build-time checking avoids CI timeouts on the large static content library.
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },

  images: {
    remotePatterns: [{ protocol: "https", hostname: "placehold.co" }],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [64, 128, 256, 384, 512],
  },

  async redirects() {
    return [
      { source: "/ethiopian-tour-themes", destination: "/tours-by-experience", permanent: true },
      { source: "/ethiopian-tour-themes/ethiopias-historic-tours", destination: "/tours-by-experience/historic-cultural-ethiopia-tours", permanent: true },
      { source: "/ethiopian-tour-themes/tribal-cultural-tours-of-ethiopia", destination: "/tours-by-experience/omo-valley-cultural-tours", permanent: true },
      { source: "/ethiopian-tour-themes/ethiopian-festival-tours", destination: "/tours-by-experience/ethiopia-festival-tours", permanent: true },
      { source: "/ethiopian-tour-themes/adventure-tours-ethiopia", destination: "/tours-by-experience/ethiopia-adventure-tours", permanent: true },
      { source: "/ethiopian-tour-themes/photography-tours-ethiopia", destination: "/tours-by-experience/ethiopia-photography-tours", permanent: true },
      { source: "/ethiopian-tour-themes/bird-watching-tours-ethiopia", destination: "/tours-by-experience/ethiopia-birdwatching-tours", permanent: true },
      { source: "/ethiopian-tour-themes/wildlife-tours-ethiopia", destination: "/tours-by-experience/ethiopia-wildlife-tours", permanent: true },
      { source: "/ethiopian-tour-themes/special-interest-tours-ethiopia", destination: "/tours-by-experience/ethiopia-special-interest-tours", permanent: true },
      { source: "/ethiopian-tour-themes/addis-ababa-day-business-tours", destination: "/tours-by-experience/addis-ababa-day-tours", permanent: true },
      { source: "/ethiopian-tour-themes/filming-ethiopia-fixer-production-logistics", destination: "/sawla-films", permanent: true },
      { source: "/tours-by-experience/historic-and-cultural-tours", destination: "/tours-by-experience/historic-cultural-ethiopia-tours", permanent: true },
      { source: "/tours-by-experience/tribal-cultural-ethiopia-tours", destination: "/tours-by-experience/omo-valley-cultural-tours", permanent: true },
      { source: "/tours-by-experience/heritage-pilgrimage", destination: "/tours-by-experience/historic-cultural-ethiopia-tours", permanent: true },
      { source: "/tours-by-experience/tribal-encounters", destination: "/tours-by-experience/omo-valley-cultural-tours", permanent: true },
      { source: "/tours-by-experience/frontier-adventure", destination: "/tours-by-experience/ethiopia-adventure-tours", permanent: true },
      { source: "/tours-by-experience/wildlife-birding", destination: "/tours-by-experience/ethiopia-wildlife-tours", permanent: true },
      { source: "/tours-by-experience/festival-immersion", destination: "/tours-by-experience/ethiopia-festival-tours", permanent: true },
      { source: "/tours-by-experience/cinematic-journey", destination: "/tours-by-experience/ethiopia-photography-tours", permanent: true },
      { source: "/contact",      destination: "/enquire",                       permanent: true },
      { source: "/contact-us",   destination: "/enquire",                       permanent: true },
      { source: "/tours",        destination: "/tours-by-experience",            permanent: true },
      { source: "/destinations", destination: "/ethiopias-popular-destinations", permanent: true },
      { source: "/blog",         destination: "/sawla-moments",                 permanent: true },

      // ── Migration map from the LIVE old site's sitemap (audited 2026-07) ──────
      // Every indexed old URL must land on its closest new equivalent, or its
      // section hub when no one-to-one match exists. Never remove for 12+ months.

      // Old travel-guide slugs that changed
      { source: "/ethiopia-travel-guide/ethiopia-travel-safety",     destination: "/ethiopia-travel-guide/safety-in-ethiopia",        permanent: true },
      { source: "/ethiopia-travel-guide/how-to-plan-ethiopia-trip",  destination: "/ethiopia-travel-guide/how-to-plan-your-trip",     permanent: true },
      { source: "/ethiopia-travel-guide/ethiopia-travel-tips",       destination: "/ethiopia-travel-guide/general-travel-tips",       permanent: true },
      { source: "/ethiopia-travel-guide/ethiopia-wildlife-tours",    destination: "/ethiopia-travel-guide/popular-wildlife-ethiopia", permanent: true },

      // Old destination slugs that changed
      { source: "/ethiopias-popular-destinations/gonder",                                     destination: "/ethiopias-popular-destinations/gondar",                     permanent: true },
      { source: "/ethiopias-popular-destinations/bahir-dar",                                  destination: "/ethiopias-popular-destinations/bahir-dar-lake-tana",        permanent: true },
      { source: "/ethiopias-popular-destinations/kafta-shiraro-national-park-safari-ethiopia", destination: "/ethiopias-popular-destinations/kafta-shiraro-national-park", permanent: true },
      { source: "/ethiopias-popular-destinations/awash-national-park-alledeghi-plains-safari", destination: "/ethiopias-popular-destinations/awash-national-park",        permanent: true },
      { source: "/ethiopias-popular-destinations/addis-ababa-city-tour",                      destination: "/ethiopias-popular-destinations/addis-ababa",                permanent: true },

      // Old tour detail pages — one-to-one where the match is confident
      { source: "/tours-by-experience/ethiopia-festival-tours/timket-festival-ethiopia",       destination: "/tours-by-experience/ethiopia-festival-tours/timkat-ethiopia-7-days",              permanent: true },
      { source: "/tours-by-experience/ethiopia-festival-tours/ethiopia-meskel-festival-tour",  destination: "/tours-by-experience/ethiopia-festival-tours/meskel-ethiopia-6-days",              permanent: true },
      { source: "/tours-by-experience/ethiopia-adventure-tours/simien-mountains-trekking",     destination: "/tours-by-experience/ethiopia-adventure-tours/simien-mountains-trekking-7-days",   permanent: true },
      { source: "/tours-by-experience/ethiopia-adventure-tours/bale-mountain-trekking",        destination: "/tours-by-experience/ethiopia-adventure-tours/bale-trekking-adventure-8-days",     permanent: true },
      { source: "/tours-by-experience/ethiopia-photography-tours/omo-valley-photo-expedition", destination: "/tours-by-experience/ethiopia-photography-tours/omo-valley-portrait-photography-8-days", permanent: true },
      { source: "/tours-by-experience/ethiopia-photography-tours/omo-valley-photography-tour", destination: "/tours-by-experience/ethiopia-photography-tours/omo-valley-portrait-photography-8-days", permanent: true },
      { source: "/tours-by-experience/ethiopia-photography-tours/danakil-photo-expedition",    destination: "/tours-by-experience/ethiopia-photography-tours/danakil-landscape-photography-9-days",   permanent: true },
      { source: "/tours-by-experience/ethiopia-photography-tours/ethiopian-wildlife-photo-tour", destination: "/tours-by-experience/ethiopia-photography-tours/wildlife-photography-10-days",   permanent: true },
      { source: "/tours-by-experience/ethiopia-photography-tours/tribal-photo-safari-ethiopia", destination: "/tours-by-experience/omo-valley-cultural-tours/southern-tribes-photography-11-days", permanent: true },
      { source: "/tours-by-experience/ethiopia-birdwatching-tours/ethiopia-birding-safari-16-days", destination: "/tours-by-experience/ethiopia-birdwatching-tours/ethiopia-birding-specialist-14-days", permanent: true },
      { source: "/tours-by-experience/ethiopia-birdwatching-tours/ethiopia-endemic-birdwatching-tour", destination: "/tours-by-experience/ethiopia-birdwatching-tours/ethiopia-birding-specialist-14-days", permanent: true },

      // Old tour detail pages — no confident match: land on the style hub
      { source: "/tours-by-experience/ethiopia-festival-tours/ethiopia-genna-festival-tour",   destination: "/tours-by-experience/ethiopia-festival-tours",   permanent: true },
      { source: "/tours-by-experience/ethiopia-festival-tours/ethiopia-pilgrimage-tour",       destination: "/tours-by-experience/ethiopia-festival-tours",   permanent: true },
      { source: "/tours-by-experience/ethiopia-festival-tours/hidar-tsion-axum",               destination: "/tours-by-experience/ethiopia-festival-tours",   permanent: true },
      { source: "/tours-by-experience/ethiopia-adventure-tours/tigray-community-trekking",     destination: "/tours-by-experience/ethiopia-adventure-tours",  permanent: true },
      { source: "/tours-by-experience/ethiopia-adventure-tours/wello-community-trek",          destination: "/tours-by-experience/ethiopia-adventure-tours",  permanent: true },
      { source: "/tours-by-experience/ethiopia-adventure-tours/community-based-trekking-ethiopia", destination: "/tours-by-experience/ethiopia-adventure-tours", permanent: true },
      { source: "/tours-by-experience/ethiopia-photography-tours/awash-national-park-photo-safari", destination: "/tours-by-experience/ethiopia-photography-tours", permanent: true },
      { source: "/tours-by-experience/ethiopia-birdwatching-tours/ethiopia-birding-safari",    destination: "/tours-by-experience/ethiopia-birdwatching-tours", permanent: true },
      { source: "/tours-by-experience/ethiopia-birdwatching-tours/ethiopia-birdwatching-holiday", destination: "/tours-by-experience/ethiopia-birdwatching-tours", permanent: true },
      { source: "/tours-by-experience/ethiopia-birdwatching-tours/simien-mountains-birdwatching", destination: "/tours-by-experience/ethiopia-birdwatching-tours", permanent: true },

      // Renamed old styles: wildcard-safe (the old style slug no longer exists on the new site)
      { source: "/tours-by-experience/historic-and-cultural-tours/:slug", destination: "/tours-by-experience/historic-cultural-ethiopia-tours", permanent: true },
      { source: "/tours-by-experience/tribal-cultural-ethiopia-tours/omo-valley-tribal-tour", destination: "/tours-by-experience/omo-valley-cultural-tours/omo-valley-complete-10-days", permanent: true },
      { source: "/tours-by-experience/tribal-cultural-ethiopia-tours/:slug", destination: "/tours-by-experience/omo-valley-cultural-tours", permanent: true },

      // Same-named styles with old NUMERIC children (1, 2, 3…): numeric-only pattern,
      // can never collide with the new lettered itinerary slugs
      { source: "/tours-by-experience/ethiopia-wildlife-tours/:num(\\d{1,3})",          destination: "/tours-by-experience/ethiopia-wildlife-tours",         permanent: true },
      { source: "/tours-by-experience/addis-ababa-day-tours/:num(\\d{1,3})",            destination: "/tours-by-experience/addis-ababa-day-tours",           permanent: true },
      { source: "/tours-by-experience/ethiopia-special-interest-tours/:num(\\d{1,3})",  destination: "/tours-by-experience/ethiopia-special-interest-tours", permanent: true },
    ]
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options",  value: "nosniff" },
          { key: "X-Frame-Options",         value: "DENY" },
          { key: "X-XSS-Protection",        value: "1; mode=block" },
          { key: "Referrer-Policy",         value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy",      value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        ],
      },
      {
        // Immutable cache for static image assets
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        // Videos: same immutable long-lived cache as static images — the shared
        // hero clip is referenced by filename, so a content change means a new filename.
        source: "/videos/:path*",
        headers: [
          { key: "Cache-Control",       value: "public, max-age=31536000, immutable" },
          { key: "Accept-Ranges",       value: "bytes" },
          { key: "Content-Type",        value: "video/mp4" },
        ],
      },
    ]
  },
}
module.exports = nextConfig