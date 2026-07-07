import type { Metadata } from 'next'
import Link from 'next/link'
import PlaceholderImage from '@/components/ui/PlaceholderImage'
import SchemaScript from '@/components/ui/SchemaScript'

export const metadata: Metadata = {
  title: 'Ethiopia Film Fixer & Production Support | Sawla Films',
  description:
    'Ethiopia film fixer services for permits, drones, customs, crews, locations, 4×4 logistics and remote mobile camps for documentary, TV, commercial and photography productions.',
  alternates: { canonical: 'https://www.sawlatours.com/sawla-films' },
  openGraph: {
    title: 'Ethiopia Film Fixer & Production Support | Sawla Films',
    description:
      'Local production support across Ethiopia—from research and permit coordination to crews, vehicles, equipment logistics, remote camps and field contingencies.',
    url: 'https://www.sawlatours.com/sawla-films',
    type: 'website',
    images: [{ url: '/images/og-home.jpg', width: 1200, height: 630, alt: 'Sawla Films production support in Ethiopia' }],
  },
}

const services = [
  ['Pre-production', 'Feasibility, research, recce, budgets, schedules, risk and location options'],
  ['Permits', 'National media processes, regional and local permissions, protected-area and community coordination'],
  ['Equipment', 'Kit lists, customs-documentation pathways, local sourcing and transport planning'],
  ['Drone', 'Application coordination across relevant authorities and sites; approval is never guaranteed'],
  ['Crew', 'Fixers, producers, translators, drivers, guides, camera, sound, lighting, medics and specialist support'],
  ['Transport', 'Cars, minibuses, 4×4 fleets, support vehicles, domestic flights and remote convoy plans'],
  ['Locations', 'Addis, historic north, Omo, Afar, Bale, Simien, Harar, coffee regions and remote field sites'],
  ['Field operations', 'Mobile camps, catering, power, charging, communications, water, scouts and local liaison'],
]

const feasibilityItems = [
  'Story and location research',
  'Contributor and expert identification',
  'Preliminary access calls and sensitivity assessment',
  'Route, season and remote-access analysis',
  'Urban or field recce',
  'Production calendar and critical path',
  'Line-budget options and assumptions',
  'Risk register and contingency routes',
  'Accommodation and transport hold strategy',
  'Cultural, editorial and permit-document briefing',
]

const equipmentItems = [
  'Airline baggage, cargo limits and domestic-flight capacity',
  'Lithium batteries, charging systems and power redundancy',
  'Serial numbers, values, customs entry and exit reconciliation',
  'Rough-road vibration, dust, heat and high-altitude performance',
  'Secure overnight storage and data-management needs',
  'Local replacement, rental or sourcing limitations',
]

const locations = [
  {
    title: 'Addis Ababa',
    text: 'Interviews, institutions, studios, streets, markets, contemporary culture, hotels and the national transport hub. Restricted buildings and formal institutions require advance access.',
  },
  {
    title: 'Historic north',
    text: 'Lalibela, Gondar, Lake Tana, Aksum, Tigray and Simien offer architecture, religion, archaeology, landscapes and wildlife. Heritage and religious rules can limit crew size, lighting, tripods and sacred access.',
  },
  {
    title: 'Omo Valley and southern Ethiopia',
    text: 'Community documentary work requires local liaison, informed contributor consent, regional permissions and a realistic ethical protocol. Ceremonies are not produced on demand.',
  },
  {
    title: 'Afar and Danakil',
    text: 'Extreme heat, remote driving, local coordination, active geology and limited services demand a dedicated expedition plan. Access is always conditional on current assessment.',
  },
  {
    title: 'Bale and wildlife regions',
    text: 'Protected-area permission, wildlife welfare, guide or scout rules, vehicle restrictions and drone prohibitions must be built into the shot plan.',
  },
  {
    title: 'Coffee and southwest regions',
    text: 'Farms, cooperatives, forests, processing sites, institutions and communities require appointment-led access. Remote areas may need camp support.',
  },
]

const crewItems = [
  'Local producer, fixer or production coordinator',
  'Amharic and regional-language translators',
  'Driver-guides and specialist 4×4 drivers',
  'Camera, sound, lighting and grip contacts',
  'Location managers, scouts and local liaisons',
  'Data, charging, catering and camp support',
  'Medic or wilderness first responder',
  'Security liaison or approved support where required',
  'Cultural, scientific, academic and religious experts',
]

