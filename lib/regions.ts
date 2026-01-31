import { countryMapData } from './countryMapData'

export interface RegionMetrics {
  educationSystem?: string
  technology?: string
  connectivity?: string
  edtechDeployment?: string
}

/** Rich regional overview content with collapsible sections */
export interface RegionalDecisionSnapshot {
  deliveryChannel: string
  systemReadiness: string
  connectivityConstraint: string
  fundingClimate: string
  marketMaturity: string
  primaryRisk: string
  useCases: string[]
}

export interface SectionWithInsight {
  content: string
  whatThisMeans: string
}

export interface EdTechMarketSection {
  content: string
  maturity: string
  governmentLeadership: string
  procurementBehavior: string
  whatThisMeans: string
}

export interface RegionOverviewContent {
  decisionSnapshot: RegionalDecisionSnapshot
  executiveContext: string
  educationSystems: SectionWithInsight
  technologyEnvironment: SectionWithInsight
  internetConnectivity: SectionWithInsight
  edtechMarketLandscape: EdTechMarketSection
  recommendedCharacteristics: string[]
  deploymentRisks: string[]
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
  /** Optional rich overview content; when set, replaces the basic metrics block */
  overview?: RegionOverviewContent
}

/** For "Active in region" tab: product name + list of countries in this region where it's active */
export interface ProductActiveInRegion {
  name: string
  countries: string[]
}

