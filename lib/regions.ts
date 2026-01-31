import { countryMapData } from './countryMapData'

export interface RegionMetrics {
  educationSystem?: string
  technology?: string
  connectivity?: string
  edtechDeployment?: string
}

export interface ProductFromRegion {
  name: string
  headquarters: string
}

export interface Region {
  slug: string
  name: string
  description: string
  metrics: RegionMetrics
  mapCenter: [number, number]
  mapZoom: number
  countryNames: string[]
  /** Product names with major operations / majority of users in this region */
  productsActiveInRegion: string[]
  /** Products headquartered or originating from this region */
  productsFromRegion: ProductFromRegion[]
  news: Array<{ title: string; url: string; source: string; date: string }>
}

/** For "Active in region" tab: product name + list of countries in this region where it's active */
export interface ProductActiveInRegion {
  name: string
  countries: string[]
}

const eastSouthernAfrica: Region = {
  slug: 'east-southern-africa',
  name: 'East & Southern Africa',
  description: 'East and Southern Africa is a diverse region with growing investment in education technology. Countries in the region are expanding digital learning infrastructure and adopting EdTech to improve access and quality of education.',
  metrics: {
    educationSystem: 'Over 200 million children and youth in the region. Significant variation in enrollment and learning outcomes across countries; several countries are reforming curricula and assessment.',
    technology: 'Mobile-first adoption is dominant. Smartphone penetration growing; low-cost devices and shared access common in schools.',
    connectivity: 'About 64% high-speed internet coverage, 24% internet usage (2023). World Bank and others investing in broadband; rural-urban and country gaps remain.',
    edtechDeployment: 'Government-led digital education initiatives in Kenya, Tanzania, Rwanda; NGO and private EdTech pilots scaling. Learning Cabinet tools with major presence include onecourse, EIDU, Maths-Whizz, Angaza Elimu, and others.',
  },
  mapCenter: [-6.5, 25],
  mapZoom: 4,
  countryNames: ['Kenya', 'Namibia', 'Zimbabwe'],
  productsActiveInRegion: [
    'onecourse',
    'Maths-Whizz',
    'Tangible',
    'BookSmart',
    'EIDU',
    "NABU's multilingual web reader",
    'Angaza Elimu',
    'MathLAB',
    'Curious Reader',
  ],
  productsFromRegion: [
    { name: 'Angaza Elimu', headquarters: 'Kenya' },
    { name: 'EIDU', headquarters: 'Kenya' },
    { name: 'onecourse', headquarters: 'Kenya' },
  ],
  news: [
    {
      title: 'Africa unveils ambitious EdTech 2030 Plan to revolutionize education through technology',
      url: 'https://techreviewafrica.com/news/2537/africa-unveils-ambitious-edtech-2030-plan-to-revolutionize-education-through-technology',
      source: 'Tech Review Africa',
      date: '2025',
    },
    {
      title: 'Regional insights for effective EdTech deployment in Kenya',
      url: 'https://edtech-eastafrica.com/2024/09/22/bridging-gaps-in-education-regional-insights-for-effective-edtech-deployment-in-kenya/',
      source: 'EdTech East Africa',
      date: 'Sept 2024',
    },
    {
      title: 'World Bank to accelerate digital inclusion for 180 million people across Eastern and Southern Africa',
      url: 'https://www.worldbank.org/en/news/press-release/2024/06/27/world-bank-to-accelerate-digital-inclusion-for-180-million-people-across-afe-eastern-and-southern-africa',
      source: 'World Bank',
      date: 'June 2024',
    },
  ],
}

const regionsData: Region[] = [eastSouthernAfrica]

export function getRegionBySlug(slug: string): Region | null {
  return regionsData.find((r) => r.slug === slug) ?? null
}

export function getAllRegionSlugs(): string[] {
  return regionsData.map((r) => r.slug)
}

export function getRegionSlugForRegionName(regionName: string): string | null {
  const region = regionsData.find(
    (r) => r.name.toLowerCase() === regionName.toLowerCase()
  )
  return region?.slug ?? null
}

/** Get map data for countries in a region */
export function getRegionMapData(region: Region) {
  return countryMapData.filter((c) => region.countryNames.includes(c.name))
}

/** Get products active in region with the list of countries (in this region) where each is active */
export function getProductsActiveInRegionWithCountries(region: Region): ProductActiveInRegion[] {
  const result: ProductActiveInRegion[] = []
  const seen = new Set<string>()
  for (const productName of region.productsActiveInRegion) {
    if (seen.has(productName)) continue
    seen.add(productName)
    const countries = countryMapData
      .filter((c) => region.countryNames.includes(c.name) && c.products.includes(productName))
      .map((c) => c.name)
    if (countries.length > 0) {
      result.push({ name: productName, countries })
    }
  }
  return result
}
