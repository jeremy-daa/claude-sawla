import type { Metadata } from "next"
import { LegalSection, LegalP, LegalContactBlock } from "@/components/legal/LegalSection"
import LegalPageLayout from "@/components/legal/LegalPageLayout"

export const metadata: Metadata = {
  title: "Force Majeure & Itinerary Changes | Sawla Tours",
  description: "How Sawla Tours handles events beyond our control — safety and continuity always come first.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://www.sawlatours.com/force-majeure-policy" },
  openGraph: { title: "Force Majeure & Itinerary Changes | Sawla Tours", description: "When circumstances change, safety and continuity come first.", images: [{ url: "https://www.sawlatours.com/images/og-home.jpg", width: 1200, height: 630 }] },
}

const LAST_UPDATED = "July 2026"
const CONTACT_EMAIL = "explore@sawlatours.com"

export default function ForceMajeurePolicyPage() {
  return (
    <LegalPageLayout
      title="Force Majeure & Itinerary Changes"
      description="Ethiopia is a real, living country, not a fixed set piece — here is how we handle the things no one can control."
      lastUpdated={LAST_UPDATED}
      relatedLinks={[
        { label: "Booking Terms", href: "/booking-terms" },
        { label: "Cancellation Policy", href: "/cancellation-policy" },
        { label: "Travel Insurance & Health", href: "/travel-insurance-health-and-visa" },
      ]}
    >
      <LegalSection n={1} title="Events Beyond Our Control">
        <LegalP>
          Occasionally, circumstances arise that neither Sawla Tours nor our clients can control: severe weather, political instability, conflict, road closures, strikes, government actions or advisories, epidemics, natural disasters, other safety concerns, supplier failure, or flight disruption. We monitor conditions across Ethiopia continuously and will always tell you as soon as something may affect your journey.
        </LegalP>
      </LegalSection>

      <LegalSection n={2} title="Our Approach When Conditions Change">
        <LegalP>
          Where any of the above requires it, Sawla Tours may alter your route, guide, vehicle, hotel, activities, or the sequence of your itinerary for reasons of safety or logistics. We treat these decisions seriously and never make them lightly — your safety and the continuity of your journey come first, always.
        </LegalP>
        <LegalP>
          Wherever reasonably possible, we provide an equivalent alternative of comparable standard and experience, rather than simply removing an element of your trip. Where an alternative is of genuinely lower value, we will discuss a proportionate adjustment with you.
        </LegalP>
      </LegalSection>

      <LegalSection n={3} title="Liability for Force Majeure Events">
        <LegalP>
          Sawla Tours is not liable for losses, costs, or delays caused by events beyond our reasonable control, including those listed in Section 1. This includes costs arising from flight cancellations, supplier closures, or government-directed changes that were not foreseeable at the time of booking. We strongly recommend comprehensive travel insurance that includes cover for trip disruption caused by these kinds of events — see our Travel Insurance &amp; Health page.
        </LegalP>
      </LegalSection>

      <LegalSection n={4} title="Our Commitment to You">
        <LegalP>
          Our Addis Ababa team monitors road, political, and weather conditions across every region we operate in, every day your journey is underway. If a change becomes necessary, you will hear it from us directly and promptly, with a clear explanation and a real alternative — not silence.
        </LegalP>
      </LegalSection>

      <LegalSection n={5} title="Contact">
        <LegalP>If you have questions about how we handle disruption on a specific route, ask us before you book.</LegalP>
        <LegalContactBlock email={CONTACT_EMAIL} address="Addis Ababa, Ethiopia" />
      </LegalSection>
    </LegalPageLayout>
  )
}
