import type { Metadata } from 'next'
import Link from 'next/link'
import PlaceholderImage from '@/components/ui/PlaceholderImage'
import SchemaScript from '@/components/ui/SchemaScript'
import { AnimateIn, AnimateStagger } from '@/components/ui/AnimateIn'
import { breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Mobile Tented Camps Ethiopia | Remote Expeditions | Sawla Tours',
  description: 'Private mobile tented camps for remote Ethiopia expeditions — Danakil, Simien, Bale, Omo Valley. Full cook crew, real beds, solar lighting. The only way to stay where no lodge can go.',
  alternates: { canonical: 'https://www.sawlatours.com/mobile-tented-camps-ethiopia' },
  openGraph: {
    title: 'Mobile Tented Camps Ethiopia | Sawla Tours',
    description: 'Access the most remote corners of Ethiopia with private camps that bring real comfort to places where there are no lodges.',
    images: [{ url: 'https://www.sawlatours.com/images/og-home.jpg', width: 1200, height: 630 }],
  },
}

const schema = breadcrumbSchema([
  { name: 'Home', url: 'https://www.sawlatours.com' },
  { name: 'Mobile Tented Camps', url: 'https://www.sawlatours.com/mobile-tented-camps-ethiopia' },
])

const CAMP_SPEC = [
  { title: 'Accommodation', detail: 'Expedition dome or safari ridge tents with real camp beds, foam or inflatable mattresses, fitted sheets, and a duvet rated to the overnight temperature. Not a mat on the ground.' },
  { title: 'Meals and Kitchen', detail: 'A dedicated cook crew prepares three meals daily from fresh ingredients with a full kitchen kit. Dietary requirements accommodated with advance notice.' },
  { title: 'Power and Light', detail: 'Solar lanterns for ambient lighting, USB charging via solar bank for cameras and phones, and battery headlamps for night hikes.' },
  { title: 'Safety and Communication', detail: 'First aid kit, radio contact with Sawla Tours base, Afar escort for Danakil, park-mandated armed scout for Simien. Emergency evacuation plan in place before departure.' },
  { title: 'Camp Setup and Strike', detail: 'Your camp is set up before you arrive and broken down after you leave. The camp team travels separately so you never manage logistics — only the experience.' },
  { title: 'Water and Sanitation', detail: 'Filtered drinking water throughout. Portable camp toilet with privacy screen. Solar shower at appropriate camps. Leave-no-trace protocols strictly applied.' },
]

const CAMP_LOCATIONS = [
  {
    name: 'Danakil Depression',
    description: 'The only way to stay overnight in this landscape. Camps at Erta Ale volcano base and the Dallol approach route — positioned for pre-dawn summit access, the safest and most productive window.',
    itinSlug: 'erta-ale-volcano-4-days', itinStyle: 'ethiopia-adventure-tours', itinName: 'Erta Ale Express', img: 'camp-danakil.jpg',
  },
  {
    name: 'Simien Mountains',
    description: 'Trek camps along the Sankaber–Chenek escarpment set up at each night position. Waking to geladas visible from your tent at 3,600 metres is the defining Simien experience.',
    itinSlug: 'simien-mountains-trekking-7-days', itinStyle: 'ethiopia-adventure-tours', itinName: 'Simien Mountains Trek', img: 'camp-simien.jpg',
  },
  {
    name: 'Bale Mountains',
    description: 'High plateau camps on the Sanetti (3,800–4,300m) for multi-day Ethiopian wolf tracking. Cold nights, extraordinary clarity, and the afroalpine sky above.',
    itinSlug: 'bale-trekking-adventure-8-days', itinStyle: 'ethiopia-adventure-tours', itinName: 'Bale Mountains Trek', img: 'camp-bale.jpg',
  },
  {
    name: 'Omo Valley',
    description: 'Mobile camps between community visits in the Lower Omo allow access to river locations and overnight stays near communities that no lodge can reach for immediacy.',
    itinSlug: 'mobile-camp-expedition-12-days', itinStyle: 'ethiopia-adventure-tours', itinName: 'Mobile Camp Expedition', img: 'camp-omo.jpg',
  },
]

