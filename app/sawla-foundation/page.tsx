import type { Metadata } from 'next'
import Link from 'next/link'
import PlaceholderImage from '@/components/ui/PlaceholderImage'
import SchemaScript from '@/components/ui/SchemaScript'
import { AnimateIn, AnimateStagger } from '@/components/ui/AnimateIn'
import { breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Sawla Foundation | Responsible Ethiopia Travel',
  description: 'Sawla Foundation supports community development, conservation, and cultural preservation across the regions where Sawla Tours operates in Ethiopia.',
  alternates: { canonical: 'https://www.sawlatours.com/sawla-foundation' },
  openGraph: {
    title: 'Sawla Foundation | Community & Conservation',
    description: 'How Sawla Tours gives back — community development, conservation partnerships, and cultural respect across Ethiopia.',
    images: [{ url: '/images/og-home.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', title: 'Sawla Foundation | Sawla Tours' },
}

const schema = breadcrumbSchema([
  { name: 'Home', url: 'https://www.sawlatours.com' },
  { name: 'Sawla Foundation', url: 'https://www.sawlatours.com/sawla-foundation' },
])

const pillars = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'Community Employment',
    description: 'We hire exclusively Ethiopian guides, drivers, specialists, and camp staff — prioritising people from the regions we visit. Every journey directly supports local household income.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Conservation Partnerships',
    description: 'We partner with wildlife research teams, national park authorities, and conservation organisations across Bale, Simien, and the Omo Valley to support the habitats our clients visit.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    title: 'Cultural Respect',
    description: 'Before any journey into sensitive communities — particularly in the Omo Valley — we brief clients on protocols, consent, and respectful engagement. We reject extractive tourism.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    ),
    title: 'Education Support',
    description: 'A portion of each confirmed journey contributes to educational support for communities in regions where sustainable tourism is most fragile and most impactful.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    title: 'Local Procurement',
    description: 'We source food, craft, and supplies from local markets wherever possible — keeping value in communities rather than extracting it through imported goods and centralised supply chains.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.92 10a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.92 0h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 7.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 14.92z"/>
      </svg>
    ),
    title: 'Responsible Communication',
    description: 'We do not photograph or document community members without consent. We actively advise clients against transactional photography practices that reduce people to subjects.',
  },
]

const principles = [
  {
    title: 'We do not sell poverty tourism',
    body: 'We reject itineraries framed around human suffering or economic disparity as spectacle. Visiting Omo Valley communities or rural highlands is about cultural exchange — not voyeurism.',
  },
  {
    title: 'We do not exaggerate access',
    body: 'Some areas of Ethiopia are periodically restricted for valid security or political reasons. We communicate this honestly, adjust itineraries appropriately, and never manufacture false access.',
  },
  {
    title: 'We do not promise untouched wilderness',
    body: 'Ethiopia is a living country, not a museum. We present its complexity honestly — including its rapid development, its tensions, and its extraordinary resilience.',
  },
  {
    title: 'We support, not substitute, local expertise',
    body: 'Our guides are Ethiopian specialists, not translators for foreign experts. Their knowledge is the product, not the vehicle for someone else\'s interpretation of Ethiopia.',
  },
]

