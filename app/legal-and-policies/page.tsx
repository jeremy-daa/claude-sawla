import type { Metadata } from "next"
import Link from "next/link"
import { AnimateIn, AnimateStagger } from "@/components/ui/AnimateIn"

export const metadata: Metadata = {
  title: "Legal & Policies | Sawla Tours",
  description: "Every Sawla Tours policy in one place — booking terms, payment, cancellation, force majeure, insurance, photography, privacy, cookies, and website terms of use.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://www.sawlatours.com/legal-and-policies" },
  openGraph: { title: "Legal & Policies | Sawla Tours", description: "Every Sawla Tours policy in one clear, organised place.", images: [{ url: "https://www.sawlatours.com/images/og-home.jpg", width: 1200, height: 630 }] },
}

const LAST_UPDATED = "July 2026"

const POLICY_GROUPS = [
  {
    group: "Booking & Payment",
    items: [
      { title: "Booking Terms", href: "/booking-terms", body: "How a booking is confirmed, bespoke itinerary terms, and price validity." },
      { title: "Deposit & Payment Policy", href: "/deposit-and-payment-policy", body: "Deposit, balance timing, payment methods, and invoicing." },
      { title: "Cancellation & Refund Policy", href: "/cancellation-policy", body: "Cancellation tiers, non-refundable supplier costs, and refund timelines." },
    ],
  },
  {
    group: "Travel & Safety",
    items: [
      { title: "Force Majeure & Itinerary Changes", href: "/force-majeure-policy", body: "How we handle events beyond anyone's control, safely and clearly." },
      { title: "Travel Insurance, Health & Visa", href: "/travel-insurance-health-and-visa", body: "What's required, what's recommended, and what remains yours to arrange." },
      { title: "Photography & Cultural Consent", href: "/photography-and-cultural-consent", body: "Respectful, consent-first photography across Ethiopia's communities and sites." },
    ],
  },
  {
    group: "Website & Data",
    items: [
      { title: "Privacy Policy", href: "/privacy-policy", body: "What data we collect, why, and the rights you have over it." },
      { title: "Cookie Policy", href: "/cookie-policy", body: "The cookies this site uses and how to manage them." },
      { title: "Terms of Use", href: "/terms", body: "The terms that govern using the sawlatours.com website." },
    ],
  },
]

export default function LegalAndPoliciesPage() {
  return (
    <div className="pt-28 pb-20 bg-ivory">
      <div className="container-max max-w-4xl mx-auto">

        <AnimateIn className="mb-14 pb-8 border-b border-sand">
          <Link href="/" className="text-gold-ink hover:underline font-body text-sm mb-6 inline-block">← Back to home</Link>
          <span className="label-eyebrow block">Legal</span>
          <h1 className="heading-display text-volcanic mt-2" style={{ fontSize: "clamp(2rem,4.5vw,3.25rem)" }}>
            Legal &amp; Policies
          </h1>
          <p className="text-warmgrey font-body mt-4 max-w-2xl" style={{ fontSize: "0.9375rem" }}>
            Every policy that governs a Sawla Tours journey and this website, gathered in one place. Last updated: {LAST_UPDATED}.
          </p>
        </AnimateIn>

        {/* INTERNAL NOTE (not rendered): policy suite reviewed and approved by legal
            counsel, and all business figures confirmed by Sawla Tours — July 2026.
            See the matching note in components/legal/LegalPageLayout.tsx. */}

        <div className="space-y-14">
          {POLICY_GROUPS.map(group => (
            <AnimateIn key={group.group}>
              <h2 className="label-eyebrow !mb-5">{group.group}</h2>
              <AnimateStagger className="grid sm:grid-cols-3 gap-5" staggerDelay={0.06}>
                {group.items.map(item => (
                  <Link key={item.href} href={item.href}
                    className="group block bg-white border border-sand rounded-card p-6 card-hover h-full">
                    <h3 className="font-display text-volcanic font-normal leading-snug mb-2 group-hover:text-gold-ink transition-colors" style={{ fontSize: "1.0625rem" }}>
                      {item.title}
                    </h3>
                    <p className="text-warmgrey font-body leading-relaxed" style={{ fontSize: "0.8125rem" }}>{item.body}</p>
                  </Link>
                ))}
              </AnimateStagger>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn delay={0.1} className="mt-16 pt-8 border-t border-sand text-center">
          <p className="text-warmgrey font-body mb-4" style={{ fontSize: "0.9375rem" }}>Questions about any of these policies?</p>
          <Link href="/enquire" className="btn-gold">Contact Us</Link>
        </AnimateIn>
      </div>
    </div>
  )
}
