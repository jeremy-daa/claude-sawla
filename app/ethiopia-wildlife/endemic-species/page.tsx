import type { Metadata } from 'next'
import Link from 'next/link'
import PlaceholderImage from '@/components/ui/PlaceholderImage'
import SchemaScript from '@/components/ui/SchemaScript'
import { AnimateIn, AnimateStagger } from '@/components/ui/AnimateIn'
import { breadcrumbSchema, itemListSchema } from '@/lib/schema'
import { SPECIES } from '@/data/siteData'

const BASE = 'https://www.sawlatours.com'

export const metadata: Metadata = {
  title: 'Ethiopian Endemic Wildlife | Species Guide | Sawla Tours',
  description: "Ethiopia has 31 endemic mammal species and over 20 endemic birds found nowhere else on earth. Meet the Ethiopian wolf, gelada, Walia ibex, mountain nyala, and more.",
  alternates: { canonical: `${BASE}/ethiopia-wildlife/endemic-species` },
  openGraph: {
    title: "Ethiopian Endemic Wildlife | Sawla Tours",
    description: "Species found nowhere else on earth — a field guide to Ethiopia's extraordinary endemic wildlife.",
    url: `${BASE}/ethiopia-wildlife/endemic-species`,
    images: [{ url: `${BASE}/images/og-home.jpg`, width: 1200, height: 630 }],
  },
}

const schemas = [
  breadcrumbSchema([
    { name: 'Home', url: BASE },
    { name: 'Ethiopian Wildlife', url: `${BASE}/ethiopia-wildlife/endemic-species` },
  ]),
  itemListSchema({
    name: 'Ethiopian Endemic Species — Sawla Tours Wildlife Library',
    url: `${BASE}/ethiopia-wildlife/endemic-species`,
    items: SPECIES.map(sp => ({
      name: sp.commonName,
      url: `${BASE}/ethiopia-wildlife/${sp.slug}`,
      description: sp.tagline,
    })),
  }),
]

const STATUS_STYLES: Record<string, string> = {
  Endangered:      'bg-red-50    text-red-700   border-red-100',
  Vulnerable:      'bg-amber-50  text-amber-700 border-amber-100',
  'Least Concern': 'bg-green-50  text-green-700 border-green-100',
}

const WILDLIFE_ITINERARIES = [
  { slug: 'bale-simien-wolf-gelada-12-days',      style: 'ethiopia-wildlife-tours',      name: 'Wolf and Gelada Circuit',      days: '12 Days' },
  { slug: 'bale-mountains-wildlife-5-days',        style: 'ethiopia-wildlife-tours',      name: 'Bale Mountains Focus',          days: '5 Days'  },
  { slug: 'simien-trekking-wildlife-8-days',       style: 'ethiopia-wildlife-tours',      name: 'Simien Trekking and Wildlife',  days: '8 Days'  },
  { slug: 'ethiopia-birding-specialist-14-days',   style: 'ethiopia-birdwatching-tours',  name: 'Ethiopia Birding Specialist',   days: '14 Days' },
]

const mammals = SPECIES.filter(s => s.type === 'Mammal')
const birds   = SPECIES.filter(s => s.type === 'Bird')

