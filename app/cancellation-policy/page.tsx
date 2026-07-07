import type { Metadata } from "next"
import { LegalSection, LegalP, LegalContactBlock } from "@/components/legal/LegalSection"
import LegalPageLayout from "@/components/legal/LegalPageLayout"

export const metadata: Metadata = {
  title: "Cancellation & Refund Policy | Sawla Tours",
  description: "Sawla Tours cancellation tiers, refund timelines, and how we handle prepaid, supplier-dependent Ethiopia logistics fairly and clearly.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://www.sawlatours.com/cancellation-policy" },
  openGraph: { title: "Cancellation & Refund Policy | Sawla Tours", description: "Clear cancellation tiers and a fair, honest explanation of Ethiopia's supplier-dependent logistics.", images: [{ url: "https://www.sawlatours.com/images/og-home.jpg", width: 1200, height: 630 }] },
}

const LAST_UPDATED = "July 2026"
const CONTACT_EMAIL = "explore@sawlatours.com"

const TIERS = [
  ["45+ days before departure", "Deposit retained; remaining payments refunded"],
  ["44–30 days before departure", "50% of total journey cost"],
  ["29–15 days before departure", "75% of total journey cost"],
  ["14–0 days before departure", "100% of total journey cost"],
]

export default function CancellationPolicyPage() {
  return (
    <LegalPageLayout
      title="Cancellation & Refund Policy"
      description="If your plans change, here is exactly what to expect — including why many Ethiopia logistics are prepaid and non-recoverable."
      lastUpdated={LAST_UPDATED}
      relatedLinks={[
        { label: "Booking Terms", href: "/booking-terms" },
        { label: "Deposit & Payment Policy", href: "/deposit-and-payment-policy" },
        { label: "Travel Insurance & Health", href: "/travel-insurance-health-and-visa" },
      ]}
    >
      <LegalSection n={1} title="Why We Use Cancellation Tiers">
        <LegalP>
          Ethiopia travel involves a lot of work committed on your behalf well before departure — domestic flights, hotel and camp deposits, permits, and guide and vehicle bookings are often paid or reserved weeks or months in advance. Our cancellation tiers reflect how much of that committed cost we can typically recover the closer we get to your departure date, not an arbitrary penalty.
        </LegalP>
      </LegalSection>

      <LegalSection n={2} title="Cancellation Charges">
        <LegalP>All cancellations must be submitted in writing (email to {CONTACT_EMAIL}) and take effect from the date we receive your written notice.</LegalP>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border-collapse text-sm font-body">
            <thead>
              <tr className="bg-sand/50">
                <th className="text-left p-3 border border-sand text-volcanic font-semibold">Notice before departure</th>
                <th className="text-left p-3 border border-sand text-volcanic font-semibold">Cancellation charge</th>
              </tr>
            </thead>
            <tbody className="text-warmgrey">
              {TIERS.map(([period, charge]) => (
                <tr key={period} className="border-b border-sand">
                  <td className="p-3 border border-sand">{period}</td>
                  <td className="p-3 border border-sand">{charge}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </LegalSection>

      <LegalSection n={3} title="Non-Refundable Supplier Costs">
        <LegalP>
          Regardless of the tier above, certain costs may be non-refundable at any point once booked, because our suppliers do not refund them to us: confirmed domestic flight tickets, national park and community access permits, specialist guide bookings, mobile camp deposits, and non-refundable hotel or lodge deposits. Where this applies to your itinerary, your specialist will flag it in your quotation.
        </LegalP>
      </LegalSection>

      <LegalSection n={4} title="No-Shows, Late Arrival & Early Departure">
        <LegalP>
          No refund is available for no-shows, late arrival after a journey has started, unused portions of a confirmed itinerary, or early departure for any reason. We recommend comprehensive travel insurance that includes trip interruption cover — see our Travel Insurance &amp; Health page.
        </LegalP>
      </LegalSection>

      <LegalSection n={5} title="Refund Timeline">
        <LegalP>
          Where a refund is due, we process it within 14 business days of confirming your cancellation, once any non-recoverable supplier costs have been deducted. Refunds are returned by the same method used for payment wherever possible.
        </LegalP>
      </LegalSection>

      <LegalSection n={6} title="Credit & Postponement">
        <LegalP>
          Where practical, and entirely at Sawla Tours&apos; discretion, we may offer a credit toward a future journey or a postponed travel date instead of applying the standard cancellation charge — particularly where suppliers are able to move a booking rather than cancel it outright. Ask your specialist if this might be possible for your situation.
        </LegalP>
      </LegalSection>

      <LegalSection n={7} title="Contact">
        <LegalP>If your plans have changed, tell us as early as possible — the earlier we know, the more options we usually have.</LegalP>
        <LegalContactBlock email={CONTACT_EMAIL} address="Addis Ababa, Ethiopia" />
      </LegalSection>
    </LegalPageLayout>
  )
}
