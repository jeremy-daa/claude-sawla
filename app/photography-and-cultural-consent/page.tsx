import type { Metadata } from "next"
import { LegalSection, LegalList, LegalP, LegalContactBlock } from "@/components/legal/LegalSection"
import LegalPageLayout from "@/components/legal/LegalPageLayout"

export const metadata: Metadata = {
  title: "Photography & Cultural Consent Policy | Sawla Tours",
  description: "How Sawla Tours approaches respectful, consent-first photography and filming across Ethiopia's communities, ceremonies, and cultural sites.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://www.sawlatours.com/photography-and-cultural-consent" },
  openGraph: { title: "Photography & Cultural Consent Policy | Sawla Tours", description: "Ethical, consent-first photography — the way we believe travel photography should work.", images: [{ url: "https://www.sawlatours.com/images/og-home.jpg", width: 1200, height: 630 }] },
}

const LAST_UPDATED = "July 2026"
const CONTACT_EMAIL = "explore@sawlatours.com"

export default function PhotographyAndCulturalConsentPage() {
  return (
    <LegalPageLayout
      title="Photography & Cultural Consent Policy"
      description="Ethiopia's communities, ceremonies, and cultural sites deserve respect, not just good light — here's how we approach it together."
      lastUpdated={LAST_UPDATED}
      relatedLinks={[
        { label: "Responsible Travel", href: "/responsible-travel" },
        { label: "Booking Terms", href: "/booking-terms" },
      ]}
    >
      <LegalSection n={1} title="Why This Matters">
        <LegalP>
          Some of Ethiopia&apos;s most photographed places — the Omo Valley, rock-hewn churches, festival grounds, coffee ceremonies — are living communities and active places of worship, not backdrops. We want every Sawla Tours traveler to come home with images they&apos;re proud of, made in a way the people in them would also be proud of.
        </LegalP>
      </LegalSection>

      <LegalSection n={2} title="Our Photography Principles">
        <LegalList items={[
          "Photograph people, ceremonies, and communities with consent, not from a distance without it",
          "No intrusive or unconsented photography of religious spaces, private ceremonies, children, or vulnerable individuals",
          "Follow your guide's direction — they carry the local relationships and protocol knowledge that make respectful access possible in the first place",
          "Some communities and sites may request a local payment, set specific limits, or decline photography entirely on a given day — this is their right, and we ask every traveler to honor it",
        ]} />
      </LegalSection>

      <LegalSection n={3} title="Drone Use">
        <LegalP>
          Drone use in Ethiopia requires prior legal clearance and is not automatically permitted. Flying a drone without the correct authorization can create real legal and safety risk, both for you and for Sawla Tours. If you plan to bring a drone, tell us before your trip so we can advise on what is genuinely possible for your route.
        </LegalP>
      </LegalSection>

      <LegalSection n={4} title="If a Situation Requires Us to Step In">
        <LegalP>
          Sawla Tours reserves the right to ask a traveler to stop photographing or filming where it is disrespectful, intrusive, or against a community&apos;s or guide&apos;s direction. This is not about restricting your creativity — it&apos;s what keeps the access we&apos;ve built with communities over years open for the travelers who come after you.
        </LegalP>
      </LegalSection>

      <LegalSection n={5} title="Contact">
        <LegalP>Planning a serious photography trip? Tell us your goals early and we&apos;ll help you shape a route that respects both your creative brief and the places you&apos;re visiting.</LegalP>
        <LegalContactBlock email={CONTACT_EMAIL} address="Addis Ababa, Ethiopia" />
      </LegalSection>
    </LegalPageLayout>
  )
}
