import type { Metadata } from "next"
import LegalPageLayout from "@/components/legal/LegalPageLayout"
import { LegalSection, LegalList, LegalP, LegalContactBlock } from "@/components/legal/LegalSection"

export const metadata: Metadata = {
  title: "Booking Terms | Sawla Tours",
  description: "How a Sawla Tours booking is confirmed — written confirmation, provisional holds, bespoke itinerary terms, supplier dependencies, and price validity.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://www.sawlatours.com/booking-terms" },
  openGraph: { title: "Booking Terms | Sawla Tours", description: "How a Sawla Tours booking is confirmed, from enquiry to confirmed itinerary.", images: [{ url: "https://www.sawlatours.com/images/og-home.jpg", width: 1200, height: 630 }] },
}

const LAST_UPDATED = "July 2026"
const CONTACT_EMAIL = "explore@sawlatours.com"

export default function BookingTermsPage() {
  return (
    <LegalPageLayout
      title="Booking Terms"
      description="These terms explain how a Sawla Tours booking moves from enquiry to confirmed journey. Please read them before confirming your itinerary."
      lastUpdated={LAST_UPDATED}
      relatedLinks={[
        { label: "Deposit & Payment Policy", href: "/deposit-and-payment-policy" },
        { label: "Cancellation Policy", href: "/cancellation-policy" },
        { label: "Force Majeure & Itinerary Changes", href: "/force-majeure-policy" },
      ]}
    >
      <LegalSection n={1} title="How a Booking Is Confirmed">
        <LegalP>
          An enquiry is not a booking. When you contact us, a Sawla Tours specialist reviews your travel idea and prepares a written itinerary and quotation. A booking becomes confirmed only once all of the following have happened:
        </LegalP>
        <LegalList items={[
          "You have received a written itinerary and quotation from Sawla Tours",
          "You have confirmed in writing (email or the equivalent) that you accept the itinerary and these Booking Terms",
          "Sawla Tours has received your deposit payment, as set out in our Deposit & Payment Policy",
        ]} />
        <LegalP>
          Until all three steps are complete, your place on any date, hotel, vehicle, or guide allocation is provisional only and is not guaranteed. By confirming a booking, you agree to these Booking Terms, our Deposit & Payment Policy, and our Cancellation Policy on behalf of yourself and everyone in your travel party.
        </LegalP>
      </LegalSection>

      <LegalSection n={2} title="Provisional Bookings">
        <LegalP>
          We are always glad to hold a route, date, or set of hotels while you decide — but a provisional hold is not a confirmed booking. Provisional holds are released automatically if a deposit has not been received by the date agreed with your specialist, since availability in Ethiopia (particularly for remote-area camps, festival dates, and peak-season hotels) can change quickly.
        </LegalP>
      </LegalSection>

      <LegalSection n={3} title="Bespoke Itineraries">
        <LegalP>
          Every Sawla Tours journey is designed individually around your dates, interests, and preferences. Because each itinerary is bespoke, the specific route, hotels, and inclusions in your quotation are the ones we plan and price against — not a generic package. If you would like to adjust the route after confirmation, we are glad to help; see Section 6 below on amendments.
        </LegalP>
      </LegalSection>

      <LegalSection n={4} title="Supplier-Dependent Services">
        <LegalP>
          Many elements of your journey — domestic flights, hotels and camps, park and community permits, specialist guides, and vehicles — are supplied by third parties operating under their own booking conditions. Sawla Tours coordinates these on your behalf, but availability, pricing, and terms for these elements can be affected by supplier decisions outside our control. Where a supplier requires a non-refundable deposit or earlier payment than our standard schedule, we will tell you before confirming that element of your itinerary.
        </LegalP>
      </LegalSection>

      <LegalSection n={5} title="Itinerary Amendments">
        <LegalP>
          Once your itinerary is confirmed, we are happy to accommodate reasonable changes to dates, routing, hotels, or activities where logistics allow. Amendment requests may involve a revised quotation, since supplier rates, availability, and permit costs can differ from your original booking. We will always share the revised cost with you before applying any change.
        </LegalP>
      </LegalSection>

      <LegalSection n={6} title="Price Validity & Currency">
        <LegalP>
          Quotations are provided in US Dollars (USD) and are valid for the period stated in your quotation — typically 14 days, unless your specialist tells you otherwise. Once your deposit is received and the booking is confirmed, your quoted price is fixed for the itinerary as booked and will not be increased due to routine currency movement or supplier rate changes, except:
        </LegalP>
        <LegalList items={[
          "Where you request a change to the confirmed itinerary (see Section 5)",
          "Where a government introduces a new tax, park fee, or entry requirement after confirmation",
          "In the rare case of extraordinary currency instability that materially affects the cost of already-booked services",
        ]} />
        <LegalP>
          We will always contact you before applying any price change under these exceptions.
        </LegalP>
      </LegalSection>

      <LegalSection n={7} title="Contact">
        <LegalP>Questions about these Booking Terms are welcome — reach out any time.</LegalP>
        <LegalContactBlock email={CONTACT_EMAIL} address="Addis Ababa, Ethiopia" />
      </LegalSection>
    </LegalPageLayout>
  )
}
