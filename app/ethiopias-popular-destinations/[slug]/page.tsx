import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import PlaceholderImage from '@/components/ui/PlaceholderImage'
import SchemaScript from '@/components/ui/SchemaScript'
import { AnimateIn, AnimateStagger } from '@/components/ui/AnimateIn'
import { breadcrumbSchema, destinationSchema, faqSchema } from '@/lib/schema'
import {
  getPremiumDestination,
  PREMIUM_DESTINATIONS,
  type DestinationProfile,
} from '@/data/destinationsPremium'
import { SITE, TOUR_STYLES } from '@/data/siteData'
import { getItinerariesForDestination } from '@/data/itineraryData'

// Fallback style hub for the handful of remote, extension-only destinations with no
// dedicated itinerary yet (Kafa, Chebera Churchura, Gambella, Kafta Sheraro).
const DESTINATION_STYLE_FALLBACK: Record<string, string> = {
  'kafa-biosphere-coffee-forest': 'ethiopia-special-interest-tours',
  'chebera-churchura-national-park': 'ethiopia-wildlife-tours',
  'gambella-national-park': 'ethiopia-wildlife-tours',
  'kafta-shiraro-national-park': 'ethiopia-adventure-tours',
}

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return PREMIUM_DESTINATIONS.map((destination) => ({ slug: destination.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const destination = getPremiumDestination(slug)
  if (!destination) return {}

  const canonical = `https://www.sawlatours.com/ethiopias-popular-destinations/${destination.slug}`
  // No per-destination photo exists yet — fall back to the real site OG image rather than
  // a path that 404s (matches the pattern already used correctly across most other pages).
  const image = `https://www.sawlatours.com/images/og-home.jpg`

  return {
    title: { absolute: destination.seo.title },
    description: destination.seo.description,
    keywords: [
      destination.seo.primaryKeyword,
      ...destination.seo.secondaryKeywords,
      destination.name,
      'private Ethiopia tours',
      'Sawla Tours',
    ],
    alternates: { canonical },
    openGraph: {
      title: destination.seo.title,
      description: destination.seo.description,
      url: canonical,
      type: 'website',
      images: [{ url: image, alt: destination.image.heroAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: destination.seo.title,
      description: destination.seo.description,
      images: [image],
    },
  }
}

const DIFFICULTY_STYLES: Record<string, string> = {
  Easy: 'text-green-800 bg-green-50 border-green-200',
  Moderate: 'text-amber-800 bg-amber-50 border-amber-200',
  Challenging: 'text-orange-800 bg-orange-50 border-orange-200',
  Extreme: 'text-red-800 bg-red-50 border-red-200',
}

const STATUS_STYLES = {
  standard: {
    label: 'Standard planning checks apply',
    box: 'bg-green-50 border-green-200',
    labelClass: 'text-green-800',
  },
  check: {
    label: 'Live access check required',
    box: 'bg-amber-50 border-amber-200',
    labelClass: 'text-amber-900',
  },
  specialist: {
    label: 'Specialist / conditional operation',
    box: 'bg-red-50 border-red-200',
    labelClass: 'text-red-900',
  },
}

function relatedDestinations(destination: DestinationProfile) {
  return PREMIUM_DESTINATIONS.filter((candidate) => candidate.slug !== destination.slug)
    .map((candidate) => ({
      candidate,
      score:
        (candidate.zone === destination.zone ? 3 : 0) +
        candidate.category.filter((category) => destination.category.includes(category)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((item) => item.candidate)
}

function SectionHeading({ eyebrow, title, id }: { eyebrow: string; title: string; id?: string }) {
  return (
    <div className="mb-8">
      <span className="label-eyebrow">{eyebrow}</span>
      <h2
        id={id}
        className="heading-display text-volcanic mt-1"
        style={{ fontSize: 'clamp(1.55rem,3vw,2.35rem)' }}
      >
        {title}
      </h2>
    </div>
  )
}

export default async function DestinationPage({ params }: Props) {
  const { slug } = await params
  const destination = getPremiumDestination(slug)
  if (!destination) notFound()

  const related = relatedDestinations(destination)
  const relevantItineraries = getItinerariesForDestination(destination.slug, destination.shortName)
  const fallbackStyle = DESTINATION_STYLE_FALLBACK[destination.slug]
  const statusStyle = STATUS_STYLES[destination.statusLevel]
  const canonical = `https://www.sawlatours.com/ethiopias-popular-destinations/${destination.slug}`

  const schemas = [
    destinationSchema({
      name: destination.name,
      url: canonical,
      description: destination.dek,
      region: destination.region,
    }),
    breadcrumbSchema([
      { name: 'Home', url: 'https://www.sawlatours.com' },
      {
        name: 'Ethiopia Destinations',
        url: 'https://www.sawlatours.com/ethiopias-popular-destinations',
      },
      { name: destination.name, url: canonical },
    ]),
    faqSchema(destination.faqs),
  ]

  return (
    <>
      {schemas.map((schema, index) => (
        <SchemaScript key={index} schema={schema} />
      ))}

      <section className="relative min-h-[640px] h-[78vh] overflow-hidden" aria-labelledby="destination-heading">
        <PlaceholderImage
          filename={`dest-${destination.slug}-hero.jpg`}
          width={1920}
          height={1080}
          category="destination"
          fill
          label={destination.image.heroAlt}
          className="object-center"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(35,32,29,0.94) 0%, rgba(35,32,29,0.38) 55%, rgba(35,32,29,0.36) 100%)',
          }}
        />
        <div className="absolute inset-0 flex flex-col justify-end pb-14 md:pb-20">
          <div className="container-max text-ivory">
            <AnimateIn>
              <nav aria-label="Breadcrumb" className="mb-5">
                <ol
                  className="flex flex-wrap items-center gap-2 font-body"
                  style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase' }}
                >
                  <li>
                    <Link href="/" className="text-ivory/50 hover:text-gold transition-colors">
                      Home
                    </Link>
                  </li>
                  <li className="text-ivory/30">/</li>
                  <li>
                    <Link
                      href="/ethiopias-popular-destinations"
                      className="text-ivory/50 hover:text-gold transition-colors"
                    >
                      Destinations
                    </Link>
                  </li>
                  <li className="text-ivory/30">/</li>
                  <li className="text-ivory/80">{destination.shortName}</li>
                </ol>
              </nav>
              <span className="label-eyebrow text-gold">{destination.region}</span>
              <h1
                id="destination-heading"
                className="heading-display text-ivory mt-2 max-w-5xl"
                style={{ fontSize: 'clamp(2.6rem,6vw,5.6rem)' }}
              >
                {destination.name}
              </h1>
              <p
                className="text-ivory/78 font-body mt-4 max-w-3xl leading-relaxed"
                style={{ fontSize: 'clamp(1rem,1.3vw,1.2rem)' }}
              >
                {destination.tagline}
              </p>
              <div className="flex flex-wrap gap-3 mt-7">
                <span
                  className={`border rounded-full px-4 py-1.5 font-body font-medium text-xs ${DIFFICULTY_STYLES[destination.difficulty] ?? ''}`}
                >
                  {destination.difficulty}
                </span>
                <span className="border border-white/30 text-ivory/85 rounded-full px-4 py-1.5 font-body text-xs">
                  {destination.idealStay}
                </span>
                <span className="border border-white/30 text-ivory/85 rounded-full px-4 py-1.5 font-body text-xs">
                  {destination.bestTime}
                </span>
                <span className="border border-white/30 text-ivory/85 rounded-full px-4 py-1.5 font-body text-xs">
                  {destination.altitude}
                </span>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      <section className="bg-ivory border-b border-sand/60">
        <div className="container-max py-6 overflow-x-auto">
          <nav aria-label="On this page" className="flex gap-6 min-w-max font-body text-xs">
            {[
              ['overview', 'Overview'],
              ['attractions', 'Attractions'],
              ['things-to-do', 'Things to Do'],
              ['how-long', 'How Long'],
              ['getting-there', 'Getting There'],
              ['best-time', 'Best Time'],
              ['difficulty', 'Difficulty'],
              ['responsible-travel', 'Travel Responsibly'],
              ['faqs', 'FAQs'],
            ].map(([anchor, label]) => (
              <a key={anchor} href={`#${anchor}`} className="text-warmgrey hover:text-gold-ink transition-colors">
                {label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section className="section-padding bg-ivory" id="overview">
        <div className="container-max grid lg:grid-cols-[minmax(0,1fr)_340px] gap-12 lg:gap-16 items-start">
          <main className="min-w-0">
            <AnimateIn>
              <span className="label-eyebrow">Destination Overview</span>
              <p
                className="font-display text-volcanic font-light leading-relaxed mt-3"
                style={{ fontSize: 'clamp(1.35rem,2.7vw,2.1rem)' }}
              >
                {destination.dek}
              </p>
              <div className="mt-8 space-y-5">
                {destination.overview.map((paragraph) => (
                  <p key={paragraph.slice(0, 60)} className="font-body text-warmgrey leading-relaxed text-[15px] md:text-base">
                    {paragraph}
                  </p>
                ))}
              </div>
            </AnimateIn>

            <AnimateIn delay={0.08} className={`mt-10 border rounded-card p-6 ${statusStyle.box}`}>
              <div className={`label-eyebrow ${statusStyle.labelClass}`}>{statusStyle.label}</div>
              <p className="font-body text-volcanic/80 leading-relaxed mt-2 text-sm">{destination.status}</p>
            </AnimateIn>
          </main>

          <aside className="lg:sticky lg:top-28 space-y-5">
            <div className="border border-sand rounded-card p-6 bg-white">
              <div className="label-eyebrow mb-5">At a Glance</div>
              <dl className="space-y-4">
                {destination.facts.map((fact) => (
                  <div key={fact.label} className="border-b border-sand/70 pb-3 last:border-0 last:pb-0">
                    <dt className="font-body text-warmgrey text-[11px] uppercase tracking-[0.12em]">{fact.label}</dt>
                    <dd className="font-body font-medium text-volcanic text-sm mt-1">{fact.value}</dd>
                    {fact.note && <dd className="font-body text-warmgrey text-xs mt-1 leading-relaxed">{fact.note}</dd>}
                  </div>
                ))}
              </dl>
            </div>

            <div className="bg-volcanic text-ivory rounded-card p-6">
              <div className="label-eyebrow text-gold">Plan With a Local Specialist</div>
              <p className="font-body text-ivory/70 text-sm leading-relaxed mt-3">
                Tell us your dates, fitness, comfort level and interests. We will confirm current access and build this destination into a realistic private route.
              </p>
              <div className="space-y-3 mt-5">
                <Link href="/enquire" className="btn-primary w-full text-center block">
                  Design My Journey
                </Link>
                <a
                  href={SITE.whatsapp}
                  className="block text-center border border-white/20 rounded-full py-3 font-body text-sm text-ivory hover:border-gold hover:text-gold transition-colors"
                >
                  Ask on WhatsApp
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="section-padding-sm bg-gold-faint border-y border-sand/60" id="attractions">
        <div className="container-max">
          <AnimateIn>
            <SectionHeading eyebrow="What to See" title={`Major Attractions in ${destination.shortName}`} />
          </AnimateIn>
          <AnimateStagger className="grid md:grid-cols-2 gap-5" staggerDelay={0.06}>
            {destination.attractions.map((attraction, index) => (
              <article key={attraction.title} className="bg-white border border-sand rounded-card p-6 md:p-7">
                <div className="text-gold-ink font-body text-xs tracking-[0.14em] mb-3">{String(index + 1).padStart(2, '0')}</div>
                <h3 className="font-display text-volcanic text-xl md:text-2xl font-light">{attraction.title}</h3>
                <p className="font-body text-warmgrey text-sm leading-relaxed mt-3">{attraction.body}</p>
              </article>
            ))}
          </AnimateStagger>
        </div>
      </section>

      <section className="section-padding bg-ivory" id="things-to-do">
        <div className="container-max">
          <AnimateIn>
            <SectionHeading eyebrow="Experiences" title={`Best Things to Do in ${destination.shortName}`} />
          </AnimateIn>
          <AnimateStagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.06}>
            {destination.experiences.map((experience) => (
              <article key={experience.title} className="border border-sand rounded-card p-6 bg-white h-full">
                <div className="w-8 h-px bg-gold mb-5" aria-hidden="true" />
                <h3 className="font-display text-volcanic text-xl font-light">{experience.title}</h3>
                <p className="font-body text-warmgrey text-sm leading-relaxed mt-3">{experience.body}</p>
              </article>
            ))}
          </AnimateStagger>
        </div>
      </section>

      <section className="bg-volcanic py-16" aria-label={`${destination.shortName} image gallery`}>
        <div className="container-max">
          <AnimateIn className="mb-8">
            <span className="label-eyebrow text-gold">From the Field</span>
            <h2 className="heading-display text-ivory mt-1 text-3xl">A Visual Brief for the Final Photography Library</h2>
          </AnimateIn>
          <AnimateStagger className="grid grid-cols-2 md:grid-cols-4 gap-3" staggerDelay={0.05}>
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className={`relative overflow-hidden rounded-[12px] ${item === 1 ? 'col-span-2 row-span-2 aspect-square' : 'aspect-[4/3]'}`}
              >
                <PlaceholderImage
                  filename={`dest-${destination.slug}-gallery-${item}.jpg`}
                  width={item === 1 ? 900 : 500}
                  height={item === 1 ? 900 : 375}
                  category="destination"
                  fill
                  label={`${destination.shortName} editorial gallery image ${item}`}
                  className="hover:scale-105 transition-transform duration-700"
                />
              </div>
            ))}
          </AnimateStagger>
        </div>
      </section>

      <section className="section-padding bg-ivory" id="how-long">
        <div className="container-max grid lg:grid-cols-[0.45fr_0.55fr] gap-12 lg:gap-16">
          <AnimateIn>
            <SectionHeading eyebrow="Time Well Spent" title={`How Many Days in ${destination.shortName}?`} />
            <div className="space-y-5">
              {[
                ['Minimum', destination.stay.minimum],
                ['Ideal', destination.stay.ideal],
                ['Extended', destination.stay.extended],
              ].map(([label, value]) => (
                <div key={label} className="border-l-2 border-gold pl-5">
                  <h3 className="font-body font-medium text-volcanic text-sm">{label}</h3>
                  <p className="font-body text-warmgrey text-sm leading-relaxed mt-1">{value}</p>
                </div>
              ))}
            </div>
          </AnimateIn>
          <AnimateIn delay={0.08}>
            <div className="border border-sand rounded-card p-6 md:p-8 bg-gold-faint">
              <div className="label-eyebrow mb-5">Suggested Pacing</div>
              <ol className="space-y-4">
                {destination.stay.pacing.map((item, index) => (
                  <li key={item} className="flex gap-4">
                    <span className="w-7 h-7 flex-shrink-0 rounded-full bg-gold text-white font-body text-xs flex items-center justify-center">
                      {index + 1}
                    </span>
                    <span className="font-body text-volcanic/80 text-sm leading-relaxed pt-1">{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="section-padding-sm bg-gold-faint border-y border-sand/60" id="getting-there">
        <div className="container-max">
          <AnimateIn>
            <SectionHeading eyebrow="Access & Logistics" title={`How to Get to ${destination.shortName}`} />
            <p className="font-body text-warmgrey leading-relaxed max-w-4xl">{destination.access.overview}</p>
          </AnimateIn>
          <AnimateStagger className="grid md:grid-cols-3 gap-5 mt-8" staggerDelay={0.07}>
            {[
              ['By Air', destination.access.air],
              ['By Road', destination.access.road],
              ['On the Ground', destination.access.local],
            ].map(([title, body]) => (
              <article key={title} className="bg-white border border-sand rounded-card p-6">
                <h3 className="font-display text-volcanic text-xl">{title}</h3>
                <p className="font-body text-warmgrey text-sm leading-relaxed mt-3">{body}</p>
              </article>
            ))}
          </AnimateStagger>
          <div className="grid sm:grid-cols-3 gap-3 mt-6">
            {[
              ['Gateway', destination.gateway],
              ['From Addis Ababa', destination.fromAddis],
              ['Typical Stay', destination.idealStay],
            ].map(([label, value]) => (
              <div key={label} className="border border-sand rounded-card bg-ivory p-4">
                <div className="font-body text-[10px] uppercase tracking-[0.14em] text-warmgrey">{label}</div>
                <div className="font-body font-medium text-volcanic text-sm mt-1">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-ivory" id="best-time">
        <div className="container-max">
          <AnimateIn>
            <SectionHeading eyebrow="Seasonality" title={`Best Time to Visit ${destination.shortName}`} />
          </AnimateIn>
          <div className="overflow-x-auto border border-sand rounded-card bg-white">
            <table className="w-full min-w-[760px] text-left">
              <thead className="bg-volcanic text-ivory">
                <tr>
                  {['Period', 'Typical Conditions', 'Best For', 'Planning Note'].map((heading) => (
                    <th key={heading} className="font-body font-medium text-xs uppercase tracking-[0.1em] px-5 py-4">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {destination.seasons.map((season) => (
                  <tr key={season.period} className="border-t border-sand/70 align-top">
                    <td className="font-body font-medium text-volcanic text-sm px-5 py-5">{season.period}</td>
                    <td className="font-body text-warmgrey text-sm leading-relaxed px-5 py-5">{season.conditions}</td>
                    <td className="font-body text-warmgrey text-sm leading-relaxed px-5 py-5">{season.bestFor}</td>
                    <td className="font-body text-warmgrey text-sm leading-relaxed px-5 py-5">{season.note ?? 'Conditions vary year to year.'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section-padding-sm bg-volcanic text-ivory" id="difficulty">
        <div className="container-max">
          <AnimateIn>
            <span className="label-eyebrow text-gold">Fitness & Comfort</span>
            <h2 className="heading-display mt-1 text-ivory" style={{ fontSize: 'clamp(1.55rem,3vw,2.35rem)' }}>
              Destination Difficulty: {destination.difficulty}
            </h2>
            <p className="font-body text-ivory/70 leading-relaxed max-w-4xl mt-4">{destination.challenge.summary}</p>
          </AnimateIn>
          <AnimateStagger className="grid md:grid-cols-3 gap-5 mt-8" staggerDelay={0.07}>
            {[
              ['Terrain', destination.challenge.terrain],
              ['Climate & Altitude', destination.challenge.climate],
              ['Accessibility', destination.challenge.accessibility],
            ].map(([title, body]) => (
              <div key={title} className="border border-white/12 rounded-card p-6 bg-white/5">
                <h3 className="font-display text-gold text-xl">{title}</h3>
                <p className="font-body text-ivory/65 text-sm leading-relaxed mt-3">{body}</p>
              </div>
            ))}
          </AnimateStagger>
        </div>
      </section>

      <section className="section-padding bg-ivory" id="responsible-travel">
        <div className="container-max grid lg:grid-cols-2 gap-12 lg:gap-16">
          <AnimateIn>
            <SectionHeading eyebrow="Before You Go" title="Practical Travel Notes" />
            <ul className="space-y-3">
              {destination.practical.map((item) => (
                <li key={item} className="flex gap-3 font-body text-warmgrey text-sm leading-relaxed">
                  <span className="text-gold-ink mt-1" aria-hidden="true">●</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </AnimateIn>
          <AnimateIn delay={0.08}>
            <div className="bg-gold-faint border border-sand rounded-card p-7 md:p-8">
              <SectionHeading eyebrow="Travel With Respect" title={`Responsible Travel in ${destination.shortName}`} />
              <ul className="space-y-3">
                {destination.responsible.map((item) => (
                  <li key={item} className="flex gap-3 font-body text-volcanic/75 text-sm leading-relaxed">
                    <span className="text-gold-ink mt-1" aria-hidden="true">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="section-padding-sm bg-gold-faint border-y border-sand/60">
        <div className="container-max">
          <AnimateIn>
            <SectionHeading eyebrow="Route Design" title={`Best Places to Combine With ${destination.shortName}`} />
          </AnimateIn>
          <AnimateStagger className="grid md:grid-cols-3 gap-5" staggerDelay={0.07}>
            {destination.combinations.map((combination) => (
              <article key={combination.title} className="bg-white border border-sand rounded-card p-6">
                <h3 className="font-display text-volcanic text-xl">{combination.title}</h3>
                <p className="font-body text-warmgrey text-sm leading-relaxed mt-3">{combination.body}</p>
              </article>
            ))}
          </AnimateStagger>
        </div>
      </section>

      <section className="section-padding bg-ivory" id="faqs">
        <div className="container-max max-w-4xl">
          <AnimateIn className="text-center mb-10">
            <span className="label-eyebrow">Planning Questions</span>
            <h2 className="heading-display text-volcanic mt-1" style={{ fontSize: 'clamp(1.55rem,3vw,2.35rem)' }}>
              {destination.shortName} FAQs
            </h2>
          </AnimateIn>
          <div className="space-y-3">
            {destination.faqs.map((faq) => (
              <details key={faq.q} className="border border-sand rounded-card bg-white group">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none font-body font-medium text-volcanic hover:text-gold-ink transition-colors text-sm">
                  <span>{faq.q}</span>
                  <span className="ml-4 text-gold-ink text-xl leading-none group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="px-5 pb-5 text-warmgrey font-body leading-relaxed text-sm">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-ivory" aria-labelledby="journeys-heading">
        <div className="container-max">
          <AnimateIn className="flex flex-col sm:flex-row sm:items-end justify-between mb-9 gap-4">
            <div>
              <span className="label-eyebrow">Plan a Visit</span>
              <h2 id="journeys-heading" className="heading-display text-volcanic mt-1 text-3xl">
                Journeys That Include {destination.shortName}
              </h2>
            </div>
            <Link href="/tours-by-experience" className="btn-ghost flex-shrink-0">All Journeys</Link>
          </AnimateIn>
          {relevantItineraries.length > 0 ? (
            <AnimateStagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.08}>
              {relevantItineraries.map((itin) => (
                <Link key={itin.slug} href={`/tours-by-experience/${itin.styleSlug}/${itin.slug}`}
                  className="group block bg-white border border-sand rounded-card overflow-hidden card-hover h-full">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <PlaceholderImage filename={`tour-${itin.slug}-hero.jpg`} width={600} height={375} category="tour" fill
                      className="group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute left-4 bottom-4 flex flex-wrap gap-2">
                      <span className="rounded-full bg-ivory/95 px-3 py-1 font-body font-medium text-volcanic" style={{ fontSize: '11px' }}>{itin.durationLabel}</span>
                      <span className="rounded-full bg-volcanic/85 px-3 py-1 font-body text-ivory" style={{ fontSize: '11px' }}>{itin.difficulty}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-volcanic font-normal leading-snug group-hover:text-gold-ink transition-colors mb-2" style={{ fontSize: 'clamp(1.0625rem,1.6vw,1.25rem)' }}>{itin.name}</h3>
                    <span className="inline-flex items-center gap-1.5 text-gold-ink font-body font-medium" style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      View Journey →
                    </span>
                  </div>
                </Link>
              ))}
            </AnimateStagger>
          ) : (
            <AnimateIn className="p-6 bg-gold-faint/40 border border-gold/25 rounded-card max-w-2xl">
              <p className="text-warmgrey font-body leading-relaxed" style={{ fontSize: '0.9375rem' }}>
                {destination.shortName} doesn&apos;t yet have a dedicated sample itinerary — it&apos;s usually added as an extension to a longer journey. Browse{' '}
                {fallbackStyle && (
                  <Link href={`/tours-by-experience/${fallbackStyle}`} className="text-gold-ink hover:underline font-medium">
                    {TOUR_STYLES.find(s => s.slug === fallbackStyle)?.name ?? 'related journeys'}
                  </Link>
                )}
                {' '}or <Link href="/enquire" className="text-gold-ink hover:underline font-medium">ask us to include it</Link> in a tailor-made route.
              </p>
            </AnimateIn>
          )}
        </div>
      </section>

      <section className="section-padding-sm bg-volcanic" aria-labelledby="related-heading">
        <div className="container-max">
          <AnimateIn className="mb-9">
            <span className="label-eyebrow text-gold">Continue Exploring</span>
            <h2 id="related-heading" className="heading-display text-ivory mt-1 text-3xl">
              Related Ethiopia Destinations
            </h2>
          </AnimateIn>
          <AnimateStagger className="grid md:grid-cols-3 gap-5" staggerDelay={0.07}>
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/ethiopias-popular-destinations/${item.slug}`}
                className="group block border border-white/10 rounded-card overflow-hidden hover:border-gold/50 transition-colors"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <PlaceholderImage
                    filename={`dest-${item.slug}-related.jpg`}
                    width={640}
                    height={400}
                    category="destination"
                    fill
                    label={item.image.cardAlt}
                    className="group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="image-overlay-light" />
                </div>
                <div className="p-5">
                  <div className="label-eyebrow text-gold text-[10px]">{item.region}</div>
                  <h3 className="font-display text-ivory group-hover:text-gold transition-colors text-xl mt-1">
                    {item.shortName}
                  </h3>
                  <p className="font-body text-ivory/55 text-xs mt-2 leading-relaxed">{item.tagline}</p>
                </div>
              </Link>
            ))}
          </AnimateStagger>
        </div>
      </section>

      <section className="relative py-20 md:py-24 overflow-hidden">
        <PlaceholderImage
          filename={`dest-${destination.slug}-cta.jpg`}
          width={1920}
          height={720}
          category="destination"
          fill
          label={`Private ${destination.shortName} journey planning`}
        />
        <div className="absolute inset-0 bg-volcanic/84" />
        <div className="relative z-10 container-max text-center max-w-3xl mx-auto">
          <AnimateIn>
            <span className="label-eyebrow text-gold">Designed Around You</span>
            <h2 className="heading-display text-ivory mt-2" style={{ fontSize: 'clamp(2rem,4.5vw,3.5rem)' }}>
              Include {destination.shortName} in a Private Ethiopia Journey
            </h2>
            <p className="text-ivory/70 font-body leading-relaxed mt-5">
              We will match the destination to your dates, fitness, interests and comfort—then verify the flights, roads, permits, guides and current local conditions before the journey is confirmed.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              <Link href="/enquire" className="btn-primary">
                Start Planning
              </Link>
              <Link
                href="/ethiopias-popular-destinations"
                className="btn-secondary border-white/30 text-ivory hover:bg-white/10"
              >
                Explore All Destinations
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  )
}
