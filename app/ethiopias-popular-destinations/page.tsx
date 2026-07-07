import type { Metadata } from 'next'
import Link from 'next/link'
import PlaceholderImage from '@/components/ui/PlaceholderImage'
import HeroVideo from '@/components/ui/HeroVideo'
import SchemaScript from '@/components/ui/SchemaScript'
import { AnimateIn, AnimateStagger } from '@/components/ui/AnimateIn'
import { PREMIUM_DESTINATIONS } from '@/data/destinationsPremium'
import { breadcrumbSchema, faqSchema, itemListSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: { absolute: `Ethiopia Destinations: ${PREMIUM_DESTINATIONS.length} Places to Explore | Sawla Tours` },
  description:
    `Explore ${PREMIUM_DESTINATIONS.length} carefully chosen Ethiopia destinations with local experts: heritage cities, mountain parks, Omo Valley, coffee forest, Danakil and remote wildlife regions.`,
  alternates: {
    canonical: 'https://www.sawlatours.com/ethiopias-popular-destinations',
  },
  openGraph: {
    title: `Ethiopia Destinations: ${PREMIUM_DESTINATIONS.length} Places to Explore | Sawla Tours`,
    description:
      'A planning-first guide to Ethiopia’s most rewarding heritage, culture, wildlife, mountain and expedition destinations.',
    url: 'https://www.sawlatours.com/ethiopias-popular-destinations',
    type: 'website',
    images: [{ url: 'https://www.sawlatours.com/images/og-home.jpg', width: 1200, height: 630 }],
  },
}

const DIFFICULTY_STYLES: Record<string, string> = {
  Easy: 'text-green-800 bg-green-50 border-green-200',
  Moderate: 'text-amber-800 bg-amber-50 border-amber-200',
  Challenging: 'text-orange-800 bg-orange-50 border-orange-200',
  Extreme: 'text-red-800 bg-red-50 border-red-200',
}

const REGIONS = [
  {
    name: 'Northern Ethiopia',
    zones: ['North'],
    copy: 'Rock-hewn churches, Aksumite archaeology, royal cities, Lake Tana and immense mountain escarpments.',
  },
  {
    name: 'Eastern Ethiopia',
    zones: ['East'],
    copy: 'Harari urban heritage, Rift Valley wildlife, Afar culture and highly conditional desert expeditions.',
  },
  {
    name: 'Southern Ethiopia',
    zones: ['South'],
    copy: 'Bale’s endemic wildlife, Rift lakes, Konso terraces and the culturally diverse Lower Omo Valley.',
  },
  {
    name: 'Western & Southwestern Ethiopia',
    zones: ['West'],
    copy: 'Coffee forest, wetlands and remote parks where time, field logistics and current access matter.',
  },
  {
    name: 'Addis Ababa & Central Gateway',
    zones: ['Central'],
    copy: 'Museums, food, coffee, contemporary culture and the context that makes the wider journey more meaningful.',
  },
]

const INTERESTS = [
  {
    title: 'History & Living Heritage',
    destinations: ['Lalibela', 'Aksum', 'Gondar', 'Bahir Dar', 'Tigray & Gheralta', 'Harar', 'Konso'],
    copy: 'For archaeology, sacred art, active worship, royal history and UNESCO cultural landscapes.',
  },
  {
    title: 'Wildlife & Birding',
    destinations: ['Bale Mountains', 'Simien Mountains', 'Awash & Alledeghi', 'Chebera Churchura', 'Gambella', 'Kafta Sheraro'],
    copy: 'For Ethiopian wolves, geladas, dry-country birds, elephants and specialist lowland ecosystems.',
  },
  {
    title: 'Culture & Human Stories',
    destinations: ['Omo Valley', 'Konso', 'Harar', 'Kafa Coffee Forest', 'Addis Ababa'],
    copy: 'For locally interpreted journeys centered on consent, contemporary life and cultural context.',
  },
  {
    title: 'Trekking & Expedition',
    destinations: ['Simien Mountains', 'Bale Mountains', 'Tigray & Gheralta', 'Danakil Depression'],
    copy: 'For altitude, exposed terrain, mobile camps and journeys where preparation matters as much as ambition.',
  },
]

