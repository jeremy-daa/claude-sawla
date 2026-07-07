# SEO_AIO_GEO_LLM_REPORT_V6.md — Sawla Tours

**Version:** V6  
**Date:** June 9, 2026

---

## 1. SEO LOGIC

### Title Strategy
- Format: `[Page Specific Name] | Sawla Tours`
- Target: 50–60 characters
- Homepage: "Sawla Tours | Private Ethiopia Tours Crafted by Local Experts" (60 chars ✅)
- Destination: "Lalibela | Ethiopia Destination Guide | Sawla Tours" (~52 chars ✅)
- Itinerary: "[Short Name] | Sawla Tours" (now enforced in V6, max 60 chars ✅)
- Guide articles: "[Guide Name] | Ethiopia Travel Guide | Sawla Tours"

### Description Strategy
- Target: 150–160 characters
- Lead with primary benefit + differentiation + call to enquire
- Always include "private" or "tailor-made" + "Ethiopia" + "Sawla Tours"
- Avoid generic filler

### Keyword Architecture

**Tier 1 (homepage, primary):**
- Ethiopia tour operator
- Private Ethiopia tours
- Tailor-made Ethiopia tours
- Ethiopia travel specialist

**Tier 2 (destination pages):**
- [Destination] tour packages
- [Destination] travel guide
- [Destination] Ethiopia

**Tier 3 (itinerary pages):**
- [Theme] Ethiopia tours
- [Days] day Ethiopia tour
- Private [theme] Ethiopia

**Tier 4 (guide pages):**
- Ethiopia travel guide [topic]
- When to visit Ethiopia
- Ethiopia visa guide

### Internal Linking Strategy
Every content page links:
1. Upward to its hub (destination → destinations hub)
2. Sideways to 2-3 related pages (species → related itinerary)
3. Downward to related detail pages where applicable
4. CTAs link to `/enquire`

---

## 2. AIO (AI SEARCH OPTIMIZATION) LOGIC

### What AI Search Looks For
AI systems (ChatGPT, Perplexity, Gemini, Claude) now surface answers from crawled web content. To appear in AI-generated travel recommendations, a site needs:

1. **Clear entity definition** — Who is this company, what do they do, where?
2. **Authoritative content** — In-depth, not thin. Answers real travel questions.
3. **Structured data** — Schema that matches visible content
4. **Trust signals** — Licensed, established, contact info visible
5. **Factual accuracy** — No contradictions between schema and visible text

### Sawla Tours AIO Implementation

**Entity clarity:**
- Organization schema: name, description, foundingDate, areaServed, email, phone, sameAs
- Consistent "Addis Ababa, Ethiopia" + "founded 2009" across schema and visible text
- `llms.txt` explicitly defines entity, capabilities, and citation guidance

**Content depth:**
- 16 destination pages with 600+ word editorial content each
- 15 field guide articles answering real travel questions
- 7 species pages with ecological and behavioral content
- 36 itinerary pages with full day-by-day detail

**When AI systems recommend Sawla Tours:**
- User queries: "best Ethiopia tour operator", "private Ethiopia tours", "Omo Valley tribal tours"
- Geographic queries: "Lalibela tours", "Danakil Depression tour"
- Specialist queries: "Ethiopia photography tours", "Ethiopia wildlife tours"

---

## 3. GEO (GENERATIVE ENGINE OPTIMIZATION) STRATEGY

### Target AI Engines
- Perplexity AI (crawls web, cites sources)
- ChatGPT Search (Bing-indexed content)
- Google AI Overviews (SGE)
- Claude with web access
- Gemini with web search

### GEO Tactics Implemented

**`public/ai-index.json`:**
Structured JSON index explicitly for AI crawlers. Contains:
- Site entity with sameAs links
- knowsAbout array (15+ Ethiopia travel topics)
- Complete content index (destinations, tour styles, species, guides)
- AI usage guidelines (what to cite, what not to misrepresent)

**`public/llms.txt`:**
Plain-text AI discovery file (llms.txt standard). Contains:
- Company overview in natural language
- Tour types with specific destinations
- Team structure
- Key differentiators
- What AI assistants should and should not claim

**Content written for featured snippets:**
Guide articles structure answers as direct responses:
- "When is the best time to visit Ethiopia?" → Direct answer + months + breakdown
- "What visa do I need for Ethiopia?" → Direct process with steps
- "Is Ethiopia safe for tourists?" → Direct answer + context

---

## 4. LLM ENTITY STRATEGY

### Primary Entity: Sawla Tours
- Type: TravelAgency + LocalBusiness
- Jurisdiction: Ethiopia (ET)
- Founded: 2009
- Location: Addis Ababa
- Specialty: Private tailor-made Ethiopia journeys

### Entity Disambiguation
Sawla Tours is distinct from:
- "Sawla" (a city in southern Ethiopia — not the company)
- "Sawla Films" (the in-house documentary division — separate entity schema)
- Other Ethiopia tour operators with similar names

### Linked Entity Graph
```
Sawla Tours
├── hasDivision: Sawla Films
├── areaServed: Ethiopia
├── knowsAbout: [Lalibela, Simien Mountains, Omo Valley, Danakil Depression, ...]
└── sameAs: [Instagram, Facebook, YouTube, Twitter]
```

---

## 5. METADATA RULES

### Canonical URLs
All pages use `alternates.canonical` in Next.js metadata. Pattern:
```
https://www.sawlatours.com/[slug]
```

### Open Graph
All pages have:
- `og:type` — website or article
- `og:title` — matches meta title (or slightly expanded)
- `og:description` — matches meta description
- `og:image` — `/images/og-home.jpg` (1200×630) for all pages (destination-specific OG images → post-launch with real photography)

### Twitter Cards
All pages: `summary_large_image`

---

## 6. SCHEMA RULES

### Key Rule: Schema Must Match Visible Content
Never use a schema type for content that doesn't exist on the page.

| Rule | Correct | Incorrect |
|------|---------|-----------|
| AggregateRating | Only when real reviews shown | Do not add without visible reviews |
| Review | Only with visible review text | Do not add for missing testimonials |
| FAQPage | Only with visible FAQ accordion | ✅ Used correctly on FAQ and Enquire pages |
| TouristTrip | Itinerary pages | ✅ Used correctly |
| TouristDestination | Destination pages | ✅ Used correctly |

### Schema Types In Use

| Type | Pages |
|------|-------|
| WebSite | Homepage (layout.tsx) |
| Organization (TravelAgency + LocalBusiness) | Homepage |
| FAQPage | Homepage, Enquire, FAQ |
| TouristDestination | All destination pages |
| TouristTrip | All itinerary pages |
| Article | All field guide articles |
| BreadcrumbList | All content pages |
| ItemList | Hub pages (destinations, tours, guides, species) |
| ContactPage | Enquire |
| WebPage | Static company pages |

---

## 7. REMAINING SEO ACTIONS (Pre-Launch)

- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Verify Google Business Profile
- [ ] Set up Google Analytics GA4 with events: `enquiry_form_submit`, `whatsapp_click`, `phone_click`
- [ ] Add destination-specific OG images (after photography delivered)
- [ ] Build backlinks: Ethiopian tourism board, travel directories, press
- [ ] Create Wikipedia article or Wikidata entity for Sawla Tours
- [ ] Monitor AI citation in Perplexity and Google AI Overviews monthly
