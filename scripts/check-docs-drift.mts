// Docs drift checker — fails CI/handoff if current-facing docs contain stale claims,
// or if the sitemap stops covering the content data. Archived docs are exempt.
// Run: npm run check:docs
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import sitemapExport from '../app/sitemap'
// tsx module interop can nest the default export — unwrap either shape
const sitemap: typeof sitemapExport =
  typeof sitemapExport === 'function' ? sitemapExport : (sitemapExport as any).default
import { PREMIUM_DESTINATIONS } from '../data/destinationsPremium'
import { SPECIES, MOMENTS_ARTICLES } from '../data/siteData'
import { ITINERARIES } from '../data/itineraryData'
import { FIELD_GUIDE_CONTENT } from '../data/fieldGuideContent'

let failures = 0
const fail = (msg: string) => { failures++; console.error('✗ ' + msg) }
const ok = (msg: string) => console.log('✓ ' + msg)

// ── 1. Stale phrases must not appear in current-facing docs ────────────────────
const STALE = [
  '62 routes', '65/65', '65 routes', '96 page routes', '96 routes',
  'public/robots.txt', 'All 16 destinations', '16 destination guides',
  'All 13 species', 'Next.js 15.1.3', '6 tour styles',
  '— undefined', 'undefined (', // a data field rendered as literal undefined
]

function currentDocs(): string[] {
  const files: string[] = []
  const walk = (dir: string) => {
    for (const name of readdirSync(dir)) {
      const p = join(dir, name)
      if (p.includes('archive')) continue
      if (statSync(p).isDirectory()) walk(p)
      else if (/\.(md|txt)$/i.test(name)) files.push(p)
    }
  }
  walk('./docs')
  for (const root of ['README.md', 'PHOTO_SHOT_LIST.md', 'public/llms.txt']) files.push(root)
  return files
}

for (const file of currentDocs()) {
  const text = readFileSync(file, 'utf8')
  for (const phrase of STALE) {
    if (text.includes(phrase)) fail(`stale phrase "${phrase}" in ${file}`)
  }
}
if (failures === 0) ok(`no stale phrases across ${currentDocs().length} current docs`)

// ── 2. Sitemap must cover every content entity (can never silently desync) ─────
const urls = new Set(sitemap().map(e => e.url))
const expect = (url: string, what: string) => { if (!urls.has(url)) fail(`sitemap missing ${what}: ${url}`) }
const BASE = 'https://www.sawlatours.com'

for (const d of PREMIUM_DESTINATIONS) expect(`${BASE}/ethiopias-popular-destinations/${d.slug}`, 'destination')
for (const i of ITINERARIES) expect(`${BASE}/tours-by-experience/${i.styleSlug}/${i.slug}`, 'itinerary')
for (const g of FIELD_GUIDE_CONTENT) expect(`${BASE}/ethiopia-travel-guide/${g.slug}`, 'guide')
for (const s of SPECIES) expect(`${BASE}/ethiopia-wildlife/${s.slug}`, 'species')
for (const a of MOMENTS_ARTICLES) expect(`${BASE}/sawla-moments/${a.slug}`, 'field note')

console.log(`sitemap URLs: ${urls.size} | destinations ${PREMIUM_DESTINATIONS.length} · itineraries ${ITINERARIES.length} · guides ${FIELD_GUIDE_CONTENT.length} · species ${SPECIES.length} · notes ${MOMENTS_ARTICLES.length}`)

if (failures > 0) { console.error(`\n${failures} drift failure(s)`); process.exit(1) }
ok('sitemap fully covers all content data')
console.log('\nAll drift checks passed.')
