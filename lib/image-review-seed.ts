import type { Db } from "mongodb";
import {
  IMAGE_REVIEW_COLLECTION,
  createImageReview,
  ensureImageReviewIndexes,
  type ReviewItem,
} from "../lib/image-review";
import { ASSET_LABEL_COLLECTION, readAssetManifest, type AssetLabelRecord } from "../lib/asset-labeling";

type SlotKind = "hero" | "card" | "portrait" | "landscape";
type Slot = {
  categoryId: string;
  slotKey: string;
  title: string;
  pagePath: string;
  terms: string[];
  kind: SlotKind;
};

type Candidate = {
  label: AssetLabelRecord;
  text: string;
  width: number;
  height: number;
};

const destinationSlots: Array<[string, string, string, string[]]> = [
  ["lalibela", "Lalibela", "/ethiopias-popular-destinations/lalibela", ["lalibela", "bet giyorgis", "rock-hewn", "church"]],
  ["simien", "Simien Mountains National Park", "/ethiopias-popular-destinations/simien-mountain-national-park", ["simien", "gelada", "walia ibex", "escarpment", "mountain"]],
  ["danakil", "Danakil Depression", "/ethiopias-popular-destinations/danakil-depression-tour-packages", ["danakil", "dallol", "erta ale", "salt", "volcano", "desert"]],
  ["omo", "Lower Omo Valley", "/ethiopias-popular-destinations/omo-valley-tribes", ["omo", "mursi", "hamar", "nyangatom", "dassanech", "tribe"]],
  ["bale", "Bale Mountains National Park", "/ethiopias-popular-destinations/bale-mountains-national-park", ["bale", "mountain nyala", "ethiopian wolf", "sanetti", "moorland"]],
  ["tigray", "Tigray & Gheralta", "/ethiopias-popular-destinations/tigray-rock-hewn-churches-historical-sites", ["tigray", "gheralta", "rock-hewn", "church", "sandstone"]],
  ["gondar", "Gondar", "/ethiopias-popular-destinations/gondar", ["gondar", "gonder", "fasil", "castle", "royal"]],
  ["bahir-dar", "Bahir Dar & Lake Tana", "/ethiopias-popular-destinations/bahir-dar-lake-tana", ["bahir dar", "lake tana", "blue nile", "falls", "papyrus"]],
  ["harar", "Harar Jugol", "/ethiopias-popular-destinations/harar", ["harar", "jugol", "hyena", "harari", "coffee"]],
  ["addis", "Addis Ababa", "/ethiopias-popular-destinations/addis-ababa", ["addis", "addis ababa", "mercato", "palace", "city"]],
  ["axum", "Aksum", "/ethiopias-popular-destinations/axum", ["axum", "aksum", "obelisk", "stelae", "kingdom"]],
  ["kafa", "Kafa Biosphere Reserve", "/ethiopias-popular-destinations/kafa-biosphere-coffee-forest", ["kafa", "coffee", "forest", "arabica", "waterfall"]],
  ["arba-minch", "Arba Minch & Nech Sar", "/ethiopias-popular-destinations/arba-minch-nechsar", ["arba minch", "nech sar", "lake chamo", "lake abaya", "rivers"]],
  ["konso", "Konso Cultural Landscape", "/ethiopias-popular-destinations/konso", ["konso", "terrace", "stone", "fortified", "cultural landscape"]],
  ["awash", "Awash National Park & Alledeghi Plains", "/ethiopias-popular-destinations/awash-national-park", ["awash", "alledeghi", "hamadryas", "oryx", "zebra"]],
  ["chebera", "Chebera Churchura National Park", "/ethiopias-popular-destinations/chebera-churchura-national-park", ["chebera", "churchura", "forest", "wetland", "elephant"]],
  ["gambella", "Gambella National Park", "/ethiopias-popular-destinations/gambella-national-park", ["gambella", "gambela", "floodplain", "kob", "hippo"]],
  ["kafta", "Kafta Sheraro National Park", "/ethiopias-popular-destinations/kafta-shiraro-national-park", ["kafta", "sheraro", "elephant", "tekeze", "savanna"]],
];

