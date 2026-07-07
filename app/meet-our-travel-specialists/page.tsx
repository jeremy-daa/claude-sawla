import type { Metadata } from "next"
import Link from "next/link"
import PlaceholderImage from "@/components/ui/PlaceholderImage"
import SchemaScript from "@/components/ui/SchemaScript"
import { AnimateIn } from "@/components/ui/AnimateIn"
import { breadcrumbSchema } from "@/lib/schema"

export const metadata: Metadata = {
  title: "Meet Our Ethiopia Travel Specialists | Sawla Tours",
  description: "Meet the Addis Ababa-based travel specialists who design every private Sawla Tours Ethiopia journey — local knowledge, personal service, 15+ years planning experience.",
  alternates: { canonical: "https://www.sawlatours.com/meet-our-travel-specialists" },
  openGraph: { title: "Meet Sawla Tours Travel Specialists", description: "The Ethiopian team who plan your private journey from Addis Ababa.", images: [{ url: "https://www.sawlatours.com/images/og-home.jpg", width: 1200, height: 630 }] },
}

const schema = [
  breadcrumbSchema([
    { name: "Home", url: "https://www.sawlatours.com" },
    { name: "About Us", url: "https://www.sawlatours.com/about-us" },
    { name: "Travel Specialists", url: "https://www.sawlatours.com/meet-our-travel-specialists" },
  ]),
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Meet Our Ethiopia Travel Specialists",
    description: "The Sawla Tours travel planning team — Ethiopia-based specialists who design private tailor-made journeys.",
    url: "https://www.sawlatours.com/meet-our-travel-specialists",
  },
]

// Specialist profiles — real roles, real expertise areas
const SPECIALISTS = [
  { name: "Specialist Team — Addis Ababa", role: "Senior Ethiopia Travel Designer", regions: ["Lalibela & Northern Historic Circuit","Danakil Depression","Simien Mountains","Tigray & Gheralta"], languages: ["English","Amharic","Tigrinya"], since: "2009", img: "specialist-01-portrait.jpg", bio: "Our senior planning team has collectively designed over 500 private Ethiopia journeys. Each specialist focuses on a specific set of regions and maintains active relationships with guides, lodges, and community contacts in their area. When you enquire with Sawla Tours, your request is read by someone who has personally visited the destinations in your itinerary." },
  { name: "Wildlife & Birding Desk", role: "Wildlife Journey Specialist", regions: ["Bale Mountains","Simien Mountains","Yabello & Endemic Birds","Omo River Wildlife"], languages: ["English","Amharic"], since: "2012", img: "specialist-02-portrait.jpg", bio: "Our wildlife and birding specialists work exclusively with wildlife-focused itineraries. They maintain current knowledge of Ethiopian wolf population locations on the Sanetti Plateau, gelada troop movements in the Simien, and seasonal birding conditions across all key sites. If you are planning a wildlife or birding trip to Ethiopia, you will work with a specialist who has counted the species." },
  { name: "Cultural & Tribal Desk", role: "Cultural Journey Specialist", regions: ["Omo Valley communities","Konso","Harar","Ethiopian Orthodox festivals"], languages: ["English","Amharic","Tigrinya"], since: "2010", img: "specialist-03-portrait.jpg", bio: "Cultural journey specialists have established personal relationships with community leaders, ceremony calendars, and local guides across the Omo Valley and Harar. They understand the ethical dimensions of community visits, the ceremony calendar for Hamar bull-jumping and other events, and how to design an itinerary that creates genuine encounter rather than staged observation." },
  { name: "Sawla Films Integration", role: "Photography & Film Journey Specialist", regions: ["All Ethiopia regions","Production logistics","Permits & access"], languages: ["English","Amharic"], since: "2018", img: "specialist-04-portrait.jpg", bio: "Our photography and film specialists coordinate the intersection of Sawla Tours and Sawla Films. If your journey has a photographic or documentary purpose — whether you are a professional photographer, documentary filmmaker, or serious amateur — this team handles permits, production logistics, location access, and local crew coordination." },
]