const eastSouthernAfricaOverview: RegionOverviewContent = {
  decisionSnapshot: {
    deliveryChannel: 'Mobile-first ecosystems dominate education technology access.',
    systemReadiness: 'Reform-oriented, with several governments advancing competency-based curricula and digital strategies.',
    connectivityConstraint: 'Moderate — coverage expanding, but meaningful rural and affordability gaps remain.',
    fundingClimate: 'Strong multilateral, NGO, and government investment supporting national digital learning programs.',
    marketMaturity: 'Emerging → Scaling, with a shift from pilots toward system-level adoption.',
    primaryRisk: 'Infrastructure inequality may limit equitable implementation without offline-capable solutions.',
    useCases: [
      'Foundational literacy and numeracy',
      'Teacher professional development',
      'Structured pedagogy tools',
      'Blended and asynchronous learning models',
    ],
  },
  executiveContext:
    'East and Southern Africa is a mobile-first, reform-driven region where EdTech adoption is accelerating. Governments are increasingly integrating digital learning into national strategies, yet deployment success continues to depend heavily on infrastructure realities and implementation capacity.',
  educationSystems: {
    content:
      'The region serves over 200 million children and youth, with significant variation in enrollment, learning outcomes, and system capacity. Countries such as Kenya, Rwanda, and Tanzania are advancing curriculum modernization and assessment reforms, creating favorable conditions for structured digital learning tools.',
    whatThisMeans:
      'Solutions aligned with national curricula — particularly competency-based frameworks — are more likely to gain government traction and scale beyond pilot phases.',
  },
  technologyEnvironment: {
    content:
      'Smartphone adoption is expanding rapidly, and many learners experience the internet primarily through mobile devices. Shared device models remain common in schools, while laptop penetration is comparatively limited.',
    whatThisMeans:
      'Tools optimized for low-bandwidth Android environments will scale faster than device-heavy platforms. Lightweight architecture should be considered a baseline requirement rather than a feature.',
  },
  internetConnectivity: {
    content:
      'Approximately 64% of the population has access to high-speed network coverage, yet active internet usage remains significantly lower (around 24%), reflecting affordability constraints and uneven access between urban and rural communities. Major investments from development partners continue to expand broadband infrastructure, but progress is not uniform across countries.',
    whatThisMeans:
      'Offline functionality, asynchronous learning capabilities, and efficient data usage are critical for national deployments — not optional enhancements.',
  },
  edtechMarketLandscape: {
    content:
      'Government-led digital education initiatives are gaining momentum, particularly in Kenya, Rwanda, and Tanzania, where ministries are increasingly coordinating large-scale programs rather than isolated pilots. The regional ecosystem includes a growing mix of NGOs, private providers, and donor-backed implementations transitioning toward broader adoption.',
    maturity: 'Emerging but moving toward scale',
    governmentLeadership: 'Strengthening',
    procurementBehavior: 'Historically pilot-heavy; gradually shifting toward system integration',
    whatThisMeans:
      'Providers prepared for public-sector procurement processes, interoperability expectations, and long deployment cycles will be better positioned than those optimized solely for direct-to-school models.',
  },
  recommendedCharacteristics: [
    'Offline or low-connectivity functionality',
    'Strong Android optimization',
    'Minimal teacher training burden',
    'Alignment with national curricula',
    'Flexible pricing for public education systems',
    'Local language adaptability',
    'Evidence of learning impact',
  ],
  deploymentRisks: [
    'Infrastructure inequality — risk of widening access gaps without inclusive deployment strategies.',
    'Teacher digital readiness — professional development often required for effective implementation.',
    'Fragmented procurement pathways — decision-making can involve multiple stakeholders.',
    'Donor dependency — some initiatives rely on external funding cycles.',
  ],
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
  overview: eastSouthernAfricaOverview,
  mapCenter: [-6.5, 25],
  mapZoom: 4,
  countryNames: ['Kenya', 'Malawi', 'Mozambique', 'Namibia', 'South Africa', 'Tanzania', 'Uganda', 'Zambia', 'Zimbabwe'],
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

const northAfrica: Region = {
  slug: 'north-africa',
  name: 'North Africa',
  description: 'North Africa encompasses countries along the Mediterranean coast with diverse education systems and growing digital infrastructure. The region is investing in EdTech to expand access and improve learning outcomes.',
  metrics: {
    educationSystem: 'Over 60 million children and youth. Strong emphasis on Arabic and French-language education; varying levels of digital integration across countries.',
    technology: 'Increasing smartphone and laptop adoption. Government initiatives to provide devices in schools; private sector partnerships expanding.',
    connectivity: 'Higher internet penetration in urban areas; broadband expansion underway. Mobile networks dominant in rural regions.',
    edtechDeployment: 'Government-led digital education programs; growing EdTech ecosystem with regional and international solutions. Learning Cabinet tools expanding presence.',
  },
  mapCenter: [28, 10],
  mapZoom: 4,
  countryNames: ['Algeria', 'Egypt', 'Libya', 'Morocco', 'Tunisia'],
  productsActiveInRegion: ['Curious Reader'],
  productsFromRegion: [],
  news: [
    {
      title: 'Digital education transforms North African classrooms',
      url: 'https://www.unesco.org/en/articles/digital-education-transforms-north-african-classrooms',
      source: 'UNESCO',
      date: '2024',
    },
    {
      title: 'Morocco invests in EdTech to bridge digital divide',
      url: 'https://www.worldbank.org/en/region/mena',
      source: 'World Bank',
      date: '2024',
    },
    {
      title: 'Egypt launches national digital learning platform',
      url: 'https://en.unesco.org/themes/education',
      source: 'UNESCO',
      date: '2023',
    },
  ],
}

const westCentralAfrica: Region = {
  slug: 'west-central-africa',
  name: 'West & Central Africa',
  description: 'West and Central Africa is a dynamic region with diverse education systems and rapidly growing mobile connectivity. Countries are scaling digital learning initiatives to reach underserved communities.',
  metrics: {
    educationSystem: 'Over 150 million children and youth. Significant variation in enrollment; many countries reforming curricula and expanding access to secondary education.',
    technology: 'Mobile-first; high smartphone growth. Low-cost devices and solar-powered solutions gaining traction for off-grid schools.',
    connectivity: 'Mobile internet expanding; fiber infrastructure in urban areas. Rural connectivity improving through satellite and community networks.',
    edtechDeployment: 'NGO and donor-supported pilots; government programs scaling. Learning Cabinet tools including Tangible, Curious Reader, and others active across the region.',
  },
  mapCenter: [8, 5],
  mapZoom: 4,
  countryNames: ['Benin', 'Cameroon', 'Chad', 'Ghana', 'Guinea', 'Ivory Coast', 'Nigeria', 'Senegal'],
  productsActiveInRegion: ['Tangible', 'Curious Reader'],
  productsFromRegion: [],
  news: [
    {
      title: 'West Africa EdTech startups attract investment to scale learning solutions',
      url: 'https://techcrunch.com/',
      source: 'TechCrunch',
      date: '2024',
    },
    {
      title: 'Ghana expands digital literacy program to rural schools',
      url: 'https://www.worldbank.org/en/country/ghana',
      source: 'World Bank',
      date: '2024',
    },
    {
      title: 'UNICEF supports EdTech deployment across West and Central Africa',
      url: 'https://www.unicef.org/wca/',
      source: 'UNICEF',
      date: '2024',
    },
  ],
}

const regionsData: Region[] = [eastSouthernAfrica, northAfrica, westCentralAfrica]

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
