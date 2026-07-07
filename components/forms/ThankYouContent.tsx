'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { trackEnquirySubmitted } from '@/lib/conversionTracking'

export default function ThankYouContent() {
  const searchParams = useSearchParams()
  const journeyName = searchParams.get('journeyName') ?? ''
  const travelStyle = searchParams.get('style') ?? ''
  const contactPreference = searchParams.get('contact') ?? ''

  // Fires once, after the redirect completes — the standard place for ad-platform/GA4
  // conversion pixels to hook in (see lib/conversionTracking.ts).
  useEffect(() => {
    trackEnquirySubmitted({ journeyName, travelStyle, contactPreference })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const whatsappHref = 'https://wa.me/25170578306?text=' + encodeURIComponent(
    journeyName
      ? `Hi Sawla Tours, I just sent an enquiry about ${journeyName} and wanted to follow up.`
      : 'Hi Sawla Tours, I just sent an enquiry and wanted to follow up.'
  )

  return (
    <div className="border border-gold/30 bg-gold-faint rounded-card p-8 md:p-12 text-center max-w-2xl mx-auto" role="status" aria-live="polite">
      <div className="w-16 h-16 rounded-full border border-gold/40 flex items-center justify-center mx-auto mb-6">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M5 12l5 5L19 7" stroke="#c9941a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h1 className="font-display text-charcoal mb-3" style={{ fontSize: 'clamp(1.75rem,3.5vw,2.5rem)' }}>
        Thank you — your enquiry is on its way.
      </h1>
      <p className="text-warmgrey font-body leading-relaxed max-w-md mx-auto mb-2">
        {journeyName
          ? `An Ethiopia specialist will review your ${journeyName} enquiry and reply within 24 hours on business days.`
          : 'An Ethiopia specialist from our Addis Ababa team will reply within 24 hours on business days.'}
      </p>
      {contactPreference && (
        <p className="text-warmgrey/80 font-body text-sm mb-6">We&apos;ll reach out via {contactPreference.toLowerCase()}, as you preferred.</p>
      )}

      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
        <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-primary">
          Message Us on WhatsApp Now
        </a>
        <Link href="/tours-by-experience" className="btn-ghost">
          Browse More Journeys
        </Link>
      </div>

      <div className="mt-8 pt-8 border-t border-gold/20 text-sm text-warmgrey">
        While you wait, you might also like{' '}
        <Link href="/planning-and-pricing" className="text-gold hover:text-charcoal transition-colors font-medium cursor-pointer">how our pricing works</Link>
        {' '}or{' '}
        <Link href="/how-we-work" className="text-gold hover:text-charcoal transition-colors font-medium cursor-pointer">how planning works</Link>.
      </div>
    </div>
  )
}
