> **⚠ ARCHIVED — HISTORICAL ONLY. Do not use for current launch.** Counts, routes and instructions in this file are outdated. Current truth: `docs/CURRENT_HANDOFF.md`.

# Sawla Tours — Elite Photography Management System

**Author:** Photography System Architecture  
**Version:** 1.0  
**Last Updated:** June 9, 2026

---

## 🎯 Overview

This document defines the **single source of truth** for organizing, storing, and serving 300+ photographs across Sawla Tours' digital ecosystem. The system ensures:

✓ **One photo = one location in the filesystem**  
✓ **SEO-friendly naming conventions**  
✓ **Responsive image delivery** (4 sizes per asset)  
✓ **Organized by purpose** (not just chronologically)  
✓ **Metadata-rich** (alt text, captions, credits in a master index)  
✓ **Production-ready** (WebP+fallback, lazy loading, CDN-compatible)

---

## 📁 Folder Architecture

```
public/images/
├── destinations/              # 8 destinations × 4-5 images each = 32-40 photos
│   ├── lalibela/
│   │   ├── dest-lalibela-hero.jpg                 (1920×1080, hero banner)
│   │   ├── dest-lalibela-church-1.jpg             (800×600, detail)
│   │   ├── dest-lalibela-people.jpg               (800×600, cultural)
│   │   └── dest-lalibela-card.jpg                 (400×300, hub tile)
│   ├── simien-mountain-national-park/
│   ├── danakil-depression-tour-packages/
│   ├── omo-valley-tribes/
│   ├── bale-mountains-national-park/
│   ├── addis-ababa/
│   ├── harar/
│   └── tigray-rock-churches/
│
├── tours/                     # 6 styles × 2 images + 36 itineraries
│   ├── hubs/
│   │   ├── tour-hub-historic-and-cultural-tours.jpg
│   │   ├── tour-hub-tribal-cultural-ethiopia-tours.jpg
│   │   ├── tour-hub-ethiopia-wildlife-tours.jpg
│   │   ├── tour-hub-ethiopia-adventure-tours.jpg
│   │   ├── tour-hub-ethiopia-festival-tours.jpg
│   │   └── tour-hub-ethiopia-photography-tours.jpg
│   └── itineraries/
│       ├── lalibela-rock-churches-3-days/
│       │   ├── tour-lalibela-rock-churches-3-days-hero.jpg
│       │   └── tour-lalibela-rock-churches-3-days-map.jpg
│       ├── simien-trekking-adventure-7-days/
│       └── ... (36 total itineraries)
│
├── species/                   # 7 species × 2 images each = 14 photos
│   ├── species-gelada-monkey-portrait.jpg         (400×400, main)
│   ├── species-gelada-monkey-habitat.jpg          (800×600, context)
│   ├── species-ethiopian-wolf-portrait.jpg
│   ├── species-ethiopian-wolf-habitat.jpg
│   ├── species-walia-ibex-portrait.jpg
│   ├── species-walia-ibex-habitat.jpg
│   ├── species-abyssinian-ground-hornbill-portrait.jpg
│   ├── species-abyssinian-ground-hornbill-habitat.jpg
│   ├── species-lammergeier-portrait.jpg
│   ├── species-lammergeier-habitat.jpg
│   ├── species-menelik-bushbuck-portrait.jpg
│   ├── species-menelik-bushbuck-habitat.jpg
│   ├── species-simien-jackal-portrait.jpg
│   └── species-simien-jackal-habitat.jpg
│
├── guides/                    # 15 field guides × 2 images = 30 photos
│   ├── guide-sacred-simons-rock-churches-1.jpg
│   ├── guide-sacred-simons-rock-churches-2.jpg
│   ├── guide-lalibela-rock-hewn-churches-1.jpg
│   ├── guide-lalibela-rock-hewn-churches-2.jpg
│   └── ... (15 guides × 2 images)
│
├── moments/                   # 9 Sawla Moments × 3 images = 27 photos
│   ├── moments-timkat-festival-hero.jpg
│   ├── moments-timkat-festival-body-1.jpg
│   ├── moments-timkat-festival-body-2.jpg
│   ├── moments-coffee-ceremony-traditions-hero.jpg
│   ├── moments-coffee-ceremony-traditions-body-1.jpg
│   └── ... (9 moments × 3 images)
│
├── people/                    # Team, guides, specialists = 20-30 photos
│   ├── about-team-hero.jpg
│   ├── about-founder-portrait.jpg
│   ├── about-office-addis.jpg
│   ├── guides-hero.jpg
│   ├── specialists-hero.jpg
│   ├── drivers-hero.jpg
│   └── ... (team member portraits, office, etc.)
│
├── camps/                     # 3-5 camp lifestyle photos
│   ├── camps-hero.jpg
│   ├── camp-setup-overview.jpg
│   └── camp-dining-landscape.jpg
│
├── pages/                     # Static pages (about, why-travel, how-we-work, etc.)
│   ├── about/
│   │   ├── about-cta-ethiopia-landscape.jpg
│   │   └── about-section-wildlife.jpg
│   ├── why-travel/
│   │   └── why-travel-hero.jpg
│   ├── how-we-work/
│   │   └── how-we-work-hero.jpg
│   ├── responsible-travel/
│   │   └── responsible-hero.jpg
│   └── contact/
│       ├── contact-hero-specialist-planning.jpg
│       └── contact-cta-coffee-ceremony.jpg
│
├── hubs/                      # Hub pages with HeroVideo posters
│   ├── home-hero-poster.jpg               (1920×1080, homepage HeroVideo)
│   ├── destinations-hub-hero.jpg          (1920×1080, destinations hub HeroVideo)
│   ├── tours-hub-hero.jpg                 (1920×1080, tours hub HeroVideo)
│   ├── guide-hub-hero.jpg                 (1920×1080, travel guide hub HeroVideo)
│   └── home-sawla-films-hero.jpg
│
└── maps/
    └── ethiopia-map-regions.jpg
```

