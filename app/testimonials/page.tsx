import type { Metadata } from 'next'
import Link from 'next/link'
import SchemaScript from '@/components/ui/SchemaScript'
import PlaceholderImage from '@/components/ui/PlaceholderImage'
import { AnimateIn, AnimateStagger } from '@/components/ui/AnimateIn'
import { breadcrumbSchema } from '@/lib/schema'
import { TESTIMONIALS, SITE } from '@/data/siteData'

export const metadata: Metadata = {
  title: 'Traveller Stories | Sawla Tours Reviews',
  description: 'Read what travellers say about their private Ethiopia journeys with Sawla Tours. Honest accounts from explorers, photographers, families, and wildlife specialists.',
  alternates: { canonical: 'https://www.sawlatours.com/testimonials' },
  openGraph: {
    title: 'Traveller Stories | Sawla Tours',
    description: 'Honest accounts from travellers who explored Ethiopia with Sawla Tours — private journeys tailored around people, not packages.',
    images: [{ url: '/images/og-home.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', title: 'Traveller Stories | Sawla Tours' },
}

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    breadcrumbSchema([
      { name: 'Home', url: 'https://www.sawlatours.com' },
      { name: 'Traveller Stories', url: 'https://www.sawlatours.com/testimonials' },
    ]),
    {
      '@type': 'FAQPage',
      '@id': 'https://www.sawlatours.com/testimonials#reviews',
      mainEntity: TESTIMONIALS
        .filter(t => t.useOn.includes('testimonials'))
        .slice(0, 6)
        .map(t => ({
          '@type': 'Question',
          name: `What did ${t.name} think of their Sawla Tours Ethiopia journey?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: t.fullQuote,
          },
        })),
    },
  ],
}

// Only show testimonials with verified client data (useOn includes 'testimonials')
const verified = TESTIMONIALS.filter(t => t.useOn.includes('testimonials'))

const stats = [
  { value: '15+', label: 'Years operating in Ethiopia' },
  { value: '100%', label: 'Private, tailor-made journeys' },
  { value: '24h', label: 'Response commitment' },
  { value: '2009', label: 'Founded in Addis Ababa' },
]

export default function TestimonialsPage() {
  return (
    <>
      <SchemaScript schema={schema} />

      {/* HERO */}
      <section className="relative overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32">
        <div className="absolute inset-0" aria-hidden="true">
          <PlaceholderImage filename="testimonials-hero.jpg" width={1920} height={900} category="about" fill className="object-center" />
          <div className="absolute inset-0 bg-volcanic/82" />
        </div>
        <div className="relative z-10 container-max text-ivory">
          <AnimateIn>
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-2 text-[11px] tracking-[0.12em] uppercase font-body">
                <li><Link href="/" className="text-ivory/50 hover:text-gold transition-colors">Home</Link></li>
                <li className="text-ivory/30">/</li>
                <li className="text-ivory/70">Traveller Stories</li>
              </ol>
            </nav>
            <span className="label-eyebrow text-gold block mb-3">From the field</span>
            <h1 className="heading-display text-ivory max-w-3xl" style={{ fontSize: 'clamp(2.5rem,5.5vw,5rem)' }}>
              Journeys That Stay with You
            </h1>
            <p className="text-ivory/65 font-body mt-6 max-w-2xl leading-relaxed" style={{ fontSize: 'clamp(1rem,1.2vw,1.125rem)' }}>
              Ethiopia has a way of changing people quietly. These are honest accounts from travellers who explored Ethiopia with our team — shared with their permission.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* STATS BAR */}
      <div className="bg-volcanic border-b border-white/10">
        <div className="container-max py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map(s => (
              <div key={s.label}>
                <div className="font-display text-gold font-light" style={{ fontSize: 'clamp(1.75rem,3vw,2.5rem)' }}>{s.value}</div>
                <div className="text-ivory/50 font-body mt-1" style={{ fontSize: '11.5px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TESTIMONIALS GRID */}
      <section className="section-padding bg-ivory" aria-labelledby="testimonials-heading">
        <div className="container-max">
          <AnimateIn className="text-center mb-14">
            <span className="label-eyebrow">Real Client Experiences</span>
            <h2 id="testimonials-heading" className="heading-display text-volcanic mt-2" style={{ fontSize: 'clamp(1.75rem,3.5vw,2.75rem)' }}>
              What Travellers Say
            </h2>
            <p className="text-warmgrey font-body mt-4 max-w-xl mx-auto leading-relaxed" style={{ fontSize: 'clamp(1rem,1.2vw,1.0625rem)' }}>
              These accounts are from real Sawla Tours clients, shared with their explicit consent. We have not selected only the effusive — we value the honest.
            </p>
          </AnimateIn>

          <AnimateStagger className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" staggerDelay={0.05}>
            {verified.map(t => (
              <article key={t.id} className="testimonial-card flex flex-col">
                {/* Stars */}
                <div className="flex gap-1 mb-5" aria-label="5 star rating">
                  {[1, 2, 3, 4, 5].map(i => (
                    <svg key={i} width="13" height="13" viewBox="0 0 14 14" fill="#c9941a" aria-hidden="true">
                      <path d="M7 1l1.68 3.4 3.75.55-2.71 2.64.64 3.73L7 9.77 3.64 11.32l.64-3.73L1.57 4.95l3.75-.55L7 1z"/>
                    </svg>
                  ))}
                </div>

                {/* Opening quote mark */}
                <div className="font-display text-gold/30 leading-none select-none mb-1" style={{ fontSize: '4rem' }} aria-hidden="true">&ldquo;</div>

                {/* Quote */}
                <blockquote className="text-volcanic/80 font-body leading-relaxed flex-1 -mt-3" style={{ fontSize: '0.9375rem' }}>
                  {t.fullQuote}
                </blockquote>

                {/* Attribution */}
                <footer className="flex items-center gap-3.5 mt-6 pt-5 border-t border-sand/60">
                  <div className="w-10 h-10 rounded-full bg-volcanic flex items-center justify-center flex-shrink-0">
                    <span className="font-display text-gold font-medium" style={{ fontSize: '12.5px' }}>{t.initials}</span>
                  </div>
                  <div>
                    <cite className="font-body font-semibold text-volcanic not-italic" style={{ fontSize: '13.5px' }}>
                      {t.name} {t.countryFlag}
                    </cite>
                    <div className="text-warmgrey font-body mt-0.5" style={{ fontSize: '12px' }}>{t.country}</div>
                    <div className="text-gold font-body mt-0.5" style={{ fontSize: '11.5px', letterSpacing: '0.04em' }}>{t.tripType}</div>
                  </div>
                </footer>
              </article>
            ))}
          </AnimateStagger>
        </div>
      </section>

      {/* EDITORIAL COMMITMENT */}
      <section className="bg-volcanic py-16 border-t border-white/10">
        <div className="container-max max-w-3xl mx-auto text-center">
          <AnimateIn>
            <span className="label-eyebrow text-gold">Our Commitment</span>
            <h2 className="heading-display text-ivory mt-2 mb-6" style={{ fontSize: 'clamp(1.5rem,3vw,2.25rem)' }}>
              Why We Share These Stories
            </h2>
            <p className="text-ivory/60 font-body leading-relaxed mb-5 max-w-2xl mx-auto" style={{ fontSize: 'clamp(1rem,1.2vw,1.0625rem)' }}>
              Every account on this page represents a journey built specifically for one traveller — their interests, pace, and idea of what Ethiopia should be. We share them because they capture something our own words cannot: the real texture of what it feels like to travel thoughtfully through this country.
            </p>
            <p className="text-ivory/45 font-body leading-relaxed max-w-xl mx-auto" style={{ fontSize: '0.9375rem' }}>
              All testimonials are from real Sawla Tours clients, shared with explicit written consent. Client names, countries, and trip descriptions are used exactly as provided.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* REVIEW PLATFORMS */}
      <section className="py-12 bg-ivory border-t border-sand/60">
        <div className="container-max">
          <AnimateIn className="text-center mb-8">
            <span className="label-eyebrow">Independent Reviews</span>
            <h2 className="font-display text-volcanic font-normal mt-1" style={{ fontSize: 'clamp(1.25rem,2vw,1.625rem)' }}>
              Find Us on Review Platforms
            </h2>
          </AnimateIn>
          <AnimateStagger className="flex flex-wrap justify-center gap-4" staggerDelay={0.08}>
            {[
              { label: 'TripAdvisor', href: SITE.social.tripadvisor, note: 'Independent traveller reviews' },
              { label: 'Google Reviews', href: SITE.social.google, note: 'Google Maps & Search' },
            ].map(p => (
              <a key={p.label} href={p.href} target="_blank" rel="noopener noreferrer"
                className="inline-flex flex-col items-center gap-1 border border-sand hover:border-gold rounded-card px-10 py-5 transition-colors duration-300 group">
                <span className="font-body font-semibold text-volcanic group-hover:text-gold transition-colors" style={{ fontSize: '14px' }}>{p.label}</span>
                <span className="text-warmgrey group-hover:text-warmgrey font-body" style={{ fontSize: '11.5px' }}>{p.note}</span>
              </a>
            ))}
          </AnimateStagger>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 text-center overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          <PlaceholderImage filename="testimonials-cta.jpg" width={1920} height={600} category="about" fill />
          <div className="absolute inset-0 bg-volcanic/75" />
        </div>
        <div className="relative z-10 container-max">
          <AnimateIn>
            <span className="label-eyebrow text-gold">Begin Your Journey</span>
            <h2 className="heading-display text-ivory mt-4 mb-6 max-w-2xl mx-auto" style={{ fontSize: 'clamp(1.875rem,4vw,3.25rem)' }}>
              Ready to Write Your Own Ethiopia Story?
            </h2>
            <p className="text-ivory/65 font-body max-w-xl mx-auto mb-10 leading-relaxed" style={{ fontSize: 'clamp(1rem,1.2vw,1.125rem)' }}>
              Tell us what draws you to Ethiopia. Our Addis Ababa team will shape a private journey around your interests, pace, and what you want to feel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/enquire" className="btn-gold py-4 px-10">Start Planning</Link>
              <Link href="/tours-by-experience" className="btn-ghost-light">Browse Itineraries</Link>
            </div>
            <p className="text-ivory/30 font-body" style={{ fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
              No booking fee to enquire · Response within 24 hours · Ethiopia-based team
            </p>
          </AnimateIn>
        </div>
      </section>
    </>
  )
}
