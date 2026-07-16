'use client'

import { useState, type FormEvent } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

type Status = 'idle' | 'submitting' | 'error'

const INTERESTS = [
  'Historic & cultural', 'Lalibela, Gondar, Axum', 'Omo Valley', 'Simien Mountains trekking',
  'Bale Mountains wildlife', 'Danakil expedition', 'Photography', 'Birding & wildlife',
  'Festival tours', 'Coffee & food', 'Mobile tented camps', 'Not sure yet',
]

export default function EnquiryForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string>('')

  // Journey-aware context — present when arriving from an itinerary page's enquiry link.
  const journeySlug  = searchParams.get('journey') ?? ''
  const journeyName  = searchParams.get('journeyName') ?? ''
  const travelStyle  = searchParams.get('style') ?? ''
  const journeyDuration = searchParams.get('duration') ?? ''
  const operatingStatus = searchParams.get('status') ?? ''
  const hasJourneyContext = Boolean(journeySlug)

  // Trip Wizard handoff — prefill everything the visitor already told the wizard.
  const fromWizard    = searchParams.get('src') === 'wizard'
  const wizardWhen    = searchParams.get('when') ?? ''
  const wizardParty   = searchParams.get('party') ?? ''
  const wizardComfort = searchParams.get('comfort') ?? ''
  const wizardLen     = searchParams.get('len') ?? ''
  // Wizard duration buckets → the form's select options (closest bucket)
  const WIZARD_DURATION: Record<string, string> = {
    '1 – 5 days': '4–7 days', '6 – 10 days': '8–12 days',
    '11 – 15 days': '13–18 days', '16+ days': '19+ days',
  }
  const wizardDuration = WIZARD_DURATION[wizardLen] ?? ''
  // Wizard interest labels → the form's checkbox labels
  const WIZARD_INTERESTS: Record<string, string> = {
    'Historic & Cultural': 'Historic & cultural', 'Wildlife & Birding': 'Birding & wildlife',
    'Omo Valley': 'Omo Valley', 'Danakil Expedition': 'Danakil expedition',
    'Photography': 'Photography', 'Festival Immersion': 'Festival tours',
  }
  const wizardInterests = (searchParams.get('interests') ?? '')
    .split('|').map(x => WIZARD_INTERESTS[x]).filter(Boolean)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    setError('')

    const form = e.currentTarget
    const data = new FormData(form)
    const payload: Record<string, string> = {}
    for (const [key, value] of data.entries()) {
      if (typeof value === 'string') {
        payload[key] = payload[key] ? `${payload[key]}, ${value}` : value
      }
    }

    try {
      const res = await fetch('/api/enquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(json.error ?? 'Something went wrong. Please email us directly at explore@sawlatours.com')
        setStatus('error')
        return
      }

      // Redirect to a dedicated thank-you URL — this is the standard integration point
      // for ad-platform/analytics conversion tracking (Google Ads, Meta, GTM), since most
      // of those tools fire on a destination-page visit rather than an in-page state change.
      const thankYouParams = new URLSearchParams()
      if (journeyName) thankYouParams.set('journeyName', journeyName)
      if (travelStyle) thankYouParams.set('style', travelStyle)
      const contactPreference = String(payload.contactPreference ?? '')
      if (contactPreference) thankYouParams.set('contact', contactPreference)
      router.push('/enquire/thank-you' + (thankYouParams.toString() ? '?' + thankYouParams.toString() : ''))
    } catch {
      setError('Network error. Please check your connection or email us at explore@sawlatours.com')
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" aria-label="Ethiopia tour enquiry form">
      {/* Hidden spam trap */}
      <input type="text" name="_honey" className="hidden" aria-hidden="true" tabIndex={-1} autoComplete="off" />

      {/* Hidden journey-context fields — carried silently into the submission */}
      {hasJourneyContext && (
        <>
          <input type="hidden" name="journeySlug" value={journeySlug} />
          <input type="hidden" name="journeyName" value={journeyName} />
          <input type="hidden" name="travelStyle" value={travelStyle} />
          <input type="hidden" name="journeyDuration" value={journeyDuration} />
          <input type="hidden" name="operatingStatus" value={operatingStatus} />
        </>
      )}

      {/* Journey context banner — confirms to the traveler that their details carried over */}
      {hasJourneyContext && (
        <div className="border border-gold/30 bg-gold-faint rounded-card px-5 py-4">
          <div className="text-[11px] uppercase tracking-wider text-gold font-500 mb-1.5">Enquiring About</div>
          <div className="text-charcoal font-display text-lg font-normal leading-snug">{journeyName}</div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5 text-xs text-warmgrey">
            {travelStyle && <span>{travelStyle}</span>}
            {journeyDuration && <span>{journeyDuration}</span>}
            {operatingStatus && <span>{operatingStatus} access</span>}
          </div>
        </div>
      )}

      {/* Wizard handoff confirmation — tells the visitor their answers carried over */}
      {fromWizard && !hasJourneyContext && (
        <div className="border border-gold/30 bg-gold-faint rounded-card px-5 py-3">
          <p className="text-charcoal font-body text-sm">
            Your Trip Wizard answers are already filled in below — adjust anything before sending.
          </p>
        </div>
      )}

      {/* STEP 1 — YOUR BASICS (required) */}
      <fieldset className="space-y-5">
        <legend className="text-[11px] uppercase tracking-wider text-gold font-500 mb-4">Step 1 — Your basics</legend>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="name" className="block text-sm font-500 text-charcoal mb-1.5">Full name <span className="text-gold">*</span></label>
            <input id="name" name="name" type="text" required placeholder="Your name" className="w-full px-4 py-3 border border-sand rounded-sm bg-ivory text-charcoal placeholder-warmgrey/50 focus:outline-none focus:border-gold text-sm" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-500 text-charcoal mb-1.5">Email address <span className="text-gold">*</span></label>
            <input id="email" name="email" type="email" required placeholder="name@example.com" className="w-full px-4 py-3 border border-sand rounded-sm bg-ivory text-charcoal placeholder-warmgrey/50 focus:outline-none focus:border-gold text-sm" />
          </div>
        </div>

        <div>
          <label htmlFor="whatsapp" className="block text-sm font-500 text-charcoal mb-1.5">WhatsApp / phone number <span className="text-gold">*</span></label>
          <input id="whatsapp" name="whatsapp" type="tel" required placeholder="+1 202 555 0100 (include country code)" className="w-full px-4 py-3 border border-sand rounded-sm bg-ivory text-charcoal placeholder-warmgrey/50 focus:outline-none focus:border-gold text-sm" />
        </div>

        <div>
          <label className="block text-sm font-500 text-charcoal mb-2">Preferred contact method</label>
          <div className="flex flex-wrap gap-4">
            {['WhatsApp', 'Email', 'Either'].map((opt, i) => (
              <label key={opt} className="flex items-center gap-2 text-sm text-charcoal cursor-pointer">
                <input type="radio" name="contactPreference" value={opt} defaultChecked={i === 2} className="accent-gold w-4 h-4" />
                {opt}
              </label>
            ))}
          </div>
        </div>
      </fieldset>

      {/* STEP 2 — YOUR TRIP */}
      <fieldset className="space-y-5 pt-6 border-t border-sand">
        <legend className="text-[11px] uppercase tracking-wider text-gold font-500 mb-4">Step 2 — Your trip</legend>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="dates" className="block text-sm font-500 text-charcoal mb-1.5">When are you planning to travel? <span className="text-gold">*</span></label>
            <input id="dates" name="dates" type="text" required defaultValue={wizardWhen} placeholder="e.g. October 2026, or 15–28 November" className="w-full px-4 py-3 border border-sand rounded-sm bg-ivory text-charcoal placeholder-warmgrey/50 focus:outline-none focus:border-gold text-sm" />
          </div>
          <div>
            <label htmlFor="flexibility" className="block text-sm font-500 text-charcoal mb-1.5">How flexible are those dates?</label>
            <select id="flexibility" name="flexibility" className="w-full px-4 py-3 border border-sand rounded-sm bg-ivory text-charcoal focus:outline-none focus:border-gold text-sm">
              <option value="">Select</option>
              <option>Fixed — these exact dates</option>
              <option>Flexible by a few days</option>
              <option>Flexible by a few weeks</option>
              <option>Fully flexible</option>
            </select>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="duration" className="block text-sm font-500 text-charcoal mb-1.5">Trip duration <span className="text-gold">*</span></label>
            <select id="duration" name="duration" required defaultValue={journeyDuration || wizardDuration || ''} className="w-full px-4 py-3 border border-sand rounded-sm bg-ivory text-charcoal focus:outline-none focus:border-gold text-sm">
              <option value="">Select trip length</option>
              <option>1–3 days</option>
              <option>4–7 days</option>
              <option>8–12 days</option>
              <option>13–18 days</option>
              <option>19+ days</option>
              {journeyDuration && <option value={journeyDuration}>{journeyDuration} (as shown)</option>}
              <option>Not sure yet</option>
            </select>
          </div>
          <div>
            <label htmlFor="travelers" className="block text-sm font-500 text-charcoal mb-1.5">Number of travelers</label>
            <input id="travelers" name="travelers" type="text" defaultValue={wizardParty} placeholder="e.g. 2 adults, or 2 adults + 1 child (age 10)" className="w-full px-4 py-3 border border-sand rounded-sm bg-ivory text-charcoal placeholder-warmgrey/50 focus:outline-none focus:border-gold text-sm" />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="accommodation" className="block text-sm font-500 text-charcoal mb-1.5">Accommodation preference</label>
            <select id="accommodation" name="accommodation" defaultValue={wizardComfort || ''} className="w-full px-4 py-3 border border-sand rounded-sm bg-ivory text-charcoal focus:outline-none focus:border-gold text-sm">
              <option value="">Select</option>
              <option>Comfortable</option>
              <option>Boutique</option>
              <option>Luxury</option>
              <option>No Compromise</option>
              <option>Prefer to discuss</option>
            </select>
          </div>
          <div>
            <label htmlFor="planningLevel" className="block text-sm font-500 text-charcoal mb-1.5">Preferred planning level</label>
            <select id="planningLevel" name="planningLevel" className="w-full px-4 py-3 border border-sand rounded-sm bg-ivory text-charcoal focus:outline-none focus:border-gold text-sm">
              <option value="">Select</option>
              <option>Comfort-focused</option>
              <option>Premium private journey</option>
              <option>Best available accommodation</option>
              <option>Expedition logistics priority</option>
              <option>Specialist photography / birding / cultural journey</option>
              <option>I am flexible and want advice</option>
              <option>I prefer to discuss privately</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="budgetGuidance" className="block text-sm font-500 text-charcoal mb-1.5">Budget guidance</label>
          <select id="budgetGuidance" name="budgetGuidance" className="w-full px-4 py-3 border border-sand rounded-sm bg-ivory text-charcoal focus:outline-none focus:border-gold text-sm">
            <option value="">Select</option>
            <option>I would like the most cost-efficient private option</option>
            <option>I prefer a balanced comfort/value proposal</option>
            <option>I want the best available experience where possible</option>
            <option>I am planning a specialist expedition and understand logistics may drive cost</option>
            <option>I am not sure yet</option>
          </select>
        </div>

        <div>
          <label htmlFor="fitness" className="block text-sm font-500 text-charcoal mb-1.5">Fitness / activity level</label>
          <select id="fitness" name="fitness" className="w-full px-4 py-3 border border-sand rounded-sm bg-ivory text-charcoal focus:outline-none focus:border-gold text-sm">
            <option value="">Select</option>
            <option>Easy — minimal walking</option>
            <option>Moderate — some walking and altitude</option>
            <option>Challenging — trekking, early starts, rough roads</option>
            <option>Mixed — depends on the day</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-500 text-charcoal mb-2">Main interests (select all that apply)</label>
          <div className="grid grid-cols-2 gap-2">
            {INTERESTS.map(interest => (
              <label key={interest} className="flex items-center gap-2 text-sm text-charcoal cursor-pointer">
                <input type="checkbox" name="interests" value={interest} defaultChecked={wizardInterests.includes(interest)} className="accent-gold w-4 h-4" />
                {interest}
              </label>
            ))}
          </div>
        </div>
      </fieldset>

      {/* STEP 3 — A FEW EXTRAS (optional) */}
      <fieldset className="space-y-5 pt-6 border-t border-sand">
        <legend className="text-[11px] uppercase tracking-wider text-gold font-500 mb-4">Step 3 — A few extras (optional but helpful)</legend>

        <div>
          <label htmlFor="specialNeeds" className="block text-sm font-500 text-charcoal mb-1.5">Any special needs or considerations?</label>
          <input id="specialNeeds" name="specialNeeds" type="text" placeholder="Mobility, dietary, medical, or other considerations we should plan around" className="w-full px-4 py-3 border border-sand rounded-sm bg-ivory text-charcoal placeholder-warmgrey/50 focus:outline-none focus:border-gold text-sm" />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-500 text-charcoal mb-1.5">Anything else we should know?</label>
          <textarea id="message" name="message" rows={5} placeholder="Tell us about your Ethiopia trip idea — destinations, special interests, or anything that matters for planning." className="w-full px-4 py-3 border border-sand rounded-sm bg-ivory text-charcoal placeholder-warmgrey/50 focus:outline-none focus:border-gold text-sm resize-none" />
        </div>

        <div>
          <label htmlFor="source" className="block text-sm font-500 text-charcoal mb-1.5">How did you find us?</label>
          <select id="source" name="source" className="w-full px-4 py-3 border border-sand rounded-sm bg-ivory text-charcoal focus:outline-none focus:border-gold text-sm">
            <option value="">Select</option>
            <option>Google search</option>
            <option>AI search (ChatGPT, Gemini, Perplexity)</option>
            <option>Referral from friend or past guest</option>
            <option>Social media</option>
            <option>Travel article or blog</option>
            <option>Previous guest returning</option>
            <option>Other</option>
          </select>
        </div>
      </fieldset>

      {/* Error message */}
      {status === 'error' && error && (
        <div className="border border-red-200 bg-red-50 rounded-sm px-4 py-3 text-sm text-red-700" role="alert">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="btn-primary w-full justify-center text-[13px] py-4 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'submitting' ? 'Sending…' : 'Send My Enquiry →'}
      </button>
      <p className="text-xs text-warmgrey text-center">No pressure. No generic package. Just a careful first conversation with an Ethiopia-based travel team.</p>
    </form>
  )
}
