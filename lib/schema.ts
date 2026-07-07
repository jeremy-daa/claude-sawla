// lib/schema.ts
// Sawla Tours — JSON-LD Schema definitions for all page types

export const homepageSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://www.sawlatours.com/#website',
      name: 'Sawla Tours',
      alternateName: 'Sawla',
      url: 'https://www.sawlatours.com/',
      description: 'Ethiopia-based tour operator designing private, tailor-made Ethiopia journeys.',
      publisher: { '@id': 'https://www.sawlatours.com/#travelagency' },
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: 'https://www.sawlatours.com/?s={search_term_string}' },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': ['TravelAgency', 'LocalBusiness'],
      '@id': 'https://www.sawlatours.com/#travelagency',
      name: 'Sawla Tours',
      description: 'Ethiopia-based tour operator designing private, tailor-made Ethiopia journeys across cultural, historic, wildlife, festival, photography, trekking, and remote travel routes.',
      url: 'https://www.sawlatours.com/',
      foundingDate: '2009',
      areaServed: { '@type': 'Country', name: 'Ethiopia' },
      address: { '@type': 'PostalAddress', addressLocality: 'Addis Ababa', addressCountry: 'ET' },
      email: 'explore@sawlatours.com',
      telephone: '+25170578306',
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        telephone: '+25170578306',
        email: 'explore@sawlatours.com',
        availableLanguage: ['English', 'Amharic'],
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '17:30',
        },
      },
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.sawlatours.com/brand/mark-gold.png',
        caption: 'Sawla Tours',
      },
      image: 'https://www.sawlatours.com/images/og-home.jpg',
      // Every real Sawla profile — consistent NAP + profiles across the web is what
      // teaches engines the brand entity, which is the prerequisite for sitelinks.
      sameAs: [
        'https://www.facebook.com/sawlatours',
        'https://www.instagram.com/sawlatours',
        'https://www.tiktok.com/@sawlatours',
        'https://twitter.com/SawlaTours',
        'https://www.youtube.com/@sawlafilms',
        'https://www.tripadvisor.com/Profile/sawlat',
      ],
      knowsAbout: [
        'Ethiopia tours', 'Lalibela', 'Simien Mountains', 'Bale Mountains', 'Omo Valley',
        'Danakil Depression', 'Tigray', 'Ethiopia cultural tours', 'Ethiopia wildlife tours',
        'Ethiopia photography tours', 'Ethiopia trekking', 'Ethiopia birding',
        'Ethiopia festival tours', 'Ethiopian wolf', 'Gelada monkeys', 'endemic species Ethiopia',
        'mobile tented camps Ethiopia', 'tailor-made Ethiopia journeys',
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://www.sawlatours.com/#faqpage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What kind of Ethiopia tours does Sawla Tours organise?',
          acceptedAnswer: { '@type': 'Answer', text: 'Sawla Tours organises private, tailor-made Ethiopia tours including cultural journeys, historic routes, wildlife and birding trips, photography tours, festival trips, trekking itineraries, Omo Valley journeys, Danakil expeditions, and remote mobile camp experiences. Every journey is designed around the individual traveler\'s interests, pace, and comfort level.' },
        },
        {
          '@type': 'Question',
          name: 'Is Sawla Tours based in Ethiopia?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes. Sawla Tours is an Ethiopia-based tour operator with local travel specialists, guides, drivers, and field teams who plan and operate journeys on the ground. The team is based in Addis Ababa and has been operating since 2009.' },
        },
        {
          '@type': 'Question',
          name: 'Can Sawla Tours customise a fully private Ethiopia itinerary?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes. Sawla Tours specialises in private, tailor-made journeys. The planning process starts with your travel interests, preferred pace, comfort level, group size, dates, and destinations. The team then builds a bespoke route around those details, with revisions until the itinerary feels right.' },
        },
        {
          '@type': 'Question',
          name: 'Which Ethiopia destinations can Sawla Tours include in a tour?',
          acceptedAnswer: { '@type': 'Answer', text: 'Sawla Tours can design trips including Addis Ababa, Lalibela, Gondar, Bahir Dar, Simien Mountains, Bale Mountains, Omo Valley, Danakil Depression, Harar, Tigray and Gheralta rock churches, Rift Valley lakes, Kafa Biosphere Reserve, and other regions depending on current access conditions.' },
        },
        {
          '@type': 'Question',
          name: 'Does Sawla Tours arrange guides, vehicles, and logistics?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes. Sawla Tours arranges experienced local guides, vehicles, drivers, domestic flight coordination, accommodations, permits where required, mobile camp logistics, and on-the-ground support throughout the journey.' },
        },
        {
          '@type': 'Question',
          name: 'Is Ethiopia suitable for first-time visitors?',
          acceptedAnswer: { '@type': 'Answer', text: 'Ethiopia can be deeply rewarding for first-time visitors when the trip is planned carefully. A good first journey typically balances Addis Ababa, the northern historic route, Lalibela, and the Simien Mountains or Bale Mountains. More remote destinations such as Danakil and Omo Valley are better suited to travelers with some prior Africa travel experience or with extra time to prepare.' },
        },
      ],
    },
  ],
}

// `image` is intentionally optional throughout this file: schema.org does not require it
// for Article/TouristDestination/TouristTrip, and declaring a URL that doesn't resolve to a
// real photo (or substituting a generic/unrelated one) is worse than omitting it — Google's
// structured data tooling flags broken image URLs, and a mismatched image is a false claim
// about what the entity looks like. Pass `image` only when a real, specific photo exists.
export function articleSchema(params: {
  url: string
  title: string
  description: string
  datePublished: string
  dateModified?: string
  image?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: params.title,
    description: params.description,
    datePublished: params.datePublished,
    dateModified: params.dateModified ?? params.datePublished,
    publisher: {
      '@type': 'Organization',
      name: 'Sawla Tours',
      url: 'https://www.sawlatours.com',
    },
    ...(params.image ? { image: params.image } : {}),
    mainEntityOfPage: { '@type': 'WebPage', '@id': params.url },
  }
}

export function destinationSchema(params: {
  name: string
  url: string
  description: string
  image?: string
  region?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name: params.name,
    description: params.description,
    url: params.url,
    ...(params.image ? { image: params.image } : {}),
    touristType: ['CulturalTourist', 'AdventureTourist', 'EcoTourist'],
    containedInPlace: { '@type': 'Country', name: 'Ethiopia' },
  }
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

// ── ItemList schema (hub pages) ────────────────────────────────────────
export function itemListSchema(params: {
  name: string
  url: string
  items: { name: string; url: string; description?: string }[]
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: params.name,
    url: params.url,
    numberOfItems: params.items.length,
    itemListElement: params.items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: item.url,
      ...(item.description ? { description: item.description } : {}),
    })),
  }
}

// ── Tour / TouristTrip schema ────────────────────────────────────────────
// `durationDays` is converted to ISO 8601 ("P10D"), the format schema.org's `duration`
// property requires — a human label like "10 Days" is not valid here and fails validation.
export function tourSchema(params: {
  name: string
  url: string
  description: string
  image?: string
  durationDays?: number
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: params.name,
    description: params.description,
    url: params.url,
    ...(params.image ? { image: params.image } : {}),
    provider: { "@type": "TravelAgency", name: "Sawla Tours", url: "https://www.sawlatours.com" },
    ...(params.durationDays ? { duration: `P${params.durationDays}D` } : {}),
  }
}
// ── FAQ Page schema ─────────────────────────────────────────────────────────
export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  }
}