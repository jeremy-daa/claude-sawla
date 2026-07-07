import type { Metadata } from "next"
import Link from "next/link"
import HeroVideo from "@/components/ui/HeroVideo"
import PlaceholderImage from "@/components/ui/PlaceholderImage"
import SchemaScript from "@/components/ui/SchemaScript"
import { AnimateIn, AnimateStagger } from "@/components/ui/AnimateIn"
import { FIELD_GUIDE_CONTENT, getFeaturedGuides, getGuidesByTheme } from "@/data/fieldGuideContent"
import { breadcrumbSchema, itemListSchema, faqSchema } from "@/lib/schema"

const BASE = "https://www.sawlatours.com"

export const metadata: Metadata = {
  title: "Ethiopia Travel Guide | Expert Planning Advice | Sawla Tours",
  description: "Premium Ethiopia travel guide from Sawla Tours: best time to visit, routes, visas, safety, flights, hotels, wildlife, photography, festivals and practical planning.",
  alternates: { canonical: `${BASE}/ethiopia-travel-guide` },
  openGraph: { title: "Ethiopia Travel Guide | Sawla Tours", description: "Expert Ethiopia planning resources written by an Addis Ababa-based tour team.", url: `${BASE}/ethiopia-travel-guide`, images: [{ url: `${BASE}/images/og-home.jpg`, width: 1200, height: 630 }] },
  keywords: ["Ethiopia travel guide", "Ethiopia travel advice", "best time to visit Ethiopia", "Ethiopia itinerary planning", "private Ethiopia tours"],
}

const schema = [
  itemListSchema({
    name: "Ethiopia Travel Guide — Sawla Tours",
    url: `${BASE}/ethiopia-travel-guide`,
    items: FIELD_GUIDE_CONTENT.map((guide) => ({ name: guide.title, url: `${BASE}/ethiopia-travel-guide/${guide.slug}`, description: guide.metaDesc })),
  }),
  breadcrumbSchema([{ name: "Home", url: BASE }, { name: "Ethiopia Travel Guide", url: `${BASE}/ethiopia-travel-guide` }]),
  faqSchema([
    { q: "What does the Sawla Tours Ethiopia Travel Guide cover?", a: "It covers route planning, best travel seasons, visas, health and safety, domestic flights, hotels, wildlife, birding, photography, festivals, cultural etiquette, responsible travel and remote logistics." },
    { q: "Is this Ethiopia travel guide suitable for first-time visitors?", a: "Yes. The guide is designed for first-time visitors, repeat travelers, photographers, birders, families and tailor-made private tour planners." },
    { q: "Are Ethiopia travel details checked before booking?", a: "Yes. Sawla Tours verifies current flight schedules, roads, permits, park access, safety conditions and accommodation availability during itinerary design." },
  ]),
]

