import Link from "next/link"
import Image from "next/image"
import { SITE, TOUR_STYLES } from "@/data/siteData"
import { PREMIUM_DESTINATIONS } from "@/data/destinationsPremium"
import { ITINERARIES, getItinerariesByStyle } from "@/data/itineraryData"
import { TopoContours, ElevationProfile } from "@/components/ui/EthiopiaTopo"

// Product-first footer: the two selling columns (Destinations, Tour Styles) are
// derived from live data so they can never drift; company/editorial links live in
// a compact strip below — present for trust and crawl equity, subordinate in weight.
const footerDestinations = PREMIUM_DESTINATIONS.filter(d => d.featured).map(d => ({
  label: d.shortName,
  href: `/ethiopias-popular-destinations/${d.slug}`,
}))

const footerStyles = TOUR_STYLES.filter(s => getItinerariesByStyle(s.slug).length > 0).map(s => ({
  label: s.name,
  href: `/tours-by-experience/${s.slug}`,
}))

const footerNav = {
  plan: [
    { label: "Start Planning",      href: "/enquire" },
    { label: "Planning & Pricing",  href: "/planning-and-pricing" },
    { label: "Trip Finder",         href: "/trip-finder" },
    { label: "FAQ",                 href: "/faq" },
    { label: "Safety in Ethiopia",  href: "/ethiopia-travel-guide/safety-in-ethiopia" },
    { label: "Ethiopia Visa Guide", href: "/ethiopia-travel-guide/ethiopia-visa-guide" },
    { label: "Best Time to Visit",  href: "/ethiopia-travel-guide/when-to-visit-ethiopia" },
    { label: "What to Pack",        href: "/ethiopia-travel-guide/what-to-pack-for-ethiopia" },
  ],
  companyStrip: [
    { label: "About Sawla Tours",    href: "/about-us" },
    { label: "Why Travel with Us",   href: "/why-travel-with-sawla-tours" },
    { label: "How We Work",          href: "/how-we-work" },
    { label: "Meet Our Specialists", href: "/meet-our-travel-specialists" },
    { label: "Meet Our Guides",      href: "/meet-our-guides" },
    { label: "Meet Our Drivers",     href: "/meet-our-drivers" },
    { label: "Mobile Tented Camps",  href: "/mobile-tented-camps-ethiopia" },
    { label: "Sawla Foundation",     href: "/sawla-foundation" },
    { label: "Responsible Travel",   href: "/responsible-travel" },
    { label: "Ethiopia Travel Guide", href: "/ethiopia-travel-guide" },
    { label: "Endemic Species",      href: "/ethiopia-wildlife/endemic-species" },
    { label: "Sawla Moments",        href: "/sawla-moments" },
    { label: "Sawla Films",          href: "/sawla-films" },
    { label: "Traveller Stories",    href: "/testimonials" },
  ],
}

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative bg-charcoal text-ivory/80 overflow-hidden" role="contentinfo">

      {/* Whisper-quiet topographic contour field — gold at 6% behind everything */}
      <TopoContours />

      {/* Ethiopia's real elevation range, drawn as terrain: Danakil −116m → Ras Dashen 4,533m */}
      <ElevationProfile />

      <div className="relative border-b border-white/10">
        <div className="container-max py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-display text-ivory text-xl font-light">Ready to start planning?</p>
            <p className="text-ivory/50 text-sm mt-1">Our Addis Ababa team responds within 24 hours.</p>
          </div>
          <Link href="/enquire" className="btn-primary flex-shrink-0">Plan Your Ethiopia Journey</Link>
        </div>
      </div>

      <div className="relative container-max py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-5">
              <Image src="/brand/logo-white.png" alt="Sawla Tours" width={70} height={65}
                className="object-contain" style={{height:"68px",width:"auto"}} />
            </Link>
            <p className="text-sm text-ivory/55 leading-relaxed mb-6 max-w-xs">
              Ethiopia-based tour operator specialising in private, tailor-made journeys since 2009.
            </p>
            <div className="space-y-2.5 text-sm text-ivory/55">
              <div>Addis Ababa, Ethiopia</div>
              <div><a href={"mailto:" + SITE.email} className="hover:text-gold transition-colors">{SITE.email}</a></div>
              <div><a href={"tel:" + SITE.phoneE164} className="hover:text-gold transition-colors">{SITE.phone}</a></div>
            </div>

            {/* Follow Our Journey */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-[10.5px] font-body font-medium tracking-[0.16em] uppercase text-gold mb-4">Follow Our Journey</p>
              <div className="flex flex-wrap gap-3">
                <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="group relative">
                  <div className="w-10 h-10 flex items-center justify-center border border-white/20 rounded-sm text-ivory/60 group-hover:border-gold group-hover:text-gold transition-colors duration-300">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/></svg>
                  </div>
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] text-ivory/40 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">Instagram</span>
                </a>

                <a href={SITE.social.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="group relative">
                  <div className="w-10 h-10 flex items-center justify-center border border-white/20 rounded-sm text-ivory/60 group-hover:border-gold group-hover:text-gold transition-colors duration-300">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.86 2.86 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.96-.1z"/></svg>
                  </div>
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] text-ivory/40 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">TikTok</span>
                </a>

                <a href={SITE.social.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="group relative">
                  <div className="w-10 h-10 flex items-center justify-center border border-white/20 rounded-sm text-ivory/60 group-hover:border-gold group-hover:text-gold transition-colors duration-300">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2s9 5 20 5a9.5 9.5 0 0 0-9-5.5c4.75 2.25 9 0 11-4s1-6.75 0-7.5a5.5 5.5 0 0 0-.5-.5z"/></svg>
                  </div>
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] text-ivory/40 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">Twitter</span>
                </a>

                <a href={SITE.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="group relative">
                  <div className="w-10 h-10 flex items-center justify-center border border-white/20 rounded-sm text-ivory/60 group-hover:border-gold group-hover:text-gold transition-colors duration-300">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </div>
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] text-ivory/40 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">YouTube</span>
                </a>

                <a href={SITE.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="group relative">
                  <div className="w-10 h-10 flex items-center justify-center border border-white/20 rounded-sm text-ivory/60 group-hover:border-gold group-hover:text-gold transition-colors duration-300">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </div>
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] text-ivory/40 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">Facebook</span>
                </a>

                <a href={SITE.social.tripadvisor} target="_blank" rel="noopener noreferrer" aria-label="TripAdvisor" className="group relative">
                  <div className="w-10 h-10 flex items-center justify-center border border-white/20 rounded-sm text-ivory/60 group-hover:border-gold group-hover:text-gold transition-colors duration-300">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0c6.627 0 12 5.373 12 12s-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0zm6.604 4.456c.326.537.53 1.162.53 1.831 0 2.026-1.645 3.671-3.671 3.671-2.025 0-3.67-1.645-3.67-3.671 0-.669.203-1.294.53-1.831-1.574 1.194-3.038 2.553-4.301 4.076a9.995 9.995 0 0 0-2.166 6.294c0 5.523 4.477 10 10 10s10-4.477 10-10c0-2.309-.787-4.44-2.103-6.142-1.24-1.495-2.689-2.823-4.245-3.948-.011.116-.013.236-.013.36 0 2.025 1.646 3.671 3.671 3.671 2.026 0 3.671-1.646 3.671-3.671 0-.669-.204-1.294-.531-1.831z"/></svg>
                  </div>
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] text-ivory/40 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">TripAdvisor</span>
                </a>

                <a href={SITE.social.google} target="_blank" rel="noopener noreferrer" aria-label="Google Reviews" className="group relative">
                  <div className="w-10 h-10 flex items-center justify-center border border-white/20 rounded-sm text-ivory/60 group-hover:border-gold group-hover:text-gold transition-colors duration-300">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                  </div>
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] text-ivory/40 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">Google</span>
                </a>

                <a href={SITE.social.reddit} target="_blank" rel="noopener noreferrer" aria-label="Reddit" className="group relative">
                  <div className="w-10 h-10 flex items-center justify-center border border-white/20 rounded-sm text-ivory/60 group-hover:border-gold group-hover:text-gold transition-colors duration-300">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 11.779c0-1.459-1.192-2.645-2.657-2.645-.715 0-1.363.286-1.84.746-1.81-1.191-4.259-1.949-6.971-2.046l1.483-4.669 4.016.941-.006.058c0 1.193.975 2.163 2.174 2.163 1.198 0 2.172-.97 2.172-2.163s-.975-2.164-2.172-2.164c-.92 0-1.704.574-2.021 1.379l-4.329-1.015c-.189-.046-.381.063-.44.249l-1.654 5.207c-2.838.034-5.409.798-7.3 2.025-.474-.438-1.103-.712-1.799-.712C1.191 9.134 0 10.32 0 11.779c0 .97.533 1.811 1.317 2.271-.052.282-.086.567-.086.857 0 3.911 4.808 7.093 10.719 7.093s10.72-3.182 10.72-7.093c0-.274-.029-.544-.075-.81.832-.447 1.405-1.312 1.405-2.318zm-17.224.927c0-.868.71-1.575 1.582-1.575.871 0 1.581.707 1.581 1.575s-.71 1.574-1.581 1.574-1.582-.706-1.582-1.574zm9.061 4.669c-.797.793-2.048 1.179-3.824 1.179l-.013-.003-.013.003c-1.777 0-3.028-.386-3.824-1.179-.145-.144-.145-.379 0-.523.145-.145.381-.145.526 0 .65.647 1.729.961 3.298.961l.013.003.013-.003c1.569 0 2.648-.315 3.298-.962.145-.145.381-.144.526 0 .145.145.145.379 0 .524zm-.189-3.095c-.872 0-1.581-.706-1.581-1.574 0-.868.709-1.575 1.581-1.575s1.581.707 1.581 1.575-.709 1.574-1.581 1.574z"/></svg>
                  </div>
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] text-ivory/40 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">Reddit</span>
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-[10.5px] font-body font-medium tracking-[0.16em] uppercase text-gold mb-5">Destinations</h3>
            <ul className="space-y-3">
              {footerDestinations.map(l => (<li key={l.href}><Link href={l.href} className="text-[13px] text-ivory/55 hover:text-gold transition-colors">{l.label}</Link></li>))}
              <li><Link href="/ethiopias-popular-destinations" className="text-[13px] text-gold hover:text-gold-light transition-colors">All {PREMIUM_DESTINATIONS.length} Destinations →</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-[10.5px] font-body font-medium tracking-[0.16em] uppercase text-gold mb-5">Tour Styles</h3>
            <ul className="space-y-3">
              {footerStyles.map(l => (<li key={l.href}><Link href={l.href} className="text-[13px] text-ivory/55 hover:text-gold transition-colors">{l.label}</Link></li>))}
              <li><Link href="/tours-by-experience#all-journeys" className="text-[13px] text-gold hover:text-gold-light transition-colors">All {ITINERARIES.length} Journeys →</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-[10.5px] font-body font-medium tracking-[0.16em] uppercase text-gold mb-5">Plan Your Trip</h3>
            <ul className="space-y-3">
              {footerNav.plan.map(l => (<li key={l.href}><Link href={l.href} className="text-[13px] text-ivory/55 hover:text-gold transition-colors">{l.label}</Link></li>))}
            </ul>
            <div className="mt-8 p-4 border border-white/10 rounded-sm">
              <p className="text-[10.5px] tracking-[0.12em] uppercase text-ivory/55 mb-2">Licensed Operator</p>
              <p className="text-ivory/55 text-xs leading-relaxed">Ethiopian Tourism Organization licensed. Est. Addis Ababa, 2009.</p>
            </div>
          </div>
        </div>

        {/* Company & editorial strip — kept for trust and internal-link equity,
            visually subordinate to the product columns above */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-wrap gap-x-6 gap-y-2.5">
            {footerNav.companyStrip.map(l => (
              <Link key={l.href} href={l.href} className="text-[12px] text-ivory/55 hover:text-gold transition-colors">{l.label}</Link>
            ))}
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container-max py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-[11.5px] text-ivory/55">
          <div>&#169; {year} Sawla Tours. All rights reserved.</div>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-1.5">
            <Link href="/booking-terms" className="hover:text-ivory/60 transition-colors">Booking Terms</Link>
            <Link href="/cancellation-policy" className="hover:text-ivory/60 transition-colors">Cancellation Policy</Link>
            <Link href="/privacy-policy" className="hover:text-ivory/60 transition-colors">Privacy Policy</Link>
            <Link href="/cookie-policy" className="hover:text-ivory/60 transition-colors">Cookie Policy</Link>
            <Link href="/terms" className="hover:text-ivory/60 transition-colors">Terms of Use</Link>
            <Link href="/legal-and-policies" className="hover:text-ivory/60 transition-colors">All Policies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}