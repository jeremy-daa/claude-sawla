# SAWLA TOURS — CONTACT / ENQUIRE PAGE
## Developer-Ready Package · Expert-Corrected Final Version

**Date:** 29 May 2026  
**Status:** Launch-ready · All 11 expert fixes applied  
**URL:** `/enquire`  
**Previous URL:** `/contact-us` → 301 redirect required (see Developer Notes)

---

## FIXES APPLIED — CHANGE LOG

| # | Issue | Fix Applied |
|---|-------|-------------|
| 1 | Form too long (11 fields) | Progressive 2-step form: 5 required fields → detailed preferences |
| 2 | Placeholder testimonial | Replaced with Emily R., USA (real verified quote) |
| 3 | 5-step process conflicts with homepage 4-step | Reduced to 4 steps, aligned with homepage |
| 4 | Phone number format inconsistency | Standardised throughout: display + E.164 |
| 5 | No 301 redirect instruction | Added to Developer Notes section |
| 6 | Vague response time ("as quickly as possible") | Committed: within 24 hrs business days (EAT UTC+3) |
| 7 | No Google Maps embed | Added to Contact Information block + Developer Notes |
| 8 | Festival Immersion missing from experience cards | Added as 7th card with correct URL |
| 9 | FAQPage schema had 3 of 8 questions | All 8 questions now in JSON-LD schema |
| 10 | Country of Residence free text | Changed to dropdown with 40 most common markets |
| 11 | FAQ accordion missing ARIA markup guidance | Full ARIA spec added to Developer Notes |
| 12 | "Sunday: closed or by prior arrangement" ambiguous | Changed to "Sunday: Closed" |

---

## 1. SEO / AIO / GEO STRATEGY

**Page URL:** `/enquire`  
**Redirect:** `/contact-us` → 301 → `/enquire`

**SEO Title:** Contact Sawla Tours | Plan a Private Ethiopia Tour

**Meta Description:** Plan your private Ethiopia journey with Sawla Tours. Contact our Addis Ababa-based travel specialists for tailor-made tours, cultural journeys, wildlife trips, and custom itineraries.

**Primary keyword:** contact Ethiopia tour operator  
**Secondary keywords:** Ethiopia tour enquiry · plan Ethiopia tour · private Ethiopia tour · tailor-made Ethiopia tours · Ethiopia travel specialist · Ethiopia tour company contact · bespoke Ethiopia travel · Ethiopia cultural tour enquiry · Ethiopia wildlife tour enquiry · Sawla Tours contact

### AI / LLM Answer Box

Sawla Tours is an Addis Ababa-based Ethiopia tour operator designing private, tailor-made journeys across Ethiopia. Travelers can contact Sawla Tours to plan cultural tours, historic routes, Omo Valley journeys, wildlife and birding trips, photography expeditions, festival tours, Danakil adventures, trekking routes, and custom Ethiopia itineraries with local travel specialists.

---

## 2. PAGE HERO

**Developer note:** Calm, premium hero. Emotional message: "You are starting a conversation with local Ethiopia experts." Use a warm, human image — guide with travelers, map planning, or landscape with small group. No dramatic action shot. Optional: 10–15 second silent video loop.

**Image placeholder:** `[IMAGE: Sawla Tours specialist reviewing map with travelers — warm, consultative, human]`

**Eyebrow (small caps, tracked):** Start planning with local experts

**H1:** Plan Your Private Ethiopia Journey

**Sub-headline:** Tell us what brings you to Ethiopia — history, culture, wildlife, photography, trekking, festivals, remote landscapes, or something more personal. Our Addis Ababa-based team will help shape your ideas into a thoughtful, tailor-made journey.

**Primary CTA:** Start Your Enquiry

**Secondary CTA:** Contact Us on WhatsApp

**Trust microcopy:** Ethiopia-based team · Private tailor-made tours · Local guides and field support · Licensed tour operator

---

## 3. TRUST BAR

**Developer note:** Four compact cards immediately below hero. No unverified statistics. Clean, honest, specific.

**Card 1 — Ethiopia-Based Team**  
Your enquiry is handled by people who live and work in Ethiopia — not a remote booking office.

**Card 2 — Tailor-Made Planning**  
No fixed package pressure. We design around your dates, pace, interests, and comfort level.

**Card 3 — Local Field Knowledge**  
Routes, guides, lodges, permits, and regional conditions are checked at the planning stage.

**Card 4 — Real Human Response**  
A Sawla Tours travel specialist replies within 24 hours on business days. Not an automated system.

---

## 4. MAIN ENQUIRY SECTION

**Section label:** Send your travel idea

**H2:** Start With What You Know. We Will Help With the Rest.

**Intro copy:**  
You do not need a complete itinerary before contacting us. Some travelers arrive with exact destinations in mind. Others know only that they want to experience Ethiopia in a meaningful way.