const hubSlots: Array<[string, string, string[]]> = [
  ["historic-cultural", "Historic & cultural Ethiopia tours", ["lalibela", "axum", "gondar", "church", "priest", "heritage"]],
  ["omo-cultural", "Omo Valley cultural tours", ["omo", "tribe", "mursi", "hamar", "village", "portrait"]],
  ["wildlife", "Wildlife & birding tours", ["wildlife", "wolf", "gelada", "nyala", "ibex", "animal"]],
  ["adventure", "Frontier adventure tours", ["trek", "mountain", "volcano", "rafting", "desert", "camp"]],
  ["festival", "Festival immersion tours", ["timket", "meskel", "festival", "celebration", "procession"]],
  ["photography", "Photography journeys", ["photography", "portrait", "landscape", "light", "camera"]],
  ["birdwatching", "Birdwatching tours", ["bird", "birding", "eagle", "hornbill", "goose", "flycatcher"]],
  ["special-interest", "Coffee, culinary & special interest", ["coffee", "market", "food", "culinary", "local life"]],
  ["addis-day", "Addis day tours & stopovers", ["addis", "addis ababa", "mercato", "palace", "city", "coffee"]],
];

const itinerarySlots: Array<[string, string, string[]]> = [
  ["classic-northern", "Classic Northern Ethiopia", ["lalibela", "gondar", "tigray", "church"]],
  ["lalibela-gondar-tigray", "Lalibela, Gondar and Tigray", ["lalibela", "gondar", "tigray"]],
  ["complete-historic", "Complete Historic Ethiopia", ["lalibela", "gondar", "axum", "tigray", "historic"]],
  ["addis-lalibela", "Addis Ababa and Lalibela", ["addis", "lalibela"]],
  ["axum-tigray", "Axum and Tigray Specialist", ["axum", "tigray", "gher alta", "church"]],
  ["gondar-bahir-dar", "Gondar, Bahir Dar and Lake Tana", ["gondar", "bahir dar", "lake tana"]],
  ["omo-complete", "Omo Valley Complete", ["omo", "tribe", "mursi", "hamar"]],
  ["omo-short", "Omo Valley Introduction", ["omo", "tribe", "village"]],
  ["south-culture", "South Ethiopia Culture", ["omo", "konso", "culture", "village"]],
  ["omo-konso", "Omo Valley and Konso Deep Immersion", ["omo", "konso", "tribe", "terrace"]],
  ["hamar", "Hamar Bull-Jumping Journey", ["hamar", "bull-jumping", "ceremony", "omo"]],
  ["southern-tribes-photo", "Southern Tribes Photography", ["omo", "tribe", "portrait", "photography"]],
  ["wolf-gelada", "Wolf and Gelada: Bale and Simien", ["wolf", "gelada", "bale", "simien"]],
  ["bale-wildlife", "Bale Mountains Wildlife Focus", ["bale", "wolf", "nyala", "wildlife"]],
  ["simien-trek-wildlife", "Simien Trekking and Wildlife", ["simien", "gelada", "trek", "mountain"]],
  ["endemic-mammals", "Endemic Mammals Grand Circuit", ["endemic", "wolf", "nyala", "gelada", "mole rat"]],
  ["birding-specialist", "Ethiopia Birding Specialist", ["bird", "birding", "hornbill", "goose"]],
  ["rift-lakes-birding", "Rift Valley Lakes and Birding", ["lake", "bird", "pelican", "flamingo"]],
  ["danakil-north", "Danakil and North Circuit", ["danakil", "dallol", "volcano", "salt"]],
  ["simien-trek", "Simien Mountains Trek", ["simien", "trek", "gelada", "mountain"]],
  ["mobile-camp", "Mobile Camp Expedition", ["mobile camp", "camp", "remote", "expedition"]],
  ["erta-ale", "Erta Ale Volcano Express", ["erta ale", "volcano", "danakil"]],
  ["danakil-omo", "Danakil and Omo Extremes", ["danakil", "omo", "desert", "tribe"]],
  ["bale-trek", "Bale Mountains Trek and Highlands", ["bale", "trek", "mountain", "highland"]],
  ["timkat", "Timkat Festival Circuit", ["timket", "timkat", "festival", "procession"]],
  ["meskel", "Meskel Festival and Addis Ababa", ["meskel", "festival", "addis"]],
  ["festival-calendar", "Full Festival Calendar", ["festival", "timket", "meskel", "celebration"]],
  ["timkat-gondar", "Timkat in Gondar Deep Experience", ["timket", "gondar", "priest"]],
  ["new-year", "Ethiopian New Year — Enkutatash", ["new year", "enkutatash", "festival", "celebration"]],
  ["fasika", "Fasika — Ethiopian Easter at Lalibela", ["fasika", "easter", "lalibela", "church"]],
  ["photo-complete", "Photography Complete Expedition", ["photography", "landscape", "portrait", "ethiopia"]],
  ["omo-portrait-photo", "Omo Valley Portrait Photography", ["omo", "portrait", "tribe", "photography"]],
  ["wildlife-photo", "Wildlife Photography", ["wildlife", "animal", "wolf", "gelada", "photography"]],
  ["lalibela-cultural-photo", "Lalibela Cultural Photography", ["lalibela", "church", "priest", "photography"]],
  ["danakil-landscape-photo", "Danakil Landscape Photography", ["danakil", "landscape", "dallol", "volcano"]],
  ["festival-photo", "Festival Photography", ["festival", "timket", "meskel", "photography"]],
];

