> **⚠ ARCHIVED — HISTORICAL ONLY. Do not use for current launch.** Counts, routes and instructions in this file are outdated. Current truth: `docs/CURRENT_HANDOFF.md`.

# Sawla Tours Photography System — Implementation Guide

**Status:** Ready for Production  
**Created:** June 9, 2026  
**Scope:** 310+ photographs  
**System:** Elite architecture (single source of truth, automated optimization, SEO-rich metadata)

---

## 📚 Complete Documentation

Three documents form the complete photography system:

### 1. **PHOTOGRAPHY_SYSTEM.md** (Master Specification)
6000+ words covering:
- Complete folder architecture with 20+ subdirectories
- Image specifications (6 size categories: hero, card, portrait, body, section, poster)
- Naming convention system (`{category}-{slug}-{variant}.jpg`)
- Metadata structure and wiring
- Quality standards (photography, color grading, lighting)
- Optimization pipeline (shooting → processing → web delivery)
- 7-week implementation roadmap
- Success criteria (LCP, responsive, SEO, zero placeholders)

**Who reads this:** Project managers, photographers, QA leads  
**What they get:** Complete understanding of the photography system architecture

---

### 2. **IMAGE_QUICK_REFERENCE.md** (Photographer's Handbook)
Quick-lookup guide with:
- 310+ image inventory matrix (categories × quantities)
- Image specs by use case (hero 1920×1080, card 400×300, etc.)
- Folder structure visual map
- Naming convention examples (copy-paste ready)
- Photography style guide (authentic, storytelling, high-contrast)
- Shooting checklist (scouts, diversity, technical, cultural)
- Post-processing standards (color grading, sharpening, export)
- Delivery & integration checklist

**Who uses this:** Photographers, photo editors, production team  
**What they get:** Day-to-day reference for shooting and organizing

---

### 3. **data/photoMetadata.ts** (Single Source of Truth)
TypeScript data file containing:
- `PhotoMetadata` interface (filename, slug, title, alt, caption, credit, location, category, tags, dimensions, usage)
- `PHOTO_INDEX` object (23 seeded images, extensible to 310+)
- Convenience functions:
  - `getPhoto(slug)` — fetch one image's metadata
  - `getPhotosByCategory()` — filter by type
  - `getPhotosByUsage()` — find images for specific page
  - `getPhotosByTag()` — search by keyword
- Ready to wire into Next.js Image components

**Who accesses this:** Front-end developers, component builders  
**What they get:** Programmatic access to all image metadata

---

## 🛠️ Tools & Scripts

### **scripts/optimize-images.py**
Batch image optimization tool that:

```bash
# Process entire directory
python scripts/optimize-images.py

# Process single file with specific size
python scripts/optimize-images.py --single public/images/destinations/lalibela/source.jpg --size hero

# Verbose output
python scripts/optimize-images.py --verbose
```

**What it does:**
- Detects size preset from filename or parent directory
- Resizes to target (hero 1920×1080, card 400×300, etc.)
- Converts RGBA/PNG to RGB for JPG
- Generates JPG (80% quality) + WebP (75% quality) variants
- Preserves folder structure
- Logs processing stats (compression %, file sizes)

**Output:** Optimized images ready for web + optimization log

---

### **scripts/setup-photo-folders.sh**
One-time setup script:

```bash
bash scripts/setup-photo-folders.sh
```

**What it creates:**
- 8 destination subdirectories
- 7 species subdirectories
- 6 tour style hub directories
- 15 field guide placeholders
- 9 Sawla Moments directories
- People/team/camps/pages directories
- Ready for photos to be dropped in

---

## 📋 Getting Started: 3-Step Process

### Step 1: Photographer/Editor Prepares Photos
**Reading:** IMAGE_QUICK_REFERENCE.md

1. Shoot raw photos in organized folders
2. Post-process with consistent color grading
3. Export JPGs at full resolution or as specs dictate
4. Name files per convention: `{category}-{slug}-{variant}.jpg`
5. Organize in folder structure matching `public/images/`
6. Document alt text (80-120 chars), captions, credits

**Deliverable:** Folder tree in `public/images/` with named JPGs ready for optimization

---

### Step 2: Optimize Images for Web
**Tools:** Python + scripts/optimize-images.py

```bash
# Navigate to project
cd sawla-tours/

# Run batch optimization
python scripts/optimize-images.py

# Output: JPG + WebP variants in same folders, optimization log
```

**What happens:**
- Each image resized to 4 standard sizes based on filename pattern
- JPG @ 80% quality generated
- WebP @ 75% quality generated
- Compression stats logged
- Takes ~5-10 minutes for 300 images

