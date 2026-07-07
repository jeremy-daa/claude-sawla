import { PREMIUM_DESTINATIONS } from './destinationsPremium'
import { FIELD_GUIDE_SLUGS as PREMIUM_FIELD_GUIDE_SLUGS } from './fieldGuideContent'

// data/siteData.ts
// Sawla Tours — Complete content data for all pages
// Replace placeholder values with verified real data before launch

export const SITE = {
  name: 'Sawla Tours',
  tagline: 'Ethiopia, Crafted by the People Who Know It Best',
  url: 'https://www.sawlatours.com',
  email: 'explore@sawlatours.com',
  phone: '+251 705 783 06',
  phoneE164: '+25170578306',
  whatsapp: 'https://wa.me/25170578306?text=Hi%20Sawla%20Tours%2C%20I%20am%20interested%20in%20planning%20an%20Ethiopia%20trip.',
  address: 'Addis Ababa, Ethiopia',
  founded: '2009',
  social: {
    instagram: 'https://www.instagram.com/sawlatours',
    tiktok: 'https://www.tiktok.com/@sawlatours',
    twitter: 'https://twitter.com/SawlaTours',
    facebook: 'https://www.facebook.com/sawlatours',
    youtube: 'https://www.youtube.com/@sawlafilms',
    tripadvisor: 'https://www.tripadvisor.com/Profile/sawlat',
    google: 'https://share.google/dRQeDJoZWcY8Oicwq',
  },
}

export const NAV_LINKS = [
  {
    label: 'Destinations',
    href: '/ethiopias-popular-destinations',
    children: [
      { label: 'Lalibela', href: '/ethiopias-popular-destinations/lalibela' },
      { label: 'Simien Mountains', href: '/ethiopias-popular-destinations/simien-mountain-national-park' },
      { label: 'Danakil Depression', href: '/ethiopias-popular-destinations/danakil-depression-tour-packages' },
      { label: 'Omo Valley', href: '/ethiopias-popular-destinations/omo-valley-tribes' },
      { label: 'Bale Mountains', href: '/ethiopias-popular-destinations/bale-mountains-national-park' },
      { label: 'Tigray & Gheralta', href: '/ethiopias-popular-destinations/tigray-rock-hewn-churches-historical-sites' },
      { label: 'Gondar', href: '/ethiopias-popular-destinations/gondar' },
      { label: 'Bahir Dar', href: '/ethiopias-popular-destinations/bahir-dar-lake-tana' },
      { label: 'All 18 Destinations →', href: '/ethiopias-popular-destinations' },
    ],
  },
  {
    label: 'Tour Styles',
    href: '/tours-by-experience',
    children: [
      { label: 'Historic & Cultural', href: '/tours-by-experience/historic-cultural-ethiopia-tours' },
      { label: 'Omo Valley & Community', href: '/tours-by-experience/omo-valley-cultural-tours' },
      { label: 'Wildlife & Endemic Mammals', href: '/tours-by-experience/ethiopia-wildlife-tours' },
      { label: 'Adventure & Trekking', href: '/tours-by-experience/ethiopia-adventure-tours' },
      { label: 'Festivals & Faith', href: '/tours-by-experience/ethiopia-festival-tours' },
      { label: 'Birdwatching', href: '/tours-by-experience/ethiopia-birdwatching-tours' },
      { label: 'Photography', href: '/tours-by-experience/ethiopia-photography-tours' },
      { label: 'Special Interest', href: '/tours-by-experience/ethiopia-special-interest-tours' },
      { label: 'Addis Day Tours', href: '/tours-by-experience/addis-ababa-day-tours' },
      { label: 'All Journey Styles →', href: '/tours-by-experience' },
    ],
  },
  {
    label: 'Ethiopia Guide',
    href: '/ethiopia-travel-guide',
    children: [
      { label: 'When to Visit', href: '/ethiopia-travel-guide/when-to-visit-ethiopia' },
      { label: 'How to Plan Your Trip', href: '/ethiopia-travel-guide/how-to-plan-your-trip' },
      { label: 'Visa & Entry', href: '/ethiopia-travel-guide/ethiopia-visa-guide' },
      { label: 'What to Pack', href: '/ethiopia-travel-guide/what-to-pack-for-ethiopia' },
      { label: 'Safety in Ethiopia', href: '/ethiopia-travel-guide/safety-in-ethiopia' },
      { label: 'Planning & Pricing', href: '/planning-and-pricing' },
      { label: 'All Guides →', href: '/ethiopia-travel-guide' },
    ],
  },
  {
    label: 'About',
    href: '/about-us',
    children: [
      { label: 'About Sawla Tours', href: '/about-us' },
      { label: 'Why Travel With Us', href: '/why-travel-with-sawla-tours' },
      { label: 'How We Work', href: '/how-we-work' },
      { label: 'Meet Our Specialists', href: '/meet-our-travel-specialists' },
      { label: 'Meet Our Guides', href: '/meet-our-guides' },
      { label: 'Our Drivers', href: '/meet-our-drivers' },
      { label: 'Traveller Stories', href: '/testimonials' },
      { label: 'Sawla Films', href: '/sawla-films' },
      { label: 'Sawla Foundation', href: '/sawla-foundation' },
      { label: 'Legal & Policies', href: '/legal-and-policies' },
    ],
  },
  { label: 'Sawla Moments', href: '/sawla-moments' },
  { label: 'Trip Finder', href: '/trip-finder' },
]

// ─── DESTINATIONS ────────────────────────────────────────────────────────────

export interface Destination {
  slug: string
  name: string
  region: string
  tagline: string
  heroImage: string
  heroAlt: string
  excerpt: string
  highlights: string[]
  bestTime: string
  duration: string
  difficulty: 'Easy' | 'Moderate' | 'Challenging' | 'Extreme'
  featured: boolean
  metaTitle: string
  metaDescription: string
  primaryKeyword: string
}

/**
 * Destination cards, navigation and sitemap are generated from the same
 * premium source used by the 18 long-form destination pages. This prevents
 * count, slug, metadata and factual-copy drift across the site.
 */
