import Link from 'next/link'
import dynamic from 'next/dynamic'
import { getAllCountries, getCountryFlag, getCountryRegion, getCountryContinent, continentOrder, africaRegionOrder } from '@/lib/countries'
import { getRegionSlugForRegionName } from '@/lib/regions'
import styles from './page.module.css'

// Dynamic import to avoid SSR issues with Leaflet
const CountryMap = dynamic(() => import('@/components/CountryMap'), {
  ssr: false,
  loading: () => <div style={{ height: '450px', background: '#f0f4f8', borderRadius: '12px', margin: '0 auto', maxWidth: '1200px' }} />
})

interface CountryData {
  slug: string
  name: string
  title: string
  description: string
  content: string
}

interface RegionData {
  [region: string]: CountryData[]
}

interface ContinentData {
  [continent: string]: RegionData
}

export default function HomePage() {
  const countries = getAllCountries()

  // Group countries by continent, then by region
  const countriesByContinent = countries.reduce((acc, country) => {
    const continent = getCountryContinent(country.name)
    const region = getCountryRegion(country.name)

    if (!acc[continent]) {
      acc[continent] = {}
    }
    if (!acc[continent][region]) {
      acc[continent][region] = []
    }
    acc[continent][region].push(country)
    return acc
  }, {} as ContinentData)

  // Sort continents by defined order
  const sortedContinents = continentOrder.filter(c => countriesByContinent[c])

  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>EdTech Country Profiles</h1>
          <p className={styles.heroSubtitle}>
            Comprehensive EdTech suitability and compliance assessments for education systems worldwide.
            Explore regulatory environments, digital policies, and deployment conditions.
          </p>
        </div>
      </section>

      {/* Map Section */}
      <section className={styles.mapSection}>
        <CountryMap />
      </section>

      {/* Countries Grid */}
      <section className={styles.countriesSection}>
        <div className={styles.container}>
          {sortedContinents.map((continent) => {
            const regions = countriesByContinent[continent]
            const sortedRegions =
              continent === 'Africa'
                ? africaRegionOrder.filter((r) => regions[r])
                : Object.keys(regions).sort()
            const continentCountryCount = Object.values(regions).flat().length

            return (
              <div key={continent} className={styles.continentGroup}>
                <h2 className={styles.continentTitle}>
                  {continent}
                  <span className={styles.continentCount}>
                    {continentCountryCount} {continentCountryCount === 1 ? 'country' : 'countries'}
                  </span>
                </h2>

                {sortedRegions.map((regionName) => {
                  const regionSlug = getRegionSlugForRegionName(regionName)
                  return (
                    <div key={regionName} className={styles.regionGroup}>
                      <h3 className={styles.regionTitle}>
                        <span className={styles.regionIcon}>●</span>
                        {regionName}
                        <span className={styles.regionCount}>
                          {regions[regionName].length}
                        </span>
                      </h3>
                      {regionSlug && (
                        <Link href={`/region/${regionSlug}`} className={styles.regionCta}>
                          <div className={styles.regionCtaContent}>
                            <span className={styles.regionCtaTitle}>Regional EdTech Profile</span>
                            <span className={styles.regionCtaDesc}>
                              Explore {regionName} • {regions[regionName].length} {regions[regionName].length === 1 ? 'country' : 'countries'}
                            </span>
                          </div>
                          <span className={styles.regionCtaArrow}>→</span>
                        </Link>
                      )}
                      <div className={styles.grid}>
                        {regions[regionName].map((country, index) => (
                          <Link
                            href={`/country/${country.slug}`}
                            key={country.slug}
                            className={`${styles.card} animate-fade-in stagger-${(index % 15) + 1}`}
                            style={{ opacity: 0 }}
                          >
                            <div className={styles.cardFlag}>
                              {getCountryFlag(country.name)}
                            </div>
                            <div className={styles.cardContent}>
                              <h3 className={styles.cardTitle}>{country.name}</h3>
                              <p className={styles.cardDescription}>
                                EdTech Suitability & Compliance Profile
                              </p>
                            </div>
                            <div className={styles.cardArrow}>
                              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <p className={styles.footerText}>
            These profiles provide evidence-based assessments to guide EdTech deployment decisions.
          </p>
          <p className={styles.footerCopyright}>
            2024 Edition • Built for The Learning Cabinet
          </p>
        </div>
      </footer>
    </main>
  )
}
