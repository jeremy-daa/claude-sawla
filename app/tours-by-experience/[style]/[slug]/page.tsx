import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import PlaceholderImage from "@/components/ui/PlaceholderImage"
import SchemaScript from "@/components/ui/SchemaScript"
import { AnimateIn, AnimateStagger } from "@/components/ui/AnimateIn"
import { breadcrumbSchema, tourSchema } from "@/lib/schema"
import { TOUR_STYLES, TESTIMONIALS, MOMENTS_ARTICLES, SITE } from "@/data/siteData"
import { PREMIUM_DESTINATIONS } from "@/data/destinationsPremium"
import { FIELD_GUIDE_CONTENT } from "@/data/fieldGuideContent"
import { ITINERARIES, getItinerary, getItinerariesByStyle, getRelevantExtensions, getOperatingStatus, getPricingNote, DEFAULT_INCLUSIONS, DEFAULT_EXCLUSIONS, TAILOR_MADE_NOTE } from "@/data/itineraryData"

interface Props { params: Promise<{ style: string; slug: string }> }

// All 36 itineraries are known at build time — statically generate every route.
// Any style/slug pair outside this list (including a valid slug under the wrong
// style) 404s instead of rendering a ghost page at a duplicate URL.
export function generateStaticParams() {
  return ITINERARIES.map(itin => ({ style: itin.styleSlug, slug: itin.slug }))
}
export const dynamicParams = false

// ── Metadata ────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, style } = await params
  const itin = getItinerary(slug)
  const name = itin?.name ?? slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())
  const titleName = itin?.name ?? name
  const shortTitle = titleName.length > 42 ? titleName.slice(0, 40).trimEnd() + "…" : titleName
  const metaDesc = itin?.overview
    ? itin.overview.slice(0, 155).trimEnd() + (itin.overview.length > 155 ? "…" : "")
    : "Private, tailor-made " + name + " with Sawla Tours. Expert Ethiopian guides, full in-country support."
  return {
    title: shortTitle + " | Sawla Tours",
    description: metaDesc,
    alternates: { canonical: "https://www.sawlatours.com/tours-by-experience/" + style + "/" + slug },
    openGraph: { title: titleName + " | Sawla Tours", description: metaDesc, images: [{ url: "https://www.sawlatours.com/images/og-home.jpg", width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title: titleName + " | Sawla Tours" },
  }
}

// ── Design tokens ────────────────────────────────────────────────────────────

const DIFF_COLORS: Record<string, string> = {
  Easy:        "text-green-700 bg-green-50 border-green-100",
  Moderate:    "text-amber-700 bg-amber-50 border-amber-100",
  Challenging: "text-red-700 bg-red-50 border-red-100",
}

// ── Route endpoints ──────────────────────────────────────────────────────────
// Derived from the day list so it can never drift from the actual itinerary.
// Journeys begin at the first overnight; the final day is a departure day, so a
// missing last overnight correctly reads as ending back in Addis Ababa.
function getRouteEnds(itin: NonNullable<ReturnType<typeof getItinerary>>): string | null {
  const first = itin.days.find(d => d.overnight)?.overnight
  const last = [...itin.days].reverse().find(d => d.overnight)?.overnight
  if (!first) return null
  const start = first
  const end = itin.days[itin.days.length - 1]?.overnight ? last : "Addis Ababa"
  if (!end || start === end) return start === "Addis Ababa" ? "Addis Ababa round trip" : `${start} → ${start}`
  return `${start} → ${end}`
}

// ── Suitability logic ────────────────────────────────────────────────────────

function getSuitability(itin: NonNullable<ReturnType<typeof getItinerary>>) {
  const suits: string[] = []
  const notFor: string[] = []
  const bf = itin.bestFor.toLowerCase()

  if (itin.difficulty === "Easy")        suits.push("First-time visitors to Ethiopia")
  if (itin.difficulty === "Moderate")    suits.push("Travelers comfortable with varied terrain and long drives")
  if (itin.difficulty === "Challenging") suits.push("Adventurous travelers in good physical condition")
  if (itin.difficulty === "Challenging") notFor.push("Travelers with limited mobility or health restrictions")
  if (itin.duration <= 7)  suits.push("Travelers with limited time who want a focused experience")
  if (itin.duration >= 12) suits.push("Travelers who want depth rather than a highlights sweep")
  if (itin.duration >= 14) suits.push("Independent travelers returning to Ethiopia or specialists")
  if (itin.duration <= 5)  notFor.push("Travelers hoping to cover multiple remote regions")
  if (bf.includes("photo"))    suits.push("Photographers and visual storytellers")
  if (bf.includes("wild"))     suits.push("Nature enthusiasts and wildlife specialists")
  if (bf.includes("cultural")) suits.push("Travelers interested in living cultures and history")
  if (bf.includes("couple"))   suits.push("Couples looking for a meaningful private experience")
  if (bf.includes("family"))   suits.push("Families with children aged 10+")
  notFor.push("Travelers expecting resort-style comfort throughout")
  notFor.push("Those who prefer fully scripted group tour experiences")

  return { suits: suits.slice(0, 4), notFor: notFor.slice(0, 3) }
}

// ── Smart interlinking logic ─────────────────────────────────────────────────

function getLinkedDestinations(style: string, itin: NonNullable<ReturnType<typeof getItinerary>>) {
  const keywords: Record<string, string[]> = {
    "historic-cultural-ethiopia-tours":   ["lalibela","gondar","bahir-dar-lake-tana","tigray-rock-hewn-churches-historical-sites","axum"],
    "omo-valley-cultural-tours":          ["omo-valley-tribes","konso","arba-minch-nechsar"],
    "ethiopia-wildlife-tours":            ["bale-mountains-national-park","simien-mountain-national-park"],
    "ethiopia-birdwatching-tours":        ["bale-mountains-national-park","awash-national-park","simien-mountain-national-park"],
    "ethiopia-adventure-tours":           ["danakil-depression-tour-packages","simien-mountain-national-park","bale-mountains-national-park"],
    "ethiopia-festival-tours":            ["lalibela","gondar","addis-ababa"],
    "ethiopia-photography-tours":         ["omo-valley-tribes","danakil-depression-tour-packages","lalibela"],
    "ethiopia-special-interest-tours":    ["kafa-biosphere-coffee-forest","addis-ababa","harar"],
    "addis-ababa-day-tours":             ["addis-ababa"],
  }

  // Also extract destination hints from the itinerary name
  const itinLower = (itin.name + " " + itin.overview).toLowerCase()
  const extraSlugs = PREMIUM_DESTINATIONS
    .filter(d => itinLower.includes(d.shortName.toLowerCase()) || itinLower.includes(d.slug.replace(/-/g, " ")))
    .map(d => d.slug)

  const targetSlugs = [...new Set([...(keywords[style] ?? []), ...extraSlugs])]

  return PREMIUM_DESTINATIONS
    .filter(d => targetSlugs.includes(d.slug))
    .slice(0, 4)
}

function getLinkedGuides(style: string) {
  const guideMap: Record<string, string[]> = {
    "historic-cultural-ethiopia-tours":   ["when-to-visit-ethiopia","how-to-plan-your-trip","ethiopia-travel-circuits","cultural-etiquette-ethiopia"],
    "omo-valley-cultural-tours":          ["cultural-etiquette-ethiopia","responsible-travel-ethiopia","when-to-visit-ethiopia","what-to-pack-for-ethiopia"],
    "ethiopia-wildlife-tours":            ["popular-wildlife-ethiopia","ethiopia-safaris","when-to-visit-ethiopia","what-to-pack-for-ethiopia"],
    "ethiopia-birdwatching-tours":        ["ethiopia-birding-guide","when-to-visit-ethiopia","drone-binocular-permits-ethiopia","what-to-pack-for-ethiopia"],
    "ethiopia-adventure-tours":           ["mobile-camping-ethiopia","health-safety-ethiopia","what-to-pack-for-ethiopia","ethiopia-travel-circuits"],
    "ethiopia-festival-tours":            ["ethiopia-festival-calendar","cultural-etiquette-ethiopia","when-to-visit-ethiopia","how-to-plan-your-trip"],
    "ethiopia-photography-tours":         ["ethiopia-photography-guide","drone-binocular-permits-ethiopia","cultural-etiquette-ethiopia","responsible-travel-ethiopia"],
    "ethiopia-special-interest-tours":    ["ethiopian-food-coffee","responsible-travel-ethiopia","how-to-plan-your-trip","when-to-visit-ethiopia"],
    "addis-ababa-day-tours":             ["how-to-get-to-ethiopia","ethiopia-visa-guide","ethiopian-food-coffee","hotels-lodges-ethiopia"],
  }

  const targetSlugs = guideMap[style] ?? ["when-to-visit-ethiopia","how-to-plan-your-trip","safety-in-ethiopia"]
  return FIELD_GUIDE_CONTENT.filter(g => targetSlugs.includes(g.slug)).slice(0, 4)
}

function getLinkedMoments(style: string) {
  const momentMap: Record<string, string[]> = {
    "historic-cultural-ethiopia-tours":   ["abuna-yemata-guh-tigray-church","timkat-festival-gondar-ethiopia","why-ethiopia-not-safari-destination"],
    "omo-valley-cultural-tours":          ["hamer-bull-jumping-ceremony-ethiopia","photographing-omo-valley-ethiopia","why-ethiopia-not-safari-destination"],
    "ethiopia-wildlife-tours":            ["ethiopian-wolf-bale-mountains-sanetti-plateau","gelada-monkey-simien-mountains","why-ethiopia-not-safari-destination"],
    "ethiopia-birdwatching-tours":        ["ethiopian-wolf-bale-mountains-sanetti-plateau","gelada-monkey-simien-mountains"],
    "ethiopia-adventure-tours":           ["danakil-depression-what-to-expect","ethiopian-wolf-bale-mountains-sanetti-plateau"],
    "ethiopia-festival-tours":            ["timkat-festival-gondar-ethiopia","hamer-bull-jumping-ceremony-ethiopia"],
    "ethiopia-photography-tours":         ["photographing-omo-valley-ethiopia","abuna-yemata-guh-tigray-church","danakil-depression-what-to-expect"],
    "ethiopia-special-interest-tours":    ["why-ethiopia-not-safari-destination","gelada-monkey-simien-mountains"],
    "addis-ababa-day-tours":             ["why-ethiopia-not-safari-destination"],
  }

  const slugs = momentMap[style] ?? []
  return MOMENTS_ARTICLES.filter(a => slugs.includes(a.slug)).slice(0, 3)
}

// ── Journey-specific CTA copy (varied, not a generic "Contact Us") ───────────

function getCtaCopy(itin: NonNullable<ReturnType<typeof getItinerary>> | undefined, shortName: string) {
  if (!itin) {
    return { primary: "Enquire About This Journey", sidebarHeading: "Plan This Journey" }
  }
  const byDifficulty: Record<string, string> = {
    Easy: "Start Planning " + shortName,
    Moderate: "Tailor " + shortName + " With Sawla",
    Challenging: "Ask Us About Timing, Access & Pace",
  }
  return {
    primary: byDifficulty[itin.difficulty] ?? ("Tailor " + shortName + " With Sawla"),
    sidebarHeading: "Plan This Journey Privately",
  }
}

// ── WA Icon ──────────────────────────────────────────────────────────────────

const WA_ICON = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
)