export const DESTINATIONS: Destination[] = PREMIUM_DESTINATIONS.map((destination) => ({
  slug: destination.slug,
  name: destination.shortName,
  region: destination.region,
  tagline: destination.tagline,
  heroImage: `https://placehold.co/1920x1080/E6F1FB/0C447C?text=dest-${destination.slug}-hero`,
  heroAlt: destination.image.heroAlt,
  excerpt: destination.dek,
  highlights: destination.attractions.slice(0, 6).map((item) => item.title),
  bestTime: destination.bestTime,
  duration: destination.idealStay,
  difficulty: destination.difficulty,
  featured: destination.featured,
  metaTitle: destination.seo.title,
  metaDescription: destination.seo.description,
  primaryKeyword: destination.seo.primaryKeyword,
}))

// ─── TOUR STYLES ─────────────────────────────────────────────────────────────

export interface TourStyle {
  slug: string
  name: string
  tagline: string
  description: string
  heroImage: string
  heroAlt: string
  icon: string
  color: string
}

export const TOUR_STYLES: TourStyle[] = [
  {
    slug: 'historic-cultural-ethiopia-tours',
    name: 'Heritage Pilgrimage',
    tagline: 'Ancient churches, royal cities, timeless faith',
    description: 'Follow Ethiopia\'s 3,000-year thread of civilisation across Lalibela, Gondar, Axum, Lake Tana, and Addis Ababa. These journeys are built for travelers who want to understand history, not just photograph it.',
    heroImage: 'https://placehold.co/1920x1080/EAF3DE/27500A?text=tour-historic-hero',
    heroAlt: 'Lalibela priest with golden cross at rock-hewn church, Ethiopia',
    icon: '⛪',
    color: '#C4931A',
  },
  {
    slug: 'omo-valley-cultural-tours',
    name: 'Tribal Encounters',
    tagline: 'Living cultures, local interpretation, respectful access',
    description: 'Southern Ethiopia\'s cultural mosaic is unlike anywhere on earth. Hamar, Karo, Mursi, Daasanach — each community has its own language, ceremony, and relationship with the land. These journeys require a guide, patience, and respect.',
    heroImage: 'https://placehold.co/1920x1080/EAF3DE/27500A?text=tour-tribal-hero',
    heroAlt: 'Omo Valley community encounter with Karo people, southern Ethiopia',
    icon: '👁',
    color: '#C4931A',
  },
  {
    slug: 'ethiopia-wildlife-tours',
    name: 'Wildlife & Birding',
    tagline: 'Endemic species, afroalpine habitats, specialist guides',
    description: 'Ethiopia holds an exceptional concentration of endemic wildlife, including the Ethiopian wolf, gelada, Walia ibex and Stresemann\'s bushcrow. These journeys use specialist guides, patient field time and habitat-led route design rather than checklist promises.',
    heroImage: 'https://placehold.co/1920x1080/EAF3DE/27500A?text=tour-wildlife-hero',
    heroAlt: 'Ethiopian wolf on Sanetti Plateau, Bale Mountains National Park',
    icon: '🐺',
    color: '#C4931A',
  },
  {
    slug: 'ethiopia-adventure-tours',
    name: 'Frontier Adventure',
    tagline: 'Danakil, Simien trekking, remote routes, mobile camps',
    description: 'Ethiopia\'s extremes—among Africa\'s lowest and hottest landscapes, high Simien summits and remote southern routes—require preparation, logistics and a team with current field knowledge. These journeys go beyond the standard circuit without overstating access.',
    heroImage: 'https://placehold.co/1920x1080/EAF3DE/27500A?text=tour-adventure-hero',
    heroAlt: 'Trekkers on Simien Mountains ridgeline with dramatic escarpment below',
    icon: '⛰',
    color: '#C4931A',
  },
  {
    slug: 'ethiopia-festival-tours',
    name: 'Festival Immersion',
    tagline: 'Timkat, Meskel, Enkutatash — timed to the calendar',
    description: 'Ethiopia\'s religious and cultural calendars shape the year. Timkat in January, Meskel in September and Enkutatash in September each offer a different, deeply meaningful window into public faith, tradition and community life.',
    heroImage: 'https://placehold.co/1920x1080/EAF3DE/27500A?text=tour-festival-hero',
    heroAlt: 'Timkat Ethiopian Orthodox Epiphany procession in Gondar',
    icon: '🕯',
    color: '#C4931A',
  },
  {
    slug: 'ethiopia-photography-tours',
    name: 'Cinematic Journey',
    tagline: 'Photography expeditions, filming logistics, Sawla Films access',
    description: 'Ethiopia is visually extraordinary — and it rewards photographers who have the right support and the right pace. Sawla Films, our in-house documentary division, means we understand timing, light, permissions, and the difference between a snapshot and a frame.',
    heroImage: 'https://placehold.co/1920x1080/EAF3DE/27500A?text=tour-photo-hero',
    heroAlt: 'Sawla Films camera operator filming sunrise in Simien Mountains, Ethiopia',
    icon: '🎬',
    color: '#C4931A',
  },
  {
    slug: 'ethiopia-birdwatching-tours',
    name: 'Birdwatching Tours',
    tagline: 'Endemics, migrants and an entire continent of elevation',
    description: 'From highland escarpments and Afroalpine moorland to Rift Valley lakes, acacia drylands, southern plains and southwest forest, Ethiopia compresses an exceptional range of bird habitats into one country. Routes are built around realistic travel times, early starts, localized species, seasonal migrants and the expertise of Ethiopian bird guides — not around an inflated checklist promise.',
    heroImage: 'https://placehold.co/1920x1080/EAF3DE/27500A?text=tour-birding-hero',
    heroAlt: 'Birder observing an endemic species on the Sanetti Plateau, Bale Mountains',
    icon: '🕊',
    color: '#54707C',
  },
  {
    slug: 'ethiopia-special-interest-tours',
    name: 'Coffee, Culinary & Special-Interest Journeys',
    tagline: 'Follow one question deeper',
    description: 'Follow arabica coffee from forest and farm to washing station and cup. Learn how fasting traditions shape Ethiopian cuisine. Trace human origins, Rift geology, ancient architecture, textiles, medicinal plants, music, agriculture or contemporary design — journeys built around the right regions, season, guide, expert, permit and pace for the subject.',
    heroImage: 'https://placehold.co/1920x1080/EAF3DE/27500A?text=tour-special-interest-hero',
    heroAlt: 'Coffee farmer sorting freshly picked arabica cherries in Kafa, Ethiopia',
    icon: '☕',
    color: '#6B4F35',
  },
  {
    slug: 'addis-ababa-day-tours',
    name: 'Addis Day Tours, Stopovers & Business Travel',
    tagline: 'Make the hours between flights or meetings count',
    description: 'Use a long layover to understand the capital through museums, coffee and neighborhoods, or coordinate airport assistance, vehicles, guides and meeting logistics around a business visit. Realistic short programs built around flight times, Addis traffic, museum opening hours, altitude and traveler energy.',
    heroImage: 'https://placehold.co/1920x1080/EAF3DE/27500A?text=tour-addis-daytour-hero',
    heroAlt: 'Addis Ababa skyline and Entoto hills at golden hour, Ethiopia',
    icon: '◎',
    color: '#5B536B',
  },
]

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────

