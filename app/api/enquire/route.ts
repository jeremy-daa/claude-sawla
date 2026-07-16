import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

// ── Configuration ─────────────────────────────────────────────────────────────
// Set these in your hosting environment (Vercel / Netlify / etc.):
//   RESEND_API_KEY   — from https://resend.com/api-keys
//   ENQUIRY_TO       — inbox that receives enquiries (defaults to explore@sawlatours.com)
//   ENQUIRY_FROM     — verified sender on your Resend domain
//                      (defaults to "Sawla Tours <enquiries@sawlatours.com>")
// Until RESEND_API_KEY is set, the route validates and logs submissions but does
// not send email — so the form works in development without breaking.

const TO_ADDRESS   = process.env.ENQUIRY_TO   ?? 'explore@sawlatours.com'
const FROM_ADDRESS = process.env.ENQUIRY_FROM ?? 'Sawla Tours <enquiries@sawlatours.com>'

// ── Best-effort rate limiting ──────────────────────────────────────────────────
// In-memory per-IP window: max 5 submissions per 10 minutes. On serverless hosts
// this is per-instance (not a hard global guarantee), but it still stops the
// common case — a single client hammering the endpoint — at zero infra cost.
const RATE_WINDOW_MS = 10 * 60 * 1000
const RATE_MAX = 5
const rateBuckets = new Map<string, number[]>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const hits = (rateBuckets.get(ip) ?? []).filter(t => now - t < RATE_WINDOW_MS)
  hits.push(now)
  rateBuckets.set(ip, hits)
  // Opportunistic cleanup so the map can't grow unbounded
  if (rateBuckets.size > 5000) {
    for (const [k, v] of rateBuckets) if (v.every(t => now - t >= RATE_WINDOW_MS)) rateBuckets.delete(k)
  }
  return hits.length > RATE_MAX
}

// Simple internal triage signal, derived only from what the traveler chose.
// Shown as a tag in the notification subject so high-intent enquiries surface first.
function leadPriority(f: { duration: string; accommodation: string; planningLevel: string; interests: string }): string | null {
  const long = /13–18|19\+/.test(f.duration)
  const high = /Luxury|No Compromise/i.test(f.accommodation) || /Premium|Best available/i.test(f.planningLevel)
  const specialist = /photograph|film|birding|specialist/i.test(f.planningLevel + ' ' + f.interests)
  if ((long && high) || (high && specialist)) return 'PRIORITY'
  if (long || high || specialist) return 'High interest'
  return null
}

interface EnquiryFields {
  name: string
  email: string
  whatsapp: string
  contactPreference: string
  dates: string
  flexibility: string
  duration: string
  travelers: string
  accommodation: string
  planningLevel: string
  budgetGuidance: string
  fitness: string
  interests: string
  specialNeeds: string
  message: string
  source: string
  // Journey-aware context, carried silently from an itinerary page's enquiry link
  journeySlug: string
  journeyName: string
  travelStyle: string
  journeyDuration: string
  operatingStatus: string
  _honey: string
}

function clean(value: unknown): string {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, 2000).replace(/[<>]/g, '')
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/**
 * Accepts both JSON (from the client form fetch) and FormData (native fallback),
 * so the form works even if JavaScript is disabled.
 */
