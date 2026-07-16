import type { Metadata } from 'next'
import Link from 'next/link'
import PlaceholderImage from '@/components/ui/PlaceholderImage'
import HeroVideo from '@/components/ui/HeroVideo'
import SchemaScript from '@/components/ui/SchemaScript'
import { TOUR_STYLES } from '@/data/siteData'
import { ITINERARIES, getItinerariesByStyle } from '@/data/itineraryData'

export const metadata: Metadata = {
  title: 'Ethiopia Tours & Tailor-Made Journeys | Sawla Tours',
  description:
    'Explore private Ethiopia tours by travel style: historic, Omo Valley, wildlife, birding, trekking, festivals, photography, coffee and more. Tailor-made by local experts.',
  alternates: { canonical: 'https://www.sawlatours.com/tours-by-experience' },
  openGraph: {
    title: 'Ethiopia Tours & Tailor-Made Journeys | Sawla Tours',
    description:
      'Private, tailor-made Ethiopia journeys designed around history, culture, wildlife, birding, photography, trekking, festivals, coffee and specialist interests.',
    url: 'https://www.sawlatours.com/tours-by-experience',
    type: 'website',
    images: [{ url: '/images/og-home.jpg', width: 1200, height: 630, alt: 'Tailor-made Ethiopia journeys by Sawla Tours' }],
  },
}

const styleFacts: Record<string, { bestFor: string; duration: string; season: string }> = {
  'historic-cultural-ethiopia-tours': {
    bestFor: 'First-time visitors, historians, cultural travelers and faith-oriented journeys',
    duration: '7–16 days',
    season: 'October–May; festival departures in September and January',
  },
  'omo-valley-cultural-tours': {
    bestFor: 'Culturally curious travelers, anthropological interests and respectful photography',
    duration: '7–14 days',
    season: 'Often December–March and June–September, route dependent',
  },
  'ethiopia-wildlife-tours': {
    bestFor: 'Naturalists, wildlife photographers and repeat Africa travelers',
    duration: '6–15 days',
    season: 'Generally October–March, with regional variations',
  },
  'ethiopia-birdwatching-tours': {
    bestFor: 'Dedicated birders, bird photographers and mixed-interest naturalists',
    duration: '8–21 days',
    season: 'Often October–March; other months reward breeding and green landscapes',
  },
  'ethiopia-adventure-tours': {
    bestFor: 'Walkers, trekkers, geology travelers and remote-expedition travelers',
    duration: '4–16 days',
    season: 'Mostly November–March for highland and Danakil routes',
  },
  'ethiopia-festival-tours': {
    bestFor: 'Cultural travelers, faith groups, photographers and repeat visitors',
    duration: '5–12 days',
    season: 'Festival specific; all dates and local programs reconfirmed annually',
  },
  'ethiopia-photography-tours': {
    bestFor: 'Individual photographers, clubs, workshop leaders and visual storytellers',
    duration: '7–18 days',
    season: 'Year-round by subject; October–March is broadly reliable for access',
  },
  'ethiopia-special-interest-tours': {
    bestFor: 'Coffee professionals, food travelers, academics and focused-interest groups',
    duration: '5–14 days',
    season: 'Subject dependent; coffee harvest commonly runs from roughly October onward',
  },
  'addis-ababa-day-tours': {
    bestFor: 'Stopovers, business travelers, conference groups and short first visits',
    duration: 'Half day–4 days',
    season: 'Year-round, planned around flight times, traffic and opening hours',
  },
}