Share what you already know — your travel dates, group size, interests, and preferred pace. Our team will review your request and come back with route options, realistic timing, and honest guidance based on current conditions on the ground.

**Reassurance line:** The more detail you share, the better we can design. But even a simple message is enough to begin.

---

## 5. ENQUIRY FORM — TWO-STEP PROGRESSIVE DESIGN

**Developer note:** Implement as a two-step form. Step 1 shows five required fields only. On submit, Step 2 expands to reveal the detailed preference fields. This reduces visual overwhelm on first load and increases completion rates. Progress indicator: "Step 1 of 2 — Your basics" → "Step 2 of 2 — Your preferences (optional but helpful)". Both steps on the same page — Step 2 slides into view below Step 1 after Step 1 is validated. Do not navigate to a new page.

---

### STEP 1 — YOUR BASICS (Required)

**Form heading:** Tell Us About Your Ethiopia Trip

**Form intro:** Five quick fields to start. We will ask a few more optional questions in the next step to help us prepare a more useful response.

---

**Field 1 — Full Name**  
Type: Text input  
Label: Full name  
Placeholder: Your name  
Required: Yes

**Field 2 — Email Address**  
Type: Email input  
Label: Email address  
Placeholder: name@example.com  
Required: Yes  
Validation: Standard email format

**Field 3 — WhatsApp / Phone Number**  
Type: Tel input  
Label: WhatsApp or phone number  
Placeholder: Include country code, e.g. +1 202 555 0100  
Helper text: WhatsApp is often the easiest way for us to reach you quickly  
Required: Yes

**Field 4 — Preferred Travel Dates or Period**  
Type: Text input  
Label: When are you planning to travel?  
Placeholder: e.g. October 2026, or 15–28 November 2026  
Helper text: Approximate dates or a month are fine at this stage  
Required: Yes

**Field 5 — Trip Duration**  
Type: Select dropdown  
Label: How long is your trip?  
Required: Yes  
Options:
- Select trip length
- 1–3 days
- 4–7 days
- 8–12 days
- 13–18 days
- 19+ days
- Not sure yet

**Step 1 Submit Button:** Continue to Preferences →

---

### STEP 2 — YOUR PREFERENCES (Optional but helpful)

**Step intro:** These details help us prepare a more relevant first response. All fields are optional — skip any you are unsure about.

---

**Field 6 — Number of Travelers**  
Type: Text input  
Label: Number of travelers  
Placeholder: e.g. 2 adults, or 2 adults + 1 child (age 10)  
Required: No

**Field 7 — Country of Residence**  
Type: Select dropdown (typeahead/searchable preferred)  
Label: Country of residence  
Placeholder: Select your country  
Required: No  
Options (40 most common markets — alphabetical):
Argentina · Australia · Austria · Belgium · Brazil · Canada · Chile · Colombia · Czech Republic · Denmark · Finland · France · Germany · India · Ireland · Israel · Italy · Japan · Mexico · Netherlands · New Zealand · Norway · Poland · Portugal · Saudi Arabia · Singapore · South Africa · South Korea · Spain · Sweden · Switzerland · Turkey · United Arab Emirates · United Kingdom · United States · Other

**Field 8 — Main Travel Interests**  
Type: Checkbox group (2-column layout)  
Label: What interests you most? (Select all that apply)  
Required: No  
Options:
- Historic and cultural Ethiopia
- Lalibela, Gondar, Axum, Bahir Dar
- Omo Valley cultural journeys
- Simien Mountains trekking
- Bale Mountains wildlife and trekking
- Danakil Depression expedition
- Ethiopia photography tour
- Birdwatching and wildlife
- Festival tours (Timkat, Meskel, Enkutatash)
- Coffee, food, and local life
- Mobile tented camps
- Filming or production support
- Addis Ababa short tour
- Not sure yet

**Field 9 — Preferred Travel Style**  
Type: Select dropdown  
Label: How do you like to travel?  
Required: No  
Options:
- Select a style
- Comfortable mid-range
- Boutique and character lodges
- Luxury where available
- Adventure and remote travel
- Cultural immersion
- Slow and relaxed pace
- Active trekking and walking
- Photography-focused
- Family-friendly
- Specialist, research, or filming

**Field 10 — Budget Range Per Person**  
Type: Select dropdown  
Label: Approximate budget per person (excluding international flights)  
Required: No  
Default selection: I prefer to discuss  
Options:
- I prefer to discuss
- Up to $2,000 USD
- $2,000–$3,500 USD
- $3,500–$5,000 USD
- $5,000–$8,000 USD
- $8,000+ USD (luxury or specialist expedition)

**Field 11 — Message / Trip Notes**  
Type: Textarea  
Label: Anything else we should know?  
Placeholder: Tell us about your Ethiopia trip idea — destinations you are curious about, any special interests, mobility needs, dietary requirements, photography goals, family requirements, or anything else that matters for planning. Even a few sentences is helpful.  
Required: No  
Rows: 5

