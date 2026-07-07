import type { Metadata } from 'next'
import Link from 'next/link'
import PlaceholderImage from '@/components/ui/PlaceholderImage'
import SchemaScript from '@/components/ui/SchemaScript'
import { AnimateIn, AnimateStagger } from '@/components/ui/AnimateIn'
import { MOMENTS_ARTICLES, SITE } from '@/data/siteData'
import { breadcrumbSchema, itemListSchema } from '@/lib/schema'

const BASE = 'https://www.sawlatours.com'

export const metadata: Metadata = {
  title: 'Sawla Moments | Ethiopia Field Notes & Stories',
  description: "Field notes from Ethiopia — what geladas are actually like at 3,600 metres, how Timkat works, why the Danakil is not for everyone, and how to photograph the Omo Valley without doing it wrong.",
  alternates: { canonical: `${BASE}/sawla-moments` },
  openGraph: {
    title: 'Sawla Moments | Ethiopia Field Notes & Stories',
    description: "Written by people who live and work in Ethiopia — not travel writers passing through.",
    url: `${BASE}/sawla-moments`,
    type: 'website',
    images: [{ url: `${BASE}/images/og-home.jpg`, width: 1200, height: 630 }],
  },
}

const schemas = [
  breadcrumbSchema([
    { name: 'Home', url: BASE },
    { name: 'Sawla Moments', url: `${BASE}/sawla-moments` },
  ]),
  itemListSchema({
    name: 'Sawla Moments — Ethiopia Field Notes',
    url: `${BASE}/sawla-moments`,
    items: MOMENTS_ARTICLES.map(a => ({
      name: a.title,
      url: `${BASE}/sawla-moments/${a.slug}`,
      description: a.teaser,
    })),
  }),
  {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${BASE}/sawla-moments/#blog`,
    name: 'Sawla Moments',
    url: `${BASE}/sawla-moments/`,
    description: 'Field notes from Ethiopia written by local guides, travel specialists, and the Sawla Films documentary team.',
    publisher: {
      '@type': 'Organization',
      name: 'Sawla Tours',
      url: BASE,
    },
  },
]

// Featured: the 3 most varied articles to open with
const FEATURED_SLUGS = [
  'gelada-monkey-simien-mountains',
  'hamer-bull-jumping-ceremony-ethiopia',
  'danakil-depression-what-to-expect',
]

// Group remaining articles by rough theme for the full library
const READING_GROUPS = [
  {
    heading: 'Wildlife and wild places',
    desc: 'What Ethiopia\'s rarest animals are actually like when you\'re close enough to watch them.',
    slugs: ['gelada-monkey-simien-mountains', 'ethiopian-wolf-bale-mountains-sanetti-plateau'],
  },
  {
    heading: 'Ceremony and culture',
    desc: 'Specific events with specific meanings — what happens, why it matters, how to be part of it.',
    slugs: ['hamer-bull-jumping-ceremony-ethiopia', 'timkat-festival-gondar-ethiopia'],
  },
  {
    heading: 'Sacred and historic',
    desc: 'The places that require a guide not just for access, but for understanding.',
    slugs: ['abuna-yemata-guh-tigray-church', 'why-ethiopia-not-safari-destination'],
  },
  {
    heading: 'Expedition and photography',
    desc: 'Honest accounts of difficult journeys and what makes image-making in Ethiopia work.',
    slugs: ['danakil-depression-what-to-expect', 'photographing-omo-valley-ethiopia'],
  },
  {
    heading: 'Planning and approach',
    desc: 'How a Sawla journey actually comes together, and what thinking goes into it.',
    slugs: ['how-we-plan-custom-ethiopia-journey'],
  },
]

const featured = FEATURED_SLUGS
  .map(slug => MOMENTS_ARTICLES.find(a => a.slug === slug))
  .filter(Boolean) as typeof MOMENTS_ARTICLES

const allArticles = MOMENTS_ARTICLES

