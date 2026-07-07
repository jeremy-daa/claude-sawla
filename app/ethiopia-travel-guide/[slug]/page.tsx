import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import PlaceholderImage from "@/components/ui/PlaceholderImage"
import SchemaScript from "@/components/ui/SchemaScript"
import { AnimateIn, AnimateStagger } from "@/components/ui/AnimateIn"
import { FIELD_GUIDE_CONTENT, FIELD_GUIDE_SLUGS, getGuideContent } from "@/data/fieldGuideContent"
import { getItinerariesForGuide } from "@/data/itineraryData"
import { PREMIUM_DESTINATIONS } from "@/data/destinationsPremium"
import { articleSchema, breadcrumbSchema, faqSchema } from "@/lib/schema"

interface Props { params: Promise<{ slug: string }> }
const BASE = "https://www.sawlatours.com"

// "2026-06-12" → "June 2026" — the raw ISO string is for machines (schema), not the byline.
function formatUpdated(iso: string): string {
  const d = new Date(iso + "T00:00:00Z")
  if (isNaN(d.getTime())) return iso
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" })
}

export async function generateStaticParams() {
  return FIELD_GUIDE_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const guide = getGuideContent(slug)
  if (!guide) return {}
  return {
    title: guide.metaTitle,
    description: guide.metaDesc,
    alternates: { canonical: `${BASE}/ethiopia-travel-guide/${guide.slug}` },
    openGraph: { title: guide.metaTitle, description: guide.metaDesc, url: `${BASE}/ethiopia-travel-guide/${guide.slug}`, images: [{ url: `${BASE}/images/og-home.jpg`, width: 1200, height: 630 }] },
    keywords: [...guide.keywords, "Ethiopia travel guide", "Sawla Tours", "private Ethiopia tours"],
  }
}

