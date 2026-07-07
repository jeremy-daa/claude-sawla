import type { Metadata } from 'next'
import Link from 'next/link'
import PlaceholderImage from '@/components/ui/PlaceholderImage'
import SchemaScript from '@/components/ui/SchemaScript'
import { AnimateIn, AnimateStagger } from '@/components/ui/AnimateIn'
import { breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Responsible Travel in Ethiopia | Sawla Tours Policy',
  description: 'Sawla Tours responsible travel commitments — Ethiopian ownership, community photography ethics, wildlife protocols, low-impact camping, and honest planning. Since 2009.',
  alternates: { canonical: 'https://www.sawlatours.com/responsible-travel' },
  openGraph: {
    title: 'Responsible Travel in Ethiopia | Sawla Tours',
    description: 'Ethiopian-owned. Community-first. Low-impact. The operating principles behind every Sawla Tours journey.',
    images: [{ url: 'https://www.sawlatours.com/images/og-home.jpg', width: 1200, height: 630 }],
  },
}

const schema = breadcrumbSchema([
  { name: 'Home', url: 'https://www.sawlatours.com' },
  { name: 'Responsible Travel', url: 'https://www.sawlatours.com/responsible-travel' },
])

const COMMITMENTS = [
  {
    n: '01',
    title: 'Ethiopian ownership and employment',
    body: "Sawla Tours is Ethiopian-owned. Every guide, driver, specialist, and logistics coordinator in our team is Ethiopian. When you travel with us, the money you spend goes directly to Ethiopian professionals — not through an international intermediary. This is the most direct form of community benefit that tourism can provide. We hire from the regions we visit wherever possible.",
    link: { label: 'Meet our team', href: '/about-us' },
  },
  {
    n: '02',
    title: 'Community photography that respects consent',
    body: 'In the Omo Valley and other community areas, photography consent is required before any images are taken. Payment for photography goes directly to the individual — not to an intermediary, not to a general community fund used without accountability. We do not work with communities that have been so commercialised that genuine encounter is no longer possible.',
    link: { label: 'Photography tours', href: '/tours-by-experience/ethiopia-photography-tours' },
  },
  {
    n: '03',
    title: 'Wildlife observation — not pursuit',
    body: 'Our wildlife itineraries are built around observation. We do not approach Ethiopian wolves when they are actively hunting. We do not enter gelada sleeping areas on cliff faces. We observe from positions that cause no behavioural change and brief every traveler on the specific protocols before each wildlife encounter. Time and patience produce better sightings than pressure.',
    link: { label: 'Wildlife tours', href: '/tours-by-experience/ethiopia-wildlife-tours' },
  },
  {
    n: '04',
    title: 'Low-impact camping and waste management',
    body: 'Mobile camp operations follow leave-no-trace principles. All waste — food waste, packaging, grey water — is carried out of remote areas. We do not light open fires except in established fire pits. Camp positions are chosen to minimise vegetation impact and avoid wildlife corridors. These protocols are briefed to every camp crew before departure.',
    link: { label: 'Mobile camps', href: '/mobile-tented-camps-ethiopia' },
  },
  {
    n: '05',
    title: 'Honest information — even when it costs a booking',
    body: 'We will not send travelers to a destination when conditions — security, access, community relations, volcanic or weather risk — make us uncomfortable. This sometimes costs us bookings. It maintains the integrity of every trip we run and the relationships we have built with communities and environments over fifteen years. We brief clients before they confirm, not after.',
    link: { label: 'Safety guide', href: '/ethiopia-travel-guide/safety-in-ethiopia' },
  },
  {
    n: '06',
    title: 'Cultural protocols — learned, not assumed',
    body: 'Our guides spend years learning the specific protocols of the communities they work with: when to photograph, when to put the camera down, how to greet a community elder, which areas are sacred and closed to visitors. These are not rules imposed from outside — they are the preferences of the communities themselves, communicated through long-term relationships.',
    link: { label: 'Cultural etiquette guide', href: '/ethiopia-travel-guide/cultural-etiquette-ethiopia' },
  },
]

const STATS = [
  { value: '100%', label: 'Ethiopian-owned and operated' },
  { value: '2009', label: 'Founded in Addis Ababa' },
  { value: '15+', label: 'Years of field relationships' },
]