export default function SawlaMomentsHub() {
  return (
    <>
      {schemas.map((s, i) => <SchemaScript key={i} schema={s} />)}

      {/* ── HERO ── */}
      <section className="relative overflow-hidden" style={{ minHeight: '540px', paddingTop: '8rem', paddingBottom: '5rem' }} aria-labelledby="moments-heading">
        <PlaceholderImage filename="moments-hub-hero.jpg" width={1920} height={900} category="moments" fill className="object-center" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(42,39,36,0.94) 0%, rgba(42,39,36,0.42) 50%, rgba(42,39,36,0.16) 100%)' }} />
        <div className="relative z-10 container-max text-ivory">
          <AnimateIn className="max-w-3xl">
            <nav aria-label="Breadcrumb" className="mb-5">
              <ol className="flex items-center gap-2 font-body" style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                <li><Link href="/" className="text-ivory/45 hover:text-gold transition-colors">Home</Link></li>
                <li className="text-ivory/25">/</li>
                <li className="text-ivory/70">Sawla Moments</li>
              </ol>
            </nav>
            <span className="label-eyebrow text-gold">Written from inside Ethiopia</span>
            <h1 id="moments-heading" className="heading-display text-ivory mt-2" style={{ fontSize: 'clamp(2.75rem,5.5vw,5rem)' }}>
              Sawla Moments
            </h1>
            <p className="text-ivory/70 font-body mt-5 leading-relaxed max-w-2xl" style={{ fontSize: 'clamp(1rem,1.3vw,1.175rem)' }}>
              Field notes from the guides, specialists, and filmmakers who work in Ethiopia every day. Not travel writing. Not marketing copy. Honest accounts of what these places are actually like — written to help you decide, plan, and travel better.
            </p>
            <div className="flex items-center gap-6 mt-8 text-ivory/45 font-body" style={{ fontSize: '12px', letterSpacing: '0.08em' }}>
              <span>{allArticles.length} field notes</span>
              <span aria-hidden="true">·</span>
              <span>Wildlife · Ceremony · Sacred history · Photography · Planning</span>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── EDITORIAL INTRO ── */}
      <section className="bg-gold-faint border-b border-sand/60">
        <div className="container-max py-10">
          <AnimateIn className="grid md:grid-cols-2 gap-10 items-center max-w-4xl">
            <div>
              <p className="font-display text-volcanic font-light leading-relaxed" style={{ fontSize: 'clamp(1.2rem,2vw,1.6rem)', lineHeight: '1.5' }}>
                &ldquo;Ethiopia does not reveal itself quickly. You cannot rush it and get the same trip.&rdquo;
              </p>
              <p className="text-warmgrey font-body mt-3" style={{ fontSize: '13px' }}>
                — Sawla Tours planning team, Addis Ababa
              </p>
            </div>
            <p className="text-warmgrey font-body leading-relaxed" style={{ fontSize: 'clamp(0.9375rem,1.1vw,1rem)' }}>
              Sawla Moments is where we write about what we know from the ground — not what the guidebooks say. Some of it is practical. Some of it is the kind of thing that only becomes clear when you have been somewhere many times. All of it is written to make your trip more considered.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* ── FEATURED THREE ── */}
      <section className="section-padding bg-ivory" aria-labelledby="featured-heading">
        <div className="container-max">
          <AnimateIn className="mb-10">
            <span className="label-eyebrow">Start Here</span>
            <h2 id="featured-heading" className="heading-display text-volcanic mt-1" style={{ fontSize: 'clamp(1.75rem,3.25vw,2.5rem)' }}>
              Three That Give You the Range
            </h2>
            <p className="text-warmgrey font-body mt-3 max-w-xl" style={{ fontSize: '0.9375rem' }}>
              If you are new to Sawla Moments, these three articles together — wildlife, culture, and expedition — show you what the writing is actually like.
            </p>
          </AnimateIn>

          {/* First article — wide */}
          {featured[0] && (
            <AnimateIn className="mb-5">
              <Link href={`/sawla-moments/${featured[0].slug}`}
                className="group grid md:grid-cols-2 bg-white border border-sand/70 rounded-card overflow-hidden card-hover">
                <div className="relative aspect-[16/10] md:aspect-auto overflow-hidden">
                  <PlaceholderImage filename={`moments-${featured[0].slug}-hero.jpg`} width={800} height={500} category="moments" fill className="group-hover:scale-105 transition-transform duration-700" />
                  <div className="image-overlay-light" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-gold text-ivory font-body font-medium px-3 py-1 rounded-full" style={{ fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      {featured[0].category}
                    </span>
                  </div>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <h3 className="font-display text-volcanic font-normal group-hover:text-gold transition-colors leading-snug" style={{ fontSize: 'clamp(1.375rem,2.25vw,1.875rem)' }}>
                    {featured[0].title}
                  </h3>
                  <p className="text-warmgrey font-body mt-4 leading-relaxed" style={{ fontSize: '0.9375rem' }}>
                    {featured[0].teaser}
                  </p>
                  <div className="flex items-center gap-3 mt-6">
                    <span className="text-warmgrey font-body" style={{ fontSize: '12px' }}>{featured[0].readingTime} min read</span>
                    <span className="text-gold font-body font-medium" style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Read →</span>
                  </div>
                </div>
              </Link>
            </AnimateIn>
          )}

          {/* Articles 2 and 3 — side by side */}
          <AnimateStagger className="grid md:grid-cols-2 gap-5" staggerDelay={0.08}>
            {featured.slice(1).map(article => (
              article && (
                <div key={article.slug}>
                  <Link href={`/sawla-moments/${article.slug}`}
                    className="group block bg-white border border-sand/70 rounded-card overflow-hidden card-hover h-full">
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <PlaceholderImage filename={`moments-${article.slug}-hero.jpg`} width={700} height={394} category="moments" fill className="group-hover:scale-105 transition-transform duration-700" />
                      <div className="image-overlay-light" />
                      <div className="absolute top-4 left-4">
                        <span className="bg-gold text-ivory font-body font-medium px-3 py-1 rounded-full" style={{ fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                          {article.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-display text-volcanic font-normal group-hover:text-gold transition-colors leading-snug" style={{ fontSize: 'clamp(1.125rem,1.75vw,1.375rem)' }}>
                        {article.title}
                      </h3>
                      <p className="text-warmgrey font-body mt-3 leading-relaxed line-clamp-2" style={{ fontSize: '0.9375rem' }}>
                        {article.teaser}
                      </p>
                      <div className="flex items-center gap-3 mt-5">
                        <span className="text-warmgrey font-body" style={{ fontSize: '12px' }}>{article.readingTime} min read</span>
                        <span className="text-gold font-body font-medium" style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Read →</span>
                      </div>
                    </div>
                  </Link>
                </div>
              )
            ))}
          </AnimateStagger>
        </div>
      </section>

      {/* ── FULL LIBRARY BY THEME ── */}
      <section className="section-padding bg-volcanic" aria-labelledby="library-heading">
        <div className="container-max">
          <AnimateIn className="mb-12">
            <span className="label-eyebrow text-gold">All Field Notes</span>
            <h2 id="library-heading" className="heading-display text-ivory mt-1" style={{ fontSize: 'clamp(1.75rem,3.25vw,2.5rem)' }}>
              Browse by What You Want to Know
            </h2>
            <p className="text-ivory/55 font-body mt-3 max-w-2xl" style={{ fontSize: '0.9375rem' }}>
              {allArticles.length} articles. Organised by how travelers actually think — not by category labels.
            </p>
          </AnimateIn>

          <div className="space-y-12">
            {READING_GROUPS.map(group => {
              const groupArticles = group.slugs
                .map(slug => allArticles.find(a => a.slug === slug))
                .filter(Boolean) as typeof MOMENTS_ARTICLES
              if (groupArticles.length === 0) return null
              return (
                <AnimateIn key={group.heading}>
                  <div className="border-t border-white/10 pt-8">
                    <div className="grid md:grid-cols-[240px_1fr] gap-6 mb-6">
                      <div>
                        <h3 className="font-display text-gold font-light" style={{ fontSize: '1.25rem' }}>
                          {group.heading}
                        </h3>
                        <p className="text-ivory/45 font-body mt-2 leading-relaxed" style={{ fontSize: '13px' }}>
                          {group.desc}
                        </p>
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {groupArticles.map(article => (
                        <Link key={article.slug} href={`/sawla-moments/${article.slug}`}
                          className="group flex items-start gap-4 p-4 rounded-[12px] border border-white/10 hover:border-gold/40 hover:bg-white/5 transition-colors duration-300">
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                            <PlaceholderImage filename={`moments-${article.slug}-hero.jpg`} width={64} height={64} category="moments" fill className="group-hover:scale-110 transition-transform duration-500" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-gold/60 font-body mb-1" style={{ fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                              {article.category}
                            </div>
                            <h4 className="font-display text-ivory font-light group-hover:text-gold transition-colors leading-snug" style={{ fontSize: 'clamp(0.9375rem,1.25vw,1.0625rem)' }}>
                              {article.title}
                            </h4>
                            <div className="text-ivory/35 font-body mt-1.5" style={{ fontSize: '11.5px' }}>
                              {article.readingTime} min read
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </AnimateIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── SAWLA FILMS STRIP ── */}
      <section className="section-padding-sm bg-ivory border-t border-sand/60">
        <div className="container-max">
          <AnimateIn className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="label-eyebrow">Sawla Films</span>
              <h2 className="heading-display text-volcanic mt-2 mb-4" style={{ fontSize: 'clamp(1.375rem,2.5vw,1.875rem)' }}>
                Some stories start as film first
              </h2>
              <p className="text-warmgrey font-body leading-relaxed mb-6" style={{ fontSize: 'clamp(0.9375rem,1.1vw,1rem)' }}>
                Sawla Films has been filming Ethiopia for over a decade — festivals, wildlife, communities, landscapes. Some of what appears in Sawla Moments began as a moment caught in the field: a guide&apos;s observation on a shoot, a sequence from a documentary that revealed something unexpected. The film work and the writing reinforce each other.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href={SITE.social.youtube} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                  Watch on YouTube
                </a>
                <Link href="/sawla-films" className="btn-outline">
                  About Sawla Films
                </Link>
              </div>
            </div>
            <div className="relative rounded-card overflow-hidden aspect-video bg-volcanic/10">
              <PlaceholderImage filename="moments-hub-sawla-films.jpg" width={800} height={450} category="moments" fill />
              <div className="absolute inset-0 flex items-center justify-center">
                <a href={SITE.social.youtube} target="_blank" rel="noopener noreferrer"
                  className="w-14 h-14 rounded-full bg-volcanic/80 flex items-center justify-center hover:bg-gold transition-colors duration-300"
                  aria-label="Watch Sawla Films on YouTube">
                  <svg width="18" height="18" viewBox="0 0 22 22" fill="white" aria-hidden="true" className="ml-1">
                    <path d="M8 4.5l11 6.5-11 6.5V4.5z"/>
                  </svg>
                </a>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── FROM READING TO PLANNING ── */}
      <section className="section-padding bg-volcanic" aria-labelledby="from-reading-heading">
        <div className="container-max">
          <AnimateIn className="text-center max-w-2xl mx-auto mb-10">
            <span className="label-eyebrow text-gold">From Reading to Planning</span>
            <h2 id="from-reading-heading" className="heading-display text-ivory mt-2 mb-4" style={{ fontSize: 'clamp(1.75rem,3.25vw,2.5rem)' }}>
              Something caught your attention?
            </h2>
            <p className="text-ivory/60 font-body leading-relaxed" style={{ fontSize: '0.9375rem' }}>
              If one of these articles pointed you toward a specific experience — the Ethiopian wolf, Timkat, Abuna Yemata Guh, the Danakil — our team can build a private itinerary around exactly that. Tell us what you want to see or understand and we will work from there.
            </p>
          </AnimateIn>
          <AnimateStagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl mx-auto mb-10" staggerDelay={0.06}>
            {[
              { label: 'Wildlife & endemic mammals', href: '/tours-by-experience/ethiopia-wildlife-tours' },
              { label: 'History, faith & heritage',  href: '/tours-by-experience/historic-cultural-ethiopia-tours' },
              { label: 'Omo Valley & communities',   href: '/tours-by-experience/omo-valley-cultural-tours' },
              { label: 'Danakil & expedition',       href: '/tours-by-experience/ethiopia-adventure-tours' },
            ].map(card => (
              <Link key={card.href} href={card.href}
                className="group border border-white/15 rounded-card p-5 text-center hover:border-gold/40 hover:bg-white/5 transition-colors duration-300">
                <div className="font-body text-ivory/75 group-hover:text-ivory transition-colors leading-snug" style={{ fontSize: '13.5px' }}>{card.label}</div>
                <div className="text-gold font-body mt-2" style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Explore →</div>
              </Link>
            ))}
          </AnimateStagger>
          <div className="text-center">
            <Link href="/enquire" className="btn-gold">Start a conversation with the team</Link>
          </div>
        </div>
      </section>
    </>
  )
}
