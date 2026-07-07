import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import PlaceholderImage from "@/components/ui/PlaceholderImage"
import SchemaScript from "@/components/ui/SchemaScript"
import { AnimateIn, AnimateStagger } from "@/components/ui/AnimateIn"
import { breadcrumbSchema, faqSchema } from "@/lib/schema"
import { SPECIES, MOMENTS_ARTICLES, SITE } from "@/data/siteData"
import { FIELD_GUIDE_CONTENT } from "@/data/fieldGuideContent"
import { getSpeciesContent } from "@/data/speciesContent"
import { getItinerary } from "@/data/itineraryData"

// ── Per-species interlinking maps ─────────────────────────────────────────────

const SPECIES_ITINS: Record<string, { slug: string; style: string }[]> = {
  "ethiopian-wolf":       [{ slug:"bale-simien-wolf-gelada-12-days", style:"ethiopia-wildlife-tours" }, { slug:"bale-mountains-wildlife-5-days", style:"ethiopia-wildlife-tours" }, { slug:"endemic-mammals-circuit-15-days", style:"ethiopia-wildlife-tours" }],
  "gelada-monkey":        [{ slug:"bale-simien-wolf-gelada-12-days", style:"ethiopia-wildlife-tours" }, { slug:"simien-trekking-wildlife-8-days", style:"ethiopia-wildlife-tours" }, { slug:"endemic-mammals-circuit-15-days", style:"ethiopia-wildlife-tours" }],
  "walia-ibex":           [{ slug:"simien-trekking-wildlife-8-days",  style:"ethiopia-wildlife-tours" }, { slug:"bale-simien-wolf-gelada-12-days", style:"ethiopia-wildlife-tours" }],
  "mountain-nyala":       [{ slug:"bale-mountains-wildlife-5-days",   style:"ethiopia-wildlife-tours" }, { slug:"bale-trekking-adventure-8-days",  style:"ethiopia-adventure-tours" }, { slug:"endemic-mammals-circuit-15-days", style:"ethiopia-wildlife-tours" }],
  "bale-monkey":          [{ slug:"bale-mountains-wildlife-5-days",   style:"ethiopia-wildlife-tours" }, { slug:"bale-trekking-adventure-8-days",  style:"ethiopia-adventure-tours" }],
  "blue-winged-goose":    [{ slug:"rift-valley-lakes-birding-7-days", style:"ethiopia-birdwatching-tours" }, { slug:"ethiopia-birding-specialist-14-days", style:"ethiopia-birdwatching-tours" }],
  "stresemanns-bushcrow": [{ slug:"ethiopia-birding-specialist-14-days", style:"ethiopia-birdwatching-tours" }, { slug:"rift-valley-lakes-birding-7-days", style:"ethiopia-birdwatching-tours" }],
}

const SPECIES_GUIDES: Record<string, string[]> = {
  "ethiopian-wolf":       ["popular-wildlife-ethiopia", "when-to-visit-ethiopia", "what-to-pack-for-ethiopia"],
  "gelada-monkey":        ["popular-wildlife-ethiopia", "when-to-visit-ethiopia", "what-to-pack-for-ethiopia"],
  "walia-ibex":           ["popular-wildlife-ethiopia", "when-to-visit-ethiopia"],
  "mountain-nyala":       ["popular-wildlife-ethiopia", "when-to-visit-ethiopia"],
  "bale-monkey":          ["popular-wildlife-ethiopia", "when-to-visit-ethiopia"],
  "blue-winged-goose":    ["ethiopia-birding-guide", "popular-wildlife-ethiopia", "when-to-visit-ethiopia"],
  "stresemanns-bushcrow": ["ethiopia-birding-guide", "popular-wildlife-ethiopia"],
}