export default function SpeciesHubPage() {
  return (
    <>
      {schemas.map((s, i) => <SchemaScript key={i} schema={s} />)}

      {/* ── HERO ── */}
      <section className="relative overflow-hidden" style={{ minHeight: '520px', paddingTop: '8rem', paddingBottom: '5rem' }} aria-labelledby="wildlife-heading">
        <PlaceholderImage filename="species-hub-hero.jpg" width={1920} height={900} category="species" fill className="object-center" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(42,39,36,0.92) 0%, rgba(42,39,36,0.38) 52%, rgba(42,39,36,0.18) 100%)' }} />
        <div className="relative z-10 container-max text-ivory">
          <AnimateIn>
            <nav aria-label="Breadcrumb" className="mb-5">
              <ol className="flex items-center gap-2 font-body" style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                <li><Link href="/" className="text-ivory/45 hover:text-gold transition-colors">Home</Link></li>
                <li className="text-ivory/25">/</li>
                <li className="text-ivory/70">Ethiopian Wildlife</li>
              </ol>
            </nav>
            <span className="label-eyebrow text-gold">Found Nowhere Else on Earth</span>
            <h1 id="wildlife-heading" className="heading-display text-ivory mt-2 max-w-4xl" style={{ fontSize: 'clamp(2.5rem,5.5vw,5rem)' }}>
              Ethiopian Endemic Species
            </h1>
            <p className="text-ivory/72 font-body max-w-2xl mt-5 leading-relaxed" style={{ fontSize: 'clamp(1rem,1.3vw,1.2rem)' }}>
              Ethiopia holds 31 endemic mammal species and more than 20 endemic birds — a concentration of unique wildlife that rivals the Galápagos. These are animals you cannot see anywhere else on earth.
            </p>
            <div className="flex flex-wrap gap-6 mt-8">
              {[['31+', 'Endemic mammals'], ['20+', 'Endemic birds'], ['~500', 'Ethiopian wolves left']].map(([n, l]) => (
                <div key={l}>
                  <div className="font-display text-gold font-light" style={{ fontSize: '2rem', lineHeight: 1 }}>{n}</div>
                  <div className="text-ivory/50 font-body mt-1" style={{ fontSize: '10.5px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{l}</div>
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── WHY ETHIOPIA ── */}
      <section className="bg-gold-faint border-b border-sand/60">
        <div className="container-max py-10">
          <AnimateIn className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="label-eyebrow">Why Ethiopia</span>
              <h2 className="heading-display text-volcanic mt-2" style={{ fontSize: 'clamp(1.375rem,2.5vw,1.875rem)' }}>
                The Most Endemic-Rich Country in Africa
              </h2>
            </div>
            <p className="text-warmgrey font-body leading-relaxed" style={{ fontSize: 'clamp(0.9375rem,1.1vw,1rem)' }}>
              Ethiopia&apos;s geography — high plateau habitats isolated by escarpments, ancient forest refugia, and the deep rift cutting through the highlands — produced a level of species isolation unique in Africa. The Ethiopian wolf is the world&apos;s rarest canid. The gelada is the only surviving grass-grazing primate. Stresemann&apos;s Bushcrow lives in a range of just 6,000 km². These animals are the product of millions of years of evolutionary separation.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* ── ENDEMIC MAMMALS ── */}
      <section className="section-padding bg-ivory" aria-labelledby="mammals-heading">
        <div className="container-max">
          <AnimateIn className="mb-10">
            <span className="label-eyebrow">Mammals</span>
            <h2 id="mammals-heading" className="heading-display text-volcanic mt-1" style={{ fontSize: 'clamp(1.75rem,3.25vw,2.5rem)' }}>
              Endemic Mammals
            </h2>
            <p className="text-warmgrey font-body mt-3 max-w-2xl" style={{ fontSize: '0.9375rem' }}>
              Five mammal species found only in Ethiopia — from the high afroalpine plateau to the ancient Harenna Forest.
            </p>
          </AnimateIn>
          <AnimateStagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.06}>
            {mammals.map(sp => (
              <div key={sp.slug}>
                <Link href={`/ethiopia-wildlife/${sp.slug}`}
                  className="group block bg-white rounded-card overflow-hidden border border-sand/70 card-hover h-full">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <PlaceholderImage
                      filename={`species-${sp.slug}-portrait.jpg`}
                      width={600} height={450}
                      category="species" fill
                      className="group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 right-3">
                      <span className={`font-body font-medium border text-[10px] px-2.5 py-1 rounded-full ${STATUS_STYLES[sp.conservationStatus] ?? ''}`}>
                        {sp.conservationStatus}
                      </span>
                    </div>
                    <div className="image-overlay-light" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-volcanic font-normal group-hover:text-gold transition-colors leading-snug" style={{ fontSize: 'clamp(1.125rem,1.75vw,1.375rem)' }}>
                      {sp.commonName}
                    </h3>
                    <p className="text-warmgrey font-body italic mt-0.5" style={{ fontSize: '12.5px' }}>{sp.scientificName}</p>
                    <p className="text-warmgrey font-body mt-2 leading-snug" style={{ fontSize: '13.5px' }}>{sp.tagline}</p>
                    <div className="flex items-center gap-1.5 mt-3 text-warmgrey font-body" style={{ fontSize: '12px' }}>
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <path d="M6 1C4.343 1 3 2.343 3 4c0 2.5 3 7 3 7s3-4.5 3-7c0-1.657-1.343-3-3-3z" fill="currentColor" opacity=".4"/>
                      </svg>
                      {sp.bestLocation}
                    </div>
                    <div className="mt-4 inline-flex items-center gap-1 text-gold font-body font-medium" style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      Species guide
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </AnimateStagger>
        </div>
      </section>

      {/* ── ENDEMIC BIRDS ── */}
      <section className="section-padding bg-volcanic" aria-labelledby="birds-heading">
        <div className="container-max">
          <AnimateIn className="mb-10">
            <span className="label-eyebrow text-gold">Birds</span>
            <h2 id="birds-heading" className="heading-display text-ivory mt-1" style={{ fontSize: 'clamp(1.75rem,3.25vw,2.5rem)' }}>
              Endemic Birds
            </h2>
            <p className="text-ivory/60 font-body mt-3 max-w-2xl" style={{ fontSize: '0.9375rem' }}>
              Ethiopia has over 20 endemic bird species. Full birding coverage — including all targets — is in the{' '}
              <Link href="/ethiopia-travel-guide/ethiopia-birding-guide" className="text-gold hover:underline">Birding Guide</Link>
              {' '}and{' '}
              <Link href="/tours-by-experience/ethiopia-birdwatching-tours" className="text-gold hover:underline">birdwatching tours</Link>.
            </p>
          </AnimateIn>
          <AnimateStagger className="grid sm:grid-cols-2 gap-5 max-w-3xl" staggerDelay={0.07}>
            {birds.map(sp => (
              <div key={sp.slug}>
                <Link href={`/ethiopia-wildlife/${sp.slug}`}
                  className="group block bg-white/5 border border-white/12 rounded-card overflow-hidden hover:border-gold/40 transition-colors duration-300 card-hover">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <PlaceholderImage
                      filename={`species-${sp.slug}-portrait.jpg`}
                      width={600} height={375}
                      category="species" fill
                      className="group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 right-3">
                      <span className={`font-body font-medium border text-[10px] px-2.5 py-1 rounded-full ${STATUS_STYLES[sp.conservationStatus] ?? ''}`}>
                        {sp.conservationStatus}
                      </span>
                    </div>
                    <div className="image-overlay-light" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-ivory font-normal group-hover:text-gold transition-colors leading-snug" style={{ fontSize: 'clamp(1.125rem,1.75vw,1.375rem)' }}>
                      {sp.commonName}
                    </h3>
                    <p className="text-ivory/50 font-body italic mt-0.5" style={{ fontSize: '12.5px' }}>{sp.scientificName}</p>
                    <p className="text-ivory/65 font-body mt-2" style={{ fontSize: '13.5px' }}>{sp.tagline}</p>
                    <div className="flex items-center gap-1.5 mt-3 text-ivory/45 font-body" style={{ fontSize: '12px' }}>
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <path d="M6 1C4.343 1 3 2.343 3 4c0 2.5 3 7 3 7s3-4.5 3-7c0-1.657-1.343-3-3-3z" fill="currentColor" opacity=".4"/>
                      </svg>
                      {sp.bestLocation}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </AnimateStagger>
        </div>
      </section>

      {/* ── WILDLIFE ITINERARIES ── */}
      <section className="section-padding bg-ivory" aria-labelledby="wildlife-itins-heading">
        <div className="container-max">
          <AnimateIn className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="label-eyebrow">See Them in the Wild</span>
              <h2 id="wildlife-itins-heading" className="heading-display text-volcanic mt-1" style={{ fontSize: 'clamp(1.5rem,2.75vw,2.1rem)' }}>
                Journeys Designed Around These Species
              </h2>
            </div>
            <Link href="/tours-by-experience/ethiopia-wildlife-tours" className="btn-ghost flex-shrink-0">
              All Wildlife Tours
            </Link>
          </AnimateIn>
          <AnimateStagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4" staggerDelay={0.07}>
            {WILDLIFE_ITINERARIES.map(it => (
              <Link key={it.slug} href={`/tours-by-experience/${it.style}/${it.slug}`}
                className="group block border border-sand rounded-card overflow-hidden bg-white card-hover">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <PlaceholderImage filename={`tour-${it.slug}-hero.jpg`} width={400} height={250} category="tour" fill className="group-hover:scale-105 transition-transform duration-700" />
                  <div className="image-overlay-light" />
                </div>
                <div className="p-4">
                  <div className="text-warmgrey font-body mb-1.5" style={{ fontSize: '10.5px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{it.days}</div>
                  <h3 className="font-display text-volcanic font-normal group-hover:text-gold transition-colors leading-snug" style={{ fontSize: 'clamp(0.9375rem,1.5vw,1.0625rem)' }}>
                    {it.name}
                  </h3>
                </div>
              </Link>
            ))}
          </AnimateStagger>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-volcanic py-16 text-center">
        <div className="container-max max-w-2xl mx-auto">
          <AnimateIn>
            <span className="label-eyebrow text-gold">Plan Your Wildlife Journey</span>
            <h2 className="heading-display text-ivory mt-2 mb-5" style={{ fontSize: 'clamp(1.75rem,3.5vw,2.5rem)' }}>
              Tell Us Which Species Matters Most
            </h2>
            <p className="text-ivory/60 font-body leading-relaxed mb-8" style={{ fontSize: '0.9375rem' }}>
              Share your priority species and we will design the right route — matched to the season, the habitat, and the specialist guide.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/enquire" className="btn-gold">Start Planning</Link>
              <Link href="/ethiopia-travel-guide/popular-wildlife-ethiopia" className="btn-ghost-light">Wildlife Planning Guide</Link>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  )
}
