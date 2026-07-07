import type { Metadata } from 'next'
import Link from 'next/link'
import PlaceholderImage from '@/components/ui/PlaceholderImage'
import SchemaScript from '@/components/ui/SchemaScript'
import { AnimateIn, AnimateStagger } from '@/components/ui/AnimateIn'
import TripWizard from '@/components/home/TripWizard'
import { breadcrumbSchema } from '@/lib/schema'
import { TOUR_STYLES } from '@/data/siteData'

export const metadata: Metadata = {
  title: 'Trip Finder | Plan Your Ethiopia Journey | Sawla Tours',
  description: 'Answer five quick questions and our Ethiopia specialists will shape a private journey around your dates, interests, group size, and budget. No obligation.',
  alternates: { canonical: 'https://www.sawlatours.com/trip-finder' },
  openGraph: {
    title: 'Trip Finder | Sawla Tours',
    description: 'Five questions. A private Ethiopia journey shaped around exactly what you want. Start with the Sawla Tours Trip Finder.',
    images: [{ url: '/images/og-home.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', title: 'Trip Finder | Sawla Tours' },
}

const schema = breadcrumbSchema([
  { name: 'Home', url: 'https://www.sawlatours.com' },
  { name: 'Trip Finder', url: 'https://www.sawlatours.com/trip-finder' },
])

const reassurances = [
  {
    title: 'No obligation',
    body: 'The Trip Finder is a starting point, not a commitment. There is no booking fee to enquire and no pressure to proceed.',
  },
  {
    title: 'A real specialist responds',
    body: 'Your answers go to an Addis Ababa-based travel specialist who has visited the destinations you are interested in — not an automated system.',
  },
  {
    title: 'Tailor-made from the start',
    body: 'There are no fixed packages. Whatever the Trip Finder suggests, your actual journey is designed around your specific dates, pace, and preferences.',
  },
]

export default function TripFinderPage() {
  return (
    <>
      <SchemaScript schema={schema} />

      {/* HERO */}
      <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="absolute inset-0" aria-hidden="true">
          <PlaceholderImage filename="trip-finder-hero.jpg" width={1920} height={800} category="general" fill className="object-center" />
          <div className="absolute inset-0 bg-volcanic/82" />
        </div>
        <div className="relative z-10 container-max text-ivory text-center max-w-3xl mx-auto">
          <AnimateIn>
            <nav aria-label="Breadcrumb" className="mb-6 flex justify-center">
              <ol className="flex items-center gap-2 text-[11px] tracking-[0.12em] uppercase font-body">
                <li><Link href="/" className="text-ivory/50 hover:text-gold transition-colors">Home</Link></li>
                <li className="text-ivory/30">/</li>
                <li className="text-ivory/70">Trip Finder</li>
              </ol>
            </nav>
            <span className="label-eyebrow text-gold block mb-3">Five Questions. One Journey.</span>
            <h1 className="heading-display text-ivory" style={{ fontSize: 'clamp(2.5rem,5.5vw,4.5rem)' }}>
              Find Your Ethiopia Journey
            </h1>
            <p className="text-ivory/65 font-body mt-6 max-w-xl mx-auto leading-relaxed" style={{ fontSize: 'clamp(1rem,1.2vw,1.125rem)' }}>
              Tell us when you want to travel, how long you have, and what draws you to Ethiopia. Our specialists will shape a private journey around your answers — usually within 24 hours.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* WIZARD */}
      <section className="section-padding-sm bg-gold-faint">
        <div className="container-max">
          <div className="max-w-3xl mx-auto">
            <AnimateIn className="bg-ivory rounded-card p-8 md:p-12 border border-sand/60 shadow-sm">
              <TripWizard />
            </AnimateIn>
            <p className="text-center text-warmgrey font-body mt-6" style={{ fontSize: '13px' }}>
              Prefer to write it out yourself?{' '}
              <Link href="/enquire" className="text-gold hover:underline">Use the full enquiry form instead.</Link>
            </p>
          </div>
        </div>
      </section>

      {/* REASSURANCES */}
      <section className="section-padding bg-ivory">
        <div className="container-max">
          <AnimateIn className="text-center mb-12">
            <span className="label-eyebrow">How It Works</span>
            <h2 className="heading-display text-volcanic mt-2" style={{ fontSize: 'clamp(1.75rem,3.5vw,2.5rem)' }}>
              What Happens After You Answer
            </h2>
          </AnimateIn>
          <AnimateStagger className="grid md:grid-cols-3 gap-6" staggerDelay={0.1}>
            {reassurances.map((r, i) => (
              <div key={r.title} className="border-t-2 border-gold/20 pt-6">
                <div className="font-display text-gold/25 font-light mb-4 leading-none" style={{ fontSize: '3rem' }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="font-display text-volcanic font-normal mb-3 leading-snug" style={{ fontSize: 'clamp(1.125rem,1.75vw,1.375rem)' }}>
                  {r.title}
                </h3>
                <p className="text-warmgrey font-body leading-relaxed" style={{ fontSize: '0.9375rem' }}>
                  {r.body}
                </p>
              </div>
            ))}
          </AnimateStagger>
        </div>
      </section>

      {/* BROWSE BY STYLE — alternative entry point */}
      <section className="section-padding bg-volcanic text-ivory">
        <div className="container-max">
          <AnimateIn className="text-center mb-12">
            <span className="label-eyebrow text-gold">Or Browse by Experience</span>
            <h2 className="heading-display text-ivory mt-2" style={{ fontSize: 'clamp(1.75rem,3.5vw,2.5rem)' }}>
              Already Know What Draws You?
            </h2>
            <p className="text-ivory/60 font-body mt-4 max-w-xl mx-auto leading-relaxed" style={{ fontSize: 'clamp(1rem,1.2vw,1.0625rem)' }}>
              Explore our six tour styles directly. Each offers six private itineraries you can adapt to your dates.
            </p>
          </AnimateIn>
          <AnimateStagger className="grid grid-cols-2 lg:grid-cols-3 gap-4" staggerDelay={0.07}>
            {TOUR_STYLES.map(style => (
              <Link key={style.slug} href={'/tours-by-experience/' + style.slug}
                className="group relative overflow-hidden rounded-card aspect-[4/3] block">
                <PlaceholderImage filename={'tour-hub-' + style.slug + '.jpg'} width={500} height={375} category="tour" fill className="group-hover:scale-105 transition-transform duration-700" />
                <div className="image-overlay-center group-hover:opacity-90 transition-opacity duration-300" />
                <div className="absolute inset-0 flex flex-col justify-end p-5">
                  <h3 className="font-display text-ivory font-light leading-tight" style={{ fontSize: 'clamp(1.125rem,2vw,1.375rem)' }}>
                    {style.name}
                  </h3>
                  <p className="text-ivory/65 font-body mt-1 leading-snug" style={{ fontSize: '12.5px' }}>{style.tagline}</p>
                </div>
              </Link>
            ))}
          </AnimateStagger>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gold-faint border-t border-sand/60">
        <div className="container-max max-w-3xl mx-auto text-center">
          <AnimateIn>
            <h2 className="font-display text-volcanic font-light mb-4" style={{ fontSize: 'clamp(1.5rem,3vw,2.25rem)' }}>
              Prefer to Talk It Through?
            </h2>
            <p className="text-warmgrey font-body mb-8 max-w-lg mx-auto leading-relaxed">
              Some journeys are easier to shape in conversation. Send us a message and an Ethiopia specialist will respond within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/enquire" className="btn-primary">Start a Conversation</Link>
              <Link href="/tours-by-experience" className="btn-ghost">Browse All Itineraries</Link>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  )
}
