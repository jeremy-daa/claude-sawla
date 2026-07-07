import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import PlaceholderImage from '@/components/ui/PlaceholderImage'
import SchemaScript from '@/components/ui/SchemaScript'
import { articleSchema, breadcrumbSchema } from '@/lib/schema'
import { MOMENTS_ARTICLES, SITE } from '@/data/siteData'
import { MOMENTS_CONTENT } from '@/data/momentsContent'
import { PREMIUM_DESTINATIONS } from '@/data/destinationsPremium'

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return MOMENTS_ARTICLES.map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = MOMENTS_ARTICLES.find(a => a.slug === slug)
  if (!article) return {}
  return {
    title: article.metaTitle,
    description: article.metaDescription,
    alternates: { canonical: `https://www.sawlatours.com/sawla-moments/${slug}` },
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      type: 'article',
      publishedTime: article.publishDate,
      images: [{ url: 'https://www.sawlatours.com/images/og-home.jpg', width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title: article.metaTitle },
  }
}

export default async function MomentsArticle({ params }: Props) {
  const { slug } = await params
  const article = MOMENTS_ARTICLES.find(a => a.slug === slug)
  if (!article) notFound()

  const content = MOMENTS_CONTENT[slug]
  const related = MOMENTS_ARTICLES.filter(a => a.slug !== slug).slice(0, 4)

  const schema = [
    articleSchema({
      url: `https://www.sawlatours.com/sawla-moments/${slug}`,
      title: article.title,
      description: article.metaDescription,
      datePublished: article.publishDate,
    }),
    breadcrumbSchema([
      { name: 'Home', url: 'https://www.sawlatours.com' },
      { name: 'Sawla Moments', url: 'https://www.sawlatours.com/sawla-moments' },
      { name: article.title, url: `https://www.sawlatours.com/sawla-moments/${slug}` },
    ]),
  ]

  return (
    <>
      <SchemaScript schema={schema} />

      {/* ── CINEMATIC HERO ── */}
      <section className="relative h-[78vh] min-h-[560px] overflow-hidden">
        <PlaceholderImage filename={`moments-${slug}-hero.jpg`} width={1920} height={1080} category="moments" fill />
        <div className="image-overlay" style={{ background: 'linear-gradient(to top, rgba(42,39,36,0.92) 0%, rgba(42,39,36,0.25) 52%, rgba(42,39,36,0.18) 100%)' }} />
        <div className="absolute inset-0 flex flex-col justify-end pb-16 md:pb-20">
          <div className="container-max text-ivory">
            <nav aria-label="Breadcrumb" className="mb-5">
              <ol className="flex flex-wrap items-center gap-2 font-body" style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                <li><Link href="/" className="text-ivory/45 hover:text-gold transition-colors">Home</Link></li>
                <li className="text-ivory/25">/</li>
                <li><Link href="/sawla-moments" className="text-ivory/45 hover:text-gold transition-colors">Sawla Moments</Link></li>
                <li className="text-ivory/25">/</li>
                <li className="text-ivory/70">{article.category}</li>
              </ol>
            </nav>
            <span className="label-eyebrow text-gold">{article.category}</span>
            <h1 className="heading-display text-ivory mt-2 max-w-4xl" style={{ fontSize: 'clamp(1.875rem,4.5vw,4rem)' }}>
              {article.title}
            </h1>
            <p className="text-ivory/70 font-body mt-4 max-w-2xl leading-relaxed" style={{ fontSize: 'clamp(1rem,1.2vw,1.125rem)' }}>
              {article.teaser}
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-5 text-ivory/45 font-body" style={{ fontSize: '12px' }}>
              <span>Sawla Tours field notes</span>
              <span>·</span>
              <span>{article.readingTime} min read</span>
              <span>·</span>
              <time dateTime={article.publishDate}>
                {new Date(article.publishDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </time>
            </div>
          </div>
        </div>
      </section>

      {/* ── NAV BAR ── */}
      <div className="bg-volcanic border-b border-white/10">
        <div className="container-max py-3 flex items-center justify-between gap-4">
          <Link href="/sawla-moments" className="text-ivory/50 hover:text-gold transition-colors font-body" style={{ fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            ← All Sawla Moments
          </Link>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(article.title + ' — https://www.sawlatours.com/sawla-moments/' + slug)}`}
            target="_blank" rel="noopener noreferrer"
            className="text-ivory/50 hover:text-[#25D366] transition-colors font-body flex items-center gap-1.5"
            style={{ fontSize: '12px' }}
            aria-label="Share this article on WhatsApp"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            Share
          </a>
        </div>
      </div>

      {/* ── ARTICLE ── */}
      <article className="section-padding bg-ivory" itemScope itemType="https://schema.org/Article">
        <div className="container-max grid lg:grid-cols-4 gap-12 lg:gap-16">

          {/* ── BODY ── */}
          <div className="lg:col-span-3">

            {/* Intro */}
            {content ? (
              <>
                <p className="prose-luxury text-volcanic/90 font-body leading-relaxed mb-8"
                  style={{ fontSize: 'clamp(1.0625rem,1.4vw,1.1875rem)', lineHeight: '1.88', fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: '300' }}>
                  {content.intro}
                </p>

                {/* Sections */}
                {content.sections.map((section, i) => (
                  <div key={i} className="mb-10">
                    {section.heading && (
                      <h2 className="font-display text-volcanic font-normal mb-4" style={{ fontSize: 'clamp(1.375rem,2.5vw,1.875rem)' }}>
                        {section.heading}
                      </h2>
                    )}
                    <p className="text-warmgrey font-body leading-relaxed" style={{ fontSize: 'clamp(1rem,1.2vw,1.0625rem)', lineHeight: '1.88' }}>
                      {section.body}
                    </p>

                    {/* Insert body images at positions 2 and 4 */}
                    {(i === 1 || i === 3) && (
                      <div className="my-8 grid grid-cols-2 gap-4">
                        <div className="relative aspect-[4/3] overflow-hidden rounded-card">
                          <PlaceholderImage filename={`moments-${slug}-body-${i === 1 ? 1 : 2}.jpg`} width={600} height={450} category="moments" fill className="hover:scale-105 transition-transform duration-700" />
                        </div>
                        <div className="relative aspect-[4/3] overflow-hidden rounded-card">
                          <PlaceholderImage filename={`moments-${slug}-body-${i === 1 ? 2 : 3}.jpg`} width={600} height={450} category="moments" fill className="hover:scale-105 transition-transform duration-700" />
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {/* Pull quote */}
                {content.pullQuote && (
                  <blockquote className="pull-quote my-12">
                    &ldquo;{content.pullQuote}&rdquo;
                  </blockquote>
                )}

                {/* Closing note */}
                {content.closingNote && (
                  <div className="mt-10 p-6 bg-gold-faint rounded-card border border-gold/20">
                    <div className="label-eyebrow mb-2">Practical Note</div>
                    <p className="text-warmgrey font-body leading-relaxed" style={{ fontSize: '0.9375rem' }}>
                      {content.closingNote}
                    </p>
                  </div>
                )}
              </>
            ) : (
              /* Fallback for articles without content yet */
              <div className="prose-luxury space-y-5">
                <p className="text-warmgrey font-body leading-relaxed" style={{ fontSize: 'clamp(1rem,1.2vw,1.0625rem)' }}>
                  {article.teaser}
                </p>
                <div className="grid grid-cols-2 gap-4 my-8">
                  <div className="relative aspect-[4/3] rounded-card overflow-hidden">
                    <PlaceholderImage filename={`moments-${slug}-body-1.jpg`} width={600} height={450} category="moments" fill />
                  </div>
                  <div className="relative aspect-[4/3] rounded-card overflow-hidden">
                    <PlaceholderImage filename={`moments-${slug}-body-2.jpg`} width={600} height={450} category="moments" fill />
                  </div>
                </div>
              </div>
            )}

            {/* ── INLINE CTA ── */}
            <div className="mt-12 bg-volcanic rounded-card p-8 text-ivory">
              <div className="grid sm:grid-cols-2 gap-6 items-center">
                <div>
                  <h3 className="font-display text-ivory font-light mb-3" style={{ fontSize: 'clamp(1.25rem,2vw,1.625rem)' }}>
                    Planning this kind of Ethiopia journey?
                  </h3>
                  <p className="text-ivory/60 font-body leading-relaxed" style={{ fontSize: '0.9375rem' }}>
                    Tell us what draws you — the specific thing, not the general idea. Our Addis Ababa team responds within 24 hours.
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <Link href="/enquire" className="btn-gold justify-center">
                    Start Your Ethiopia Journey
                  </Link>
                  <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 border border-white/20 rounded-sm text-ivory/65 hover:border-[#25D366] hover:text-[#25D366] transition-colors font-body text-xs tracking-wider uppercase cursor-pointer">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                    WhatsApp Instead
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ── SIDEBAR ── */}
          <aside className="lg:col-span-1">
            <div className="sidebar-sticky space-y-5">

              {/* CTA card */}
              <div className="bg-volcanic rounded-card p-6 text-ivory">
                <div className="label-eyebrow text-gold mb-2">Plan This Journey</div>
                <h3 className="font-display text-ivory font-light mb-3" style={{ fontSize: '1.125rem' }}>
                  Ready to Experience Ethiopia?
                </h3>
                <p className="text-ivory/60 font-body leading-relaxed mb-5" style={{ fontSize: '0.875rem' }}>
                  Ethiopia-based team. Private journeys only. Response within 24 hours.
                </p>
                <Link href="/enquire" className="btn-gold w-full justify-center">
                  Start Planning
                </Link>
              </div>

              {/* Related tours */}
              <div className="border border-sand rounded-card p-5 bg-white">
                <div className="label-eyebrow mb-3">Related Tours</div>
                <div className="space-y-2">
                  {[
                    { label: 'Browse All Tour Styles', href: '/tours-by-experience' },
                    { label: `All ${PREMIUM_DESTINATIONS.length} Destinations`, href: '/ethiopias-popular-destinations' },
                    { label: 'Photography Tours', href: '/tours-by-experience/ethiopia-photography-tours' },
                    { label: 'Wildlife Tours', href: '/tours-by-experience/ethiopia-wildlife-tours' },
                    { label: 'Festival Tours', href: '/tours-by-experience/ethiopia-festival-tours' },
                  ].map(l => (
                    <Link key={l.href} href={l.href} className="flex items-center justify-between text-sm group py-1.5">
                      <span className="text-warmgrey group-hover:text-gold transition-colors font-body">{l.label}</span>
                      <svg className="text-gold/40 group-hover:text-gold transition-colors" width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </Link>
                  ))}
                </div>
              </div>

              {/* More field notes */}
              <div className="border border-sand rounded-card p-5 bg-white">
                <div className="label-eyebrow mb-3">More Field Notes</div>
                <div className="space-y-1">
                  {related.slice(0, 4).map(a => (
                    <Link key={a.slug} href={`/sawla-moments/${a.slug}`}
                      className="block py-2.5 border-b border-sand/60 last:border-0 group">
                      <span className="text-warmgrey group-hover:text-gold transition-colors font-body leading-snug" style={{ fontSize: '13px' }}>
                        {a.title}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </article>

      {/* ── RELATED ARTICLES GRID ── */}
      {related.length > 0 && (
        <section className="section-padding-sm bg-volcanic">
          <div className="container-max">
            <h2 className="heading-display text-ivory mb-10 text-center" style={{ fontSize: 'clamp(1.5rem,3vw,2.25rem)' }}>
              More from the Field
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.slice(0, 3).map(a => (
                <Link key={a.slug} href={`/sawla-moments/${a.slug}`}
                  className="group bg-volcanic border border-white/10 rounded-card overflow-hidden hover:border-gold/30 transition-colors duration-300 card-hover">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <PlaceholderImage filename={`moments-${a.slug}-hero.jpg`} width={600} height={375} category="moments" fill className="group-hover:scale-105 transition-transform duration-700" />
                    <div className="image-overlay-light" />
                  </div>
                  <div className="p-5">
                    <span className="label-eyebrow text-gold !mb-1.5" style={{ fontSize: '10px' }}>{a.category}</span>
                    <h3 className="font-display text-ivory font-normal leading-snug group-hover:text-gold transition-colors" style={{ fontSize: 'clamp(1rem,1.5vw,1.125rem)' }}>
                      {a.title}
                    </h3>
                    <div className="text-ivory/40 font-body mt-3" style={{ fontSize: '11.5px' }}>{a.readingTime} min read</div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/sawla-moments" className="btn-ghost-light">All Sawla Moments</Link>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
