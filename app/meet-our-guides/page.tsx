import type { Metadata } from "next"
import Link from "next/link"
import PlaceholderImage from "@/components/ui/PlaceholderImage"
import SchemaScript from "@/components/ui/SchemaScript"
import { AnimateIn, AnimateStagger } from "@/components/ui/AnimateIn"
import { breadcrumbSchema } from "@/lib/schema"

export const metadata: Metadata = {
  title: "Meet Our Ethiopia Field Guides | Sawla Tours Team",
  description: "Meet the Sawla Tours field guides — Ethiopian naturalists, historians, and cultural experts with deep specialist knowledge of their specific regions and wildlife.",
  alternates: { canonical: "https://www.sawlatours.com/meet-our-guides" },
  openGraph: {
    title: "Meet Our Ethiopia Field Guides | Sawla Tours",
    description: "Ethiopian naturalists, historians and cultural experts guiding every Sawla journey.",
    url: "https://www.sawlatours.com/meet-our-guides",
    images: [{ url: "https://www.sawlatours.com/images/og-home.jpg", width: 1200, height: 630 }],
  },
}

const schema = breadcrumbSchema([{name:"Home",url:"https://www.sawlatours.com"},{name:"About",url:"https://www.sawlatours.com/about-us"},{name:"Field Guides",url:"https://www.sawlatours.com/meet-our-guides"}])

const GUIDES = [
  {name:"Northern Historic Circuit Guides",spec:"Lalibela, Gondar, Tigray, Axum",exp:["Ethiopian Orthodox church architecture","Aksumite civilization and history","Lalibela church liturgy and symbolism","Tigray cliff church access routes"],img:"guide-01-northern.jpg",bio:"Our northern circuit guides are specialists in the Orthodox Christian heritage of northern Ethiopia. They have spent years in Lalibela, Gondar, and Tigray learning not just what these sites are but what they mean. A good northern circuit guide explains why King Lalibela built a New Jerusalem in rock, what the symbols in Debre Berhan Selassie ceiling mean, and which mass is worth attending."},
  {name:"Wildlife and Birding Specialists",spec:"Bale Mountains, Simien, Yabello",exp:["Ethiopian wolf behavior and habitat","Gelada monkey social structure","Endemic bird identification by sight and call","Sanetti Plateau ecology"],img:"guide-02-wildlife.jpg",bio:"Our wildlife guides hold specialist knowledge beyond species identification. Our Bale Mountains guide understands Ethiopian wolf hunting behavior, pack structure, and the feeding schedules that make certain hours on the Sanetti Plateau most productive. Our birding guides can identify all 20+ Ethiopian endemic bird species."},
  {name:"Omo Valley Cultural Guides",spec:"Omo Valley, Konso, Harar",exp:["Hamar community and bull-jumping ceremonies","Karo body painting traditions","Mursi cultural context and history","Afar community relations"],img:"guide-03-omo.jpg",bio:"The Omo Valley requires guides with genuine community relationships. Our southern cultural guides have spent years building trust with specific community leaders in the Hamar, Karo, Mursi, and Daasanach areas. They know when a ceremony is authentic, when a market is worth visiting, and how to facilitate genuine encounters."},
  {name:"Danakil Expedition Leaders",spec:"Danakil Depression, Afar Region",exp:["Erta Ale volcano access and safety","Afar community relations","Danakil logistics and security","Dallol hydrothermal geology"],img:"guide-04-danakil.jpg",bio:"Danakil guides manage logistics, safety, and the relationship with the Afar escort. They know the volcano crater access routes, best positions around Dallol, and how to manage a group in 45-degree heat on volcanic terrain. They are expedition leaders as much as cultural guides."},
]

