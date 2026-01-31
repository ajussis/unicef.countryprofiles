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
    'East Africa is a mobile-first, reform-driven region where EdTech adoption is accelerating. Governments are increasingly integrating digital learning into national strategies, yet deployment success continues to depend heavily on infrastructure realities and implementation capacity. Kenya and Rwanda are especially influential signal-setters.',
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

const eastAfrica: Region = {
  slug: 'east-africa',
  name: 'East Africa',
  description: 'One of the fastest-moving EdTech zones in Africa. Reform-oriented ministries, strong mobile ecosystems, and active NGO presence. Kenya and Rwanda are especially influential signal-setters. Excellent region for scalable innovation pilots that can become national programs.',
  metrics: {
    educationSystem: 'Reform-oriented ministries advancing competency-based curricula and digital strategies. Significant variation in enrollment and learning outcomes across countries.',
    technology: 'Strong mobile ecosystems. Smartphone adoption expanding rapidly; shared device models common in schools.',
    connectivity: 'Coverage expanding but meaningful rural and affordability gaps remain. Offline-capable solutions critical.',
    edtechDeployment: 'Government-led digital education initiatives in Kenya, Rwanda, Tanzania; NGO and private EdTech pilots scaling. Learning Cabinet tools with major presence include onecourse, EIDU, Maths-Whizz, Angaza Elimu, and others.',
  },
  overview: eastSouthernAfricaOverview,
  mapCenter: [-2, 38],
  mapZoom: 5,
  countryNames: ['Ethiopia', 'Kenya', 'Rwanda', 'Somalia', 'Tanzania', 'Uganda'],
  productsActiveInRegion: [
    'onecourse',
    'Maths-Whizz',
    'Tangible',
    'BookSmart',
    'EIDU',
    "NABU's multilingual web reader and mobile app",
    'Curious Reader',
    'Angaza Elimu',
  ],
  productsFromRegion: [
    { name: 'Angaza Elimu', headquarters: 'Nairobi, Kenya' },
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
  description: 'Higher average connectivity and strong government control of education systems. Arabic and French language ecosystems. Often policy-driven procurement. More top-down adoption and fewer fragmented pilots than in Sub-Saharan markets.',
  metrics: {
    educationSystem: 'Strong government control of education systems. Strong emphasis on Arabic and French-language education; varying levels of digital integration.',
    technology: 'Increasing smartphone and laptop adoption. Government initiatives to provide devices in schools.',
    connectivity: 'Higher average connectivity than Sub-Saharan Africa. Broadband expansion underway.',
    edtechDeployment: 'Policy-driven procurement. Government-led programs; growing EdTech ecosystem. Learning Cabinet tools expanding presence.',
  },
  mapCenter: [26, 12],
  mapZoom: 4,
  countryNames: ['Algeria', 'Egypt', 'Libya', 'Morocco', 'Sudan', 'Tunisia', 'Western Sahara'],
  productsActiveInRegion: [],
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

const westAfrica: Region = {
  slug: 'west-africa',
  name: 'West Africa',
  description: 'Very large student populations. Strong private-school market in some countries. Infrastructure uneven. English and French split. Huge scale potential but operational complexity is high. Nigeria alone can behave like its own region.',
  metrics: {
    educationSystem: 'Very large student populations. Significant variation in enrollment and system capacity across countries.',
    technology: 'Mobile-first; high smartphone growth. Strong private-school market in some countries.',
    connectivity: 'Infrastructure uneven. Mobile internet expanding in urban areas.',
    edtechDeployment: 'NGO and donor-supported pilots; government programs scaling. Learning Cabinet tools including Tangible, Curious Reader active. Nigeria is a major market.',
  },
  mapCenter: [10, -5],
  mapZoom: 4,
  countryNames: ['Benin', 'Burkina Faso', 'Ghana', 'Guinea', 'Ivory Coast', 'Mali', 'Niger', 'Nigeria', 'Senegal'],
  productsActiveInRegion: ['Tangible', "NABU's multilingual web reader and mobile app", "Amira Reading Suite", 'Curious Reader'],
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

const centralAfrica: Region = {
  slug: 'central-africa',
  name: 'Central Africa',
  description: 'Lower connectivity. More fragile systems in several countries. Harder procurement environments. Often donor-driven deployments rather than government-funded scale. Many global platforms under-invest here — which creates whitespace but also risk.',
  metrics: {
    educationSystem: 'More fragile systems in several countries. Significant variation in enrollment and capacity.',
    technology: 'Lower connectivity. Mobile-first where connectivity exists.',
    connectivity: 'Lower connectivity than other African regions. Infrastructure gaps.',
    edtechDeployment: 'Often donor-driven deployments. Government-funded scale limited. Important product note: whitespace but also risk for under-invested markets.',
  },
  mapCenter: [2, 20],
  mapZoom: 4,
  countryNames: ['Cameroon', 'Central African Republic', 'Chad', 'Democratic Republic of the Congo', 'Gabon'],
  productsActiveInRegion: [],
  productsFromRegion: [],
  news: [
    {
      title: 'EdTech in Central Africa: bridging the digital divide',
      url: 'https://www.worldbank.org/',
      source: 'World Bank',
      date: '2024',
    },
    {
      title: 'UNESCO supports education in fragile contexts',
      url: 'https://www.unesco.org/',
      source: 'UNESCO',
      date: '2024',
    },
    {
      title: 'Donor-driven EdTech in Central Africa',
      url: 'https://www.unicef.org/',
      source: 'UNICEF',
      date: '2023',
    },
  ],
}

const southernAfrica: Region = {
  slug: 'southern-africa',
  name: 'Southern Africa',
  description: 'South Africa acts as a regional anchor. Better infrastructure in several countries. More mature vendor ecosystems. Closer to middle-income market dynamics in parts — procurement expectations can be higher.',
  metrics: {
    educationSystem: 'South Africa anchors the region. Significant variation in enrollment; several countries with stronger infrastructure.',
    technology: 'More mature vendor ecosystems. Better infrastructure in several countries.',
    connectivity: 'Better connectivity than many Sub-Saharan regions. Urban-rural gaps remain.',
    edtechDeployment: 'Higher procurement expectations in parts. Learning Cabinet tools including MathLAB, Curious Reader active. Mozambique, Zimbabwe scaling.',
  },
  mapCenter: [-20, 25],
  mapZoom: 4,
  countryNames: ['Botswana', 'Malawi', 'Mozambique', 'Namibia', 'South Africa', 'Zambia', 'Zimbabwe'],
  productsActiveInRegion: [
    'Reading Eggs',
    'Micro:bit',
    'Eduten',
    'Matific',
    'BookSmart',
    "NABU's multilingual web reader and mobile app",
    'Tangible',
    'MathLAB',
    'Curious Reader',
    'onecourse',
  ],
  productsFromRegion: [],
  news: [
    {
      title: 'South Africa leads EdTech innovation in Southern Africa',
      url: 'https://www.worldbank.org/',
      source: 'World Bank',
      date: '2024',
    },
    {
      title: 'Digital learning in Mozambique and Zimbabwe',
      url: 'https://www.unesco.org/',
      source: 'UNESCO',
      date: '2024',
    },
    {
      title: 'Regional EdTech ecosystems mature in Southern Africa',
      url: 'https://techreviewafrica.com/',
      source: 'Tech Review Africa',
      date: '2024',
    },
  ],
}

const regionsData: Region[] = [northAfrica, westAfrica, centralAfrica, eastAfrica, southernAfrica]

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