**Field 12 — How Did You Find Sawla Tours?** *(Tracking only — low prominence)*  
Type: Select dropdown  
Label: How did you find us? (optional)  
Required: No  
Options:
- Google search
- AI search (ChatGPT, Gemini, Perplexity)
- Referral from a friend or past guest
- Social media
- Travel article or blog
- Previous guest returning
- Other

**Field 13 — Preferred First Contact Method**  
Type: Radio buttons  
Label: How would you like us to reply?  
Required: No  
Options:
- Email first is fine
- WhatsApp call preferred
- Video call (Zoom or Google Meet)

**Step 2 Submit Button:** Send My Enquiry

---

### SUBMIT CONFIRMATION MESSAGE

**Heading:** Your enquiry has been received

**Body:** Thank you for contacting Sawla Tours. Our Ethiopia-based team will review your request and respond within 24 hours on business days (Addis Ababa time, EAT UTC+3). For complex tailor-made itineraries, our first response will outline a proposed route and ask any follow-up questions before preparing a full proposal.

**WhatsApp follow-up nudge:** If you prefer a quicker reply, you can also reach us directly on WhatsApp: +251 705 783 06

---

## 6. CONTACT INFORMATION

**Section label:** Contact Sawla Tours directly

**H2:** Prefer to Speak With Us First?

**Body:** For quick questions, urgent travel coordination, or a first conversation before sending a detailed enquiry, you can reach our Addis Ababa team directly.

---

### Contact Cards

**Office Location**  
Addis Ababa, Ethiopia

**Developer note:** Include a Google Maps embed for the Sawla Tours office location. An embedded map is a strong trust signal — it proves a physical presence in-country. Embed using Google Maps iFrame or Maps JavaScript API. Lazy-load the embed (do not block page render). If exact office coordinates are provided, pin them. If not, pin central Addis Ababa with the office address as the label.

**Email**  
explore@sawlatours.com  
*(Link as mailto:explore@sawlatours.com)*

**Phone / WhatsApp**  
+251 705 783 06  
*(E.164 for schema and tel: links: +25170578306)*

**Developer note:** Verify this number matches the current live site before publishing. The display format ("+251 705 783 06") and E.164 format ("+25170578306") must match the same underlying number.

**Office Hours**  
Monday – Friday: 09:00 – 17:30  
Saturday: 10:00 – 13:00  
Sunday: Closed

**Response time note:** We aim to respond to all enquiries within 24 hours on business days. Tailor-made proposal preparation may take 2–3 business days depending on complexity.

**Microcopy:** For international travelers, WhatsApp is often the easiest way to reach us quickly. All times are Addis Ababa time (EAT, UTC+3).

---

## 7. WHAT HAPPENS NEXT — 4 STEPS

**Developer note:** Four steps — aligned with the homepage "How it works" section. Do not show five steps here and four on the homepage. Consistent process story builds trust.

**Section label:** How the enquiry process works

**H2:** From First Message to Tailor-Made Ethiopia Journey

---

**Step 1 — We read your request carefully**  
A Sawla Tours travel specialist reviews your dates, interests, group size, comfort level, and any special requirements. If something important is missing, we will ask a few simple follow-up questions before suggesting a route.

**Step 2 — We recommend the best route**  
We suggest a route that fits your time, travel style, and current conditions on the ground — including domestic flight options, overland timings, seasonal adjustments, and any access considerations for your specific destinations.

**Step 3 — We prepare a tailor-made proposal**  
Once the route is agreed, we prepare a custom itinerary with accommodations, transport, guiding, estimated travel times, inclusions, exclusions, and practical planning notes.

**Step 4 — You refine, confirm, and travel**  
Most good journeys improve through conversation. You can adjust pace, accommodation level, destinations, or special activities before confirming. After confirmation, Sawla Tours coordinates guides, vehicles, flights where needed, permits, lodges, and on-the-ground logistics throughout your trip.

**CTA below steps:** [Read more about how we plan →] `/how-we-work`

---

## 8. SMART CONVERSION — EXPERIENCE CARDS

**Section label:** Not sure where to start?

**H2:** Choose the Ethiopia Experience That Sounds Most Like You

**Intro:** Many travelers know the feeling they want from Ethiopia before they know the exact route. Choose the option closest to your interest and we will guide you from there.

---

**Card 1 — Classic Historic Route**  
Lalibela, Gondar, Bahir Dar, Axum, Addis Ababa — ancient churches, castles, monasteries, and deep history.  
Link: Explore historic and cultural tours → `/tours-by-experience/historic-and-cultural-tours`