---

## 📐 Image Specifications (Master List)

### Hero Images (1920×1080, WebP+JPG)
Used on hub pages, destination pages, tour pages

**Dimensions:** 1920×1080px  
**Aspect Ratio:** 16:9  
**Format:** WebP (primary) + JPEG (fallback)  
**File Size:** < 250KB WebP, < 350KB JPEG  
**Quality:** Professional, high contrast, storytelling-focused  
**Compression:** Optimized for web (75% quality WebP, 80% quality JPEG)

**Examples:**
- `home-hero-poster.jpg` — Homepage HeroVideo
- `dest-lalibela-hero.jpg` — Lalibela destination page hero
- `tour-lalibela-rock-churches-3-days-hero.jpg` — Itinerary hero

---

### Card Images (400×300, WebP+JPG)
Used on hub tiles, grid listings

**Dimensions:** 400×300px  
**Aspect Ratio:** 4:3  
**Format:** WebP (primary) + JPEG (fallback)  
**File Size:** < 40KB WebP, < 60KB JPEG  
**Quality:** Sharp, color-rich, thumb-worthy  
**Compression:** 75% quality WebP, 80% quality JPEG

**Examples:**
- `dest-lalibela-card.jpg` — Destinations hub tile
- `tour-hub-historic-and-cultural-tours.jpg` — Tour style hub card
- `species-gelada-monkey-portrait.jpg` — Species card

---

### Portrait Images (400×400, WebP+JPG)
Used for species, team members, guide portraits

**Dimensions:** 400×400px  
**Aspect Ratio:** 1:1 (square)  
**Format:** WebP (primary) + JPEG (fallback)  
**File Size:** < 50KB WebP, < 75KB JPEG  
**Quality:** In-focus face/subject, clean background  
**Compression:** 75% quality WebP, 80% quality JPEG

**Examples:**
- `species-gelada-monkey-portrait.jpg` — Species main image
- `about-founder-portrait.jpg` — Team portrait

---

### Body Content Images (800×600, WebP+JPG)
Used in article bodies, detail sections