const guideSlots: Array<[string, string, string[]]> = [
  ["when-to-visit", "When to Visit Ethiopia", ["season", "rain", "weather", "landscape", "festival"]],
  ["circuits", "Ethiopia Travel Circuits Explained", ["circuit", "road", "landscape", "journey"]],
  ["plan-trip", "How to Plan an Ethiopia Trip", ["planning", "map", "route", "journey"]],
  ["get-to", "How to Get to Ethiopia", ["airport", "addis", "flight", "road"]],
  ["domestic-flights", "Ethiopia Domestic Flights & Road Transfers", ["flight", "aircraft", "road", "vehicle"]],
  ["visa", "Ethiopia Visa & Entry Requirements", ["passport", "airport", "addis", "travel"]],
  ["health-safety", "Health, Altitude & Travel Safety", ["altitude", "trek", "mountain", "guide"]],
  ["safety", "Safety in Ethiopia for Travelers", ["guide", "vehicle", "road", "travel"]],
  ["packing", "What to Pack for Ethiopia", ["trek", "camp", "gear", "mountain"]],
  ["costs", "Ethiopia Travel Costs & Budgeting", ["market", "hotel", "lodge", "travel"]],
  ["hotels", "Hotels & Lodges in Ethiopia", ["lodge", "hotel", "camp", "guest"]],
  ["safaris", "Planning an Ethiopia Safari", ["wildlife", "safari", "animal", "landscape"]],
  ["wildlife", "Wildlife to See in Ethiopia", ["wildlife", "animal", "wolf", "gelada", "nyala"]],
  ["birding", "Birdwatching in Ethiopia", ["bird", "birding", "eagle", "hornbill"]],
  ["photography", "Photography in Ethiopia", ["photography", "portrait", "landscape", "light"]],
  ["equipment", "Drone, Binocular & Equipment Permissions", ["drone", "camera", "binocular", "photography"]],
  ["food-coffee", "Ethiopian Food, Coffee & Cuisine", ["coffee", "food", "market", "ceremony"]],
  ["festival-calendar", "Ethiopia Festival Calendar", ["festival", "timket", "meskel", "celebration"]],
  ["etiquette", "Cultural Etiquette in Ethiopia", ["culture", "people", "ceremony", "village"]],
  ["responsible", "Responsible Travel in Ethiopia", ["community", "local", "culture", "landscape"]],
  ["mobile-camping", "Mobile Camping & Remote Logistics", ["mobile camp", "camp", "tent", "remote"]],
  ["travel-tips", "Ethiopia Travel Tips & Practical Advice", ["travel", "road", "guide", "journey"]],
  ["why-visit", "Why Visit Ethiopia", ["landscape", "culture", "wildlife", "journey"]],
];