async function readBody(req: NextRequest): Promise<Record<string, string>> {
  const contentType = req.headers.get('content-type') ?? ''
  if (contentType.includes('application/json')) {
    const json = await req.json().catch(() => ({}))
    return json as Record<string, string>
  }
  // form-encoded or multipart
  const form = await req.formData().catch(() => null)
  if (!form) return {}
  const out: Record<string, string> = {}
  for (const [key, val] of form.entries()) {
    if (typeof val === 'string') {
      // checkboxes (interests) can repeat — join them
      out[key] = out[key] ? `${out[key]}, ${val}` : val
    }
  }
  return out
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many enquiries in a short time. Please wait a few minutes and try again, or email us at explore@sawlatours.com' },
        { status: 429 }
      )
    }

    const raw = await readBody(req)

    // Honeypot — bots fill hidden fields; humans never see this one
    if (clean(raw._honey)) {
      // Pretend success so bots get no signal
      return NextResponse.json({ success: true, message: 'Thank you.' }, { status: 200 })
    }

    const f: EnquiryFields = {
      name:              clean(raw.name),
      email:             clean(raw.email),
      whatsapp:          clean(raw.whatsapp),
      contactPreference: clean(raw.contactPreference),
      dates:             clean(raw.dates),
      flexibility:       clean(raw.flexibility),
      duration:          clean(raw.duration),
      travelers:         clean(raw.travelers),
      accommodation:     clean(raw.accommodation),
      planningLevel:     clean(raw.planningLevel),
      budgetGuidance:    clean(raw.budgetGuidance),
      fitness:           clean(raw.fitness),
      interests:         clean(raw.interests),
      specialNeeds:      clean(raw.specialNeeds),
      message:           clean(raw.message),
      source:            clean(raw.source),
      journeySlug:       clean(raw.journeySlug),
      journeyName:       clean(raw.journeyName),
      travelStyle:       clean(raw.travelStyle),
      journeyDuration:   clean(raw.journeyDuration),
      operatingStatus:   clean(raw.operatingStatus),
      _honey:            '',
    }

    // Validation — enforce server-side everything the UI marks as required,
    // so a direct API submission can't skip fields the form insists on.
    if (!f.name || f.name.length < 2)
      return NextResponse.json({ error: 'Please provide your name.' }, { status: 400 })
    if (!f.email || !isValidEmail(f.email))
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 })
    if (!f.whatsapp || f.whatsapp.replace(/[^\d]/g, '').length < 7)
      return NextResponse.json({ error: 'Please provide a WhatsApp or phone number, including country code.' }, { status: 400 })
    if (!f.dates || f.dates.length < 3)
      return NextResponse.json({ error: 'Please tell us roughly when you plan to travel.' }, { status: 400 })
    if (!f.duration)
      return NextResponse.json({ error: 'Please select a trip duration.' }, { status: 400 })

    const messageText = f.message || '(No additional message — see the trip details above.)'

    const submittedAt = new Date().toISOString()

    // Journey context — shown first and separately, so a specialist can triage in one glance.
    const allJourneyRows: [string, string][] = [
      ['Journey', f.journeyName],
      ['Travel style', f.travelStyle],
      ['Journey duration', f.journeyDuration],
      ['Operating status', f.operatingStatus],
    ]
    const journeyRows = allJourneyRows.filter(([, v]) => v)

    // Build a clean, readable email
    const allRows: [string, string][] = [
      ['Name', f.name],
      ['Email', f.email],
      ['WhatsApp / Phone', f.whatsapp],
      ['Preferred contact method', f.contactPreference],
      ['Travel dates', f.dates],
      ['Date flexibility', f.flexibility],
      ['Duration', f.duration],
      ['Travelers', f.travelers],
      ['Accommodation preference', f.accommodation],
      ['Preferred planning level', f.planningLevel],
      ['Budget guidance', f.budgetGuidance],
      ['Fitness / activity level', f.fitness],
      ['Interests', f.interests],
      ['Special needs', f.specialNeeds],
      ['Heard about us via', f.source],
    ]
    const rows = allRows.filter(([, v]) => v)

    const textBody =
      `New enquiry from sawlatours.com\n` +
      `Submitted: ${submittedAt}\n\n` +
      (journeyRows.length ? `JOURNEY\n` + journeyRows.map(([k, v]) => `${k}: ${v}`).join('\n') + `\n\n` : '') +
      rows.map(([k, v]) => `${k}: ${v}`).join('\n') +
      `\n\nMessage:\n${messageText}\n`

    const journeyBlockHtml = journeyRows.length
      ? `<div style="background:#2a2724;color:#f5efe3;padding:14px 18px;border-radius:6px;margin-bottom:16px">` +
        `<div style="color:#c9941a;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px">Enquiring About</div>` +
        journeyRows.map(([k, v]) =>
          `<div style="font-size:13px;margin-top:2px"><span style="opacity:0.65">${escapeHtml(k)}:</span> <strong>${escapeHtml(v)}</strong></div>`
        ).join('') +
        `</div>`
      : ''

    const htmlBody =
      `<div style="font-family:system-ui,sans-serif;max-width:600px">` +
      `<h2 style="color:#2a2724;border-bottom:2px solid #c9941a;padding-bottom:8px">New Ethiopia Journey Enquiry</h2>` +
      journeyBlockHtml +
      `<table style="width:100%;border-collapse:collapse;margin:16px 0">` +
      rows.map(([k, v]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#5c5a54;font-size:13px;vertical-align:top;white-space:nowrap">${escapeHtml(k)}</td>` +
        `<td style="padding:6px 0;color:#2a2724;font-size:14px;font-weight:500">${escapeHtml(v)}</td></tr>`
      ).join('') +
      `</table>` +
      `<div style="background:#f7f0e3;border-left:3px solid #c9941a;padding:12px 16px;margin:16px 0">` +
      `<div style="color:#5c5a54;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:6px">Message</div>` +
      `<div style="color:#2a2724;font-size:14px;line-height:1.6;white-space:pre-wrap">${escapeHtml(messageText)}</div>` +
      `</div>` +
      `<p style="color:#8a8780;font-size:11px;margin-top:24px">Submitted ${submittedAt} · sawlatours.com/enquire</p>` +
      `</div>`

    // Subject is built from user-supplied fields — strip line breaks so a submission
    // can never smuggle extra header-like lines into the outgoing email subject.
    const subjectSafe = (s: string) => s.replace(/[\r\n]+/g, ' ')

    // ── Send via Resend (only if configured) ──
    const apiKey = process.env.RESEND_API_KEY
    if (apiKey) {
      const resend = new Resend(apiKey)
      const priority = leadPriority(f)
      const { error } = await resend.emails.send({
        from: FROM_ADDRESS,
        to: TO_ADDRESS,
        replyTo: f.email,
        subject: subjectSafe(`${priority ? `[${priority}] ` : ''}New Ethiopia enquiry — ${f.name}${f.journeyName ? ` — ${f.journeyName}` : ''}${f.dates ? ` (${f.dates})` : ''}`),
        text: textBody,
        html: htmlBody,
      })
      if (error) {
        console.error('[Sawla Tours Enquiry] Resend error:', error)
        return NextResponse.json(
          { error: 'We could not send your message just now. Please email us directly at explore@sawlatours.com' },
          { status: 502 }
        )
      }

      // Guest auto-confirmation — the premium concierge acknowledgement. A failure
      // here must never fail the enquiry itself, so it is fire-and-forget.
      try {
        await resend.emails.send({
          from: FROM_ADDRESS,
          to: f.email,
          subject: subjectSafe(`We've received your enquiry${f.journeyName ? ` about ${f.journeyName}` : ''} — Sawla Tours`),
          text:
            `Dear ${f.name},\n\n` +
            `Thank you for your enquiry${f.journeyName ? ` about ${f.journeyName}` : ''}. ` +
            `An Ethiopia specialist from our Addis Ababa team is reviewing your details and will reply within 24 hours on business days (EAT, UTC+3).\n\n` +
            `What happens next:\n` +
            `1. A specialist reviews your dates, interests and pace.\n` +
            `2. We may ask one or two follow-up questions.\n` +
            `3. You receive a tailored route proposal — free, with no obligation.\n\n` +
            `If anything changes in the meantime, simply reply to this email or message us on WhatsApp: ${'+251 705 783 06'}.\n\n` +
            `Warm regards,\n` +
            `Sawla Tours — Addis Ababa, Ethiopia\n` +
            `explore@sawlatours.com · www.sawlatours.com`,
        })
      } catch (confirmErr) {
        console.error('[Sawla Tours Enquiry] Guest confirmation failed (enquiry itself succeeded):', confirmErr)
      }
    } else {
      // Not yet configured — log so nothing is lost in development / pre-launch
      console.warn('[Sawla Tours Enquiry] RESEND_API_KEY not set — enquiry logged but not emailed.')
      console.log('[Sawla Tours Enquiry]', { ...f, _honey: undefined, submittedAt })
    }

    return NextResponse.json(
      { success: true, message: 'Thank you — we will be in touch within 24 hours.' },
      { status: 200 }
    )
  } catch (err) {
    console.error('[Sawla Tours Enquiry] Unexpected error:', err)
    return NextResponse.json(
      { error: 'Something went wrong. Please email us directly at explore@sawlatours.com' },
      { status: 500 }
    )
  }
}