const safetyItems = [
  'Current access and security assessment',
  'Medical-facility and evacuation map',
  'Crew emergency contacts and communication plan',
  'Heat, altitude, wildlife and road controls',
  'Food, water and camp-hygiene planning',
  'Scout, ranger and local-authority requirements',
  'Sensitive-story and contributor-protection protocol',
  'Weather, route and equipment contingencies',
  'Check-in schedule and insurance-information support',
]

const consentItems = [
  'No contributor is promised before informed agreement.',
  'Translation includes intended use where relevant.',
  'Minors require appropriate guardian and production safeguards.',
  'Community, religious and cultural restrictions are respected.',
  'Payments and expenses are documented and do not purchase a false narrative.',
  'Vulnerable people are not exposed for production convenience.',
  'Releases are matched to intended use and the production’s legal advice.',
  'Editorial independence does not remove the obligation to avoid harm.',
]

const supportedProjects = [
  'Documentary and factual television',
  'News and current affairs',
  'Feature and short-form film',
  'Commercials and branded content',
  'Travel, nature and wildlife productions',
  'Stills and editorial photography',
  'NGO and institutional media',
  'Academic and scientific field teams',
  'Professional digital productions',
]

const briefItems = [
  'Production company and commissioning platform or client',
  'Project synopsis, subject and intended use',
  'Proposed dates and flexibility',
  'Crew names, roles and nationalities',
  'Requested locations and contributors',
  'Equipment list, including drones, radios and satellite equipment',
  'Approximate shooting schedule',
  'Accommodation and transport expectations',
  'Editorial sensitivities or security concerns',
  'Budget range and decision deadline',
]

const faqs = [
  {
    question: 'How long do Ethiopia filming permits take?',
    answer:
      'Timing depends on the project, authority workload, subject, documents and requested locations. Sawla provides a current planning estimate after reviewing the brief, but approval timing cannot be guaranteed.',
  },
  {
    question: 'Can filming begin on a tourist visa?',
    answer:
      'Professional media activity should follow the correct permit and immigration process. A crew should not assume that tourist entry authorizes filming for broadcast or commercial use.',
  },
  {
    question: 'Can Sawla guarantee drone permission?',
    answer:
      'No. Sawla can coordinate the application, but multiple authorities and local restrictions may apply. The production should maintain a visual plan that does not depend entirely on aerial footage.',
  },
  {
    question: 'Do you provide local camera and sound crew?',
    answer:
      'Sawla can source available Ethiopian crew and equipment contacts according to the technical brief. CVs, reels, kit and rates are confirmed for the specific project and dates.',
  },
  {
    question: 'Can you support remote Omo, Suri or Afar filming?',
    answer:
      'Yes, subject to current access, permissions and realistic lead time. These projects may need 4×4 fleets, local liaison, mobile camps, cooks, power, water, medics and security coordination.',
  },
  {
    question: 'Can you clear equipment through customs?',
    answer:
      'Sawla coordinates the local-documentation pathway and equipment planning, but the applicable procedure depends on the kit, arrival method and authorities. The production remains responsible for complete and accurate declarations.',
  },
  {
    question: 'Do you arrange contributor releases?',
    answer:
      'Sawla can support translated release processes and local explanation. The production company should provide forms approved for its jurisdiction and intended use.',
  },
  {
    question: 'Can Sawla Films work under NDA?',
    answer: 'Yes. Confidentiality and information-sharing requirements can be agreed during contracting.',
  },
  {
    question: 'Do you provide budgets before permit approval?',
    answer:
      'Sawla can prepare a scoped estimate with assumptions and exclusions. Final costs may change if authorities, locations, dates, equipment or access requirements change.',
  },
  {
    question: 'Is Sawla Films the same as Sawla Tours?',
    answer:
      'Sawla Films is the specialist production-support division or sister brand, while Sawla Tours designs private travel. They share Ethiopian field knowledge and logistics, but professional productions follow a separate service and compliance process.',
  },
]