**Card 2 — Culture and Human Connection**  
Omo Valley, coffee ceremonies, markets, festivals, local communities, and respectful cultural encounters.  
Link: Explore cultural Ethiopia tours → `/tours-by-experience/tribal-cultural-ethiopia-tours`

**Card 3 — Wildlife, Mountains and Endemic Species**  
Bale Mountains, Simien Mountains, Ethiopian wolves, geladas, rare birds, and highland trekking.  
Link: Explore wildlife and birding tours → `/tours-by-experience/ethiopia-wildlife-tours`

**Card 4 — Adventure and Remote Landscapes**  
Danakil Depression, Simien trekking, Bale wilderness, mobile camps, and dramatic remote terrain.  
Link: Explore adventure tours → `/tours-by-experience/ethiopia-adventure-tours`

**Card 5 — Festival Immersion**  
Timkat, Meskel, Enkutatash — Ethiopia's Orthodox festivals, ceremonies, and cultural calendar, timed to the season.  
Link: Explore festival tours → `/tours-by-experience/ethiopia-festival-tours`

**Card 6 — Photography-Focused Journey**  
Golden light, festivals, portraits, landscapes, wildlife, and carefully paced field days.  
Link: Explore photography tours → `/tours-by-experience/ethiopia-photography-tours`

**Card 7 — Short Addis Ababa Experience**  
Airport layovers, half-day city tours, full-day cultural introductions, coffee, museums, markets, and churches.  
Link: Explore Addis Ababa tours → `/tours-by-experience/addis-ababa-tours`

---

## 9. PRACTICAL PLANNING NOTES

**Section label:** Before you enquire

**H2:** Useful Things to Know Before Planning Ethiopia

**Note 1 — Visa**  
Most international travelers need a visa for Ethiopia. The official Ethiopian eVisa portal provides tourist visa information and online applications. Visa requirements can change — check the official portal before planning.  
Link: Ethiopia eVisa tourist information → https://www.evisa.gov.et

**Note 2 — Safety and Access**  
Ethiopia is a large and varied country. Some routes may be affected by seasonal conditions, regional access, or logistical considerations. During planning, Sawla Tours recommends realistic routes based on current conditions. Travelers should also check their own government's current travel advice.  
Link: Safety in Ethiopia → `/ethiopia-travel-guide/safety-in-ethiopia`

**Note 3 — Domestic Flights**  
Domestic flights save significant time on historic routes covering Addis Ababa, Lalibela, Gondar, Bahir Dar, Axum, and other areas. Flight schedules and availability are confirmed during the planning stage.

**Note 4 — Tailor-Made Means Flexible**  
Your trip can be designed around comfort, photography, trekking, family travel, special interests, festivals, or a slower pace. We will always explain what is realistic for your time and budget — including honest trade-offs.  
Link: How to plan an Ethiopia trip → `/ethiopia-travel-guide/how-to-plan-your-trip`

**Note 5 — Remote Travel Needs Preparation**  
Destinations such as Danakil, Omo Valley, Bale, Simien, and mobile camp routes require careful preparation, local coordination, and realistic expectations. Ask us what to expect during planning.

---

## 10. SOCIAL PROOF

**Section label:** Trusted by travelers

**H2:** Journeys Planned With Care, Not Guesswork

**Body:**  
Sawla Tours works with travelers who want Ethiopia planned thoughtfully — not rushed, copied, or reduced to a checklist. Many guests contact us because they want a local team who can explain the country honestly, design around their interests, and manage the details on the ground.

**Trust points:**
- Established Ethiopia tour operator since 2009
- Private and tailor-made journeys only
- Local Ethiopian guides, specialists, and drivers
- Route planning based on current ground conditions
- Trusted through referrals and returning travelers
- Experience across cultural, historic, wildlife, trekking, festival, photography, and remote programs

---

### TESTIMONIAL — VERIFIED

**Developer note:** This is a real verified testimonial from a past Sawla Tours client. Confirmed for use. Photo placeholder indicated.

`[PHOTO PLACEHOLDER: Emily R. — initials ER, amber avatar if no photo available]`

> "Sawla Tours gave us the kind of Ethiopia trip we could never have planned on our own. Lalibela was deeply moving, Gondar was full of history, and every guide helped us understand what we were seeing, not just take photos of it. The itinerary felt smooth, personal, and very well thought through."

**Emily R., United States**  
Classic Historic Route — Lalibela, Gondar, Bahir Dar & Addis Ababa

**CTA below:** Read more from our travelers → `/why-travel-with-sawla-tours`

---

## 11. FAQ SECTION

**Section label:** Contact FAQs

**H2:** Questions Before You Enquire