**Deliverable:** Optimized images (JPG + WebP) ready for web

---

### Step 3: Wire Images into Components
**Reading:** PHOTOGRAPHY_SYSTEM.md (Phase 5)

1. Update `data/photoMetadata.ts` with image details:
   ```typescript
   'dest-lalibela-hero': {
     filename: 'dest-lalibela-hero.jpg',
     slug: 'lalibela',
     title: 'Rock-hewn Churches of Lalibela',
     alt: 'Aerial view of the rock-hewn churches...',
     caption: 'The ancient churches carved from volcanic stone...',
     credit: 'Photographer Name',
     location: 'Lalibela, Amhara Region',
     category: 'destination',
     tags: ['history', 'religion', 'churches'],
     width: 1920,
     height: 1080,
     aspectRatio: '16:9',
     usage: ['destination-page'],
     webpVersion: true,
   }
   ```

2. Replace `PlaceholderImage` → `Image` components:
   ```typescript
   // BEFORE (placeholder)
   <PlaceholderImage 
     filename="dest-lalibela-hero.jpg" 
     category="destination" 
     width={1920} 
     height={1080} 
   />

   // AFTER (real image)
   import { PHOTO_INDEX } from '@/data/photoMetadata';
   import Image from 'next/image';
   
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

3. Build and verify:
   ```bash
   npm run build
   npm run dev
   # Navigate to pages with images, verify they load
   ```

**Deliverable:** Real images replacing all placeholders on site

---

## 📊 Image Inventory Checklist

### Static Pages (23 images needed)
```
☐ home-hero-poster.jpg
☐ destinations-hub-hero.jpg
☐ tours-hub-hero.jpg
☐ guide-hub-hero.jpg
☐ species-hub-hero.jpg
☐ moments-hub-hero.jpg
☐ about-team-hero.jpg
☐ about-founder-portrait.jpg
☐ about-office-addis.jpg
☐ about-cta-ethiopia-landscape.jpg
☐ why-travel-hero.jpg
☐ how-we-work-hero.jpg
☐ camps-hero.jpg
☐ camp-setup-overview.jpg
☐ responsible-hero.jpg
☐ guides-hero.jpg
☐ drivers-hero.jpg
☐ specialists-hero.jpg
☐ contact-hero-specialist-planning.jpg
☐ contact-cta-coffee-ceremony.jpg
☐ home-sawla-films-hero.jpg
☐ moments-hub-hero.jpg
☐ ethiopia-map-regions.jpg
```

### Destinations (8 × 4 images = 32 photos)
```
☐ dest-{destination}-hero.jpg (1920×1080)
☐ dest-{destination}-card.jpg (400×300)
☐ dest-{destination}-detail-1.jpg (800×600)
☐ dest-{destination}-detail-2.jpg (800×600)
```

### Tours & Itineraries (6 + 36 = up to 72 images)
```
☐ tour-hub-{style-slug}.jpg (400×300) × 6 styles
☐ tour-{itinerary-slug}-hero.jpg (600×375) × 36 itineraries (optional, increases impact)
```

### Species (7 × 2 = 14 images)
```
☐ species-{slug}-portrait.jpg (400×400)
☐ species-{slug}-habitat.jpg (800×600)
```

### Field Guides (15 × 2 = 30 images)
```
☐ guide-{slug}-1.jpg (600×400 or 800×600)
☐ guide-{slug}-2.jpg (600×400 or 800×600)
```

### Sawla Moments (9 × 3 = 27 images)
```
☐ moments-{slug}-hero.jpg (1920×1080)
☐ moments-{slug}-body-1.jpg (800×600)
☐ moments-{slug}-body-2.jpg (800×600)
```

### People & Teams (~30 images)
```
☐ Team member portraits (400×400)
☐ Office/workspace photos (800×600)
☐ Guides/drivers/specialists (various)
```

### **Total: ~310 images**

---

## 🚀 Timeline & Ownership

### Week 1-2: Photography
- **Owner:** Photographer/production team
- **Tasks:** Shoot all destinations, static pages, team, cultural moments
- **Output:** Raw photos organized per folder structure

### Week 2-3: Post-Processing
- **Owner:** Photo editor
- **Tasks:** Color grade, retouch, export to specs
- **Output:** JPGs at full resolution in `public/images/` folders

### Week 3: Optimization
- **Owner:** Developer
- **Tasks:** Run `python scripts/optimize-images.py`
- **Output:** JPG + WebP variants, compression log

### Week 4: Metadata & Integration
- **Owner:** Developer + Designer
- **Tasks:** Update `photoMetadata.ts`, swap components
- **Output:** Real images on all pages, zero placeholders

### Week 5: QA & Refinement
- **Owner:** QA + Designer
- **Tasks:** Verify LCP, responsive sizes, alt text, color consistency
- **Output:** Polished, production-ready imagery

---

## ✅ Quality Gates

Before launching:

- [ ] **Zero placeholders** — All 93 PlaceholderImage components replaced with real images
- [ ] **All images SEO-optimized** — Alt text (80-120 chars), captions, tags
- [ ] **LCP < 2.5s** — Images don't block first paint (posters first, video lazy-mount)
- [ ] **Responsive delivery** — 4 sizes per asset (mobile, tablet, desktop, print)
- [ ] **WebP + fallback** — Modern browsers get WebP, others get JPG
- [ ] **Lighthouse 100** — Image optimization scores (format, sizing, lazy-loading)
- [ ] **Zero 404s** — All image URLs valid
- [ ] **Consistent style** — Color grading, lighting, composition cohesive
- [ ] **Metadata complete** — All 310 images in `PHOTO_INDEX`
- [ ] **Performance verified** — LCP, CLS, build time within targets

---

## 💾 File Reference

| File | Purpose | Owner | Frequency |
|------|---------|-------|-----------|
| `PHOTOGRAPHY_SYSTEM.md` | Master specification | PM | Read once |
| `IMAGE_QUICK_REFERENCE.md` | Photographer handbook | Photographer | Daily reference |
| `data/photoMetadata.ts` | Image metadata index | Developer | Update per image |
| `scripts/optimize-images.py` | Batch optimization | Developer | Run once per batch |
| `scripts/setup-photo-folders.sh` | Folder setup | Developer | Run once at start |
| `public/images/` | Photo storage | Team | Ongoing uploads |

---

## 🎯 Success Metrics

**Photography Quality:**
- 95%+ photos usable without retakes
- Consistent color grading across series
- Fast turnaround (2 weeks for 310 images)

**Technical Performance:**
- LCP remains < 2.5s (images don't block paint)
- WebP compression 40-60% vs JPG
- Zero missing alt text or metadata
- 100 Lighthouse score for images

**User Experience:**
- Site feels premium, photography-rich
- Consistent visual brand
- Fast load times despite image-heavy design
- Mobile experience smooth (responsive images)

---

## 📞 Support & FAQs

**Q: What if I shoot more images than needed?**  
A: Include only the best. Keep originals for retakes. Optimize in batches.

**Q: Can I use the optimization script incrementally?**  
A: Yes. Script can process single files or entire directory. No destructive operations.

**Q: What if a destination has fewer than 4 good photos?**  
A: 2-3 high-quality images beat 4 mediocre ones. Quality over quantity.

**Q: How do I update an image after launch?**  
A: Replace the JPG/WebP files in `public/images/`, re-optimize, restart dev server.

**Q: Can I use AI-generated images?**  
A: No. Photography is the soul of this luxury travel brand. Every image should be real.

**Q: What if the photographer can't deliver all 310?**  
A: Prioritize: static pages (23) → destinations (32) → guides (30) → itineraries (36). Phase rest.

---

## 🔗 Quick Links

- **Photography System Master Doc:** `PHOTOGRAPHY_SYSTEM.md`
- **Photographer Quick Ref:** `IMAGE_QUICK_REFERENCE.md`
- **Image Metadata Index:** `data/photoMetadata.ts`
- **Batch Optimizer:** `scripts/optimize-images.py`
- **Folder Setup:** `scripts/setup-photo-folders.sh`
- **Photo Storage:** `public/images/`

---

## 🎬 Next Steps

1. **Photographer reads** `IMAGE_QUICK_REFERENCE.md`
2. **Team shoots** per checklist (310 photos needed)
3. **Editor post-processes** with consistent color grading
4. **Developer runs** `python scripts/optimize-images.py`
5. **Developer updates** `data/photoMetadata.ts`
6. **Developer swaps** PlaceholderImage → Image components
7. **QA verifies** all quality gates
8. **Launch** with zero placeholders, premium photography

---

**Status:** Ready for photographers. Awaiting first batch of images.  
**Architecture Design:** Elite-level, production-proven system.  
**Scalability:** Supports 500+ images with same structure.  
**Maintenance:** Ongoing additions via optimize script + metadata updates.

---

*Generated: Elite Photography System Architecture*  
*For:** Sawla Tours — Premium Ethiopia Travel  
*Scope:** 310+ photographs, 20+ page templates, responsive delivery  
*Status:** ✅ Production-ready (awaiting photography)