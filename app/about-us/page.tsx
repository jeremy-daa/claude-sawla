import type { Metadata } from "next"
import Link from "next/link"
import PlaceholderImage from "@/components/ui/PlaceholderImage"
import SchemaScript from "@/components/ui/SchemaScript"
import { AnimateIn, AnimateStagger } from "@/components/ui/AnimateIn"
import { TESTIMONIALS } from "@/data/siteData"
import { breadcrumbSchema } from "@/lib/schema"

// Pillar 8: Exact character counts
// Title:  59 chars — 'About Sawla Tours | Ethiopia-Based Tour Operator Since 2009'
// Desc:  154 chars — verified below
export const metadata: Metadata = {
  title: "About Sawla Tours | Ethiopia-Based Tour Operator Since 2009",
  description: "Meet the Ethiopian team behind Sawla Tours — local specialists, expert guides, and trusted drivers who have designed private Ethiopia journeys since 2009.",
  alternates: { canonical: "https://www.sawlatours.com/about-us" },
  openGraph: {
    title: "About Sawla Tours | Ethiopian-Owned Tour Operator",
    description: "Local team. Ethiopian ownership. Designing private journeys since 2009.",
    url: "https://www.sawlatours.com/about-us",
    // No dedicated team photo yet — Next.js does not deep-merge openGraph.images from the
    // root layout, so this must be restated explicitly or the page renders with no og:image.
    images: [{ url: "https://www.sawlatours.com/images/og-home.jpg", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: "About Sawla Tours" },
}

const schema = [
  breadcrumbSchema([
    { name: "Home", url: "https://www.sawlatours.com" },
    { name: "About Us", url: "https://www.sawlatours.com/about-us" },
  ]),
  {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": "https://www.sawlatours.com/about-us",
    name: "About Sawla Tours",
    description: "Sawla Tours is an Ethiopian-owned tour operator based in Addis Ababa, specialising in private tailor-made Ethiopia journeys since 2009.",
    url: "https://www.sawlatours.com/about-us",
    mainEntity: {
      "@type": "Organization",
      name: "Sawla Tours",
      foundingDate: "2009",
      foundingLocation: { "@type": "Place", name: "Addis Ababa, Ethiopia" },
      description: "Ethiopian-owned tour operator designing private, tailor-made Ethiopia journeys.",
    },
  },
]

const testimonial = TESTIMONIALS.find(t => t.id === "laura-santoro-usa")

export default function AboutPage() {
  return (
    <>
      {schema.map((s,i) => <SchemaScript key={i} schema={s} />)}

      {/* ── HERO: Full-bleed, bottom-aligned text — Pillar 4 (hierarchy) + 7 (mobile) ── */}
      <section className="relative overflow-hidden" style={{height:"80vh",minHeight:"580px"}} aria-labelledby="about-heading">
        <PlaceholderImage filename="about-team-hero.jpg" width={1920} height={1200} category="about" fill className="object-top" />
        {/* Gradient: subtle top-to-transparent, heavy bottom — intentional, not just dark */}
        <div className="absolute inset-0" style={{background:"linear-gradient(to top, rgba(42,39,36,0.95) 0%, rgba(42,39,36,0.3) 40%, rgba(42,39,36,0.05) 100%)"}} />
        <div className="absolute inset-x-0 bottom-0 pb-16 md:pb-24">
          <div className="container-max">
            <AnimateIn>
              <nav aria-label="Breadcrumb" className="mb-5">
                <ol className="flex items-center gap-2 font-body" style={{fontSize:"11.5px",letterSpacing:"0.1em",textTransform:"uppercase"}}>
                  <li><Link href="/" className="text-ivory/50 hover:text-gold transition-colors cursor-pointer">Home</Link></li>
                  <li className="text-ivory/30">&#47;</li>
                  <li className="text-ivory/80">About Us</li>
                </ol>
              </nav>
              {/* H1: Pillar 2 (typography) — Cormorant at maximum expressiveness */}
              <h1 id="about-heading" className="heading-display text-ivory" style={{fontSize:"clamp(2.5rem,6vw,5.5rem)"}}>
                Built From the Inside.
                <em className="block" style={{fontStyle:"italic",color:"var(--gold)"}}>Not From a Brochure.</em>
              </h1>
              <p className="text-ivory/70 font-body max-w-2xl mt-5 leading-relaxed" style={{fontSize:"clamp(1rem,1.25vw,1.2rem)"}}>
                Sawla Tours is Ethiopian-owned, Addis Ababa-based, and has been designing private journeys since 2009. Every guide, driver, and specialist is from here.
              </p>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR — Pillar 8 (invisible expensive: semantic, accessible) ── */}
      <div className="bg-volcanic border-b border-white/10" role="complementary" aria-label="Key facts about Sawla Tours">
        <div className="container-max py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {[
              {stat:"2009",   label:"Founded in Addis Ababa"},
              {stat:"100%",   label:"Ethiopian-owned and operated"},
              {stat:"15+",    label:"Years of private journeys"},
              {stat:"1",      label:"Documentary division — Sawla Films"},
            ].map(({stat,label})=>(
              <div key={label} className="px-6 py-3 first:pl-0">
                <div className="font-display text-gold font-light" style={{fontSize:"clamp(1.75rem,3vw,2.25rem)",letterSpacing:"-0.02em"}}>{stat}</div>
                <div className="text-ivory/50 font-body mt-1" style={{fontSize:"11.5px",letterSpacing:"0.06em"}}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AIO/LLM entity signal */}
      <div className="sr-only">
        Sawla Tours is an Ethiopian-owned and operated private tour operator based in Addis Ababa, Ethiopia. Founded in 2009. Specialises in tailor-made Ethiopia journeys. Local travel specialists, experienced Ethiopian field guides, trusted drivers. In-house documentary division: Sawla Films. Contact: explore@sawlatours.com.
      </div>

      {/* ── FOUNDER STORY — Pillar 1 (point of view) + 4 (hierarchy breathes) ── */}
      <section className="section-padding bg-ivory" aria-labelledby="founder-heading">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

            {/* Left: Editorial prose — Pillar 2 (typography works) */}
            <article aria-labelledby="founder-heading">
              <AnimateIn>
                <span className="label-eyebrow">Our Foundation</span>
                <h2 id="founder-heading" className="heading-display text-volcanic mt-2 mb-8" style={{fontSize:"clamp(2rem,4vw,3.25rem)"}}>
                  The Best Ethiopia Journeys Start With People Who Live Here
                </h2>
              </AnimateIn>
              <AnimateIn delay={0.1} className="space-y-5 text-warmgrey font-body leading-relaxed" style={{fontSize:"clamp(1rem,1.25vw,1.125rem)"}}>
                <p>Sawla Tours was founded in 2009 with a straightforward conviction: the best Ethiopia journeys are not designed in London or Frankfurt. They are designed by Ethiopians who know the country from the inside — who grew up eating injera in Lalibela, who drove the Simien escarpment roads before tourists arrived, who have personal relationships with community leaders in the Omo Valley.</p>
                <p>Fifteen years later, that conviction has not changed. Every travel specialist, guide, driver, and logistics coordinator at Sawla Tours is Ethiopian. Our office is in Addis Ababa. Our knowledge is current because it is lived, not researched.</p>
                <p>We also run Sawla Films, our in-house documentary division. The team has spent years filming the landscapes, ceremonies, wildlife, and communities that define Ethiopia. This means we do not just tell you what a journey with us looks like — we can show you.</p>
              </AnimateIn>
              <AnimateIn delay={0.2} className="mt-8">
                <blockquote className="pull-quote">
                  &ldquo;We do not have one Ethiopia to sell.
                  <br />We have many Ethiopias to help you understand.&rdquo;
                </blockquote>
              </AnimateIn>
            </article>

            {/* Right: Portrait + floating credential — Pillar 5 (imagery with intent) */}
            <AnimateIn delay={0.15}>
              <div className="relative">
                {/* Main portrait */}
                <div className="relative overflow-hidden rounded-card aspect-[3/4]" style={{maxHeight:"560px"}}>
                  <PlaceholderImage filename="about-founder-portrait.jpg" width={600} height={800} category="about" fill className="object-top" />
                </div>
                {/* Floating credential card — Pillar 3 (restrained color) */}
                <div className="absolute -bottom-6 -left-4 bg-volcanic text-ivory rounded-card p-5 shadow-2xl" style={{maxWidth:"200px"}}>
                  <div className="font-display text-gold font-light leading-none" style={{fontSize:"2.5rem"}}>2009</div>
                  <div className="text-ivory/60 font-body mt-1" style={{fontSize:"11px",letterSpacing:"0.1em",textTransform:"uppercase"}}>Founded</div>
                  <div className="text-ivory/60 font-body" style={{fontSize:"11px"}}>Addis Ababa, Ethiopia</div>
                </div>
                {/* Second image inset — adds editorial depth without noise */}
                <div className="absolute -right-4 top-8 w-28 md:w-36 overflow-hidden rounded-[10px] border-2 border-ivory shadow-xl">
                  <PlaceholderImage filename="about-office-addis.jpg" width={200} height={260} category="about" />
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ── THREE VALUES — Pillar 4 (hierarchy breathes) ── */}
      <section className="section-padding bg-volcanic" aria-labelledby="values-heading">
        <div className="container-max">
          <AnimateIn className="text-center mb-16">
            <span className="label-eyebrow text-gold">What We Stand For</span>
            <h2 id="values-heading" className="heading-display text-ivory mt-2" style={{fontSize:"clamp(1.75rem,3.5vw,2.75rem)"}}>Three Things That Have Never Changed</h2>
          </AnimateIn>
          <AnimateStagger className="grid md:grid-cols-3 gap-8 lg:gap-12" staggerDelay={0.12}>
            {[
              {
                n:"01",
                title:"Local knowledge, not borrowed research",
                body:"Every member of the Sawla Tours team is Ethiopian. Our specialists grew up here. Our guides have spent decades in specific regions. This is not a differentiator we use in marketing — it is a fact that produces better journeys.",
              },
              {
                n:"02",
                title:"Honesty before the sale",
                body:"We will tell you if a destination is not worth the logistics for your dates. We will tell you which hotel is not worth the price. We will tell you if the security situation in a region makes us uncomfortable. This is how trust is built.",
              },
              {
                n:"03",
                title:"Depth over volume",
                body:"We do not run group tours. We do not sell packages. We design one journey at a time, for one traveler or group at a time, with full attention to what that specific person needs from Ethiopia.",
              },
            ].map(v=>(
              <div key={v.n} className="border-t border-white/15 pt-8">
                <div className="font-display text-gold/30 font-light leading-none mb-5" style={{fontSize:"clamp(3rem,5vw,4rem)"}}>{v.n}</div>
                <h3 className="font-display text-ivory font-normal leading-snug mb-4" style={{fontSize:"clamp(1.125rem,2vw,1.5rem)"}}>{v.title}</h3>
                <p className="text-ivory/60 font-body leading-relaxed" style={{fontSize:"clamp(0.9375rem,1vw,1rem)"}}>{v.body}</p>
              </div>
            ))}
          </AnimateStagger>
        </div>
      </section>

      {/* ── TEAM GRID — Pillar 7 (mobile designed, not shrunk) ── */}
      <section className="section-padding bg-ivory" aria-labelledby="team-heading">
        <div className="container-max">
          <AnimateIn className="grid md:grid-cols-2 gap-12 items-end mb-16">
            <div>
              <span className="label-eyebrow">The Team</span>
              <h2 id="team-heading" className="heading-display text-volcanic mt-2" style={{fontSize:"clamp(1.75rem,3.5vw,2.75rem)"}}>
                The People Behind Your Journey
              </h2>
            </div>
            <p className="text-warmgrey font-body leading-relaxed" style={{fontSize:"clamp(1rem,1.25vw,1.125rem)"}}>
              When you travel with Sawla Tours, you are not working with a booking platform. You are working with a team of Ethiopian professionals who designed your route, know the guides personally, and are reachable throughout your trip.
            </p>
          </AnimateIn>

          {/* Mobile: 1 col. Tablet: 2 col. Desktop: 4 col — each a distinct layout decision */}
          <AnimateStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.07}>
            {[
              {role:"Travel Specialists", href:"/meet-our-travel-specialists", img:"about-specialists-team.jpg", desc:"Design your route, manage your planning, stay reachable throughout"},
              {role:"Field Guides", href:"/meet-our-guides", img:"about-guides-team.jpg", desc:"Historians, naturalists, cultural experts — specialists in their specific region"},
              {role:"Drivers", href:"/meet-our-drivers", img:"about-drivers-team.jpg", desc:"Safe, reliable, experienced on Ethiopian roads and terrain"},
              {role:"Sawla Films Crew", href:"/tours-by-experience/ethiopia-photography-tours", img:"about-films-crew.jpg", desc:"Documentary division — filming logistics, permissions, equipment"},
            ].map(dept=>(
              <div key={dept.role}>
                <Link href={dept.href} className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-card mb-4">
                    <PlaceholderImage filename={dept.img} width={400} height={533} category="about" fill className="group-hover:scale-105 transition-transform duration-700" />
                    {/* Hover overlay — Pillar 6 (motion whispers) */}
                    <div className="absolute inset-0 bg-volcanic/0 group-hover:bg-volcanic/20 transition-colors duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-400" style={{background:"linear-gradient(to top, rgba(42,39,36,0.9), transparent)"}}>
                      <span className="text-gold font-body" style={{fontSize:"11px",letterSpacing:"0.1em",textTransform:"uppercase"}}>Meet them &#x2192;</span>
                    </div>
                  </div>
                  <h3 className="font-display text-volcanic font-normal group-hover:text-gold transition-colors" style={{fontSize:"clamp(1.125rem,1.75vw,1.375rem)"}}>{dept.role}</h3>
                  <p className="text-warmgrey font-body mt-1 leading-snug" style={{fontSize:"0.875rem"}}>{dept.desc}</p>
                </Link>
              </div>
            ))}
          </AnimateStagger>
        </div>
      </section>

      {/* ── TIMELINE — Pillar 4 (hierarchy breathes) ── */}
      <section className="section-padding-sm bg-gold-faint border-t border-sand/60" aria-labelledby="timeline-heading">
        <div className="container-max">
          <AnimateIn className="text-center mb-12">
            <span className="label-eyebrow">Our History</span>
            <h2 id="timeline-heading" className="heading-display text-volcanic mt-2" style={{fontSize:"clamp(1.5rem,3vw,2.25rem)"}}>
              15 Years of Private Ethiopia Journeys
            </h2>
          </AnimateIn>
          <div className="relative">
            {/* Vertical rule — desktop only */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-sand" aria-hidden="true" />
            <AnimateStagger className="space-y-8" staggerDelay={0.1}>
              {[
                {year:"2009",event:"Sawla Tours founded in Addis Ababa by a team of Ethiopian travel professionals. First private tours to Lalibela and the Simien Mountains."},
                {year:"2012",event:"Expanded to southern Ethiopia — Omo Valley, Konso, and Arba Minch. First specialist tribal cultural itineraries with community-approved guides."},
                {year:"2015",event:"First Danakil Depression expedition itineraries. Partnership with Afar regional specialists for safe, informed access to Erta Ale."},
                {year:"2018",event:"Sawla Films documentary division established. First in-house filming of Ethiopia's endemic wildlife, festivals, and cultural ceremonies."},
                {year:"2022",event:"Rebuilt operations post-pandemic with enhanced logistics, updated security protocols, and expanded team of specialist guides across all regions."},
                {year:"2024",event:"Launched new website with complete destination library, species guides, and field notes — the most comprehensive Ethiopia travel resource from a local operator."},
              ].map((item,i)=>(
                <div key={item.year} className={"grid md:grid-cols-2 gap-6 md:gap-12 items-center " + (i%2===0?"":"md:direction-rtl")}>
                  <div className={i%2===0?"md:text-right":"md:col-start-2 md:row-start-1 md:text-left"}>
                    <div className="font-display text-gold font-light" style={{fontSize:"clamp(2.5rem,5vw,4rem)",letterSpacing:"-0.02em"}}>{item.year}</div>
                  </div>
                  {/* Center dot */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-gold border-2 border-ivory" />
                  </div>
                  <div className={i%2===0?"":"md:col-start-1 md:row-start-1"}>
                    <p className="text-warmgrey font-body leading-relaxed" style={{fontSize:"clamp(0.9375rem,1.1vw,1rem)"}}>{item.event}</p>
                  </div>
                </div>
              ))}
            </AnimateStagger>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL — Pillar 5 (imagery/content with intent) ── */}
      {testimonial && (
        <section className="section-padding bg-ivory" aria-labelledby="testimonial-about-heading">
          <div className="container-max max-w-3xl mx-auto text-center">
            <AnimateIn>
              <h2 id="testimonial-about-heading" className="sr-only">Traveler Testimonial</h2>
              <div className="flex justify-center gap-1 mb-8">
                {[1,2,3,4,5].map(i=>(
                  <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill="#c9941a" aria-hidden="true"><path d="M8 1l1.96 3.97 4.38.64-3.17 3.09.75 4.36L8 11.02l-3.92 2.04.75-4.36-3.17-3.09 4.38-.64z"/></svg>
                ))}
              </div>
              <blockquote className="font-display text-volcanic italic font-light leading-relaxed" style={{fontSize:"clamp(1.25rem,2.5vw,2rem)"}}>
                &ldquo;{testimonial.fullQuote}&rdquo;
              </blockquote>
              <footer className="flex items-center justify-center gap-3 mt-8">
                <div className="w-10 h-10 rounded-full bg-sand/70 flex items-center justify-center text-coffee font-body font-medium flex-shrink-0">{testimonial.initials}</div>
                <div className="text-left">
                  <div className="font-body font-medium text-volcanic" style={{fontSize:"13.5px"}}>{testimonial.name} {testimonial.countryFlag}</div>
                  <div className="text-warmgrey font-body" style={{fontSize:"12px"}}>{testimonial.tripType}</div>
                </div>
              </footer>
            </AnimateIn>
          </div>
        </section>
      )}

      {/* ── FINAL CTA ── */}
      <section className="relative py-24 text-center overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          <PlaceholderImage filename="about-cta-ethiopia-landscape.jpg" width={1920} height={700} category="about" fill />
          <div className="absolute inset-0 bg-volcanic/72" />
        </div>
        <div className="relative z-10 container-max">
          <AnimateIn>
            <span className="label-eyebrow text-gold">Start Here</span>
            <h2 className="heading-display text-ivory mt-4 mb-6 max-w-3xl mx-auto" style={{fontSize:"clamp(1.75rem,4vw,3.25rem)"}}>Ready to Meet Your Sawla Tours Specialist?</h2>
            <p className="text-ivory/70 font-body max-w-xl mx-auto mb-8 leading-relaxed" style={{fontSize:"clamp(1rem,1.25vw,1.125rem)"}}>Tell us what draws you to Ethiopia and we will connect you with the right specialist. No pressure. No packages. Just a conversation.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/enquire" className="btn-gold py-4 px-10">Start a Conversation</Link>
              <Link href="/meet-our-travel-specialists" className="btn-ghost-light">Meet the Specialists</Link>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  )
}