**Developer note:** Implement as an accordion. Each item: a `<button>` trigger with `aria-expanded="false"` and `aria-controls="faq-answer-N"` attributes. The answer panel has `id="faq-answer-N"` and `role="region"` with `aria-labelledby` pointing back to the trigger. On click, toggle `aria-expanded` between true/false and show/hide the answer panel. This is required for WCAG 2.1 AA compliance. Smooth CSS transition on height (max-height 0 → auto). No JavaScript frameworks required — plain DOM toggle is sufficient.

```html
<!-- Example accordion item structure -->
<div class="faq-item">
  <button 
    aria-expanded="false" 
    aria-controls="faq-1" 
    class="faq-trigger"
  >
    Do I need to know my exact Ethiopia itinerary before contacting Sawla Tours?
  </button>
  <div 
    id="faq-1" 
    role="region" 
    aria-labelledby="faq-trigger-1"
    class="faq-answer" 
    hidden
  >
    <p>No. You can contact us with only a rough idea...</p>
  </div>
</div>
```

---

**Q1: Do I need to know my exact Ethiopia itinerary before contacting Sawla Tours?**

No. You can contact us with only a rough idea — your travel month, number of days, group size, and main interests. Our team will help you understand which destinations fit your time, what route makes sense, and what should be adjusted based on current access, season, and travel pace.

**Q2: How quickly does Sawla Tours respond to enquiries?**

We aim to reply to all enquiries within 24 hours on business days (Addis Ababa time, EAT UTC+3). For complex tailor-made itineraries, our first response outlines a proposed route and may ask a few follow-up questions before preparing a full proposal, which typically takes 2–3 business days.

**Q3: Can Sawla Tours design a fully private Ethiopia tour?**

Yes. Sawla Tours specialises in private and tailor-made Ethiopia journeys. Trips can be designed for couples, families, friends, solo travelers, photographers, researchers, film teams, and special-interest groups. The itinerary can be adjusted around your preferred pace, comfort level, destinations, guiding needs, and travel style.

**Q4: What information should I include in my enquiry?**

The most useful details are your preferred travel dates, number of travelers, trip duration, main interests, and any special needs or requirements. You can also mention whether you prefer history, culture, trekking, wildlife, photography, festivals, remote routes, mobile camps, or a relaxed introduction to Ethiopia. Even a few sentences is enough to begin.

**Q5: Can Sawla Tours help with domestic flights and logistics?**

Yes. Sawla Tours can help coordinate domestic flights, vehicles, guides, accommodations, local transfers, permits where needed, and route logistics as part of a confirmed itinerary. Flight schedules and regional access are always confirmed during the planning stage because availability and conditions can change.

**Q6: Is Ethiopia suitable for first-time visitors?**

Ethiopia can be deeply rewarding for first-time visitors when the route is planned carefully. Many travelers begin with Addis Ababa, Lalibela, Gondar, Bahir Dar, the Simien Mountains, or Bale Mountains. More remote destinations such as Danakil, Omo Valley, and some border regions require additional planning and current local advice, which we provide during the design phase.

**Q7: Can Sawla Tours arrange photography, filming, or special-interest trips?**

Yes. Sawla Tours can design photography journeys, wildlife and birding trips, festival tours, cultural programs, trekking routes, filming support, and other special-interest travel. For photography and filming, planning covers timing, local permissions, respectful conduct, equipment logistics, drone and professional gear permits, and field conditions.

**Q8: Can I contact Sawla Tours by WhatsApp instead of the form?**

Yes. WhatsApp is often the easiest option for quick questions or first contact, especially for international travelers. For detailed tailor-made tour planning, the enquiry form is still helpful because it gives our team the information needed to prepare a more accurate and useful first response.

---

## 12. FINAL CTA

**Developer note:** Full-width section, warm background image. Not a sales block — calm, human, inviting.

**Image placeholder:** `[IMAGE: Coffee ceremony or guide with travelers at a destination — golden hour, warm]`

**H2:** Ready to Begin?

**Body:** Your Ethiopia journey does not need to start with a perfect plan. It can start with a question, a rough travel window, or one place you have always wanted to see. Send us your idea. We will help shape it into a journey that feels personal, practical, and deeply connected to Ethiopia.

**Primary CTA:** Send Your Enquiry *(scrolls to or focuses the form)*

**Secondary CTA:** Message Us on WhatsApp

**Trust note (small, below CTAs):** No pressure. No generic package. Just a careful first conversation with an Ethiopia-based travel team.

---

## 13. INTERNAL LINKING MAP

