import type { Metadata } from "next"
import Link from "next/link"
import PlaceholderImage from "@/components/ui/PlaceholderImage"
import SchemaScript from "@/components/ui/SchemaScript"
import { AnimateIn, AnimateStagger } from "@/components/ui/AnimateIn"
import { TESTIMONIALS, SITE } from "@/data/siteData"
import { breadcrumbSchema } from "@/lib/schema"

export const metadata: Metadata = {
  title: "Why Travel with Sawla Tours | Local Ethiopia Experts",
  description: "15 years. Ethiopian-owned. Every guide, driver, and specialist from here. Read why discerning travelers trust Sawla Tours for private Ethiopia journeys.",
  alternates: { canonical: "https://www.sawlatours.com/why-travel-with-sawla-tours" },
  openGraph: {
    title: "Why Travel with Sawla Tours | Ethiopia Experts",
    description: "Ethiopian-owned. Local guides. 15+ years. See why travelers return.",
    images: [{ url: "https://www.sawlatours.com/images/og-home.jpg", width: 1200, height: 630 }],
  },
}

const schema = [
  breadcrumbSchema([
    { name: "Home", url: "https://www.sawlatours.com" },
    { name: "Why Travel with Us", url: "https://www.sawlatours.com/why-travel-with-sawla-tours" },
  ]),
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Why Travel with Sawla Tours",
    description: "Trust signals, testimonials, and reasons why Sawla Tours is the right Ethiopia tour operator for discerning travelers.",
    url: "https://www.sawlatours.com/why-travel-with-sawla-tours",
    speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1","#why-intro"] },
  },
]