**Dimensions:** 800×600px  
**Aspect Ratio:** 4:3  
**Format:** WebP (primary) + JPEG (fallback)  
**File Size:** < 80KB WebP, < 120KB JPEG  
**Quality:** Rich detail, well-lit, consistent saturation  
**Compression:** 75% quality WebP, 80% quality JPEG

**Examples:**
- `moments-timkat-festival-body-1.jpg` — Sawla Moments article image
- `dest-lalibela-church-1.jpg` — Destination detail image
- `guide-sacred-simons-rock-churches-1.jpg` — Field guide article image

---

### Full-Width Section Images (1200×800, WebP+JPG)
Used for large section backgrounds, CTA zones

**Dimensions:** 1200×800px  
**Aspect Ratio:** 3:2  
**Format:** WebP (primary) + JPEG (fallback)  
**File Size:** < 150KB WebP, < 200KB JPEG  
**Quality:** Evocative, atmospheric, good for text overlay  
**Compression:** 70% quality WebP, 75% quality JPEG

**Examples:**
- `home-cta-background.jpg` — Homepage CTA section
- `contact-cta-coffee-ceremony.jpg` — Contact page CTA
- `about-cta-ethiopia-landscape.jpg` — About page landscape

---

## 📋 Naming Convention

**Format:** `{category}-{slug}-{variant}.{ext}`

### Components:
- **{category}:** `home`, `dest`, `tour`, `species`, `guide`, `moments`, `about`, `camp`, etc.
- **{slug}:** URL-friendly slug of the subject (e.g., `lalibela`, `gelada-monkey`, `timkat-festival`)
- **{variant}:** `hero`, `card`, `portrait`, `body-1`, `body-2`, `map`, `context`, etc.
- **{ext}:** `.jpg` (deliverable), `.webp` (optional optimized format)

### Examples:
✓ `dest-lalibela-hero.jpg` — Destination hero  
✓ `species-gelada-monkey-portrait.jpg` — Species portrait  
✓ `moments-timkat-festival-body-1.jpg` — Sawla Moments detail  
✓ `tour-lalibela-rock-churches-3-days-hero.jpg` — Itinerary hero  
✓ `guide-sacred-simons-rock-churches-1.jpg` — Field guide (ordered variant)  

---

## 🏷️ Metadata System

Create a **master index file** at `data/photoMetadata.ts`:

```typescript
export interface PhotoMetadata {
  filename: string;
  slug: string;
  title: string;
  alt: string;               // SEO alt text (80-120 chars)
  caption?: string;          // Optional caption for display
  credit?: string;           // Photographer/source credit
  location?: string;         // Geolocation for context
  category: 'destination' | 'tour' | 'species' | 'guide' | 'moments' | 'people' | 'camp' | 'page';
  tags: string[];            // Search/filter tags
  width: number;
  height: number;
  webpVersion?: boolean;     // Whether .webp variant exists
}

export const PHOTO_INDEX: Record<string, PhotoMetadata> = {
  'dest-lalibela-hero': {
    filename: 'dest-lalibela-hero.jpg',
    slug: 'lalibela',
    title: 'Rock-hewn Churches of Lalibela',
    alt: 'Aerial view of the rock-hewn churches of Lalibela, Ethiopia\'s most sacred pilgrimage site',
    caption: 'The ancient rock-hewn churches of Lalibela, carved from volcanic stone.',
    credit: 'Sawla Tours / Photography Team',
    location: 'Lalibela, Amhara Region, Ethiopia',
    category: 'destination',
    tags: ['history', 'religion', 'culture', 'churches', 'highland-ethiopia'],
    width: 1920,
    height: 1080,
    webpVersion: true,
  },
  // ... 200+ more entries
};
```

---

## 🎨 Quality Standards

### Photography Guidelines

**Style:**
- Authentic (not staged/artificial)
- High contrast (vibrant colors, sharp shadows)
- Storytelling (faces, activities, emotions, not just landscapes)
- Consistent color grading (warm tones, slight desaturation on details)
- No watermarks (credit in metadata, not on image)