const ARROW = (
  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function ItineraryPage({ params }: Props) {
  const { style, slug } = await params
  const tourStyle  = TOUR_STYLES.find(s => s.slug === style)
  const itin       = getItinerary(slug)
  if (!itin || itin.styleSlug !== style) notFound()
  const name       = itin.name

  const relatedItins = getItinerariesByStyle(style).filter(i => i.slug !== slug).slice(0, 3)
  const suitability  = itin ? getSuitability(itin) : null
  const shortName    = name.length > 28 ? name.split(/[,:]/)[0].trim() : name
  const ctaCopy      = getCtaCopy(itin, shortName)
  const extensions   = itin ? getRelevantExtensions(itin) : []
  const inclusions   = itin?.included ?? DEFAULT_INCLUSIONS
  const exclusions   = itin?.excluded ?? DEFAULT_EXCLUSIONS

  // Journey-aware enquiry link — carries context into the enquiry form so travelers
  // never have to re-type what journey, style, or duration prompted their enquiry.
  const enquireHref = itin
    ? "/enquire?" + new URLSearchParams({
        journey: itin.slug,
        journeyName: itin.name,
        style: tourStyle?.name ?? style,
        duration: itin.durationLabel,
        status: getOperatingStatus(itin),
      }).toString()
    : "/enquire"

  // Smart interlinking
  const linkedDestinations = itin ? getLinkedDestinations(style, itin) : []
  const linkedGuides       = getLinkedGuides(style)
  const linkedMoments      = getLinkedMoments(style)

  // Best matching testimonial
  const testimonial = TESTIMONIALS.find(t =>
    t.useOn?.some(u => u.includes(style.split("-")[0]) || u.includes(style.split("-")[1] ?? "x"))
  ) ?? TESTIMONIALS.find(t => t.useOn?.includes("testimonials")) ?? TESTIMONIALS[0]

  const schemas = [
    tourSchema({ name, url: "https://www.sawlatours.com/tours-by-experience/" + style + "/" + slug, description: itin?.overview ?? name, durationDays: itin?.duration }),
    breadcrumbSchema([
      { name: "Home",  url: "https://www.sawlatours.com" },
      { name: "Tours", url: "https://www.sawlatours.com/tours-by-experience" },
      { name: tourStyle?.name ?? style, url: "https://www.sawlatours.com/tours-by-experience/" + style },
      { name, url: "https://www.sawlatours.com/tours-by-experience/" + style + "/" + slug },
    ]),
  ]

  return (
    <>
      {schemas.map((s, i) => <SchemaScript key={i} schema={s} />)}

      {/* ── CINEMATIC HERO ─────────────────────────────────────────────── */}
      <section className="relative h-[78vh] min-h-[560px] overflow-hidden" aria-labelledby="itin-heading">
        <PlaceholderImage filename={"tour-" + slug + "-hero.jpg"} width={1920} height={1080} category="tour" fill className="object-center" label={name + " — private Ethiopia journey with Sawla Tours"} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(42,39,36,0.93) 0%, rgba(42,39,36,0.28) 52%, rgba(42,39,36,0.2) 100%)" }} />
        <div className="absolute inset-0 flex flex-col justify-end pb-16 md:pb-24">
          <div className="container-max text-ivory">
            <AnimateIn>
              <nav aria-label="Breadcrumb" className="mb-5">
                <ol className="flex flex-wrap items-center gap-2 font-body" style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  <li><Link href="/" className="text-ivory/45 hover:text-gold transition-colors">Home</Link></li>
                  <li className="text-ivory/25">/</li>
                  <li><Link href="/tours-by-experience" className="text-ivory/45 hover:text-gold transition-colors">Tours</Link></li>
                  <li className="text-ivory/25">/</li>
                  {tourStyle && (<><li><Link href={"/tours-by-experience/" + style} className="text-ivory/45 hover:text-gold transition-colors">{tourStyle.name}</Link></li><li className="text-ivory/25">/</li></>)}
                  <li className="text-ivory/70">{name}</li>
                </ol>
              </nav>
              {tourStyle && <span className="label-eyebrow text-gold">{tourStyle.name}</span>}
              <h1 id="itin-heading" className="heading-display text-ivory mt-2" style={{ fontSize: "clamp(2.25rem,5vw,4.75rem)" }}>{name}</h1>
              <div className="flex flex-wrap gap-2.5 mt-6">
                {itin && <span className="border border-white/30 text-ivory/90 rounded-full px-4 py-1.5 font-body font-medium" style={{ fontSize: "12.5px" }}>{itin.durationLabel}</span>}
                {itin && <span className={"border rounded-full px-4 py-1.5 font-body font-medium " + (DIFF_COLORS[itin.difficulty] ?? "border-white/30 text-ivory/90")} style={{ fontSize: "12.5px" }}>{itin.difficulty}</span>}
                {itin && <span className="border border-gold/55 text-gold rounded-full px-4 py-1.5 font-body font-medium" style={{ fontSize: "12.5px" }}>Privately Quoted</span>}
                {itin?.bestMonths && <span className="border border-white/20 text-ivory/65 rounded-full px-4 py-1.5 font-body" style={{ fontSize: "12.5px" }}>{itin.bestMonths}</span>}
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT + SIDEBAR ─────────────────────────────────────── */}
      <section className="section-padding bg-ivory">
        <div className="container-max">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">

            {/* ── ARTICLE COLUMN ── */}
            <div className="lg:col-span-2 space-y-12">

              {/* Overview */}
              {itin?.overview && (
                <AnimateIn>
                  <span className="label-eyebrow">Overview</span>
                  <p className="text-warmgrey font-body leading-relaxed" style={{ fontSize: "clamp(1.0625rem,1.4vw,1.1875rem)", lineHeight: "1.85" }}>{itin.overview}</p>
                </AnimateIn>
              )}

              {/* Why This Journey — the emotional case, given its own frame rather than
                  reading as a second overview paragraph */}
              {itin?.journeyNarrative && (
                <AnimateIn>
                  <span className="label-eyebrow">Why This Journey</span>
                  <p className="font-display text-volcanic font-light leading-relaxed" style={{ fontSize: "clamp(1.1875rem,1.9vw,1.5rem)", lineHeight: "1.7" }}>{itin.journeyNarrative}</p>
                </AnimateIn>
              )}

              {/* Tailor-made note — every journey page must say this clearly */}
              {itin && (
                <AnimateIn className="flex items-start gap-3 p-4 bg-gold-faint/60 border border-gold/20 rounded-card">
                  <svg className="text-gold flex-shrink-0 mt-0.5" width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.3"/><path d="M8 5v3.5M8 11v.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
                  <p className="text-volcanic font-body leading-relaxed" style={{ fontSize: "0.875rem" }}>{TAILOR_MADE_NOTE}</p>
                </AnimateIn>
              )}

              {/* Route Intelligence */}
              {itin?.routeIntelligence && itin.routeIntelligence.length > 0 && (
                <AnimateIn>
                  <span className="label-eyebrow">Route Intelligence</span>
                  <h2 className="font-display text-volcanic font-normal mb-5" style={{ fontSize: "clamp(1.375rem,2.5vw,1.875rem)" }}>Why This Route Is Sequenced This Way</h2>
                  <div className="space-y-3">
                    {itin.routeIntelligence.map((point, i) => (
                      <div key={i} className="flex items-start gap-3 p-4 bg-white border border-sand rounded-card">
                        <svg className="text-gold flex-shrink-0 mt-1" width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M1 7h12M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        <span className="text-warmgrey font-body leading-relaxed" style={{ fontSize: "0.9375rem" }}>{point}</span>
                      </div>
                    ))}
                  </div>
                </AnimateIn>
              )}

              {/* Highlights */}
              {itin?.highlights && itin.highlights.length > 0 && (
                <AnimateIn>
                  <h2 className="font-display text-volcanic font-normal mb-6" style={{ fontSize: "clamp(1.375rem,2.5vw,1.875rem)" }}>Journey Highlights</h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {itin.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-3 p-4 bg-gold-faint rounded-[10px] border border-gold/15">
                        <svg className="text-gold flex-shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M2 7l4 4 6-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        <span className="text-volcanic font-body" style={{ fontSize: "0.9375rem" }}>{h}</span>
                      </div>
                    ))}
                  </div>
                </AnimateIn>
              )}

              {/* Day by Day — premium day modules with graceful degradation */}
              {itin?.days && itin.days.length > 0 && (
                <AnimateIn>
                  <h2 className="font-display text-volcanic font-normal mb-6" style={{ fontSize: "clamp(1.375rem,2.5vw,1.875rem)" }}>Day by Day</h2>
                  <div className="space-y-2">
                    {itin.days.map((day, i) => {
                      const isEnriched = Boolean(day.orientation || day.experience)
                      return (
                        <details key={i} className="border border-sand rounded-card overflow-hidden group" open={i === 0}>
                          <summary className="flex items-center gap-4 px-5 py-4 cursor-pointer list-none hover:bg-gold-faint/40 transition-colors">
                            <span className="font-display text-gold-ink font-light flex-shrink-0" style={{ fontSize: "1.125rem", minWidth: "3.5rem" }}>Day {day.day}</span>
                            <span className="font-body font-medium text-volcanic flex-1 leading-snug" style={{ fontSize: "14px" }}>{day.title}</span>
                            <span className="ml-auto text-gold-ink text-xl leading-none group-open:rotate-45 transition-transform duration-200 flex-shrink-0 summary-icon">+</span>
                          </summary>
                          <div className="px-5 pb-5 pt-1 border-t border-sand/60 space-y-3">
                            {isEnriched ? (
                              <>
                                {day.orientation && (
                                  <p className="text-warmgrey font-body leading-relaxed" style={{ fontSize: "0.9375rem" }}>{day.orientation}</p>
                                )}
                                {day.experience && (
                                  <p className="text-warmgrey font-body leading-relaxed" style={{ fontSize: "0.9375rem" }}>{day.experience}</p>
                                )}
                                {(day.paceNotes || day.travelTime || day.walkingLevel) && (
                                  <div className="p-3 bg-sand/25 rounded-[10px]">
                                    <div className="label-eyebrow !mb-1.5 text-[10px]">Pace &amp; Practical Notes</div>
                                    <p className="text-volcanic font-body leading-relaxed" style={{ fontSize: "0.875rem" }}>
                                      {[day.travelTime, day.walkingLevel, day.paceNotes].filter(Boolean).join(" · ")}
                                    </p>
                                  </div>
                                )}
                                {day.fieldNote && (
                                  <blockquote className="border-l-2 border-gold pl-4 text-volcanic font-body italic leading-relaxed" style={{ fontSize: "0.875rem" }}>
                                    <span className="text-gold-ink not-italic font-medium">Sawla field note:</span> {day.fieldNote}
                                  </blockquote>
                                )}
                                {day.conditionalNotes && (
                                  <div className="flex items-start gap-2.5 p-4 bg-amber-50/60 border border-amber-100 rounded-[10px]">
                                    <svg className="text-amber-600 flex-shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.3"/><path d="M8 5v4M8 11v.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
                                    <span className="text-amber-900 font-body leading-relaxed" style={{ fontSize: "0.8125rem" }}>{day.conditionalNotes}</span>
                                  </div>
                                )}
                              </>
                            ) : (
                              <p className="text-warmgrey font-body leading-relaxed" style={{ fontSize: "0.9375rem" }}>{day.description}</p>
                            )}
                            {(day.accommodation || day.overnight) && (
                              <p className="flex items-center gap-1.5 text-warmgrey font-body" style={{ fontSize: "12px" }}>
                                <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M10 6A4 4 0 1 1 6 2c0 .8.3 1.6.8 2.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
                                {day.accommodation
                                  ? <>Accommodation: <strong className="text-volcanic font-medium">{day.accommodation}</strong></>
                                  : <>Overnight: <strong className="text-volcanic font-medium">{day.overnight}</strong></>}
                              </p>
                            )}
                          </div>
                        </details>
                      )
                    })}
                  </div>

                  {/* Make This Journey Yours — the reader has just finished the full route:
                      this is peak intent, so meet it with honest adaptability + a soft CTA */}
                  {itin && (
                    <div className="mt-6 p-6 bg-volcanic rounded-card text-ivory">
                      <div className="label-eyebrow text-gold !mb-2">Make This Journey Yours</div>
                      <p className="text-ivory/70 font-body leading-relaxed mb-4" style={{ fontSize: "0.9375rem" }}>
                        Every day above is a starting point, not a fixed schedule. On your version we can:
                      </p>
                      <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 mb-5">
                        {[
                          "Soften the pace — extra nights, later starts",
                          "Upgrade the accommodation tier where the route allows",
                          "Weight days toward photography or special interests",
                          itin.difficulty === "Challenging"
                            ? "Add acclimatization and rest days"
                            : "Shorten or extend the route around your dates",
                          "Travel entirely privately — every departure already is",
                        ].map(t => (
                          <li key={t} className="flex items-start gap-2.5 text-ivory/85 font-body" style={{ fontSize: "13.5px" }}>
                            <svg className="text-gold flex-shrink-0 mt-1" width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M2 7l4 4 6-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            {t}
                          </li>
                        ))}
                      </ul>
                      <Link href={enquireHref} className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors font-body font-medium" style={{ fontSize: "12.5px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                        Ask us to adapt this route {ARROW}
                      </Link>
                    </div>
                  )}
                </AnimateIn>
              )}

              {/* Accommodation Approach */}
              {itin?.accommodationApproach && itin.accommodationApproach.length > 0 && (
                <AnimateIn>
                  <span className="label-eyebrow">Accommodation Approach</span>
                  <h2 className="font-display text-volcanic font-normal mb-5" style={{ fontSize: "clamp(1.375rem,2.5vw,1.875rem)" }}>Where You&apos;ll Stay</h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {itin.accommodationApproach.map((a, i) => (
                      <div key={i} className="flex items-start gap-3 p-4 bg-white border border-sand rounded-card">
                        <svg className="text-gold flex-shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2 13V6l6-4 6 4v7M2 13h12M6 13V9h4v4" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/></svg>
                        <span className="text-warmgrey font-body leading-relaxed" style={{ fontSize: "0.9375rem" }}>{a}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-3 text-warmgrey font-body" style={{ fontSize: "12px" }}>
                    Accommodation styles shown are indicative — the best available option at each stage is confirmed with your quote.
                  </p>
                </AnimateIn>
              )}

              {/* No data fallback */}
              {!itin && (
                <AnimateIn className="p-8 bg-gold-faint rounded-card border border-gold/20 text-center">
                  <h2 className="font-display text-volcanic font-normal mb-3" style={{ fontSize: "clamp(1.25rem,2vw,1.625rem)" }}>{name}</h2>
                  <p className="text-warmgrey font-body leading-relaxed mb-6">Full itinerary details available on enquiry.</p>
                  <Link href={enquireHref} className="btn-primary">Request Full Itinerary</Link>
                </AnimateIn>
              )}

              {/* Good to Know */}
              {itin?.goodToKnow && itin.goodToKnow.length > 0 && (
                <AnimateIn>
                  <h3 className="font-display text-volcanic font-normal mb-5" style={{ fontSize: "clamp(1.125rem,1.75vw,1.375rem)" }}>Good to Know</h3>
                  <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
                    {itin.goodToKnow.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-warmgrey font-body" style={{ fontSize: "0.9375rem" }}>
                        <svg className="text-gold flex-shrink-0 mt-1" width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true"><circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.3"/><path d="M7 4.5v3l1.5 1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </AnimateIn>
              )}

              {/* Who This Suits / Doesn't Suit */}
              {suitability && (
                <AnimateIn>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="p-6 bg-green-50/60 border border-green-100 rounded-card">
                      <div className="flex items-center gap-2 mb-4">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="7" stroke="#16a34a" strokeWidth="1.3"/><path d="M4.5 8l2.5 2.5 4.5-5" stroke="#16a34a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        <span className="font-body font-medium text-green-800" style={{ fontSize: "11.5px", letterSpacing: "0.1em", textTransform: "uppercase" }}>This Journey Suits</span>
                      </div>
                      <ul className="space-y-2.5">
                        {suitability.suits.map((s, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-green-900 font-body" style={{ fontSize: "13.5px" }}>
                            <span className="text-green-600 mt-0.5 flex-shrink-0">✓</span>{s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-6 bg-amber-50/60 border border-amber-100 rounded-card">
                      <div className="flex items-center gap-2 mb-4">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="7" stroke="#d97706" strokeWidth="1.3"/><path d="M8 5v4M8 11v.5" stroke="#d97706" strokeWidth="1.4" strokeLinecap="round"/></svg>
                        <span className="font-body font-medium text-amber-800" style={{ fontSize: "11.5px", letterSpacing: "0.1em", textTransform: "uppercase" }}>May Not Suit</span>
                      </div>
                      <ul className="space-y-2.5">
                        {suitability.notFor.map((s, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-amber-900 font-body" style={{ fontSize: "13.5px" }}>
                            <span className="text-amber-600 mt-0.5 flex-shrink-0">–</span>{s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <p className="mt-4 text-warmgrey font-body" style={{ fontSize: "12.5px" }}>
                    Not sure?{" "}
                    <Link href={enquireHref} className="text-gold-ink hover:underline">Ask our specialists — no commitment required.</Link>
                  </p>
                </AnimateIn>
              )}

              {/* ── LINKED DESTINATIONS ───────────────────────────────── */}
              {linkedDestinations.length > 0 && (
                <AnimateIn>
                  <div className="border-t border-sand/60 pt-8">
                    <span className="label-eyebrow">Destinations on This Journey</span>
                    <h3 className="font-display text-volcanic font-normal mb-6" style={{ fontSize: "clamp(1.25rem,2vw,1.625rem)" }}>
                      Places This Itinerary Visits
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {linkedDestinations.map(d => (
                        <Link key={d.slug} href={"/ethiopias-popular-destinations/" + d.slug}
                          className="group flex items-center gap-4 p-4 rounded-card border border-sand bg-white hover:border-gold/40 hover:bg-gold-faint/30 transition-colors duration-300">
                          <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                            <PlaceholderImage filename={"dest-" + d.slug + "-card.jpg"} width={56} height={56} category="destination" fill className="group-hover:scale-110 transition-transform duration-500" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="font-display text-volcanic font-normal group-hover:text-gold-ink transition-colors leading-snug" style={{ fontSize: "1rem" }}>{d.name}</div>
                            <div className="text-warmgrey font-body mt-0.5" style={{ fontSize: "11.5px" }}>{d.region}</div>
                            <div className="text-gold-ink font-body mt-0.5" style={{ fontSize: "11px" }}>{d.difficulty} · {d.idealStay}</div>
                          </div>
                          <span className="text-gold-ink group-hover:translate-x-0.5 transition duration-200 flex-shrink-0">{ARROW}</span>
                        </Link>
                      ))}
                    </div>
                    <p className="mt-4">
                      <Link href="/ethiopias-popular-destinations" className="inline-flex items-center gap-1.5 text-gold-ink hover:text-volcanic transition-colors font-body font-medium" style={{ fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                        All {PREMIUM_DESTINATIONS.length} Ethiopia Destinations {ARROW}
                      </Link>
                    </p>
                  </div>
                </AnimateIn>
              )}

              {/* Pricing guidance */}
              {itin && (
                <AnimateIn className="p-6 bg-gold-faint/40 border border-gold/25 rounded-card">
                  <div className="label-eyebrow !mb-3">Pricing Guidance</div>
                  <p className="text-warmgrey font-body leading-relaxed" style={{ fontSize: "0.9375rem" }}>
                    {getPricingNote(itin)}
                  </p>
                  <Link href="/planning-and-pricing" className="inline-block mt-3 text-gold-ink hover:text-volcanic transition-colors font-body font-medium cursor-pointer" style={{ fontSize: "12.5px", letterSpacing: "0.06em" }}>
                    How our pricing works →
                  </Link>
                </AnimateIn>
              )}

              {/* Inclusions / Exclusions */}
              {itin && (
                <AnimateIn>
                  <span className="label-eyebrow">Inclusions &amp; Exclusions</span>
                  <h2 className="font-display text-volcanic font-normal mb-6" style={{ fontSize: "clamp(1.375rem,2.5vw,1.875rem)" }}>What&apos;s Included</h2>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="p-6 bg-green-50/60 border border-green-100 rounded-card">
                      <div className="label-eyebrow !mb-4 text-green-800 text-[11px]">Typically Included</div>
                      <ul className="space-y-2.5">
                        {inclusions.map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-green-900 font-body" style={{ fontSize: "13.5px" }}>
                            <span className="text-green-600 mt-0.5 flex-shrink-0">✓</span>{item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-6 bg-sand/25 border border-sand rounded-card">
                      <div className="label-eyebrow !mb-4 text-[11px]">Typically Excluded</div>
                      <ul className="space-y-2.5">
                        {exclusions.map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-warmgrey font-body" style={{ fontSize: "13.5px" }}>
                            <span className="text-warmgrey/60 mt-0.5 flex-shrink-0">–</span>{item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <p className="mt-4 text-warmgrey font-body" style={{ fontSize: "12.5px" }}>
                    Exact inclusions are confirmed in your personalised quote — this list reflects Sawla Tours&apos; standard approach for private journeys.
                  </p>
                </AnimateIn>
              )}

              {/* Extensions */}
              {extensions.length > 0 && (
                <AnimateIn>
                  <span className="label-eyebrow">Extend This Journey</span>
                  <h2 className="font-display text-volcanic font-normal mb-6" style={{ fontSize: "clamp(1.375rem,2.5vw,1.875rem)" }}>Ways to Go Further</h2>
                  <div className="grid sm:grid-cols-2 gap-5">
                    {extensions.map((ext, i) => (
                      <div key={i} className="p-6 bg-gold-faint/40 border border-gold/20 rounded-card">
                        <h3 className="font-display text-volcanic font-normal mb-2" style={{ fontSize: "1.0625rem" }}>{ext.title}</h3>
                        <p className="text-warmgrey font-body leading-relaxed mb-3" style={{ fontSize: "0.875rem" }}>{ext.description}</p>
                        {ext.bestFor && (
                          <p className="text-gold-ink font-body" style={{ fontSize: "11.5px" }}><strong className="font-medium">Best for:</strong> {ext.bestFor}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </AnimateIn>
              )}

              {/* Enquiry CTA */}
              {itin && (
                <AnimateIn>
                  <div className="p-7 bg-volcanic rounded-card text-ivory">
                    <div className="grid sm:grid-cols-2 gap-6 items-center">
                      <div>
                        <h3 className="font-display text-ivory font-light mb-3" style={{ fontSize: "clamp(1.25rem,2vw,1.625rem)" }}>{ctaCopy.sidebarHeading}</h3>
                        <p className="text-ivory/65 font-body leading-relaxed" style={{ fontSize: "0.9375rem" }}>
                          Ask us about timing, access, and comfort for {shortName} — every detail is confirmed with your personalised quote within 24 hours.
                        </p>
                      </div>
                      <div className="flex flex-col gap-3">
                        <Link href={enquireHref} className="btn-gold justify-center whitespace-normal text-center leading-snug">{ctaCopy.primary}</Link>
                        <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 py-2.5 border border-white/20 rounded-sm text-ivory/70 hover:border-[#25D366] hover:text-[#25D366] transition-colors font-body cursor-pointer"
                          style={{ fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                          {WA_ICON} WhatsApp Instead
                        </a>
                      </div>
                    </div>
                  </div>
                </AnimateIn>
              )}
            </div>

            {/* ── STICKY SIDEBAR ── */}
            <aside className="lg:col-span-1">
              <div className="sidebar-sticky space-y-5">

                {/* Enquiry card */}
                <div className="bg-volcanic rounded-card p-7 text-ivory">
                  <div className="label-eyebrow text-gold mb-2">Plan This Journey</div>
                  <div className="font-display text-gold font-light mb-1" style={{ fontSize: "clamp(1.375rem,2.25vw,1.875rem)" }}>Privately Quoted</div>
                  <p className="text-ivory/45 font-body mb-5" style={{ fontSize: "11.5px" }}>Per person · private, tailor-made</p>
                  <p className="text-ivory/65 font-body leading-relaxed mb-6" style={{ fontSize: "0.9375rem" }}>
                    {TAILOR_MADE_NOTE}
                  </p>
                  <Link href={enquireHref} className="btn-gold w-full justify-center mb-3 whitespace-normal text-center leading-snug">{ctaCopy.primary}</Link>
                  <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 border border-white/20 rounded-sm text-ivory/70 hover:border-[#25D366] hover:text-[#25D366] transition-colors font-body cursor-pointer"
                    style={{ fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    {WA_ICON} WhatsApp
                  </a>
                </div>

                {/* Quick facts */}
                {itin && (
                  <div className="border border-sand rounded-card p-5 bg-white">
                    <div className="label-eyebrow mb-4">At a Glance</div>
                    <dl className="space-y-4">
                      {[
                        { l: "Duration", v: itin.durationLabel },
                        { l: "Route", v: getRouteEnds(itin) },
                        { l: "Difficulty", v: itin.difficulty },
                        { l: "Best Months", v: itin.bestMonths },
                        { l: "Best For", v: itin.bestFor },
                      ].filter(item => item.v).map(item => (
                        <div key={item.l}>
                          <dt className="text-warmgrey font-body" style={{ fontSize: "10.5px", letterSpacing: "0.12em", textTransform: "uppercase" }}>{item.l}</dt>
                          <dd className="font-body font-medium text-volcanic mt-0.5" style={{ fontSize: "13.5px" }}>{item.v}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}

                {/* Tour style */}
                {tourStyle && (
                  <div className="border border-gold/20 rounded-card p-5 bg-gold-faint/40">
                    <div className="label-eyebrow mb-1">Tour Style</div>
                    <div className="font-display text-volcanic font-normal mb-2 leading-snug" style={{ fontSize: "1.0625rem" }}>{tourStyle.name}</div>
                    <p className="text-warmgrey font-body mb-4" style={{ fontSize: "13.5px", lineHeight: "1.65" }}>{tourStyle.tagline}</p>
                    <Link href={"/tours-by-experience/" + style} className="inline-flex items-center gap-1.5 text-gold-ink hover:text-volcanic transition-colors font-body font-medium" style={{ fontSize: "11.5px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                      All {tourStyle.name} Tours {ARROW}
                    </Link>
                  </div>
                )}

                {/* Planning guides sidebar */}
                {linkedGuides.length > 0 && (
                  <div className="border border-sand rounded-card p-5 bg-white">
                    <div className="label-eyebrow mb-4">Planning Guides</div>
                    <div className="space-y-2">
                      {linkedGuides.map(g => (
                        <Link key={g.slug} href={"/ethiopia-travel-guide/" + g.slug}
                          className="flex items-center justify-between group py-1.5">
                          <span className="text-warmgrey group-hover:text-gold-ink transition-colors font-body leading-snug" style={{ fontSize: "13px" }}>{g.title}</span>
                          <span className="text-gold-ink group-hover:translate-x-0.5 transition-transform flex-shrink-0 ml-2">{ARROW}</span>
                        </Link>
                      ))}
                    </div>
                    <Link href="/ethiopia-travel-guide" className="inline-flex items-center gap-1 mt-4 text-gold-ink hover:text-volcanic transition-colors font-body font-medium" style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                      All Guides {ARROW}
                    </Link>
                  </div>
                )}

                {/* Trust signals */}
                <div className="border border-sand rounded-card p-5 space-y-3 bg-white">
                  <div className="label-eyebrow">Why Book With Us</div>
                  {["Ethiopia-based team — not a remote agent","Private journey, designed for you alone","No booking fee to enquire","Response within 24 hours","In-country support throughout"].map(t => (
                    <div key={t} className="flex items-start gap-2.5">
                      <svg className="text-gold flex-shrink-0 mt-0.5" width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M2 7l4 4 6-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      <span className="text-warmgrey font-body" style={{ fontSize: "13px" }}>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── GALLERY ──────────────────────────────────────────────────────── */}
      <section className="bg-volcanic py-14">
        <div className="container-max">
          <AnimateIn className="mb-8">
            <span className="label-eyebrow text-gold">From the Field</span>
            <h2 className="heading-display text-ivory mt-1" style={{ fontSize: "clamp(1.375rem,2.5vw,2rem)" }}>What This Journey Looks Like</h2>
          </AnimateIn>
          <AnimateStagger className="grid grid-cols-2 md:grid-cols-4 gap-3" staggerDelay={0.06}>
            {[1,2,3,4].map(i => (
              <div key={i} className={"relative overflow-hidden rounded-[12px] " + (i===1?"col-span-2 aspect-square":"aspect-[4/3]")}>
                <PlaceholderImage filename={"tour-"+slug+"-gallery-"+i+".jpg"} width={i===1?800:400} height={i===1?800:300} category="tour" fill className="hover:scale-105 transition-transform duration-700" />
              </div>
            ))}
          </AnimateStagger>
        </div>
      </section>

      {/* ── HOW THIS JOURNEY IS DESIGNED ─────────────────────────────────── */}
      <section className="section-padding-sm bg-ivory border-t border-sand/60">
        <div className="container-max max-w-4xl mx-auto">
          <AnimateIn className="text-center mb-12">
            <span className="label-eyebrow">Before You Book</span>
            <h2 className="heading-display text-volcanic mt-1" style={{ fontSize: "clamp(1.5rem,3vw,2.25rem)" }}>How This Journey Is Designed for You</h2>
          </AnimateIn>
          <AnimateStagger className="grid md:grid-cols-3 gap-6" staggerDelay={0.1}>
            {[
              { n:"01", t:"You tell us your dates and priorities", b:"This itinerary is a well-tested starting point. Your actual journey is adapted to your travel dates, group size, pace, and what matters most." },
              { n:"02", t:"We design your version", b:"Our specialists refine the route, suggest accommodation that matches your comfort level, and flag any seasonal or access considerations." },
              { n:"03", t:"You travel with full support", b:"Private guide, private 4WD vehicle, 24/7 in-country contact. All internal logistics coordinated before you arrive in Ethiopia." },
            ].map(step => (
              <div key={step.n} className="border-t-2 border-gold/20 pt-6">
                <div aria-hidden="true" className="font-display text-gold-ink/80 font-light mb-4 leading-none" style={{ fontSize: "3rem" }}>{step.n}</div>
                <h3 className="font-display text-volcanic font-normal mb-3 leading-snug" style={{ fontSize: "clamp(1.0625rem,1.5vw,1.25rem)" }}>{step.t}</h3>
                <p className="text-warmgrey font-body leading-relaxed" style={{ fontSize: "0.9375rem" }}>{step.b}</p>
              </div>
            ))}
          </AnimateStagger>
        </div>
      </section>

      {/* ── TESTIMONIAL ──────────────────────────────────────────────────── */}
      {testimonial && (
        <section className="bg-gold-faint/40 py-16 border-t border-sand/60">
          <div className="container-max max-w-3xl mx-auto text-center">
            <AnimateIn>
              <div className="flex gap-1 justify-center mb-6">
                {[1,2,3,4,5].map(i=><svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="#c9941a" aria-hidden="true"><path d="M7 1l1.68 3.4 3.75.55-2.71 2.64.64 3.73L7 9.77 3.64 11.32l.64-3.73L1.57 4.95l3.75-.55L7 1z"/></svg>)}
              </div>
              <blockquote className="font-display text-volcanic italic font-light leading-relaxed" style={{ fontSize: "clamp(1.125rem,2.25vw,1.625rem)" }}>
                &ldquo;{testimonial.fullQuote}&rdquo;
              </blockquote>
              <footer className="flex items-center justify-center gap-3 mt-7">
                <div className="w-9 h-9 rounded-full bg-sand/60 flex items-center justify-center text-coffee text-sm font-body font-medium flex-shrink-0">{testimonial.initials}</div>
                <div className="text-left">
                  <div className="font-body font-medium text-volcanic" style={{ fontSize: "13.5px" }}>{testimonial.name} {testimonial.countryFlag}</div>
                  <div className="text-warmgrey font-body" style={{ fontSize: "12px" }}>{testimonial.tripType}</div>
                </div>
              </footer>
              <Link href="/testimonials" className="inline-flex items-center gap-1.5 mt-6 text-gold-ink hover:text-volcanic transition-colors font-body font-medium" style={{ fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                Read All Traveller Stories {ARROW}
              </Link>
            </AnimateIn>
          </div>
        </section>
      )}

      {/* ── RELATED ITINERARIES ───────────────────────────────────────────── */}
      {relatedItins.length > 0 && (
        <section className="section-padding bg-ivory">
          <div className="container-max">
            <AnimateIn className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <div>
                <span className="label-eyebrow">Continue Exploring</span>
                <h2 className="heading-display text-volcanic mt-1" style={{ fontSize: "clamp(1.375rem,2.5vw,2rem)" }}>
                  Other {tourStyle?.name ?? "Ethiopia"} Itineraries
                </h2>
              </div>
              <Link href={"/tours-by-experience/" + style} className="btn-ghost flex-shrink-0">All {tourStyle?.name ?? ""} Tours</Link>
            </AnimateIn>
            <AnimateStagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.08}>
              {relatedItins.map(r => (
                <div key={r.slug}>
                  <Link href={"/tours-by-experience/" + style + "/" + r.slug}
                    className="group block bg-white border border-sand rounded-card overflow-hidden card-hover">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <PlaceholderImage filename={"tour-"+r.slug+"-hero.jpg"} width={600} height={375} category="tour" fill className="group-hover:scale-105 transition-transform duration-700" />
                      <div className="image-overlay-light" />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-warmgrey font-body" style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" }}>{r.durationLabel}</span>
                        <span className="text-sand">·</span>
                        <span className="text-warmgrey font-body" style={{ fontSize: "11px" }}>{r.difficulty}</span>
                      </div>
                      <h3 className="font-display text-volcanic font-normal leading-snug group-hover:text-gold-ink transition-colors mb-2" style={{ fontSize: "clamp(1rem,1.5vw,1.1875rem)" }}>{r.name}</h3>
                      <div className="text-gold-ink font-body font-medium" style={{ fontSize: "12.5px" }}>Privately Quoted</div>
                    </div>
                  </Link>
                </div>
              ))}
            </AnimateStagger>
          </div>
        </section>
      )}

      {/* ── SAWLA MOMENTS INTERLINKING ────────────────────────────────────── */}
      {linkedMoments.length > 0 && (
        <section className="section-padding-sm bg-volcanic">
          <div className="container-max">
            <AnimateIn className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <span className="label-eyebrow text-gold">From the Field</span>
                <h2 className="heading-display text-ivory mt-1" style={{ fontSize: "clamp(1.375rem,2.5vw,2rem)" }}>
                  Stories Relevant to This Journey
                </h2>
              </div>
              <Link href="/sawla-moments" className="btn-ghost-light flex-shrink-0">All Field Notes</Link>
            </AnimateIn>
            <AnimateStagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" staggerDelay={0.07}>
              {linkedMoments.map(a => (
                <Link key={a.slug} href={"/sawla-moments/" + a.slug}
                  className="group block border border-white/10 rounded-card overflow-hidden hover:border-gold/40 transition-colors duration-300 card-hover">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <PlaceholderImage filename={"moments-"+a.slug+"-hero.jpg"} width={600} height={375} category="moments" fill className="group-hover:scale-105 transition-transform duration-700" />
                    <div className="image-overlay-light" />
                  </div>
                  <div className="p-5">
                    <div className="text-gold font-body mb-2" style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase" }}>{a.category}</div>
                    <h3 className="font-display text-ivory font-light group-hover:text-gold transition-colors leading-snug" style={{ fontSize: "clamp(1rem,1.5vw,1.125rem)" }}>{a.title}</h3>
                    <div className="text-ivory/60 font-body mt-3" style={{ fontSize: "11.5px" }}>{a.readingTime} min read</div>
                  </div>
                </Link>
              ))}
            </AnimateStagger>
          </div>
        </section>
      )}

      {/* ── PLANNING GUIDES STRIP ─────────────────────────────────────────── */}
      {linkedGuides.length > 0 && (
        <section className="py-10 bg-gold-faint/50 border-t border-sand/60">
          <div className="container-max">
            <AnimateIn className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <span className="label-eyebrow">Before You Go</span>
                <p className="font-display text-volcanic font-light" style={{ fontSize: "clamp(1.125rem,2vw,1.5rem)" }}>
                  Planning resources for this type of Ethiopia journey
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {linkedGuides.map(g => (
                  <Link key={g.slug} href={"/ethiopia-travel-guide/" + g.slug}
                    className="inline-flex items-center gap-1.5 bg-white border border-sand rounded-full px-4 py-2 text-warmgrey hover:border-gold hover:text-gold-ink transition-colors duration-200 font-body"
                    style={{ fontSize: "12.5px" }}>
                    {g.title}
                    <span className="text-gold-ink">{ARROW}</span>
                  </Link>
                ))}
              </div>
            </AnimateIn>
          </div>
        </section>
      )}

      {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
      <section className="relative py-28 text-center overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          <PlaceholderImage filename={"tour-"+slug+"-cta.jpg"} width={1920} height={600} category="tour" fill />
          <div className="absolute inset-0 bg-volcanic/75" />
        </div>
        <div className="relative z-10 container-max">
          <AnimateIn>
            <span className="label-eyebrow text-gold">Your Version of This Journey</span>
            <h2 className="heading-display text-ivory mt-4 mb-6 max-w-2xl mx-auto" style={{ fontSize: "clamp(1.875rem,4vw,3.25rem)" }}>
              Ready to Start Planning?
            </h2>
            <p className="text-ivory/70 font-body max-w-xl mx-auto mb-10 leading-relaxed" style={{ fontSize: "clamp(1rem,1.25vw,1.125rem)" }}>
              Tell us your travel dates and what matters most. We will design your private version of {name} — adapted to your pace, group, and what you want to feel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href={enquireHref} className="btn-gold py-4 px-10 whitespace-normal text-center leading-snug">{ctaCopy.primary}</Link>
              <Link href="/tours-by-experience" className="btn-ghost-light">All Tour Styles</Link>
            </div>
            <p className="text-ivory/30 font-body" style={{ fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase" }}>
              No booking fee to enquire · Response within 24 hours · Ethiopia-based team
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Mobile sticky enquiry — the sticky sidebar CTA and WhatsApp button are both
          desktop-only, so small screens had no persistent enquiry affordance once the
          hero scrolled away. Solid background (no blur) per the header compositing fix. */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-volcanic border-t border-white/10 px-4 py-3" style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}>
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <div className="text-ivory font-body font-medium truncate" style={{ fontSize: "13px" }}>{shortName}</div>
            <div className="text-ivory/60 font-body" style={{ fontSize: "11px" }}>{itin.durationLabel} · Privately quoted</div>
          </div>
          <Link href={enquireHref} className="btn-gold flex-shrink-0" style={{ padding: "0.625rem 1.25rem", fontSize: "12px" }}>Start Planning</Link>
        </div>
      </div>
      {/* Spacer so the fixed bar never covers the final CTA content on mobile */}
      <div className="h-16 lg:hidden" aria-hidden="true" />
    </>
  )
}
