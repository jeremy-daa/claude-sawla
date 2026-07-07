import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import PlaceholderImage from '@/components/ui/PlaceholderImage'
import SchemaScript from '@/components/ui/SchemaScript'
import { getItinerariesByStyle } from '@/data/itineraryData'
import { TOUR_STYLE_PAGE_CONTENT } from '@/data/tourStylePageContent'

interface Props { params: Promise<{ style: string }> }

export async function generateStaticParams() { return Object.keys(TOUR_STYLE_PAGE_CONTENT).map(style => ({ style })) }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { style } = await params
  const page = TOUR_STYLE_PAGE_CONTENT[style]
  if (!page) return {}
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: page.canonical },
    openGraph: { title: page.metaTitle, description: page.metaDescription, url: page.canonical, type: 'website', images: [{ url: 'https://www.sawlatours.com/images/og-home.jpg', width: 1200, height: 630 }] },
  }
}

export default async function TourStylePage({ params }: Props) {
  const { style } = await params
  const page = TOUR_STYLE_PAGE_CONTENT[style]
  if (!page) notFound()
  const itineraries = getItinerariesByStyle(style)
  const schema = [
    { '@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[
      {'@type':'ListItem',position:1,name:'Home',item:'https://www.sawlatours.com'},
      {'@type':'ListItem',position:2,name:'Ethiopia Tours',item:'https://www.sawlatours.com/tours-by-experience'},
      {'@type':'ListItem',position:3,name:page.name,item:page.canonical},
    ]},
    { '@context':'https://schema.org','@type':'CollectionPage',name:page.title,url:page.canonical,description:page.metaDescription,
      mainEntity:{'@type':'ItemList',itemListElement:itineraries.map((item,index)=>({'@type':'ListItem',position:index+1,name:item.name,url:`${page.canonical}/${item.slug}`}))}},
    { '@context':'https://schema.org','@type':'FAQPage',mainEntity:page.faqs.map(item=>({'@type':'Question',name:item.question,acceptedAnswer:{'@type':'Answer',text:item.answer}}))},
  ]
  return <>
    <SchemaScript schema={schema} />

    {/* ── HERO: title + short phrases only ── */}
    <section className="relative min-h-[72vh] overflow-hidden pt-24 flex items-end pb-16 md:pb-20">
      <PlaceholderImage filename={`tour-hub-${style}.jpg`} width={1920} height={1080} category="tour" fill label={page.title} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(42,39,36,0.90) 0%, rgba(42,39,36,0.30) 55%, rgba(42,39,36,0.22) 100%)' }} />
      <div className="relative z-10 container-max text-ivory">
        <nav aria-label="Breadcrumb" className="mb-5 font-body" style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          <Link href="/" className="text-ivory/50 hover:text-gold transition-colors">Home</Link>
          <span className="text-ivory/30 mx-2">/</span>
          <Link href="/tours-by-experience" className="text-ivory/50 hover:text-gold transition-colors">Ethiopia Tours</Link>
          <span className="text-ivory/30 mx-2">/</span>
          <span className="text-ivory/80">{page.name}</span>
        </nav>
        <span className="label-eyebrow text-gold">{page.eyebrow}</span>
        <h1 className="heading-display text-ivory mt-2 max-w-4xl" style={{ fontSize: 'clamp(2.5rem,5.5vw,4.75rem)' }}>
          {page.title}
        </h1>
        <p className="text-gold/85 font-body font-medium mt-5" style={{ fontSize: '11.5px', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
          {page.trustLine}
        </p>
        <div className="flex flex-wrap gap-3 mt-7">
          <Link href="/enquire" className="btn-primary">{page.primaryCta} →</Link>
          <a href="#description" className="btn-secondary">{page.secondaryCta}</a>
        </div>
      </div>
    </section>

    {/* ── DESCRIPTION: editorial intro below the hero ── */}
    <section id="description" className="bg-ivory border-b border-sand/60 scroll-mt-20">
      <div className="container-max py-12 md:py-16">
        <div className="grid lg:grid-cols-[1fr_340px] gap-10 lg:gap-16 items-start">
          <div>
            <p className="font-display text-volcanic font-light leading-relaxed" style={{ fontSize: 'clamp(1.25rem,2.2vw,1.75rem)', lineHeight: '1.55' }}>
              {page.heroDescription}
            </p>
          </div>
          <div className="border border-sand rounded-card p-6 bg-white space-y-5">
            <div>
              <div className="label-eyebrow !mb-2">Journey Type</div>
              <div className="font-body font-medium text-volcanic">{page.name}</div>
            </div>
            <div className="border-t border-sand/60 pt-4">
              <Link href="/enquire" className="btn-primary w-full justify-center">
                {page.primaryCta} →
              </Link>
            </div>
            <a href="#journey-content"
              className="flex items-center justify-center gap-1.5 font-body text-gold-ink hover:text-volcanic transition-colors"
              style={{ fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {page.secondaryCta}
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M6 1v10M2 7l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>

    <section id="journey-content" className="section-padding bg-ivory scroll-mt-20">
      <div className="container-max max-w-5xl">
        <article className="[&_h2]:font-display [&_h2]:text-charcoal [&_h2]:text-4xl [&_h2]:mt-16 [&_h2]:mb-5 [&_h3]:font-display [&_h3]:text-charcoal [&_h3]:text-2xl [&_h3]:mt-9 [&_h3]:mb-3 [&_p]:text-warmgrey [&_p]:leading-8 [&_p]:mb-5 [&_strong]:text-charcoal [&_ul]:my-6 [&_ul]:space-y-2 [&_ul]:text-warmgrey [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:my-6 [&_ol]:space-y-2 [&_ol]:text-warmgrey [&_ol]:list-decimal [&_ol]:pl-6 [&_table]:w-full [&_table]:my-8 [&_table]:border-collapse [&_th]:bg-sand/60 [&_th]:text-left [&_th]:p-3 [&_th]:text-charcoal [&_td]:border-b [&_td]:border-sand [&_td]:p-3 [&_td]:text-warmgrey [&_hr]:my-12 [&_hr]:border-sand" dangerouslySetInnerHTML={{ __html: page.html }} />
      </div>
    </section>

    {itineraries.length > 0 && <section className="section-padding bg-sand/25"><div className="container-max"><div className="text-center mb-12"><span className="label-eyebrow">Suggested itineraries</span><h2 className="heading-display text-display-md text-charcoal">Starting Points, Tailored to You</h2><p className="text-warmgrey mt-3 max-w-2xl mx-auto">Each itinerary can be adjusted for your dates, pace, accommodation, guide expertise and preferred combination of regions.</p></div><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{itineraries.map(itin=><Link key={itin.slug} href={`/tours-by-experience/${style}/${itin.slug}`} className="group bg-white rounded-card overflow-hidden border border-sand card-hover block"><div className="relative aspect-[16/10] overflow-hidden"><PlaceholderImage filename={`tour-${itin.slug}-hero.jpg`} width={600} height={375} category="tour" fill className="group-hover:scale-105 transition-transform duration-500" label={`${itin.name} Ethiopia tour`} /></div><div className="p-6"><div className="flex items-center justify-between mb-2"><span className="label-eyebrow text-gold-ink">{page.name}</span><span className="text-warmgrey text-xs">{itin.duration} days</span></div><h3 className="font-display text-charcoal text-xl group-hover:text-gold-ink transition-colors">{itin.name}</h3><p className="text-warmgrey text-sm mt-2">{itin.highlights.slice(0,3).join(' · ')}</p><span className="inline-block mt-4 text-gold-ink text-xs uppercase tracking-wider">View journey →</span></div></Link>)}</div></div></section>}

    <section className="section-padding-sm bg-charcoal text-center"><div className="container-max max-w-3xl"><span className="label-eyebrow text-gold">Private and tailor-made</span><h2 className="font-display text-ivory text-display-sm mt-2 mb-4">Build This Journey Around You</h2><p className="text-ivory/65 mb-7">Share your dates, interests, pace and comfort expectations. A Sawla specialist will shape the route around current access and the experience you actually want.</p><Link href="/enquire" className="btn-primary">Start planning →</Link></div></section>
  </>
}