export interface Testimonial {
  id: string
  name: string
  country: string
  countryFlag: string
  initials: string
  tripType: string
  quote: string
  fullQuote: string
  useOn: string[]
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'sarah-w-uk',
    name: 'Sarah W.',
    country: 'United Kingdom',
    countryFlag: '🇬🇧',
    initials: 'SW',
    tripType: 'Northern Historic Route',
    quote: 'We felt looked after without feeling managed.',
    fullQuote: 'This was one of the most meaningful journeys we have taken. The churches of Lalibela, the castles of Gondar, and the monasteries around Lake Tana all came alive because of the guides. Sawla Tours balanced history, comfort, and local experience beautifully. We felt looked after without feeling managed.',
    useOn: ['homepage', 'why-travel', 'historic-tours'],
  },
  {
    id: 'thomas-lena-de',
    name: 'Thomas & Lena B.',
    country: 'Germany',
    countryFlag: '🇩🇪',
    initials: 'TB',
    tripType: 'Coffee, Culture & Southern Ethiopia',
    quote: 'It felt like a journey designed by people who truly love their country.',
    fullQuote: 'We wanted a trip that went beyond the famous sites, and Sawla Tours designed exactly that. The coffee experiences, village visits, markets, and landscapes gave us a very rich view of Ethiopia. The team was professional, warm, and flexible. It felt like a journey designed by people who truly love their country.',
    useOn: ['homepage', 'coffee-tours', 'about-us'],
  },
  {
    id: 'maria-l-es',
    name: 'María L.',
    country: 'Spain',
    countryFlag: '🇪🇸',
    initials: 'ML',
    tripType: 'Simien Mountains & Bale Trekking',
    quote: 'Seeing geladas and Ethiopian wolves was a true highlight.',
    fullQuote: 'For mountain lovers, Ethiopia is a dream. The Simien Mountains were dramatic and full of life, while Bale felt wild and peaceful in a different way. Sawla Tours planned the trekking days very well, with good guides and enough flexibility. Seeing geladas and Ethiopian wolves was a true highlight.',
    useOn: ['homepage', 'wildlife-tours', 'simien', 'bale'],
  },
  {
    id: 'emily-r-usa',
    name: 'Emily R.',
    country: 'United States',
    countryFlag: '🇺🇸',
    initials: 'ER',
    tripType: 'Classic Historic Route',
    quote: 'The itinerary felt smooth, personal, and very well thought through.',
    fullQuote: 'Sawla Tours gave us the kind of Ethiopia trip we could never have planned on our own. Lalibela was deeply moving, Gondar was full of history, and every guide helped us understand what we were seeing, not just take photos of it. The itinerary felt smooth, personal, and very well thought through.',
    useOn: ['about-us-main', 'planning-guide', 'enquire'],
  },
  {
    id: 'kenji-m-jp',
    name: 'Kenji M.',
    country: 'Japan',
    countryFlag: '🇯🇵',
    initials: 'KM',
    tripType: 'Danakil Depression & Northern Ethiopia',
    quote: 'That honesty made the journey feel safe, realistic, and very rewarding.',
    fullQuote: 'The Danakil Depression was unlike anywhere I have travelled. It was hot, remote, and powerful, but Sawla Tours prepared us well and managed the logistics carefully. The team explained what was possible and what depended on local conditions. That honesty made the journey feel safe, realistic, and very rewarding.',
    useOn: ['danakil', 'adventure-tours', 'safety-guide'],
  },
  {
    id: 'david-laura-usa',
    name: 'David & Laura M.',
    country: 'United States',
    countryFlag: '🇺🇸',
    initials: 'DM',
    tripType: 'Omo Valley Cultural Tour',
    quote: 'The visits felt respectful, not rushed or staged.',
    fullQuote: 'The Omo Valley was the part of Ethiopia we were most curious about, but also the part we were most nervous to visit. Sawla Tours handled it with real care. The visits felt respectful, not rushed or staged. Our guide explained local customs clearly and helped us approach every community with sensitivity.',
    useOn: ['omo-valley', 'tribal-tours'],
  },
  {
    id: 'helen-c-ca',
    name: 'Helen C.',
    country: 'Canada',
    countryFlag: '🇨🇦',
    initials: 'HC',
    tripType: 'Bale Mountains, Rift Valley & Birding',
    quote: 'The whole journey felt thoughtful and well paced.',
    fullQuote: 'Our wildlife and birding trip with Sawla Tours was excellent. The guides knew where to look, but they also understood that we did not want to rush. Bale Mountains was a highlight, especially the endemic species and the quiet beauty of the highlands. The whole journey felt thoughtful and well paced.',
    useOn: ['wildlife-tours', 'bale', 'birding'],
  },
  {
    id: 'zeynep-k-tr',
    name: 'Zeynep K.',
    country: 'Turkey',
    countryFlag: '🇹🇷',
    initials: 'ZK',
    tripType: 'Omo Valley & Cultural Photography',
    quote: 'I came home with strong photographs, but also a much better understanding.',
    fullQuote: 'The Omo Valley was visually powerful, but Sawla Tours helped us see beyond the images. Our guide constantly reminded us about respect, permission, and context. That made the experience more meaningful. I came home with strong photographs, but also with a much better understanding of the people and places we visited.',
    useOn: ['responsible-travel', 'photography-tours', 'omo-valley'],
  },
  {
    id: 'james-h-uk',
    name: 'James H.',
    country: 'United Kingdom',
    countryFlag: '🇬🇧',
    initials: 'JH',
    tripType: 'Tigray Churches & Highland Trekking',
    quote: 'It felt adventurous but carefully handled.',
    fullQuote: 'The Tigray trekking route was challenging in the best possible way. The landscapes were dramatic, the churches were astonishing, and the pace was just right. Sawla Tours was honest about the walking, the access, and what to expect. That made us trust them even more. It felt adventurous but carefully handled.',
    useOn: ['mobile-camps', 'tigray', 'trekking'],
  },

  // ── VERIFIED CLIENT TESTIMONIALS ──────────────────────────────────────────

  {
    id: 'andrew-bart-usa',
    name: 'Andrew Francis Bart',
    country: 'United States',
    countryFlag: '🇺🇸',
    initials: 'AB',
    tripType: 'Northern Ethiopia, Lalibela & Simien Mountains',
    quote: 'Attending Sunday church service at Bete Giorgis was unforgettable.',
    fullQuote: 'Our journey with the Sawla team was one of the most meaningful travel experiences we have ever had. The guiding was thoughtful, patient, and deeply knowledgeable, especially in Lalibela, where attending Sunday church service at Bete Giorgis was unforgettable. Hearing the prayers, seeing pilgrims dressed in white, and standing beside one of Ethiopia\'s greatest rock-hewn churches was a powerful moment. The Simien Mountains were equally jaw-dropping, with dramatic escarpments, gelada monkeys, and endless views. Sawla\'s guide and driver made the whole journey smooth, safe, and deeply memorable.',
    useOn: ['homepage', 'lalibela', 'simien', 'historic-tours', 'about-us', 'testimonials'],
  },
  {
    id: 'arlen-mclaren-usa',
    name: 'Arlen Tigar Mclaren',
    country: 'United States',
    countryFlag: '🇺🇸',
    initials: 'AM',
    tripType: 'Ethiopia Photography & Cultural Expedition',
    quote: 'The team understood light, timing, patience, and respectful cultural access.',
    fullQuote: 'Sawla Tours created an exceptional photography journey through Ethiopia. The team understood light, timing, patience, and respectful cultural access, which made a huge difference. The colorful market scenes in Lalibela and the dramatic landscapes of Tigray felt like stepping into another world. One of the most unforgettable moments was climbing to Abuna Yemata Guh, an ancient rock-hewn church set high in the cliffs. It was challenging, breathtaking, and completely worth it. The Sawla guide handled everything with calm professionalism and deep local knowledge.',
    useOn: ['photography-tours', 'tigray', 'lalibela', 'testimonials'],
  },
  {
    id: 'alberto-cazes-cl',
    name: 'Alberto Cazes',
    country: 'Chile',
    countryFlag: '🇨🇱',
    initials: 'AC',
    tripType: 'Classic Ethiopia, Omo Valley & Historic Route',
    quote: 'A journey full of beauty, history, and human connection.',
    fullQuote: 'Traveling with Sawla Tours through Ethiopia was unforgettable. The itinerary combined ancient history, living cultures, and extraordinary landscapes in a very thoughtful way. In the north, Lalibela and Axum were deeply spiritual, especially witnessing the atmosphere around St. Mary of Zion Church in Axum. In the south, the Omo Valley gave us a powerful introduction to Ethiopia\'s cultural diversity. The Sawla team organized every detail carefully, and the guide helped us understand each place with respect and sensitivity. It was a journey full of beauty, history, and human connection.',
    useOn: ['homepage', 'omo-valley', 'historic-tours', 'lalibela', 'testimonials'],
  },
  {
    id: 'verona-kite-au',
    name: 'Verona Kite',
    country: 'Australia',
    countryFlag: '🇦🇺',
    initials: 'VK',
    tripType: 'Northern Ethiopia, Tigray & Community Trekking',
    quote: 'The landscape felt almost biblical, with stone villages, farmers, priests, and ancient churches.',
    fullQuote: 'Our Ethiopia trip with Sawla Tours was beautifully arranged from beginning to end. The Sawla guide was excellent, and the driver made us feel safe on every road. One of the highlights was walking through the Tigray countryside during community trekking. The landscape felt almost biblical, with stone villages, farmers, priests, cliffs, and ancient churches scattered across the mountains. Visiting the old churches and meeting local families along the way gave the trip a very personal feeling. Sawla\'s team made Ethiopia feel welcoming, rich, and unforgettable.',
    useOn: ['tigray', 'historic-tours', 'trekking', 'about-us', 'testimonials'],
  },
  {
    id: 'laura-santoro-usa',
    name: 'Laura Suzzanne Santoro',
    country: 'United States',
    countryFlag: '🇺🇸',
    initials: 'LS',
    tripType: 'Ethiopia Cultural Discovery Tour',
    quote: 'This was not just a holiday; it was a deeply human journey.',
    fullQuote: 'This was not just a holiday; it was a deeply human journey. The Sawla team created a beautiful balance between famous historical sites and authentic local experiences. We loved the colorful markets, the church traditions, and the quiet countryside moments between destinations. The visit to Azwa Mariam on Lake Tana was especially memorable, with its beautiful old church paintings and peaceful forest setting. Our guide explained the history, symbolism, and faith behind the paintings in a way that brought everything to life. Sawla Tours gave us a warm, thoughtful, and very well-guided Ethiopia experience.',
    useOn: ['homepage', 'historic-tours', 'bahir-dar', 'about-us', 'testimonials'],
  },
  {
    id: 'amy-jones-usa',
    name: 'Amy Vercler Jones',
    country: 'United States',
    countryFlag: '🇺🇸',
    initials: 'AJ',
    tripType: 'Historic Route, Omo Valley & Photography Journey',
    quote: 'Photographing the Dimi ceremony — color, movement, tradition, and emotion in one powerful moment.',
    fullQuote: 'Sawla Tours delivered an extraordinary Ethiopia journey. From the churches of Lalibela to the communities of the Omo Valley, every part of the trip was handled with care and respect. As a photography-focused traveler, I appreciated how the guide understood timing, cultural etiquette, and patience. One of the most memorable experiences was photographing the Dimi ceremony among the Nyangatom, where color, movement, tradition, and emotion came together in a powerful way. The Sawla team made sure the experience was respectful, well coordinated, and unforgettable.',
    useOn: ['photography-tours', 'omo-valley', 'tribal-tours', 'responsible-travel', 'testimonials'],
  },
  {
    id: 'ismail-ellez-tr',
    name: 'Ismail Ellez',
    country: 'Turkey',
    countryFlag: '🇹🇷',
    initials: 'IE',
    tripType: 'Ethiopia Photography Expedition',
    quote: 'Witnessing a Hamer bull jumping ceremony was one of the most fascinating cultural experiences I have ever seen.',
    fullQuote: 'My photography journey with Sawla Tours was excellent. The team understood what photographers need: good timing, strong local knowledge, flexibility, and respectful access. The Omo Valley was especially powerful, and witnessing a Hamer bull jumping ceremony was one of the most fascinating cultural experiences I have ever seen. The colors, singing, dancing, preparation, and emotion of the event were incredible. Sawla\'s guide handled the situation with great sensitivity and helped us understand the meaning behind the ceremony. It was a very special journey.',
    useOn: ['photography-tours', 'omo-valley', 'tribal-tours', 'testimonials'],
  },
  {
    id: 'keith-blodgett',
    name: 'Keith Master Blodgett',
    country: 'United States',
    countryFlag: '🇺🇸',
    initials: 'KB',
    tripType: 'Ethiopia Wildlife, Landscapes & Culture',
    quote: 'Following the Ethiopian wolf in Bale Mountains was a privilege.',
    fullQuote: 'Sawla Tours organized a rich and rewarding Ethiopia journey full of landscapes, wildlife, culture, and history. The Simien Mountains were absolutely breathtaking, with dramatic cliffs and sweeping views unlike anywhere else. Later, following the Ethiopian wolf in Bale Mountains National Park was another unforgettable highlight. Seeing this rare and beautiful animal in its highland habitat was a privilege. The Sawla guide and driver were professional, knowledgeable, and always attentive. The trip felt adventurous, safe, and deeply rewarding.',
    useOn: ['homepage', 'wildlife-tours', 'simien', 'bale', 'testimonials'],
  },
  {
    id: 'bernadette-schulz-de',
    name: 'Bernadette Schulz',
    country: 'Germany',
    countryFlag: '🇩🇪',
    initials: 'BS',
    tripType: 'Historic Ethiopia & Cultural Highlights',
    quote: 'The journey felt authentic without ever feeling rushed.',
    fullQuote: 'Our Ethiopia trip with Sawla Tours was beautifully organized and very memorable. The guide was knowledgeable, kind, and excellent at explaining Ethiopia\'s history and traditions. Lalibela was a major highlight, especially the old rock-hewn churches and the colorful local market, where we saw daily life, spices, grains, woven baskets, traditional clothing, and people from the surrounding countryside. The journey felt authentic without ever feeling rushed. Sawla\'s team took wonderful care of us and helped us experience Ethiopia with depth and respect.',
    useOn: ['historic-tours', 'lalibela', 'about-us', 'testimonials'],
  },
  {
    id: 'peter-schmid-ch',
    name: 'Peter Schmid',
    country: 'Switzerland',
    countryFlag: '🇨🇭',
    initials: 'PS',
    tripType: 'Northern Ethiopia, Tigray Churches & Simien Mountains',
    quote: 'Climbing to Abuna Yemata Guh — the location, the views, the history were extraordinary.',
    fullQuote: 'Sawla Tours planned a very smooth and rewarding journey through Northern Ethiopia. The Simien Mountains were jaw-dropping, with some of the most dramatic scenery I have seen anywhere. Another unforgettable experience was visiting the ancient rock-hewn churches of Tigray, especially the climb to Abuna Yemata Guh. The location, the views, and the history of the church were extraordinary. The Sawla guide was calm, experienced, and very informative, making even the adventurous parts of the journey feel safe and well managed.',
    useOn: ['historic-tours', 'tigray', 'simien', 'about-us', 'testimonials'],
  },
  {
    id: 'velit-gazel-tr',
    name: 'Velit Gazel',
    country: 'Turkey',
    countryFlag: '🇹🇷',
    initials: 'VG',
    tripType: 'Ethiopia Photography Expedition',
    quote: 'Witnessing the Suri stick fight — intense, powerful, and visually extraordinary.',
    fullQuote: 'Sawla Tours understood exactly what we needed for a photography expedition in Ethiopia. The itinerary was well planned, the timing was excellent, and the team knew how to create strong photographic opportunities without forcing the experience. The markets, landscapes, ceremonies, and portraits were all incredible. One of the most unforgettable moments was witnessing the Suri stick fight, known as Donga. It was intense, powerful, and visually extraordinary. The Sawla guide helped us approach the event respectfully and understand its cultural meaning.',
    useOn: ['photography-tours', 'omo-valley', 'tribal-tours', 'testimonials'],
  },
  {
    id: 'caecilie-kowald-de',
    name: 'Cäcilie Kowald',
    country: 'Germany',
    countryFlag: '🇩🇪',
    initials: 'CK',
    tripType: 'Cultural Ethiopia & Historic Route',
    quote: 'The Bati market was one of the most authentic market experiences of the trip.',
    fullQuote: 'Traveling with Sawla Tours was a very special experience. The team organized everything carefully, and our guide helped us understand Ethiopia beyond the surface. One of the highlights was visiting the old and colorful market of Bati, where people from different communities come together in a lively and fascinating atmosphere. The colors, faces, animals, fabrics, and trading traditions made it one of the most authentic market experiences of the trip. Sawla\'s team was reliable, kind, and deeply knowledgeable throughout.',
    useOn: ['historic-tours', 'about-us', 'testimonials'],
  },
  {
    id: 'maureen-mason-au',
    name: 'Maureen Mason',
    country: 'Australia',
    countryFlag: '🇦🇺',
    initials: 'MM',
    tripType: 'Ethiopia Heritage, Nature & Local Life',
    quote: 'The Timkat celebration in Gondar was deeply moving.',
    fullQuote: 'Sawla Tours gave us a wonderfully balanced Ethiopia journey. We enjoyed historic sites, mountain scenery, markets, monasteries, and daily life along the way. The colorful celebration of Timkat in Gondar was one of the most unforgettable experiences of the trip. Seeing the processions, priests, chanting, umbrellas, white traditional clothing, and the joy of the crowd was deeply moving. The Sawla guide explained the religious meaning of the celebration beautifully and helped us experience it respectfully. It was a journey full of culture, beauty, and warmth.',
    useOn: ['homepage', 'festival-tours', 'historic-tours', 'gondar', 'testimonials'],
  },
  {
    id: 'yolanda-vaganay-cl',
    name: 'Yolanda Vaganay',
    country: 'Chile',
    countryFlag: '🇨🇱',
    initials: 'YV',
    tripType: 'Classic Ethiopia, Omo Valley & Danakil Depression',
    quote: 'The Danakil felt almost unreal — colors, salt flats, volcanic formations, and desert scenery.',
    fullQuote: 'Our Ethiopia trip with Sawla Tours was extraordinary. The itinerary combined the ancient history of the north, the living cultures of the south, and the unique landscapes of the Danakil Depression. The Danakil was one of the most unusual places I have ever seen, with colors, salt flats, volcanic formations, and desert scenery that felt almost unreal. The Sawla team handled the logistics very professionally, especially in remote areas where good planning matters. The journey was adventurous, beautiful, and extremely well guided.',
    useOn: ['danakil', 'adventure-tours', 'omo-valley', 'testimonials'],
  },
  {
    id: 'heidi-eseke-usa',
    name: 'Heidi Eseke',
    country: 'United States',
    countryFlag: '🇺🇸',
    initials: 'HE',
    tripType: 'Tailor-Made Ethiopia Cultural Tour',
    quote: 'Attending Sunday service at Bete Giorgis will stay with me for a long time.',
    fullQuote: 'Sawla Tours created a tailor-made Ethiopia trip that felt personal from the first day. The guide was warm, professional, and deeply knowledgeable, and the driver was careful and reliable. We especially loved the spiritual atmosphere of Lalibela, the traditional markets, and the sense of history everywhere we traveled. Attending Sunday service at Bete Giorgis was a powerful experience that will stay with me for a long time. Sawla\'s team made us feel cared for, informed, and connected to Ethiopia in a very meaningful way.',
    useOn: ['homepage', 'lalibela', 'historic-tours', 'enquire', 'testimonials'],
  },
  {
    id: 'victor-gil-es',
    name: 'Victor Gil',
    country: 'Spain',
    countryFlag: '🇪🇸',
    initials: 'VGS',
    tripType: 'Simien Mountains, Bale Mountains & Ethiopia Wildlife Journey',
    quote: 'Following the Ethiopian wolf across the high Sanetti Plateau was a true highlight.',
    fullQuote: 'My journey with Sawla Tours through Ethiopia\'s mountains and wildlife areas was outstanding. The Simien Mountains were dramatic and beautiful, with breathtaking viewpoints and unforgettable encounters with gelada monkeys. In Bale Mountains National Park, following the Ethiopian wolf across the high Sanetti Plateau was a true highlight. The guide knew the landscapes, wildlife behavior, and best viewing times very well. Sawla\'s team delivered a journey that was professional, adventurous, and deeply rewarding for anyone who loves nature and wild places.',
    useOn: ['homepage', 'wildlife-tours', 'simien', 'bale', 'testimonials'],
  },
]