const editorialSlots: Array<[string, string, string[]]> = [
  ["gelada-moment", "Seeing a Gelada Monkey in the Simien Mountains", ["gelada", "simien", "monkey"]],
  ["why-ethiopia", "Why Ethiopia Is Not a Safari Destination", ["landscape", "culture", "journey"]],
  ["custom-planning", "How We Plan a Custom Ethiopia Journey", ["planning", "map", "guide", "road"]],
  ["hamar-moment", "The Hamar Bull-Jumping Ceremony", ["hamar", "bull-jumping", "ceremony"]],
  ["abuna-yemata", "Abuna Yemata Guh and the Climb to Reach It", ["abuna", "gher alta", "church", "climb"]],
  ["timkat-moment", "Timkat in Gondar", ["timket", "gondar", "priest", "procession"]],
  ["wolf-moment", "The Ethiopian Wolf at Dawn", ["wolf", "ethiopian wolf", "bale", "dawn"]],
  ["danakil-moment", "What the Danakil Depression Is Really Like", ["danakil", "dallol", "salt", "desert"]],
  ["omo-photo-moment", "Photographing the Omo Valley", ["omo", "portrait", "tribe", "photography"]],
  ["ethiopian-wolf", "Ethiopian Wolf", ["ethiopian wolf", "wolf", "bale"]],
  ["gelada", "Gelada Monkey", ["gelada", "simien", "monkey"]],
  ["walia-ibex", "Walia Ibex", ["walia ibex", "ibex", "simien"]],
  ["mountain-nyala", "Mountain Nyala", ["mountain nyala", "nyala", "bale"]],
  ["giant-mole-rat", "Giant Mole Rat", ["giant mole rat", "mole rat", "bale"]],
  ["endemic-birds", "Ethiopia’s Endemic Birds", ["bird", "birding", "endemic", "goose"]],
  ["wildlife-story", "Wildlife in Ethiopia", ["wildlife", "animal", "landscape"]],
  ["coffee-story", "Coffee and Forest Life", ["coffee", "kafa", "forest", "ceremony"]],
  ["culture-story", "Culture and Local Life", ["culture", "people", "village", "market"]],
  ["festival-story", "Festival Life in Ethiopia", ["festival", "timket", "meskel", "celebration"]],
  ["blue-nile-story", "Blue Nile Falls and Lake Tana", ["blue nile", "falls", "lake tana"]],
  ["salt-story", "Salt, Heat and Volcanic Landscapes", ["danakil", "salt", "volcano", "dallol"]],
  ["highland-story", "Highland Landscapes and Walking", ["highland", "mountain", "trek", "landscape"]],
];

function slot(categoryId: string, slotKey: string, title: string, pagePath: string, terms: string[], kind: SlotKind): Slot {
  return { categoryId, slotKey, title, pagePath, terms, kind };
}

function buildSlots() {
  const slots: Slot[] = [];

  for (const [key, title, pagePath, terms] of destinationSlots) {
    slots.push(slot("homepage-destinations", `destination-${key}`, title, pagePath, terms, "hero"));
  }

  const homeSlots: Array<[string, string, string[]]> = [
    ["home-hero", "Homepage hero poster", ["landscape", "mountain", "valley", "lake", "journey", "ethiopia"]],
    ["home-signature-journey", "Homepage signature journey", ["journey", "road", "landscape", "guide", "vehicle"]],
    ["home-featured-destination", "Homepage featured destination", ["landscape", "destination", "mountain", "church"]],
    ["home-culture", "Homepage culture tile", ["culture", "people", "ceremony", "village"]],
    ["home-wildlife", "Homepage wildlife tile", ["wildlife", "wolf", "gelada", "animal"]],
    ["home-adventure", "Homepage adventure tile", ["trek", "mountain", "volcano", "rafting"]],
    ["home-festival", "Homepage festival tile", ["festival", "timket", "meskel", "celebration"]],
    ["home-photography", "Homepage photography tile", ["photography", "portrait", "landscape", "light"]],
    ["home-coffee", "Homepage coffee tile", ["coffee", "forest", "ceremony", "market"]],
    ["home-people", "Homepage people tile", ["people", "portrait", "local", "village"]],
    ["home-landscape", "Homepage landscape tile", ["landscape", "mountain", "valley", "desert"]],
    ["home-field", "Homepage field-life tile", ["camp", "road", "guide", "expedition"]],
  ];
  for (const [key, title, terms] of homeSlots) slots.push(slot("homepage-destinations", key, title, "/", terms, key === "home-people" ? "portrait" : "landscape"));

  for (const [key, title, terms] of hubSlots) slots.push(slot("style-hubs", `hub-${key}`, title, `/tours-by-experience/${key}`, terms, "hero"));

  const campSlots: Array<[string, string, string[]]> = [
    ["camp-hero", "Mobile camps page hero", ["mobile camp", "camp", "remote", "landscape"]],
    ["camp-setup", "Camp setup and tents", ["tent", "camp", "setup", "expedition"]],
    ["camp-dining", "Camp dining and shared life", ["dining", "food", "camp", "table"]],
    ["camp-field", "Field logistics", ["camp", "vehicle", "road", "remote"]],
    ["camp-guides", "Guides and crew in the field", ["guide", "driver", "camp", "guest"]],
    ["camp-landscape", "Remote camp landscape", ["camp", "landscape", "mountain", "desert"]],
    ["camp-night", "Remote night or dawn", ["camp", "night", "dawn", "sunrise"]],
    ["camp-guest", "Guests in camp", ["guest", "camp", "trek", "expedition"]],
    ["camp-road", "Remote travel and access", ["road", "vehicle", "mule", "trek"]],
    ["camp-low-impact", "Low-impact field travel", ["community", "local", "camp", "responsible"]],
  ];
  for (const [key, title, terms] of campSlots) slots.push(slot("mobile-camps", key, title, "/mobile-tented-camps-ethiopia", terms, "landscape"));

  for (const [key, title, terms] of itinerarySlots) slots.push(slot("itinerary-ctas", `itinerary-${key}`, title, `/tours-by-experience/${key}`, terms, "landscape"));
  for (const [key, title, terms] of guideSlots) slots.push(slot("travel-guides", `guide-${key}`, title, `/ethiopia-travel-guide/${key}`, terms, "landscape"));
  for (const [key, title, terms] of editorialSlots) slots.push(slot("moments-wildlife-editorial", `editorial-${key}`, title, `/sawla-moments/${key}`, terms, key.includes("portrait") || key.includes("people") ? "portrait" : "landscape"));

  return slots;
}

