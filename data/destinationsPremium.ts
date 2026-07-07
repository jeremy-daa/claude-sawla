// Use a typed runtime require rather than a generated literal JSON type.
// This keeps TypeScript validation fast even with ~28,000 words of structured copy.
// eslint-disable-next-line @typescript-eslint/no-require-imports
const rawProfiles: unknown = require('./destinationsPremium.json')

export type DestinationDifficulty = 'Easy' | 'Moderate' | 'Challenging' | 'Extreme'

export interface DestinationFact {
  label: string
  value: string
  note?: string
}

export interface DestinationFeature {
  title: string
  body: string
}

export interface DestinationSeason {
  period: string
  conditions: string
  bestFor: string
  note?: string
}

export interface DestinationFAQ {
  q: string
  a: string
}

export interface DestinationProfile {
  slug: string
  name: string
  shortName: string
  region: string
  zone: 'North' | 'East' | 'South' | 'West' | 'Central'
  category: string[]
  featured: boolean
  difficulty: DestinationDifficulty
  bestTime: string
  idealStay: string
  gateway: string
  fromAddis: string
  altitude: string
  tagline: string
  dek: string
  overview: string[]
  status: string
  statusLevel: 'standard' | 'check' | 'specialist'
  facts: DestinationFact[]
  attractions: DestinationFeature[]
  experiences: DestinationFeature[]
  stay: {
    minimum: string
    ideal: string
    extended: string
    pacing: string[]
  }
  access: {
    overview: string
    air: string
    road: string
    local: string
  }
  seasons: DestinationSeason[]
  challenge: {
    summary: string
    terrain: string
    climate: string
    accessibility: string
  }
  practical: string[]
  responsible: string[]
  combinations: DestinationFeature[]
  faqs: DestinationFAQ[]
  seo: {
    title: string
    description: string
    primaryKeyword: string
    secondaryKeywords: string[]
  }
  image: {
    heroAlt: string
    cardAlt: string
  }
}

export const PREMIUM_DESTINATIONS = rawProfiles as DestinationProfile[]

export const DESTINATION_BY_SLUG = Object.fromEntries(
  PREMIUM_DESTINATIONS.map(destination => [destination.slug, destination]),
) as Record<string, DestinationProfile>

export function getPremiumDestination(slug: string) {
  return DESTINATION_BY_SLUG[slug]
}