export default function SawlaFoundationPage() {
  return (
    <>
      <SchemaScript schema={schema} />

      {/* HERO */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-44 md:pb-28">
        <div className="absolute inset-0" aria-hidden="true">
          <PlaceholderImage filename="foundation-hero-community.jpg" width={1920} height={900} category="about" fill className="object-center" />
          <div className="absolute inset-0 bg-volcanic/75" />
        </div>
        <div className="relative z-10 container-max text-ivory">
          <AnimateIn>
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-2 text-[11px] tracking-[0.12em] uppercase font-body">
                <li><Link href="/" className="text-ivory/50 hover:text-gold transition-colors">Home</Link></li>
                <li className="text-ivory/30">/</li>
                <li className="text-ivory/70">Sawla Foundation</li>
              </ol>
            </nav>
            <span className="label-eyebrow text-gold block mb-3">Travel with purpose</span>
            <h1 className="heading-display text-display-xl text-ivory max-w-3xl">
              Tourism That Gives Back to Ethiopia
            </h1>
            <p className="text-ivory/70 text-body-lg mt-6 max-w-2xl leading-relaxed">
              Sawla Foundation is the community and conservation arm of Sawla Tours — a commitment to ensuring that the benefit of travel flows back to the people, places, and ecosystems that make Ethiopia worth visiting.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="py-section bg-ivory">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimateIn>
              <span className="label-eyebrow text-gold block mb-4">Our position</span>
              <h2 className="heading-display text-display-md text-volcanic mb-6">
                Why Responsible Tourism Matters Here
              </h2>
              <div className="space-y-5 text-warmgrey font-body leading-relaxed">
                <p>
                  Ethiopia is not a backdrop. It is a living civilization with 3,000 years of continuous history, dozens of living indigenous cultures, some of the world&apos;s most threatened endemic species, and a population navigating rapid change on its own terms.
                </p>
                <p>
                  Tourism done poorly extracts value from communities without returning it. It photographs people as objects, commodifies sacred ceremonies, and leaves no meaningful trace of benefit behind. We have seen it, and we have actively worked to be its opposite.
                </p>
                <p>
                  Tourism done well creates a reason for conservation. It makes indigenous culture economically valuable on its own terms. It employs skilled people who understand their country. It makes travelers better — more curious, more humble, more connected to the world.
                </p>
                <p>
                  That is what Sawla Foundation works toward — and what every journey with Sawla Tours participates in.
                </p>
              </div>
            </AnimateIn>
            <AnimateIn delay={0.2}>
              <div className="relative rounded-card overflow-hidden aspect-[4/3]">
                <PlaceholderImage filename="foundation-community-children.jpg" width={800} height={600} category="about" fill />
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* 6 PILLARS */}
      <section className="py-section bg-volcanic text-ivory">
        <div className="container-max">
          <AnimateIn>
            <h2 className="heading-display text-display-md text-ivory text-center mb-4">
              Six Pillars of Responsible Practice
            </h2>
            <p className="text-ivory/60 text-center font-body max-w-xl mx-auto mb-14">
              These are not policies written for marketing. They are operating principles embedded in how we plan, guide, and debrief every journey.
            </p>
          </AnimateIn>
          <AnimateStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map(p => (
              <div key={p.title} className="border border-white/10 rounded-card p-7 hover:border-gold/40 transition-colors duration-300">
                <div className="text-gold mb-4">{p.icon}</div>
                <h3 className="font-display text-xl font-light text-ivory mb-3">{p.title}</h3>
                <p className="text-ivory/60 font-body text-sm leading-relaxed">{p.description}</p>
              </div>
            ))}
          </AnimateStagger>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="py-section bg-ivory">
        <div className="container-max">
          <AnimateIn>
            <h2 className="heading-display text-display-sm text-volcanic text-center mb-12">
              What We Refuse to Do
            </h2>
          </AnimateIn>
          <AnimateStagger className="max-w-3xl mx-auto space-y-6">
            {principles.map(p => (
              <div key={p.title} className="bg-white border border-sand rounded-card p-8">
                <h3 className="font-display text-xl font-light text-volcanic mb-3">{p.title}</h3>
                <p className="text-warmgrey font-body text-sm leading-relaxed">{p.body}</p>
              </div>
            ))}
          </AnimateStagger>
        </div>
      </section>

      {/* LINK TO RESPONSIBLE TRAVEL */}
      <section className="py-section-sm bg-gold/10 border-y border-gold/20">
        <div className="container-max text-center">
          <AnimateIn>
            <h2 className="heading-display text-display-sm text-volcanic mb-4">
              Our Responsible Travel Policy
            </h2>
            <p className="text-warmgrey font-body max-w-xl mx-auto mb-8">
              The full details of how we approach sustainability, community engagement, wildlife ethics, and responsible photography are documented in our Responsible Travel page.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/responsible-travel" className="btn-primary">Read Our Full Policy</Link>
              <Link href="/enquire" className="btn-outline">Plan a Purposeful Journey</Link>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  )
}