// ─── FIELD GUIDES ─────────────────────────────────────────────────────────────

export const FIELD_GUIDE_SLUGS = PREMIUM_FIELD_GUIDE_SLUGS

// ─── SPECIES ──────────────────────────────────────────────────────────────────

export interface Species {
  slug: string
  commonName: string
  scientificName: string
  type: 'Mammal' | 'Bird'
  endemic: boolean
  bestLocation: string
  heroImage: string
  heroAlt: string
  tagline: string
  conservationStatus: string
}

export const SPECIES: Species[] = [
  { slug: 'ethiopian-wolf', commonName: 'Ethiopian Wolf', scientificName: 'Canis simensis', type: 'Mammal', endemic: true, bestLocation: 'Bale Mountains National Park', heroImage: 'https://placehold.co/1920x1080/FAEEDA/633806?text=species-ethiopian-wolf-hero', heroAlt: 'Ethiopian wolf (Canis simensis) on Sanetti Plateau, Bale Mountains, Ethiopia', tagline: "Africa's rarest wild canid. ~500 remain.", conservationStatus: 'Endangered' },
  { slug: 'gelada-monkey', commonName: 'Gelada Monkey', scientificName: 'Theropithecus gelada', type: 'Mammal', endemic: true, bestLocation: 'Simien Mountains National Park', heroImage: 'https://placehold.co/1920x1080/FAEEDA/633806?text=species-gelada-hero', heroAlt: 'Gelada monkey troop on cliff edge, Simien Mountains, Ethiopia', tagline: "The world's only grass-grazing primate.", conservationStatus: 'Vulnerable' },
  { slug: 'walia-ibex', commonName: 'Walia Ibex', scientificName: 'Capra walie', type: 'Mammal', endemic: true, bestLocation: 'Simien Mountains National Park', heroImage: 'https://placehold.co/1920x1080/FAEEDA/633806?text=species-walia-ibex-hero', heroAlt: 'Walia ibex on rocky Simien Mountains terrain, Ethiopia', tagline: 'Found only on the Simien escarpment.', conservationStatus: 'Endangered' },
  { slug: 'mountain-nyala', commonName: 'Mountain Nyala', scientificName: 'Tragelaphus buxtoni', type: 'Mammal', endemic: true, bestLocation: 'Bale Mountains National Park', heroImage: 'https://placehold.co/1920x1080/FAEEDA/633806?text=species-mountain-nyala-hero', heroAlt: 'Mountain nyala in Bale Mountains afroalpine habitat, Ethiopia', tagline: 'Ethiopia\'s largest endemic antelope.', conservationStatus: 'Endangered' },
  { slug: 'bale-monkey', commonName: 'Bale Monkey', scientificName: 'Chlorocebus djamdjamensis', type: 'Mammal', endemic: true, bestLocation: 'Harenna Forest, Bale Mountains', heroImage: 'https://placehold.co/1920x1080/FAEEDA/633806?text=species-bale-monkey-hero', heroAlt: 'Bale monkey in Harenna forest canopy, Ethiopia', tagline: 'Bamboo forest specialist.', conservationStatus: 'Vulnerable' },
  { slug: 'blue-winged-goose', commonName: 'Blue-winged Goose', scientificName: 'Cyanochen cyanoptera', type: 'Bird', endemic: true, bestLocation: 'Ethiopian highland wetlands', heroImage: 'https://placehold.co/1920x1080/FAEEDA/633806?text=species-blue-winged-goose-hero', heroAlt: 'Blue-winged goose at Ethiopian highland wetland', tagline: 'Endemic to Ethiopian highlands.', conservationStatus: 'Vulnerable' },
  { slug: 'stresemanns-bushcrow', commonName: "Stresemann's Bushcrow", scientificName: 'Zavattariornis stresemanni', type: 'Bird', endemic: true, bestLocation: 'Yabello area, South Ethiopia', heroImage: 'https://placehold.co/1920x1080/FAEEDA/633806?text=species-bushcrow-hero', heroAlt: "Stresemann's bushcrow perched in Yabello area, Ethiopia", tagline: 'One of the world\'s strangest corvids.', conservationStatus: 'Endangered' },
]

