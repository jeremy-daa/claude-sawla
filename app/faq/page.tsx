import type { Metadata } from 'next'
import Link from 'next/link'
import SchemaScript from '@/components/ui/SchemaScript'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Ethiopia Travel | Sawla Tours',
  description: 'Answers to common questions about planning an Ethiopia trip with Sawla Tours — safety, visas, best time to visit, private tours, guides, vehicles, and more.',
  alternates: { canonical: 'https://www.sawlatours.com/faq' },
  openGraph: {
    title: 'Ethiopia Travel FAQ | Sawla Tours',
    description: 'Safety, visas, best time to visit, private tours, guides and vehicles — answered by an Ethiopia-based team.',
    url: 'https://www.sawlatours.com/faq',
    images: [{ url: 'https://www.sawlatours.com/images/og-home.jpg', width: 1200, height: 630 }],
  },
}

const faqs = [
  {
    category: 'Planning',
    items: [
      { q: 'Do I need a complete itinerary before contacting Sawla Tours?', a: 'No. You can reach out with only a rough idea — your travel month, how many days you have, your group size, and your main interests. Our team will help you understand which destinations work for your time and what kind of route makes sense.' },
      { q: 'How quickly does Sawla Tours respond to enquiries?', a: 'We aim to reply to all enquiries within 24 hours on business days (Addis Ababa time, EAT UTC+3). Complex tailor-made proposals typically take 2–3 business days to prepare.' },
      { q: 'Can Sawla Tours plan a private Ethiopia tour for just 2 people?', a: 'Yes. Most Sawla Tours journeys are private — designed for couples, small groups, or solo travelers. The itinerary, guide, and vehicle are dedicated to your group.' },
      { q: 'How far in advance should I book?', a: 'For peak season (October–February), 3–6 months is ideal. For shoulder season, 6–8 weeks is generally sufficient. Festival-timed travel (Timkat in January, Meskel in September) books quickly — start planning 4–6 months ahead.' },
    ],
  },
  {
    category: 'Pricing',
    items: [
      { q: 'Why doesn\'t Sawla Tours publish fixed prices?', a: 'Every Sawla Tours journey is privately priced because every journey is privately designed. Your final proposal depends on when you travel, how many people are in your party, the route, hotel and room style, domestic flights, private vehicles, guide level, permits, special interests and the level of field logistics required. Rather than publishing a generic package price, we prepare a clear, tailored quote after understanding how you want to travel.' },
      { q: 'What affects the price of my trip?', a: 'Group size, travel season, hotel standard, room type, transport mode, route complexity, guiding level, permits and park fees, pace and duration, meals, mobile camping needs, international flights, special interests, and — for remote routes — risk and contingency planning. See our Planning & Pricing page for the full breakdown.' },
      { q: 'Are domestic flights included?', a: 'Usually they can be included or quoted separately, depending on your proposal — we\'ll confirm which approach makes sense once we know your route.' },
      { q: 'Can Sawla work with a specific budget?', a: 'Yes, within realistic limits. We can adjust hotels, route, pace and transport style to create the strongest possible journey for your priorities.' },
      { q: 'How do I get an idea of budget without a fixed price?', a: 'Tell us your preferred planning level — Comfort, Premium, Expedition, or Specialist — and your general budget guidance in the enquiry form. This gives our specialists enough to prepare a realistic first proposal without asking you to commit to an exact figure upfront.' },
      { q: 'Is remote-area travel more expensive than luxury lodges?', a: 'Not necessarily for the reason you might expect. In remote regions such as the Suri area, Danakil, Gambella, or Kafta Sheraro, cost is often driven by logistics — extra vehicles, camp crew, fuel, permits, and contingency planning — rather than by hotel luxury.' },
    ],
  },
  {
    category: 'Destinations & Safety',
    items: [
      { q: 'Is Ethiopia safe to visit?', a: 'Most of Ethiopia\'s tourism areas — Lalibela, Gondar, Simien Mountains, Bale Mountains, Addis Ababa, Harar — are safe and regularly visited. Some regions require current local advice. Sawla Tours only recommends routes based on real-time ground conditions and never sends travelers to areas that are not clear.' },
      { q: 'Is the Danakil Depression safe?', a: 'The Danakil requires experienced local logistics, Afar scout accompaniment, and careful timing. It is not a destination to visit independently. With Sawla Tours, the logistics, safety protocols, and local relationships are all managed. We will give you a clear and honest briefing before you decide.' },
      { q: 'Can I visit the Omo Valley?', a: "Yes. The Omo Valley is open to visitors with proper logistics and guide support. The key is having a guide who understands the social protocols of each community, who has established relationships there, and who manages visits responsibly. Sara, our southern specialist, handles all Omo Valley journeys." },
    ],
  },
  {
    category: 'Visas & Entry',
    items: [
      { q: 'Do I need a visa for Ethiopia?', a: 'Most international travelers require a tourist visa. Ethiopia offers an eVisa that can be obtained online before travel at www.evisa.gov.et. We recommend checking current requirements for your nationality before planning.' },
      { q: 'What vaccinations are recommended for Ethiopia?', a: 'We recommend consulting a travel health clinic or your GP 6–8 weeks before travel. Commonly recommended vaccines include hepatitis A, typhoid, and yellow fever. Some regions require antimalarial medication. This is medical advice — we always recommend consulting a professional.' },
    ],
  },
  {
    category: 'Logistics',
    items: [
      { q: 'Does Sawla Tours arrange domestic flights?', a: 'Yes. Domestic flights in Ethiopia are operated primarily by Ethiopian Airlines. Sawla Tours can coordinate domestic flight bookings, timing, and airport transfers as part of your itinerary. We recommend scheduling domestic flights with buffer time, as they can be delayed.' },
      { q: 'What vehicles does Sawla Tours use?', a: 'All Sawla Tours vehicles are Toyota Land Cruisers — 200 Series for most routes, 78 Series for rough terrain like Danakil and deep Omo Valley tracks. Vehicles are maintained to a standard appropriate for Ethiopian roads, not rental agency minibuses.' },
      { q: 'What accommodation standards does Sawla Tours use?', a: "We work across a range from comfortable mid-range hotels to the best available lodges for each region. We are honest about what 'best available' means in remote areas — some excellent destinations have limited accommodation options. We explain this clearly during planning." },
    ],
  },
  {
    category: 'Practical',
    items: [
      { q: 'What is the best time to visit Ethiopia?', a: 'October to February is the main dry season and the most popular travel period — clear skies, accessible roads, and the best trekking and wildlife viewing conditions. March to May is shoulder season with some haze. June to September is the main rainy season — Ethiopia becomes lush and green, crowds thin out, but some roads become challenging.' },
      { q: 'What language is spoken in Ethiopia?', a: "Amharic is the official language. English is spoken in cities and tourist areas. Our guides speak English and usually 2–4 additional Ethiopian languages relevant to their regional specialisation." },
      { q: 'What currency does Ethiopia use?', a: 'The Ethiopian Birr (ETB) is the local currency. US Dollars are widely accepted for tour payments. ATMs are available in Addis Ababa and major cities; cash is essential in rural areas. Sawla Tours will advise on cash requirements before your trip.' },
    ],
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.flatMap(cat => cat.items.map(item => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  }))),
}

