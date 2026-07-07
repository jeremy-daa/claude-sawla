// Developer-ready conversion tracking hook — fires generic lead events into whichever
// analytics/ads snippet is already loaded on the page (GA4 gtag.js, Meta Pixel, or a GTM
// dataLayer). Every call is guarded and no-ops silently until the real snippet is added
// to app/layout.tsx, so this ships safely with zero tracking configured today.

interface EnquiryConversionContext {
  journeyName?: string
  travelStyle?: string
  contactPreference?: string
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

export function trackEnquirySubmitted(context: EnquiryConversionContext = {}): void {
  if (typeof window === 'undefined') return

  const label = context.journeyName || context.travelStyle || 'General enquiry'

  // GA4 (gtag.js) — standard "generate_lead" event
  window.gtag?.('event', 'generate_lead', {
    event_category: 'enquiry',
    event_label: label,
    journey_name: context.journeyName,
    travel_style: context.travelStyle,
  })

  // Meta / Facebook Pixel
  window.fbq?.('track', 'Lead', {
    content_name: label,
  })

  // Generic Google Tag Manager dataLayer push — for any GTM-managed tags
  window.dataLayer?.push({
    event: 'enquiry_submitted',
    journeyName: context.journeyName ?? '',
    travelStyle: context.travelStyle ?? '',
    contactPreference: context.contactPreference ?? '',
  })
}
