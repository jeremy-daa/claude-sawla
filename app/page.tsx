import type { Metadata } from "next"
import Link from "next/link"
import PlaceholderImage from "@/components/ui/PlaceholderImage"
import { AnimateIn, AnimateStagger } from "@/components/ui/AnimateIn"
import HeroSection from "@/components/home/HeroSection"
import TripWizard from "@/components/home/TripWizard"
import { TOUR_STYLES, TESTIMONIALS, MOMENTS_ARTICLES, SITE } from "@/data/siteData"
import { PREMIUM_DESTINATIONS } from "@/data/destinationsPremium"
import { ITINERARIES, getItinerary } from "@/data/itineraryData"

const destinationCount = PREMIUM_DESTINATIONS.length
const itineraryCount = ITINERARIES.length

export const metadata: Metadata = {
  title: "Private Ethiopia Tours by Local Experts | Sawla Tours",
  description: `Sawla Tours designs private Ethiopia journeys across Lalibela, Simien, Omo Valley, Danakil, and ${destinationCount} destinations. Ethiopian team, 15+ years. No packages.`,
  alternates: { canonical: "https://www.sawlatours.com" },
  openGraph: {
    title: "Private Ethiopia Tours by Local Experts | Sawla Tours",
    description: `Private, tailor-made Ethiopia journeys across Lalibela, Simien, Omo Valley, Danakil and ${destinationCount} destinations — designed by an Ethiopia-based team since 2009.`,
    url: "https://www.sawlatours.com",
    images: [{ url: "https://www.sawlatours.com/images/og-home.jpg", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: "Private Ethiopia Tours by Local Experts | Sawla Tours" },
}

const featuredDests = PREMIUM_DESTINATIONS.filter(d => d.featured)
const homeTestimonials = TESTIMONIALS.filter(t => ["andrew-bart-usa","keith-blodgett","maureen-mason-au"].includes(t.id))

// Signature journeys — hand-picked to span six categories, real V13 itinerary data
const SIGNATURE_JOURNEYS = [
  { slug: "classic-northern-ethiopia-10-days",       hook: "The definitive first journey — Lake Tana, Gondar, Lalibela." },
  { slug: "omo-valley-complete-10-days",             hook: "Hamar, Karo, Mursi and Daasanach — on their own terms." },
  { slug: "danakil-north-circuit-9-days",            hook: "A live volcano at night, ancient churches by dawn." },
  { slug: "bale-simien-wolf-gelada-12-days",         hook: "Ethiopian wolf and gelada — the endemic wildlife circuit." },
  { slug: "timkat-ethiopia-7-days",                  hook: "Epiphany at Fasilides' Bath — Ethiopia's greatest festival." },
  { slug: "photography-complete-expedition-14-days", hook: "Four genres of light, with Sawla Films support throughout." },
].map(({ slug, hook }) => ({ itin: getItinerary(slug), hook }))
 .filter((j): j is { itin: NonNullable<ReturnType<typeof getItinerary>>; hook: string } => Boolean(j.itin))

// Homepage tour-style grid — curated to 7 entry points; all 9 real style pages remain reachable via nav/hub
const HOME_TOUR_STYLES = [
  { slug: "historic-cultural-ethiopia-tours",  label: "History & Faith" },
  { slug: "omo-valley-cultural-tours",         label: "Omo & Community Journeys" },
  { slug: "ethiopia-photography-tours",        label: "Photography" },
  { slug: "ethiopia-wildlife-tours",           label: "Wildlife & Birding" },
  { slug: "ethiopia-adventure-tours",          label: "Trekking & Remote Landscapes" },
  { slug: "ethiopia-festival-tours",           label: "Festivals & Pilgrimage" },
  { slug: "ethiopia-special-interest-tours",   label: "Coffee & Special Interests" },
].map(({ slug, label }) => ({ ...TOUR_STYLES.find(s => s.slug === slug)!, label }))

// Foundation pillars — condensed from /sawla-foundation (the four most traveler-relevant of its six)
const FOUNDATION_PILLARS = [
  { title: "Community Employment",      body: "Every guide, driver, specialist and camp crew member is Ethiopian — hired from the regions we visit, so each journey supports local household income directly." },
  { title: "Conservation Partnerships", body: "We work alongside wildlife research teams and park authorities in Bale, Simien and the Omo Valley to support the habitats our travelers come to see." },
  { title: "Cultural Respect",          body: "Before sensitive community visits — especially the Omo Valley — travelers are briefed on consent, protocols and respectful engagement. We reject extractive tourism." },
  { title: "Education Support",         body: "A portion of each confirmed journey contributes to educational support in the regions where sustainable tourism is most fragile and most impactful." },
]

// Specialist desks — summarized from /meet-our-travel-specialists (real desks, not invented people)
const SPECIALIST_DESKS = [
  { name: "Senior Specialist Team",   since: "Since 2009", focus: "Historic north, Danakil and trekking routes", regions: "Lalibela · Gondar · Simien · Tigray" },
  { name: "Wildlife & Birding Desk",  since: "Since 2012", focus: "Endemic mammals and 800+ recorded bird species", regions: "Bale · Simien · Yabello · Awash" },
  { name: "Cultural & Tribal Desk",   since: "Since 2010", focus: "Community access built on long-standing relationships", regions: "Omo Valley · Konso · Harar · Festivals" },
]

/* ── SVG Icons (no emoji) ──────────────────────── */
const IconEthiopia = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.4"/><path d="M10 3v14M3 10h14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>)
const IconStar     = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 2l2.39 4.84 5.34.78-3.87 3.77.91 5.32L10 14.27l-4.77 2.44.91-5.32L2.27 7.62l5.34-.78L10 2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>)
const IconCalendar = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="2.5" y="4" width="15" height="13" rx="2" stroke="currentColor" strokeWidth="1.4"/><path d="M2.5 8h15M7 2v3M13 2v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>)
const IconArrow    = () => (<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M1 7h12M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>)
const IconCompass  = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.4"/><path d="M13 7l-2 5-4 1.5L9 8l4-1z" fill="currentColor" opacity=".6"/></svg>)

