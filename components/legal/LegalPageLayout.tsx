import Link from "next/link"
import type { ReactNode } from "react"

interface RelatedLink {
  label: string
  href: string
}

interface LegalPageLayoutProps {
  eyebrow?: string
  title: string
  description: string
  lastUpdated: string
  children: ReactNode
  relatedLinks?: RelatedLink[]
}

// Shared chrome for every policy page — header, legal-review notice, and a
// cross-links footer — so all nine pages read as one coherent legal system
// rather than nine independently styled documents.
export default function LegalPageLayout({
  eyebrow = "Legal",
  title,
  description,
  lastUpdated,
  children,
  relatedLinks,
}: LegalPageLayoutProps) {
  return (
    <div className="pt-28 pb-20 bg-ivory">
      <div className="container-max max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-8 pb-8 border-b border-sand">
          <Link href="/" className="text-gold-ink hover:underline font-body text-sm mb-6 inline-block">← Back to home</Link>
          <span className="label-eyebrow block">{eyebrow}</span>
          <h1 className="heading-display text-volcanic mt-2" style={{ fontSize: "clamp(2rem,4vw,3rem)" }}>
            {title}
          </h1>
          <p className="text-warmgrey font-body mt-4" style={{ fontSize: "14px" }}>
            Last updated: {lastUpdated}. {description}
          </p>
        </div>

        {/* INTERNAL NOTE (not rendered): policy suite reviewed and approved by legal
            counsel, July 2026. Business figures (30% deposit, 45-day balance,
            50/75/100% cancellation tiers, 14-business-day refunds, 14-day quote
            validity) confirmed by Sawla Tours, July 2026. Update the LAST_UPDATED
            constant on each page whenever terms change. */}

        {/* Body */}
        <div className="space-y-0">{children}</div>

        {/* Related policies */}
        {relatedLinks && relatedLinks.length > 0 && (
          <div className="pt-8 mt-10 border-t border-sand">
            <div className="label-eyebrow !mb-4">Related Policies</div>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {relatedLinks.map(l => (
                <Link key={l.href} href={l.href} className="text-gold-ink hover:underline font-body text-sm">{l.label}</Link>
              ))}
              <Link href="/legal-and-policies" className="text-gold-ink hover:underline font-body text-sm">All Policies →</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