export default function MobileCampsPage() {
  return (
    <>
      <SchemaScript schema={schema} />

      {/* HERO */}
      <section className="relative overflow-hidden" style={{ height: '68vh', minHeight: '480px' }} aria-labelledby="camps-heading">
        <PlaceholderImage filename="camps-hero.jpg" width={1920} height={1080} category="camp" fill />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(42,39,36,0.90) 0%, rgba(42,39,36,0.22) 55%, rgba(42,39,36,0.08) 100%)' }} />
        <div className="absolute inset-x-0 bottom-0 pb-16">
          <div className="container-max">
            <AnimateIn>
              <nav aria-label="Breadcrumb" className="mb-5">
                <ol className="flex items-center gap-2 font-body" style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  <li><Link href="/" className="text-ivory/45 hover:text-gold transition-colors">Home</Link></li>
                  <li className="text-ivory/25">/</li>
                  <li className="text-ivory/70">Mobile Tented Camps</li>
                </ol>
              </nav>
              <span className="label-eyebrow text-gold">Remote Ethiopia Expeditions</span>
              <h1 id="camps-heading" className="heading-display text-ivory mt-2" style={{ fontSize: 'clamp(2.25rem,5.5vw,5rem)' }}>
                Ethiopia Mobile Tented Camps
              </h1>
              <p className="text-ivory/70 font-body max-w-2xl mt-5 leading-relaxed" style={{ fontSize: 'clamp(1rem,1.25vw,1.2rem)' }}>
                Private camps that go where lodges cannot. Set up before you arrive, broken down after you leave. Real beds, real meals, real wilderness.
              </p>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* EDITORIAL INTRO */}
      <section className="section-padding bg-ivory">
        <div className="container-max grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <AnimateIn>
            <span className="label-eyebrow">The Access Question</span>
            <h2 className="heading-display text-volcanic mt-2 mb-6" style={{ fontSize: 'clamp(1.5rem,3vw,2.25rem)' }}>
              Some Places Have No Lodge. A Camp Is the Journey.
            </h2>
            <div className="space-y-4 text-warmgrey font-body leading-relaxed" style={{ fontSize: 'clamp(1rem,1.1vw,1.0625rem)' }}>
              <p>The Danakil Depression, Erta Ale crater, the high Simien escarpment, and the deep Omo River bends share one thing: there is no building to sleep in. A mobile tented camp is not a compromise — it is the only way to spend a night in these places.</p>
              <p>Sawla Tours mobile camps are private and fully staffed. A cook crew, camp manager, and logistics team travel separately so everything is ready before you arrive. You contribute to the experience; you do not manage it.</p>
            </div>
          </AnimateIn>
          <AnimateIn delay={0.12}>
            <div className="rounded-card overflow-hidden aspect-[4/3]">
              <PlaceholderImage filename="camp-setup-overview.jpg" width={700} height={525} category="camp" fill />
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* CAMP SPEC */}
      <section className="section-padding-sm bg-gold-faint border-y border-sand/60" aria-labelledby="spec-heading">
        <div className="container-max">
          <AnimateIn className="mb-10">
            <span className="label-eyebrow">What Is Included</span>
            <h2 id="spec-heading" className="heading-display text-volcanic mt-1" style={{ fontSize: 'clamp(1.5rem,2.75vw,2.1rem)' }}>
              The Camp Standard
            </h2>
          </AnimateIn>
          <AnimateStagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.06}>
            {CAMP_SPEC.map(s => (
              <div key={s.title} className="card-luxury p-6">
                <h3 className="font-display text-volcanic font-normal mb-3" style={{ fontSize: 'clamp(1.0625rem,1.5vw,1.25rem)' }}>
                  {s.title}
                </h3>
                <p className="text-warmgrey font-body leading-relaxed" style={{ fontSize: '0.9375rem' }}>
                  {s.detail}
                </p>
              </div>
            ))}
          </AnimateStagger>
        </div>
      </section>

      {/* CAMP LOCATIONS */}
      <section className="section-padding bg-volcanic" aria-labelledby="locations-heading">
        <div className="container-max">
          <AnimateIn className="mb-12">
            <span className="label-eyebrow text-gold">Where We Camp</span>
            <h2 id="locations-heading" className="heading-display text-ivory mt-1" style={{ fontSize: 'clamp(1.75rem,3.25vw,2.5rem)' }}>
              Four Locations. Four Different Reasons.
            </h2>
          </AnimateIn>
          <AnimateStagger className="grid md:grid-cols-2 gap-5" staggerDelay={0.07}>
            {CAMP_LOCATIONS.map(loc => (
              <div key={loc.name} className="border border-white/10 rounded-card overflow-hidden hover:border-gold/30 transition-colors duration-300">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <PlaceholderImage filename={loc.img} width={700} height={394} category="camp" fill className="hover:scale-105 transition-transform duration-700" />
                  <div className="image-overlay-light" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="font-display text-ivory font-normal leading-snug" style={{ fontSize: 'clamp(1.25rem,2vw,1.5rem)' }}>{loc.name}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-ivory/65 font-body leading-relaxed mb-5" style={{ fontSize: '0.9375rem' }}>{loc.description}</p>
                  <Link href={`/tours-by-experience/${loc.itinStyle}/${loc.itinSlug}`}
                    className="inline-flex items-center gap-1.5 text-gold hover:text-ivory transition-colors font-body font-medium"
                    style={{ fontSize: '11.5px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    {loc.itinName}
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </Link>
                </div>
              </div>
            ))}
          </AnimateStagger>
        </div>
      </section>

      {/* WHO THIS IS FOR */}
      <section className="section-padding-sm bg-ivory border-t border-sand/60">
        <div className="container-max">
          <AnimateIn className="max-w-3xl mx-auto">
            <h2 className="font-display text-volcanic font-normal mb-6" style={{ fontSize: 'clamp(1.375rem,2.5vw,1.875rem)' }}>
              Who a Mobile Camp Journey Suits
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-5 bg-green-50/60 border border-green-100 rounded-card">
                <div className="font-body font-medium text-green-800 mb-3" style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Well Suited For</div>
                <ul className="space-y-2">
                  {["Travelers wanting places no lodge can access","Photographers needing dawn and dusk positioning","Active travelers comfortable in remote settings","Groups of 2–8 wanting complete privacy"].map(t => (
                    <li key={t} className="flex items-start gap-2 text-green-900 font-body" style={{ fontSize: '13.5px' }}>
                      <span className="text-green-600 flex-shrink-0 mt-0.5">✓</span>{t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-5 bg-amber-50/60 border border-amber-100 rounded-card">
                <div className="font-body font-medium text-amber-800 mb-3" style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Consider Carefully</div>
                <ul className="space-y-2">
                  {["Those requiring en-suite facilities","Medical conditions affected by altitude or heat","Travelers expecting hotel-level infrastructure","Anyone unwilling to accept some discomfort for access"].map(t => (
                    <li key={t} className="flex items-start gap-2 text-amber-900 font-body" style={{ fontSize: '13.5px' }}>
                      <span className="text-amber-600 flex-shrink-0 mt-0.5">–</span>{t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* RELATED LINKS */}
      <section className="bg-gold-faint/50 py-8 border-t border-sand/60">
        <div className="container-max">
          <AnimateIn className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div>
              <span className="label-eyebrow">Related Journeys</span>
              <p className="font-display text-volcanic font-light" style={{ fontSize: 'clamp(1rem,1.75vw,1.375rem)' }}>
                Mobile camps feature across our adventure and expedition itineraries
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {[
                { label: 'Adventure Tours',   href: '/tours-by-experience/ethiopia-adventure-tours' },
                { label: 'Wildlife Tours',    href: '/tours-by-experience/ethiopia-wildlife-tours' },
                { label: 'Photography Tours', href: '/tours-by-experience/ethiopia-photography-tours' },
              ].map(l => (
                <Link key={l.href} href={l.href}
                  className="inline-flex items-center gap-1.5 bg-white border border-sand rounded-full px-4 py-2 text-warmgrey hover:border-gold hover:text-gold transition-colors duration-200 font-body"
                  style={{ fontSize: '12.5px' }}>
                  {l.label}
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Link>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-volcanic py-16 text-center">
        <div className="container-max max-w-2xl mx-auto">
          <AnimateIn>
            <h2 className="heading-display text-ivory mb-4" style={{ fontSize: 'clamp(1.75rem,3.5vw,2.5rem)' }}>
              Design Your Remote Expedition
            </h2>
            <p className="text-ivory/60 font-body max-w-xl mx-auto mb-8 leading-relaxed" style={{ fontSize: '0.9375rem' }}>
              Tell us your destination, group size, and dates. We will design the camp itinerary and brief you on exactly what to expect.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/enquire" className="btn-gold">Plan a Camp Journey</Link>
              <Link href="/tours-by-experience/ethiopia-adventure-tours" className="btn-ghost-light">Adventure Itineraries</Link>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  )
}