export default function SawlaFilmsPage() {
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.sawlatours.com' },
        { '@type': 'ListItem', position: 2, name: 'Sawla Films', item: 'https://www.sawlatours.com/sawla-films' },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'Sawla Films',
      url: 'https://www.sawlatours.com/sawla-films',
      description: metadata.description,
      areaServed: { '@type': 'Country', name: 'Ethiopia' },
      parentOrganization: { '@type': 'TravelAgency', name: 'Sawla Tours', url: 'https://www.sawlatours.com' },
      serviceType: [
        'Ethiopia film fixing',
        'Production services',
        'Filming permit coordination',
        'Drone application coordination',
        'Location scouting',
        'Remote production logistics',
      ],
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

      <section className="relative min-h-[720px] overflow-hidden pt-28 flex items-end pb-20">
        <PlaceholderImage filename="sawla-films-hero-production.jpg" width={1920} height={1080} category="moments" fill label="International film production crew working on location in Ethiopia" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/20" />
        <div className="relative z-10 container-max text-ivory max-w-5xl">
          <nav aria-label="Breadcrumb" className="mb-6 text-xs uppercase tracking-wider text-ivory/65">
            <Link href="/">Home</Link> / <span className="text-ivory">Sawla Films</span>
          </nav>
          <span className="label-eyebrow text-gold">Ethiopia fixer, permits, crews and field logistics</span>
          <h1 className="heading-display text-display-xl text-ivory mt-2">Ethiopia Film Fixer & Production Support, From Permit Desk to Remote Location</h1>
          <p className="text-ivory/82 text-body-lg mt-5 max-w-3xl">
            Sawla Films supports international documentary, television, news, commercial, branded, photographic and research productions across Ethiopia under one accountable local operation.
          </p>
          <p className="text-gold/90 text-xs uppercase tracking-wider mt-6">
            Ethiopia-based production network · Confidential research · Permit and equipment coordination · Remote expedition capability
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link href="/enquire" className="btn-primary">Start my Ethiopia production →</Link>
            <a href="#production-brief" className="btn-secondary">Prepare the production brief</a>
          </div>
        </div>
      </section>

      <section className="section-padding-sm bg-sand/25">
        <div className="container-max grid lg:grid-cols-[0.9fr_1.4fr] gap-10">
          <div>
            <span className="label-eyebrow">Production support at a glance</span>
            <h2 className="heading-display text-display-md text-charcoal mt-2">What Does an Ethiopia Film Fixer Do?</h2>
          </div>
          <div className="space-y-5 text-warmgrey leading-8">
            <p>
              An Ethiopia film fixer coordinates the local work required to produce legally and effectively in the country: research, permits, letters, location access, contributors, local crews, transport, accommodation, equipment and customs procedures, drone applications, translation, security liaison, remote camps, schedules and field contingencies.
            </p>
            <p>
              Whether the brief is a one-day Addis interview or a multi-week expedition in Afar, Bale, Omo, Suri, Tigray or the western lowlands, the production is scoped from the editorial and technical requirements—not from a generic tour itinerary.
            </p>
            <p className="font-medium text-charcoal">Approval timelines and location access depend on the project and authorities and are never guaranteed before formal confirmation.</p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-ivory">
        <div className="container-max">
          <div className="max-w-3xl mb-12">
            <span className="label-eyebrow">One local production partner</span>
            <h2 className="heading-display text-display-md text-charcoal mt-2">Connect the Editorial Brief to Every Operational Requirement</h2>
            <p className="text-warmgrey text-body-lg mt-4">
              Ethiopia can require coordination across national authorities, regional bureaus, local administrations, protected areas, communities, religious institutions, aviation stakeholders and customs processes. Sawla builds one plan linking permits, travel, crew, equipment, access and risk.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map(([title, text]) => (
              <article key={title} className="bg-white rounded-card border border-sand p-6">
                <h3 className="font-display text-charcoal text-2xl mb-3">{title}</h3>
                <p className="text-warmgrey text-sm leading-7">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-charcoal text-ivory">
        <div className="container-max grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="label-eyebrow text-gold">Research before commitment</span>
            <h2 className="heading-display text-display-md mt-2">Pre-Production Research & Feasibility</h2>
            <p className="text-ivory/70 mt-5 leading-8">
              We identify what is possible, what needs more lead time, what requires a recce and what should change before the international team commits flights, contributors and equipment. A research result is reported honestly; access is not manufactured and contributors are not promised before consent.
            </p>
          </div>
          <ul className="grid sm:grid-cols-2 gap-3">
            {feasibilityItems.map((item) => (
              <li key={item} className="border border-white/10 rounded-lg p-4 text-ivory/75 text-sm leading-6">{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-padding bg-ivory">
        <div className="container-max grid lg:grid-cols-2 gap-12">
          <article className="bg-white rounded-card border border-sand p-8 md:p-10">
            <span className="label-eyebrow">Compliance pathway</span>
            <h2 className="font-display text-charcoal text-4xl mt-2">Filming and Media Permits</h2>
            <div className="space-y-4 text-warmgrey leading-8 mt-5">
              <p>The required process depends on production type, subject, crew, locations, equipment, intended use and commissioning entity. Common documents can include a synopsis, itinerary, letters, crew list, passport copies, equipment list and interview or location requests.</p>
              <p>National approval does not automatically create access to every regional, religious, community, protected or restricted location. Sawla maps the full permission chain and coordinates follow-up.</p>
              <p className="font-medium text-charcoal">Productions should not send crews or ship equipment before the relevant pathway has been agreed.</p>
            </div>
          </article>
          <article className="bg-sand/35 rounded-card border border-sand p-8 md:p-10">
            <span className="label-eyebrow">Aerial production</span>
            <h2 className="font-display text-charcoal text-4xl mt-2">Drone Clearance</h2>
            <p className="text-warmgrey leading-8 mt-5">Drone importation and operation may require approvals from multiple authorities plus location-level permission. Applications can require aircraft details, serial numbers, operator information, insurance, purpose, coordinates, dates, altitude and security review.</p>
            <ul className="mt-5 space-y-3 text-warmgrey text-sm leading-6 list-disc pl-5">
              <li>Approval is not guaranteed.</li>
              <li>Approved import does not mean unrestricted flight.</li>
              <li>Protected areas, crowds, borders, religious sites, wildlife and sensitive infrastructure may remain prohibited.</li>
              <li>Flight plans may be changed or cancelled by authorities or conditions.</li>
              <li>The licensed operator remains responsible for safe, legal operation.</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="section-padding bg-sand/25">
        <div className="container-max grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-start">
          <div>
            <span className="label-eyebrow">Kit and border planning</span>
            <h2 className="heading-display text-display-md text-charcoal mt-2">Customs & Equipment Logistics</h2>
            <p className="text-warmgrey leading-8 mt-5">
              Sawla reviews the complete kit before arrival, including serial numbers, values, batteries, radios, satellite equipment, drones, lenses, sound, lighting, data systems and specialist cases. We advise on the applicable temporary-import or customs pathway and coordinate local documentation where possible.
            </p>
            <p className="text-charcoal font-medium mt-5">We do not advise misdeclaration or informal importation.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {equipmentItems.map((item) => <div key={item} className="bg-white rounded-card border border-sand p-5 text-warmgrey text-sm leading-7">{item}</div>)}
          </div>
        </div>
      </section>

      <section className="section-padding bg-ivory">
        <div className="container-max">
          <div className="max-w-3xl mb-12">
            <span className="label-eyebrow">Nationwide field network</span>
            <h2 className="heading-display text-display-md text-charcoal mt-2">Locations & Access Across Ethiopia</h2>
            <p className="text-warmgrey mt-4">Every location is assessed for subject access, permissions, crew movement, light, accommodation, transport, power, communications and current operating conditions.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((location) => (
              <article key={location.title} className="bg-white rounded-card border border-sand p-7">
                <h3 className="font-display text-charcoal text-3xl mb-3">{location.title}</h3>
                <p className="text-warmgrey leading-7">{location.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-charcoal text-ivory">
        <div className="container-max grid lg:grid-cols-2 gap-12">
          <div>
            <span className="label-eyebrow text-gold">Crew matched to the brief</span>
            <h2 className="heading-display text-display-md mt-2">Ethiopian Crews & Local Specialists</h2>
            <p className="text-ivory/70 leading-8 mt-5">Crew CVs, rates, availability and equipment are confirmed for the specific project and dates. The production structure is scaled to the subject, locations, technical needs and budget.</p>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3 mt-7 text-ivory/75 text-sm">
              {crewItems.map((item) => <li key={item} className="border-b border-white/10 pb-3">{item}</li>)}
            </ul>
          </div>
          <div className="relative rounded-card overflow-hidden min-h-[520px]">
            <PlaceholderImage filename="sawla-films-local-crew.jpg" width={900} height={1100} category="moments" fill label="Ethiopian production crew and vehicles on location" />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-8">
              <span className="label-eyebrow text-gold">Remote capability</span>
              <h3 className="font-display text-ivory text-4xl mt-2">Mobile Camps & Field Movement</h3>
              <p className="text-ivory/70 leading-7 mt-3">For locations beyond reliable lodging, Sawla can plan tents, mess and kitchen facilities, water, shade, charging, communications, catering, support vehicles, scouts and local liaison according to the actual crew and site.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-ivory">
        <div className="container-max grid lg:grid-cols-2 gap-10">
          <article className="bg-sand/30 rounded-card p-8 md:p-10">
            <span className="label-eyebrow">Operational control</span>
            <h2 className="font-display text-charcoal text-4xl mt-2">Safety, Security & Duty of Care</h2>
            <p className="text-warmgrey leading-8 mt-5">Sawla prepares a route-specific operational plan, not a generic assurance. The commissioning company remains responsible for corporate duty of care, insurance and final go or no-go decisions.</p>
            <ul className="mt-6 grid sm:grid-cols-2 gap-3 text-warmgrey text-sm">
              {safetyItems.map((item) => <li key={item} className="bg-white border border-sand rounded-lg p-4 leading-6">{item}</li>)}
            </ul>
          </article>
          <article className="bg-white rounded-card border border-sand p-8 md:p-10">
            <span className="label-eyebrow">People before footage</span>
            <h2 className="font-display text-charcoal text-4xl mt-2">Contributor Consent & Ethical Production</h2>
            <p className="text-warmgrey leading-8 mt-5">Local access is not a substitute for informed consent. Editorial goals, release processes and contributor welfare must remain aligned from research through publication.</p>
            <ul className="mt-6 space-y-3">
              {consentItems.map((item) => <li key={item} className="flex gap-3 text-warmgrey leading-7"><span className="text-gold">—</span><span>{item}</span></li>)}
            </ul>
          </article>
        </div>
      </section>

      <section id="production-brief" className="section-padding bg-sand/25 scroll-mt-24">
        <div className="container-max grid lg:grid-cols-[0.8fr_1.2fr] gap-12">
          <div>
            <span className="label-eyebrow">Who we support</span>
            <h2 className="heading-display text-display-md text-charcoal mt-2">Professional Productions, Research Teams & Visual Storytellers</h2>
            <div className="flex flex-wrap gap-2 mt-6">
              {supportedProjects.map((item) => <span key={item} className="bg-white border border-sand rounded-full px-4 py-2 text-sm text-warmgrey">{item}</span>)}
            </div>
          </div>
          <div className="bg-white rounded-card border border-sand p-8 md:p-10">
            <span className="label-eyebrow">Initial assessment</span>
            <h2 className="font-display text-charcoal text-4xl mt-2">What to Send Before You Lock the Flights</h2>
            <ol className="mt-6 grid sm:grid-cols-2 gap-4">
              {briefItems.map((item, index) => (
                <li key={item} className="flex gap-3 text-warmgrey text-sm leading-6">
                  <span className="font-display text-gold text-xl">{String(index + 1).padStart(2, '0')}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
            <p className="text-charcoal font-medium mt-7">A clear brief allows Sawla to identify the real permit and logistics pathway quickly.</p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-ivory">
        <div className="container-max max-w-5xl">
          <div className="text-center mb-10">
            <span className="label-eyebrow">Production planning questions</span>
            <h2 className="heading-display text-display-md text-charcoal mt-2">Ethiopia Film Production FAQs</h2>
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
          <span className="label-eyebrow text-gold">Send the brief before you commit</span>
          <h2 className="font-display text-display-md mt-2">Start With Feasibility, Not Assumptions</h2>
          <p className="text-ivory/70 text-body-lg mt-4">Share the synopsis, dates, crew, locations and equipment. Sawla Films will assess feasibility, identify the permission chain and return a production pathway with transparent assumptions.</p>
          <div className="flex flex-wrap gap-3 justify-center mt-8">
            <Link href="/enquire" className="btn-primary">Start my Ethiopia production →</Link>
            <a href="mailto:explore@sawlatours.com?subject=Confidential%20Ethiopia%20Production%20Call" className="btn-secondary">Request a confidential call</a>
          </div>
        </div>
      </section>
    </>
  )
}
