# SAWLA TOURS — DESIGN DIRECTION
## The Committed Aesthetic · Developer & Designer Reference
## Read this before touching a single line of code

---

## THE SINGLE SENTENCE

**"Cinematic Ethiopian Earth — dark-luxury restraint, Cormorant Garamond weight 300, Teff Gold as accent not decoration."**

If any design decision contradicts this sentence, it's wrong.

---

## WHAT THIS SITE IS NOT

Not a generic luxury travel site. Not "Inter + blue CTAs." Not a template with brand colours applied. Not trendy maximalism. Not another site where gold appears on every surface.

The comparison sites that matter: **Singita** (restraint, whitespace, video as evidence), **Expert Africa** (encyclopedic depth, authority), **andBeyond** (emotional storytelling first). This site combines all three — applied to Ethiopia specifically.

---

## COLOUR SYSTEM

### The palette (5 active, 3 support)

```
IVORY          #F8F6F1    Page background, card surfaces, light sections
VOLCANIC ROCK  #2A2724    Dark sections, hero backgrounds, footer, nav-on-scroll
TEFF GOLD      #C9941A    Accent ONLY — see "Gold rules" below
SAND           #E8DDC7    Borders, card backgrounds, dividers, section separators
WARM GREY      #5C5A54    Body text on light backgrounds
CHARCOAL       #1C1C1A    Headlines on light backgrounds, dark card sections
GOLD LIGHT     #E8A82A    Gold hover state ONLY
COFFEE         #6B4A2F    Warm accent, pull-quote borders (use sparingly)
```

### Gold rules — the most important rule in the design system