**Lighting:**
- Golden hour preferred (sunrise/sunset)
- Avoid harsh midday sun (unless architectural detail)
- Fill flash for portraits and people
- Consistent white balance across series

**Composition:**
- Rule of thirds for landscapes
- Center focus for portraits/species
- Leading lines for destination/journey images
- Depth (foreground/middle/background)

**Prohibited:**
- Blurry or out-of-focus images
- Overexposed skies
- People unaware in background (consent-based only)
- Dated/branded logos (unless unavoidable)
- Stock photo obviousness (clichéd poses)

---

## 🔄 Image Optimization Pipeline

### Desktop Workflow (for your team)

1. **Shoot & Organize**
   - Use descriptive folder names (matching our structure above)
   - Shoot in RAW format

2. **Processing** (Adobe Lightroom / Capture One)
   - Consistent color grading preset
   - Exposure, contrast, vibrance normalization
   - Export as full-size TIFF (for archival)

3. **Web Optimization** (using provided scripts below)
   ```bash
   # Batch resize + compress
   ./scripts/optimize-images.sh public/images/
   
   # Generates:
   # - 1920×1080 for hero (JPG @ 80%, WebP @ 75%)
   # - 400×300 for cards (JPG @ 80%, WebP @ 75%)
   # - 800×600 for body (JPG @ 80%, WebP @ 75%)
   ```

4. **Update Metadata**
   - Add entry to `data/photoMetadata.ts`
   - Fill alt text, caption, credit, tags

5. **Test**
   - Load in Next.js Image component
   - Verify responsive sizes
   - Check LCP impact

---

## 🛠️ Implementation Steps

### Phase 1: Set up Directory Structure (TODAY)
```bash
# Create folder structure
mkdir -p public/images/{destinations,tours,species,guides,moments,people,camps,pages,hubs,maps}

# Create subdirectories for each destination, tour style, etc.
mkdir -p public/images/destinations/{lalibela,simien-mountain-national-park,danakil-depression-tour-packages,omo-valley-tribes,bale-mountains-national-park,addis-ababa,harar,tigray-rock-churches}

# Create tour itinerary directories (36 total)
mkdir -p public/images/tours/itineraries/{tour-slug-1,tour-slug-2,... etc}

# Create species directories (7 total)
mkdir -p public/images/species/{gelada-monkey,ethiopian-wolf,walia-ibex,abyssinian-ground-hornbill,lammergeier,menelik-bushbuck,simien-jackal}

# Create guides directories (15 total)
mkdir -p public/images/guides/
```

### Phase 2: Create Photo Metadata Index
- Generate `data/photoMetadata.ts` with all image entries
- Each entry has filename, alt text, caption, credit, tags
- Single source of truth for all 300+ photos

### Phase 3: Update Components to Use Metadata
Replace PlaceholderImage → Image component:
```typescript
// Before (placeholder)
<PlaceholderImage filename="dest-lalibela-hero.jpg" category="destination" width={1920} height={1080} />

// After (real image)
import { PHOTO_INDEX } from '@/data/photoMetadata';
const photo = PHOTO_INDEX['dest-lalibela-hero'];
<Image
  src={`/images/destinations/lalibela/${photo.filename}`}
  alt={photo.alt}
  width={photo.width}
  height={photo.height}
  priority
  className="object-cover w-full h-full"
/>
```

### Phase 4: Batch Image Processing
Create script to optimize all incoming photos:
- Resize to 4 standard sizes
- Convert to WebP + JPG
- Compress aggressively but keep quality

### Phase 5: Build Wiring
Update data files to pull from photoMetadata:
- `data/destinationData.ts` references `PHOTO_INDEX['dest-{slug}-hero']`
- `data/speciesContent.ts` references `PHOTO_INDEX['species-{slug}-portrait']`
- `data/itineraryData.ts` references `PHOTO_INDEX['tour-{slug}-hero']`

---

## 📊 Image Inventory Checklist