export default async function EthiopiaGuideArticle({ params }: Props) {
  const { slug } = await params
  const guide = getGuideContent(slug)
  if (!guide) notFound()

  const relatedGuides = (guide.relatedGuides.length ? guide.relatedGuides : FIELD_GUIDE_SLUGS.filter((item) => item !== guide.slug).slice(0, 4))
    .map((item) => FIELD_GUIDE_CONTENT.find((candidate) => candidate.slug === item))
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .slice(0, 4)

  const relevantItineraries = getItinerariesForGuide(guide.slug)

  const schemas = [
    articleSchema({ url: `${BASE}/ethiopia-travel-guide/${guide.slug}`, title: guide.title, description: guide.metaDesc, datePublished: guide.updated }),
    breadcrumbSchema([{ name: "Home", url: BASE }, { name: "Ethiopia Travel Guide", url: `${BASE}/ethiopia-travel-guide` }, { name: guide.title, url: `${BASE}/ethiopia-travel-guide/${guide.slug}` }]),
    faqSchema(guide.faqs),
  ]

  return (
    <>
      {schemas.map((schema, index) => <SchemaScript key={index} schema={schema} />)}
      <section className="relative overflow-hidden" style={{height:"56vh",minHeight:"420px"}} aria-labelledby="guide-article-heading">
        <PlaceholderImage filename={`guide-${guide.slug}-hero.jpg`} width={1920} height={900} category="guide" fill className="object-center" />
        <div className="absolute inset-0" style={{background:"linear-gradient(to top, rgba(42,39,36,0.94) 0%, rgba(42,39,36,0.55) 48%, rgba(42,39,36,0.14) 100%)"}} />
        <div className="absolute inset-x-0 bottom-0 pb-12">
          <div className="container-max">
            <AnimateIn className="max-w-3xl">
              <nav aria-label="Breadcrumb" className="mb-4"><ol className="flex flex-wrap items-center gap-2 font-body" style={{fontSize:"11.5px",letterSpacing:"0.1em",textTransform:"uppercase"}}><li><Link href="/" className="text-ivory/50 hover:text-gold transition-colors">Home</Link></li><li className="text-ivory/30">/</li><li><Link href="/ethiopia-travel-guide" className="text-ivory/50 hover:text-gold transition-colors">Travel Guide</Link></li><li className="text-ivory/30">/</li><li className="text-ivory/80">{guide.title}</li></ol></nav>
              <span className="label-eyebrow text-gold">{guide.category}</span>
              <h1 id="guide-article-heading" className="heading-display text-ivory mt-2" style={{fontSize:"clamp(2rem,4.5vw,4rem)"}}>{guide.title}</h1>
              <p className="text-ivory/72 font-body mt-4 max-w-2xl leading-relaxed" style={{fontSize:"clamp(1rem,1.25vw,1.18rem)"}}>{guide.dek}</p>
              <div className="flex flex-wrap items-center gap-4 mt-5"><span className="text-ivory/60 font-body" style={{fontSize:"11.5px"}}>{guide.readTime} read</span><span className="text-ivory/25">|</span><span className="text-ivory/60 font-body" style={{fontSize:"11.5px"}}>Updated {formatUpdated(guide.updated)}</span><span className="text-ivory/25">|</span><span className="text-ivory/60 font-body" style={{fontSize:"11.5px"}}>Sawla Tours Field Guide</span></div>
            </AnimateIn>
          </div>
        </div>
      </section>

      <section className="section-padding bg-ivory">
        <div className="container-max">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            <article className="lg:col-span-2">
              {/* The dek already headlines the hero directly above — repeating it verbatim
                  here read as an editing mistake, so the article opens with the quick facts. */}
              <AnimateIn className="grid sm:grid-cols-2 gap-3 mb-12">
                {guide.quickFacts.map((fact) => <div key={fact} className="bg-white border border-sand/70 rounded-[14px] p-4"><span className="text-gold-ink font-body" style={{fontSize:"10px",letterSpacing:"0.12em",textTransform:"uppercase"}}>Planning Note</span><p className="text-volcanic font-body mt-2 leading-relaxed" style={{fontSize:"0.92rem"}}>{fact}</p></div>)}
              </AnimateIn>

              <div className="space-y-12">
                {guide.sections.map((section, index) => (
                  <AnimateIn key={section.heading} className="prose-sawla" delay={index * 0.04}>
                    <h2 className="heading-display text-volcanic" style={{fontSize:"clamp(1.45rem,2.7vw,2.25rem)"}}>{section.heading}</h2>
                    <p className="text-warmgrey font-body leading-relaxed mt-4" style={{fontSize:"clamp(1rem,1.15vw,1.08rem)"}}>{section.body}</p>
                  </AnimateIn>
                ))}
              </div>

              {guide.faqs.length > 0 && (
                <AnimateIn className="mt-14" aria-labelledby="guide-faq-heading">
                  <span className="label-eyebrow">Practical FAQs</span>
                  <h2 id="guide-faq-heading" className="heading-display text-volcanic mt-1 mb-6" style={{fontSize:"clamp(1.45rem,2.7vw,2.25rem)"}}>Questions Travelers Ask</h2>
                  <div className="space-y-3">
                    {guide.faqs.map((faq) => (
                      <details key={faq.q} className="group bg-white border border-sand/70 rounded-[14px] overflow-hidden">
                        <summary className="flex items-center justify-between p-5 cursor-pointer list-none font-body font-medium text-volcanic hover:text-gold-ink transition-colors" style={{fontSize:"13.5px"}}><span>{faq.q}</span><span className="ml-4 text-gold-ink text-xl leading-none group-open:rotate-45 transition-transform duration-200 flex-shrink-0">+</span></summary>
                        <div className="px-5 pb-5 text-warmgrey font-body leading-relaxed" style={{fontSize:"13.5px"}}>{faq.a}</div>
                      </details>
                    ))}
                  </div>
                </AnimateIn>
              )}
            </article>

            <aside className="lg:col-span-1"><div className="sticky top-24 space-y-5">
              <div className="bg-volcanic rounded-card p-6 text-ivory">
                <div className="label-eyebrow text-gold mb-3">Plan With a Local Team</div>
                <h3 className="font-display text-ivory font-light mb-3" style={{fontSize:"clamp(1.125rem,1.75vw,1.375rem)"}}>Need route-specific advice?</h3>
                <p className="text-ivory/60 font-body leading-relaxed mb-5" style={{fontSize:"0.875rem"}}>Tell us your dates, interests and comfort level. We will shape the right Ethiopia journey around current conditions.</p>
                <Link href="/enquire" className="btn-gold w-full justify-center mb-3">Ask a Specialist</Link>
                <Link href="/how-we-work" className="flex items-center justify-center gap-1.5 text-ivory/60 hover:text-gold transition-colors font-body" style={{fontSize:"11px",letterSpacing:"0.1em",textTransform:"uppercase"}}>How we plan →</Link>
              </div>

              {guide.relatedDestinations.length > 0 && (
                <div className="border border-sand rounded-card p-5 bg-white">
                  <div className="label-eyebrow mb-4">Related Destinations</div>
                  <div className="space-y-2">
                    {guide.relatedDestinations.map((destination) => (
                      <Link key={destination} href={`/ethiopias-popular-destinations/${destination}`} className="flex items-center justify-between text-sm group">
                        <span className="text-warmgrey group-hover:text-gold-ink transition-colors font-body">{PREMIUM_DESTINATIONS.find((d) => d.slug === destination)?.name ?? destination.replace(/-/g, " ")}</span>
                        <span className="text-gold-ink">→</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {relevantItineraries.length > 0 && (
                <div className="border border-sand rounded-card p-5 bg-white">
                  <div className="label-eyebrow mb-4">Journeys This Guide Applies To</div>
                  <div className="space-y-2">
                    {relevantItineraries.map((itin) => (
                      <Link key={itin.slug} href={`/tours-by-experience/${itin.styleSlug}/${itin.slug}`} className="flex items-center justify-between group py-1.5">
                        <span className="text-warmgrey group-hover:text-gold-ink transition-colors font-body leading-snug" style={{fontSize:"13px"}}>{itin.name}</span>
                        <span className="text-gold-ink flex-shrink-0 ml-2">→</span>
                      </Link>
                    ))}
                  </div>
                  <Link href="/tours-by-experience" className="inline-flex items-center gap-1 mt-4 text-gold-ink hover:text-volcanic transition-colors font-body font-medium" style={{fontSize:"11px",letterSpacing:"0.1em",textTransform:"uppercase"}}>
                    All Journeys →
                  </Link>
                </div>
              )}

              <div className="border border-sand rounded-card p-5 bg-white">
                <div className="label-eyebrow mb-4">Guide Keywords</div>
                <div className="flex flex-wrap gap-2">
                  {guide.keywords.map((keyword) => <span key={keyword} className="rounded-full bg-gold-faint text-warmgrey px-3 py-1 font-body" style={{fontSize:"11px"}}>{keyword}</span>)}
                </div>
              </div>
            </div></aside>
          </div>
        </div>
      </section>

      <section className="section-padding-sm bg-volcanic" aria-labelledby="related-guides-heading">
        <div className="container-max">
          <AnimateIn className="mb-8"><span className="label-eyebrow text-gold">Continue Reading</span><h2 id="related-guides-heading" className="heading-display text-ivory mt-1" style={{fontSize:"clamp(1.375rem,2.5vw,1.875rem)"}}>Related Ethiopia Planning Guides</h2></AnimateIn>
          <AnimateStagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3" staggerDelay={0.05}>
            {relatedGuides.map((related) => (
              <div key={related.slug}>
                <Link href={`/ethiopia-travel-guide/${related.slug}`} className="group block p-4 rounded-[14px] border border-white/10 hover:border-gold/40 hover:bg-white/5 transition-colors duration-300 h-full">
                  <div className="text-gold font-body mb-1" style={{fontSize:"10px",letterSpacing:"0.12em",textTransform:"uppercase"}}>{related.category}</div>
                  <h3 className="font-display text-ivory font-light group-hover:text-gold transition-colors leading-snug" style={{fontSize:"clamp(0.95rem,1.25vw,1.1rem)"}}>{related.title}</h3>
                  <p className="text-ivory/60 font-body mt-2 line-clamp-2" style={{fontSize:"12px"}}>{related.metaDesc}</p>
                </Link>
              </div>
            ))}
          </AnimateStagger>
          <AnimateIn delay={0.18} className="text-center mt-10"><Link href="/ethiopia-travel-guide" className="btn-ghost-light">All Ethiopia Travel Guides</Link></AnimateIn>
        </div>
      </section>
    </>
  )
}