export default function GuidesPage() {
  return (
    <>
      <SchemaScript schema={schema} />
      <section className="relative overflow-hidden" style={{height:"55vh",minHeight:"380px"}} aria-labelledby="guides-heading">
        <PlaceholderImage filename="guides-hero.jpg" width={1920} height={900} category="guide" fill />
        <div className="absolute inset-0" style={{background:"linear-gradient(to top, rgba(42,39,36,0.88) 0%, rgba(42,39,36,0.15) 60%, transparent 100%)"}} />
        <div className="absolute inset-x-0 bottom-0 pb-14"><div className="container-max"><AnimateIn>
          <nav aria-label="Breadcrumb" className="mb-5"><ol className="flex items-center gap-2 font-body" style={{fontSize:"11.5px",letterSpacing:"0.1em",textTransform:"uppercase"}}><li><Link href="/" className="text-ivory/50 hover:text-gold cursor-pointer">Home</Link></li><li className="text-ivory/30">&#47;</li><li className="text-ivory/80">Field Guides</li></ol></nav>
          <span className="label-eyebrow text-gold">Field Expertise</span>
          <h1 id="guides-heading" className="heading-display text-ivory mt-2" style={{fontSize:"clamp(2rem,5vw,4.5rem)"}}>Field Guides Who Know Ethiopia</h1>
          <p className="text-ivory/70 font-body max-w-2xl mt-4 leading-relaxed" style={{fontSize:"clamp(1rem,1.25vw,1.2rem)"}}>Naturalists, historians, and cultural specialists. Each Sawla Tours guide is Ethiopian, region-specific, and deeply knowledgeable about the places they work.</p>
        </AnimateIn></div></div>
      </section>
      <section className="section-padding bg-ivory">
        <div className="container-max">
          <AnimateStagger className="grid md:grid-cols-2 gap-8" staggerDelay={0.07}>
            {GUIDES.map(guide => (
              <div key={guide.name} className="bg-white rounded-card overflow-hidden border border-sand/60 card-hover">
                <div className="relative aspect-[16/9] overflow-hidden"><PlaceholderImage filename={guide.img} width={700} height={394} category="guide" fill className="hover:scale-105 transition-transform duration-700" /></div>
                <div className="p-6">
                  <div className="label-eyebrow mb-1">{guide.spec}</div>
                  <h2 className="font-display text-volcanic font-normal leading-snug mb-4" style={{fontSize:"clamp(1.125rem,1.75vw,1.375rem)"}}>{guide.name}</h2>
                  <p className="text-warmgrey font-body leading-relaxed mb-5" style={{fontSize:"0.875rem"}}>{guide.bio}</p>
                  <div className="mb-5">
                    <div className="font-body font-medium text-volcanic mb-2" style={{fontSize:"10.5px",letterSpacing:"0.12em",textTransform:"uppercase"}}>Specialist Knowledge</div>
                    <ul className="space-y-1">{guide.exp.map(e=>(<li key={e} className="flex items-start gap-2 text-warmgrey font-body" style={{fontSize:"12.5px"}}><svg className="text-gold flex-shrink-0 mt-0.5" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2 6l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>{e}</li>))}</ul>
                  </div>
                  <Link href="/enquire" className="inline-flex items-center gap-2 text-gold hover:text-volcanic transition-colors font-body font-medium cursor-pointer" style={{fontSize:"11.5px",letterSpacing:"0.1em",textTransform:"uppercase"}}>Request this specialist &#x2192;</Link>
                </div>
              </div>
            ))}
          </AnimateStagger>
        </div>
      </section>
      <section className="bg-volcanic py-16 text-center"><div className="container-max"><AnimateIn>
        <h2 className="heading-display text-ivory mb-5" style={{fontSize:"clamp(1.75rem,3.5vw,2.75rem)"}}>Every Guide is Assigned to Your Itinerary</h2>
        <p className="text-ivory/65 font-body max-w-xl mx-auto mb-8 leading-relaxed" style={{fontSize:"clamp(1rem,1.25vw,1.125rem)"}}>We do not assign whoever is available. For a wildlife itinerary you get a wildlife specialist. For Tigray churches you get a guide who knows Abuna Yemata Guh personally.</p>
        <Link href="/enquire" className="btn-gold">Plan Your Journey</Link>
      </AnimateIn></div></section>
    </>
  )
}
