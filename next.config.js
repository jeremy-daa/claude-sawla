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