import Link from 'next/link'
import { getAllCountries, getCountryFlag, getCountryRegion, getCountryContinent, continentOrder } from '@/lib/countries'
import styles from './page.module.css'

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
  
  // Count unique regions
  const uniqueRegions = new Set(countries.map(c => getCountryRegion(c.name)))
  
  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Country Profiles</h1>
          <p className={styles.heroSubtitle}>
            Comprehensive EdTech suitability and compliance assessments for education systems worldwide. 
            Explore regulatory environments, digital policies, and deployment conditions.
          </p>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>{countries.length}</span>
              <span className={styles.statLabel}>Countries</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>{uniqueRegions.size}</span>
              <span className={styles.statLabel}>Regions</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>13</span>
              <span className={styles.statLabel}>Assessment Areas</span>
            </div>
          </div>
        </div>
      </section>

      {/* Countries Grid */}
      <section className={styles.countriesSection}>
        <div className={styles.container}>
          {sortedContinents.map((continent) => {
            const regions = countriesByContinent[continent]
            const sortedRegions = Object.keys(regions).sort()
            const continentCountryCount = Object.values(regions).flat().length
            
            return (
              <div key={continent} className={styles.continentGroup}>
                <h2 className={styles.continentTitle}>
                  {continent}
                  <span className={styles.continentCount}>
                    {continentCountryCount} {continentCountryCount === 1 ? 'country' : 'countries'}
                  </span>
                </h2>
                
                {sortedRegions.map((region) => (
                  <div key={region} className={styles.regionGroup}>
                    <h3 className={styles.regionTitle}>
                      <span className={styles.regionIcon}>●</span>
                      {region}
                      <span className={styles.regionCount}>
                        {regions[region].length}
                      </span>
                    </h3>
                    <div className={styles.grid}>
                      {regions[region].map((country, index) => (
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
                              <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
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