// ─── SAWLA MOMENTS ARTICLES ───────────────────────────────────────────────────

export interface MomentsArticle {
  slug: string
  title: string
  category: string
  categorySlug: string
  teaser: string
  heroImage: string
  heroAlt: string
  readingTime: number
  publishDate: string
  metaTitle: string
  metaDescription: string
  primaryKeyword: string
}

export const MOMENTS_ARTICLES: MomentsArticle[] = [
  {
    slug: 'gelada-monkey-simien-mountains',
    title: "What It's Really Like to See a Gelada Monkey in the Simien Mountains",
    category: 'Wildlife',
    categorySlug: 'wildlife-birding',
    teaser: "Ethiopia's highland primates live in troops of six hundred on cliff edges at 3,600 metres. This is what happens when you arrive at dawn and sit quietly among them.",
    heroImage: 'https://placehold.co/1920x1080/FBEAF0/72243E?text=moments-gelada-hero',
    heroAlt: 'Gelada monkey troop at dawn on Simien Mountains escarpment, Ethiopia',
    readingTime: 7,
    publishDate: '2026-05-27',
    metaTitle: "Seeing Gelada Monkeys in Ethiopia's Simien Mountains | Sawla Moments",
    metaDescription: "What actually happens when you encounter 600 gelada monkeys on a cliff edge in Ethiopia's Simien Mountains — and how to plan a trip that gives you the best chance of witnessing it.",
    primaryKeyword: 'gelada monkey Ethiopia',
  },
  {
    slug: 'why-ethiopia-not-safari-destination',
    title: "Why Ethiopia Is Not a Safari Destination — and Why That's the Point",
    category: 'Why Ethiopia',
    categorySlug: 'why-ethiopia',
    teaser: "Ethiopia doesn't have the Big Five. It has something most of Africa doesn't: ancient civilisation, endemic wildlife found nowhere else, and a culture still entirely its own.",
    heroImage: 'https://placehold.co/1920x1080/FBEAF0/72243E?text=moments-why-ethiopia-hero',
    heroAlt: 'Lalibela priest inside ancient rock-hewn church, Ethiopia',
    readingTime: 7,
    publishDate: '2026-05-27',
    metaTitle: 'Why Ethiopia Is Not a Safari Destination | Sawla Moments',
    metaDescription: "Ethiopia doesn't have the Big Five. It has something most of Africa doesn't: ancient civilisation, endemic wildlife found nowhere else, and a culture still entirely its own. Here's why that matters.",
    primaryKeyword: 'why visit Ethiopia',
  },
  {
    slug: 'how-we-plan-custom-ethiopia-journey',
    title: 'How We Plan a Custom Ethiopia Journey: A Real Example',
    category: 'Planning',
    categorySlug: 'planning',
    teaser: 'A couple from Germany. Ten days. They wanted history, wildlife, and enough space to breathe. Here is exactly how a Sawla Tours itinerary actually comes together.',
    heroImage: 'https://placehold.co/1920x1080/FBEAF0/72243E?text=moments-planning-hero',
    heroAlt: 'Sawla Tours specialist reviewing Ethiopia map during planning session',
    readingTime: 8,
    publishDate: '2026-05-27',
    metaTitle: 'How We Plan a Custom Ethiopia Journey: A Real Example | Sawla Moments',
    metaDescription: 'A couple from Germany. Ten days. They wanted history, wildlife, and enough space to breathe. Here is exactly how a Sawla Tours itinerary actually comes together — the decisions, the trade-offs, and the moments we almost got wrong.',
    primaryKeyword: 'how to plan a trip to Ethiopia',
  },
  {
    slug: 'hamer-bull-jumping-ceremony-ethiopia',
    title: 'The Hamar Bull-Jumping Ceremony: What It Is and How to Experience It',
    category: 'Tribal Culture',
    categorySlug: 'culture-heritage',
    teaser: "For three days before the ceremony, the Hamar women sing. On the day itself, young men run across the backs of cattle while the women of the community accept ritual whippings as proof of loyalty. This is not performance — this is a living rite of passage.",
    heroImage: 'https://placehold.co/1920x1080/FBEAF0/72243E?text=moments-hamer-hero',
    heroAlt: 'Hamar woman in traditional ochre dress and metal coil necklaces, Omo Valley Ethiopia',
    readingTime: 9,
    publishDate: '2026-06-10',
    metaTitle: 'Hamer Bull-Jumping Ceremony Ethiopia | Omo Valley | Sawla Moments',
    metaDescription: "What the Hamar bull-jumping ceremony actually involves, when it happens, how to witness it respectfully, and why the approach matters as much as the access. A Sawla Tours field guide.",
    primaryKeyword: 'Hamer bull jumping ceremony Ethiopia',
  },
  {
    slug: 'abuna-yemata-guh-tigray-church',
    title: "Abuna Yemata Guh: Ethiopia's Most Extraordinary Church and the Climb to Reach It",
    category: 'Sacred History',
    categorySlug: 'culture-heritage',
    teaser: "There is a moment, halfway up the cliff face, when you think: this cannot be where the church is. Then your guide points upward. Cut directly into the sandstone. A small black entrance. Up there, eleven hundred years ago, a monk decided this was the right place to build a sanctuary.",
    heroImage: 'https://placehold.co/1920x1080/FBEAF0/72243E?text=moments-abuna-hero',
    heroAlt: 'Abuna Yemata Guh cliff church entrance cut into sandstone pillar, Gheralta Tigray Ethiopia',
    readingTime: 8,
    publishDate: '2026-06-10',
    metaTitle: "Abuna Yemata Guh — Ethiopia's Cliff Church | Tigray | Sawla Moments",
    metaDescription: "What Abuna Yemata Guh is, what the climb involves, what you find inside, and how to plan a visit to the most extraordinary church in the Tigray rock church circuit.",
    primaryKeyword: 'Abuna Yemata Guh Tigray Ethiopia',
  },
  {
    slug: 'timkat-festival-gondar-ethiopia',
    title: "Timkat in Gondar: What Ethiopia's Epiphany Celebration Looks Like From the Inside",
    category: 'Festivals & Ceremonies',
    categorySlug: 'festivals-local-life',
    teaser: "At two in the morning, the procession begins. Priests in gold and red and white carry the tabots through the streets of Gondar in a river of candlelight. By dawn, tens of thousands have gathered at Fasiladas Bath. This is Timkat — and Gondar hosts the most spectacular version of it.",
    heroImage: 'https://placehold.co/1920x1080/FBEAF0/72243E?text=moments-timkat-hero',
    heroAlt: "Ethiopian Orthodox priests in ceremonial vestments carrying tabots during Timkat procession in Gondar",
    readingTime: 8,
    publishDate: '2026-06-10',
    metaTitle: "Timkat Festival Gondar Ethiopia | Ethiopian Epiphany | Sawla Moments",
    metaDescription: "What Timkat is, what the celebration in Gondar involves, what time to arrive, and how to plan a visit around Ethiopia's most visually powerful religious ceremony.",
    primaryKeyword: 'Timkat festival Gondar Ethiopia',
  },
  {
    slug: 'ethiopian-wolf-bale-mountains-sanetti-plateau',
    title: "The Ethiopian Wolf: Hunting at Dawn on the Sanetti Plateau",
    category: 'Wildlife',
    categorySlug: 'wildlife-birding',
    teaser: "The guide stops the vehicle at the edge of the plateau and points. Across the afroalpine meadow, a figure moves through the grass — rust-red, slender, precise. The Ethiopian wolf. The rarest canid in the world. You watch it hunt, crouched over a giant mole rat burrow with the patience of a surgeon.",
    heroImage: 'https://placehold.co/1920x1080/FBEAF0/72243E?text=moments-wolf-hero',
    heroAlt: 'Ethiopian wolf on Sanetti Plateau, Bale Mountains National Park, Ethiopia — rust-red coat in golden morning light',
    readingTime: 8,
    publishDate: '2026-06-10',
    metaTitle: "Ethiopian Wolf Bale Mountains | Sanetti Plateau Wildlife | Sawla Moments",
    metaDescription: "Everything about seeing the Ethiopian wolf — the world's rarest canid — on the Sanetti Plateau in Bale Mountains National Park. When to go, what to expect, and why this encounter stays with you.",
    primaryKeyword: 'Ethiopian wolf Bale Mountains',
  },
  {
    slug: 'danakil-depression-what-to-expect',
    title: "What the Danakil Depression Is Really Like: An Honest Account",
    category: 'Expedition',
    categorySlug: 'remote-journeys',
    teaser: "Let's deal with the obvious thing first: the Danakil Depression is one of the hottest places on earth. Daytime temperatures reach 50°C. There is no shade. The landscape looks like a planet that is not this one. If none of this sounds appealing, the Danakil is probably not for you.",
    heroImage: 'https://placehold.co/1920x1080/FBEAF0/72243E?text=moments-danakil-hero',
    heroAlt: 'Dallol hydrothermal field at Danakil Depression showing vivid yellow sulfur formations and colored acid pools',
    readingTime: 10,
    publishDate: '2026-06-10',
    metaTitle: "Danakil Depression Ethiopia: What It's Really Like | Sawla Moments",
    metaDescription: "An honest account of the Danakil Depression — Erta Ale lava lake, Dallol's acid pools, the logistics, who it suits and who it doesn't, and what Sawla Tours does to make it safe.",
    primaryKeyword: 'Danakil Depression Ethiopia tour',
  },
  {
    slug: 'photographing-omo-valley-ethiopia',
    title: "Photographing the Omo Valley: Ethics, Access, and What Actually Works",
    category: 'Photography',
    categorySlug: 'photography-filming',
    teaser: "The Omo Valley is one of the most photographed cultural regions in Africa — and one of the most mishandled. The difference between a remarkable photography journey and a damaging one comes down almost entirely to approach.",
    heroImage: 'https://placehold.co/1920x1080/FBEAF0/72243E?text=moments-omo-photo-hero',
    heroAlt: 'Karo man with elaborate chalk and ochre body paint along the Omo River, southern Ethiopia',
    readingTime: 9,
    publishDate: '2026-06-10',
    metaTitle: "Photographing the Omo Valley Ethiopia | Ethics & Access | Sawla Moments",
    metaDescription: "How to photograph the Omo Valley respectfully, what the transaction-for-photography model does to communities, what a specialist guide changes, and what makes the images extraordinary.",
    primaryKeyword: 'Omo Valley photography Ethiopia',
  },
]