export default function HomePage() {
  return (
    <>
      {/* homepageSchema is injected once globally from app/layout.tsx <head> —
          rendering it here too duplicated the entire Organization graph on the homepage */}

      {/* ══ 1. HERO ══════════════════════════════════════════════════════ */}
      <HeroSection destinationCount={destinationCount} itineraryCount={itineraryCount} />

      {/* ══ 2. TRUST BAR ══════════════════════════════════════════════════ */}
      <section className="bg-volcanic border-b border-white/10" aria-label="About Sawla Tours">
        <div className="container-max py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              { Icon: IconEthiopia, title: "Ethiopia-based team",  sub: "Local team, in-country expertise" },
              { Icon: IconCompass,  title: "Private by design",    sub: "Routes shaped around your interest & pace" },
              { Icon: IconStar,     title: "Highly rated",         sub: "More than 80% of clients through referrals" },
              { Icon: IconCalendar, title: "Est. 2009",            sub: "15+ years designing private journeys" },
            ].map(({ Icon, title, sub }) => (
              <div key={title} className="flex items-center gap-3 py-2">
                <span className="text-gold/70 flex-shrink-0"><Icon /></span>
                <div>
                  <div className="text-ivory text-[13px] font-medium font-body tracking-wide">{title}</div>
                  <div className="text-ivory/60 text-xs font-body leading-snug">{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AIO Entity Block - crawler visible, screen-reader only */}
      <div className="sr-only" aria-hidden="false">
        <p>Sawla Tours is an Addis Ababa-based Ethiopia tour operator founded in 2009, specialising in private, tailor-made Ethiopia journeys. The company designs cultural, historic, wildlife, birding, photography, tribal, festival, and adventure tours. Local specialists, experienced Ethiopian guides, trusted drivers, and Sawla Films in-house documentary division.</p>
      </div>

      {/* ══ 3. DECLARATION + WHY SAWLA (merged) ══════════════════════════ */}
      <section className="section-padding bg-ivory" aria-labelledby="declaration-heading">
        <div className="container-max">
          <div className="max-w-4xl mx-auto">
            <AnimateIn delay={0}><span className="label-eyebrow">Our Approach</span></AnimateIn>
            <AnimateIn delay={0.1}>
              <h2 id="declaration-heading" className="heading-display text-volcanic"
                style={{ fontSize: "clamp(2.5rem,6vw,5.5rem)", marginBottom: "2.5rem" }}>
                Ethiopia Is Not One Journey.
                <span className="block text-gold-ink">It&apos;s Hundreds.</span>
              </h2>
            </AnimateIn>
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <AnimateIn delay={0.2} className="space-y-5 text-warmgrey font-body leading-relaxed" style={{ fontSize: "clamp(1rem,1.25vw,1.125rem)" }}>
                <p>There is no single Ethiopia. There is the Ethiopia of ancient churches carved from living rock. The Ethiopia of highland wolves and endemic birds found nowhere else on earth. The Ethiopia of tribes, ceremonies, and coffee rituals stretching back millennia.</p>
                <p>We are Sawla Tours — an Ethiopia-based team of travel specialists, guides, drivers, and field crews who know all of them. Since 2009, we have designed private journeys for travelers who want more than a highlight reel.</p>
                <Link href="/about-us" className="inline-flex items-center gap-2 text-gold-ink hover:text-volcanic transition-colors text-[12px] font-body tracking-[0.1em] uppercase font-medium mt-2 group cursor-pointer">
                  Meet Our Team <span className="group-hover:translate-x-1 transition-transform"><IconArrow /></span>
                </Link>
              </AnimateIn>
              <AnimateIn delay={0.35}>
                <blockquote className="pull-quote">
                  &ldquo;We do not have a catalogue.
                  <br />We have a conversation.&rdquo;
                </blockquote>
                <div className="divider-gold" />
                <div className="grid grid-cols-3 gap-6 mt-2">
                  {[[`${destinationCount}`,"Destinations"],[`${itineraryCount}`,"Itineraries"],["15+","Years"]].map(([n,l]) => (
                    <div key={l}>
                      <div className="font-display text-volcanic font-light" style={{fontSize:"clamp(1.75rem,3.5vw,2.5rem)",letterSpacing:"-0.02em"}}>{n}</div>
                      <div className="text-warmgrey font-body mt-1" style={{fontSize:"0.75rem",letterSpacing:"0.12em",textTransform:"uppercase"}}>{l}</div>
                    </div>
                  ))}
                </div>
              </AnimateIn>
            </div>

            <div className="mt-20 pt-16 border-t border-sand">
              <AnimateIn className="text-center mb-14">
                <span className="label-eyebrow">Why Sawla</span>
                <h3 className="heading-display text-volcanic mt-1"
                  style={{fontSize:"clamp(1.75rem,3.5vw,2.75rem)"}}>
                  Local Knowledge Is the Difference.
                </h3>
              </AnimateIn>
              <AnimateStagger className="grid md:grid-cols-3 gap-8 lg:gap-12" staggerDelay={0.12}>
                {[
                  { n:"01", title:"Designed in Ethiopia", body:"Every specialist, guide, and driver on your journey is Ethiopian. People who grew up with this country, studied it, and return to it daily.", link:"/meet-our-travel-specialists", label:"Meet our specialists" },
                  { n:"02", title:"Built around your interests", body:"We do not start planning by choosing from a menu. We start by asking what you care about, how you travel, and what you want to feel. The route comes after.", link:"/how-we-work", label:"How we work" },
                  { n:"03", title:"Planned with field reality", body:"Road conditions, altitude, seasonal access, and community protocols shape the route from day one — so the plan you receive is one we know can actually run.", link:"/responsible-travel", label:"Responsible travel" },
                ].map(card => (
                  <article key={card.n} className="group relative border-t border-sand pt-8">
                    <div aria-hidden="true" className="font-display text-gold-ink/80 font-light leading-none mb-5" style={{fontSize:"clamp(3rem,6vw,5rem)"}}>{card.n}</div>
                    <h4 className="font-display text-volcanic font-normal leading-snug mb-4" style={{fontSize:"clamp(1.25rem,2vw,1.625rem)"}}>{card.title}</h4>
                    <p className="text-warmgrey font-body leading-relaxed mb-6" style={{fontSize:"1rem"}}>{card.body}</p>
                    <Link href={card.link} className="inline-flex items-center gap-2 text-gold-ink hover:text-volcanic transition-colors font-body font-medium group cursor-pointer" style={{fontSize:"11.5px",letterSpacing:"0.1em",textTransform:"uppercase"}}>
                      {card.label} <span className="group-hover:translate-x-1 transition-transform"><IconArrow /></span>
                    </Link>
                  </article>
                ))}
              </AnimateStagger>
              <AnimateIn delay={0.2} className="text-center mt-14">
                <p className="text-warmgrey font-body" style={{fontSize:"0.9375rem"}}>
                  We also run Sawla Films, an in-house documentary crew — so you can see what a journey with us actually looks like before you book.{" "}
                  <Link href="/sawla-films" className="text-gold-ink hover:text-volcanic transition-colors font-medium cursor-pointer">Watch Sawla Films →</Link>
                </p>
                <p className="text-warmgrey font-body mt-2" style={{fontSize:"0.9375rem"}}>
                  <Link href="/why-travel-with-sawla-tours" className="text-gold-ink hover:text-volcanic transition-colors font-medium cursor-pointer">Read the full case for traveling with us →</Link>
                </p>
              </AnimateIn>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 4. SIGNATURE JOURNEYS ═════════════════════════════════════════ */}
      <section id="signature-journeys" className="section-padding bg-gold-faint/40 scroll-mt-16" aria-labelledby="signature-journeys-heading">
        <div className="container-max">
          <AnimateIn className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="label-eyebrow">Signature Journeys</span>
              <h2 id="signature-journeys-heading" className="heading-display text-volcanic mt-1"
                style={{fontSize:"clamp(1.75rem,3.5vw,2.75rem)"}}>
                Begin With a Journey Idea. Shape It Around You.
              </h2>
              <p className="text-warmgrey font-body mt-3 max-w-2xl" style={{fontSize:"clamp(0.9375rem,1.2vw,1.0625rem)"}}>
                Real routes our specialists run — each one a starting point that flexes around your dates, pace and interests.
              </p>
            </div>
            <Link href="/tours-by-experience#all-journeys" className="btn-ghost flex-shrink-0">Explore All {itineraryCount} Journeys</Link>
          </AnimateIn>

          <AnimateStagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.08}>
            {SIGNATURE_JOURNEYS.map(({ itin, hook }) => (
              <div key={itin.slug}>
                <Link href={"/tours-by-experience/" + itin.styleSlug + "/" + itin.slug}
                  className="group block bg-white border border-sand rounded-card overflow-hidden card-hover h-full">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <PlaceholderImage filename={"tour-" + itin.slug + "-hero.jpg"} width={600} height={375} category="tour" fill
                      className="group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute left-4 bottom-4 flex flex-wrap gap-2">
                      <span className="rounded-full bg-ivory/95 px-3 py-1 font-body font-medium text-volcanic" style={{fontSize:"11px"}}>{itin.durationLabel}</span>
                      <span className="rounded-full bg-volcanic/85 px-3 py-1 font-body text-ivory" style={{fontSize:"11px"}}>{itin.difficulty}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-volcanic font-normal leading-snug group-hover:text-gold-ink transition-colors mb-2"
                      style={{fontSize:"clamp(1.125rem,1.75vw,1.375rem)"}}>{itin.name}</h3>
                    <p className="text-warmgrey font-body mb-4 leading-relaxed" style={{fontSize:"0.875rem"}}>{hook}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-sand/60">
                      <span className="text-gold-ink font-body font-medium" style={{fontSize:"12.5px"}}>Privately Quoted</span>
                      <span className="inline-flex items-center gap-1.5 text-gold-ink font-body font-medium group-hover:gap-2.5 transition-[gap] duration-200"
                        style={{fontSize:"11px",letterSpacing:"0.1em",textTransform:"uppercase"}}>
                        View Journey <IconArrow />
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </AnimateStagger>
        </div>
      </section>

      {/* ══ 5. FEATURED DESTINATIONS ══════════════════════════════════════ */}
      <section className="section-padding bg-volcanic" aria-labelledby="destinations-heading">
        <div className="container-max">
          <AnimateIn className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="label-eyebrow text-gold">Destinations</span>
              <h2 id="destinations-heading" className="heading-display text-ivory mt-1"
                style={{fontSize:"clamp(1.75rem,3.5vw,2.75rem)"}}>
                The Places That Shape the Journey
              </h2>
            </div>
            <Link href="/ethiopias-popular-destinations"
              className="btn-ghost-light flex-shrink-0">All {destinationCount} Destinations</Link>
          </AnimateIn>

          <AnimateStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.08}>
            {featuredDests.map(dest => (
              <div key={dest.slug} style={{...({} as object)}}>
                <Link href={"/ethiopias-popular-destinations/" + dest.slug}
                  className="group relative overflow-hidden rounded-card aspect-[4/3] block card-hover">
                  <PlaceholderImage
                    filename={"dest-" + dest.slug + "-hero.jpg"}
                    width={600} height={450} category="destination" fill
                    className="group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="image-overlay" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <span className="label-eyebrow text-gold !mb-1 text-[10px]">{dest.region}</span>
                    <h3 className="font-display text-ivory font-light leading-tight"
                      style={{fontSize:"clamp(1.25rem,2.5vw,1.75rem)"}}>{dest.name}</h3>
                    <p className="text-ivory/65 font-body mt-1.5 leading-snug"
                      style={{fontSize:"0.8125rem"}}>{dest.tagline}</p>
                    <div className="flex items-center gap-1.5 mt-3 text-gold"
                      style={{fontSize:"11px",letterSpacing:"0.12em",textTransform:"uppercase"}}>
                      Explore <IconArrow />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </AnimateStagger>
        </div>
      </section>

      {/* ══ 6. TOUR STYLES ════════════════════════════════════════════════ */}
      <section className="section-padding bg-ivory" aria-labelledby="tour-styles-heading">
        <div className="container-max">
          <AnimateIn className="text-center mb-14">
            <span className="label-eyebrow">Experiences</span>
            <h2 id="tour-styles-heading" className="heading-display text-volcanic mt-1"
              style={{fontSize:"clamp(1.75rem,3.5vw,2.75rem)"}}>
              What Brings You to Ethiopia?
            </h2>
            <p className="text-warmgrey font-body mt-4 max-w-2xl mx-auto"
              style={{fontSize:"clamp(1rem,1.25vw,1.125rem)"}}>
              Every journey starts with one of these entry points — and almost always becomes something more.
            </p>
          </AnimateIn>

          <AnimateStagger className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5" staggerDelay={0.07}>
            {HOME_TOUR_STYLES.map(style => (
              <div key={style.slug}>
                <Link href={"/tours-by-experience/" + style.slug}
                  className="group relative overflow-hidden rounded-card aspect-[4/3] block">
                  <PlaceholderImage
                    filename={"home-style-" + style.slug + ".jpg"}
                    width={600} height={450} category="tour" fill
                    className="group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="image-overlay-center group-hover:opacity-90 transition-opacity duration-300" />
                  <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
                    <span className="label-eyebrow text-gold !mb-1 text-[10px]">{style.label}</span>
                    <p className="text-ivory/75 font-body leading-snug" style={{fontSize:"0.8125rem"}}>{style.tagline}</p>
                  </div>
                </Link>
              </div>
            ))}
          </AnimateStagger>

          <AnimateIn delay={0.2} className="text-center mt-10">
            <Link href="/tours-by-experience#all-journeys" className="btn-ghost">See all {itineraryCount} itineraries</Link>
          </AnimateIn>
        </div>
      </section>

      {/* ══ 7. TRIP WIZARD ═══════════════════════════════════════════════ */}
      <section className="section-padding bg-gold-faint" aria-labelledby="wizard-heading">
        <div className="container-max">
          <div className="max-w-3xl mx-auto">
            <AnimateIn className="text-center mb-12">
              <span className="label-eyebrow">Plan Your Journey</span>
              <h2 id="wizard-heading" className="heading-display text-volcanic mt-1"
                style={{fontSize:"clamp(1.75rem,3.5vw,2.75rem)"}}>
                Plan Your Ethiopia Journey in 5 Steps
              </h2>
              <p className="text-warmgrey font-body mt-4" style={{fontSize:"clamp(1rem,1.25vw,1.125rem)"}}>
                Tell us what matters. We will do the rest.
              </p>
            </AnimateIn>
            <AnimateIn delay={0.15} className="bg-ivory rounded-card p-8 md:p-12 border border-sand/60">
              <TripWizard />
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ══ 8. SPECIALIST DESKS ═══════════════════════════════════════════ */}
      <section className="section-padding bg-volcanic" aria-labelledby="specialists-heading">
        <div className="container-max">
          <AnimateIn className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="label-eyebrow text-gold">The People Behind Your Journey</span>
              <h2 id="specialists-heading" className="heading-display text-ivory mt-1"
                style={{fontSize:"clamp(1.75rem,3.5vw,2.75rem)"}}>
                Planned by Specialists, Not a Call Center
              </h2>
            </div>
            <Link href="/meet-our-travel-specialists" className="btn-ghost-light flex-shrink-0">Meet the Whole Team</Link>
          </AnimateIn>
          <AnimateStagger className="grid md:grid-cols-3 gap-6" staggerDelay={0.1}>
            {SPECIALIST_DESKS.map(desk => (
              <div key={desk.name} className="border border-white/10 rounded-card p-7 bg-white/[0.03]">
                <div className="text-gold font-body mb-3" style={{fontSize:"10.5px",letterSpacing:"0.14em",textTransform:"uppercase"}}>{desk.since}</div>
                <h3 className="font-display text-ivory font-light leading-snug mb-3" style={{fontSize:"clamp(1.125rem,1.75vw,1.375rem)"}}>{desk.name}</h3>
                <p className="text-ivory/60 font-body leading-relaxed mb-5" style={{fontSize:"0.875rem"}}>{desk.focus}</p>
                <div className="text-ivory/60 font-body pt-4 border-t border-white/10" style={{fontSize:"11.5px",letterSpacing:"0.06em"}}>{desk.regions}</div>
              </div>
            ))}
          </AnimateStagger>
        </div>
      </section>

      {/* ══ 9. HOW IT WORKS ═══════════════════════════════════════════════ */}
      <section className="section-padding bg-ivory" aria-labelledby="process-heading">
        <div className="container-max">
          <AnimateIn className="max-w-2xl mx-auto text-center mb-16">
            <span className="label-eyebrow">The Process</span>
            <h2 id="process-heading" className="heading-display text-volcanic mt-1"
              style={{fontSize:"clamp(1.75rem,3.5vw,2.75rem)"}}>
              From First Idea to Private Proposal
            </h2>
            <p className="text-warmgrey font-body mt-4" style={{fontSize:"clamp(1rem,1.25vw,1.125rem)"}}>
              No forms to fill in, no packages to choose. Just a conversation.
            </p>
          </AnimateIn>
          <div className="relative">
            <div className="hidden md:block absolute top-7 left-[12.5%] right-[12.5%] h-px bg-sand" aria-hidden="true" />
            <AnimateStagger className="grid md:grid-cols-4 gap-8" staggerDelay={0.1}>
              {[
                { n:"1", t:"You tell us what matters", b:"What to see, feel, understand. How you travel. Send a message and we take it from there." },
                { n:"2", t:"We design your route", b:"A bespoke itinerary built around what you told us, with honest trade-offs and reasons for each choice." },
                { n:"3", t:"We refine it together", b:"Most journeys improve through conversation. Adjust pace, accommodation, destinations. Typically 2-3 refinements." },
                { n:"4", t:"You travel with local support", b:"Your guide, driver, and planning specialist are all reachable. If conditions change, we adapt." },
              ].map(step => (
                <div key={step.n} className="relative z-10 flex flex-col items-start md:items-center text-left md:text-center">
                  <div className="w-14 h-14 rounded-full border border-gold/35 bg-ivory flex items-center justify-center mb-6 flex-shrink-0">
                    <span className="font-display text-gold-ink font-light" style={{fontSize:"1.25rem"}}>{step.n}</span>
                  </div>
                  <h3 className="font-display text-volcanic font-normal leading-snug mb-3" style={{fontSize:"clamp(1.125rem,1.75vw,1.375rem)"}}>{step.t}</h3>
                  <p className="text-warmgrey font-body leading-relaxed" style={{fontSize:"0.875rem"}}>{step.b}</p>
                </div>
              ))}
            </AnimateStagger>
          </div>
          <AnimateIn delay={0.2} className="text-center mt-14">
            <Link href="/enquire" className="btn-primary">Start a Private Enquiry</Link>
          </AnimateIn>
        </div>
      </section>

      {/* ══ 10. PRICING CONFIDENCE ════════════════════════════════════════ */}
      <section className="section-padding bg-gold-faint/40" aria-labelledby="pricing-heading">
        <div className="container-max max-w-3xl mx-auto text-center">
          <AnimateIn>
            <span className="label-eyebrow">Pricing</span>
            <h2 id="pricing-heading" className="heading-display text-volcanic mt-1"
              style={{fontSize:"clamp(1.75rem,3.5vw,2.75rem)"}}>
              Private Journeys, Clearly Quoted.
            </h2>
            <p className="text-warmgrey font-body mt-4 leading-relaxed" style={{fontSize:"clamp(1rem,1.25vw,1.125rem)"}}>
              No price list, no hidden line items. Every proposal is built around your dates, group size, and comfort tier — with the same private guide, vehicle, and field support included from the first quote.
            </p>
            <Link href="/planning-and-pricing" className="btn-ghost inline-block mt-8">How Our Pricing Works</Link>
          </AnimateIn>
        </div>
      </section>

      {/* ══ 11. TESTIMONIALS ══════════════════════════════════════════════ */}
      <section className="section-padding bg-gold-faint/50" aria-labelledby="testimonials-heading">
        <div className="container-max">
          <AnimateIn className="text-center mb-14">
            <span className="label-eyebrow">What Travelers Say</span>
            <h2 id="testimonials-heading" className="heading-display text-volcanic mt-1"
              style={{fontSize:"clamp(1.75rem,3.5vw,2.75rem)"}}>
              In Their Own Words
            </h2>
            <p className="text-warmgrey font-body mt-3" style={{fontSize:"0.875rem"}}>
              Verified traveller reviews — read more on{" "}
              <a href={SITE.social.tripadvisor} target="_blank" rel="noopener noreferrer" className="text-gold-ink hover:underline">TripAdvisor</a>
              {" "}and{" "}
              <a href={SITE.social.google} target="_blank" rel="noopener noreferrer" className="text-gold-ink hover:underline">Google</a>.
            </p>
          </AnimateIn>
          <AnimateStagger className="grid md:grid-cols-3 gap-6" staggerDelay={0.1}>
            {homeTestimonials.map(tm => (
              <blockquote key={tm.id} className="bg-ivory rounded-card p-8 border border-sand/70 flex flex-col card-hover">
                <div className="flex gap-1 mb-5">
                  {[1,2,3,4,5].map(i => (
                    <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="#c9941a" aria-hidden="true">
                      <path d="M7 1l1.68 3.4 3.75.55-2.71 2.64.64 3.73L7 9.77 3.64 11.32l.64-3.73L1.57 4.95l3.75-.55L7 1z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-warmgrey font-body italic leading-relaxed flex-1" style={{fontSize:"1rem"}}>{tm.fullQuote}</p>
                <footer className="mt-8 flex items-center gap-3 pt-6 border-t border-sand/60">
                  <div className="w-10 h-10 rounded-full bg-sand/70 flex items-center justify-center text-coffee text-sm font-body font-medium flex-shrink-0">{tm.initials}</div>
                  <div>
                    <div className="font-body font-medium text-volcanic" style={{fontSize:"13.5px"}}>{tm.name} {tm.countryFlag}</div>
                    <div className="text-warmgrey font-body mt-0.5" style={{fontSize:"12px"}}>{tm.tripType}</div>
                  </div>
                </footer>
              </blockquote>
            ))}
          </AnimateStagger>
          <AnimateIn delay={0.2} className="text-center mt-10">
            <Link href="/testimonials" className="btn-ghost">Read all traveller stories</Link>
          </AnimateIn>
        </div>
      </section>

      {/* ══ 12. SAWLA FOUNDATION ══════════════════════════════════════════ */}
      <section className="section-padding-sm bg-volcanic" aria-labelledby="foundation-heading">
        <div className="container-max">
          <AnimateIn className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="label-eyebrow text-gold">Sawla Foundation</span>
              <h2 id="foundation-heading" className="heading-display text-ivory mt-1"
                style={{fontSize:"clamp(1.75rem,3.5vw,2.75rem)"}}>
                Travel That Leaves Something Behind
              </h2>
              <p className="text-ivory/65 font-body mt-3 max-w-2xl" style={{fontSize:"clamp(0.9375rem,1.2vw,1.0625rem)"}}>
                Every Sawla journey is built on the same commitments — to the people, wildlife and cultures that make Ethiopia worth traveling.
              </p>
            </div>
            <Link href="/sawla-foundation" className="btn-ghost-light flex-shrink-0">How We Give Back</Link>
          </AnimateIn>
          <AnimateStagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5" staggerDelay={0.08}>
            {FOUNDATION_PILLARS.map(pillar => (
              <div key={pillar.title} className="border border-white/10 rounded-card p-6 bg-white/[0.03]">
                <h3 className="font-display text-gold font-light leading-snug mb-3" style={{fontSize:"clamp(1.0625rem,1.5vw,1.25rem)"}}>{pillar.title}</h3>
                <p className="text-ivory/60 font-body leading-relaxed" style={{fontSize:"0.875rem"}}>{pillar.body}</p>
              </div>
            ))}
          </AnimateStagger>
        </div>
      </section>

      {/* ══ 13. SAWLA MOMENTS ═════════════════════════════════════════════ */}
      <section className="section-padding bg-ivory" aria-labelledby="moments-heading">
        <div className="container-max">
          <AnimateIn className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="label-eyebrow">Sawla Moments</span>
              <h2 id="moments-heading" className="heading-display text-volcanic mt-1"
                style={{fontSize:"clamp(1.75rem,3.5vw,2.75rem)"}}>
                From Our Field Notes
              </h2>
            </div>
            <Link href="/sawla-moments" className="btn-ghost flex-shrink-0">All Moments</Link>
          </AnimateIn>
          <AnimateStagger className="grid md:grid-cols-3 gap-6" staggerDelay={0.1}>
            {MOMENTS_ARTICLES.map(article => (
              <div key={article.slug}>
                <Link href={"/sawla-moments/" + article.slug}
                  className="group bg-white rounded-card overflow-hidden border border-sand/60 card-hover block">
                  <div className="relative aspect-[16/9] overflow-hidden bg-sand/30">
                    <PlaceholderImage filename={article.heroImage} width={600} height={337} category="moments" fill
                      className="group-hover:scale-105 transition-transform duration-600" />
                  </div>
                  <div className="p-6">
                    <span className="label-eyebrow text-gold-ink !mb-2">{article.category}</span>
                    <h3 className="font-display text-volcanic font-normal leading-snug mb-3 group-hover:text-gold-ink transition-colors duration-200"
                      style={{fontSize:"clamp(1.125rem,1.75vw,1.375rem)"}}>
                      {article.title}
                    </h3>
                    <p className="text-warmgrey font-body mb-5 leading-relaxed" style={{fontSize:"0.875rem"}}>{article.teaser}</p>
                    <span className="inline-flex items-center gap-1.5 text-gold-ink font-body font-medium group-hover:gap-2.5 transition-[gap] duration-200"
                      style={{fontSize:"11px",letterSpacing:"0.1em",textTransform:"uppercase"}}>
                      {article.readingTime} min read <IconArrow />
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </AnimateStagger>
          <AnimateIn delay={0.2} className="text-center mt-10">
            <p className="text-warmgrey font-body" style={{fontSize:"0.9375rem"}}>
              Planning the practical details? Visit our{" "}
              <Link href="/ethiopia-travel-guide" className="text-gold-ink hover:text-volcanic transition-colors font-medium cursor-pointer">Ethiopia Travel Guide →</Link>
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* ══ 14. FINAL CTA ═════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-32 md:py-44" aria-labelledby="cta-heading">
        <div className="absolute inset-0" aria-hidden="true">
          <PlaceholderImage filename="home-cta-background.jpg" width={1920} height={900} category="home" fill />
          <div className="absolute inset-0 bg-volcanic/72" />
        </div>
        <div className="relative z-10 container-max text-center">
          <AnimateIn>
            <span className="label-eyebrow text-gold">Begin Your Journey</span>
            <h2 id="cta-heading" className="heading-display text-ivory mt-4 mb-6 max-w-3xl mx-auto"
              style={{fontSize:"clamp(2rem,4.5vw,4rem)"}}>
              Tell Us What Draws You to Ethiopia.
            </h2>
            <p className="text-ivory/70 font-body max-w-xl mx-auto mb-10 leading-relaxed"
              style={{fontSize:"clamp(1rem,1.25vw,1.125rem)"}}>
              Your Ethiopia journey starts with a conversation. Our specialists will take it from there.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/enquire" className="btn-gold py-4 px-10">Start Planning Your Journey</Link>
              <Link href="/meet-our-travel-specialists" className="btn-ghost-light">Talk to a Specialist</Link>
            </div>
            <p className="mt-10 text-ivory/60 font-body" style={{fontSize:"11.5px",letterSpacing:"0.14em",textTransform:"uppercase"}}>
              Ethiopia-based team &middot; Private tailor-made journeys &middot; No booking fees to enquire
            </p>
          </AnimateIn>
        </div>
      </section>
    </>
  )
}
