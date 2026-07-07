// data/fieldGuideContent.ts
// Sawla Tours — Ethiopia Travel Guide V11 premium content system
// Source of truth for hub cards, dynamic article pages, FAQs, schema, sitemap and CMS handoff.

export interface GuideSection { heading: string; body: string }
export interface GuideFaq { q: string; a: string }
export interface GuideContent {
  slug: string
  title: string
  category: string
  readTime: string
  metaTitle: string
  metaDesc: string
  dek: string
  updated: string
  quickFacts: string[]
  sections: GuideSection[]
  faqs: GuideFaq[]
  relatedDestinations: string[]
  relatedGuides: string[]
  keywords: string[]
}

export const FIELD_GUIDE_CONTENT: GuideContent[] = [
  {
    "slug": "when-to-visit-ethiopia",
    "title": "When to Visit Ethiopia",
    "category": "Season & Timing",
    "readTime": "12 min",
    "metaTitle": "When to Visit Ethiopia | Best Time by Region | Sawla Tours",
    "metaDesc": "Month-by-month Ethiopia travel guide covering weather, festivals, wildlife, Danakil heat, Omo roads, trekking seasons and the best time to visit Ethiopia.",
    "dek": "Ethiopia is not a one-season destination. The highlands, deserts, Rift Valley, Bale, Simien and Omo Valley each respond differently to rain, altitude and festival calendars. The best time depends on what you want to experience, not only on sunshine.",
    "updated": "2026-06-12",
    "quickFacts": [
      "Best overall window: October to February",
      "Best highland trekking: October to March",
      "Best Danakil window: November to February; March can be hot",
      "Peak festival dates: Meskel around 27 September and Timkat around 19 January",
      "Main rains: usually June to September, strongest in many highland areas"
    ],
    "sections": [
      {
        "heading": "Best overall season: October to February",
        "body": "For most private Ethiopia journeys, October to February is the strongest all-round window. Roads are generally more reliable, the northern highlands are clear, wildlife viewing is easier in Simien and Bale, and the light is excellent for photography. November is especially balanced: green after the rains, not yet as busy as Christmas and Timkat, and workable across the historic north, Omo Valley, Bale and the Rift Valley."
      },
      {
        "heading": "Festival timing changes the whole journey",
        "body": "Ethiopia’s religious calendar is one of the strongest reasons to travel. Meskel brings public bonfires and processions in late September. Timkat, Ethiopian Epiphany, fills Gondar, Lalibela and Addis Ababa with white-robed pilgrims and tabot processions. Fasika, Ethiopian Orthodox Easter, is quieter but deeply atmospheric, especially in Lalibela. Festival trips require early hotel booking, slower pacing and respectful crowd management."
      },
      {
        "heading": "Rainy season is not automatically bad",
        "body": "June to September is often dismissed too quickly. The main rains can make remote roads difficult, especially in parts of the Omo, highland dirt tracks and some wildlife areas. But the same months bring dramatic green landscapes, powerful skies, fewer visitors and beautiful photography. A rainy-season Ethiopia itinerary should use more flights, choose lodges carefully and avoid overpromising remote access."
      },
      {
        "heading": "Danakil and lowland heat",
        "body": "The Danakil Depression is best approached in the cooler months. November to February is usually the most comfortable period; March may still be possible for heat-tolerant travelers, while the hotter months can be extremely demanding. Even in the cooler season, Danakil requires early starts, proper water planning, experienced Afar logistics and realistic expectations about volcanic and road conditions."
      }
    ],
    "faqs": [
      {
        "q": "What is the best month to visit Ethiopia?",
        "a": "November is the best single month for many travelers because the country is green after the rains, roads are usually improving and most major routes are workable. January is best if Timkat is the priority."
      },
      {
        "q": "Can I travel to Ethiopia in July or August?",
        "a": "Yes, but the itinerary must be designed differently. Focus on accessible highland routes, use flights where possible and avoid fragile road-dependent plans in remote areas unless the ground team confirms access."
      },
      {
        "q": "When should I book a Timkat trip?",
        "a": "For Gondar or Lalibela during Timkat, start 6 to 10 months ahead where possible because quality rooms, experienced guides and domestic flights are limited."
      }
    ],
    "relatedDestinations": [
      "lalibela",
      "simien-mountain-national-park",
      "danakil-depression-tour-packages"
    ],
    "relatedGuides": [
      "ethiopia-festival-calendar",
      "how-to-plan-your-trip",
      "ethiopia-travel-circuits"
    ],
    "keywords": [
      "best time to visit Ethiopia",
      "Ethiopia weather",
      "Ethiopia festivals"
    ]
  },
  {
    "slug": "ethiopia-travel-circuits",
    "title": "Ethiopia Travel Circuits Explained",
    "category": "Routes & Itineraries",
    "readTime": "13 min",
    "metaTitle": "Ethiopia Travel Routes & Circuits | Sawla Tours",
    "metaDesc": "Understand Ethiopia travel circuits: northern historic route, Omo Valley, Bale wildlife, Danakil, Harar, Rift Valley and how to combine them intelligently.",
    "dek": "Ethiopia rewards travelers who plan by circuit rather than by a simple list of famous places. Distances, flight links, altitude, road conditions and cultural pacing all matter. A strong itinerary feels coherent; a weak one spends too much time backtracking through Addis Ababa.",
    "updated": "2026-06-12",
    "quickFacts": [
      "Core first-time circuit: Addis, Lalibela, Gondar, Simien and Bahir Dar",
      "Most powerful cultural extension: Omo Valley",
      "Best wildlife extension: Bale or Simien depending on species goals",
      "Best adventure extension: Danakil and Gheralta",
      "Ideal comprehensive journey: 14 to 21 days"
    ],
    "sections": [
      {
        "heading": "The northern historic circuit",
        "body": "The northern route is Ethiopia’s classic introduction: Lalibela, Gondar, Simien Mountains, Bahir Dar and Lake Tana, often with Aksum and Tigray when access and timing allow. It combines UNESCO heritage, Orthodox Christian living culture, castles, monasteries, mountain scenery and excellent domestic flight links. For many travelers, this is the right first Ethiopia journey."
      },
      {
        "heading": "Southern cultural and Omo Valley route",
        "body": "The Omo Valley is not a simple add-on. It requires time, sensitivity and careful market-day planning. The best journeys avoid rushing from village to village and instead balance Hamer, Kara, Mursi, Dassenech, Konso or Arbore encounters with photography ethics, local permission and comfortable pacing. Seven to ten days is more realistic than a quick two-night visit."
      },
      {
        "heading": "Wildlife and endemic-species circuit",
        "body": "Ethiopia’s wildlife circuit is different from the classic savannah safari. The focus is endemism and mountain ecology: Ethiopian wolf and mountain nyala in Bale, gelada and Walia ibex in Simien, Swayne’s hartebeest in Senkelle, waterbirds in the Rift Valley and specialist birding in Awash, Bale, Kafa and the highlands."
      },
      {
        "heading": "Adventure and frontier circuit",
        "body": "Danakil, Erta Ale, Gheralta and remote desert or escarpment routes need higher logistical confidence. The reward is extraordinary: salt caravans, sulfur fields, ancient rock churches, basalt landscapes and desert light. These itineraries should be built with contingency time, escort requirements and honest safety monitoring."
      }
    ],
    "faqs": [
      {
        "q": "Can I combine north, Omo and Danakil in one trip?",
        "a": "Yes, but it normally requires at least 16 to 21 days. With less time, choose two regions and experience them properly."
      },
      {
        "q": "Should I start every route from Addis Ababa?",
        "a": "Most international trips begin in Addis, but good itineraries reduce repeated returns to Addis by linking domestic flights and efficient road sectors."
      },
      {
        "q": "What is the best Ethiopia circuit for a first-time traveler?",
        "a": "Addis, Lalibela, Gondar, Simien and Bahir Dar is the best first circuit for most travelers because it balances history, culture, landscape and reliable logistics."
      }
    ],
    "relatedDestinations": [
      "lalibela",
      "gondar",
      "omo-valley-tribes"
    ],
    "relatedGuides": [
      "how-to-plan-your-trip",
      "how-to-get-to-ethiopia",
      "ethiopia-domestic-flights"
    ],
    "keywords": [
      "Ethiopia travel circuits",
      "Ethiopia itinerary",
      "private Ethiopia tour route"
    ]
  },
  {
    "slug": "how-to-plan-your-trip",
    "title": "How to Plan an Ethiopia Trip",
    "category": "Trip Planning",
    "readTime": "14 min",
    "metaTitle": "How to Plan an Ethiopia Trip | Expert Route Advice",
    "metaDesc": "Plan a private Ethiopia trip with expert advice on trip length, routing, flights, guides, accommodation, pace, safety, permits and realistic expectations.",
    "dek": "The biggest planning mistake in Ethiopia is treating the map as small. A good trip balances ambition with depth, cultural respect and field reality. The right route depends on your available days, comfort level, interests and tolerance for altitude, heat and long drives.",
    "updated": "2026-06-12",
    "quickFacts": [
      "Minimum meaningful first trip: 7 to 9 days",
      "Best balanced private journey: 12 to 15 days",
      "Comprehensive Ethiopia trip: 18 to 24 days",
      "Book peak season 4 to 8 months ahead",
      "Use domestic flights strategically, not randomly"
    ],
    "sections": [
      {
        "heading": "Start with the purpose, not the route",
        "body": "A history-focused traveler, wildlife photographer, Orthodox festival traveler and Omo Valley cultural traveler need different Ethiopia itineraries. Before choosing dates, define the primary reason for the journey: heritage, photography, wildlife, trekking, festivals, family comfort, deep culture or a once-in-a-lifetime overview. The route should serve that purpose."
      },
      {
        "heading": "Choose depth over checklist travel",
        "body": "Lalibela deserves two nights or more. The Simien Mountains need enough time for light, wildlife and acclimatisation. Omo Valley trips should respect weekly markets, local permissions and community rhythms. A rushed itinerary may look impressive on paper but feel exhausting on the ground."
      },
      {
        "heading": "Use flights where they save real time",
        "body": "Domestic flights can transform an Ethiopia itinerary, especially for Lalibela, Gondar, Bahir Dar, Dire Dawa, Arba Minch, Jinka, Robe/Goba, Mekelle and Semera depending on current schedules. But some drives are part of the experience: Gondar to Simien, Mekelle to Gheralta, Arba Minch to Konso and selected Rift Valley sectors."
      },
      {
        "heading": "Build in operational checks",
        "body": "Sawla Tours verifies routes, flight schedules, park access and regional conditions again during itinerary design because Ethiopia travel details can change by season and locality. This is particularly important for Danakil, Tigray/Gheralta, remote Omo, Gambella, Kafta Sheraro, Chebera Churchura and rainy-season travel."
      }
    ],
    "faqs": [
      {
        "q": "How many days do I need in Ethiopia?",
        "a": "Seven to nine days is enough for a focused first route. Twelve to fifteen days allows a stronger combination. Eighteen to twenty-four days is ideal for north plus Omo, wildlife or Danakil."
      },
      {
        "q": "Is Ethiopia better as a private tour?",
        "a": "For most international visitors, yes. Private travel allows better pacing, guide continuity, safety monitoring and flexibility around flights, ceremonies, markets and weather."
      },
      {
        "q": "How early should I start planning?",
        "a": "For peak season, festival dates, specialist guides or remote mobile camps, start 4 to 8 months ahead. Simpler off-season trips can often be arranged faster."
      }
    ],
    "relatedDestinations": [
      "addis-ababa",
      "lalibela",
      "bale-mountains-national-park"
    ],
    "relatedGuides": [
      "ethiopia-travel-circuits",
      "ethiopia-travel-costs",
      "hotels-lodges-ethiopia"
    ],
    "keywords": [
      "plan Ethiopia trip",
      "Ethiopia private tour planning",
      "Ethiopia travel itinerary"
    ]
  },
  {
    "slug": "how-to-get-to-ethiopia",
    "title": "How to Get to Ethiopia",
    "category": "Flights & Arrival",
    "readTime": "10 min",
    "metaTitle": "How to Get to Ethiopia | Flights, Airport & Entry",
    "metaDesc": "Guide to flights to Ethiopia, Addis Ababa Bole International Airport, international connections, domestic onward travel and arrival-day planning.",
    "dek": "Most international visitors arrive through Addis Ababa Bole International Airport, one of Africa’s major aviation hubs. The arrival experience is manageable when visas, luggage, domestic connections and first-night pacing are planned in advance.",
    "updated": "2026-06-12",
    "quickFacts": [
      "Main gateway: Addis Ababa Bole International Airport",
      "National carrier: Ethiopian Airlines with broad international and domestic network",
      "Domestic gateway cities include Lalibela, Gondar, Bahir Dar, Arba Minch, Jinka, Robe/Goba, Dire Dawa, Semera and Mekelle depending on current schedules",
      "Allow buffer time between international and domestic sectors",
      "First night in Addis is often wiser after a long-haul flight"
    ],
    "sections": [
      {
        "heading": "International arrival through Addis Ababa",
        "body": "Addis Ababa Bole International Airport is the main gateway for Ethiopia travel. Many routes connect through Europe, the Middle East, Africa and North America. Arrival procedures are usually straightforward, but eVisa approval, passport validity, yellow-fever documentation where applicable and luggage transfer planning should be checked before departure."
      },
      {
        "heading": "Domestic travel after arrival",
        "body": "Ethiopian Airlines markets a substantial domestic network, including major tourism gateways such as Lalibela, Gondar, Bahir Dar, Arba Minch, Dire Dawa and others. Current schedules can change, and some routes operate less frequently than others, so domestic sectors should be confirmed during itinerary design rather than assumed from old guidebooks."
      },
      {
        "heading": "Arrival-day strategy",
        "body": "A same-day domestic connection can work if timings are generous and luggage is checked correctly, but a first night in Addis is often more comfortable after long-haul travel. For luxury, family or older travelers, the first-night buffer reduces stress and protects the rest of the itinerary."
      },
      {
        "heading": "What Sawla coordinates",
        "body": "Sawla Tours can align international arrival times with domestic sectors, hotel check-in, airport meet-and-greet, Addis city touring, driver-guide logistics and contingency planning if flights shift."
      }
    ],
    "faqs": [
      {
        "q": "Which airport do most Ethiopia tours use?",
        "a": "Almost all international Ethiopia tours begin at Addis Ababa Bole International Airport."
      },
      {
        "q": "Can I connect straight to Lalibela or Gondar?",
        "a": "Often yes, depending on current domestic schedules and your international arrival time. A buffer night in Addis is still recommended for many long-haul travelers."
      },
      {
        "q": "Do domestic flight schedules change?",
        "a": "Yes. They can change by season, demand and operations. Final itineraries should verify schedules close to booking and again before travel."
      }
    ],
    "relatedDestinations": [
      "addis-ababa",
      "lalibela",
      "gondar"
    ],
    "relatedGuides": [
      "ethiopia-domestic-flights",
      "ethiopia-visa-guide",
      "how-to-plan-your-trip"
    ],
    "keywords": [
      "flights to Ethiopia",
      "Addis Ababa airport",
      "Ethiopian Airlines domestic flights"
    ]
  },
  {
    "slug": "ethiopia-domestic-flights",
    "title": "Ethiopia Domestic Flights & Road Transfers",
    "category": "Flights & Logistics",
    "readTime": "11 min",
    "metaTitle": "Ethiopia Domestic Flights & Road Transfers | Sawla Tours",
    "metaDesc": "Practical guide to Ethiopian domestic flights, road transfers, luggage, route design, airport buffers and when driving is better than flying.",
    "dek": "Domestic flights make Ethiopia far more accessible, but they should be used strategically. Some routes save entire days; others remove the best landscape from the journey. The best itinerary combines flight efficiency with selected scenic road sectors.",
    "updated": "2026-06-12",
    "quickFacts": [
      "Use flights for long north-south jumps",
      "Keep scenic drives where the road is part of the experience",
      "Confirm luggage allowance before packing photography equipment",
      "Expect schedule changes and build buffers",
      "Remote routes may still require long 4x4 drives after the flight"
    ],
    "sections": [
      {
        "heading": "When flying is best",
        "body": "Flights are usually best for Addis to Lalibela, Gondar, Bahir Dar, Dire Dawa, Arba Minch, Jinka, Robe/Goba, Mekelle or Semera when those sectors are operating and fit the route. Flying can protect time for churches, markets, wildlife and rest instead of spending entire days on highways."
      },
      {
        "heading": "When driving is worth it",
        "body": "Some drives are essential to the experience: Gondar to the Simien escarpment, Mekelle to Gheralta, Arba Minch to Konso, Jinka to Turmi, Semera to Danakil and selected Rift Valley sectors. Driving also creates flexibility for photography, village stops, viewpoints and regional understanding."
      },
      {
        "heading": "Luggage and specialist equipment",
        "body": "Photographers, birders and film travelers should check domestic luggage rules early. Heavy lenses, tripods, drones, satellite devices and professional equipment may need additional planning. Sawla can advise on packing and prepare customs or permission support where required."
      },
      {
        "heading": "Buffers matter",
        "body": "Do not build a tight international departure immediately after a remote road sector. Weather, road works, ceremonies, park access and domestic flight changes can affect timing. High-quality Ethiopia planning protects the final day with sensible buffers."
      }
    ],
    "faqs": [
      {
        "q": "Are domestic flights reliable in Ethiopia?",
        "a": "They are useful and generally workable, but schedules can change. A good operator monitors updates and avoids impossible same-day connections."
      },
      {
        "q": "Should I fly to the Omo Valley?",
        "a": "For most travelers, flying to Jinka or Arba Minch saves time. The Omo still requires road travel after arrival."
      },
      {
        "q": "Can Sawla book domestic flights?",
        "a": "Yes, domestic sectors can be coordinated as part of the private itinerary once dates and route logic are agreed."
      }
    ],
    "relatedDestinations": [
      "addis-ababa",
      "omo-valley-tribes",
      "danakil-depression-tour-packages"
    ],
    "relatedGuides": [
      "how-to-get-to-ethiopia",
      "how-to-plan-your-trip",
      "ethiopia-photography-guide"
    ],
    "keywords": [
      "Ethiopia domestic flights",
      "Ethiopia road transfers",
      "Jinka flight"
    ]
  },
  {
    "slug": "ethiopia-visa-guide",
    "title": "Ethiopia Visa & Entry Requirements",
    "category": "Visa & Entry",
    "readTime": "9 min",
    "metaTitle": "Ethiopia Visa & Entry Requirements | eVisa Guide",
    "metaDesc": "Official Ethiopia eVisa planning guide covering passport validity, tourist visa basics, visa on arrival, yellow fever rules and entry preparation.",
    "dek": "Most visitors should apply for the Ethiopian tourist eVisa before travel using the official government portal. The process is usually simple, but travelers should use only the official website, check nationality eligibility and avoid last-minute applications.",
    "updated": "2026-06-12",
    "quickFacts": [
      "Official eVisa portal: evisa.gov.et",
      "Passport should have at least six months validity from arrival",
      "Tourist eVisa is single-entry",
      "Visa-on-arrival eligibility depends on nationality and current rules",
      "Yellow fever certificate may be required when arriving from risk countries"
    ],
    "sections": [
      {
        "heading": "Use the official eVisa portal",
        "body": "The official Ethiopian eVisa website states that a tourist visa is an electronic single-entry visa issued by the Ethiopian government. Travelers should apply directly through the official portal and avoid unofficial intermediaries that charge unnecessary fees or provide outdated information."
      },
      {
        "heading": "Passport and document preparation",
        "body": "The official eVisa information notes that travelers need at least six months remaining on the passport after the date of arrival. Keep a printed and digital copy of the approved visa, your passport biodata page, travel insurance and first hotel details."
      },
      {
        "heading": "Visa on arrival",
        "body": "Ethiopia has an official tourist visa-on-arrival service for eligible nationalities, but Sawla generally recommends applying online before travel. It reduces airport queuing and lowers the risk of confusion after long-haul flights."
      },
      {
        "heading": "Health-entry documents",
        "body": "Yellow fever documentation depends on your travel history and route. Travelers arriving from countries with risk of yellow fever transmission may need proof of vaccination. Check official health advice for your nationality and routing before departure."
      }
    ],
    "faqs": [
      {
        "q": "What is the official Ethiopia eVisa website?",
        "a": "The official portal is evisa.gov.et. Travelers should use the official government site rather than third-party visa websites."
      },
      {
        "q": "How much passport validity do I need for Ethiopia?",
        "a": "The official eVisa guidance says the passport should have at least six months validity from the date of arrival."
      },
      {
        "q": "Can Sawla Tours arrange my visa?",
        "a": "Sawla can guide you on the process and check the itinerary details you need, but travelers normally submit their own eVisa application through the official portal."
      }
    ],
    "relatedDestinations": [
      "addis-ababa"
    ],
    "relatedGuides": [
      "how-to-get-to-ethiopia",
      "health-safety-ethiopia",
      "general-travel-tips"
    ],
    "keywords": [
      "Ethiopia eVisa",
      "Ethiopia visa requirements",
      "Ethiopia entry requirements"
    ]
  },
  {
    "slug": "health-safety-ethiopia",
    "title": "Health, Altitude & Travel Safety in Ethiopia",
    "category": "Health & Safety",
    "readTime": "12 min",
    "metaTitle": "Health & Safety in Ethiopia | Altitude, Malaria & Travel Advice",
    "metaDesc": "Practical Ethiopia health and safety guide covering altitude, malaria zones, water, food, road travel, medical preparation and regional risk monitoring.",
    "dek": "Safe Ethiopia travel is built on preparation, not fear. Most visitor issues are ordinary travel-health matters: altitude, dehydration, stomach upset, heat, road fatigue and mosquito precautions in lower elevations. Regional security also needs current, local assessment.",
    "updated": "2026-06-12",
    "quickFacts": [
      "Consult a travel-health clinic 6 to 8 weeks before departure",
      "Malaria precautions may apply below 2,500m depending on route",
      "Altitude matters in Lalibela, Simien, Bale and Addis",
      "Use sealed or filtered water",
      "Regional access must be checked close to travel"
    ],
    "sections": [
      {
        "heading": "Altitude is often underestimated",
        "body": "Addis Ababa sits high, Lalibela is higher, and Simien and Bale routes can exceed 3,600 to 4,000 metres. Travelers should pace the first days, hydrate, limit alcohol, walk slowly and tell the guide about headaches, nausea or unusual breathlessness. Strong itineraries avoid placing the most demanding high-altitude day immediately after arrival."
      },
      {
        "heading": "Malaria and mosquito precautions",
        "body": "The CDC currently notes malaria transmission in Ethiopia in areas below 2,500 metres. This does not mean every traveler needs the same medication, but it does mean you should discuss your exact route with a qualified travel-health professional and pack repellant, appropriate clothing and any prescribed prophylaxis."
      },
      {
        "heading": "Food, water and stomach comfort",
        "body": "Ethiopian food is one of the pleasures of travel, but visitors should be sensible. Drink sealed or properly filtered water, wash hands frequently, go slowly with very spicy dishes at the beginning, and use trusted restaurants in Addis and regional towns. On remote routes, Sawla-controlled meals and mobile-camp hygiene matter."
      },
      {
        "heading": "Regional security monitoring",
        "body": "Ethiopia’s travel picture is regional, not uniform. Established tourism corridors can be operating normally while other areas require caution. Sawla uses local contacts, driver reports, guides, lodge updates and official advisories to make route decisions and will adjust itineraries if conditions change."
      }
    ],
    "faqs": [
      {
        "q": "Is Ethiopia safe for tourists?",
        "a": "Many established tourism routes are visited safely, but conditions vary by region and can change. Work with current local advice rather than relying on old guidebooks or generic headlines."
      },
      {
        "q": "Do I need malaria tablets for Ethiopia?",
        "a": "It depends on your route and medical profile. The CDC notes malaria risk below 2,500 metres, so consult a travel-health clinic with your itinerary."
      },
      {
        "q": "Is altitude a real concern?",
        "a": "Yes, especially in Simien, Bale, Lalibela and even Addis for some travelers. Proper pacing and hydration are important."
      }
    ],
    "relatedDestinations": [
      "simien-mountain-national-park",
      "bale-mountains-national-park",
      "danakil-depression-tour-packages"
    ],
    "relatedGuides": [
      "safety-in-ethiopia",
      "what-to-pack-for-ethiopia",
      "how-to-plan-your-trip"
    ],
    "keywords": [
      "Ethiopia travel health",
      "Ethiopia altitude",
      "Ethiopia malaria"
    ]
  },
  {
    "slug": "safety-in-ethiopia",
    "title": "Safety in Ethiopia for Travelers",
    "category": "Safety & Risk",
    "readTime": "11 min",
    "metaTitle": "Safety in Ethiopia for Travelers | Sawla Tours",
    "metaDesc": "Honest Ethiopia safety guide explaining regional risk, road safety, remote travel, guide support, official advisories and Sawla’s local monitoring approach.",
    "dek": "Safety in Ethiopia is best understood region by region. A destination can be excellent for travel while another area of the country needs caution. The role of a serious local operator is to separate real conditions from rumor, monitor access daily and design routes with backups.",
    "updated": "2026-06-12",
    "quickFacts": [
      "Risk varies by region and season",
      "Remote routes need local guides, scouts or escorts where required",
      "Road safety depends on vehicle quality, driver judgement and realistic days",
      "Government advisories are useful but not the only source",
      "Sawla does not operate routes it considers unsafe"
    ],
    "sections": [
      {
        "heading": "Understand Ethiopia as a regional destination",
        "body": "Ethiopia is large and politically complex. Addis, Lalibela, Gondar, Bahir Dar, Simien, Bale, Harar, the Rift Valley and Omo can each have different access realities at the same time. Responsible planning avoids sweeping claims and instead evaluates the route, date, road, local contacts and client profile."
      },
      {
        "heading": "Road safety and realistic days",
        "body": "For many travelers, the most important safety factor is not conflict but road fatigue. Long drives, mountain roads, livestock, rain, dust and night driving all matter. Sawla itineraries avoid unnecessary night driving and use experienced drivers who understand regional roads, police posts, fuel stops and realistic timing."
      },
      {
        "heading": "Remote travel requirements",
        "body": "Danakil requires Afar logistics and support. National parks may require scouts or local guides. Omo Valley visits need community coordination and respectful permission. Gheralta church climbs demand honest fitness assessment. A premium itinerary explains these requirements before the trip, not after arrival."
      },
      {
        "heading": "How Sawla makes decisions",
        "body": "Sawla combines official advisories with on-the-ground intelligence from guides, drivers, lodge managers, local partners and regional contacts. If a route is not right for the travel date, the itinerary is amended rather than forcing a plan that looked good months earlier."
      }
    ],
    "faqs": [
      {
        "q": "Does Sawla follow government travel advisories?",
        "a": "Yes, advisories are considered, but Sawla also checks local operational reality through people on the ground."
      },
      {
        "q": "Can routes change after booking?",
        "a": "Yes. If safety, weather, road access or flights change, a responsible operator updates the route."
      },
      {
        "q": "Is independent travel recommended in remote Ethiopia?",
        "a": "For remote regions such as Danakil, Omo, national parks and some highland routes, guided travel is strongly recommended and sometimes required."
      }
    ],
    "relatedDestinations": [
      "danakil-depression-tour-packages",
      "omo-valley-tribes",
      "tigray-rock-hewn-churches-historical-sites"
    ],
    "relatedGuides": [
      "health-safety-ethiopia",
      "ethiopia-travel-circuits",
      "general-travel-tips"
    ],
    "keywords": [
      "is Ethiopia safe",
      "Ethiopia travel safety",
      "Ethiopia regional travel advice"
    ]
  },
  {
    "slug": "what-to-pack-for-ethiopia",
    "title": "What to Pack for Ethiopia",
    "category": "Packing",
    "readTime": "10 min",
    "metaTitle": "What to Pack for Ethiopia | Complete Packing Guide",
    "metaDesc": "Complete Ethiopia packing guide for highlands, churches, Danakil, Omo Valley, photography, trekking, domestic flights and respectful clothing.",
    "dek": "Packing for Ethiopia is about layers, modesty and regional contrast. A single trip can include cool highland mornings, hot lowland afternoons, dusty roads, Orthodox church visits, mountain walks and domestic flights with luggage limits.",
    "updated": "2026-06-12",
    "quickFacts": [
      "Pack layers for altitude and heat",
      "Bring modest clothing for churches and communities",
      "Good walking shoes matter more than formal clothes",
      "Carry sun protection, torch, power bank and personal medication",
      "Photographers should plan luggage and permissions early"
    ],
    "sections": [
      {
        "heading": "Clothing by region",
        "body": "For Addis, Lalibela, Gondar, Simien and Bale, pack layers: light shirts, fleece or warm jacket, rain shell and comfortable trousers. For Danakil, Omo and lowland areas, pack breathable long sleeves, a sun hat, sunglasses and dust protection. Avoid clothing that is too revealing in rural or religious settings."
      },
      {
        "heading": "Church and cultural etiquette clothing",
        "body": "For Ethiopian Orthodox churches, shoulders and knees should be covered. Shoes are removed before entering churches, so easy footwear is helpful. A light scarf is useful for women in conservative settings and for dust or sun. In Omo Valley and markets, modest neutral clothing supports respectful interaction."
      },
      {
        "heading": "Gear essentials",
        "body": "Bring a small daypack, refillable bottle or purification approach, headlamp, power bank, universal adapter, sunscreen, lip balm, insect repellent, basic first-aid kit and any personal medication in original packaging. For mountain routes, include warm layers even when the rest of the itinerary feels tropical."
      },
      {
        "heading": "Specialist equipment",
        "body": "Binoculars are valuable for wildlife and birding. Drones, professional filming equipment, satellite devices and some communication equipment can require advance permission. Sawla should know about these items before arrival so customs, permits and local rules can be addressed."
      }
    ],
    "faqs": [
      {
        "q": "Do I need warm clothes in Ethiopia?",
        "a": "Yes. Highlands and mountain areas can be cold in the morning and evening, especially Simien, Bale, Lalibela and Addis."
      },
      {
        "q": "What should I wear to churches?",
        "a": "Cover shoulders and knees, remove shoes before entry and carry socks or easy footwear."
      },
      {
        "q": "Can I bring a drone to Ethiopia?",
        "a": "Do not bring a drone without advance planning. Permissions may be required and rules can change."
      }
    ],
    "relatedDestinations": [
      "lalibela",
      "simien-mountain-national-park",
      "omo-valley-tribes"
    ],
    "relatedGuides": [
      "drone-binocular-permits-ethiopia",
      "ethiopia-photography-guide",
      "health-safety-ethiopia"
    ],
    "keywords": [
      "Ethiopia packing list",
      "what to wear in Ethiopia",
      "Ethiopia drone permit"
    ]
  },
  {
    "slug": "ethiopia-travel-costs",
    "title": "Ethiopia Travel Costs & Budgeting",
    "category": "Budget & Value",
    "readTime": "11 min",
    "metaTitle": "Ethiopia Travel Costs & Budgeting | Private Tour Guide",
    "metaDesc": "Understand Ethiopia travel costs for private tours, hotels, guides, domestic flights, remote logistics, mobile camps and what drives price differences.",
    "dek": "Ethiopia can be inexpensive for simple travel and expensive for high-quality private logistics. The difference is not only hotel level: domestic flights, remote vehicles, specialist guides, permits, mobile camps and contingency planning all shape the real cost.",
    "updated": "2026-06-12",
    "quickFacts": [
      "Private trips cost more because logistics are spread across fewer travelers",
      "Domestic flights can save days but add cost",
      "Remote areas require vehicles, fuel, guides and local support",
      "Best-available hotels vary greatly by region",
      "The cheapest itinerary often removes the exact support Ethiopia needs"
    ],
    "sections": [
      {
        "heading": "What drives the cost",
        "body": "Major cost drivers include vehicle type and number of days, domestic flights, guide quality, accommodation category, park and local fees, remote escorts, mobile camping, specialist photography or birding support and the level of contingency built into the route."
      },
      {
        "heading": "Hotels and regional reality",
        "body": "A five-star Addis hotel and the best lodge in a remote town are not comparable. Ethiopia pricing must be judged by local best-available standards. Premium planning means telling travelers honestly where comfort is strong and where expectations need adjustment."
      },
      {
        "heading": "Private guide and driver value",
        "body": "In Ethiopia, a guide is not just a narrator. The right guide manages timing, local permission, church etiquette, market visits, altitude pacing, road decisions and interpretation. A skilled driver is equally important on long regional routes."
      },
      {
        "heading": "False economy in remote areas",
        "body": "Very cheap remote itineraries often save money by reducing support vehicles, guide quality, safety buffers, hotel standards or community coordination. That can damage the experience and create risk. Value should be measured by reliability, integrity and depth, not only by the lowest headline price."
      }
    ],
    "faqs": [
      {
        "q": "Is Ethiopia cheap to travel?",
        "a": "Simple independent travel can be low-cost, but well-run private Ethiopia tours with flights, guides, vehicles and remote logistics are not cheap."
      },
      {
        "q": "Why do two Ethiopia quotes differ so much?",
        "a": "Differences often come from hotel category, domestic flights, vehicle standard, guide level, included fees, remote support and whether contingency is priced honestly."
      },
      {
        "q": "Can Sawla design to a budget?",
        "a": "Yes. Sawla can suggest where to simplify without weakening safety, comfort or the core experience."
      }
    ],
    "relatedDestinations": [
      "addis-ababa",
      "omo-valley-tribes",
      "danakil-depression-tour-packages"
    ],
    "relatedGuides": [
      "hotels-lodges-ethiopia",
      "how-to-plan-your-trip",
      "ethiopia-domestic-flights"
    ],
    "keywords": [
      "Ethiopia travel cost",
      "Ethiopia private tour price",
      "Ethiopia travel budget"
    ]
  },
  {
    "slug": "hotels-lodges-ethiopia",
    "title": "Hotels & Lodges in Ethiopia",
    "category": "Accommodation",
    "readTime": "12 min",
    "metaTitle": "Hotels & Lodges in Ethiopia | Accommodation Guide",
    "metaDesc": "Honest guide to Ethiopia hotels and lodges in Addis, Lalibela, Gondar, Simien, Bale, Omo, Danakil and remote regions with comfort expectations.",
    "dek": "Accommodation in Ethiopia is wonderfully varied: international hotels in Addis, character lodges in the historic north, mountain lodges, simple regional hotels, remote camps and best-available properties where luxury is not the right word. Knowing the difference prevents disappointment.",
    "updated": "2026-06-12",
    "quickFacts": [
      "Addis has the widest luxury and business-hotel choice",
      "Lalibela, Gondar and Bahir Dar have strong mid-range and boutique options",
      "Simien and Bale choices depend on route and availability",
      "Omo and remote wildlife regions require realistic comfort expectations",
      "Danakil often uses simple camps or expedition-style logistics"
    ],
    "sections": [
      {
        "heading": "Addis Ababa comfort level",
        "body": "Addis offers Ethiopia’s strongest hotel infrastructure, from international luxury and business hotels to character boutique properties. It is the right place to recover after arrival, prepare for domestic flights, handle equipment, meet the guide and enjoy quality restaurants."
      },
      {
        "heading": "Historic north lodging",
        "body": "Lalibela, Gondar and Bahir Dar offer the best regional balance of comfort, charm and access. Views, location and management quality matter as much as star category. During Timkat, Christmas and peak season, early booking is essential."
      },
      {
        "heading": "Mountain and wildlife lodges",
        "body": "In Simien and Bale, the best choice depends on whether the priority is park access, comfort, altitude pacing or wildlife viewing. Some lodges are inside or near key landscapes; others require longer transfers but may suit budget or availability better."
      },
      {
        "heading": "Remote-region honesty",
        "body": "In Omo, Danakil, Gambella, Chebera Churchura and Kafta Sheraro, accommodation can be simple. A premium operator should describe this clearly and offer the best workable option: lodge, hotel, mobile camp or expedition setup depending on the route."
      }
    ],
    "faqs": [
      {
        "q": "Are there luxury hotels everywhere in Ethiopia?",
        "a": "No. Addis has true luxury options, but remote regions are often best-available rather than luxury."
      },
      {
        "q": "Should I choose location or comfort?",
        "a": "It depends on the destination. For wildlife and sunrise photography, location can be more valuable than a higher room category farther away."
      },
      {
        "q": "Can Sawla arrange mobile camps?",
        "a": "Yes, for selected remote routes where camping creates a better or more realistic experience."
      }
    ],
    "relatedDestinations": [
      "addis-ababa",
      "lalibela",
      "bale-mountains-national-park"
    ],
    "relatedGuides": [
      "ethiopia-travel-costs",
      "how-to-plan-your-trip",
      "mobile-camping-ethiopia"
    ],
    "keywords": [
      "Ethiopia hotels",
      "Ethiopia lodges",
      "where to stay in Ethiopia"
    ]
  },
  {
    "slug": "ethiopia-safaris",
    "title": "Planning an Ethiopia Safari",
    "category": "Wildlife & Safari",
    "readTime": "11 min",
    "metaTitle": "Ethiopia Safari Planning Guide | Wildlife & Birding",
    "metaDesc": "Plan an Ethiopia wildlife safari focused on endemic species, Bale Mountains, Simien, Awash, Rift Valley, birding, photography and realistic sightings.",
    "dek": "Ethiopia is not a classic Big Five safari destination. Its strength is rarity: Ethiopian wolf, gelada, Walia ibex, mountain nyala, Bale monkey, Swayne’s hartebeest, extraordinary birds and landscapes that shift from afroalpine plateau to desert and forest.",
    "updated": "2026-06-12",
    "quickFacts": [
      "Best wolf destination: Bale Mountains",
      "Best gelada destination: Simien Mountains",
      "Best classic dry-country wildlife: Awash and Aledeghi extensions",
      "Best birding diversity: Bale, Rift Valley, Awash and Kafa combinations",
      "Wildlife sightings are likely in key habitats but never guaranteed"
    ],
    "sections": [
      {
        "heading": "How Ethiopia safari differs",
        "body": "A safari in Ethiopia is more about endemism and ecology than large predator drama. Travelers should come for species that exist nowhere else, highland wildlife, birding, landscapes and the thrill of specialist guiding. This difference is a strength when expectations are set correctly."
      },
      {
        "heading": "Bale Mountains",
        "body": "Bale is the flagship wildlife destination for Ethiopian wolf, mountain nyala, Bale monkey, giant mole-rat and afroalpine birding. The Sanetti Plateau, Harenna Forest and Dinsho area each need different timing and guiding strategy."
      },
      {
        "heading": "Simien Mountains",
        "body": "Simien is best for gelada encounters, Walia ibex possibilities, lammergeier, escarpment scenery and trekking. Ethiopian wolf is not the primary reason to visit Simien; Bale is the stronger wolf destination."
      },
      {
        "heading": "Birding and specialist routes",
        "body": "Ethiopia is one of Africa’s great birding countries. Specialist routes can include Awash, Aledeghi, Rift Valley lakes, Bale, Jemma Valley, Ankober, Kafa and highland endemics. Good birding itineraries move slowly and start early."
      }
    ],
    "faqs": [
      {
        "q": "Can I see the Big Five in Ethiopia?",
        "a": "Ethiopia is not a Big Five safari destination. It is stronger for endemic mammals, birds and unusual habitats."
      },
      {
        "q": "Where is the best place to see Ethiopian wolf?",
        "a": "Bale Mountains, especially the Sanetti Plateau, is the best-known destination."
      },
      {
        "q": "Are wildlife sightings guaranteed?",
        "a": "No ethical operator should guarantee wildlife sightings, but good timing and specialist guides improve chances."
      }
    ],
    "relatedDestinations": [
      "bale-mountains-national-park",
      "simien-mountain-national-park",
      "awash-national-park"
    ],
    "relatedGuides": [
      "popular-wildlife-ethiopia",
      "ethiopia-birding-guide",
      "ethiopia-photography-guide"
    ],
    "keywords": [
      "Ethiopia safari",
      "Ethiopian wolf safari",
      "Ethiopia wildlife tours"
    ]
  },
  {
    "slug": "popular-wildlife-ethiopia",
    "title": "Wildlife to See in Ethiopia",
    "category": "Wildlife Species",
    "readTime": "10 min",
    "metaTitle": "Wildlife to See in Ethiopia | Endemic Species Guide",
    "metaDesc": "Guide to Ethiopia wildlife including Ethiopian wolf, gelada, Walia ibex, mountain nyala, Bale monkey, Swayne’s hartebeest and birdlife.",
    "dek": "Ethiopia’s wildlife appeal is built on species that are rare, endemic or tied to unusual highland habitats. The best trips match species goals to the right park, altitude, season and guide expertise.",
    "updated": "2026-06-12",
    "quickFacts": [
      "Ethiopian wolf: Bale Mountains",
      "Gelada: Simien and other highland escarpments",
      "Walia ibex: Simien Mountains",
      "Mountain nyala: Bale Mountains",
      "Swayne’s hartebeest: Senkelle and selected grasslands"
    ],
    "sections": [
      {
        "heading": "Ethiopian wolf",
        "body": "Africa’s rarest wild canid is the headline species of Bale Mountains. The Sanetti Plateau offers the best-known viewing opportunities, but weather, denning behaviour and road conditions affect success. Sightings require patience and responsible distance."
      },
      {
        "heading": "Gelada",
        "body": "Geladas are among Ethiopia’s most charismatic mammals. In the Simien Mountains, large troops graze close to escarpments, allowing close, unhurried viewing and photography. Guides manage approach distances so the animals remain relaxed."
      },
      {
        "heading": "Walia ibex and mountain nyala",
        "body": "Walia ibex is associated with the Simien escarpment, while mountain nyala is best sought in Bale. Both require habitat knowledge, early starts and realistic expectations. These are not zoo-like encounters; they are wild animals in mountain terrain."
      },
      {
        "heading": "Birds and lesser-known wildlife",
        "body": "Ethiopia has exceptional birdlife, including endemics and near-endemics. Bale, Awash, the Rift Valley, Jemma Valley, Ankober, Kafa and highland wetlands can be combined for serious birding. Lesser-known mammals include Bale monkey, Swayne’s hartebeest, Menelik’s bushbuck and desert species in drier areas."
      }
    ],
    "faqs": [
      {
        "q": "What wildlife is Ethiopia most famous for?",
        "a": "Ethiopian wolf, gelada, Walia ibex, mountain nyala and Ethiopia’s endemic birdlife are the major wildlife draws."
      },
      {
        "q": "Where should photographers go for geladas?",
        "a": "The Simien Mountains are the classic destination for gelada photography."
      },
      {
        "q": "Can wildlife be combined with cultural sites?",
        "a": "Yes. Simien combines well with Gondar and Lalibela; Bale combines with the Rift Valley or eastern/southern routes."
      }
    ],
    "relatedDestinations": [
      "bale-mountains-national-park",
      "simien-mountain-national-park",
      "kafa-biosphere-coffee-forest"
    ],
    "relatedGuides": [
      "ethiopia-safaris",
      "ethiopia-birding-guide",
      "ethiopia-photography-guide"
    ],
    "keywords": [
      "Ethiopia wildlife",
      "endemic animals Ethiopia",
      "Ethiopian wolf gelada"
    ]
  },
  {
    "slug": "ethiopia-birding-guide",
    "title": "Birdwatching in Ethiopia",
    "category": "Birding",
    "readTime": "12 min",
    "metaTitle": "Birdwatching in Ethiopia | Endemic Birding Guide",
    "metaDesc": "Expert Ethiopia birdwatching guide covering Bale, Awash, Rift Valley, Jemma Valley, Ankober, Kafa, endemics, seasons and guide planning.",
    "dek": "Ethiopia is one of Africa’s most rewarding birding countries because altitude, isolation and habitat variety create exceptional endemic and near-endemic opportunities. A serious birding trip should be designed around habitat sequence, early starts and specialist guide knowledge.",
    "updated": "2026-06-12",
    "quickFacts": [
      "Best broad birding route: Addis highlands, Awash, Rift Valley, Bale and Jemma/Ankober",
      "Best afroalpine birding: Bale and Simien",
      "Best dry-country birding: Awash and Aledeghi",
      "Best forest birding: Kafa and Harenna Forest",
      "Binoculars are essential; scopes useful for serious birders"
    ],
    "sections": [
      {
        "heading": "Why Ethiopia is special for birders",
        "body": "Ethiopia’s highlands, Rift Valley lakes, escarpments, forests, wetlands and drylands hold a remarkable mix of endemic, near-endemic and regionally sought-after species. The country is especially rewarding for travelers who combine birding with landscapes, culture and photography."
      },
      {
        "heading": "Core birding regions",
        "body": "Bale offers afroalpine and forest birding, Awash and Aledeghi provide dry-country species, the Rift Valley lakes add waterbirds, and Jemma Valley/Ankober are important for highland and escarpment targets. Kafa and Harenna add forest quality for deeper trips."
      },
      {
        "heading": "How to plan a birding trip",
        "body": "Birding itineraries need slower mornings, early departures, flexible stops and fewer hotel changes than general sightseeing routes. A specialist bird guide is very different from a general cultural guide; Sawla matches guide choice to the birding seriousness of the traveler."
      },
      {
        "heading": "Equipment and permissions",
        "body": "Bring binoculars, field guide app or book, spare batteries, memory cards, neutral clothing and a checklist. Drones are generally inappropriate around wildlife and can require permissions; serious birding groups should discuss optical equipment and luggage needs early."
      }
    ],
    "faqs": [
      {
        "q": "Is Ethiopia good for birdwatching?",
        "a": "Yes, Ethiopia is outstanding for birdwatching, especially for endemic and near-endemic species."
      },
      {
        "q": "Do I need a specialist bird guide?",
        "a": "For serious birding, yes. A general guide is not enough for difficult targets and bird calls."
      },
      {
        "q": "Can birding be combined with cultural touring?",
        "a": "Yes, but serious birding requires early starts and slower pacing, so the itinerary must be designed carefully."
      }
    ],
    "relatedDestinations": [
      "bale-mountains-national-park",
      "awash-national-park",
      "kafa-biosphere-coffee-forest"
    ],
    "relatedGuides": [
      "popular-wildlife-ethiopia",
      "ethiopia-safaris",
      "drone-binocular-permits-ethiopia"
    ],
    "keywords": [
      "Ethiopia birding",
      "birdwatching Ethiopia",
      "Ethiopia endemic birds"
    ]
  },
  {
    "slug": "ethiopia-photography-guide",
    "title": "Photography in Ethiopia",
    "category": "Photography",
    "readTime": "13 min",
    "metaTitle": "Photography in Ethiopia | Ethical Photo Travel Guide",
    "metaDesc": "Guide to Ethiopia photography tours: light, timing, people photography, church rules, Omo permissions, wildlife lenses, drones and respectful practice.",
    "dek": "Ethiopia is visually extraordinary, but photography here must be handled with care. The best images come from trust, timing and patience—not from rushing people, staging culture or ignoring sacred rules.",
    "updated": "2026-06-12",
    "quickFacts": [
      "Best light: early morning and late afternoon",
      "People photography requires consent and local guidance",
      "Church interiors may restrict flash, tripods or photography",
      "Omo photography must be ethical and permission-based",
      "Drones require advance planning and may not be allowed in many places"
    ],
    "sections": [
      {
        "heading": "Light and timing",
        "body": "The highlands can be dazzling at midday and magical at the edges of the day. Lalibela churches, Simien escarpments, Bale plateau, Danakil salt flats, Omo markets and Harar alleys all reward early starts and late-afternoon patience. Build the itinerary around light if photography is the priority."
      },
      {
        "heading": "People photography and consent",
        "body": "Portrait photography in Ethiopia should never be treated as extraction. In markets, villages, churches and ceremonies, the guide’s role is to explain, request permission, manage expectations and prevent misunderstandings. Some contexts involve payment; others require no camera at all."
      },
      {
        "heading": "Sacred spaces and ceremonies",
        "body": "Orthodox churches, mosques and pilgrimage events have rules. Flash, tripods and interior photography may be restricted. The strongest images often come from respectful observation: candles, doorways, processions, textiles, hands and atmosphere rather than intrusive close-ups."
      },
      {
        "heading": "Wildlife and landscape equipment",
        "body": "For gelada, wolf and birding, bring a longer lens and plan luggage carefully. For Danakil and desert routes, protect gear from dust, heat and salt. For mountain treks, carry only what you can manage at altitude."
      }
    ],
    "faqs": [
      {
        "q": "Can I photograph people in Ethiopia?",
        "a": "Yes, but only with consent and good local guidance. Rules vary by place, market, ceremony and community."
      },
      {
        "q": "Are drones allowed in Ethiopia?",
        "a": "Drones require advance planning and may be restricted by national or local rules. Do not arrive with a drone without discussing it first."
      },
      {
        "q": "What lens is best for Ethiopia?",
        "a": "A versatile zoom and a longer lens for wildlife are useful. For serious photography, plan around your subjects: churches, portraits, wildlife, landscapes or festivals."
      }
    ],
    "relatedDestinations": [
      "lalibela",
      "omo-valley-tribes",
      "simien-mountain-national-park"
    ],
    "relatedGuides": [
      "drone-binocular-permits-ethiopia",
      "ethiopia-festival-calendar",
      "what-to-pack-for-ethiopia"
    ],
    "keywords": [
      "Ethiopia photography tour",
      "photographing Omo Valley",
      "Ethiopia drone permit"
    ]
  },
  {
    "slug": "drone-binocular-permits-ethiopia",
    "title": "Drone, Binocular & Equipment Permissions",
    "category": "Permits & Gear",
    "readTime": "9 min",
    "metaTitle": "Drone & Binocular Permissions in Ethiopia | Sawla Tours",
    "metaDesc": "Guide to bringing drones, binoculars, filming gear, satellite devices and professional equipment into Ethiopia, including advance permission planning.",
    "dek": "Some travel equipment that feels ordinary elsewhere can create customs or local-permission questions in Ethiopia. Binoculars are common for birding and wildlife, but drones, professional film gear, satellite devices and some communication equipment should be declared and planned well ahead.",
    "updated": "2026-06-12",
    "quickFacts": [
      "Tell Sawla about drones before booking flights",
      "Drone use may require national and local permissions",
      "Binoculars are useful but should still be packed transparently",
      "Professional filming gear may need separate media permits",
      "Rules can change, so verify before arrival"
    ],
    "sections": [
      {
        "heading": "Drones require serious advance planning",
        "body": "Do not treat drone travel as casual. Ethiopia may require aviation, security or local permissions depending on route, purpose and equipment. Even with national paperwork, local rules around churches, parks, airports, communities and sensitive areas may restrict use."
      },
      {
        "heading": "Binoculars and wildlife equipment",
        "body": "Binoculars are highly recommended for birding, Bale, Simien, Awash and wildlife routes. They are generally less complicated than drones, but travelers should pack them visibly and be ready to explain their purpose at customs or checkpoints if asked."
      },
      {
        "heading": "Professional filming and media equipment",
        "body": "Commercial filming, documentary equipment, large camera kits, microphones, satellite devices and crew logistics can require additional planning beyond a tourist itinerary. Sawla Tours and Sawla Films can coordinate relevant local permissions when details are shared early."
      },
      {
        "heading": "What to send before travel",
        "body": "Provide equipment list, serial numbers if relevant, drone model, intended locations, purpose of use, crew names and travel dates. This gives the team time to check permissions and avoid airport or field complications."
      }
    ],
    "faqs": [
      {
        "q": "Can Sawla help with drone permission?",
        "a": "Sawla can advise and help coordinate permission planning where possible, but approval depends on current rules, route and authorities."
      },
      {
        "q": "Are binoculars allowed?",
        "a": "Binoculars are commonly used by birders and wildlife travelers, but pack them clearly and discuss specialist gear before arrival."
      },
      {
        "q": "Can I film commercially on a tourist trip?",
        "a": "Commercial filming may require separate permits. Tell Sawla early so the trip is planned correctly."
      }
    ],
    "relatedDestinations": [
      "bale-mountains-national-park",
      "omo-valley-tribes",
      "danakil-depression-tour-packages"
    ],
    "relatedGuides": [
      "ethiopia-photography-guide",
      "ethiopia-birding-guide",
      "what-to-pack-for-ethiopia"
    ],
    "keywords": [
      "Ethiopia drone permit",
      "bring binoculars to Ethiopia",
      "filming permits Ethiopia"
    ]
  },
  {
    "slug": "ethiopian-food-coffee",
    "title": "Ethiopian Food, Coffee & Cuisine",
    "category": "Food & Culture",
    "readTime": "9 min",
    "metaTitle": "Ethiopian Food & Coffee Culture | Travel Guide",
    "metaDesc": "Explore Ethiopian food and coffee culture: injera, wat, fasting food, coffee ceremony, tej, spice, regional meals and food etiquette for travelers.",
    "dek": "Food is one of Ethiopia’s great cultural gateways. Meals are communal, fragrant and expressive, and coffee is not simply a drink but a ceremony of welcome, conversation and time.",
    "updated": "2026-06-12",
    "quickFacts": [
      "Injera is the foundation of many meals",
      "Fasting food is excellent for vegetarians and vegans",
      "Coffee ceremony is central to hospitality",
      "Go slowly with spice if you are new to berbere",
      "Use the right hand for shared eating when appropriate"
    ],
    "sections": [
      {
        "heading": "Injera and shared meals",
        "body": "Injera, the sour flatbread made from teff or mixed grains, is the base for many Ethiopian meals. It is served with stews, vegetables, lentils, meat dishes and spices. Eating communally is part of the experience, though individual plates are widely available in hotels and restaurants."
      },
      {
        "heading": "Fasting food and vegetarian travel",
        "body": "Ethiopian Orthodox fasting traditions make Ethiopia one of Africa’s easier countries for vegetarian and vegan travelers. Fasting dishes often include lentils, chickpeas, greens, potatoes, shiro and vegetable stews without animal products."
      },
      {
        "heading": "Coffee ceremony",
        "body": "The coffee ceremony involves roasting green beans, grinding, brewing and serving coffee slowly, often with incense and conversation. Kafa and other coffee regions add another layer of origin story, forest ecology and local identity."
      },
      {
        "heading": "Food comfort on tour",
        "body": "Travelers with sensitive stomachs should start gently, drink safe water and avoid overdoing raw or very spicy foods in the first days. Sawla can plan meals around dietary requirements, especially on mobile camps and remote routes."
      }
    ],
    "faqs": [
      {
        "q": "Is Ethiopian food very spicy?",
        "a": "Some dishes are spicy, but many are mild or can be adjusted. Shiro, lentils and vegetable fasting dishes are good entry points."
      },
      {
        "q": "Is Ethiopia good for vegetarians?",
        "a": "Yes. Orthodox fasting cuisine makes vegetarian and vegan eating easier than in many countries."
      },
      {
        "q": "Where is the best place to experience coffee culture?",
        "a": "Coffee ceremonies are found across Ethiopia, while Kafa offers a deeper origin and forest-coffee context."
      }
    ],
    "relatedDestinations": [
      "addis-ababa",
      "kafa-biosphere-coffee-forest",
      "harar"
    ],
    "relatedGuides": [
      "general-travel-tips",
      "why-visit-ethiopia",
      "how-to-plan-your-trip"
    ],
    "keywords": [
      "Ethiopian food",
      "Ethiopia coffee ceremony",
      "injera Ethiopian cuisine"
    ]
  },
  {
    "slug": "ethiopia-festival-calendar",
    "title": "Ethiopia Festival Calendar",
    "category": "Festivals",
    "readTime": "12 min",
    "metaTitle": "Ethiopia Festival Calendar | Timkat, Meskel, Fasika",
    "metaDesc": "Plan Ethiopia festival travel around Timkat, Meskel, Fasika, Genna, Enkutatash and major Orthodox celebrations with timing and etiquette advice.",
    "dek": "Ethiopia’s festival calendar is one of the most powerful reasons to visit. These are not staged events for tourists; they are living religious and community gatherings. The right itinerary protects both the traveler’s experience and the dignity of the celebration.",
    "updated": "2026-06-12",
    "quickFacts": [
      "Timkat: around 19 January, strongest in Gondar, Lalibela and Addis",
      "Meskel: around 27 September, major public bonfires",
      "Genna: Ethiopian Christmas around 7 January",
      "Fasika: Ethiopian Easter, date varies",
      "Book early and expect crowds, road closures and full hotels"
    ],
    "sections": [
      {
        "heading": "Timkat",
        "body": "Timkat, Ethiopian Epiphany, is the most famous festival for many visitors. Processions, overnight vigils, water blessings and white-robed crowds create extraordinary atmosphere. Gondar is the classic large-scale setting; Lalibela is more intimate and deeply spiritual."
      },
      {
        "heading": "Meskel",
        "body": "Meskel commemorates the finding of the True Cross and is marked by Demera bonfires. Addis Ababa has a major public celebration, while regional towns and villages offer smaller, atmospheric gatherings. Meskel can combine well with post-rain green landscapes."
      },
      {
        "heading": "Genna and Fasika",
        "body": "Ethiopian Christmas, Genna, is powerful in Lalibela, where pilgrims gather around the rock-hewn churches. Fasika, Ethiopian Easter, follows a long fasting period and culminates in night liturgy and celebration. Dates follow the Ethiopian Orthodox calendar and should be checked every year."
      },
      {
        "heading": "Festival etiquette",
        "body": "Dress modestly, move slowly, avoid blocking worshippers, ask before photographing individuals and follow your guide’s advice. The best festival experiences come from patience and respect, not from pushing to the front."
      }
    ],
    "faqs": [
      {
        "q": "Which Ethiopia festival is best for first-time visitors?",
        "a": "Timkat is the most visually powerful for many travelers, especially in Gondar or Lalibela."
      },
      {
        "q": "Do festival dates change?",
        "a": "Some dates are fixed in the Ethiopian calendar but may appear differently in the Gregorian calendar. Fasika changes each year."
      },
      {
        "q": "Are hotels expensive during festivals?",
        "a": "Prices and availability tighten sharply during major festivals. Book early."
      }
    ],
    "relatedDestinations": [
      "lalibela",
      "gondar",
      "addis-ababa"
    ],
    "relatedGuides": [
      "when-to-visit-ethiopia",
      "ethiopia-photography-guide",
      "how-to-plan-your-trip"
    ],
    "keywords": [
      "Ethiopia festivals",
      "Timkat Ethiopia",
      "Meskel Ethiopia"
    ]
  },
  {
    "slug": "cultural-etiquette-ethiopia",
    "title": "Cultural Etiquette in Ethiopia",
    "category": "Culture & Respect",
    "readTime": "10 min",
    "metaTitle": "Cultural Etiquette in Ethiopia | Respectful Travel Guide",
    "metaDesc": "Practical cultural etiquette for Ethiopia travel: greetings, churches, markets, Omo Valley visits, photography, dress, tipping and respectful behavior.",
    "dek": "Ethiopia is welcoming, but it is not culturally uniform. Etiquette changes between Addis, Orthodox church compounds, Muslim Harar, highland villages, Omo communities, markets and remote pastoral regions. Respectful travel begins with listening.",
    "updated": "2026-06-12",
    "quickFacts": [
      "Greetings matter; take time",
      "Dress modestly in churches and rural communities",
      "Remove shoes before entering Orthodox churches",
      "Ask before photographing people",
      "Let the guide handle sensitive local negotiations"
    ],
    "sections": [
      {
        "heading": "Greetings and pace",
        "body": "Ethiopian social rhythm values greeting, respect and patience. A few words of Amharic, a handshake, a smile and time for introductions can change the quality of an encounter. Rushing directly to questions or cameras feels abrupt in many settings."
      },
      {
        "heading": "Religious etiquette",
        "body": "In Orthodox church compounds, dress modestly, remove shoes where required and do not step into restricted areas. Women and men may have different spaces in some churches. In mosques or Muslim contexts such as Harar, follow local dress and access rules."
      },
      {
        "heading": "Markets and communities",
        "body": "Markets are working places, not photo sets. Move carefully, avoid blocking trade, ask before portraits and follow the guide’s advice about payment expectations. In Omo Valley, community visits should be arranged transparently and respectfully."
      },
      {
        "heading": "Tipping and appreciation",
        "body": "Tipping is appreciated but should be handled thoughtfully. Guides, drivers, scouts, porters, cooks and local assistants may all contribute to a journey. Sawla can provide route-specific guidance so tipping is fair and not disruptive."
      }
    ],
    "faqs": [
      {
        "q": "Is Ethiopia conservative about clothing?",
        "a": "In many rural and religious settings, yes. Modest clothing is recommended."
      },
      {
        "q": "Can I take photos in markets?",
        "a": "Often yes, but ask permission and follow your guide’s advice."
      },
      {
        "q": "Should I bargain in Ethiopia?",
        "a": "Light bargaining is normal in some markets, but aggressive bargaining over small amounts can feel disrespectful."
      }
    ],
    "relatedDestinations": [
      "harar",
      "lalibela",
      "omo-valley-tribes"
    ],
    "relatedGuides": [
      "ethiopia-photography-guide",
      "ethiopian-food-coffee",
      "responsible-travel-ethiopia"
    ],
    "keywords": [
      "Ethiopia etiquette",
      "Ethiopia cultural travel",
      "respectful travel Ethiopia"
    ]
  },
  {
    "slug": "responsible-travel-ethiopia",
    "title": "Responsible Travel in Ethiopia",
    "category": "Responsible Travel",
    "readTime": "10 min",
    "metaTitle": "Responsible Travel in Ethiopia | Sawla Tours Guide",
    "metaDesc": "Responsible Ethiopia travel guide covering community visits, photography ethics, wildlife distance, churches, local spending and low-impact logistics.",
    "dek": "Responsible travel in Ethiopia is not a slogan. It affects how churches are visited, how communities are photographed, how wildlife is approached, how guides are paid and how remote routes benefit local people rather than simply passing through them.",
    "updated": "2026-06-12",
    "quickFacts": [
      "Pay fairly for local services",
      "Use permission-based photography",
      "Keep distance from wildlife",
      "Respect sacred spaces and community privacy",
      "Choose depth over high-volume checklist travel"
    ],
    "sections": [
      {
        "heading": "Community benefit",
        "body": "Good Ethiopia travel uses local guides, scouts, community lodges, cooks, mule handlers, drivers and regional suppliers where appropriate. The goal is not charity; it is a fair travel economy where local knowledge is respected and paid for."
      },
      {
        "heading": "Photography ethics",
        "body": "A powerful portrait does not justify pressure, deception or intrusion. Permission, context and dignity matter. Sawla guides help manage expectations and avoid the damaging behaviour that can occur when visitors treat culture as spectacle."
      },
      {
        "heading": "Wildlife and landscape care",
        "body": "Stay on agreed paths, keep distance from wildlife, avoid drone disturbance, never feed animals and follow park rules. In fragile places such as Bale, Simien, Danakil and forest reserves, low-impact behaviour protects both ecology and access."
      },
      {
        "heading": "Slower travel is often better travel",
        "body": "Trying to see everything can increase road fatigue, emissions, superficial encounters and operational risk. A slower route with stronger interpretation often produces better memories and better local benefit."
      }
    ],
    "faqs": [
      {
        "q": "How can my trip benefit local communities?",
        "a": "Use local guides and services, spend time rather than rushing, pay fair fees and follow community rules."
      },
      {
        "q": "Is Omo Valley travel ethical?",
        "a": "It can be when visits are transparent, permission-based, fairly compensated and not staged or exploitative."
      },
      {
        "q": "Are drones responsible around wildlife or ceremonies?",
        "a": "Usually no. Drones can disturb people, wildlife and sacred spaces and may require permissions."
      }
    ],
    "relatedDestinations": [
      "omo-valley-tribes",
      "simien-mountain-national-park",
      "kafa-biosphere-coffee-forest"
    ],
    "relatedGuides": [
      "cultural-etiquette-ethiopia",
      "ethiopia-photography-guide",
      "drone-binocular-permits-ethiopia"
    ],
    "keywords": [
      "responsible travel Ethiopia",
      "ethical Omo Valley travel",
      "community tourism Ethiopia"
    ]
  },
  {
    "slug": "mobile-camping-ethiopia",
    "title": "Mobile Camping & Remote Logistics",
    "category": "Remote Logistics",
    "readTime": "9 min",
    "metaTitle": "Mobile Camping in Ethiopia | Remote Travel Logistics",
    "metaDesc": "Guide to mobile camping and remote logistics in Ethiopia: tents, crew, power, food, safety, Danakil, Omo, Bale, Suri and expedition-style routes.",
    "dek": "Some of Ethiopia’s most remarkable places are beyond normal hotel infrastructure. Mobile camping can turn difficult routes into comfortable, controlled and deeply memorable journeys when the crew, food, water, power and safety systems are professionally managed.",
    "updated": "2026-06-12",
    "quickFacts": [
      "Useful for remote Omo, Suri, Danakil, Bale extensions and specialist expeditions",
      "Comfort depends on crew quality, not only tent type",
      "Power, water and hygiene systems must be planned",
      "Remote camping should include local permissions and security awareness",
      "Best for photographers, film crews, scientists and adventurous private travelers"
    ],
    "sections": [
      {
        "heading": "When mobile camping makes sense",
        "body": "Mobile camps are valuable where hotels are too far away, too basic or wrongly located for the purpose of the trip. They can support photography, wildlife, film, research, remote culture and frontier routes. A camp near the right landscape can be better than a hotel several hours away."
      },
      {
        "heading": "What good logistics include",
        "body": "A proper mobile setup considers sleeping tents, shade, dining space, kitchen, drinking water, washing system, charging, lighting, waste handling, food hygiene, crew accommodation, local permission and backup plans. The invisible logistics matter as much as the visible tent."
      },
      {
        "heading": "Comfort and honesty",
        "body": "Mobile camping in Ethiopia can be comfortable, but it is still field travel. Travelers should understand bathroom arrangements, temperature, dust, insects, charging limits and the difference between luxury safari camps and expedition mobile camps."
      },
      {
        "heading": "Sawla field experience",
        "body": "Sawla’s Ethiopia operations experience includes remote routes where guides, drivers, cooks, scouts, local fixers and support teams must work together. The camp is part of the journey design, not an afterthought."
      }
    ],
    "faqs": [
      {
        "q": "Is mobile camping comfortable?",
        "a": "It can be very comfortable when well planned, but it remains field travel. Expectations should be clear before booking."
      },
      {
        "q": "Where is camping useful in Ethiopia?",
        "a": "Remote Omo/Suri routes, Danakil, specialist wildlife areas and film or photography expeditions can all benefit from mobile camps."
      },
      {
        "q": "Can families use mobile camps?",
        "a": "Yes, for the right family and route, but comfort, safety and pacing must be designed carefully."
      }
    ],
    "relatedDestinations": [
      "omo-valley-tribes",
      "danakil-depression-tour-packages",
      "bale-mountains-national-park"
    ],
    "relatedGuides": [
      "hotels-lodges-ethiopia",
      "ethiopia-travel-costs",
      "safety-in-ethiopia"
    ],
    "keywords": [
      "mobile camping Ethiopia",
      "remote Ethiopia logistics",
      "Ethiopia expedition camp"
    ]
  },
  {
    "slug": "general-travel-tips",
    "title": "Ethiopia Travel Tips & Practical Advice",
    "category": "Essentials",
    "readTime": "12 min",
    "metaTitle": "Ethiopia Travel Tips | Practical Advice From Local Team",
    "metaDesc": "Practical Ethiopia travel tips covering money, SIM cards, language, time, altitude, tipping, roads, toilets, power, markets and what to expect.",
    "dek": "Ethiopia is easier when you understand its rhythms before arrival. Time, language, altitude, road pace, cash, religious culture and regional variation all shape the journey. These practical tips make the difference between confusion and confidence.",
    "updated": "2026-06-12",
    "quickFacts": [
      "Carry some cash; cards are not reliable everywhere",
      "Buy a local SIM or arrange connectivity support",
      "Ethiopia uses its own calendar and time system locally",
      "Altitude affects many first-time visitors",
      "Be flexible: road, weather and ceremony timing can change plans"
    ],
    "sections": [
      {
        "heading": "Money and payments",
        "body": "Credit cards work in some higher-end hotels and restaurants, especially in Addis, but cash remains important in regional towns, markets, tips and small purchases. ATMs can be inconsistent outside major cities. Carry clean notes and let your guide advise on where to exchange or withdraw."
      },
      {
        "heading": "Connectivity and power",
        "body": "Mobile data coverage is improving but uneven. Remote routes, mountains, parks and deserts can have limited signal. Bring a power bank and do not rely on constant cloud backup. For film or professional work, charging systems should be built into the logistics."
      },
      {
        "heading": "Language and local time",
        "body": "Amharic is widely used, but Ethiopia is multilingual. Guides bridge language and culture. Ethiopia also uses its own calendar and a local time-counting system in daily life, which can surprise visitors. Your itinerary will normally use standard international time for clarity."
      },
      {
        "heading": "Flexibility is a travel skill",
        "body": "Ceremonies start late, roads change, domestic flights move, rain affects tracks, and wildlife ignores schedules. The best Ethiopia travelers come prepared, curious and flexible. A strong operator manages the changes without losing the purpose of the journey."
      }
    ],
    "faqs": [
      {
        "q": "Can I use credit cards in Ethiopia?",
        "a": "In Addis and some larger hotels, yes. Outside major centers, cash is still important."
      },
      {
        "q": "Is internet reliable?",
        "a": "It is workable in towns and some hotels but unreliable in remote areas."
      },
      {
        "q": "What language is spoken in Ethiopia?",
        "a": "Amharic is widely used, but Ethiopia has many languages. Guides are important for regional communication."
      }
    ],
    "relatedDestinations": [
      "addis-ababa",
      "lalibela",
      "harar"
    ],
    "relatedGuides": [
      "health-safety-ethiopia",
      "cultural-etiquette-ethiopia",
      "how-to-plan-your-trip"
    ],
    "keywords": [
      "Ethiopia travel tips",
      "Ethiopia practical guide",
      "travel advice Ethiopia"
    ]
  },
  {
    "slug": "why-visit-ethiopia",
    "title": "Why Visit Ethiopia",
    "category": "Inspiration",
    "readTime": "8 min",
    "metaTitle": "Why Visit Ethiopia | Ancient Culture, Wildlife & Landscapes",
    "metaDesc": "Why visit Ethiopia: ancient history, Lalibela, Aksum, Simien, Bale, Omo Valley, Danakil, coffee culture, festivals and tailor-made journeys.",
    "dek": "Ethiopia is one of the few destinations where ancient faith, endemic wildlife, living culture, extreme geology, mountain scenery and coffee origin can sit inside one private journey. It is not a simple beach escape or standard safari; it is a country for travelers who want depth.",
    "updated": "2026-06-12",
    "quickFacts": [
      "12 UNESCO World Heritage Sites in Ethiopia",
      "Home of coffee’s origin story and forest coffee culture",
      "Endemic wildlife including Ethiopian wolf and gelada",
      "Living Orthodox Christian traditions and Islamic heritage",
      "Dramatic landscapes from afroalpine plateau to Danakil desert"
    ],
    "sections": [
      {
        "heading": "Ancient history that is still alive",
        "body": "Lalibela, Aksum, Gondar, Lake Tana and Harar are not only monuments. They are living places of worship, trade, memory and identity. Travelers experience heritage through chants, incense, pilgrims, manuscripts, markets and daily life."
      },
      {
        "heading": "Wildlife found nowhere else",
        "body": "Ethiopian wolf, gelada, Walia ibex, mountain nyala and endemic birds make Ethiopia a specialist wildlife destination. The experience is less about large numbers and more about rarity, habitat and patient guiding."
      },
      {
        "heading": "Landscapes of contrast",
        "body": "Few countries move so quickly from highland escarpments to Rift Valley lakes, desert volcanoes, cloud forest, salt flats and pastoral lowlands. This contrast makes Ethiopia exceptional for photographers, trekkers and curious travelers."
      },
      {
        "heading": "A journey that must be designed",
        "body": "Ethiopia is not best consumed as a packaged checklist. It deserves a route designed around pace, purpose, cultural respect and current conditions. That is where a local specialist matters."
      }
    ],
    "faqs": [
      {
        "q": "Is Ethiopia worth visiting?",
        "a": "Yes, especially for travelers interested in history, culture, wildlife, photography, faith, food and landscapes."
      },
      {
        "q": "What makes Ethiopia different from other African destinations?",
        "a": "Ethiopia has a unique historical, religious, linguistic and ecological identity, plus endemic wildlife and ancient sites that are not found elsewhere."
      },
      {
        "q": "Who is Ethiopia best for?",
        "a": "Travelers who value depth, culture, landscapes and guided interpretation over simple resort-style travel."
      }
    ],
    "relatedDestinations": [
      "lalibela",
      "bale-mountains-national-park",
      "danakil-depression-tour-packages"
    ],
    "relatedGuides": [
      "ethiopia-travel-circuits",
      "when-to-visit-ethiopia",
      "how-to-plan-your-trip"
    ],
    "keywords": [
      "why visit Ethiopia",
      "Ethiopia travel inspiration",
      "Ethiopia highlights"
    ]
  }
]

