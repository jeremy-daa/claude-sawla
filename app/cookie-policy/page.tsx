import type { Metadata } from "next"
import { LegalSection, LegalP, LegalContactBlock } from "@/components/legal/LegalSection"
import LegalPageLayout from "@/components/legal/LegalPageLayout"

export const metadata: Metadata = {
  title: "Cookie Policy | Sawla Tours",
  description: "What cookies sawlatours.com uses, why, and how to manage them.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://www.sawlatours.com/cookie-policy" },
  openGraph: { title: "Cookie Policy | Sawla Tours", description: "A simple, transparent explanation of the cookies this site uses.", images: [{ url: "https://www.sawlatours.com/images/og-home.jpg", width: 1200, height: 630 }] },
}

const LAST_UPDATED = "July 2026"
const CONTACT_EMAIL = "explore@sawlatours.com"

const COOKIE_TYPES = [
  { name: "Essential cookies", body: "Needed for the website to function — for example, remembering your progress through a form. These cannot be switched off, as the site would not work correctly without them." },
  { name: "Analytics cookies", body: "Help us understand, in aggregate and anonymised form, how visitors use the site — which pages are read, how long a visit lasts, and which routes are most popular. This informs what we write and build next; it never identifies you personally." },
  { name: "Performance / UX cookies", body: "Support smoother page loading and remember simple preferences (such as reduced-motion settings) so the site feels considerate rather than intrusive." },
  { name: "Marketing cookies", body: "Only used if and when Sawla Tours runs a specific advertising campaign, and only with your consent via the cookie banner. As of this policy's last update, no marketing cookies are active on this site." },
]

export default function CookiePolicyPage() {
  return (
    <LegalPageLayout
      title="Cookie Policy"
      description="A short, plain-English explanation of the cookies used on sawlatours.com and how you can manage them."
      lastUpdated={LAST_UPDATED}
      relatedLinks={[
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Terms of Use", href: "/terms" },
      ]}
    >
      <LegalSection n={1} title="What Cookies Are">
        <LegalP>
          Cookies are small text files stored on your device when you visit a website. They help the site function correctly and, where enabled, help us understand how the site is used so we can improve it.
        </LegalP>
      </LegalSection>

      <LegalSection n={2} title="The Cookies We Use">
        <div className="space-y-5 mb-4">
          {COOKIE_TYPES.map(c => (
            <div key={c.name} className="p-5 bg-white border border-sand rounded-card">
              <h3 className="font-display text-volcanic font-normal mb-2" style={{ fontSize: "1.0625rem" }}>{c.name}</h3>
              <p className="text-warmgrey font-body leading-relaxed" style={{ fontSize: "0.9375rem" }}>{c.body}</p>
            </div>
          ))}
        </div>
      </LegalSection>

      <LegalSection n={3} title="Managing Cookies">
        <LegalP>
          If this site presents a cookie consent banner, you can choose which non-essential categories to accept or decline at any time from that banner. You can also manage or delete cookies directly in your browser settings — every major browser provides this option under its privacy or security settings. Disabling non-essential cookies will not affect your ability to browse the site or submit an enquiry.
        </LegalP>
      </LegalSection>

      <LegalSection n={4} title="Changes to This Policy">
        <LegalP>
          If the cookies we use change — for example, if we introduce a specific marketing campaign — we will update this page and the &ldquo;Last updated&rdquo; date above.
        </LegalP>
      </LegalSection>

      <LegalSection n={5} title="Contact">
        <LegalP>Questions about cookies or website analytics are welcome any time.</LegalP>
        <LegalContactBlock email={CONTACT_EMAIL} address="Addis Ababa, Ethiopia" />
      </LegalSection>
    </LegalPageLayout>
  )
}
