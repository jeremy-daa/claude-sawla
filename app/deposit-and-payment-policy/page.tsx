import type { Metadata } from "next"
import { LegalSection, LegalP, LegalContactBlock } from "@/components/legal/LegalSection"
import LegalPageLayout from "@/components/legal/LegalPageLayout"

export const metadata: Metadata = {
  title: "Deposit & Payment Policy | Sawla Tours",
  description: "How Sawla Tours deposits, balance payments, and invoicing work — clear, secure, and confirmed in writing at every step.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://www.sawlatours.com/deposit-and-payment-policy" },
  openGraph: { title: "Deposit & Payment Policy | Sawla Tours", description: "Secure, written, and predictable — how payment works for a Sawla Tours journey.", images: [{ url: "https://www.sawlatours.com/images/og-home.jpg", width: 1200, height: 630 }] },
}

const LAST_UPDATED = "July 2026"
const CONTACT_EMAIL = "explore@sawlatours.com"

export default function DepositAndPaymentPolicyPage() {
  return (
    <LegalPageLayout
      title="Deposit & Payment Policy"
      description="How deposits, balance payments, and invoicing work for a confirmed Sawla Tours journey."
      lastUpdated={LAST_UPDATED}
      relatedLinks={[
        { label: "Booking Terms", href: "/booking-terms" },
        { label: "Cancellation Policy", href: "/cancellation-policy" },
        { label: "Planning & Pricing", href: "/planning-and-pricing" },
      ]}
    >
      <LegalSection n={1} title="Our Approach to Payment">
        <LegalP>
          We know that sending money to an overseas tour operator can feel like the biggest leap of trust in planning a trip. Every Sawla Tours payment request is accompanied by a written, itemized invoice and a confirmed itinerary, so you always know exactly what a payment covers before you send it. Nothing is requested informally or without documentation.
        </LegalP>
      </LegalSection>

      <LegalSection n={2} title="Deposit">
        <LegalP>
          A deposit of <strong className="text-volcanic font-semibold">30% of the total journey cost</strong> is required to confirm your booking, unless your quotation states a different figure — this can happen when a supplier (such as a remote mobile camp or a festival-dated hotel) requires a higher upfront commitment. The deposit is non-refundable once paid, reflecting costs we commit to suppliers on your behalf at the point of confirmation.
        </LegalP>
      </LegalSection>

      <LegalSection n={3} title="Balance Payment">
        <LegalP>
          The remaining balance is due <strong className="text-volcanic font-semibold">45 days before your departure date</strong>. For bookings confirmed within 45 days of departure, full payment is required at the time of confirmation. Some suppliers — particularly for mobile camping, specialist guiding, or peak festival dates — require earlier payment than our standard schedule; where this applies, we will state it clearly in your quotation before you confirm.
        </LegalP>
      </LegalSection>

      <LegalSection n={4} title="Payment Methods & Currency">
        <LegalP>
          We accept payment by international bank transfer, card payment, or another method agreed in writing with your specialist. All invoices are issued in US Dollars (USD) unless otherwise agreed. Bank transfer fees, card processing fees, and currency conversion charges applied by your bank or card provider are the client&apos;s responsibility unless we have agreed otherwise in writing — we recommend confirming these fees with your bank before sending payment.
        </LegalP>
      </LegalSection>

      <LegalSection n={5} title="If a Payment Is Delayed">
        <LegalP>
          If the balance payment is not received by the due date, we will contact you before taking any action. If payment still cannot be arranged within a reasonable period, we may treat the booking as cancelled by you, in which case our Cancellation Policy will apply. We would always rather solve a payment timing issue together than reach that point.
        </LegalP>
      </LegalSection>

      <LegalSection n={6} title="Contact">
        <LegalP>Questions about an invoice or payment method are always welcome before you send funds.</LegalP>
        <LegalContactBlock email={CONTACT_EMAIL} address="Addis Ababa, Ethiopia" />
      </LegalSection>
    </LegalPageLayout>
  )
}
