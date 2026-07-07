import type { Metadata } from "next"
import { LegalSection, LegalP, LegalContactBlock } from "@/components/legal/LegalSection"
import LegalPageLayout from "@/components/legal/LegalPageLayout"

export const metadata: Metadata = {
  title: "Terms of Use | Sawla Tours",
  description: "Terms governing the use of the sawlatours.com website — content ownership, acceptable use, external links, and liability.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://www.sawlatours.com/terms" },
  openGraph: { title: "Terms of Use | Sawla Tours", description: "Terms governing use of the sawlatours.com website.", images: [{ url: "https://www.sawlatours.com/images/og-home.jpg", width: 1200, height: 630 }] },
}

const LAST_UPDATED = "July 2026"
const CONTACT_EMAIL = "explore@sawlatours.com"

export default function TermsOfUsePage() {
  return (
    <LegalPageLayout
      title="Terms of Use"
      description="These terms govern your use of the sawlatours.com website. For the terms that apply once you book a journey, see our Booking Terms."
      lastUpdated={LAST_UPDATED}
      relatedLinks={[
        { label: "Booking Terms", href: "/booking-terms" },
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Cookie Policy", href: "/cookie-policy" },
      ]}
    >
      <LegalSection n={1} title="About This Website">
        <LegalP>
          This website (sawlatours.com) is operated by Sawla Tours, a private tour operator based in Addis Ababa, Ethiopia. These Terms of Use govern your use of the website itself. They are separate from — and do not replace — our Booking Terms, which apply once you confirm a journey with us.
        </LegalP>
      </LegalSection>

      <LegalSection n={2} title="Content Ownership">
        <LegalP>
          All text, photography, video, itinerary content, design, and branding on this website are the property of Sawla Tours or used with permission, unless otherwise credited. You may view and share pages of this site for personal, non-commercial purposes. You may not copy, reproduce, republish, or otherwise reuse our images, written content, or site design — in whole or in part — without our prior written permission.
        </LegalP>
      </LegalSection>

      <LegalSection n={3} title="General Information Only">
        <LegalP>
          Content on this website — including itinerary descriptions, destination information, seasonal guidance, and pricing context — is provided for general planning purposes and may change without notice. Ground conditions, access, and availability in Ethiopia can shift quickly; the specific route, inclusions, and price that apply to your journey are the ones confirmed in your personal quotation, not necessarily what is described on a public page.
        </LegalP>
      </LegalSection>

      <LegalSection n={4} title="Acceptable Use">
        <LegalP>
          Please don&apos;t use this website in a way that could damage, disable, or impair it, or interfere with anyone else&apos;s use of it — including attempting unauthorized access, introducing malicious code, or scraping content at scale.
        </LegalP>
      </LegalSection>

      <LegalSection n={5} title="External Links">
        <LegalP>
          This website may link to third-party resources — for example, official visa or health authorities. We do not control and are not responsible for the content, accuracy, or availability of external websites. Links are provided for convenience and do not imply endorsement.
        </LegalP>
      </LegalSection>

      <LegalSection n={6} title="Limitation of Liability">
        <LegalP>
          We take care to keep this website accurate and up to date, but we do not guarantee that it is error-free or uninterrupted. To the fullest extent permitted by law, Sawla Tours is not liable for any loss arising from your use of, or inability to use, this website. This section concerns the website only — liability relating to a confirmed journey is addressed in our Booking Terms and related policies.
        </LegalP>
      </LegalSection>

      <LegalSection n={7} title="Governing Law">
        <LegalP>
          These Terms of Use are governed by the laws of the Federal Democratic Republic of Ethiopia, without prejudice to any mandatory consumer protection law that applies in your country of residence.
        </LegalP>
      </LegalSection>

      <LegalSection n={8} title="Contact">
        <LegalP>Questions about these Terms of Use are welcome.</LegalP>
        <LegalContactBlock email={CONTACT_EMAIL} address="Addis Ababa, Ethiopia" />
      </LegalSection>
    </LegalPageLayout>
  )
}