export default function WhyTravelPage() {
  return (
    <>
      {schema.map((s,i) => <SchemaScript key={i} schema={s} />)}

      {/* ── HERO — Pillar 1 (point of view): editorial, not salesy ── */}
      <section className="relative overflow-hidden" style={{height:"72vh",minHeight:"520px"}} aria-labelledby="why-heading">
        <PlaceholderImage filename="why-travel-hero.jpg" width={1920} height={1080} category="about" fill />
        <div className="absolute inset-0" style={{background:"linear-gradient(to top, rgba(42,39,36,0.92) 0%, rgba(42,39,36,0.22) 55%, rgba(42,39,36,0.08) 100%)"}} />
        <div className="absolute inset-x-0 bottom-0 pb-16 md:pb-20">
          <div className="container-max">
            <AnimateIn>
              <nav aria-label="Breadcrumb" className="mb-5">
                <ol className="flex items-center gap-2 font-body" style={{fontSize:"11.5px",letterSpacing:"0.1em",textTransform:"uppercase"}}>
                  <li><Link href="/" className="text-ivory/50 hover:text-gold transition-colors cursor-pointer">Home</Link></li>
                  <li className="text-ivory/30">&#47;</li>
                  <li className="text-ivory/80">Why Travel with Us</li>
                </ol>
              </nav>
              <span className="label-eyebrow text-gold">The Case for Sawla Tours</span>
              <h1 id="why-heading" className="heading-display text-ivory mt-2" style={{fontSize:"clamp(2.25rem,5.5vw,5rem)"}}>
                Why Discerning Travelers
                <em className="block" style={{fontStyle:"italic",color:"var(--gold)"}}>Choose a Local Team</em>
              </h1>
              <p id="why-intro" className="text-ivory/70 font-body max-w-2xl mt-5 leading-relaxed" style={{fontSize:"clamp(1rem,1.25vw,1.2rem)"}}>
                Not every Ethiopia tour operator is the same. The difference is in who designs your journey, who is in the vehicle with you, and who answers the phone when something changes.
              </p>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ── 5 REASONS — Pillar 4 (hierarchy), Pillar 2 (typography) ── */}
      <section className="section-padding bg-ivory" aria-labelledby="reasons-heading">
        <div className="container-max">
          <AnimateIn className="max-w-prose mx-auto text-center mb-16">
            <span className="label-eyebrow">Why Sawla Tours</span>
            <h2 id="reasons-heading" className="heading-display text-volcanic mt-2" style={{fontSize:"clamp(1.75rem,3.5vw,2.75rem)"}}>Five Reasons That Are Not on Every Operator Website</h2>
          </AnimateIn>
          <div className="space-y-0">
            {[
              {
                n:"01",
                title:"We are Ethiopian, not European",
                body:"Most international tour operators to Ethiopia are based in London, Amsterdam, or Cape Town. Their specialists last visited two years ago. Our specialists grew up here. They speak Amharic, Tigrinya, and Afaan Oromoo. They know which guide is actually excellent in Tigray — not which guide has the best website.",
                link:{label:"Meet our specialists",href:"/meet-our-travel-specialists"},
              },
              {
                n:"02",
                title:"Sawla Films changes what you can see before you book",
                body:"We run Sawla Films, our in-house documentary division. You can watch footage of the Simien Mountains, the Omo Valley ceremonies, and the Danakil crater that we filmed ourselves. This is not stock photography — it is evidence.",
                link:{label:"Watch Sawla Films",href:SITE.social.youtube,external:true},
              },
              {
                n:"03",
                title:"We tell you what other operators will not",
                body:"If a destination is not worth your time for your dates, we say so. If a hotel we have recommended has declined, we say so. If security conditions in a region make us uncomfortable, we say so and suggest an alternative. This costs us some sales. It builds permanent trust.",
                link:{label:"How we plan",href:"/how-we-work"},
              },
              {
                n:"04",
                title:"Your guide is a specialist, not a generalist",
                body:"We do not assign whoever is available. For a wildlife itinerary, you get a guide who has spent years in Bale and the Simien. For a Tigray expedition, you get a guide who knows the cliff church access routes personally. For a festival journey, you get someone who understands the liturgical calendar, not just the dates.",
                link:{label:"Meet our guides",href:"/meet-our-guides"},
              },
              {
                n:"05",
                title:"The planning conversation is the journey",
                body:"The best journeys we have designed did not start with a form. They started with a conversation about what a specific traveler wanted to understand, feel, or witness. The route followed from that. We believe that good travel planning takes time, honesty, and attention — and we are willing to invest all three before you confirm anything.",
                link:{label:"Start a conversation",href:"/enquire"},
              },
            ].map((r,i)=>(
              <AnimateIn key={r.n} delay={i*0.06} className="group grid md:grid-cols-[100px_1fr_200px] gap-6 md:gap-12 items-start py-10 border-b border-sand/60 last:border-b-0">
                <div className="font-display text-gold/30 font-light" style={{fontSize:"clamp(2rem,4vw,3rem)"}}>{r.n}</div>
                <div>
                  <h3 className="font-display text-volcanic font-normal leading-snug mb-4" style={{fontSize:"clamp(1.25rem,2vw,1.625rem)"}}>{r.title}</h3>
                  <p className="text-warmgrey font-body leading-relaxed" style={{fontSize:"clamp(1rem,1.1vw,1.0625rem)"}}>{r.body}</p>
                </div>
                <div className="md:pt-2">
                  {r.link.external
                    ? <a href={r.link.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-gold hover:text-volcanic transition-colors font-body font-medium cursor-pointer" style={{fontSize:"12px",letterSpacing:"0.1em",textTransform:"uppercase"}}>{r.link.label} <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg></a>
                    : <Link href={r.link.href} className="inline-flex items-center gap-2 text-gold hover:text-volcanic transition-colors font-body font-medium cursor-pointer" style={{fontSize:"12px",letterSpacing:"0.1em",textTransform:"uppercase"}}>{r.link.label} <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg></Link>
                  }
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── ALL TESTIMONIALS — Pillar 5 (content with intent) ── */}
      <section className="section-padding bg-volcanic" aria-labelledby="testimonials-heading">
        <div className="container-max">
          <AnimateIn className="text-center mb-14">
            <span className="label-eyebrow text-gold">In Their Own Words</span>
            <h2 id="testimonials-heading" className="heading-display text-ivory mt-2" style={{fontSize:"clamp(1.75rem,3.5vw,2.75rem)"}}>
              What Travelers Say About Private Ethiopia Tours
            </h2>
            <p className="text-ivory/60 font-body mt-4 max-w-xl mx-auto" style={{fontSize:"clamp(1rem,1.25vw,1.125rem)"}}>
              Real testimonials from travelers who booked directly with Sawla Tours.
            </p>
          </AnimateIn>
          <AnimateStagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.08}>
            {TESTIMONIALS.filter(t => t.useOn?.includes("testimonials")).slice(0, 6).map(tm=>(
              <blockquote key={tm.id} className="bg-white/5 border border-white/10 rounded-card p-7 flex flex-col hover:bg-white/10 hover:border-gold/25 transition-colors duration-300">
                <div className="flex gap-1 mb-5">
                  {[1,2,3,4,5].map(i=>(<svg key={i} width="13" height="13" viewBox="0 0 14 14" fill="#c9941a" aria-hidden="true"><path d="M7 1l1.68 3.4 3.75.55-2.71 2.64.64 3.73L7 9.77 3.64 11.32l.64-3.73L1.57 4.95l3.75-.55L7 1z"/></svg>))}
                </div>
                <p className="text-ivory/80 font-body italic leading-relaxed flex-1" style={{fontSize:"clamp(0.9375rem,1.1vw,1rem)"}}>{tm.fullQuote}</p>
                <footer className="mt-6 flex items-center gap-3 pt-5 border-t border-white/10">
                  <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-ivory font-body font-medium flex-shrink-0" style={{fontSize:"12px"}}>{tm.initials}</div>
                  <div>
                    <div className="font-body font-medium text-ivory" style={{fontSize:"13px"}}>{tm.name} {tm.countryFlag}</div>
                    <div className="text-ivory/45 font-body mt-0.5" style={{fontSize:"11.5px"}}>{tm.tripType}</div>
                  </div>
                </footer>
              </blockquote>
            ))}
          </AnimateStagger>
          <AnimateIn delay={0.2} className="text-center mt-12">
            <Link href="/testimonials" className="btn-ghost-light">Read All Traveller Stories</Link>
          </AnimateIn>
        </div>
      </section>

      {/* ── COMPARISON TABLE — unique to this page ── */}
      <section className="section-padding bg-ivory" aria-labelledby="compare-heading">
        <div className="container-max">
          <AnimateIn className="text-center mb-12">
            <span className="label-eyebrow">How We Compare</span>
            <h2 id="compare-heading" className="heading-display text-volcanic mt-2" style={{fontSize:"clamp(1.75rem,3.5vw,2.75rem)"}}>Local vs. International Ethiopia Operators</h2>
          </AnimateIn>
          <AnimateIn className="overflow-x-auto">
            <table className="w-full border-collapse" role="table" aria-label="Comparison of Sawla Tours vs international operators">
              <thead>
                <tr className="border-b-2 border-volcanic">
                  <th scope="col" className="text-left py-3 pr-6 font-body font-medium text-volcanic" style={{fontSize:"11px",letterSpacing:"0.1em",textTransform:"uppercase"}}>Factor</th>
                  <th scope="col" className="py-3 px-6 font-body font-medium text-volcanic" style={{fontSize:"11px",letterSpacing:"0.1em",textTransform:"uppercase"}}>Sawla Tours</th>
                  <th scope="col" className="py-3 pl-6 font-body font-medium text-warmgrey" style={{fontSize:"11px",letterSpacing:"0.1em",textTransform:"uppercase"}}>International operators</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Based in","Addis Ababa, Ethiopia","London, Cape Town, Amsterdam"],
                  ["Guide knowledge","Region-specific specialists","Generalist guides"],
                  ["Country insight","Current — we live here","Last visited: varies"],
                  ["Documentary division","Sawla Films (in-house)","None"],
                  ["Planning approach","Tailor-made from conversation","Packages from catalogue"],
                  ["Security updates","Real-time, local sources","Government advisories"],
                  ["In-trip support","Same team throughout","Sub-contracted locally"],
                ].map(([factor,sawla,intl],i)=>(
                  <tr key={factor} className={i%2===0?"bg-gold-faint/30":"bg-transparent"}>
                    <td className="py-4 pr-6 font-body font-medium text-volcanic" style={{fontSize:"14px"}}>{factor}</td>
                    <td className="py-4 px-6 text-center">
                      <div className="inline-flex items-center gap-2 text-volcanic font-body" style={{fontSize:"13.5px"}}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M2 7l4 4 6-7" stroke="#c9941a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        {sawla}
                      </div>
                    </td>
                    <td className="py-4 pl-6 text-center text-warmgrey font-body" style={{fontSize:"13.5px"}}>{intl}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </AnimateIn>
        </div>
      </section>

      {/* ── PROOF PAGES STRIP ── */}
      <section className="py-12 bg-gold-faint/50 border-t border-sand/60">
        <div className="container-max">
          <AnimateIn className="text-center mb-8">
            <span className="label-eyebrow">See for Yourself</span>
            <h2 className="font-display text-volcanic font-light mt-1" style={{fontSize:"clamp(1.25rem,2.25vw,1.75rem)"}}>
              Everything Above Is on the Record
            </h2>
          </AnimateIn>
          <AnimateStagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4" staggerDelay={0.06}>
            {[
              { label: "About Sawla Tours", desc: "Founder story, team, timeline", href: "/about-us" },
              { label: "Meet Our Guides", desc: "Region-specific field specialists", href: "/meet-our-guides" },
              { label: "Meet Our Specialists", desc: "Who plans your journey", href: "/meet-our-travel-specialists" },
              { label: "Traveller Stories", desc: "16 verified client accounts", href: "/testimonials" },
            ].map(p => (
              <Link key={p.href} href={p.href}
                className="group bg-white border border-sand rounded-card p-5 hover:border-gold/40 transition-colors duration-300">
                <h3 className="font-display text-volcanic font-normal group-hover:text-gold transition-colors leading-snug" style={{fontSize:"clamp(1rem,1.5vw,1.125rem)"}}>{p.label}</h3>
                <p className="text-warmgrey font-body mt-1.5" style={{fontSize:"12.5px"}}>{p.desc}</p>
                <div className="mt-3 inline-flex items-center gap-1 text-gold font-body font-medium" style={{fontSize:"11px",letterSpacing:"0.1em",textTransform:"uppercase"}}>
                  View
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </Link>
            ))}
          </AnimateStagger>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="bg-volcanic py-20 text-center">
        <div className="container-max">
          <AnimateIn>
            <h2 className="heading-display text-ivory mb-6" style={{fontSize:"clamp(1.75rem,3.5vw,2.75rem)"}}>
              Convinced? Start a Conversation.
            </h2>
            <p className="text-ivory/65 font-body max-w-lg mx-auto mb-8 leading-relaxed" style={{fontSize:"clamp(1rem,1.25vw,1.125rem)"}}>
              No pressure, no packages. Just an Ethiopia specialist who will listen and design something worth traveling for.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/enquire" className="btn-gold py-4 px-10">Start Planning</Link>
              <Link href="/about-us" className="btn-ghost-light">About Sawla Tours</Link>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  )
}