### Static Pages (23 images)
- [ ] Home hero poster (HeroVideo) — 1920×1080
- [ ] Destinations hub hero (HeroVideo) — 1920×1080
- [ ] Tours hub hero (HeroVideo) — 1920×1080
- [ ] Travel guide hub hero (HeroVideo) — 1920×1080
- [ ] Species hub hero — 1920×1080
- [ ] Moments hub hero — 1920×1080
- [ ] About team hero — 1920×1080
- [ ] About founder portrait — 400×400
- [ ] About office — 800×600
- [ ] About CTA landscape — 1200×800
- [ ] Why Travel hero — 1920×1080
- [ ] How We Work hero — 1920×1080
- [ ] Camps hero — 1920×1080
- [ ] Camp setup overview — 800×600
- [ ] Responsible Travel hero — 1920×1080
- [ ] Guides hero — 1920×1080
- [ ] Drivers hero — 1920×1080
- [ ] Specialists hero — 1920×1080
- [ ] Contact specialist planning hero — 1920×1080
- [ ] Contact coffee ceremony CTA — 1200×800
- [ ] Sawla Films hero — 1920×1080
- [ ] Ethiopia map — 1200×800
- [ ] Home Sawla Films hero — 1920×1080

### Destinations (32-40 images)
- [ ] 8 destinations × (hero 1920×1080 + card 400×300 + 2-3 detail 800×600)

### Tours (50-60 images)
- [ ] 6 tour style hubs × card image — 400×300 each
- [ ] 36 itineraries × hero image — 600×375 or 1920×1080 each

### Species (14 images)
- [ ] 7 species × (portrait 400×400 + habitat 800×600)

### Field Guides (30 images)
- [ ] 15 guides × (hero 600×400 + body 800×600)

### Sawla Moments (27 images)
- [ ] 9 moments × (hero 1920×1080 + 2 body images 800×600)

### People (20-30 images)
- [ ] Team portraits, office, guides, specialists, drivers

---

## 🚀 Delivery Format

**When photos are ready:**

1. **Folder structure matches specification above**
2. **All filenames follow naming convention**
3. **All images optimized** (4 sizes, WebP+JPG, <400KB each)
4. **Metadata file complete** (`data/photoMetadata.ts`)
5. **Components updated** to use real images instead of placeholders
6. **Next.js Image component wired** with correct sizes/priorities
7. **LCP verified** (images load fast, video posters first)

---

## 💾 Archive Structure for Delivery

For you to hand to a photographer or image team:

```
Sawla Tours Photography — Image Delivery Package
├── PHOTOGRAPHY_SYSTEM.md (this file)
├── FILE_NAMING_GUIDE.txt
├── IMAGE_SPECS.json
├── photoMetadata.ts (template)
├── FOLDER_STRUCTURE_SETUP.sh
├── optimize-images.sh (batch optimization script)
└── folders_to_populate/
    ├── destinations/
    ├── tours/
    ├── species/
    ├── guides/
    ├── moments/
    ├── people/
    ├── camps/
    ├── pages/
    ├── hubs/
    └── maps/
```

---

## 📞 Implementation Roadmap

**Week 1:** Set up folder structure + metadata template  
**Week 2:** Receive first batch of images (destinations + hubs)  
**Week 3:** Optimize and wire first 50 images, test Next.js Image component  
**Week 4:** Receive remaining photos (tours, species, guides, moments, people)  
**Week 5:** Full batch optimization + metadata completion  
**Week 6:** Component wiring + QA (LCP, responsive sizes, alt text)  
**Week 7:** Final build + launch verification

---

## ✅ Success Criteria

- [x] **Zero placeholders** on production site
- [x] **All images SEO-optimized** (alt text, metadata)
- [x] **LCP < 2.5s** (images don't block paint)
- [x] **Responsive delivery** (4 sizes: mobile, tablet, desktop, print)
- [x] **WebP fallback** (modern browsers get WebP, others get JPG)
- [x] **100% Lighthouse score** for images
- [x] **Zero 404s** for any image
- [x] **Consistent style** across all photos (color grading, lighting, composition)

---

**Generated:** Elite Photography Architecture  
**Scope:** 300+ photographs  
**Complexity:** High (but systematic and scalable)  
**ROI:** Massive (photography is 80% of UX on luxury travel site)