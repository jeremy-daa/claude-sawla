import type { Metadata } from "next"
import Link from "next/link"
import PlaceholderImage from "@/components/ui/PlaceholderImage"
import SchemaScript from "@/components/ui/SchemaScript"
import { AnimateIn, AnimateStagger } from "@/components/ui/AnimateIn"
import { breadcrumbSchema } from "@/lib/schema"

export const metadata: Metadata = {
  title: "Our Ethiopia Drivers | Safe, Experienced | Sawla Tours",
  description: "Sawla Tours drivers are professional Ethiopian 4WD specialists — vetted, experienced on all road types, and a continuous support presence throughout your journey.",
  alternates: { canonical: "https://www.sawlatours.com/meet-our-drivers" },
  openGraph: {
    title: "Our Ethiopia Drivers | Sawla Tours",
    description: "Professional Ethiopian drivers who know the country's roads, terrain, and conditions from firsthand experience.",
    images: [{ url: "https://www.sawlatours.com/images/og-home.jpg", width: 1200, height: 630 }],
  },
}

const schema = breadcrumbSchema([
  { name: "Home", url: "https://www.sawlatours.com" },
  { name: "About Us", url: "https://www.sawlatours.com/about-us" },
  { name: "Our Drivers", url: "https://www.sawlatours.com/meet-our-drivers" },
])

const standards = [
  {
    title: "Vehicle Standards",
    body: "All Sawla Tours vehicles are Toyota Land Cruisers — the 200 Series for most Ethiopian routes, the 78 Series for Danakil, remote Omo Valley tracks, and high-clearance terrain. We do not use local minibuses or underpowered 4WDs. Vehicles are pre-checked before every journey departure.",
  },
  {
    title: "Driver Vetting",
    body: "Every Sawla Tours driver is personally vetted by our planning team. We assess road knowledge, English communication, temperament under pressure, vehicle maintenance habits, and track record across Ethiopian terrain types. We match drivers to routes — not just to vehicles.",
  },
  {
    title: "Emergency Equipment",
    body: "Every vehicle carries a comprehensive first aid kit, spare tyre and full mechanical toolkit, communication equipment for remote routes, emergency water supply, and a detailed emergency protocol briefed before departure into remote areas like Danakil.",
  },
  {
    title: "Continuous Presence",
    body: "Your driver is a continuous support presence — available for early morning departures, airport transfers, unexpected route changes, and emergency assistance. For remote itineraries like Danakil or deep Omo Valley, a second support vehicle travels with the group.",
  },
]

const routeSpecialties = [
  { route: "Northern Historic Circuit", terrain: "Paved highland routes, some gravel between churches", notes: "Long driving days between Lalibela, Gondar, Bahir Dar. Knowledge of church approach roads critical.", vehicle: "Land Cruiser 200 Series" },
  { route: "Simien Mountains", terrain: "High-altitude gravel, rocky ascents, narrow escarpment roads", notes: "High clearance essential. Drivers understand altitude protocols and weather patterns on the plateau.", vehicle: "Land Cruiser 200 Series" },
  { route: "Bale Mountains", terrain: "Sanetti Plateau (4,300m), river crossings, forest tracks", notes: "4WD essential for plateau access. River levels affect route options seasonally in Harenna Forest.", vehicle: "Land Cruiser 200 Series" },
  { route: "Omo Valley", terrain: "Remote bush tracks, river crossings, seasonal mud", notes: "Deep southern knowledge required. Community access roads change significantly with rainfall.", vehicle: "Land Cruiser 78 Series" },
  { route: "Danakil Depression", terrain: "Volcanic terrain, salt flats, extreme heat, unmarked routes", notes: "Specialist Danakil drivers only. Navigation by GPS and field experience. Convoy logistics required.", vehicle: "Land Cruiser 78 Series" },
  { route: "Tigray Rock Churches", terrain: "Gravel highland roads, steep approach tracks to cliff churches", notes: "Knowledge of Gheralta approach routes and seasonal closure patterns for cliff-access churches.", vehicle: "Land Cruiser 200 Series" },
]