const plannerRows = [
  ['History and living heritage', 'Addis, Lalibela, Gondar, Lake Tana, Aksum, Tigray, Harar', '7 days', 'Oct–May'],
  ['Omo Valley cultures', 'Arba Minch, Konso, Jinka, Turmi, Omo River, Kibish', '7 days', 'Route dependent'],
  ['Endemic wildlife', 'Bale, Simien, Senkelle, Awash–Aledeghi, Chebera, Gambella', '6 days', 'Mostly Oct–Mar'],
  ['Birding', 'Central highlands, Awash, Rift Valley, Bale, south and southwest', '8 days', 'Often Oct–Mar'],
  ['Trekking and remote travel', 'Simien, Bale, Gheralta, Danakil and community trekking areas', '4 days', 'Mostly Nov–Mar'],
  ['Festivals and pilgrimage', 'Addis, Gondar, Lalibela, Aksum, Kulubi and regional centers', '5 days', 'Festival specific'],
  ['Photography', 'Nationwide, according to subject and light', '7 days', 'Year-round by subject'],
  ['Coffee and special interests', 'Addis, Jimma, Kaffa, Gedeo, Harar and specialist sites', '5 days', 'Subject dependent'],
]

const designSteps = [
  {
    title: 'We start with your reason for traveling',
    text: 'Tell us what you want to understand, photograph, see or feel. A journey built around ancient Christian history is different from one centered on quiet landscapes and short walks, even when both include Lalibela.',
  },
  {
    title: 'We match the season to the experience',
    text: 'There is no single best month for all of Ethiopia. The right timing depends on altitude, rainfall, migration, festival calendars, roads, light and your tolerance for heat or rough travel.',
  },
  {
    title: 'We choose the right field team',
    text: 'A specialist birder, cultural guide, mountain guide, community guide, photography-support driver and production fixer bring different skills. We build the team around the route.',
  },
  {
    title: 'We design realistic pacing',
    text: 'Mountain roads, remote tracks, domestic flight patterns, altitude and early-morning experiences shape how a journey should flow. We would rather remove one rushed stop than dilute the whole trip.',
  },
  {
    title: 'We explain the trade-offs',
    text: 'Remote places may have simple accommodation. Festival dates bring atmosphere and crowds. Green-season landscapes can be beautiful but roads may be slower. Wildlife is never guaranteed. Clear planning creates better travel.',
  },
]

const choiceGuide = [
  ['Historic & Cultural Journeys', 'for a first visit centered on Ethiopia’s defining heritage.', '/tours-by-experience/historic-cultural-ethiopia-tours'],
  ['Omo Valley & Community Journeys', 'when southern cultural diversity is the priority and you accept long drives, heat and variable comfort.', '/tours-by-experience/omo-valley-cultural-tours'],
  ['Wildlife Tours', 'for endemic mammals, unusual habitats and patient observation rather than a conventional Big Five safari.', '/tours-by-experience/ethiopia-wildlife-tours'],
  ['Birdwatching Tours', 'when species, habitat coverage and specialist guiding should determine the route.', '/tours-by-experience/ethiopia-birdwatching-tours'],
  ['Adventure Expeditions', 'when walking, altitude, desert landscapes or remote access are central to the experience.', '/tours-by-experience/ethiopia-adventure-tours'],
  ['Festival Journeys', 'when living faith and public celebration matter more than avoiding crowds.', '/tours-by-experience/ethiopia-festival-tours'],
  ['Photography Expeditions', 'when light, access, flexibility and visual objectives must shape each day.', '/tours-by-experience/ethiopia-photography-tours'],
  ['Special-Interest Journeys', 'when coffee, food, archaeology, geology, research or another focused subject deserves expert-led depth.', '/tours-by-experience/ethiopia-special-interest-tours'],
]

