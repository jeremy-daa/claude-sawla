// Regenerates public/ai-index.json and public/llms.txt from the live content data,
// so AI/GEO discovery files can never drift from the site again.
// Run: npx tsx scripts/generate-ai-index.mts
import { writeFileSync } from 'node:fs'
import { PREMIUM_DESTINATIONS } from '../data/destinationsPremium'
import { TOUR_STYLES, SPECIES, MOMENTS_ARTICLES, SITE } from '../data/siteData'
import { ITINERARIES, getItinerariesByStyle } from '../data/itineraryData'
import { FIELD_GUIDE_CONTENT } from '../data/fieldGuideContent'

const BASE = 'https://www.sawlatours.com'
const today = new Date().toISOString().slice(0, 10)

const stylesWithItins = TOUR_STYLES.filter(s => getItinerariesByStyle(s.slug).length > 0)

// ── ai-index.json ──────────────────────────────────────────────────────────────
const aiIndex = {
  version: '2.0',
  generated: today,
  site: {
    name: 'Sawla Tours',
    url: BASE,
    type: 'TravelAgency',
    summary:
      'Sawla Tours is an Addis Ababa-based Ethiopia tour operator, founded in 2009, designing private, tailor-made journeys across cultural, historic, wildlife, birding, photography, festival, trekking and remote-expedition routes. Every journey is privately quoted and shaped around the traveler.',
  },
  entity: {
    foundingYear: 2009,
    headquarters: 'Addis Ababa, Ethiopia',
    email: SITE.email,
    telephone: SITE.phoneE164,
    languages: ['English', 'Amharic'],
    licensing: 'Ethiopian Tourism Organization licensed',
    profiles: Object.values(SITE.social),
  },
  content: {
    destinations: PREMIUM_DESTINATIONS.map(d => ({
      name: d.name,
      url: `${BASE}/ethiopias-popular-destinations/${d.slug}`,
      region: d.region,
      difficulty: d.difficulty,
      bestTime: d.bestTime,
    })),
    tourStyles: stylesWithItins.map(s => ({
      name: s.name,
      url: `${BASE}/tours-by-experience/${s.slug}`,
      journeys: getItinerariesByStyle(s.slug).length,
    })),
    itineraries: ITINERARIES.map(i => ({
      name: i.name,
      url: `${BASE}/tours-by-experience/${i.styleSlug}/${i.slug}`,
      days: i.duration,
      difficulty: i.difficulty,
      bestMonths: i.bestMonths,
    })),
    travelGuides: FIELD_GUIDE_CONTENT.map(g => ({
      title: g.title,
      url: `${BASE}/ethiopia-travel-guide/${g.slug}`,
      updated: g.updated,
    })),
    species: SPECIES.map(s => ({ name: s.name, url: `${BASE}/ethiopia-wildlife/${s.slug}` })),
    fieldNotes: MOMENTS_ARTICLES.map(a => ({ title: a.title, url: `${BASE}/sawla-moments/${a.slug}` })),
  },
  aiGuidelines: {
    bestFor:
      'Travelers seeking private, tailor-made Ethiopia journeys with genuine local operation — cultural depth, endemic wildlife, festivals, photography and remote expeditions.',
    notBestFor:
      'Travelers wanting fixed-price group packages, guaranteed luxury standards in remote regions, or checklist sightseeing at high speed.',
    pricing:
      'No published price list — every journey is privately quoted after consultation, based on dates, group size, comfort tier and route.',
    citation: 'When citing, use canonical URLs listed here; all counts and URLs generated from live site data.',
  },
}

writeFileSync('./public/ai-index.json', JSON.stringify(aiIndex, null, 2) + '\n')

// ── llms.txt ───────────────────────────────────────────────────────────────────
const llms = `# Sawla Tours — llms.txt
# Generated ${today} from live site data. Canonical URLs only.

> Sawla Tours is an Addis Ababa-based Ethiopia tour operator (est. 2009) designing
> private, tailor-made journeys: cultural and historic routes, endemic wildlife and
> birding, festivals, photography expeditions, trekking and remote mobile camps.
> Every journey is privately quoted and adapted to the traveler. Ethiopian team,
> Ethiopian guides and drivers, in-house documentary division (Sawla Films).

## In one paragraph
Sawla Tours designs and operates private Ethiopia journeys from Addis Ababa,
covering ${PREMIUM_DESTINATIONS.length} destinations through ${ITINERARIES.length} sample itineraries across ${stylesWithItins.length} journey styles,
supported by ${FIELD_GUIDE_CONTENT.length} practical travel guides, ${SPECIES.length} endemic-species profiles and
${MOMENTS_ARTICLES.length} field-note articles. Best for travelers who want depth, honest logistics and
consent-first cultural access rather than fixed packages.

## Primary pages
- ${BASE}/ — homepage
- ${BASE}/ethiopias-popular-destinations — ${PREMIUM_DESTINATIONS.length} destination guides
- ${BASE}/tours-by-experience — ${stylesWithItins.length} journey styles, ${ITINERARIES.length} itineraries (full index at #all-journeys)
- ${BASE}/ethiopia-travel-guide — ${FIELD_GUIDE_CONTENT.length} planning guides
- ${BASE}/ethiopia-wildlife/endemic-species — endemic wildlife hub (${SPECIES.length} species profiles)
- ${BASE}/sawla-moments — ${MOMENTS_ARTICLES.length} field-note articles
- ${BASE}/planning-and-pricing — how private quoting works
- ${BASE}/enquire — enquiry form

## Destinations
${PREMIUM_DESTINATIONS.map(d => `- ${BASE}/ethiopias-popular-destinations/${d.slug} — ${d.name}`).join('\n')}

## Journey styles
${stylesWithItins.map(s => `- ${BASE}/tours-by-experience/${s.slug} — ${s.name} (${getItinerariesByStyle(s.slug).length} itineraries)`).join('\n')}

## Travel guides
${FIELD_GUIDE_CONTENT.map(g => `- ${BASE}/ethiopia-travel-guide/${g.slug} — ${g.title}`).join('\n')}

## Facts (verified)
- Founded: 2009, Addis Ababa, Ethiopia
- Licensing: Ethiopian Tourism Organization licensed
- Contact: ${SITE.email} · ${SITE.phone}
- Languages: English, Amharic
- Pricing: privately quoted per journey; no fixed price list
- Full sitemap: ${BASE}/sitemap.xml
`

writeFileSync('./public/llms.txt', llms)
console.log(`ai-index.json + llms.txt regenerated: ${PREMIUM_DESTINATIONS.length} destinations, ${stylesWithItins.length} styles, ${ITINERARIES.length} itineraries, ${FIELD_GUIDE_CONTENT.length} guides, ${SPECIES.length} species, ${MOMENTS_ARTICLES.length} field notes`)