export default function DriversPage() {
  return (
    <>
      <SchemaScript schema={schema} />

      {/* HERO */}
      <section className="relative overflow-hidden" style={{ height: "60vh", minHeight: "440px" }} aria-labelledby="drivers-heading">
        <PlaceholderImage filename="drivers-hero.jpg" width={1920} height={900} category="about" fill className="object-center" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(42,39,36,0.9) 0%, rgba(42,39,36,0.2) 55%, rgba(42,39,36,0.05) 100%)" }} />
        <div className="absolute inset-x-0 bottom-0 pb-14">
          <div className="container-max">
            <AnimateIn>
              <nav aria-label="Breadcrumb" className="mb-5">
                <ol className="flex items-center gap-2 font-body" style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  <li><Link href="/" className="text-ivory/50 hover:text-gold transition-colors">Home</Link></li>
                  <li className="text-ivory/30">/</li>
                  <li><Link href="/about-us" className="text-ivory/50 hover:text-gold transition-colors">About</Link></li>
                  <li className="text-ivory/30">/</li>
                  <li className="text-ivory/75">Our Drivers</li>
                </ol>
              </nav>
              <span className="label-eyebrow text-gold">The Road Team</span>
              <h1 id="drivers-heading" className="heading-display text-ivory mt-2" style={{ fontSize: "clamp(2.25rem,5vw,4.5rem)" }}>
                Drivers Who Know Ethiopia&apos;s Roads
              </h1>
              <p className="text-ivory/65 font-body max-w-2xl mt-5 leading-relaxed" style={{ fontSize: "clamp(1rem,1.25vw,1.175rem)" }}>
                Every Sawla Tours driver is Ethiopian, professionally vetted, and matched to the terrain of your itinerary — not just whoever is available.
              </p>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* STANDARDS */}
      <section className="section-padding bg-ivory" aria-labelledby="standards-heading">
        <div className="container-max">
          <AnimateIn className="max-w-2xl mb-14">
            <span className="label-eyebrow">Our Commitments</span>
            <h2 id="standards-heading" className="heading-display text-volcanic mt-2" style={{ fontSize: "clamp(1.75rem,3.5vw,2.75rem)" }}>
              What We Commit to on Every Journey
            </h2>
            <p className="text-warmgrey font-body mt-4 leading-relaxed" style={{ fontSize: "clamp(1rem,1.2vw,1.0625rem)" }}>
              Safe, reliable ground logistics are the foundation of every Sawla Tours journey. These are operational requirements for every booking — not aspirational standards.
            </p>
          </AnimateIn>
          <AnimateStagger className="grid md:grid-cols-2 gap-6" staggerDelay={0.08}>
            {standards.map(s => (
              <div key={s.title} className="card-luxury p-7">
                <h3 className="font-display text-volcanic font-normal mb-3" style={{ fontSize: "clamp(1.125rem,1.75vw,1.375rem)" }}>
                  {s.title}
                </h3>
                <p className="text-warmgrey font-body leading-relaxed" style={{ fontSize: "0.9375rem" }}>
                  {s.body}
                </p>
              </div>
            ))}
          </AnimateStagger>
        </div>
      </section>

      {/* ROUTE EXPERTISE */}
      <section className="section-padding bg-volcanic text-ivory" aria-labelledby="routes-heading">
        <div className="container-max">
          <AnimateIn className="mb-12">
            <span className="label-eyebrow text-gold">Route Expertise</span>
            <h2 id="routes-heading" className="heading-display text-ivory mt-2" style={{ fontSize: "clamp(1.75rem,3.5vw,2.75rem)" }}>
              Matched to Your Terrain
            </h2>
            <p className="text-ivory/60 font-body mt-4 max-w-xl leading-relaxed" style={{ fontSize: "clamp(1rem,1.2vw,1.0625rem)" }}>
              We assign drivers based on the specific terrain of your itinerary. A northern circuit specialist has different knowledge to a Danakil expedition leader.
            </p>
          </AnimateIn>
          <AnimateStagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-4" staggerDelay={0.06}>
            {routeSpecialties.map(r => (
              <div key={r.route} className="border border-white/12 rounded-card p-6 hover:border-gold/40 transition-colors duration-300">
                <div className="label-eyebrow text-gold !mb-2">{r.route}</div>
                <div className="text-ivory/45 font-body mb-3" style={{ fontSize: "11.5px" }}>{r.vehicle}</div>
                <p className="text-ivory/70 font-body leading-relaxed mb-3" style={{ fontSize: "13px" }}>
                  <span className="text-ivory/40 font-medium">Terrain: </span>{r.terrain}
                </p>
                <p className="text-ivory/50 font-body italic leading-relaxed" style={{ fontSize: "12.5px" }}>
                  {r.notes}
                </p>
              </div>
            ))}
          </AnimateStagger>
        </div>
      </section>

      {/* DRIVER vs GUIDE */}
      <section className="section-padding-sm bg-gold-faint/50 border-t border-sand/60">
        <div className="container-max max-w-3xl mx-auto">
          <AnimateIn>
            <h2 className="font-display text-volcanic font-normal mb-6" style={{ fontSize: "clamp(1.375rem,2.5vw,1.875rem)" }}>
              Your Driver and Your Guide Are Different People
            </h2>
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="p-6 bg-white border border-green-100 rounded-card">
                <div className="font-body font-medium text-green-800 mb-4" style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                  Your Driver Handles
                </div>
                <ul className="space-y-2">
                  {["Safe, reliable transport throughout", "Daily vehicle checks and maintenance", "Route knowledge and terrain navigation", "Early departures and airport transfers", "Emergency logistics and communication", "Convoy coordination in remote areas"].map(t => (
                    <li key={t} className="flex items-start gap-2 text-green-900 font-body" style={{ fontSize: "13.5px" }}>
                      <span className="text-green-600 flex-shrink-0 mt-0.5">✓</span>{t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 bg-white border border-sand rounded-card">
                <div className="font-body font-medium text-warmgrey mb-4" style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                  Your Guide Handles
                </div>
                <p className="text-warmgrey font-body leading-relaxed mb-5" style={{ fontSize: "13.5px" }}>
                  Your guide focuses entirely on interpretation — history, ecology, culture, and context. This is a dedicated, region-specific role. On a Sawla Tours journey, driver and guide are never the same person.
                </p>
                <Link href="/meet-our-guides" className="inline-flex items-center gap-1.5 text-gold hover:text-volcanic transition-colors font-body font-medium" style={{ fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  Meet our field guides
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Link>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-volcanic py-16 text-center">
        <div className="container-max max-w-3xl mx-auto">
          <AnimateIn>
            <h2 className="heading-display text-ivory mb-5" style={{ fontSize: "clamp(1.75rem,3.5vw,2.5rem)" }}>
              Every Detail Coordinated Before You Arrive
            </h2>
            <p className="text-ivory/60 font-body max-w-xl mx-auto mb-8 leading-relaxed" style={{ fontSize: "clamp(1rem,1.2vw,1.0625rem)" }}>
              When you travel with Sawla Tours, your driver, vehicle, and logistics have been matched to your specific route — long before you step off the plane.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/enquire" className="btn-gold">Start Planning</Link>
              <Link href="/how-we-work" className="btn-ghost-light">How We Work</Link>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  )
}