const faqs = [
  {
    question: 'Are all Sawla Tours trips private?',
    answer:
      'Most Sawla journeys are private, tailor-made tours for couples, families, friends, photographers, organizations or small groups. Any selected fixed-date departure is clearly identified as such.',
  },
  {
    question: 'How many days do I need for Ethiopia?',
    answer:
      'Eight to fourteen days is a useful range for a first journey. A focused Addis and Lalibela trip can work in four or five days, while combining the historic north, Omo Valley, wildlife or Danakil usually requires two weeks or more for sensible pacing.',
  },
  {
    question: 'What is the best time to visit Ethiopia?',
    answer:
      'October to March is the broadest dry-season window for many routes, but it is not universally best. Festival travel, green landscapes, bird breeding, coffee harvests and regional rainfall patterns may favor other months. Dates should be matched to the exact journey style.',
  },
  {
    question: 'Can I combine different tour styles?',
    answer:
      'Yes. Many of the strongest Ethiopia itineraries combine two or three interests—for example historic sites with Simien wildlife, Omo culture with photography, Bale birding with coffee country, or Timkat with the northern heritage route.',
  },
  {
    question: 'Are the itineraries fixed?',
    answer:
      'No. Published itineraries are examples. Sawla adjusts route, duration, accommodation, activity level, guide profile and transport to your dates, interests and comfort expectations.',
  },
  {
    question: 'Is Ethiopia suitable for luxury travel?',
    answer:
      'Ethiopia can be designed with excellent hotels and the best available lodges in key destinations, but standards vary by region. Remote areas may require simple lodges, community stays or mobile camps. Sawla explains the accommodation reality before booking.',
  },
  {
    question: 'How does Sawla handle safety and changing access?',
    answer:
      'The team reconfirms routes, local conditions, site access and supplier operations before departure and during the journey. When a region is not suitable, Sawla proposes a viable alternative rather than relying on outdated itinerary assumptions.',
  },
  {
    question: 'Can Sawla arrange photography, drone or binocular permissions?',
    answer:
      'Sawla can advise on and coordinate applicable permission processes. Drone operation is regulated and requires advance approval, which is not guaranteed. Binocular or specialist-equipment requirements can also change, so equipment details should be shared early.',
  },
]