const SPECIES_MOMENTS: Record<string, string[]> = {
  "ethiopian-wolf":       ["ethiopian-wolf-bale-mountains-sanetti-plateau"],
  "gelada-monkey":        ["gelada-monkey-simien-mountains"],
  "walia-ibex":           ["gelada-monkey-simien-mountains"],
  "mountain-nyala":       ["ethiopian-wolf-bale-mountains-sanetti-plateau"],
  "bale-monkey":          ["ethiopian-wolf-bale-mountains-sanetti-plateau"],
  "blue-winged-goose":    ["why-ethiopia-not-safari-destination"],
  "stresemanns-bushcrow": ["why-ethiopia-not-safari-destination"],
}

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return SPECIES.map(s => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const sp = SPECIES.find(s => s.slug === slug)
  if (!sp) return {}
  const title = sp.commonName + " in Ethiopia | Species Guide | Sawla"
  const desc = "Where to see the " + sp.commonName + " (" + sp.scientificName + ") in Ethiopia - best locations, viewing seasons, conservation status, and how to plan a trip."
  return {
    title: title.length > 60 ? sp.commonName + " in Ethiopia | Sawla Tours" : title,
    description: desc.length > 160 ? desc.slice(0,157) + "..." : desc,
    alternates: { canonical: "https://www.sawlatours.com/ethiopia-wildlife/" + slug },
    openGraph: { title: sp.commonName + " in Ethiopia | Sawla Tours", description: sp.tagline, images: [{ url: sp.heroImage, alt: sp.heroAlt }] },
    keywords: [sp.commonName, sp.scientificName, "Ethiopia wildlife", "endemic species Ethiopia", "Sawla Tours"],
  }
}

const STATUS_COLORS: Record<string, string> = {
  "Endangered":  "text-red-700 bg-red-50 border-red-100",
  "Vulnerable":  "text-amber-700 bg-amber-50 border-amber-100",
  "Least Concern": "text-green-700 bg-green-50 border-green-100",
}