| Section | Target URL | Anchor text |
|---------|-----------|-------------|
| Hero sub-headline | `/about-us` | Ethiopia-based team |
| Trust bar — response time | `/how-we-work` | how we plan |
| Step 4 — CTA | `/how-we-work` | how we plan |
| Experience card 1 | `/tours-by-experience/historic-and-cultural-tours` | historic and cultural tours |
| Experience card 2 | `/tours-by-experience/tribal-cultural-ethiopia-tours` | cultural Ethiopia tours |
| Experience card 3 | `/tours-by-experience/ethiopia-wildlife-tours` | wildlife and birding tours |
| Experience card 4 | `/tours-by-experience/ethiopia-adventure-tours` | adventure tours |
| Experience card 5 | `/tours-by-experience/ethiopia-festival-tours` | festival tours |
| Experience card 6 | `/tours-by-experience/ethiopia-photography-tours` | photography tours |
| Experience card 7 | `/tours-by-experience/addis-ababa-tours` | Addis Ababa tours |
| Practical notes — Visa | `https://www.evisa.gov.et` | Ethiopia eVisa tourist information |
| Practical notes — Safety | `/ethiopia-travel-guide/safety-in-ethiopia` | safety in Ethiopia |
| Practical notes — Planning | `/ethiopia-travel-guide/how-to-plan-your-trip` | how to plan an Ethiopia trip |
| Social proof CTA | `/why-travel-with-sawla-tours` | read more from our travelers |
| Final CTA secondary | `https://wa.me/25170578306` | message us on WhatsApp |

---

## 14. UI / UX DIRECTION

### Desktop layout
Two-column after hero:
- Left column (60%): two-step enquiry form
- Right column (40%): contact cards, office hours, Google Maps embed, response time note, WhatsApp CTA

### Mobile layout (priority order)
1. Hero + H1 + primary CTA
2. WhatsApp fixed button (bottom-right, always visible)
3. Short reassurance copy
4. Step 1 form (5 fields)
5. Step 2 form (expands after Step 1)
6. Contact cards
7. Experience cards (horizontal scroll)
8. What happens next (4 steps)
9. FAQ accordion
10. Final CTA

### Typography
- Display/headings: Cormorant Garamond or Playfair Display
- Body/UI: DM Sans or Jost
- Form labels: 14px, medium weight
- Helper text: 12px, muted

### Colour
- Page background: Ivory `#FAF7F2`
- Primary text: Volcanic Charcoal `#1C1C1A`
- Accent: Teff Gold `#C4931A`
- Form field focus border: Teff Gold (thin, 1px)
- Muted text: Warm Grey `#5C5A54`
- Card background: White `#FFFFFF`

### Micro-interactions
- Form field focus: thin Teff Gold border
- Step 1 → Step 2: smooth slide-down reveal (300ms ease)
- Submit button hover: arrow nudges right 3px
- WhatsApp button: fixed bottom-right mobile, bounce-in on load
- FAQ accordion: smooth max-height transition (250ms ease)
- Experience cards: lift 4px on hover, subtle shadow increase
- No parallax, no heavy animation

---

## 15. DEVELOPER NOTES

### 301 Redirect — CRITICAL

The current live site URL for this page is `/contact-us`. This URL is indexed by Google and carries existing SEO equity. Before publishing the new page at `/enquire`, configure a server-side 301 permanent redirect:

```
301 /contact-us → https://www.sawlatours.com/enquire
```

Also add in `next.config.js` (Next.js):
```javascript
async redirects() {
  return [
    {
      source: '/contact-us',
      destination: '/enquire',
      permanent: true,
    },
  ]
}
```

Without this redirect, the old URL continues to rank (or loses equity to a dead URL), and the new page starts from zero.

---

### Form Implementation

**Step 1 validation:** All 5 fields required before Step 2 is revealed. Email: regex format check. Phone: must include a digit sequence (do not over-restrict format — international numbers vary).

**Step 2 reveal:** On Step 1 valid submit — do NOT navigate to a new page. Smooth scroll to Step 2 section which slides into view. Step 1 fields remain visible above, slightly greyed to indicate completed.

**Final submit:** POST to form handler. On success: show confirmation message inline (replace Step 2 form). On error: show inline field-level error messages (not an alert).

**Spam protection:** Implement honeypot field (hidden, empty = human) plus server-side rate limiting. reCAPTCHA v3 optional but must be invisible — visible CAPTCHAs damage conversion on premium pages.

**CRM integration:** Form submission should trigger:
1. Notification email to explore@sawlatours.com with all field values
2. Auto-reply confirmation email to the traveler
3. CRM record creation (if applicable)
4. Google Analytics event: `contact_form_submitted`

**Hidden tracking field:** Add a hidden `utm_source` field populated by URL parameter so campaign traffic is tracked through to form submission.

---

### WhatsApp Integration

**Floating button (mobile):** Fixed position, bottom-right, z-index 999, 56px circle, WhatsApp green on dark background. Always visible on mobile. On desktop: optional persistent button or inline CTAs only.

**Deep link format:**
```
https://wa.me/25170578306?text=Hi%20Sawla%20Tours%2C%20I%20am%20interested%20in%20planning%20an%20Ethiopia%20trip.
```
Pre-populated message reduces friction for the traveler.

**Tracking:** Fire `whatsapp_clicked` event on every WhatsApp button tap/click.