export default function ToursHubPage() {
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.sawlatours.com' },
        { '@type': 'ListItem', position: 2, name: 'Ethiopia Tours', item: 'https://www.sawlatours.com/tours-by-experience' },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Ethiopia Tours & Tailor-Made Journeys',
      url: 'https://www.sawlatours.com/tours-by-experience',
      description: metadata.description,
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: TOUR_STYLES.map((style, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: style.name,
          description: style.description,
          url: `https://www.sawlatours.com/tours-by-experience/${style.slug}`,
        })),
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    },
  ]

  return (
    <>
      <SchemaScript schema={schema} />

      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
        <HeroVideo poster="tours-hub-hero.jpg" posterCategory="tour" overlayClassName="bg-volcanic/72" />
        <div className="relative z-10 container-max text-ivory max-w-5xl">
          <nav aria-label="Breadcrumb" className="mb-6 text-xs uppercase tracking-wider text-ivory/65">
            <Link href="/">Home</Link> / <span className="text-ivory">Ethiopia Tours</span>
          </nav>
          <span className="label-eyebrow text-gold">Journeys, designed around you</span>
          <h1 className="heading-display text-display-xl text-ivory mt-2">Ethiopia Tours, Shaped Around What Moves You</h1>
          <p className="text-ivory/82 text-body-lg mt-5 max-w-3xl">
            Walk through churches carved from living rock. Share coffee where it first grew wild. Follow an Ethiopian wolf across an Afroalpine plateau. Stand beneath the salt-streaked cliffs of the Danakil. Listen as white-robed pilgrims fill a mountain town with prayer.
          </p>
          <p className="text-ivory/72 mt-4 max-w-3xl leading-7">
            Sawla Tours designs private, tailor-made Ethiopia tours around the experiences that matter most to you—history, culture, wildlife, birding, photography, trekking, festivals, food, human origins or journeys beyond the familiar map.
          </p>
          <p className="text-gold/90 text-xs uppercase tracking-wider mt-6">
            Ethiopia-based specialists · Private, tailor-made travel · Expert guides and field teams · Routes reconfirmed before departure
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link href="/enquire" className="btn-primary">Design my Ethiopia journey →</Link>
            <a href="#journey-styles" className="btn-secondary">Explore journey styles</a>
          </div>
        </div>
      </section>

      <section className="section-padding-sm bg-sand/30">
        <div className="container-max grid lg:grid-cols-[0.9fr_1.4fr] gap-10 items-start">
          <div>
            <span className="label-eyebrow">Ethiopia tours at a glance</span>
            <h2 className="heading-display text-display-md text-charcoal mt-2">What Types of Ethiopia Tours Does Sawla Offer?</h2>
          </div>
          <div className="space-y-5 text-warmgrey leading-8">
            <p>
              Sawla Tours creates private, tailor-made journeys across Ethiopia, including historic and cultural tours, Omo Valley community journeys, wildlife safaris, birdwatching expeditions, trekking and Danakil adventures, religious festival tours, photography trips, coffee and special-interest travel, Addis Ababa day tours and professional filming support.
            </p>
            <p>
              Ethiopia resists the ordinary travel formula. Its greatest places are not gathered along one road, and its strongest experiences are not interchangeable. A historian, birder, photographer, family and expedition traveler need different routes, guides, pacing and logistics.
            </p>
            <p className="font-medium text-charcoal">
              That is why Sawla begins with how you want to travel—not with a fixed package.
            </p>
          </div>
        </div>
      </section>

      <section id="journey-styles" className="section-padding bg-ivory scroll-mt-24">
        <div className="container-max">
          <div className="max-w-3xl mb-12">
            <span className="label-eyebrow">Choose your way into Ethiopia</span>
            <h2 className="heading-display text-display-md text-charcoal mt-2">Journey Styles That Can Stand Alone or Combine</h2>
            <p className="text-warmgrey text-body-lg mt-4">
              A northern heritage journey can continue into the Simien Mountains. A birding route can include Bale wildlife and coffee country. A photography expedition can be timed around Timkat, an Omo market cycle or the dry-season landscapes of Afar.
            </p>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {TOUR_STYLES.map((style) => {
              const facts = styleFacts[style.slug]
              return (
                <Link key={style.slug} href={`/tours-by-experience/${style.slug}`} className="group bg-white rounded-card border border-sand overflow-hidden card-hover">
                  <div className="grid sm:grid-cols-[220px_1fr] h-full">
                    <div className="relative min-h-[220px] overflow-hidden">
                      <PlaceholderImage filename={`tour-hub-${style.slug}.jpg`} width={660} height={660} category="tour" fill className="group-hover:scale-105 transition-transform duration-500" label={style.heroAlt} />
                    </div>
                    <div className="p-7 flex flex-col">
                      <div className="label-eyebrow text-gold mb-2">{style.name}</div>
                      <h3 className="font-display text-charcoal text-3xl font-normal mb-3 group-hover:text-gold transition-colors leading-tight">{style.tagline}</h3>
                      <p className="text-warmgrey text-sm leading-7 line-clamp-5">{style.description}</p>
                      {facts && (
                        <dl className="grid grid-cols-1 gap-2 mt-5 pt-5 border-t border-sand text-xs">
                          <div><dt className="uppercase tracking-wider text-charcoal/55 inline">Best for: </dt><dd className="inline text-warmgrey">{facts.bestFor}</dd></div>
                          <div><dt className="uppercase tracking-wider text-charcoal/55 inline">Typical duration: </dt><dd className="inline text-warmgrey">{facts.duration}</dd></div>
                          <div><dt className="uppercase tracking-wider text-charcoal/55 inline">Broad timing: </dt><dd className="inline text-warmgrey">{facts.season}</dd></div>
                        </dl>
                      )}
                      <span className="inline-block mt-auto pt-5 text-xs tracking-wider uppercase text-gold">Explore this journey style →</span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Complete journey index — the homepage promises "all 36 journeys" and this
          section is where that promise lands, every itinerary linked in one place. */}
      <section id="all-journeys" className="section-padding bg-white border-y border-sand/60 scroll-mt-24">
        <div className="container-max">
          <div className="max-w-3xl mb-12">
            <span className="label-eyebrow">The complete index</span>
            <h2 className="heading-display text-display-md text-charcoal mt-2">All {ITINERARIES.length} Journeys at a Glance</h2>
            <p className="text-warmgrey text-body-lg mt-4">
              Every sample journey we run, grouped by style. Each one is a proven starting point — the final route is always shaped around your dates, pace and interests.
            </p>
          </div>
          <div className="space-y-12">
            {TOUR_STYLES.map((style) => {
              const itins = getItinerariesByStyle(style.slug)
              if (itins.length === 0) return null
              return (
                <div key={style.slug}>
                  <div className="flex items-baseline justify-between gap-4 mb-5">
                    <h3 className="font-display text-charcoal text-2xl font-normal">{style.name}</h3>
                    <Link href={`/tours-by-experience/${style.slug}`} className="text-gold-ink hover:text-volcanic transition-colors text-xs uppercase tracking-wider flex-shrink-0">
                      Style guide →
                    </Link>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {itins.map((itin) => (
                      <Link key={itin.slug} href={`/tours-by-experience/${style.slug}/${itin.slug}`}
                        className="group flex items-center justify-between gap-3 bg-ivory border border-sand rounded-card px-5 py-4 hover:border-gold/50 transition-colors duration-200">
                        <div className="min-w-0">
                          <div className="font-body font-medium text-charcoal group-hover:text-gold-ink transition-colors leading-snug" style={{ fontSize: '14px' }}>{itin.name}</div>
                          <div className="text-warmgrey mt-0.5" style={{ fontSize: '12px' }}>{itin.durationLabel} · {itin.difficulty}</div>
                        </div>
                        <span className="text-gold-ink flex-shrink-0 group-hover:translate-x-0.5 transition-transform" aria-hidden="true">→</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section-padding-sm bg-sand/25">
        <div className="container-max grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-card border border-sand p-8 md:p-10">
            <span className="label-eyebrow">Short on time?</span>
            <h2 className="font-display text-charcoal text-4xl mt-2">Addis Stopovers, Day Tours & Business Travel</h2>
            <p className="text-warmgrey mt-4 leading-7">
              Explore Addis through museums, markets, contemporary art, coffee, food, music and neighborhoods; take a realistic day trip to nearby heritage or nature sites; or add a compact extension around a conference or business schedule.
            </p>
            <Link href="/tours-by-experience/addis-ababa-day-tours" className="text-gold text-sm uppercase tracking-wider inline-block mt-6">Explore short Ethiopia journeys →</Link>
          </div>
          <div className="bg-charcoal rounded-card p-8 md:p-10 text-ivory">
            <span className="label-eyebrow text-gold">For film, television and media</span>
            <h2 className="font-display text-4xl mt-2">Filming in Ethiopia With Sawla Films</h2>
            <p className="text-ivory/70 mt-4 leading-7">
              Professional production requires a different operational system from leisure travel. Sawla Films supports research, scouting, permits, equipment and customs planning, Ethiopian crews, transport, security coordination, drone applications and remote camps.
            </p>
            <Link href="/sawla-films" className="text-gold text-sm uppercase tracking-wider inline-block mt-6">Explore production support →</Link>
          </div>
        </div>
      </section>

      <section className="section-padding bg-ivory">
        <div className="container-max">
          <div className="max-w-3xl mb-10">
            <span className="label-eyebrow">Journey planner</span>
            <h2 className="heading-display text-display-md text-charcoal mt-2">Ethiopia Travel Styles at a Glance</h2>
            <p className="text-warmgrey mt-4">These are planning ranges—not fixed promises. Weather, roads, domestic flights, site rules and regional access are reconfirmed for every proposal.</p>
          </div>
          <div className="overflow-x-auto rounded-card border border-sand bg-white">
            <table className="w-full min-w-[780px] border-collapse text-sm">
              <thead>
                <tr className="bg-sand/60 text-left text-charcoal">
                  <th className="p-4">Travel interest</th>
                  <th className="p-4">Strong starting regions</th>
                  <th className="p-4">Typical minimum</th>
                  <th className="p-4">Broad timing</th>
                </tr>
              </thead>
              <tbody>
                {plannerRows.map((row) => (
                  <tr key={row[0]} className="border-t border-sand">
                    {row.map((cell, index) => <td key={cell} className={`p-4 ${index === 0 ? 'font-medium text-charcoal' : 'text-warmgrey'}`}>{cell}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section-padding bg-sand/25">
        <div className="container-max">
          <div className="max-w-3xl mb-12">
            <span className="label-eyebrow">Tailor-made by design</span>
            <h2 className="heading-display text-display-md text-charcoal mt-2">How Sawla Designs a Private Ethiopia Tour</h2>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-5">
            {designSteps.map((step, index) => (
              <article key={step.title} className="bg-white rounded-card border border-sand p-6">
                <span className="font-display text-gold text-3xl">0{index + 1}</span>
                <h3 className="font-display text-charcoal text-2xl mt-3 mb-3 leading-tight">{step.title}</h3>
                <p className="text-warmgrey text-sm leading-7">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-ivory">
        <div className="container-max grid lg:grid-cols-[0.85fr_1.15fr] gap-12">
          <div>
            <span className="label-eyebrow">Decision guide</span>
            <h2 className="heading-display text-display-md text-charcoal mt-2">Which Ethiopia Tour Is Right for You?</h2>
            <p className="text-warmgrey mt-5 leading-7">
              Still undecided? Tell us three things you hope to experience and the number of days available. We will recommend the strongest route rather than forcing your interests into a preset package.
            </p>
            <Link href="/enquire" className="btn-primary inline-flex mt-7">Ask an Ethiopia specialist →</Link>
          </div>
          <div className="divide-y divide-sand border-y border-sand">
            {choiceGuide.map(([name, description, href]) => (
              <div key={name} className="py-5">
                <Link href={href} className="font-display text-charcoal text-2xl hover:text-gold transition-colors">Choose {name}</Link>
                <p className="text-warmgrey mt-1 leading-7">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-sand/25">
        <div className="container-max max-w-5xl">
          <div className="text-center mb-10">
            <span className="label-eyebrow">Planning questions</span>
            <h2 className="heading-display text-display-md text-charcoal mt-2">Frequently Asked Questions About Ethiopia Tours</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {faqs.map((item) => (
              <article key={item.question} className="bg-white rounded-card border border-sand p-7">
                <h3 className="font-display text-charcoal text-2xl mb-3">{item.question}</h3>
                <p className="text-warmgrey leading-7">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding-sm bg-charcoal text-center text-ivory">
        <div className="container-max max-w-3xl">
          <span className="label-eyebrow text-gold">Your journey starts with a conversation</span>
          <h2 className="font-display text-display-md mt-2">Tell Us What Draws You to Ethiopia</h2>
          <p className="text-ivory/70 text-body-lg mt-4">
            Share your dates, available days, preferred pace, interests and comfort expectations. Our Ethiopia-based specialists will turn those ideas into a route that is coherent, honest and entirely your own.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mt-8">
            <Link href="/enquire" className="btn-primary">Design my journey →</Link>
            <Link href="/how-we-work" className="btn-secondary">See how planning works</Link>
          </div>
          <p className="text-ivory/45 text-xs uppercase tracking-wider mt-6">No booking fee to enquire · Private planning · Clear response from a local team</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center mt-8 pt-6 border-t border-white/10">
            <Link href="/ethiopias-popular-destinations" className="text-ivory/60 hover:text-gold transition-colors text-sm">Explore Destinations →</Link>
            <Link href="/ethiopia-travel-guide" className="text-ivory/60 hover:text-gold transition-colors text-sm">Read the Travel Guide →</Link>
            <Link href="/planning-and-pricing" className="text-ivory/60 hover:text-gold transition-colors text-sm">How Pricing Works →</Link>
          </div>
        </div>
      </section>
    </>
  )
}