const HUB_FAQS = [
  {
    q: 'Are these the only places Sawla Tours visits in Ethiopia?',
    a: 'No. These 18 pages form a curated planning hub for some of Ethiopia’s most requested and strategically important destinations. Sawla also designs journeys to Rift Valley lakes, community trekking areas, birding sites, festivals, archaeological locations and less-visited regions according to interests and current access.',
  },
  {
    q: 'How many Ethiopia destinations fit into one trip?',
    a: 'Most first journeys combine three to five destination areas over 9–14 days. Trying to include more often creates repeated airport transfers or long road days and reduces the time available for meaningful visits.',
  },
  {
    q: 'What is the best time to visit Ethiopia?',
    a: 'October to February is the broadest dry-season window for many northern, eastern and southern routes, but Ethiopia has strong regional variation. Bale, Kafa, the Omo Valley, migration-focused parks and festival trips all require destination-specific timing.',
  },
  {
    q: 'Why do some pages say access must be checked?',
    a: 'Flights, road corridors, park operations, regional rules, weather and security conditions can change. Sawla uses date-specific field checks rather than treating an evergreen web page as an operational guarantee.',
  },
  {
    q: 'Can wildlife or cultural ceremonies be guaranteed?',
    a: 'No. Wild animals move, volcanoes change, and ceremonies belong to communities rather than tourism schedules. Sawla plans strong opportunities and informed alternatives without selling uncertain events as guaranteed.',
  },
  {
    q: 'Does Sawla arrange private custom routes?',
    a: 'Yes. Every destination can be combined into a private itinerary based on available days, travel pace, comfort, fitness, photography goals, domestic flight schedules and current operating conditions.',
  },
]

