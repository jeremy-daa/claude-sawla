import type { Metadata } from "next"
import Link from "next/link"
import PlaceholderImage from "@/components/ui/PlaceholderImage"
import SchemaScript from "@/components/ui/SchemaScript"
import { AnimateIn, AnimateStagger } from "@/components/ui/AnimateIn"
import { breadcrumbSchema, faqSchema } from "@/lib/schema"
import { DEFAULT_INCLUSIONS, DEFAULT_EXCLUSIONS, PRICING_STATEMENT, PRICING_FACTORS, PLANNING_LEVELS, PRICING_NOTE_REMOTE } from "@/data/itineraryData"

export const metadata: Metadata = {
  title: "Ethiopia Tour Pricing & Planning | Sawla Tours",
  description: "How Sawla Tours prices a private Ethiopia journey — what shapes the quote, what's included, and why every proposal is tailored rather than pulled from a price list.",
  alternates: { canonical: "https://www.sawlatours.com/planning-and-pricing" },
  openGraph: {
    title: "Private Journeys, Clearly Quoted",
    description: "No packages, no hidden costs — how Sawla Tours builds every price quote.",
    images: [{ url: "https://www.sawlatours.com/images/og-home.jpg", width: 1200, height: 630 }],
  },
}

const faqs = [
  { q: "Why don't you publish a fixed price list?", a: "Because two travelers on the same route rarely pay the same amount. Group size, season, comfort tier, and pace all move the number. A price list would either be misleadingly low or unhelpfully padded. A proposal built around your actual trip is more useful than a number that assumes an average traveler." },
  { q: "Is there a fee to receive a quote?", a: "No. Enquiries and proposals are completely free, with no obligation to book." },
  { q: "Are domestic flights included?", a: "Usually they can be included or quoted separately, depending on your proposal — we'll confirm which approach makes sense once we know your route." },
  { q: "Can Sawla work with a specific budget?", a: "Yes, within realistic limits. We can adjust hotels, route, pace and transport style to create the strongest possible journey for your priorities." },
  { q: "How firm is the quote once I receive it?", a: "The figure in your proposal reflects real rates at the time it's issued. It's held for a stated validity window; after that, seasonal rate changes may apply. A deposit locks the quote in." },
  { q: "Can the price change after I confirm?", a: "Only if you change the itinerary, or in the rare case of a force-majeure route change (weather, security, access). Otherwise the confirmed quote is what you pay." },
]

const schema = [
  breadcrumbSchema([
    { name: "Home", url: "https://www.sawlatours.com" },
    { name: "Planning & Pricing", url: "https://www.sawlatours.com/planning-and-pricing" },
  ]),
  faqSchema(faqs),
]

const COMFORT_TIERS = [
  { name: "Comfortable", body: "Solid, well-run mid-range properties. Private guiding and vehicle throughout." },
  { name: "Boutique", body: "Characterful smaller lodges and hotels, chosen for location and service over scale." },
  { name: "Luxury", body: "The best available standard on each route, including remote-area luxury camps where they exist." },
  { name: "No Compromise", body: "Top-tier properties throughout, with added flexibility on pacing and private extras." },
]

const QUOTE_STEPS = [
  { n: "1", t: "Share your travel idea", b: "Tell us your dates, group size, interests and preferred travel style." },
  { n: "2", t: "We review the route carefully", b: "We check season, access, flights, road conditions, hotels, guides and permits." },
  { n: "3", t: "We design a private proposal", b: "Your itinerary is shaped around pace, comfort, budget and special interests." },
  { n: "4", t: "We send a clear quotation", b: "The proposal explains what is included, what is excluded and where costs come from." },
  { n: "5", t: "We refine it together", b: "Hotels, route, duration and comfort level can be adjusted before confirmation." },
]

