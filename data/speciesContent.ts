// data/speciesContent.ts
// Rich article content for all 7 endemic species pages

export interface SpeciesSection { heading?: string; body: string }
export interface SpeciesContent {
  slug: string
  intro: string
  sections: SpeciesSection[]
  viewingTips: string[]
  faqs: { q: string; a: string }[]
  relatedDestinations: string[]
  relatedTourStyle: string
}

export const SPECIES_CONTENT: SpeciesContent[] = [

  {
    slug:"ethiopian-wolf",
    intro:"The Ethiopian wolf is Africa's rarest wild canid and the world's most endangered wild dog species. With fewer than 500 individuals remaining in isolated highland populations, every sighting carries genuine weight. They are not wolves in the North American sense but closer in build to a large-eared fox: long-legged, copper-red, with a distinctive white chest.",
    sections:[
      {heading:"About the Ethiopian Wolf",body:"They hunt alone in afroalpine grassland, pursuing giant mole-rats and other rodents. They are pack animals that split for solo hunts; territorial boundaries are maintained through howling and scent-marking that the observant visitor can witness. The Ethiopian wolf exists in only six or seven isolated mountain populations, with the Bale Mountains holding the largest at roughly 250 individuals."},
      {heading:"Where to See Them",body:"The Sanetti Plateau in Bale Mountains National Park is the most reliable site. Ethiopian wolves are active in the early morning and late afternoon, and a properly guided visit of 2-3 days gives a high probability of sighting. The Simien Mountains hold a smaller, less predictable population, with occasional sightings in higher sections near Ras Dashen."},
      {heading:"Conservation Notes",body:"Ethiopian wolves are threatened by habitat loss, disease (particularly rabies transmitted by domestic dogs), and genetic isolation between populations. The Ethiopian Wolf Conservation Programme leads vaccination and monitoring efforts. Tourism that funds the Bale Mountain Lodge and employs local scouts directly supports conservation."},
    ],
    viewingTips:["Best time of day: 7-9am and 4-6pm", "Best season: October to February", "Best location: Sanetti Plateau, Bale", "Approach on foot, minimum 50m distance", "A guide who knows individual territories greatly improves success"],
    faqs:[
      {q:"How likely am I to see an Ethiopian wolf?",a:"On a full day on the Sanetti Plateau with an experienced guide, sightings are highly probable. We estimate 85-90% of clients on a 2+ day Bale itinerary see Ethiopian wolves. Single-day visits are less reliable but still offer good chances."},
      {q:"Can I photograph the Ethiopian wolf?",a:"Yes, from a vehicle or on foot at a respectful distance. The wolves on Sanetti are accustomed to vehicles and can be observed at reasonable range. A telephoto lens (300mm+) is recommended. Early morning gives the best light and the most active hunting behaviour."},
    ],
    relatedDestinations:["bale-mountains-national-park", "simien-mountain-national-park"],
    relatedTourStyle:"ethiopia-wildlife-tours",
  },

  {
    slug:"gelada-monkey",
    intro:"The gelada is the world's only grass-grazing primate. Around 90% of their diet is grass blades, stems, and seed heads, harvested with both hands in a fluid bilateral plucking motion repeated up to 8,000 times per day. They are their own ancient lineage, the last surviving species of a genus that once ranged across Africa. The red chest patch gives them the name bleeding-heart monkey.",
    sections:[
      {heading:"About the Gelada",body:"Geladas live in large troops with complex social structures. The basic unit is a one-male unit: one dominant male, several females, and their young. Multiple units aggregate into herds that can number into the hundreds, up to a thousand individuals on productive escarpments. They sleep on sheer cliff faces for safety and climb to the plateau at dawn to feed."},
      {heading:"Where to See Them",body:"Simien Mountains National Park is the premier site. The Chenek area offers the most reliable large encounters, with troops sleeping on cliff faces and climbing to the plateau at dawn. Encounters at Sankaber are also possible. The Guassa Community Conservation Area is less visited, with smaller numbers but excellent conditions for observed encounters without park crowds."},
      {heading:"The Encounter",body:"Geladas at Simien are habituated through years of contact with rangers and researchers, so they do not treat people as threats. You can sit quietly in the middle of a feeding troop without disturbing them. This is not the same as domesticated: do not make direct eye contact with dominant males, do not attempt to touch, and do not approach mothers with infants. The encounter often lasts an hour or more."},
    ],
    viewingTips:["Best location: Chenek, Simien Mountains", "Best time: first 2 hours after dawn", "Encounters at very close range, fully habituated", "Do not make direct eye contact with dominant males", "Sit quietly and let the troop move around you"],
    faqs:[
      {q:"Are gelada encounters safe?",a:"Yes. The geladas in the Simien are fully habituated and ignore human presence. You can sit 2-3 metres from a large troop without alarm. Do not make direct eye contact with dominant males or try to touch them. Otherwise these are among the most relaxed wildlife encounters in Africa."},
      {q:"How close can I get to the geladas?",a:"Remarkably close - often within 2-3 metres, as the troops simply continue feeding around you. This makes the Simien one of the best primate photography experiences anywhere. Your guide will position you correctly and advise on behaviour."},
    ],
    relatedDestinations:["simien-mountain-national-park", "bale-mountains-national-park"],
    relatedTourStyle:"ethiopia-wildlife-tours",
  },

  {
    slug:"walia-ibex",
    intro:"The Walia ibex is a large wild goat found only in the rocky terrain of the Simien Mountains in northern Ethiopia. It is one of the rarest large mammals in Africa, with population estimates ranging from 500 to 1,000 individuals and a total range restricted to a relatively small section of the Simien escarpment.",
    sections:[
      {heading:"About the Walia Ibex",body:"Males carry large, backward-curving horns that can reach 1 metre in length. They are remarkably sure-footed on near-vertical cliff faces, using ledges and outcrops that seem impossibly narrow. The sight of a fully-horned male standing motionless on a cliff edge against the Simien escarpment is one of the most dramatic wildlife images Ethiopia offers."},
      {heading:"Where to See Them",body:"Best sightings are in the northern sections of the Simien Mountains National Park, particularly around Chenek and the rocky terrain above the escarpment edge. They are most active in the morning and late afternoon. Unlike geladas, Walia ibex are not habituated and treat people as a threat, so good sightings require patience, quiet movement, and often binoculars or a long lens."},
    ],
    viewingTips:["Best location: Chenek, northern Simien", "Best time: morning and late afternoon", "Not habituated - approach quietly", "Binoculars or telephoto lens recommended", "Often seen on near-vertical cliff faces"],
    faqs:[
      {q:"How hard is it to see the Walia ibex?",a:"Harder than geladas, as the ibex are wary and live on steep terrain. A multi-day Simien itinerary that includes time around Chenek gives good chances. Patience and an experienced guide who knows their favoured ledges make the difference."},
      {q:"Where else can I see the Walia ibex?",a:"Nowhere - the Walia ibex is found only in the Simien Mountains. This is part of what makes a sighting so special. It is one of the most range-restricted large mammals on earth."},
    ],
    relatedDestinations:["simien-mountain-national-park"],
    relatedTourStyle:"ethiopia-wildlife-tours",
  },

  {
    slug:"mountain-nyala",
    intro:"The mountain nyala is Ethiopia's largest endemic antelope, the only large antelope found exclusively in one country. Adult males stand up to 135cm at the shoulder and carry large, gently spiralling horns. Females are hornless and slightly smaller. They live in the heather moorland, juniper forest, and subalpine grasslands of the Ethiopian highlands.",
    sections:[
      {heading:"About the Mountain Nyala",body:"Primarily found in the Bale Mountains and some highland areas of Arsi, the mountain nyala is a flagship species for Ethiopian highland conservation. Large bulls are occasionally solitary; females and young are typically seen in small groups grazing the forest edge at dawn and dusk."},
      {heading:"Where to See Them",body:"Most reliably seen in the heather moorland between the park headquarters at Dinsho and the Sanetti Plateau in Bale Mountains National Park. They are often visible from the road in the early morning. Unlike the Ethiopian wolf, mountain nyala do not require an extended search; a morning drive through Bale produces sightings on most days."},
    ],
    viewingTips:["Best location: Dinsho area, Bale Mountains", "Best time: early morning and dusk", "Often visible from the road", "Seen on most morning drives through Bale", "Large bulls sometimes solitary, females in groups"],
    faqs:[
      {q:"How likely am I to see mountain nyala in Bale?",a:"Very likely. A morning drive through the Dinsho area produces sightings on most days. They are among the easier Ethiopian endemics to see, often grazing in the open near the forest edge."},
      {q:"Can mountain nyala be seen alongside the Ethiopian wolf?",a:"Yes. A Bale Mountains itinerary naturally combines both: mountain nyala in the lower heather moorland and Ethiopian wolves up on the Sanetti Plateau. One of the best wildlife combinations in Ethiopia."},
    ],
    relatedDestinations:["bale-mountains-national-park"],
    relatedTourStyle:"ethiopia-wildlife-tours",
  },

  {
    slug:"bale-monkey",
    intro:"The Bale monkey (also called the Bale Mountains vervet or grass monkey) is a specialist of Ethiopia's Harenna Forest, a montane cloud forest on the southern slopes of the Bale Mountains. It is found nowhere else. Unusually for a guenon, it is a bamboo specialist, with a diet built largely around the dense bamboo thickets of the Harenna.",
    sections:[
      {heading:"About the Bale Monkey",body:"The Bale monkey's dependence on bamboo makes it highly vulnerable to habitat change. It lives in groups in the bamboo understorey of the Harenna Forest, and its restricted diet and range make it one of Ethiopia's least-known and most threatened primates. Genetic studies suggest it is distinct from the widespread vervet monkeys of lower altitudes."},
      {heading:"Where to See Them",body:"The bamboo zones of the Harenna Forest, on the southern descent of the Bale Mountains below the Sanetti Plateau, are the only place to see them. Sightings require patience and a guide who knows the current bamboo feeding areas. A descent through the Harenna is a rewarding addition to a Bale wildlife itinerary, combining the Bale monkey with exceptional forest birding."},
    ],
    viewingTips:["Best location: Harenna Forest bamboo zones", "Best combined with the Sanetti Plateau descent", "Requires a guide who knows feeding areas", "Patience needed - a shy forest specialist", "Rewards a full day in the Harenna Forest"],
    faqs:[
      {q:"Is the Bale monkey easy to see?",a:"Less reliable than mountain nyala or geladas. It is a shy bamboo-forest specialist, so sightings require time in the Harenna Forest and a guide familiar with current feeding areas. Best treated as a bonus on a Bale wildlife and birding itinerary."},
      {q:"What else can I see in the Harenna Forest?",a:"The Harenna is exceptional for birding and also holds colobus monkeys. The descent from the Sanetti Plateau into the Harenna is one of the most dramatic habitat transitions in Ethiopia."},
    ],
    relatedDestinations:["bale-mountains-national-park"],
    relatedTourStyle:"ethiopia-wildlife-tours",
  },

  {
    slug:"blue-winged-goose",
    intro:"The blue-winged goose is a medium-sized goose endemic to the Ethiopian highlands, where it inhabits streams, lakes, and wetland meadows above approximately 2,000 metres. The distinctive blue-grey wing patch, visible in flight, gives the species its name. Ethiopian birders consider it a foundation species for any highland bird list.",
    sections:[
      {heading:"About the Blue-winged Goose",body:"One of Ethiopia's endemic waterfowl, the blue-winged goose is usually seen in pairs or small groups at wetland edges. It is a quiet, approachable bird that feeds on grasses and aquatic vegetation. Its restricted highland range makes it a target for visiting birders and a reliable indicator of healthy Ethiopian highland wetland habitat."},
      {heading:"Where to See Them",body:"Often seen at wetland edges across the Ethiopian highlands: the Bale Mountains plateau lakes, the Sanetti Plateau streams, highland lakes in the north, and the marshes around Debre Berhan. A Bale Mountains itinerary almost always produces sightings alongside the Ethiopian wolf and other highland endemics."},
    ],
    viewingTips:["Best location: Bale plateau lakes and streams", "Also at Sanetti Plateau and highland marshes", "Usually in pairs or small groups", "Reliable on a Bale Mountains birding day", "Approachable and quiet at wetland edges"],
    faqs:[
      {q:"Is the blue-winged goose easy to see?",a:"Yes. It is one of the more reliable Ethiopian endemic birds, regularly seen at highland wetlands in the Bale Mountains and elsewhere. A birding-focused day in Bale almost always produces sightings."},
      {q:"Can I combine birding with wildlife on a Bale trip?",a:"Absolutely. The Bale Mountains are ideal for combining endemic birds like the blue-winged goose with mammals like the Ethiopian wolf and mountain nyala. Sawla Tours can arrange a specialist birding guide."},
    ],
    relatedDestinations:["bale-mountains-national-park", "rift-valley-lakes"],
    relatedTourStyle:"ethiopia-wildlife-tours",
  },

  {
    slug:"stresemanns-bushcrow",
    intro:"Stresemann's bushcrow is one of the world's strangest corvids and one of the most range-restricted birds in Africa. It is found only in an area of approximately 6,000 square kilometres around Yabello in southern Ethiopia, and nowhere else on earth. The restricted range is not fully explained by available habitat; climate modelling suggests the species may sit on the edge of a thermal threshold.",
    sections:[
      {heading:"About Stresemann's Bushcrow",body:"The bird is medium-sized with vivid blue wing feathers, an orange-tinged beak and face, a short crest, and the typically inquisitive corvid personality. It lives in small family groups in open Acacia and juniper woodland, feeding on insects and small vertebrates. Suitable-looking habitat exists elsewhere in southern Ethiopia, yet the birds are absent, deepening the mystery of its tiny range."},
      {heading:"Where to See Them",body:"The town of Yabello is the base. The best areas are the Acacia woodlands on the roadsides north and east of town, where the birds are visible from vehicles and not particularly wary. The Arero Juniper Forest is a secondary site at slightly higher altitude. Sawla Tours can incorporate Yabello into a southern cultural tour or a dedicated birding route."},
    ],
    viewingTips:["Best location: Acacia woodland around Yabello", "Visible from vehicles, not wary", "Arero Juniper Forest is a secondary site", "Combine with an Omo Valley or southern route", "A must for serious Africa birders"],
    faqs:[
      {q:"How hard is it to see Stresemann's bushcrow?",a:"Not hard once you are in the Yabello area - the birds are fairly visible and not especially wary. The challenge is reaching Yabello in southern Ethiopia, best combined with the Omo Valley or a dedicated southern birding route."},
      {q:"Can Yabello be combined with the Omo Valley?",a:"Yes. Yabello sits naturally on a southern Ethiopia route, so Sawla Tours can combine Stresemann's bushcrow with an Omo Valley cultural journey or a southern endemic-birding itinerary."},
    ],
    relatedDestinations:["omo-valley-tribes", "konso"],
    relatedTourStyle:"ethiopia-wildlife-tours",
  },

]

export function getSpeciesContent(slug: string): SpeciesContent | undefined {
  return SPECIES_CONTENT.find(s => s.slug === slug)
}