function labelText(label: AssetLabelRecord) {
  return [
    label.title,
    label.altText,
    label.description,
    label.sourcePath,
    label.outputPath,
    label.category,
    label.destination,
    label.subjectType,
    ...(label.tags ?? []),
    ...(label.seoKeywords ?? []),
    ...(label.suggestedUse ?? []),
  ].filter(Boolean).join(" ").toLowerCase();
}

function relevance(candidate: Candidate, terms: string[]) {
  const hits = terms.filter((term) => candidate.text.includes(term.toLowerCase()));
  const weighted = hits.reduce((score, term) => score + Math.min(12, term.length / 2), 0);
  return { hits, score: weighted };
}

function quality(candidate: Candidate, kind: SlotKind) {
  const { width, height, label } = candidate;
  const ratio = height > 0 ? width / height : 0;
  let score = 0;

  if (width >= 2200 && height >= 1400) score += 18;
  else if (width >= 1800 && height >= 1100) score += 14;
  else if (width >= 1400 && height >= 900) score += 9;
  else if (width >= 1000 && height >= 700) score += 5;

  if (kind === "portrait" && ratio < 0.95) score += 8;
  if (kind === "landscape" && ratio >= 1.2) score += 7;
  if (kind === "hero" && ratio >= 1.35 && ratio <= 2.2) score += 8;
  if (kind === "card" && ratio >= 1.05 && ratio <= 1.8) score += 6;
  if (label.title && label.altText) score += 4;
  if (label.sourcePath.toLowerCase().includes("staged-2026-07")) score += 2;

  return score;
}

function candidateScore(candidate: Candidate, currentSlot: Slot) {
  const matched = relevance(candidate, currentSlot.terms);
  return {
    candidate,
    score: matched.score * 10 + quality(candidate, currentSlot.kind),
    qualityScore: quality(candidate, currentSlot.kind),
    hits: matched.hits,
  };
}

function choose(candidates: Candidate[], currentSlot: Slot, used: Set<string>, allowReuse = false) {
  const ranked = candidates
    .map((candidate) => candidateScore(candidate, currentSlot))
    .sort((a, b) => b.score - a.score);
  const available = ranked.filter((item) => allowReuse || !used.has(item.candidate.label.assetId));
  return available[0] ?? ranked[0];
}

export const INITIAL_REVIEW_SEED_KEY = "initial-130-selection-v1";

export type SeedImageReviewResult = {
  reviewId: string;
  status: string;
  selected: number;
  alternatives: number;
  distinctSelected: number;
  alreadySeeded: boolean;
  token?: string;
  clientPath?: string;
  adminPath?: string;
};