export default function DestinationsHubPage() {
  const featured = PREMIUM_DESTINATIONS.filter((destination) => destination.featured)

  const schemas = [
    itemListSchema({
      name: 'Ethiopia Travel Destinations',
      url: 'https://www.sawlatours.com/ethiopias-popular-destinations',
      items: PREMIUM_DESTINATIONS.map((destination) => ({
        name: destination.name,
        description: destination.dek,
        url: `https://www.sawlatours.com/ethiopias-popular-destinations/${destination.slug}`,
      })),
    }),
    breadcrumbSchema([
      { name: 'Home', url: 'https://www.sawlatours.com' },
      {
        name: 'Ethiopia Destinations',
        url: 'https://www.sawlatours.com/ethiopias-popular-destinations',
      },
    ]),
    faqSchema(HUB_FAQS),
  ]

  return (
    <>
      {schemas.map((schema, index) => (
        <SchemaScript key={index} schema={schema} />
      ))}

      <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden">
        <HeroVideo
          poster="destinations-hub-hero.jpg"
          posterCategory="destination"
          overlayClassName="bg-volcanic/74"
        />
        <div className="relative z-10 container-max text-center text-ivory">
          <AnimateIn>
            <nav aria-label="Breadcrumb" className="flex justify-center mb-6">
              <ol
                className="flex items-center gap-2 font-body"
                style={{ fontSize: '11.5px', letterSpacing: '0.1em', textTransform: 'uppercase' }}
              >
                <li>
                  <Link href="/" className="text-ivory/50 hover:text-gold transition-colors">
                    Home
                  </Link>
                </li>
                <li className="text-ivory/30">/</li>
                <li className="text-gold">Destinations</li>
              </ol>
            </nav>
            <span className="label-eyebrow text-gold">Explore Ethiopia With Field Context</span>
            <h1
              className="heading-display text-ivory mt-3 max-w-5xl mx-auto"
              style={{ fontSize: 'clamp(2.5rem,6vw,5rem)' }}
            >
              Ethiopia’s Most Remarkable Destinations,
              <em className="block text-gold" style={{ fontStyle: 'italic' }}>
                Planned With Local Intelligence.
              </em>
            </h1>
            <p
              className="text-ivory/75 font-body max-w-3xl mx-auto mt-6 leading-relaxed"
              style={{ fontSize: 'clamp(1rem,1.3vw,1.15rem)' }}
            >
              Discover 18 carefully curated destinations—from living sacred cities and Afroalpine
              wildlife to coffee forest, Rift Valley lakes and specialist expeditions. This is a
              starting point, not the limit of where we travel.
            </p>
            <div className="flex flex-wrap justify-center gap-x-7 gap-y-3 mt-8 text-ivory/65 font-body text-sm">
              <span>18 in-depth destination guides</span>
              <span aria-hidden="true">•</span>
              <span>Private tailor-made routes</span>
              <span aria-hidden="true">•</span>
              <span>Live access verification</span>
              <span aria-hidden="true">•</span>
              <span>Ethical cultural and wildlife standards</span>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="section-padding-sm bg-gold-faint border-b border-sand/60">
        <div className="container-max grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
          <AnimateIn>
            <span className="label-eyebrow">How to Use This Hub</span>
            <h2
              className="heading-display text-volcanic mt-2"
              style={{ fontSize: 'clamp(1.75rem,3.5vw,2.75rem)' }}
            >
              Choose by experience, then build a route that makes geographic sense.
            </h2>
            <p className="text-warmgrey font-body leading-relaxed mt-5 text-[15px] md:text-base">
              Ethiopia is large, mountainous and operationally varied. The best journey is not the
              one with the most pins on a map; it is the one with enough time for dawn worship,
              repeat wildlife sessions, local interpretation and weather or flight flexibility.
              Each guide below includes ideal stay, access, difficulty, seasonal detail,
              responsible-travel notes and realistic combinations.
            </p>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <div className="bg-white border border-sand rounded-card p-6 md:p-7">
              <div className="label-eyebrow mb-4">Planning Benchmarks</div>
              <dl className="space-y-4">
                {[
                  ['First Ethiopia journey', '9–14 days, usually 3–5 destination areas'],
                  ['Historic north focus', '8–13 days with selective domestic flights'],
                  ['Wildlife and birding', '10–16 days for multiple habitats'],
                  ['Lower Omo journey', '6–8 nights in the region, plus gateways'],
                  ['Remote expedition', 'Build in transit, contingency and recovery days'],
                ].map(([label, value]) => (
                  <div key={label} className="border-b border-sand/70 pb-3 last:border-0 last:pb-0">
                    <dt className="font-body font-medium text-volcanic text-sm">{label}</dt>
                    <dd className="font-body text-warmgrey text-sm mt-1">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="section-padding bg-ivory" aria-labelledby="featured-heading">
        <div className="container-max">
          <AnimateIn className="mb-12">
            <span className="label-eyebrow">Signature Places</span>
            <h2
              id="featured-heading"
              className="heading-display text-volcanic mt-1"
              style={{ fontSize: 'clamp(1.75rem,3.5vw,2.75rem)' }}
            >
              Six Destinations That Reveal Ethiopia’s Range
            </h2>
            <p className="text-warmgrey font-body mt-3 max-w-3xl">
              Not a ranking—an introduction to sacred architecture, mountain wildlife, living
              cultures, volcanic geology and specialist field travel.
            </p>
          </AnimateIn>
          <AnimateStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.07}>
            {featured.map((destination) => (
              <div key={destination.slug}>
                <Link
                  href={`/ethiopias-popular-destinations/${destination.slug}`}
                  className="group relative overflow-hidden rounded-card block card-hover"
                  aria-label={`Explore ${destination.name}`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <PlaceholderImage
                      filename={`dest-${destination.slug}-hero.jpg`}
                      width={700}
                      height={525}
                      category="destination"
                      fill
                      label={destination.image.cardAlt}
                      className="group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="image-overlay" />
                    <div className="absolute top-4 right-4">
                      <span
                        className={`font-body font-medium border rounded-full px-3 py-1 ${DIFFICULTY_STYLES[destination.difficulty] ?? ''}`}
                        style={{ fontSize: '11px', letterSpacing: '0.06em' }}
                      >
                        {destination.difficulty}
                      </span>
                    </div>
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <span className="label-eyebrow text-gold !mb-1" style={{ fontSize: '10px' }}>
                        {destination.region}
                      </span>
                      <h3
                        className="font-display text-ivory font-light leading-tight"
                        style={{ fontSize: 'clamp(1.25rem,2.5vw,1.75rem)' }}
                      >
                        {destination.shortName}
                      </h3>
                      <p className="text-ivory/75 font-body mt-2 leading-snug text-[13px]">
                        {destination.tagline}
                      </p>
                      <div className="flex items-center justify-between gap-4 mt-4 pt-3 border-t border-white/20 text-ivory/65 font-body text-[11px]">
                        <span>{destination.idealStay}</span>
                        <span className="text-right">{destination.bestTime}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </AnimateStagger>
        </div>
      </section>

      <section className="section-padding bg-volcanic" aria-labelledby="regions-heading">
        <div className="container-max">
          <AnimateIn className="mb-12">
            <span className="label-eyebrow text-gold">Browse by Region</span>
            <h2
              id="regions-heading"
              className="heading-display text-ivory mt-1"
              style={{ fontSize: 'clamp(1.75rem,3.5vw,2.75rem)' }}
            >
              All 18 Destination Guides
            </h2>
          </AnimateIn>
          <div className="space-y-12">
            {REGIONS.map((region) => {
              const destinations = PREMIUM_DESTINATIONS.filter((destination) =>
                region.zones.includes(destination.zone),
              )
              return (
                <AnimateIn key={region.name}>
                  <div className="grid lg:grid-cols-[0.3fr_0.7fr] gap-6 lg:gap-10">
                    <div>
                      <h3 className="font-display text-gold text-2xl font-light">{region.name}</h3>
                      <p className="font-body text-ivory/55 text-sm leading-relaxed mt-2 max-w-sm">
                        {region.copy}
                      </p>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {destinations.map((destination) => (
                        <Link
                          key={destination.slug}
                          href={`/ethiopias-popular-destinations/${destination.slug}`}
                          className="group flex items-center gap-4 p-4 rounded-[12px] border border-white/10 hover:border-gold/50 hover:bg-white/5 transition-colors duration-300"
                        >
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                            <PlaceholderImage
                              filename={`dest-${destination.slug}-thumb.jpg`}
                              width={64}
                              height={64}
                              category="destination"
                              fill
                              label={destination.image.cardAlt}
                              className="group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="font-display text-ivory group-hover:text-gold transition-colors text-lg leading-tight">
                              {destination.shortName}
                            </div>
                            <div className="text-ivory/45 font-body mt-1 text-[11px]">
                              {destination.difficulty} · {destination.idealStay}
                            </div>
                          </div>
                          <svg
                            className="flex-shrink-0 text-gold/40 group-hover:text-gold group-hover:translate-x-1 transition duration-200"
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            aria-hidden="true"
                          >
                            <path
                              d="M1 7h12M8 3l4 4-4 4"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
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

      <section className="section-padding bg-ivory" aria-labelledby="interest-heading">
        <div className="container-max">
          <AnimateIn className="mb-10 max-w-3xl">
            <span className="label-eyebrow">Choose by Interest</span>
            <h2
              id="interest-heading"
              className="heading-display text-volcanic mt-1"
              style={{ fontSize: 'clamp(1.75rem,3.5vw,2.75rem)' }}
            >
              Start With What You Want to Feel, Learn or Photograph
            </h2>
          </AnimateIn>
          <AnimateStagger className="grid md:grid-cols-2 gap-5" staggerDelay={0.08}>
            {INTERESTS.map((interest) => (
              <div key={interest.title} className="border border-sand rounded-card p-6 bg-white">
                <h3 className="font-display text-volcanic text-2xl font-light">{interest.title}</h3>
                <p className="font-body text-warmgrey text-sm leading-relaxed mt-2">{interest.copy}</p>
                <div className="flex flex-wrap gap-2 mt-5">
                  {interest.destinations.map((name) => (
                    <span
                      key={name}
                      className="font-body text-[11px] px-3 py-1.5 rounded-full bg-gold-faint text-coffee border border-sand"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </AnimateStagger>
        </div>
      </section>

      <section className="section-padding-sm bg-gold-faint border-y border-sand/60">
        <div className="container-max grid lg:grid-cols-3 gap-7">
          {[
            {
              title: 'Not every route is open every day',
              body: 'Remote parks, Tigray, Danakil, Omo sectors and western lowlands require date-specific verification. We publish planning guidance, then reconfirm the actual operation before booking.',
            },
            {
              title: 'Wildlife and ceremonies are not products',
              body: 'We never guarantee lava visibility, migrations, rare mammals or community ceremonies. We build informed opportunities, repeat sessions and worthwhile alternatives.',
            },
            {
              title: 'Travel time is part of the design',
              body: 'Domestic flights help, but airport transfers, mountain roads and remote tracks still shape the day. Our routes protect the experience from over-compression.',
            },
          ].map((item) => (
            <AnimateIn key={item.title}>
              <div className="h-full border-l-2 border-gold pl-5">
                <h3 className="font-display text-volcanic text-xl">{item.title}</h3>
                <p className="font-body text-warmgrey text-sm leading-relaxed mt-2">{item.body}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </section>

      <section className="section-padding-sm bg-ivory" aria-labelledby="destination-faq-heading">
        <div className="container-max max-w-4xl">
          <AnimateIn className="mb-10 text-center">
            <span className="label-eyebrow">Planning Questions</span>
            <h2
              id="destination-faq-heading"
              className="heading-display text-volcanic mt-1"
              style={{ fontSize: 'clamp(1.5rem,3vw,2.25rem)' }}
            >
              Ethiopia Destination FAQs
            </h2>
          </AnimateIn>
          <div className="space-y-3">
            {HUB_FAQS.map((faq) => (
              <details key={faq.q} className="border border-sand rounded-card bg-white group">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none font-body font-medium text-volcanic hover:text-gold-ink transition-colors text-sm">
                  <span>{faq.q}</span>
                  <span className="ml-4 text-gold-ink text-xl leading-none group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="px-5 pb-5 text-warmgrey font-body leading-relaxed text-sm">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 md:py-24 overflow-hidden">
        <PlaceholderImage
          filename="destinations-hub-cta.jpg"
          width={1920}
          height={720}
          category="destination"
          fill
          label="Private tailor-made Ethiopia journey planning"
        />
        <div className="absolute inset-0 bg-volcanic/82" />
        <div className="relative z-10 container-max text-center max-w-3xl mx-auto">
          <AnimateIn>
            <span className="label-eyebrow text-gold">Your Route, Not a Template</span>
            <h2
              className="heading-display text-ivory mt-2"
              style={{ fontSize: 'clamp(2rem,4.5vw,3.5rem)' }}
            >
              Tell Us What Draws You to Ethiopia.
            </h2>
            <p className="text-ivory/70 font-body leading-relaxed mt-5">
              Share your dates, interests, fitness, comfort level and the places that have caught
              your attention. Our Addis Ababa team will build a route around real travel times,
              seasonal conditions and current access.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              <Link href="/enquire" className="btn-primary">
                Design My Ethiopia Journey
              </Link>
              <Link href="/trip-finder" className="btn-secondary border-white/30 text-ivory hover:bg-white/10">
                Use the Trip Finder
              </Link>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center mt-8 pt-6 border-t border-white/10">
              <Link href="/tours-by-experience" className="text-ivory/60 hover:text-gold transition-colors text-sm">Browse Journeys →</Link>
              <Link href="/ethiopia-travel-guide" className="text-ivory/60 hover:text-gold transition-colors text-sm">Read the Travel Guide →</Link>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  )
}