export const FIELD_GUIDE_SLUGS = FIELD_GUIDE_CONTENT.map((guide) => guide.slug)

export function getGuideContent(slug: string): GuideContent | undefined {
  return FIELD_GUIDE_CONTENT.find((guide) => guide.slug === slug)
}

export function getFeaturedGuides(): GuideContent[] {
  const featured = new Set(['when-to-visit-ethiopia','ethiopia-travel-circuits','how-to-plan-your-trip','safety-in-ethiopia','ethiopia-visa-guide','ethiopia-photography-guide'])
  return FIELD_GUIDE_CONTENT.filter((guide) => featured.has(guide.slug))
}

// Each guide's `category` is a fine-grained topic chip (23 unique values across 23 guides),
// so grouping by raw category produces one heading per guide — useless as navigation.
// These themes are the actual planning-stage groupings the hub organizes the library by.
const GUIDE_THEMES: { theme: string; categories: string[] }[] = [
  { theme: "Timing & Route Planning",                categories: ["Season & Timing", "Routes & Itineraries", "Trip Planning", "Inspiration"] },
  { theme: "Flights, Arrival & Entry",               categories: ["Flights & Arrival", "Flights & Logistics", "Visa & Entry"] },
  { theme: "Health, Safety & Packing",               categories: ["Health & Safety", "Safety & Risk", "Packing", "Essentials"] },
  { theme: "Budget & Accommodation",                 categories: ["Budget & Value", "Accommodation"] },
  { theme: "Wildlife, Birding & Photography",        categories: ["Wildlife & Safari", "Wildlife Species", "Birding", "Photography", "Permits & Gear"] },
  { theme: "Culture, Festivals & Responsible Travel", categories: ["Food & Culture", "Festivals", "Culture & Respect", "Responsible Travel", "Remote Logistics"] },
]

export function getGuidesByTheme(): { theme: string; guides: GuideContent[] }[] {
  const grouped = GUIDE_THEMES.map(({ theme, categories }) => ({
    theme,
    guides: FIELD_GUIDE_CONTENT.filter((g) => categories.includes(g.category)),
  })).filter((group) => group.guides.length > 0)
  // Any guide whose category isn't mapped yet still gets listed rather than silently dropped.
  const mapped = new Set(GUIDE_THEMES.flatMap((t) => t.categories))
  const unmapped = FIELD_GUIDE_CONTENT.filter((g) => !mapped.has(g.category))
  if (unmapped.length > 0) grouped.push({ theme: "More Planning Topics", guides: unmapped })
  return grouped
}
