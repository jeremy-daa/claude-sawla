import type { Metadata } from "next"
import { LegalSection, LegalList, LegalP, LegalContactBlock } from "@/components/legal/LegalSection"
import LegalPageLayout from "@/components/legal/LegalPageLayout"

export const metadata: Metadata = {
  title: "Travel Insurance, Health & Visa Responsibility | Sawla Tours",
  description: "What Sawla Tours requires and recommends around travel insurance, health preparation, and visa/entry documentation for Ethiopia.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://www.sawlatours.com/travel-insurance-health-and-visa" },
  openGraph: { title: "Travel Insurance, Health & Visa Responsibility | Sawla Tours", description: "Prepare well, travel confidently — what to arrange before you fly.", images: [{ url: "https://www.sawlatours.com/images/og-home.jpg", width: 1200, height: 630 }] },
}

const LAST_UPDATED = "July 2026"
const CONTACT_EMAIL = "explore@sawlatours.com"

export default function TravelInsuranceHealthAndVisaPage() {
  return (
    <LegalPageLayout
      title="Travel Insurance, Health & Visa Responsibility"
      description="A clear picture of what we require, what we recommend, and what remains yours to arrange."
      lastUpdated={LAST_UPDATED}
      relatedLinks={[
        { label: "Booking Terms", href: "/booking-terms" },
        { label: "Force Majeure & Itinerary Changes", href: "/force-majeure-policy" },
        { label: "Cancellation Policy", href: "/cancellation-policy" },
      ]}
    >
      <LegalSection n={1} title="Travel Insurance Is Mandatory">
        <LegalP>
          Comprehensive travel insurance is required for every Sawla Tours journey. Your policy should cover, at minimum:
        </LegalP>
        <LegalList items={[
          "Medical treatment while traveling",
          "Emergency medical evacuation and repatriation — essential for remote regions such as the Danakil Depression, Simien Mountains, and Bale Mountains",
          "Trip cancellation and interruption",
          "Loss or delay of baggage and personal effects",
          "Cover for adventure or remote travel activities included in your itinerary, such as trekking or mobile camping",
        ]} />
        <LegalP>
          We may ask to see evidence of your policy before or during your journey. We are not responsible for costs or losses arising from inadequate insurance cover.
        </LegalP>
      </LegalSection>

      <LegalSection n={2} title="Your Health Responsibilities">
        <LegalP>
          You are responsible for ensuring you are medically and physically fit for the journey you have booked, and for arranging any vaccinations, antimalarial medication, or other preventive care your doctor or a travel health clinic recommends — ideally 6–8 weeks before departure. Please disclose any medical condition, mobility limitation, or dietary requirement that may affect your journey when you book, so we can plan around it properly.
        </LegalP>
        <LegalP>
          Sawla Tours can share general, practical guidance about the regions you&apos;ll visit, but this is not medical advice. Please consult a qualified medical professional for anything specific to your health.
        </LegalP>
      </LegalSection>

      <LegalSection n={3} title="Passport, Visa & Entry Documents">
        <LegalP>
          You are responsible for holding a passport valid for at least six months beyond your travel dates, and for obtaining any visa or entry documentation required for Ethiopia — including Ethiopia&apos;s eVisa where applicable. We are glad to point you toward current official resources, but visa and entry requirements are ultimately a matter for the relevant embassy or immigration authority, and can change without notice.
        </LegalP>
      </LegalSection>

      <LegalSection n={4} title="Where Our Advice Ends">
        <LegalP>
          We know Ethiopia deeply, and we&apos;re glad to share what we know about routes, seasons, and conditions on the ground. But we are not a substitute for your embassy, your doctor, or your insurance provider — please treat their guidance as final on immigration, medical, and insurance matters.
        </LegalP>
      </LegalSection>

      <LegalSection n={5} title="Contact">
        <LegalP>If you&apos;re unsure what your trip requires, ask us early — we&apos;re happy to point you in the right direction.</LegalP>
        <LegalContactBlock email={CONTACT_EMAIL} address="Addis Ababa, Ethiopia" />
      </LegalSection>
    </LegalPageLayout>
  )
}