export default function PlanningAndPricingPage() {
  return (
    <>
      {schema.map((s, i) => <SchemaScript key={i} schema={s} />)}

      {/* ── HERO ── */}
      <section className="relative overflow-hidden" style={{ height: "55vh", minHeight: "400px" }} aria-labelledby="pricing-heading">
        <PlaceholderImage filename="pricing-hero.jpg" width={1920} height={900} category="about" fill />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(42,39,36,0.88) 0%, rgba(42,39,36,0.15) 60%, transparent 100%)" }} />
        <div className="absolute inset-x-0 bottom-0 pb-14">
          <div className="container-max">
            <AnimateIn>
              <nav aria-label="Breadcrumb" className="mb-5">
                <ol className="flex items-center gap-2 font-body" style={{ fontSize: "11.5px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  <li><Link href="/" className="text-ivory/50 hover:text-gold transition-colors cursor-pointer">Home</Link></li>
                  <li className="text-ivory/30">&#47;</li>
                  <li className="text-ivory/80">Planning &amp; Pricing</li>
                </ol>
              </nav>
              <span className="label-eyebrow text-gold">Planning &amp; Pricing</span>
              <h1 id="pricing-heading" className="heading-display text-ivory mt-2" style={{ fontSize: "clamp(2.25rem,5vw,4.5rem)" }}>
                Private Journeys,
                <em className="block" style={{ fontStyle: "italic", color: "var(--gold)" }}>Clearly Quoted.</em>
              </h1>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ── WHY NO PRICE LIST ── */}
      <section className="section-padding bg-ivory">
        <div className="container-max max-w-4xl mx-auto">
          <AnimateIn>
            <h2 className="heading-display text-volcanic mb-6" style={{ fontSize: "clamp(1.5rem,3vw,2.25rem)" }}>We Don&apos;t Sell From a Price List.</h2>
            <p className="text-warmgrey font-body leading-relaxed" style={{ fontSize: "clamp(1rem,1.25vw,1.125rem)" }}>
              {PRICING_STATEMENT}
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* ── WHAT SHAPES YOUR PRICE ── */}
      <section className="section-padding bg-volcanic" aria-labelledby="factors-heading">
        <div className="container-max max-w-4xl mx-auto">
          <AnimateIn className="text-center mb-14 max-w-2xl mx-auto">
            <span className="label-eyebrow text-gold">What Shapes Your Price</span>
            <h2 id="factors-heading" className="heading-display text-ivory mt-2" style={{ fontSize: "clamp(1.75rem,3.5vw,2.75rem)" }}>
              What Affects the Price?
            </h2>
          </AnimateIn>
          <AnimateStagger className="grid sm:grid-cols-2 gap-x-8 gap-y-6" staggerDelay={0.04}>
            {PRICING_FACTORS.map(f => (
              <div key={f.factor} className="border-b border-white/10 pb-4">
                <h3 className="font-display text-ivory font-normal leading-snug mb-1.5" style={{ fontSize: "1rem" }}>{f.factor}</h3>
                <p className="text-ivory/55 font-body leading-relaxed" style={{ fontSize: "0.8125rem" }}>{f.why}</p>
              </div>
            ))}
          </AnimateStagger>
        </div>
      </section>

      {/* ── PLANNING LEVELS ── */}
      <section className="section-padding bg-gold-faint/40" aria-labelledby="planning-levels-heading">
        <div className="container-max max-w-4xl mx-auto">
          <AnimateIn className="text-center mb-14">
            <span className="label-eyebrow">Planning Level</span>
            <h2 id="planning-levels-heading" className="heading-display text-volcanic mt-2" style={{ fontSize: "clamp(1.75rem,3.5vw,2.75rem)" }}>
              What Kind of Journey Are You Planning?
            </h2>
            <p className="text-warmgrey font-body mt-4" style={{ fontSize: "clamp(1rem,1.25vw,1.125rem)" }}>
              Ethiopia isn&apos;t simply luxury versus budget. Sometimes the expensive part isn&apos;t the hotel — it&apos;s the logistics. These four planning levels help us understand what&apos;s actually driving your trip&apos;s cost.
            </p>
          </AnimateIn>
          <AnimateStagger className="grid sm:grid-cols-2 gap-5" staggerDelay={0.08}>
            {PLANNING_LEVELS.map(l => (
              <div key={l.name} className="bg-white border border-sand rounded-card p-6">
                <h3 className="font-display text-volcanic font-normal leading-snug mb-2" style={{ fontSize: "1.125rem" }}>{l.name}</h3>
                <p className="text-warmgrey font-body leading-relaxed" style={{ fontSize: "0.9375rem" }}>{l.body}</p>
              </div>
            ))}
          </AnimateStagger>
        </div>
      </section>

      {/* ── ACCOMMODATION STYLE ── */}
      <section className="section-padding bg-ivory" aria-labelledby="tiers-heading">
        <div className="container-max max-w-4xl mx-auto">
          <AnimateIn className="text-center mb-14">
            <span className="label-eyebrow">Accommodation Style</span>
            <h2 id="tiers-heading" className="heading-display text-volcanic mt-2" style={{ fontSize: "clamp(1.75rem,3.5vw,2.75rem)" }}>
              Choose a Standard, Not a Number
            </h2>
            <p className="text-warmgrey font-body mt-4" style={{ fontSize: "clamp(1rem,1.25vw,1.125rem)" }}>
              Our Trip Wizard and enquiry process work in accommodation tiers rather than fixed budgets, because the right lodging standard for you is a better starting point than a dollar figure.
            </p>
          </AnimateIn>
          <AnimateStagger className="grid sm:grid-cols-2 gap-5" staggerDelay={0.08}>
            {COMFORT_TIERS.map(t => (
              <div key={t.name} className="border border-sand rounded-card p-6">
                <h3 className="font-display text-volcanic font-normal leading-snug mb-2" style={{ fontSize: "1.125rem" }}>{t.name}</h3>
                <p className="text-warmgrey font-body leading-relaxed" style={{ fontSize: "0.9375rem" }}>{t.body}</p>
              </div>
            ))}
          </AnimateStagger>
          <AnimateIn delay={0.2} className="mt-10 p-6 bg-gold-faint/40 border border-gold/25 rounded-card">
            <div className="label-eyebrow !mb-2">For Remote Routes</div>
            <p className="text-warmgrey font-body leading-relaxed" style={{ fontSize: "0.9375rem" }}>{PRICING_NOTE_REMOTE}</p>
          </AnimateIn>
        </div>
      </section>

      {/* ── INCLUSIONS / EXCLUSIONS ── */}
      <section className="section-padding bg-gold-faint/40" aria-labelledby="inclusions-heading">
        <div className="container-max max-w-4xl mx-auto">
          <AnimateIn className="text-center mb-12">
            <span className="label-eyebrow">No Hidden Costs</span>
            <h2 id="inclusions-heading" className="heading-display text-volcanic mt-2" style={{ fontSize: "clamp(1.75rem,3.5vw,2.75rem)" }}>
              What&apos;s In Your Quote, and What Isn&apos;t
            </h2>
          </AnimateIn>
          <div className="grid md:grid-cols-2 gap-10">
            <AnimateIn>
              <h3 className="font-display text-volcanic font-normal mb-4" style={{ fontSize: "1.125rem" }}>Typically included</h3>
              <ul className="space-y-2.5">
                {DEFAULT_INCLUSIONS.map(item => (
                  <li key={item} className="flex gap-2.5 text-warmgrey font-body leading-snug" style={{ fontSize: "0.9375rem" }}>
                    <span className="text-gold-ink flex-shrink-0">&#10003;</span>{item}
                  </li>
                ))}
              </ul>
            </AnimateIn>
            <AnimateIn delay={0.1}>
              <h3 className="font-display text-volcanic font-normal mb-4" style={{ fontSize: "1.125rem" }}>Typically excluded</h3>
              <ul className="space-y-2.5">
                {DEFAULT_EXCLUSIONS.map(item => (
                  <li key={item} className="flex gap-2.5 text-warmgrey/80 font-body leading-snug" style={{ fontSize: "0.9375rem" }}>
                    <span className="text-warmgrey/50 flex-shrink-0">&#8211;</span>{item}
                  </li>
                ))}
              </ul>
            </AnimateIn>
          </div>
          <AnimateIn delay={0.15} className="text-center mt-10">
            <p className="text-warmgrey font-body" style={{ fontSize: "0.875rem" }}>Every itinerary states its specific inclusions and exclusions — this is the site-wide default.</p>
          </AnimateIn>
        </div>
      </section>

      {/* ── QUOTATION PROCESS ── */}
      <section className="section-padding bg-volcanic" aria-labelledby="quote-process-heading">
        <div className="container-max max-w-4xl mx-auto">
          <AnimateIn className="text-center mb-14">
            <span className="label-eyebrow text-gold">The Quotation Process</span>
            <h2 id="quote-process-heading" className="heading-display text-ivory mt-2" style={{ fontSize: "clamp(1.75rem,3.5vw,2.75rem)" }}>
              How Your Quote Is Prepared
            </h2>
          </AnimateIn>
          <AnimateStagger className="space-y-6" staggerDelay={0.08}>
            {QUOTE_STEPS.map(step => (
              <div key={step.n} className="flex gap-5 items-start border-b border-white/10 pb-6 last:border-b-0">
                <div className="w-9 h-9 rounded-full border border-gold/40 flex items-center justify-center flex-shrink-0">
                  <span className="font-display text-gold font-light" style={{ fontSize: "1rem" }}>{step.n}</span>
                </div>
                <div>
                  <h3 className="font-display text-ivory font-normal leading-snug mb-1" style={{ fontSize: "1.0625rem" }}>{step.t}</h3>
                  <p className="text-ivory/55 font-body leading-relaxed" style={{ fontSize: "0.9375rem" }}>{step.b}</p>
                </div>
              </div>
            ))}
          </AnimateStagger>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section-padding bg-ivory" aria-labelledby="faq-heading">
        <div className="container-max max-w-3xl mx-auto">
          <AnimateIn className="mb-10">
            <span className="label-eyebrow">Common Questions</span>
            <h2 id="faq-heading" className="heading-display text-volcanic mt-2" style={{ fontSize: "clamp(1.5rem,3vw,2.25rem)" }}>Before You Enquire</h2>
          </AnimateIn>
          <AnimateStagger className="space-y-3" staggerDelay={0.07}>
            {faqs.map(faq => (
              <details key={faq.q} className="border border-sand rounded-card group">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none font-body font-medium text-volcanic hover:text-gold-ink transition-colors" style={{ fontSize: "13.5px" }}>
                  <span>{faq.q}</span>
                  <span className="ml-4 text-gold-ink text-xl leading-none group-open:rotate-45 transition-transform duration-200 flex-shrink-0">+</span>
                </summary>
                <div className="px-5 pb-5 text-warmgrey font-body leading-relaxed" style={{ fontSize: "13.5px" }}>{faq.a}</div>
              </details>
            ))}
          </AnimateStagger>

          {/* The specifics — deposit amount, balance timing, cancellation tiers, refund
              timelines — live on the policy pages, which are the single source of truth. */}
          <AnimateIn delay={0.1} className="mt-10 p-6 border border-sand rounded-card bg-gold-faint/40">
            <div className="label-eyebrow !mb-2">The Fine Print</div>
            <p className="text-warmgrey font-body leading-relaxed mb-3" style={{ fontSize: "0.9375rem" }}>
              Deposit amounts, balance timing, cancellation tiers and refund timelines are set out in full in our policies:
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <Link href="/booking-terms" className="text-gold-ink hover:underline font-body text-sm">Booking Terms</Link>
              <Link href="/deposit-and-payment-policy" className="text-gold-ink hover:underline font-body text-sm">Deposit &amp; Payment Policy</Link>
              <Link href="/cancellation-policy" className="text-gold-ink hover:underline font-body text-sm">Cancellation &amp; Refund Policy</Link>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="bg-volcanic py-20 text-center">
        <div className="container-max">
          <AnimateIn>
            <span className="label-eyebrow text-gold">Ready for a Real Number?</span>
            <h2 className="heading-display text-ivory mt-4 mb-5" style={{ fontSize: "clamp(1.75rem,3.5vw,2.75rem)" }}>Get a Proposal Built Around Your Trip</h2>
            <p className="text-ivory/65 font-body max-w-md mx-auto mb-8 leading-relaxed" style={{ fontSize: "clamp(1rem,1.25vw,1.125rem)" }}>Free, no-obligation, and built from your actual dates, group size, and interests.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/enquire" className="btn-gold py-4 px-10">Start a Private Enquiry</Link>
              <Link href="/tours-by-experience" className="btn-ghost-light">Browse Journeys First</Link>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  )
}