export async function seedInitialImageReview(db: Db): Promise<SeedImageReviewResult> {
  const manifest = await readAssetManifest();
  const labels = await db.collection<AssetLabelRecord>(ASSET_LABEL_COLLECTION).find({ status: "labeled" }).toArray();
  const manifestIds = new Set(manifest.images.map((image) => image.id));
  const candidates: Candidate[] = labels
    .filter((label) => manifestIds.has(label.assetId))
    .map((label) => ({
      label,
      text: labelText(label),
      width: Number(label.width ?? 0),
      height: Number(label.height ?? 0),
    }));
  const slots = buildSlots();
  if (slots.length !== 130) throw new Error(`Expected 130 slots, found ${slots.length}`);

  const { projects, items } = await ensureImageReviewIndexes(db);
  const existing = await projects.findOne({ seedKey: INITIAL_REVIEW_SEED_KEY });
  if (existing) {
    const existingItems = await items.find({ reviewId: existing.reviewId }).toArray();
    return {
      reviewId: existing.reviewId,
      status: existing.status,
      selected: existingItems.filter((item) => item.role === "selected").length,
      alternatives: existingItems.filter((item) => item.role === "alternative").length,
      distinctSelected: new Set(existingItems.filter((item) => item.role === "selected").map((item) => item.assetId)).size,
      alreadySeeded: true,
    };
  }

  const { project, token } = await createImageReview(db, "Sawla photography selection — initial client review", "");
  const selectedIds = new Set<string>();
  const alternativeIds = new Set<string>();
  const reviewItems: ReviewItem[] = [];
  let position = 0;

  for (const currentSlot of slots) {
    const picked = choose(candidates, currentSlot, selectedIds);
    if (!picked) throw new Error(`No candidate found for ${currentSlot.slotKey}`);
    selectedIds.add(picked.candidate.label.assetId);
    position += 1;
    reviewItems.push({
      reviewId: project.reviewId,
      assetId: picked.candidate.label.assetId,
      categoryId: currentSlot.categoryId,
      slotKey: currentSlot.slotKey,
      pagePath: currentSlot.pagePath,
      pageTargets: [currentSlot.pagePath],
      selectionReason: picked.hits.length > 0
        ? `Matched ${picked.hits.slice(0, 4).join(", ")}; quality score ${picked.qualityScore}.`
        : `Best available technical fit for ${currentSlot.title}; quality score ${picked.qualityScore}.`,
      qualityScore: picked.qualityScore,
      role: "selected",
      decision: "pending",
      position,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const alternative = choose(candidates, currentSlot, new Set([...selectedIds, ...alternativeIds]));
    if (alternative && alternative.candidate.label.assetId !== picked.candidate.label.assetId) {
      alternativeIds.add(alternative.candidate.label.assetId);
      reviewItems.push({
        reviewId: project.reviewId,
        assetId: alternative.candidate.label.assetId,
        categoryId: currentSlot.categoryId,
        slotKey: currentSlot.slotKey,
        pagePath: currentSlot.pagePath,
        pageTargets: [currentSlot.pagePath],
        selectionReason: alternative.hits.length > 0
          ? `Curated alternative matched ${alternative.hits.slice(0, 4).join(", ")}; quality score ${alternative.qualityScore}.`
          : `Curated technical alternative for ${currentSlot.title}; quality score ${alternative.qualityScore}.`,
        qualityScore: alternative.qualityScore,
        role: "alternative",
        decision: "pending",
        position: position + 1000,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
  }

  await items.insertMany(reviewItems);
  await db.collection(IMAGE_REVIEW_COLLECTION).updateOne(
    { reviewId: project.reviewId },
    { $set: { status: "client-review", seedKey: INITIAL_REVIEW_SEED_KEY, updatedAt: new Date() } },
  );

  return {
    reviewId: project.reviewId,
    status: "client-review",
    selected: reviewItems.filter((item) => item.role === "selected").length,
    alternatives: reviewItems.filter((item) => item.role === "alternative").length,
    distinctSelected: selectedIds.size,
    alreadySeeded: false,
    token,
    clientPath: `/image-review/${project.reviewId}/${token}`,
    adminPath: `/image-review/${project.reviewId}/${token}?mode=admin`,
  };
}