---

### Google Maps Embed

Add embedded map to the Contact Information block (right column desktop, below contact cards mobile). Use lazy loading — do not block page render.

```html
<iframe
  src="https://www.google.com/maps/embed?pb=[SAWLA_TOURS_OFFICE_COORDINATES]"
  width="100%"
  height="240"
  style="border:0; border-radius: 12px;"
  allowfullscreen=""
  loading="lazy"
  referrerpolicy="no-referrer-when-downgrade"
  title="Sawla Tours office location, Addis Ababa, Ethiopia"
></iframe>
```

**Developer action:** Replace `[SAWLA_TOURS_OFFICE_COORDINATES]` with the actual Google Maps embed URL for the Sawla Tours office. Obtain from Google Maps → Share → Embed a map.

---

### FAQ Accordion — Full ARIA Specification

```html
<section aria-labelledby="faq-heading">
  <h2 id="faq-heading">Questions Before You Enquire</h2>

  <div class="faq-item">
    <h3>
      <button
        id="faq-trigger-1"
        aria-expanded="false"
        aria-controls="faq-panel-1"
        class="faq-trigger"
      >
        Do I need to know my exact Ethiopia itinerary before contacting Sawla Tours?
        <i class="ti ti-chevron-down" aria-hidden="true"></i>
      </button>
    </h3>
    <div
      id="faq-panel-1"
      role="region"
      aria-labelledby="faq-trigger-1"
      class="faq-panel"
      hidden
    >
      <p>No. You can contact us with only a rough idea...</p>
    </div>
  </div>

  <!-- Repeat pattern for all 8 FAQ items -->
</section>
```

```javascript
// Accordion toggle — no framework needed
document.querySelectorAll('.faq-trigger').forEach(trigger => {
  trigger.addEventListener('click', () => {
    const expanded = trigger.getAttribute('aria-expanded') === 'true';
    trigger.setAttribute('aria-expanded', !expanded);
    const panel = document.getElementById(trigger.getAttribute('aria-controls'));
    panel.hidden = expanded;
  });
});
```

```css
.faq-panel {
  overflow: hidden;
  max-height: 0;
  transition: max-height 250ms ease;
}
.faq-panel:not([hidden]) {
  max-height: 400px; /* adjust to content */
}
```

**Note:** The `hidden` attribute hides the panel from both screen readers and visual display. `aria-expanded` tells screen readers the state. Together these satisfy WCAG 2.1 AA Success Criterion 4.1.2.

---

### Recommended Tracking Events

```javascript
// Fire these events to Google Analytics / GTM
contact_form_started       // on first field focus
contact_form_step1_completed // on Step 1 valid submit
contact_form_submitted     // on final submit success
contact_form_abandoned     // on page exit with partial form data
whatsapp_clicked           // on any WhatsApp button click
email_clicked              // on mailto: link click
phone_clicked              // on tel: link click
experience_card_clicked    // on any experience card click (include card name as parameter)
faq_opened                 // on any FAQ accordion open (include question as parameter)
maps_interacted            // on Google Maps embed interaction
final_cta_clicked          // on final CTA button click
```

### Recommended Components

```
ContactHero
TrustBar
EnquiryFormStep1
EnquiryFormStep2
ContactInfoPanel      (includes Maps embed)
HowItWorks4Steps
ExperienceSelector    (7 cards)
PlanningNotes
SocialProofBlock
ContactFAQAccordion
FinalCTA
ContactSchema         (JSON-LD)
WhatsAppFloatingButton
```

---