export default function FAQPage() {
  return (
    <>
      <SchemaScript schema={faqSchema} />

      {/* HERO */}
      <section className="relative bg-volcanic overflow-hidden pt-36 pb-20">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(ellipse 70% 50% at 60% 50%, #c9941a 0%, transparent 100%)" }} aria-hidden="true" />
        <div className="container-max relative z-10 text-center max-w-3xl mx-auto">
          <span className="label-eyebrow text-gold">Planning Your Ethiopia Journey</span>
          <h1 className="heading-display text-ivory mt-2" style={{ fontSize: "clamp(2.5rem,5vw,4.5rem)" }}>
            Frequently Asked Questions
          </h1>
          <p className="text-ivory/65 font-body mt-5 leading-relaxed max-w-xl mx-auto" style={{ fontSize: "clamp(1rem,1.2vw,1.125rem)" }}>
            Honest answers about planning an Ethiopia trip with Sawla Tours — from first contact to the day you return home.
          </p>
        </div>
      </section>

      {/* QUICK NAVIGATION */}
      <div className="bg-white border-b border-sand">
        <div className="container-max py-4">
          <div className="flex flex-wrap gap-3">
            {faqs.map(cat => (
              <a key={cat.category} href={"#faq-" + cat.category.toLowerCase().replace(/\s+/g, "-")}
                className="trust-badge hover:border-gold hover:text-volcanic transition-colors cursor-pointer">
                {cat.category}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ BODY */}
      <section className="section-padding bg-ivory">
        <div className="container-max">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">

            {/* Questions */}
            <div className="lg:col-span-2 space-y-12">
              {faqs.map(cat => (
                <div key={cat.category} id={"faq-" + cat.category.toLowerCase().replace(/\s+/g, "-")}>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="label-eyebrow !mb-0 text-volcanic">{cat.category}</span>
                    <div className="flex-1 h-px bg-sand" />
                  </div>
                  <div className="space-y-2">
                    {cat.items.map(item => (
                      <details key={item.q} className="border border-sand rounded-card overflow-hidden group bg-white">
                        <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none font-body font-medium text-volcanic hover:text-gold transition-colors"
                          style={{ fontSize: "14px" }}>
                          <span className="pr-4">{item.q}</span>
                          <span className="text-gold text-xl leading-none flex-shrink-0 summary-icon group-open:rotate-45 transition-transform duration-200">+</span>
                        </summary>
                        <div className="px-5 pb-5 pt-2 border-t border-sand/50">
                          <p className="text-warmgrey font-body leading-relaxed" style={{ fontSize: "14px" }}>
                            {item.a}
                          </p>
                        </div>
                      </details>
                    ))}
                  </div>
                  {cat.category === 'Pricing' && (
                    <p className="mt-4 text-sm">
                      <Link href="/planning-and-pricing" className="text-gold hover:underline">See the full Planning &amp; Pricing guide →</Link>
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sidebar-sticky space-y-5">
                <div className="bg-volcanic rounded-card p-7 text-ivory">
                  <div className="label-eyebrow text-gold mb-3">Still Have Questions?</div>
                  <h3 className="font-display text-ivory font-light mb-3" style={{ fontSize: "clamp(1.25rem,2vw,1.5rem)" }}>
                    Ask Our Ethiopia Team
                  </h3>
                  <p className="text-ivory/60 font-body leading-relaxed mb-6" style={{ fontSize: "0.9375rem" }}>
                    Our Addis Ababa-based specialists respond within 24 hours and can answer anything not covered here.
                  </p>
                  <Link href="/enquire" className="btn-gold w-full justify-center mb-3">
                    Send a Message
                  </Link>
                  <a href="mailto:explore@sawlatours.com"
                    className="flex items-center justify-center gap-1.5 text-ivory/55 hover:text-gold transition-colors font-body"
                    style={{ fontSize: "12.5px" }}>
                    explore@sawlatours.com
                  </a>
                </div>

                <div className="border border-sand rounded-card p-5 bg-white">
                  <div className="label-eyebrow mb-4">Quick Facts</div>
                  <div className="space-y-3">
                    {[
                      { label: "Response time", val: "Within 24 hours" },
                      { label: "Based in", val: "Addis Ababa, Ethiopia" },
                      { label: "Operating since", val: "2009" },
                      { label: "Tour type", val: "Private & tailor-made only" },
                      { label: "Booking fee", val: "None — free to enquire" },
                    ].map(f => (
                      <div key={f.label} className="flex justify-between gap-4 text-sm">
                        <span className="text-warmgrey font-body">{f.label}</span>
                        <span className="font-body font-medium text-volcanic text-right">{f.val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border border-sand rounded-card p-5 bg-white">
                  <div className="label-eyebrow mb-4">Useful Guides</div>
                  <div className="space-y-2">
                    {[
                      { label: "When to Visit Ethiopia", href: "/ethiopia-travel-guide/when-to-visit-ethiopia" },
                      { label: "Ethiopia Visa Guide", href: "/ethiopia-travel-guide/ethiopia-visa-guide" },
                      { label: "Safety in Ethiopia", href: "/ethiopia-travel-guide/safety-in-ethiopia" },
                      { label: "What to Pack", href: "/ethiopia-travel-guide/what-to-pack-for-ethiopia" },
                    ].map(link => (
                      <Link key={link.href} href={link.href}
                        className="flex items-center justify-between text-sm group">
                        <span className="text-warmgrey group-hover:text-gold transition-colors font-body">{link.label}</span>
                        <svg className="text-gold/50 group-hover:text-gold transition-colors" width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-16 bg-gold-faint border-t border-sand/60">
        <div className="container-max max-w-3xl mx-auto text-center">
          <h2 className="font-display text-volcanic font-light mb-4" style={{ fontSize: "clamp(1.5rem,3vw,2.25rem)" }}>
            Ready to Start Planning?
          </h2>
          <p className="text-warmgrey font-body mb-8 max-w-lg mx-auto leading-relaxed">
            Tell us what draws you to Ethiopia. Our Addis Ababa team will respond within 24 hours with an honest first conversation — no packages, no pressure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/enquire" className="btn-primary">Start a Conversation</Link>
            <Link href="/tours-by-experience" className="btn-ghost">Browse Itineraries</Link>
          </div>
        </div>
      </section>
    </>
  )
}