export default function ResponsibleTravelPage() {
  return (
    <>
      <SchemaScript schema={schema} />

      {/* HERO */}
      <section className="relative overflow-hidden" style={{ height: '58vh', minHeight: '400px' }} aria-labelledby="resp-heading">
        <PlaceholderImage filename="responsible-hero.jpg" width={1920} height={900} category="about" fill />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(42,39,36,0.90) 0%, rgba(42,39,36,0.18) 58%, rgba(42,39,36,0.06) 100%)' }} />
        <div className="absolute inset-x-0 bottom-0 pb-14">
          <div className="container-max">
            <AnimateIn>
              <nav aria-label="Breadcrumb" className="mb-5">
                <ol className="flex items-center gap-2 font-body" style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  <li><Link href="/" className="text-ivory/45 hover:text-gold transition-colors">Home</Link></li>
                  <li className="text-ivory/25">/</li>
                  <li className="text-ivory/70">Responsible Travel</li>
                </ol>
              </nav>
              <span className="label-eyebrow text-gold">Travel with Purpose</span>
              <h1 id="resp-heading" className="heading-display text-ivory mt-2" style={{ fontSize: 'clamp(2rem,5vw,4.5rem)' }}>
                Responsible Travel
              </h1>
              <p className="text-ivory/70 font-body max-w-2xl mt-4 leading-relaxed" style={{ fontSize: 'clamp(1rem,1.25vw,1.2rem)' }}>
                Ethiopian-owned. Community-first. Low-impact. These are not marketing claims — they are the operating principles that shape every decision we make when designing and running your journey.
              </p>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="bg-volcanic border-b border-white/10">
        <div className="container-max py-5">
          <div className="grid grid-cols-3 gap-6 text-center">
            {STATS.map(s => (
              <div key={s.label}>
                <div className="font-display text-gold font-light" style={{ fontSize: 'clamp(1.5rem,2.5vw,2rem)' }}>{s.value}</div>
                <div className="text-ivory/45 font-body mt-1" style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* COMMITMENTS */}
      <section className="section-padding bg-ivory">
        <div className="container-max">
          <AnimateIn className="max-w-2xl mb-14">
            <span className="label-eyebrow">Our Commitments</span>
            <h2 className="heading-display text-volcanic mt-2" style={{ fontSize: 'clamp(1.75rem,3.5vw,2.75rem)' }}>
              Six Principles. In Practice, Not Print.
            </h2>
            <p className="text-warmgrey font-body mt-4 leading-relaxed" style={{ fontSize: 'clamp(1rem,1.1vw,1rem)' }}>
              These are the standards we apply to every journey we design and run — not aspirational goals, but operational requirements. We have been building and refining these practices since 2009.
            </p>
          </AnimateIn>
          <div className="space-y-0">
            {COMMITMENTS.map((c, i) => (
              <AnimateIn key={c.n} delay={i * 0.05}
                className="grid md:grid-cols-[80px_1fr] gap-6 py-10 border-b border-sand/60 last:border-0">
                <div className="font-display text-gold/25 font-light leading-none" style={{ fontSize: 'clamp(2.5rem,4vw,3.5rem)' }}>
                  {c.n}
                </div>
                <div>
                  <h3 className="font-display text-volcanic font-normal leading-snug mb-3" style={{ fontSize: 'clamp(1.125rem,1.75vw,1.5rem)' }}>
                    {c.title}
                  </h3>
                  <p className="text-warmgrey font-body leading-relaxed mb-4" style={{ fontSize: 'clamp(0.9375rem,1.1vw,1rem)' }}>
                    {c.body}
                  </p>
                  {c.link && (
                    <Link href={c.link.href}
                      className="inline-flex items-center gap-1.5 text-gold hover:text-volcanic transition-colors font-body font-medium"
                      style={{ fontSize: '11.5px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      {c.link.label}
                      <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </Link>
                  )}
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* SAWLA FOUNDATION LINK */}
      <section className="section-padding-sm bg-gold-faint border-y border-sand/60">
        <div className="container-max">
          <AnimateIn className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="label-eyebrow">Sawla Foundation</span>
              <h2 className="heading-display text-volcanic mt-2 mb-4" style={{ fontSize: 'clamp(1.5rem,2.75vw,2rem)' }}>
                The Community and Conservation Arm
              </h2>
              <p className="text-warmgrey font-body leading-relaxed mb-6" style={{ fontSize: 'clamp(0.9375rem,1.1vw,1rem)' }}>
                Sawla Foundation is the community and conservation mission that sits behind the responsible travel commitments above — explaining why we operate the way we do and what the long-term goals are. Every journey with Sawla Tours participates in it.
              </p>
              <Link href="/sawla-foundation" className="btn-primary">
                Read About the Foundation
              </Link>
            </div>
            <AnimateStagger className="grid grid-cols-2 gap-4" staggerDelay={0.06}>
              {[
                { title: 'Community Employment', body: 'Ethiopian guides and drivers from the regions we visit.' },
                { title: 'Conservation Partnerships', body: 'Wildlife researchers and park authorities across Bale, Simien, and the Omo.' },
                { title: 'Cultural Respect', body: 'Ceremony and photography protocols set by communities, not by us.' },
                { title: 'Education Support', body: 'A portion of each confirmed journey supports communities in fragile regions.' },
              ].map(p => (
                <div key={p.title} className="bg-white border border-sand rounded-card p-4">
                  <div className="font-body font-semibold text-volcanic mb-1.5" style={{ fontSize: '13px' }}>{p.title}</div>
                  <p className="text-warmgrey font-body" style={{ fontSize: '12.5px', lineHeight: '1.65' }}>{p.body}</p>
                </div>
              ))}
            </AnimateStagger>
          </AnimateIn>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-volcanic py-16 text-center">
        <div className="container-max max-w-2xl mx-auto">
          <AnimateIn>
            <h2 className="heading-display text-ivory mb-4" style={{ fontSize: 'clamp(1.75rem,3.5vw,2.5rem)' }}>
              Travel That Leaves Things Better
            </h2>
            <p className="text-ivory/60 font-body max-w-xl mx-auto mb-8 leading-relaxed" style={{ fontSize: '0.9375rem' }}>
              The best thing you can do for Ethiopia as a traveler is go there, spend your money with Ethiopian people, and come back understanding more than you did when you left.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/enquire" className="btn-gold">Plan Your Journey</Link>
              <Link href="/sawla-foundation" className="btn-ghost-light">Sawla Foundation</Link>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  )
}