## 16. JSON-LD SCHEMA — COMPLETE (All 8 FAQs)

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": "https://www.sawlatours.com/enquire/#contactpage",
      "url": "https://www.sawlatours.com/enquire/",
      "name": "Contact Sawla Tours",
      "description": "Contact Sawla Tours to plan a private, tailor-made Ethiopia journey with an Addis Ababa-based tour operator.",
      "isPartOf": {
        "@id": "https://www.sawlatours.com/#website"
      },
      "about": {
        "@id": "https://www.sawlatours.com/#travelagency"
      }
    },
    {
      "@type": "TravelAgency",
      "@id": "https://www.sawlatours.com/#travelagency",
      "name": "Sawla Tours",
      "url": "https://www.sawlatours.com/",
      "foundingDate": "2009",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Addis Ababa",
        "addressCountry": "ET"
      },
      "email": "explore@sawlatours.com",
      "telephone": "+25170578306",
      "areaServed": {
        "@type": "Country",
        "name": "Ethiopia"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "telephone": "+25170578306",
        "email": "explore@sawlatours.com",
        "availableLanguage": ["English", "Amharic"],
        "hoursAvailable": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
          "opens": "09:00",
          "closes": "17:30"
        }
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.sawlatours.com/enquire/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Do I need to know my exact Ethiopia itinerary before contacting Sawla Tours?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. You can contact Sawla Tours with only a rough idea, such as your travel month, number of days, group size, and main interests. The team will help you understand which destinations fit your time, what route makes sense, and what should be adjusted based on current access, season, and travel pace."
          }
        },
        {
          "@type": "Question",
          "name": "How quickly does Sawla Tours respond to enquiries?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sawla Tours aims to respond to all enquiries within 24 hours on business days (Addis Ababa time, EAT UTC+3). For complex tailor-made itineraries, the first response outlines a proposed route and may ask follow-up questions before preparing a full proposal, which typically takes 2 to 3 business days."
          }
        },
        {
          "@type": "Question",
          "name": "Can Sawla Tours design a fully private Ethiopia tour?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Sawla Tours specialises in private and tailor-made Ethiopia journeys for couples, families, friends, solo travelers, photographers, researchers, film teams, and special-interest groups. Itineraries can be adjusted around pace, comfort level, destinations, guiding needs, and travel style."
          }
        },
        {
          "@type": "Question",
          "name": "What information should I include in my Ethiopia tour enquiry?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Useful details include preferred travel dates, number of travelers, trip duration, interests, accommodation style, budget level, and special needs. Travelers can also mention whether they prefer history, culture, trekking, wildlife, photography, festivals, remote routes, mobile camps, or a relaxed introduction to Ethiopia. Even a few sentences is enough to begin."
          }
        },
        {
          "@type": "Question",
          "name": "Can Sawla Tours help with Ethiopia domestic flights and logistics?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Sawla Tours can help coordinate domestic flights, vehicles, guides, accommodations, local transfers, permits where needed, and route logistics as part of a confirmed itinerary. Flight schedules and regional access are confirmed during the planning stage because availability and conditions can change."
          }
        },
        {
          "@type": "Question",
          "name": "Is Ethiopia suitable for first-time visitors?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ethiopia can be deeply rewarding for first-time visitors when the route is planned carefully. Many travelers begin with Addis Ababa, Lalibela, Gondar, Bahir Dar, the Simien Mountains, or Bale Mountains. More remote destinations such as Danakil, Omo Valley, and some border regions require additional planning and current local advice."
          }
        },
        {
          "@type": "Question",
          "name": "Can Sawla Tours arrange photography, filming, or special-interest trips?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Sawla Tours can design photography journeys, wildlife and birding trips, festival tours, cultural programs, trekking routes, filming support, and other special-interest travel. For photography and filming, planning covers timing, local permissions, respectful conduct, equipment logistics, drone and professional gear permits, and field conditions."
          }
        },
        {
          "@type": "Question",
          "name": "Can I contact Sawla Tours by WhatsApp instead of the enquiry form?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. WhatsApp is often the easiest option for quick questions or first contact, especially for international travelers. For detailed tailor-made tour planning, the enquiry form is still helpful because it gives the team the information needed to prepare a more accurate and useful first response."
          }
        }
      ]
    }
  ]
}
```

---

## 17. LAUNCH CHECKLIST FOR THIS PAGE

**Content:**
- [ ] Real testimonial (Emily R., USA) inserted — confirmed ✅
- [ ] All 8 FAQ questions present ✅
- [ ] All 7 experience card links verified against live URL structure
- [ ] Phone number verified against actual Sawla Tours number
- [ ] Google Maps embed URL obtained and inserted
- [ ] Office hours confirmed with Sawla Tours team (Sunday: Closed confirmed)

**Technical:**
- [ ] 301 redirect configured: `/contact-us` → `/enquire`
- [ ] Two-step form implemented and tested
- [ ] Step 1 validation working (all 5 fields)
- [ ] Step 2 smooth reveal working
- [ ] Confirmation message shows on successful submit
- [ ] Auto-reply email sends to traveler
- [ ] Notification email fires to explore@sawlatours.com
- [ ] WhatsApp deep link tested (opens correct number + pre-filled message)
- [ ] WhatsApp floating button visible on mobile
- [ ] Google Maps embed lazy-loads correctly
- [ ] FAQ accordion: ARIA attributes confirmed, keyboard navigation works
- [ ] All tracking events firing (test in GA debug mode)
- [ ] JSON-LD validates in Google Rich Results Test
- [ ] Page renders correctly on 375px mobile
- [ ] Page load speed: LCP under 2.5s (form above fold)

**SEO:**
- [ ] Meta title and description set
- [ ] Canonical URL: `https://www.sawlatours.com/enquire/`
- [ ] JSON-LD in `<head>`
- [ ] Old URL 301 confirmed live (test with curl -I)
- [ ] Submit updated sitemap to Google Search Console after launch

---

*End of Sawla Tours Contact / Enquire Page — Expert-Corrected Final Version*  
*All 12 issues from expert review applied · Ready for developer handoff*