export const MOMENTS_CATEGORIES = [
  { slug: 'culture-heritage', name: 'Culture & Heritage', description: 'Churches, monasteries, royal cities, markets, ceremonies, coffee culture, and Ethiopia\'s layered history.', image: 'https://placehold.co/800x600/FBEAF0/72243E?text=moments-cat-culture' },
  { slug: 'wildlife-birding', name: 'Wildlife & Birding', description: 'Ethiopian wolves, geladas, endemic birds, Bale Mountains, Simien Mountains, Rift Valley lakes, and conservation stories.', image: 'https://placehold.co/800x600/FBEAF0/72243E?text=moments-cat-wildlife' },
  { slug: 'planning', name: 'Planning Ethiopia', description: 'Practical advice on routes, timing, internal flights, safety, visas, packing, road conditions, and how to choose the right itinerary.', image: 'https://placehold.co/800x600/FBEAF0/72243E?text=moments-cat-planning' },
  { slug: 'photography-filming', name: 'Photography & Filming', description: 'Light, timing, people, permissions, respectful image-making, filming logistics, and behind-the-scenes Sawla Films perspectives.', image: 'https://placehold.co/800x600/FBEAF0/72243E?text=moments-cat-photography' },
  { slug: 'festivals-local-life', name: 'Festivals & Local Life', description: 'Timkat, Meskel, Enkutatash, coffee ceremonies, music, food, markets, and the everyday rituals that shape Ethiopian life.', image: 'https://placehold.co/800x600/FBEAF0/72243E?text=moments-cat-festivals' },
  { slug: 'remote-journeys', name: 'Remote Journeys', description: 'Danakil, Omo Valley, Bale, Simien, Gheralta, mobile camps, trekking routes, and expedition-style travel notes.', image: 'https://placehold.co/800x600/FBEAF0/72243E?text=moments-cat-remote' },
]