Teff Gold (#C9941A) appears ONLY on:
- Eyebrow labels ("Where we go", "Six ways to travel")
- Link arrows (→)
- Active nav state on scroll
- CTA button hover/active states
- Tour card "Explore" link text
- Form input focus ring
- Decorative horizontal rule lines (max 1 per section)

Teff Gold does NOT appear on:
- Primary CTA button fill (use Ivory on dark bg, Charcoal on light bg)
- Section backgrounds
- Card backgrounds
- Decorative borders
- Heading text
- Body text

**If gold is everywhere, it means nothing.**

---

## TYPOGRAPHY

### Font pairing

```
DISPLAY:  Cormorant Garamond
          Font weight: 300 (light)
          Style: normal + italic
          Variable: --font-cormorant
          Google Fonts import: weights 300, 300i, 400, 400i, 600

BODY/UI:  DM Sans
          Font weights: 300, 400, 500
          Variable: --font-dm-sans
          Google Fonts import: weights 300, 400, 500
```

**Why this pairing:** Cormorant Garamond at weight 300 is aristocratic and editorial without being generic (not Playfair Display, which every luxury brand uses). DM Sans is clean, readable, and has no personality competing with Cormorant. The contrast between them is the typography strategy.

### Type scale (fluid with clamp)

```
Display 2XL:  clamp(3.5rem, 8vw, 7rem)      Hero headlines only
Display XL:   clamp(3rem, 6vw, 5.5rem)       Page hero headlines
Display LG:   clamp(2.25rem, 4vw, 3.75rem)   Section headers
Display MD:   clamp(1.75rem, 3vw, 2.75rem)   Subsection headers, card names
Display SM:   clamp(1.375rem, 2vw, 1.875rem) Card titles, callouts
Body LG:      1.125rem / line-height 1.8     Long-form articles
Body MD:      1rem / line-height 1.78        Standard copy
Body SM:      0.875rem / line-height 1.65    Captions, meta
Label:        0.6875rem / tracking 0.14em    Eyebrows, tags, nav, buttons
```

### Headline philosophy

Cormorant headlines should be **long and evocative**, not short and punchy.

**Right:** "Watching 800 gelada monkeys wake up on the Simien escarpment"
**Wrong:** "See Geladas"

**Right:** "Ethiopia isn't a destination. It's an encounter."
**Wrong:** "Discover Ethiopia"

The display typeface is carrying the brand voice. Let it.

### Italic use

Italic in Cormorant is used for:
- The second half of split headlines: "Choose your / *Ethiopia*"
- Quotes and pull-quotes
- Scientific species names
- Emphasis within running prose

Never use italic in DM Sans body copy. Never use italic for entire paragraphs.

---

## SPACING

```
Section padding:        8rem top/bottom (section)
Section padding sm:     5rem top/bottom (section-sm)
Container max-width:    1320px
Container padding:      6px mobile → 12px tablet → 16px desktop (responsive)
Card gap:               1.5px (the "seam" between cards — reveals background)
Card border-radius:     16px (card), 0 (full-bleed image cards)
Button border-radius:   0 (flat, architectural — not rounded pills)
```

**Whitespace philosophy (from Singita):** More space than feels comfortable. Every section needs room to breathe. The tendency in web design is to fill space. Resist this. White space is luxury.

---

## EASING CURVES

```
--ease-luxury:  cubic-bezier(0.16, 1, 0.3, 1)      Spring-like — primary animation easing
--ease-sawla:   cubic-bezier(0.25, 0.46, 0.45, 0.94) Standard transitions (hover, color)
--ease-out:     cubic-bezier(0.0, 0.0, 0.2, 1)       Decelerate — slide-in elements
```

**Luxury easing** (0.16, 1, 0.3, 1) is the defining motion signature of this site. It starts fast and decelerates into position — the opposite of ease-in-out, which feels mechanical. Use this for:
- Headline line entrances
- Card hover transforms
- Scroll reveal animations
- Navigation overlay entrance

**Avoid:** AOS.js default easing. Bounce easing. Linear motion for UI elements.

---

## MOTION SYSTEM

### Page load — hero sequence (staggered by 150ms)

```
0.2s:   Nav logo fades in (opacity 0 → 1, ease-luxury)
0.4s:   Nav links fade in
0.8s:   Hero eyebrow fades up (translateY 24px → 0)
0.9s:   Headline line 1 rises (translateY 105% → 0, overflow hidden parent)
1.05s:  Headline line 2 rises
1.2s:   Headline line 3 rises
1.4s:   Hero subtext fades up
1.6s:   Hero CTAs fade up
2.0s:   Stats fade in (right edge)
2.3s:   Scroll cue fades in
2.6s:   Gold scroll-drop animation begins (repeating)
```

### Scroll reveal pattern

All sections below the fold use the `.reveal` class:
```css
.reveal {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.9s var(--ease-luxury), transform 0.9s var(--ease-luxury);
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
```

IntersectionObserver adds `.visible` when element enters viewport at threshold 0.08. Stagger multiple children by 80ms delay per element.

### Card interactions

```
Tour style cards:
  - Background: scale(1.05) on hover (transition 700ms ease-luxury)
  - Description text: opacity 0 → 1, translateY(10px) → 0 (transition 450ms ease-luxury)
  - Arrow: gap increases from 6px to 10px

Destination cards:
  - Background: scale(1.06) on hover (transition 800ms ease-luxury)
  - Tag text: opacity 0 → 1, translateY(6px) → 0

Testimonial cards: no transform — static cards, gold quote mark only
```

### What NOT to animate

- Full-page transitions (disorienting)
- Anything with bounce
- Loading spinners that persist > 400ms
- Parallax effects on mobile (causes jank)

---

## COMPONENT PATTERNS

### Buttons

```
Primary (light bg → dark bg for dark sections):
  Background: Charcoal (#1C1C1A) or Ivory (#F8F6F1)
  Text: Ivory or Volcanic
  Border-radius: 0 (flat, architectural)
  Padding: 1rem 2.2rem
  Font: DM Sans, 0.6875rem, tracking 0.14em, uppercase
  Hover: background lightens slightly + translateY(-1px)
  NO rounded corners. NO drop shadows.

Ghost:
  Background: transparent
  Border: 0.5px solid (ivory/35 on dark, charcoal/40 on light)
  Same text and padding as primary
  Hover: border-color → gold, text → gold

Never: gold fill button (gold is not a button fill colour)
Never: rounded pill buttons
Never: drop shadow buttons
```

### Labels / eyebrows

```
font-family: DM Sans
font-size: 0.6875rem
letter-spacing: 0.18em
text-transform: uppercase
color: --gold (on light bg) or rgba(201,148,26,0.8) (on dark bg)
display: block
margin-bottom: 1rem
```

### Cards — the 1.5px seam

All card grids use `gap: 1.5px` with the section background showing through. This creates a refined "seam" effect that looks more considered than a standard gap or border. The background colour behind card grids should match the card edge colour for visual coherence.

### Pull quotes

```
border-left: 2px solid --gold
padding-left: 1.5rem
font-family: Cormorant Garamond, italic, weight 300
font-size: clamp(1.125rem, 2vw, 1.375rem)
color: charcoal (light bg) or ivory/70 (dark bg)
```

---

## PHOTOGRAPHY RULES

**Every image on this site is a Sawla Films production asset — not stock photography.**

### Crop rules

- Landscape / destination: 16:9 or 21:9 (cinematic)
- Species portraits: 1:1 square (editorial)
- Team portraits: 1:1 square, shoulders visible
- Tour cards: 3:4 (portrait orientation)

### Overlay gradient (standard)

```
linear-gradient(180deg,
  transparent 0%,
  transparent 35%,
  rgba(0,0,0,0.4) 65%,
  rgba(0,0,0,0.82) 100%
)
```

Applied to all image cards to ensure text legibility without heavy darkening.

### Film grain overlay

Applied to all dark hero sections (Volcanic background):
```css
.film-grain {
  background-image: url("data:image/svg+xml...[fractalNoise filter]");
  opacity: 0.035;
  background-size: 200px 200px;
}
```

This subtle texture prevents flat digital backgrounds from looking cheap and references Sawla Films' documentary aesthetic.

---

## NAVIGATION BEHAVIOUR

**Default (over hero):** Transparent. Logo and links in Ivory. No background.
**On scroll (>60px):** Background transitions to Volcanic Rock (#2A2724) with backdrop-filter: blur(12px). Smooth transition (500ms ease-sawla).
**Active link:** Gold text.
**Mobile:** Full-screen overlay (Volcanic Rock fill), links in Cormorant display font (large), staggered entrance by 60ms per link. Body scroll locked while open.

---

## SECTION RHYTHM (homepage example)

```
Section 1:  Hero            — Volcanic Rock bg, full-height, cinematic
Section 2:  Trust bar       — Charcoal bg (darker than volcanic)
Section 3:  Tour styles     — Ivory bg (light — first light section)
Section 4:  Destinations    — Volcanic Rock bg (dark return)
Section 5:  Species         — Charcoal bg
Section 6:  Testimonials    — Ivory bg
Section 7:  Sawla Films     — Volcanic Rock bg
Section 8:  How we work     — Sand bg (warmest section)
Section 9:  Sawla Moments   — Ivory bg
Section 10: Enquiry         — Volcanic Rock bg
Footer:     Charcoal bg
```

The alternating rhythm creates visual cadence without requiring design decisions on every section. Dark / Light / Dark / Light — with variation in the specific dark tone (Volcanic vs Charcoal) to prevent monotony.

---

## WHAT TO DO WITH PLACEHOLDER BACKGROUNDS

Every dark gradient `<div>` is a pre-sized, correctly-cropped container waiting for a Sawla Films image or video. The gradient is not a design element — it is a placeholder. When the real footage arrives:

1. Remove the gradient `<div>`
2. Add `<Image>` from `next/image` with `fill` prop
3. Keep the overlay gradient div above it (for text legibility)
4. Add the `priority` prop on above-fold images only

The card sizes, aspect ratios, and overlay gradients are already correct. The swap is always 1 line.

---

## WHAT THIS SITE SHOULD FEEL LIKE WHEN COMPLETE

Load the homepage. The headline rises up line by line. The dark cinematic background reveals slowly. The gold scroll indicator drops. You scroll down. Tour cards appear with gentle lift animations. The destination grid is dense with possibility. The Ethiopian wolf stares out from a perfect square crop. A testimonial appears: "I had no idea Ethiopia would do this to me."

The visitor should feel, before reading a single word, that they are in the presence of something that has been made with care and genuine expertise. The design communicates: *we know this country better than anyone, and we will show it to you the way it deserves to be shown.*

That is the design brief. Everything above is in service of that.

---

*Sawla Tours Design Direction Document — June 2026*
*To be read before every design or development decision.*