export default async function SpeciesPage({ params }: Props) {
  const { slug } = await params
  const sp = SPECIES.find(s => s.slug === slug)
  if (!sp) notFound()
  const content = getSpeciesContent(slug)
  const related = SPECIES.filter(s => s.slug !== slug).slice(0, 4)

  // Resolve interlinking
  const linkedItins = (SPECIES_ITINS[slug] ?? [])
    .map(ref => { const it = getItinerary(ref.slug); return it ? { ...it, style: ref.style } : null })
    .filter((x): x is NonNullable<typeof x> => x !== null)
    .slice(0, 3)
  const linkedGuides = (SPECIES_GUIDES[slug] ?? [])
    .map(s => FIELD_GUIDE_CONTENT.find(g => g.slug === s))
    .filter((x): x is NonNullable<typeof x> => Boolean(x))
    .slice(0, 3)
  const linkedMoments = (SPECIES_MOMENTS[slug] ?? [])
    .map(s => MOMENTS_ARTICLES.find(a => a.slug === s))
    .filter((x): x is NonNullable<typeof x> => Boolean(x))
    .slice(0, 2)

  const schemas = [
    breadcrumbSchema([
      { name: "Home", url: "https://www.sawlatours.com" },
      { name: "Endemic Species", url: "https://www.sawlatours.com/ethiopia-wildlife/endemic-species" },
      { name: sp.commonName, url: "https://www.sawlatours.com/ethiopia-wildlife/" + slug },
    ]),
    ...(content?.faqs ? [faqSchema(content.faqs)] : []),
  ]

  return (
    <>
      {schemas.map((s, i) => <SchemaScript key={i} schema={s} />)}
      <div className="sr-only">{sp.commonName} ({sp.scientificName}) is {sp.endemic ? "endemic to Ethiopia, found nowhere else on earth" : "found in Ethiopia"}. Best seen at {sp.bestLocation}. Conservation status: {sp.conservationStatus}. Sawla Tours arranges specialist wildlife journeys to see Ethiopian endemic species.</div>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden" style={{height:"70vh",minHeight:"520px"}} aria-labelledby="species-heading">
        <PlaceholderImage filename={"species-" + slug + "-portrait.jpg"} width={1920} height={1080} category="species" fill className="object-center" />
        <div className="absolute inset-0" style={{background:"linear-gradient(to top, rgba(42,39,36,0.9) 0%, rgba(42,39,36,0.25) 55%, rgba(42,39,36,0.1) 100%)"}} />
        <div className="absolute inset-x-0 bottom-0 pb-16 md:pb-20">
          <div className="container-max text-ivory">
            <AnimateIn>
              <nav aria-label="Breadcrumb" className="mb-5"><ol className="flex flex-wrap items-center gap-2 font-body" style={{fontSize:"11.5px",letterSpacing:"0.1em",textTransform:"uppercase"}}><li><Link href="/" className="text-ivory/50 hover:text-gold transition-colors cursor-pointer">Home</Link></li><li className="text-ivory/30">&#47;</li><li><Link href="/ethiopia-wildlife/endemic-species" className="text-ivory/50 hover:text-gold transition-colors cursor-pointer">Endemic Species</Link></li><li className="text-ivory/30">&#47;</li><li className="text-ivory/80">{sp.commonName}</li></ol></nav>
              <span className="label-eyebrow text-gold">{sp.type} &middot; {sp.endemic ? "Ethiopia Endemic" : "Found in Ethiopia"}</span>
              <h1 id="species-heading" className="heading-display text-ivory mt-2" style={{fontSize:"clamp(2.25rem,5.5vw,5rem)"}}>{sp.commonName}</h1>
              <p className="font-display text-ivory/70 italic font-light mt-1" style={{fontSize:"clamp(1.125rem,2vw,1.75rem)"}}>{sp.scientificName}</p>
              <p className="text-ivory/75 font-body mt-4 max-w-xl leading-relaxed" style={{fontSize:"clamp(1rem,1.25vw,1.2rem)"}}>{sp.tagline}</p>
              <div className="flex flex-wrap gap-3 mt-6">
                <span className={"border rounded-full px-4 py-1.5 font-body font-medium " + (STATUS_COLORS[sp.conservationStatus] ?? "border-white/30 text-ivory/85")} style={{fontSize:"12px"}}>{sp.conservationStatus}</span>
                <span className="border border-white/30 text-ivory/85 rounded-full px-4 py-1.5 font-body" style={{fontSize:"12px"}}>{sp.bestLocation}</span>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT + SIDEBAR ── */}
      <section className="section-padding bg-ivory">
        <div className="container-max">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">

            <article className="lg:col-span-2">
              {content?.intro && (
                <AnimateIn className="mb-10">
                  <p className="text-warmgrey font-body leading-relaxed" style={{fontSize:"clamp(1.125rem,1.5vw,1.25rem)"}}>{content.intro}</p>
                </AnimateIn>
              )}
              {content?.sections?.map((s, i) => (
                <AnimateIn key={i} delay={i*0.07} className="mb-10">
                  {s.heading && (<h2 className="font-display text-volcanic font-normal mb-4" style={{fontSize:"clamp(1.25rem,2vw,1.625rem)"}}>{s.heading}</h2>)}
                  <p className="text-warmgrey font-body leading-relaxed" style={{fontSize:"clamp(1rem,1.1vw,1.0625rem)"}}>{s.body}</p>
                </AnimateIn>
              ))}
              {!content && (
                <AnimateIn className="mb-10">
                  <p className="text-warmgrey font-body leading-relaxed" style={{fontSize:"clamp(1rem,1.1vw,1.0625rem)"}}>The {sp.commonName} ({sp.scientificName}) is {sp.endemic ? "found only in Ethiopia" : "one of Ethiopia’s remarkable wildlife species"}. The best place to see them is {sp.bestLocation}. Conservation status: {sp.conservationStatus}. Contact Sawla Tours to plan a specialist wildlife journey.</p>
                </AnimateIn>
              )}
              {content?.viewingTips && content.viewingTips.length > 0 && (
                <AnimateIn className="my-10 p-6 bg-volcanic rounded-card">
                  <div className="label-eyebrow text-gold mb-4">How to See the {sp.commonName}</div>
                  <ul className="space-y-2">
                    {content.viewingTips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <svg className="text-gold flex-shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M2 7l4 4 6-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        <span className="text-ivory/80 font-body" style={{fontSize:"0.9375rem"}}>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </AnimateIn>
              )}
              {content?.faqs && content.faqs.length > 0 && (
                <AnimateIn className="mt-10">
                  <h2 className="font-display text-volcanic font-normal mb-6" style={{fontSize:"clamp(1.25rem,2vw,1.625rem)"}}>Frequently Asked Questions</h2>
                  <div className="space-y-3">
                    {content.faqs.map(faq => (
                      <details key={faq.q} className="border border-sand rounded-card group">
                        <summary className="flex items-center justify-between p-5 cursor-pointer list-none font-body font-medium text-volcanic hover:text-gold transition-colors" style={{fontSize:"13.5px"}}>
                          <span>{faq.q}</span>
                          <span className="ml-4 text-gold text-xl leading-none group-open:rotate-45 transition-transform duration-200 flex-shrink-0">+</span>
                        </summary>
                        <div className="px-5 pb-5 text-warmgrey font-body leading-relaxed" style={{fontSize:"13.5px"}}>{faq.a}</div>
                      </details>
                    ))}
                  </div>
                </AnimateIn>
              )}
            </article>

            {/* ── SIDEBAR ── */}
            <aside className="lg:col-span-1"><div className="sticky top-24 space-y-5">
              <div className="bg-volcanic rounded-card p-6 text-ivory">
                <div className="label-eyebrow text-gold mb-3">Plan a Wildlife Trip</div>
                <h3 className="font-display text-ivory font-light mb-3" style={{fontSize:"clamp(1.125rem,1.75vw,1.375rem)"}}>See the {sp.commonName} in the Wild</h3>
                <p className="text-ivory/60 font-body leading-relaxed mb-5" style={{fontSize:"0.875rem"}}>Our wildlife specialists design private journeys timed and routed to maximise your chance of a sighting at {sp.bestLocation}.</p>
                <Link href="/enquire" className="btn-gold w-full justify-center mb-3">Plan This Encounter</Link>
                <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-2.5 border border-white/20 rounded-sm text-ivory/70 hover:border-[#25D366] hover:text-[#25D366] transition-colors font-body cursor-pointer" style={{fontSize:"12.5px",letterSpacing:"0.08em",textTransform:"uppercase"}}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                  WhatsApp
                </a>
              </div>
              <div className="border border-sand rounded-card p-5">
                <div className="label-eyebrow mb-4">At a Glance</div>
                <dl className="space-y-3">
                  {[{l:"Type",v:sp.type},{l:"Scientific name",v:sp.scientificName},{l:"Status",v:sp.conservationStatus},{l:"Best location",v:sp.bestLocation},{l:"Endemic",v:sp.endemic?"Yes - Ethiopia only":"No"}].map(item=>(
                    <div key={item.l}>
                      <dt className="text-warmgrey font-body" style={{fontSize:"11px",letterSpacing:"0.1em",textTransform:"uppercase"}}>{item.l}</dt>
                      <dd className="font-body font-medium text-volcanic mt-0.5" style={{fontSize:"13.5px"}}>{item.v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              {content?.relatedDestinations && content.relatedDestinations.length > 0 && (
                <div className="border border-sand rounded-card p-5 bg-white">
                  <div className="label-eyebrow mb-4">Where to Go</div>
                  <div className="space-y-2">
                    {content.relatedDestinations.map(d => (
                      <Link key={d} href={"/ethiopias-popular-destinations/"+d} className="flex items-center justify-between text-sm group cursor-pointer">
                        <span className="text-warmgrey group-hover:text-gold transition-colors font-body capitalize">{d.replace(/-/g," ")}</span>
                        <svg className="text-gold/60 group-hover:text-gold flex-shrink-0" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Planning guides */}
              {linkedGuides.length > 0 && (
                <div className="border border-sand rounded-card p-5 bg-white">
                  <div className="label-eyebrow mb-4">Planning Guides</div>
                  <div className="space-y-2">
                    {linkedGuides.map(g => (
                      <Link key={g.slug} href={"/ethiopia-travel-guide/"+g.slug} className="flex items-center justify-between text-sm group py-1">
                        <span className="text-warmgrey group-hover:text-gold transition-colors font-body leading-snug" style={{fontSize:"13px"}}>{g.title}</span>
                        <svg className="text-gold/50 group-hover:text-gold flex-shrink-0 ml-2" width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div></aside>
          </div>
        </div>
      </section>

      {/* ── SEE IT IN THE WILD: ITINERARIES ── */}
      {linkedItins.length > 0 && (
        <section className="section-padding-sm bg-gold-faint border-y border-sand/60" aria-labelledby="see-wild-heading">
          <div className="container-max">
            <AnimateIn className="flex flex-col sm:flex-row sm:items-end justify-between mb-9 gap-4">
              <div>
                <span className="label-eyebrow">See It in the Wild</span>
                <h2 id="see-wild-heading" className="heading-display text-volcanic mt-1" style={{fontSize:"clamp(1.5rem,2.75vw,2.1rem)"}}>
                  Journeys That Target the {sp.commonName}
                </h2>
              </div>
              <Link href="/tours-by-experience/ethiopia-wildlife-tours" className="btn-ghost flex-shrink-0">All Wildlife Tours</Link>
            </AnimateIn>
            <AnimateStagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.08}>
              {linkedItins.map(it => (
                <Link key={it.slug} href={"/tours-by-experience/"+it.style+"/"+it.slug}
                  className="group block bg-white border border-sand rounded-card overflow-hidden card-hover">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <PlaceholderImage filename={"tour-"+it.slug+"-hero.jpg"} width={600} height={375} category="tour" fill className="group-hover:scale-105 transition-transform duration-700" />
                    <div className="image-overlay-light" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-warmgrey font-body" style={{fontSize:"11px",letterSpacing:"0.1em",textTransform:"uppercase"}}>{it.durationLabel}</span>
                      <span className="text-sand">·</span>
                      <span className="text-warmgrey font-body" style={{fontSize:"11px"}}>{it.difficulty}</span>
                    </div>
                    <h3 className="font-display text-volcanic font-normal leading-snug group-hover:text-gold transition-colors mb-2" style={{fontSize:"clamp(1rem,1.5vw,1.1875rem)"}}>{it.name}</h3>
                    <div className="text-gold font-body font-medium" style={{fontSize:"12.5px"}}>Privately Quoted</div>
                  </div>
                </Link>
              ))}
            </AnimateStagger>
          </div>
        </section>
      )}

      {/* ── FIELD NOTES: SAWLA MOMENTS ── */}
      {linkedMoments.length > 0 && (
        <section className="section-padding-sm bg-ivory" aria-labelledby="field-notes-heading">
          <div className="container-max">
            <AnimateIn className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <span className="label-eyebrow">From the Field</span>
                <h2 id="field-notes-heading" className="heading-display text-volcanic mt-1" style={{fontSize:"clamp(1.375rem,2.5vw,2rem)"}}>
                  What It&apos;s Actually Like
                </h2>
              </div>
              <Link href="/sawla-moments" className="btn-ghost flex-shrink-0">All Field Notes</Link>
            </AnimateIn>
            <AnimateStagger className="grid sm:grid-cols-2 gap-5" staggerDelay={0.08}>
              {linkedMoments.map(a => (
                <Link key={a.slug} href={"/sawla-moments/"+a.slug}
                  className="group block bg-white border border-sand rounded-card overflow-hidden card-hover">
                  <div className="grid sm:grid-cols-[140px_1fr]">
                    <div className="relative aspect-[4/3] sm:aspect-auto overflow-hidden">
                      <PlaceholderImage filename={"moments-"+a.slug+"-hero.jpg"} width={280} height={210} category="moments" fill className="group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="p-5">
                      <div className="text-gold/70 font-body mb-1.5" style={{fontSize:"10px",letterSpacing:"0.12em",textTransform:"uppercase"}}>{a.category}</div>
                      <h3 className="font-display text-volcanic font-normal group-hover:text-gold transition-colors leading-snug" style={{fontSize:"clamp(1rem,1.5vw,1.125rem)"}}>{a.title}</h3>
                      <div className="text-warmgrey font-body mt-3" style={{fontSize:"11.5px"}}>{a.readingTime} min read</div>
                    </div>
                  </div>
                </Link>
              ))}
            </AnimateStagger>
          </div>
        </section>
      )}

      {/* ── RELATED SPECIES ── */}
      <section className="section-padding bg-volcanic" aria-labelledby="related-species-heading">
        <div className="container-max">
          <AnimateIn className="mb-10">
            <span className="label-eyebrow text-gold">More Endemic Wildlife</span>
            <h2 id="related-species-heading" className="heading-display text-ivory mt-1" style={{fontSize:"clamp(1.5rem,3vw,2.25rem)"}}>Other Species Found Only in Ethiopia</h2>
          </AnimateIn>
          <AnimateStagger className="grid grid-cols-2 lg:grid-cols-4 gap-4" staggerDelay={0.07}>
            {related.map(r => (
              <div key={r.slug}>
                <Link href={"/ethiopia-wildlife/"+r.slug} className="group block relative overflow-hidden rounded-card aspect-[3/4] card-hover">
                  <PlaceholderImage filename={"species-"+r.slug+"-portrait.jpg"} width={400} height={533} category="species" fill className="group-hover:scale-105 transition-transform duration-700" />
                  <div className="image-overlay" />
                  <div className="absolute inset-0 flex flex-col justify-end p-4">
                    <span className="label-eyebrow text-gold !mb-1" style={{fontSize:"9.5px"}}>{r.type}</span>
                    <h3 className="font-display text-ivory font-light leading-tight" style={{fontSize:"clamp(0.95rem,1.5vw,1.2rem)"}}>{r.commonName}</h3>
                  </div>
                </Link>
              </div>
            ))}
          </AnimateStagger>
          <AnimateIn delay={0.2} className="text-center mt-10">
            <Link href="/ethiopia-wildlife/endemic-species" className="btn-ghost-light">All Endemic Species</Link>
          </AnimateIn>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-24 text-center overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          <PlaceholderImage filename={"species-"+slug+"-habitat.jpg"} width={1920} height={600} category="species" fill />
          <div className="absolute inset-0 bg-volcanic/72" />
        </div>
        <div className="relative z-10 container-max">
          <AnimateIn>
            <span className="label-eyebrow text-gold">Ready to See It?</span>
            <h2 className="heading-display text-ivory mt-4 mb-6 max-w-2xl mx-auto" style={{fontSize:"clamp(1.75rem,4vw,3rem)"}}>Plan a Journey to See the {sp.commonName}</h2>
            <p className="text-ivory/70 font-body max-w-lg mx-auto mb-8 leading-relaxed" style={{fontSize:"clamp(1rem,1.25vw,1.125rem)"}}>Our wildlife specialists know where and when to find Ethiopia’s endemic species. Tell us your dates and we will design the right itinerary.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/enquire" className="btn-gold py-4 px-10">Start Planning</Link>
              <Link href="/tours-by-experience/ethiopia-wildlife-tours" className="btn-ghost-light">Wildlife Tours</Link>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  )
}