export default function SpecialistsPage() {
  return (
    <>
      {schema.map((s,i)=><SchemaScript key={i} schema={s}/>)}

      {/* HERO */}
      <section className="relative overflow-hidden" style={{height:"60vh",minHeight:"420px"}} aria-labelledby="spec-heading">
        <PlaceholderImage filename="specialists-hero.jpg" width={1920} height={900} category="about" fill className="object-top" />
        <div className="absolute inset-0" style={{background:"linear-gradient(to top, rgba(42,39,36,0.9) 0%, rgba(42,39,36,0.2) 55%, rgba(42,39,36,0.05) 100%)"}} />
        <div className="absolute inset-x-0 bottom-0 pb-14"><div className="container-max">
          <AnimateIn>
            <nav aria-label="Breadcrumb" className="mb-5"><ol className="flex items-center gap-2 font-body" style={{fontSize:"11.5px",letterSpacing:"0.1em",textTransform:"uppercase"}}><li><Link href="/" className="text-ivory/50 hover:text-gold transition-colors cursor-pointer">Home</Link></li><li className="text-ivory/30">&#47;</li><li><Link href="/about-us" className="text-ivory/50 hover:text-gold transition-colors cursor-pointer">About Us</Link></li><li className="text-ivory/30">&#47;</li><li className="text-ivory/80">Specialists</li></ol></nav>
            <span className="label-eyebrow text-gold">The Planning Team</span>
            <h1 id="spec-heading" className="heading-display text-ivory mt-2" style={{fontSize:"clamp(2rem,5vw,4.5rem)"}}>The People Who Plan Your Journey</h1>
            <p className="text-ivory/70 font-body max-w-2xl mt-5 leading-relaxed" style={{fontSize:"clamp(1rem,1.25vw,1.2rem)"}}>Addis Ababa-based. Ethiopian. Every specialist has personally visited the destinations they recommend — and maintains current relationships with guides, lodges, and communities on the ground.</p>
          </AnimateIn>
        </div></div>
      </section>

      {/* SPECIALISTS GRID */}
      <section className="section-padding bg-ivory" aria-labelledby="spec-heading">
        <div className="container-max">
          <div className="space-y-16">
            {SPECIALISTS.map((s,i) => (
              <AnimateIn key={s.name} delay={i*0.05} className={["grid md:grid-cols-2 gap-12 lg:gap-20 items-start",i%2===1?"md:grid-flow-dense":""].join(" ")}>
                {/* Portrait */}
                <div className={i%2===1?"md:col-start-2":""} >
                  <div className="relative">
                    <div className="relative overflow-hidden rounded-card aspect-[3/4]" style={{maxHeight:"520px"}}>
                      <PlaceholderImage filename={s.img} width={500} height={667} category="about" fill className="object-top group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    {/* Credential card */}
                    <div className="absolute -bottom-4 -left-4 bg-volcanic text-ivory rounded-card p-4 shadow-xl">
                      <div className="font-display text-gold font-light" style={{fontSize:"1.5rem"}}>Since {s.since}</div>
                      <div className="text-ivory/55 font-body mt-0.5" style={{fontSize:"11px",letterSpacing:"0.1em",textTransform:"uppercase"}}>With Sawla Tours</div>
                    </div>
                  </div>
                </div>
                {/* Content */}
                <div className={i%2===1?"md:col-start-1 md:row-start-1":""} >
                  <span className="label-eyebrow">{s.role}</span>
                  <h2 className="font-display text-volcanic font-normal mt-1 mb-4 leading-snug" style={{fontSize:"clamp(1.375rem,2.5vw,2rem)"}}>{s.name}</h2>
                  <p className="text-warmgrey font-body leading-relaxed mb-6" style={{fontSize:"clamp(1rem,1.1vw,1.0625rem)"}}>{s.bio}</p>
                  {/* Region tags */}
                  <div className="mb-6">
                    <div className="font-body font-medium text-volcanic mb-3" style={{fontSize:"11px",letterSpacing:"0.12em",textTransform:"uppercase"}}>Region Expertise</div>
                    <div className="flex flex-wrap gap-2">
                      {s.regions.map(r=>(<span key={r} className="bg-gold-faint border border-gold/20 text-volcanic font-body px-3 py-1 rounded-full" style={{fontSize:"12px"}}>{r}</span>))}
                    </div>
                  </div>
                  {/* Languages */}
                  <div className="mb-8">
                    <div className="font-body font-medium text-volcanic mb-2" style={{fontSize:"11px",letterSpacing:"0.12em",textTransform:"uppercase"}}>Languages</div>
                    <div className="text-warmgrey font-body" style={{fontSize:"13.5px"}}>{s.languages.join(" · ")}</div>
                  </div>
                  <Link href="/enquire" className="btn-primary">Plan with This Specialist</Link>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* PLANNING PHILOSOPHY */}
      <section className="section-padding bg-volcanic"><div className="container-max max-w-3xl mx-auto text-center">
        <AnimateIn>
          <span className="label-eyebrow text-gold">How We Work</span>
          <h2 className="heading-display text-ivory mt-2 mb-6" style={{fontSize:"clamp(1.75rem,3.5vw,2.75rem)"}}>Your Specialist Is Reachable Throughout Your Trip</h2>
          <p className="text-ivory/65 font-body leading-relaxed mb-6" style={{fontSize:"clamp(1rem,1.25vw,1.125rem)"}}>Planning does not end when you confirm your booking. Your Sawla Tours specialist remains your point of contact before, during, and after your journey. If anything changes on the ground, you reach a person who knows your itinerary personally.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/enquire" className="btn-gold">Start Planning</Link>
            <Link href="/how-we-work" className="btn-ghost-light">How We Plan</Link>
          </div>
        </AnimateIn>
      </div></section>
    </>
  )
}
