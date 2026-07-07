// data/photoMetadata.ts
// Single source of truth for all 300+ photographs across Sawla Tours
// Generated: June 9, 2026

export interface PhotoMetadata {
  filename: string
  slug: string
  title: string
  alt: string                           // SEO-optimized alt text (80-120 chars)
  caption?: string                      // Optional display caption
  credit?: string                       // Photographer/source attribution
  location?: string                     // Geographic context
  category: 'destination' | 'tour' | 'species' | 'guide' | 'moments' | 'people' | 'camp' | 'page'
  tags: string[]                        // Searchable keywords
  width: number
  height: number
  aspectRatio: '16:9' | '4:3' | '1:1' | '3:2'
  usage: string[]                       // Where this image is used (e.g., ['destinations-hub', 'destination-page'])
  webpVersion?: boolean                 // Whether .webp variant exists
}

// ═══════════════════════════════════════════════════════════════════════════

export const PHOTO_INDEX: Record<string, PhotoMetadata> = {
  // ───── HERO VIDEO POSTERS (Hub Pages) ─────
  'home-hero-poster': {
    filename: 'home-hero-poster.jpg',
    slug: 'home-hero',
    title: 'Ethiopia Mountain Landscape',
    alt: 'Misty green mountains of Ethiopia with traditional villages nestled in valleys',
    caption: 'The verdant highlands of Ethiopia, home to 2000 years of history and untouched wilderness.',
    credit: 'Sawla Tours Photography',
    location: 'Ethiopian Highlands',
    category: 'page',
    tags: ['hero', 'landscape', 'mountains', 'homepage', 'cinematic'],
    width: 1920,
    height: 1080,
    aspectRatio: '16:9',
    usage: ['home-hero-video'],
    webpVersion: true,
  },

  'destinations-hub-hero': {
    filename: 'destinations-hub-hero.jpg',
    slug: 'destinations-hub-hero',
    title: 'Lalibela Church Complex at Sunset',
    alt: 'Golden hour lighting on the rock-hewn churches of Lalibela, Ethiopia\'s holiest site',
    caption: 'The sacred churches of Lalibela, carved into solid rock 900 years ago.',
    credit: 'Sawla Tours Photography',
    location: 'Lalibela, Amhara Region',
    category: 'destination',
    tags: ['destinations-hub', 'hero', 'historic', 'sacred', 'architectural'],
    width: 1920,
    height: 1080,
    aspectRatio: '16:9',
    usage: ['destinations-hub-hero-video'],
    webpVersion: true,
  },

  'tours-hub-hero': {
    filename: 'tours-hub-hero.jpg',
    slug: 'tours-hub-hero',
    title: 'Trekking in Simien Mountains',
    alt: 'Trekkers with guides ascending stone paths through Simien Mountains\' dramatic escarpment terrain',
    caption: 'Adventure beckons in Ethiopia\'s most dramatic mountain range.',
    credit: 'Sawla Tours Photography',
    location: 'Simien Mountains National Park',
    category: 'tour',
    tags: ['tours-hub', 'adventure', 'trekking', 'mountains', 'hero'],
    width: 1920,
    height: 1080,
    aspectRatio: '16:9',
    usage: ['tours-hub-hero-video'],
    webpVersion: true,
  },

  'guide-hub-hero': {
    filename: 'guide-hub-hero.jpg',
    slug: 'guide-hub-hero',
    title: 'Field Guide in Ethiopian Highlands',
    alt: 'Knowledgeable Ethiopian guide pointing out geological features to travelers on a mountain trail',
    caption: 'Expert guides bring Ethiopia\'s stories to life through lived experience.',
    credit: 'Sawla Tours Photography',
    location: 'Ethiopian Highlands',
    category: 'guide',
    tags: ['guide-hub', 'education', 'nature', 'guide', 'storytelling'],
    width: 1920,
    height: 1080,
    aspectRatio: '16:9',
    usage: ['guide-hub-hero-video'],
    webpVersion: true,
  },

  // ───── STATIC PAGES ─────

  'about-team-hero': {
    filename: 'about-team-hero.jpg',
    slug: 'about-team',
    title: 'Sawla Tours Team in Addis Ababa',
    alt: 'The Sawla Tours team of travel specialists, guides, and drivers gathered in the Addis Ababa office',
    caption: 'Since 2009, our team of Ethiopian experts has been crafting unforgettable journeys.',
    credit: 'Sawla Tours',
    location: 'Addis Ababa, Ethiopia',
    category: 'people',
    tags: ['team', 'about', 'office', 'people'],
    width: 1920,
    height: 1080,
    aspectRatio: '16:9',
    usage: ['about-us-page'],
    webpVersion: true,
  },

  'about-founder-portrait': {
    filename: 'about-founder-portrait.jpg',
    slug: 'about-founder',
    title: 'Sawla Tours Founder Portrait',
    alt: 'Portrait of the founder of Sawla Tours, an Ethiopian travel entrepreneur with 15+ years experience',
    caption: 'Founder & visionary',
    credit: 'Sawla Tours',
    location: 'Addis Ababa, Ethiopia',
    category: 'people',
    tags: ['founder', 'about', 'portrait', 'leadership'],
    width: 400,
    height: 400,
    aspectRatio: '1:1',
    usage: ['about-us-page'],
    webpVersion: true,
  },

  'about-office-addis': {
    filename: 'about-office-addis.jpg',
    slug: 'about-office',
    title: 'Sawla Tours Addis Ababa Office',
    alt: 'Interior of Sawla Tours\' office in Addis Ababa showing planning desks, maps, and travel memorabilia',
    caption: 'Our headquarters, where every journey is meticulously planned.',
    credit: 'Sawla Tours',
    location: 'Addis Ababa, Ethiopia',
    category: 'page',
    tags: ['office', 'about', 'headquarters', 'addis-ababa'],
    width: 800,
    height: 600,
    aspectRatio: '4:3',
    usage: ['about-us-page'],
    webpVersion: true,
  },

  'about-cta-ethiopia-landscape': {
    filename: 'about-cta-ethiopia-landscape.jpg',
    slug: 'about-cta-landscape',
    title: 'Ethiopia Landscape CTA Background',
    alt: 'Expansive view of the Ethiopian highlands with terraced agriculture, forests, and morning mist',
    caption: undefined,
    credit: 'Sawla Tours Photography',
    location: 'Ethiopian Highlands',
    category: 'page',
    tags: ['cta', 'landscape', 'background', 'about'],
    width: 1200,
    height: 800,
    aspectRatio: '3:2',
    usage: ['about-us-cta-section'],
    webpVersion: true,
  },

  'why-travel-hero': {
    filename: 'why-travel-hero.jpg',
    slug: 'why-travel-hero',
    title: 'Cultural Exchange in Omo Valley',
    alt: 'Tourists and Omo Valley tribal members sharing a moment of genuine cultural connection',
    caption: 'Travel with purpose. Encounter real people, real stories, real Ethiopia.',
    credit: 'Sawla Tours Photography',
    location: 'Omo Valley, Ethiopia',
    category: 'page',
    tags: ['cultural', 'authentic', 'community', 'why-travel'],
    width: 1920,
    height: 1080,
    aspectRatio: '16:9',
    usage: ['why-travel-with-sawla-tours-page'],
    webpVersion: true,
  },

  'how-we-work-hero': {
    filename: 'how-we-work-hero.jpg',
    slug: 'how-we-work-hero',
    title: 'Planning Session with Travel Specialist',
    alt: 'Sawla Tours travel specialist discussing custom itinerary options with clients at office',
    caption: 'Bespoke. Flexible. Responsive.',
    credit: 'Sawla Tours',
    location: 'Addis Ababa, Ethiopia',
    category: 'page',
    tags: ['process', 'planning', 'specialist', 'how-we-work'],
    width: 1920,
    height: 1080,
    aspectRatio: '16:9',
    usage: ['how-we-work-page'],
    webpVersion: true,
  },

  'responsible-hero': {
    filename: 'responsible-hero.jpg',
    slug: 'responsible-hero',
    title: 'Community-Based Tourism in Action',
    alt: 'Local community members and tourists collaborating on a community-development project together',
    caption: 'Travel that gives back. Every journey supports local communities.',
    credit: 'Sawla Tours',
    location: 'Community Project Site, Ethiopia',
    category: 'page',
    tags: ['sustainability', 'community', 'responsible', 'social-impact'],
    width: 1920,
    height: 1080,
    aspectRatio: '16:9',
    usage: ['responsible-travel-page'],
    webpVersion: true,
  },

  'guides-hero': {
    filename: 'guides-hero.jpg',
    slug: 'guides-hero',
    title: 'Licensed Ethiopian Field Guides',
    alt: 'Team of licensed Ethiopian guides in field uniforms with binoculars and maps',
    caption: 'Meet the experts who live the stories.',
    credit: 'Sawla Tours',
    location: 'Ethiopian Highlands',
    category: 'people',
    tags: ['guides', 'team', 'expertise', 'field-based'],
    width: 1920,
    height: 1080,
    aspectRatio: '16:9',
    usage: ['meet-our-guides-page'],
    webpVersion: true,
  },

  'drivers-hero': {
    filename: 'drivers-hero.jpg',
    slug: 'drivers-hero',
    title: 'Trusted Ethiopian Drivers',
    alt: 'Professional Ethiopian drivers standing beside 4WD vehicles ready for a journey through rough terrain',
    caption: 'Safe. Skilled. Trusted.',
    credit: 'Sawla Tours',
    location: 'Ethiopia',
    category: 'people',
    tags: ['drivers', 'safety', 'expertise', 'transportation'],
    width: 1920,
    height: 1080,
    aspectRatio: '16:9',
    usage: ['meet-our-guides-page'],
    webpVersion: true,
  },

  'specialists-hero': {
    filename: 'specialists-hero.jpg',
    slug: 'specialists-hero',
    title: 'Travel Specialists at Work',
    alt: 'Sawla Tours travel specialists collaborating at planning desks with maps, notes, and itineraries',
    caption: 'Every detail matters. Every journey is unique.',
    credit: 'Sawla Tours',
    location: 'Addis Ababa, Ethiopia',
    category: 'people',
    tags: ['specialists', 'planning', 'expertise', 'team'],
    width: 1920,
    height: 1080,
    aspectRatio: '16:9',
    usage: ['meet-our-guides-page'],
    webpVersion: true,
  },

  'camps-hero': {
    filename: 'camps-hero.jpg',
    slug: 'camps-hero',
    title: 'Mobile Tented Camp Luxury',
    alt: 'Well-appointed luxury safari tents under acacia trees with mountain views in background',
    caption: 'Comfort meets wilderness. Luxury under the stars.',
    credit: 'Sawla Tours Photography',
    location: 'Mobile Camp Site, Ethiopia',
    category: 'camp',
    tags: ['camps', 'accommodation', 'luxury', 'wilderness'],
    width: 1920,
    height: 1080,
    aspectRatio: '16:9',
    usage: ['mobile-tented-camps-page'],
    webpVersion: true,
  },

  'camp-setup-overview': {
    filename: 'camp-setup-overview.jpg',
    slug: 'camp-setup',
    title: 'Mobile Camp Setup Overview',
    alt: 'Aerial view of a fully set up Sawla Tours mobile tented camp with dining pavilion and guest tents',
    caption: 'Camp life is part of the adventure.',
    credit: 'Sawla Tours Photography',
    location: 'Mobile Camp Site, Ethiopia',
    category: 'camp',
    tags: ['camps', 'setup', 'overview', 'accommodation'],
    width: 800,
    height: 600,
    aspectRatio: '4:3',
    usage: ['mobile-tented-camps-page'],
    webpVersion: true,
  },

  'contact-hero-specialist-planning': {
    filename: 'contact-hero-specialist-planning.jpg',
    slug: 'contact-hero-specialist',
    title: 'Specialist Planning Your Journey',
    alt: 'Friendly Sawla Tours specialist gesturing to maps and itineraries during consultation',
    caption: 'Ready to plan? Our team responds within 24 hours.',
    credit: 'Sawla Tours',
    location: 'Addis Ababa, Ethiopia',
    category: 'page',
    tags: ['contact', 'planning', 'consultation', 'specialist'],
    width: 1920,
    height: 1080,
    aspectRatio: '16:9',
    usage: ['contact-pages'],
    webpVersion: true,
  },

  'contact-cta-coffee-ceremony': {
    filename: 'contact-cta-coffee-ceremony.jpg',
    slug: 'contact-cta-coffee',
    title: 'Traditional Ethiopian Coffee Ceremony',
    alt: 'Hands serving traditional Ethiopian coffee in a ceremonial setting with aromatic incense',
    caption: undefined,
    credit: 'Sawla Tours Photography',
    location: 'Ethiopia',
    category: 'page',
    tags: ['culture', 'cta', 'coffee', 'tradition', 'hospitality'],
    width: 1200,
    height: 800,
    aspectRatio: '3:2',
    usage: ['contact-cta-section'],
    webpVersion: true,
  },

  'home-sawla-films-hero': {
    filename: 'home-sawla-films-hero.jpg',
    slug: 'home-sawla-films',
    title: 'Sawla Films Documentary Cinema',
    alt: 'Cinematic film production shot showing Sawla Films crew and equipment on location in Ethiopia',
    caption: undefined,
    credit: 'Sawla Films',
    location: 'Ethiopia',
    category: 'page',
    tags: ['sawla-films', 'video', 'documentary', 'cinema', 'production'],
    width: 1920,
    height: 1080,
    aspectRatio: '16:9',
    usage: ['homepage-sawla-films-section'],
    webpVersion: true,
  },

  'moments-hub-hero': {
    filename: 'moments-hub-hero.jpg',
    slug: 'moments-hub-hero',
    title: 'Timkat Festival Celebration',
    alt: 'Crowds of pilgrims in colorful traditional attire celebrating Timkat (Epiphany) festival in Lalibela',
    caption: 'Capture unforgettable moments. Experience Ethiopia\'s vibrant festivals.',
    credit: 'Sawla Tours Photography',
    location: 'Lalibela, Ethiopia',
    category: 'moments',
    tags: ['moments-hub', 'festival', 'celebration', 'culture', 'timkat'],
    width: 1920,
    height: 1080,
    aspectRatio: '16:9',
    usage: ['sawla-moments-hub-page'],
    webpVersion: true,
  },

  'species-hub-hero': {
    filename: 'species-hub-hero.jpg',
    slug: 'species-hub-hero',
    title: 'Ethiopia\'s Endemic Wildlife',
    alt: 'Gelada monkey on Simien Mountains plateau overlooking dramatic escarpment landscape',
    caption: 'Witness species found nowhere else on Earth.',
    credit: 'Sawla Tours Photography',
    location: 'Simien Mountains, Ethiopia',
    category: 'species',
    tags: ['species', 'wildlife', 'endemic', 'conservation'],
    width: 1920,
    height: 1080,
    aspectRatio: '16:9',
    usage: ['ethiopia-wildlife-hub-page'],
    webpVersion: true,
  },

  'ethiopia-map-regions': {
    filename: 'ethiopia-map-regions.jpg',
    slug: 'ethiopia-map',
    title: 'Ethiopia Regions Map',
    alt: 'Detailed map of Ethiopia highlighting major regions, destinations, and geographical features',
    caption: undefined,
    credit: 'Sawla Tours',
    location: 'Ethiopia',
    category: 'page',
    tags: ['map', 'geography', 'regions', 'reference'],
    width: 1200,
    height: 800,
    aspectRatio: '3:2',
    usage: ['reference-pages', 'guides'],
    webpVersion: false,
  },

  // ───── DESTINATION IMAGES (8 destinations × 3-4 images each) ─────
  // To be populated with specific destination photos
  // Pattern: dest-{slug}-{variant}.jpg

  // ───── TOUR IMAGES (6 styles + 36 itineraries) ─────
  // Pattern: tour-hub-{style-slug}.jpg for style cards
  // Pattern: tour-{itinerary-slug}-hero.jpg for itinerary pages

  // ───── SPECIES IMAGES (7 species × 2 images) ─────
  // Pattern: species-{slug}-portrait.jpg and species-{slug}-habitat.jpg

  // ───── FIELD GUIDE IMAGES (15 guides × 2 images) ─────
  // Pattern: guide-{slug}-1.jpg, guide-{slug}-2.jpg

  // ───── SAWLA MOMENTS IMAGES (9 moments × 3 images) ─────
  // Pattern: moments-{slug}-hero.jpg, moments-{slug}-body-1.jpg, moments-{slug}-body-2.jpg
}

// Export convenience functions
export function getPhoto(slug: string): PhotoMetadata | undefined {
  return PHOTO_INDEX[slug]
}

export function getPhotosByCategory(category: PhotoMetadata['category']): PhotoMetadata[] {
  return Object.values(PHOTO_INDEX).filter(photo => photo.category === category)
}

export function getPhotosByUsage(usage: string): PhotoMetadata[] {
  return Object.values(PHOTO_INDEX).filter(photo => photo.usage.includes(usage))
}

export function getPhotosByTag(tag: string): PhotoMetadata[] {
  return Object.values(PHOTO_INDEX).filter(photo => photo.tags.includes(tag))
}