export default function EthiopiaTravelGuideHub() {
  const featured = getFeaturedGuides()
  const themes = getGuidesByTheme()
  const totalFaqs = FIELD_GUIDE_CONTENT.reduce((n, g) => n + g.faqs.length, 0)
  const latestYear = FIELD_GUIDE_CONTENT.reduce((y, g) => Math.max(y, parseInt(g.updated.slice(0, 4))), 0)

  return (
    <>
      {schema.map((item, index) => <SchemaScript key={index} schema={item} />)}
      <section className="relative overflow-hidden" style={{ minHeight: "520px", paddingTop: "8rem", paddingBottom: "5rem" }} aria-labelledby="guide-heading">
        <HeroVideo poster="guide-hub-hero.jpg" posterCategory="guide" overlayClassName="bg-volcanic/75" objectPosition="center" />
        <div className="relative z-10 container-max">
          <AnimateIn className="max-w-3xl">
            <nav aria-label="Breadcrumb" className="mb-5"><ol className="flex items-center gap-2 font-body" style={{fontSize:"11.5px",letterSpacing:"0.1em",textTransform:"uppercase"}}><li><Link href="/" className="text-ivory/50 hover:text-gold transition-colors">Home</Link></li><li className="text-ivory/30">/</li><li className="text-ivory/80">Ethiopia Travel Guide</li></ol></nav>
            <span className="label-eyebrow text-gold">Expert Ethiopia Planning Library</span>
            <h1 id="guide-heading" className="heading-display text-ivory mt-2" style={{fontSize:"clamp(2.5rem,5.5vw,5.2rem)"}}>Ethiopia Travel Guide</h1>
            <p className="text-ivory/75 font-body max-w-2xl mt-5 leading-relaxed" style={{fontSize:"clamp(1rem,1.35vw,1.22rem)"}}>A premium planning hub for private Ethiopia travel: seasons, routes, visas, safety, domestic flights, hotels, wildlife, photography, festivals, cultural etiquette and remote logistics, written from an Addis Ababa operator’s point of view.</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 max-w-3xl">
              {[`${FIELD_GUIDE_CONTENT.length} expert guides`,`${totalFaqs} practical FAQs`,"Route-led advice",`Updated ${latestYear}`].map((label) => <div key={label} className="rounded-[14px] border border-white/15 bg-white/10 px-4 py-3"><span className="block text-gold font-body" style={{fontSize:"11px",letterSpacing:"0.12em",textTransform:"uppercase"}}>{label}</span></div>)}
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="section-padding bg-ivory" aria-labelledby="featured-guides-heading">
        <div className="container-max">
          <AnimateIn className="grid lg:grid-cols-3 gap-8 items-end mb-10">
            <div className="lg:col-span-2"><span className="label-eyebrow">Start Here</span><h2 id="featured-guides-heading" className="heading-display text-volcanic mt-1" style={{fontSize:"clamp(1.75rem,3.25vw,2.75rem)"}}>Essential Ethiopia Planning Guides</h2><p className="text-warmgrey font-body leading-relaxed mt-4 max-w-2xl">These are the pages most travelers should read before choosing dates, route, comfort level and specialist interests.</p></div>
            <div className="lg:text-right"><Link href="/enquire" className="btn-primary">Ask Sawla to Plan It</Link></div>
          </AnimateIn>
          <AnimateStagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.06}>
            {featured.map((guide) => (
              <div key={guide.slug}>
                <Link href={`/ethiopia-travel-guide/${guide.slug}`} className="group block bg-white rounded-card overflow-hidden border border-sand/70 card-hover h-full">
                  <div className="relative overflow-hidden" style={{aspectRatio:"16/9"}}>
                    <PlaceholderImage filename={`guide-${guide.slug}-hero.jpg`} width={700} height={394} category="guide" fill className="group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute top-3 left-3"><span className="bg-gold text-volcanic font-body font-medium px-3 py-1 rounded-full" style={{fontSize:"10px",letterSpacing:"0.1em",textTransform:"uppercase"}}>{guide.category}</span></div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-volcanic font-normal group-hover:text-gold-ink transition-colors leading-snug mb-3" style={{fontSize:"clamp(1.2rem,1.75vw,1.45rem)"}}>{guide.title}</h3>
                    <p className="text-warmgrey font-body leading-relaxed mb-5" style={{fontSize:"0.92rem"}}>{guide.dek}</p>
                    <div className="flex items-center justify-between"><span className="text-warmgrey font-body" style={{fontSize:"11.5px"}}>{guide.readTime} read</span><span className="text-gold-ink font-body font-medium" style={{fontSize:"11px",letterSpacing:"0.1em",textTransform:"uppercase"}}>Read guide →</span></div>
                  </div>
                </Link>
              </div>
            ))}
          </AnimateStagger>
        </div>
      </section>

      <section className="section-padding-sm bg-volcanic" aria-labelledby="guide-library-heading">
        <div className="container-max">
          <AnimateIn className="mb-10"><span className="label-eyebrow text-gold">Full Library</span><h2 id="guide-library-heading" className="heading-display text-ivory mt-1" style={{fontSize:"clamp(1.5rem,3vw,2.25rem)"}}>All Ethiopia Travel Guide Topics</h2><p className="text-ivory/60 font-body max-w-2xl mt-3">Organized by how travelers actually plan: timing, route design, arrival logistics, safety, accommodation, wildlife, photography and cultural respect.</p></AnimateIn>
          <div className="space-y-10">
            {themes.map(({ theme, guides }) => (
              <div key={theme}>
                <h3 className="text-gold font-body mb-4" style={{fontSize:"11px",letterSpacing:"0.14em",textTransform:"uppercase"}}>{theme}</h3>
                <AnimateStagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3" staggerDelay={0.035}>
                  {guides.map((guide) => (
                    <div key={guide.slug}>
                      <Link href={`/ethiopia-travel-guide/${guide.slug}`} className="group flex items-start gap-4 p-4 rounded-[14px] border border-white/10 hover:border-gold/40 hover:bg-white/5 transition-colors duration-300">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-display text-ivory font-light group-hover:text-gold transition-colors leading-snug" style={{fontSize:"clamp(1rem,1.5vw,1.2rem)"}}>{guide.title}</h4>
                          <p className="text-ivory/60 font-body mt-1 line-clamp-2" style={{fontSize:"12.5px"}}>{guide.metaDesc}</p>
                        </div>
                        <svg className="flex-shrink-0 text-gold group-hover:translate-x-1 transition duration-200 mt-1" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M1 7h12M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </Link>
                    </div>
                  ))}
                </AnimateStagger>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding-sm bg-gold-faint border-t border-sand/60">
        <div className="container-max"><AnimateIn className="grid md:grid-cols-2 gap-10 items-center">
          <div><span className="label-eyebrow">Ready to Plan?</span><h2 className="heading-display text-volcanic mt-2" style={{fontSize:"clamp(1.5rem,3vw,2.25rem)"}}>Turn Research Into a Real Ethiopia Journey</h2><p className="text-warmgrey font-body leading-relaxed mt-4">Every guide is designed to help you ask better questions before booking. When you are ready, Sawla’s local specialists turn the research into a coherent private itinerary.</p></div>
          <div className="flex flex-col sm:flex-row md:flex-col gap-4"><Link href="/enquire" className="btn-primary">Start Planning Your Journey</Link><Link href="/tours-by-experience" className="btn-ghost">Browse Journeys</Link><Link href="/ethiopias-popular-destinations" className="btn-ghost">Explore Destinations</Link></div>
        </AnimateIn></div>
      </section>
    </>
  )
}
