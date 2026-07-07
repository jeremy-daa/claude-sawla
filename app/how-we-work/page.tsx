import type { Metadata } from "next"
import Link from "next/link"
import PlaceholderImage from "@/components/ui/PlaceholderImage"
import SchemaScript from "@/components/ui/SchemaScript"
import { AnimateIn, AnimateStagger } from "@/components/ui/AnimateIn"
import { SITE } from "@/data/siteData"
import { breadcrumbSchema, faqSchema } from "@/lib/schema"

export const metadata: Metadata = {
  title: "Sawla Tours Planning Process | Private Ethiopia Tours",
  description: "How Sawla Tours plans your Ethiopia journey — from first conversation to fully bespoke itinerary with expert guides, logistics, and on-the-ground support.",
  alternates: { canonical: "https://www.sawlatours.com/how-we-work" },
  openGraph: {
    title: "How Sawla Tours Plans Private Ethiopia Journeys",
    description: "Four steps. No packages. A conversation first.",
    images: [{ url: "https://www.sawlatours.com/images/og-home.jpg", width: 1200, height: 630 }],
  },
}

const faqs = [
  { q:"Does Sawla Tours have minimum group sizes?", a:"No. We design journeys for solo travelers, couples, families, small groups, and specialist teams. The itinerary and logistics are adapted for your group size."},
  { q:"How long does the planning process take?", a:"A first response with a proposed route outline typically arrives within 24 hours on business days. A detailed proposal with accommodation and logistics takes 2-3 business days. The planning process from first contact to confirmed booking typically runs 1-4 weeks depending on journey complexity."},
  { q:"Is there a fee to enquire or receive a proposal?", a:"No. Enquiries and proposals are completely free. A deposit is only required when you choose to confirm your booking."},
  { q:"Can I change the itinerary after confirming?", a:"Most journeys are refined 2-3 times before confirmation. After confirmation, changes are accommodated where logistics allow, though some changes may affect pricing."},
  { q:"What happens if conditions change during my trip?", a:"Your Sawla Tours specialist is reachable throughout your journey. If weather, security, road conditions, or any other factor requires a route adjustment, we coordinate alternatives in real time."},
]

const schema = [
  breadcrumbSchema([
    { name: "Home", url: "https://www.sawlatours.com" },
    { name: "How We Work", url: "https://www.sawlatours.com/how-we-work" },
  ]),
  faqSchema(faqs),
]

