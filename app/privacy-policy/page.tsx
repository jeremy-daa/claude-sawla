import type { Metadata } from "next"
import { LegalSection, LegalList, LegalP, LegalContactBlock } from "@/components/legal/LegalSection"
import LegalPageLayout from "@/components/legal/LegalPageLayout"

export const metadata: Metadata = {
  title: "Privacy Policy | Sawla Tours",
  description: "How Sawla Tours collects, uses, and protects your personal data when you enquire, book, or travel with us.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://www.sawlatours.com/privacy-policy" },
  openGraph: { title: "Privacy Policy | Sawla Tours", description: "How Sawla Tours collects, uses, and protects your personal data.", images: [{ url: "https://www.sawlatours.com/images/og-home.jpg", width: 1200, height: 630 }] },
}

const LAST_UPDATED = "July 2026"
const CONTACT_EMAIL = "explore@sawlatours.com"
const COMPANY = "Sawla Tours"
const ADDRESS = "Addis Ababa, Ethiopia"

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      description={`This policy applies to the website at sawlatours.com and all related services operated by ${COMPANY}.`}
      lastUpdated={LAST_UPDATED}
      relatedLinks={[
        { label: "Cookie Policy", href: "/cookie-policy" },
        { label: "Terms of Use", href: "/terms" },
        { label: "Booking Terms", href: "/booking-terms" },
      ]}
    >
      <LegalSection n={1} title="Who We Are">
        <LegalP>
          {COMPANY} is a private tour operator based in {ADDRESS}. We design and operate private, tailor-made Ethiopia journeys for individual travelers, families, and specialist groups. References to &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo; in this policy refer to Sawla Tours.
        </LegalP>
        <LegalP>
          We are the data controller for personal data collected through this website. Questions or requests related to this policy should be directed to{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-gold-ink hover:underline">{CONTACT_EMAIL}</a>.
        </LegalP>
      </LegalSection>

      <LegalSection n={2} title="What Data We Collect">
        <LegalP>We collect personal data only when you voluntarily provide it — through our enquiry form, by email, or in the course of planning and operating a confirmed journey. This may include:</LegalP>
        <LegalList items={[
          "Name, email address, and WhatsApp or phone number",
          "Country of residence, travel dates, and trip preferences",
          "Group size and composition, budget guidance, and interests",
          "Passport and travel document details, where needed for flight bookings or permit applications on a confirmed journey",
          "Dietary, medical, mobility, or other special-needs information you choose to share so we can plan around it",
          "Payment and invoicing information for confirmed bookings (see below — we do not collect card details through this website)",
          "Website analytics — see our Cookie Policy for full detail",
        ]} />
        <LegalP>
          We do not collect payment card details through this website. If a booking proceeds to payment, this is handled through a separate, secure process communicated directly by our team, as described in our Deposit &amp; Payment Policy.
        </LegalP>
      </LegalSection>

      <LegalSection n={3} title="How We Use Your Data">
        <LegalP>We use the personal data you provide to:</LegalP>
        <LegalList items={[
          "Respond to your travel enquiry and design a proposed itinerary",
          "Communicate with you about your planned or confirmed journey",
          "Coordinate travel logistics — guides, accommodation, transport, and permits — with our suppliers for a confirmed booking",
          "Maintain financial and accounting records as required by law",
          "Support your safety during travel, including sharing necessary details with your guide and driver",
          "Comply with legal obligations in Ethiopia and, where applicable, international data protection law",
        ]} />
      </LegalSection>

      <LegalSection n={4} title="Legal Basis for Processing">
        <LegalP>
          Where GDPR or similar data protection frameworks apply to you (for example, if you are a resident of the European Union, United Kingdom, or a country with comparable legislation), we process your personal data on these legal bases:
        </LegalP>
        <LegalList items={[
          <><strong className="text-volcanic font-semibold">Pre-contractual and contractual necessity:</strong> processing your data to respond to an enquiry, design an itinerary, and coordinate a confirmed journey is necessary to perform our agreement with you.</>,
          <><strong className="text-volcanic font-semibold">Legitimate interests:</strong> maintaining records of correspondence and confirmed bookings for operational and legal purposes.</>,
          <><strong className="text-volcanic font-semibold">Legal compliance:</strong> processing or retaining data where required by Ethiopian law or other applicable legal obligations.</>,
          <><strong className="text-volcanic font-semibold">Consent:</strong> for optional email marketing communications — see Section 9 below.</>,
        ]} />
      </LegalSection>

      <LegalSection n={5} title="Data Sharing">
        <LegalP>We do not sell, rent, or trade your personal data. For confirmed journeys, we may share the minimum data necessary with:</LegalP>
        <LegalList items={[
          "Licensed guides and drivers involved in your journey",
          "Accommodation and camp providers, for reservation purposes",
          "Ethiopian Airlines and other domestic carriers, for flight bookings",
          "Relevant government authorities in Ethiopia, for permits where required",
          "Payment, invoicing, and accounting service providers",
          "Our email service provider, for delivering correspondence",
        ]} />
        <LegalP>Third parties we work with are required to handle your data appropriately and only for the purpose we&apos;ve shared it.</LegalP>
      </LegalSection>

      <LegalSection n={6} title="International Data Transfer">
        <LegalP>
          As an Ethiopia-based operator serving international travelers, your data may be processed or stored outside your home country, including in Ethiopia and in the countries where our service providers (such as our email and payment platforms) operate. Where we transfer data internationally, we take reasonable steps to ensure it continues to be protected to a standard consistent with this policy.
        </LegalP>
      </LegalSection>

      <LegalSection n={7} title="Data Retention">
        <LegalP>
          We retain enquiry data for a reasonable period to allow for follow-up. Where an enquiry does not convert to a booking, data is typically deleted within 24 months. For confirmed bookings, we retain records consistent with our legal and accounting obligations (generally up to 7 years for financial records). You may request earlier deletion of non-essential personal data at any time.
        </LegalP>
      </LegalSection>

      <LegalSection n={8} title="Cookies & Website Analytics">
        <LegalP>
          This website uses cookies for basic functionality and, where enabled, website analytics. For full detail on the categories of cookies we use and how to manage them, see our{" "}
          <a href="/cookie-policy" className="text-gold-ink hover:underline">Cookie Policy</a>.
        </LegalP>
      </LegalSection>

      <LegalSection n={9} title="Email Marketing">
        <LegalP>
          We will only send you marketing emails — such as inspiration or offers unrelated to an active enquiry or booking — if you have opted in to receive them. You can withdraw consent and unsubscribe at any time using the link in any marketing email, or by contacting us directly. Operational messages related to an active enquiry or confirmed booking are not marketing and will continue regardless of marketing preferences, as they are necessary to deliver our service to you.
        </LegalP>
      </LegalSection>

      <LegalSection n={10} title="Your Rights">
        <LegalP>Where applicable data protection law gives you these rights, you may:</LegalP>
        <LegalList items={[
          "Request access to the personal data we hold about you",
          "Request correction of inaccurate personal data",
          "Request deletion of your personal data, subject to legal retention obligations",
          "Object to, or request restriction of, certain processing",
          "Request a copy of your data in a portable format",
        ]} />
        <LegalP>
          To exercise any of these rights, email us at{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-gold-ink hover:underline">{CONTACT_EMAIL}</a>. We will respond within 30 days.
        </LegalP>
      </LegalSection>

      <LegalSection n={11} title="Security">
        <LegalP>
          We take reasonable technical and organisational measures to protect personal data from unauthorised access, loss, or disclosure. This website is served over HTTPS with security headers including Strict Transport Security, X-Frame-Options, and Content Security Policy. No internet transmission is completely secure — if you have particular data security concerns, please contact us directly.
        </LegalP>
      </LegalSection>

      <LegalSection n={12} title="Children">
        <LegalP>
          This website is not directed at children under 16. We do not knowingly collect personal data from children without parental consent. If you believe we have inadvertently collected data from a child, please contact us and we will delete it promptly.
        </LegalP>
      </LegalSection>

      <LegalSection n={13} title="Changes to This Policy">
        <LegalP>
          We may update this policy from time to time. The &ldquo;Last updated&rdquo; date at the top of this page reflects the most recent changes. Material changes will be communicated to active clients by email.
        </LegalP>
      </LegalSection>

      <LegalSection n={14} title="Contact">
        <LegalP>For any questions, requests, or concerns about this privacy policy or how we handle your personal data, contact us:</LegalP>
        <LegalContactBlock email={CONTACT_EMAIL} address={ADDRESS} />
      </LegalSection>
    </LegalPageLayout>
  )
}