export default function HowWeWorkPage() {
  return (
    <>
      {schema.map((s,i)=><SchemaScript key={i} schema={s}/>)}

      {/* ── HERO ── */}
      <section className="relative overflow-hidden" style={{height:"60vh",minHeight:"420px"}} aria-labelledby="how-heading">
        <PlaceholderImage filename="how-we-work-hero.jpg" width={1920} height={900} category="about" fill />
        <div className="absolute inset-0" style={{background:"linear-gradient(to top, rgba(42,39,36,0.88) 0%, rgba(42,39,36,0.15) 60%, transparent 100%)"}} />
        <div className="absolute inset-x-0 bottom-0 pb-14">
          <div className="container-max">
            <AnimateIn>
              <nav aria-label="Breadcrumb" className="mb-5">
                <ol className="flex items-center gap-2 font-body" style={{fontSize:"11.5px",letterSpacing:"0.1em",textTransform:"uppercase"}}>
                  <li><Link href="/" className="text-ivory/50 hover:text-gold transition-colors cursor-pointer">Home</Link></li>
                  <li className="text-ivory/30">&#47;</li>
                  <li className="text-ivory/80">How We Work</li>
                </ol>
              </nav>
              <span className="label-eyebrow text-gold">The Planning Process</span>
              <h1 id="how-heading" className="heading-display text-ivory mt-2" style={{fontSize:"clamp(2.25rem,5vw,4.5rem)"}}>
                No Forms to Fill In.
                <em className="block" style={{fontStyle:"italic",color:"var(--gold)"}}>Just a Conversation.</em>
              </h1>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY ── */}
      <section className="section-padding bg-ivory">
        <div className="container-max max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            <AnimateIn>
              <h2 className="heading-display text-volcanic mb-6" style={{fontSize:"clamp(1.5rem,3vw,2.25rem)"}}>We Do Not Sell Packages.</h2>
              <p className="text-warmgrey font-body leading-relaxed" style={{fontSize:"clamp(1rem,1.25vw,1.125rem)"}}>
                A package is designed for an imagined average traveler. You are not an average traveler. Your journey should reflect what you specifically want to understand, see, feel, and experience — not what happens to be available.
              </p>
              <p className="text-warmgrey font-body leading-relaxed mt-4" style={{fontSize:"clamp(1rem,1.25vw,1.125rem)"}}>
                Every Sawla Tours journey begins with a conversation. We ask questions before we suggest routes. We listen before we design.
              </p>
            </AnimateIn>
            <AnimateIn delay={0.12}>
              <blockquote className="pull-quote">
                &ldquo;The best journey we designed last year started with a traveler who said: I want to understand Ethiopia, not just see it. Everything followed from that.&rdquo;
              </blockquote>
              <div className="divider-gold" />
              <p className="text-warmgrey font-body" style={{fontSize:"0.875rem"}}>Sawla Tours Travel Specialist, Addis Ababa</p>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ── 4 STEPS — the real how-it-works ── */}
      <section className="section-padding bg-volcanic" aria-labelledby="steps-heading">
        <div className="container-max">
          <AnimateIn className="text-center mb-16">
            <span className="label-eyebrow text-gold">The Process</span>
            <h2 id="steps-heading" className="heading-display text-ivory mt-2" style={{fontSize:"clamp(1.75rem,3.5vw,2.75rem)"}}>How a Sawla Tours Journey Is Built</h2>
          </AnimateIn>
          <div className="space-y-0">
            {[
              {
                n:"Step 1",
                title:"You tell us what matters",
                time:"Day 1",
                body:"Send us a message — by email, WhatsApp, or the enquiry form. Tell us your travel dates, group size, and what draws you to Ethiopia. You do not need a detailed plan. Even a paragraph is enough. Our specialist reads it carefully and responds within 24 hours on business days.",
                img:"how-step-1-conversation.jpg",
              },
              {
                n:"Step 2",
                title:"We ask the right questions",
                time:"Days 2-3",
                body:"Before we suggest a route, we ask what we need to know: how you travel (fast or slow, active or contemplative), what kind of accommodation suits you, whether you have visited Africa before, if there are physical considerations, which destinations feel essential and which are flexible. Good planning starts with good listening.",
                img:"how-step-2-planning.jpg",
              },
              {
                n:"Step 3",
                title:"We design your route",
                time:"Days 3-7",
                body:"Our specialist builds a bespoke itinerary around what you told us. This includes the route logic (which destinations in which order, and why), accommodation recommendations with honest commentary, approximate pricing, domestic flight scheduling, and seasonal notes. We flag trade-offs honestly — if the best version of an itinerary requires more days, we say so.",
                img:"how-step-3-itinerary.jpg",
              },
              {
                n:"Step 4",
                title:"We refine it until it is right",
                time:"Days 7-21",
                body:"Most good journeys improve through 2-3 refinement rounds. You adjust the pace, swap an accommodation, add a destination, change the duration. We update the proposal and re-price as needed. When the itinerary feels right — confirmed by you — we move to booking, logistics coordination, and pre-trip briefing.",
                img:"how-step-4-confirm.jpg",
              },
            ].map((step,i)=>(
              <AnimateIn key={step.n} delay={i*0.08} className={"grid md:grid-cols-2 gap-8 md:gap-16 items-center py-14 border-b border-white/10 last:border-b-0 " + (i%2===1?"md:grid-flow-col-dense":"")}>
                <div className={i%2===1?"md:col-start-2":""} >
                  <div className="font-body text-gold font-medium mb-2" style={{fontSize:"11px",letterSpacing:"0.14em",textTransform:"uppercase"}}>{step.n} &middot; {step.time}</div>
                  <h3 className="font-display text-ivory font-normal leading-snug mb-5" style={{fontSize:"clamp(1.375rem,2.5vw,2rem)"}}>{step.title}</h3>
                  <p className="text-ivory/65 font-body leading-relaxed" style={{fontSize:"clamp(1rem,1.1vw,1.0625rem)"}}>{step.body}</p>
                </div>
                <div className={"relative overflow-hidden rounded-card aspect-[4/3] " + (i%2===1?"md:col-start-1":"")}>
                  <PlaceholderImage filename={step.img} width={700} height={525} category="about" fill className="hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 bg-volcanic/80 backdrop-blur-sm rounded-sm px-3 py-1.5">
                    <span className="font-body font-medium text-gold" style={{fontSize:"10px",letterSpacing:"0.12em",textTransform:"uppercase"}}>{step.n}</span>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section-padding bg-ivory" aria-labelledby="faq-heading">
        <div className="container-max max-w-3xl mx-auto">
          <AnimateIn className="mb-10">
            <span className="label-eyebrow">Common Questions</span>
            <h2 id="faq-heading" className="heading-display text-volcanic mt-2" style={{fontSize:"clamp(1.5rem,3vw,2.25rem)"}}>Before You Enquire</h2>
          </AnimateIn>
          <AnimateStagger className="space-y-3" staggerDelay={0.07}>
            {faqs.map(faq=>(
              <details key={faq.q} className="border border-sand rounded-card group">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none font-body font-medium text-volcanic hover:text-gold transition-colors" style={{fontSize:"13.5px"}}>
                  <span>{faq.q}</span>
                  <span className="ml-4 text-gold text-xl leading-none group-open:rotate-45 transition-transform duration-200 flex-shrink-0">+</span>
                </summary>
                <div className="px-5 pb-5 text-warmgrey font-body leading-relaxed" style={{fontSize:"13.5px"}}>{faq.a}</div>
              </details>
            ))}
          </AnimateStagger>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="bg-volcanic py-20 text-center">
        <div className="container-max">
          <AnimateIn>
            <span className="label-eyebrow text-gold">Ready to Begin?</span>
            <h2 className="heading-display text-ivory mt-4 mb-5" style={{fontSize:"clamp(1.75rem,3.5vw,2.75rem)"}}>The First Message Costs Nothing</h2>
            <p className="text-ivory/65 font-body max-w-md mx-auto mb-8 leading-relaxed" style={{fontSize:"clamp(1rem,1.25vw,1.125rem)"}}>No obligation. No booking required to enquire. Just tell us what you are thinking and we will take it from there.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/enquire" className="btn-gold py-4 px-10">Start a Conversation</Link>
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-ghost-light cursor-pointer">Message on WhatsApp</a>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  )
}
