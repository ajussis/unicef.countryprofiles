import Link from 'next/link'
import { getAllCountries, getCountryFlag, getCountryRegion } from '@/lib/countries'
import styles from './page.module.css'

export default function HomePage() {
  const countries = getAllCountries()
  
  // Group countries by region
  const countriesByRegion = countries.reduce((acc, country) => {
    const region = getCountryRegion(country.name)
    if (!acc[region]) {
      acc[region] = []
    }
    acc[region].push(country)
    return acc
  }, {} as Record<string, typeof countries>)
  
  const regions = Object.keys(countriesByRegion).sort()
  
  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <header className={styles.hero}>
        <div className={styles.heroBackground}>
          <div className={styles.heroPattern}></div>
        </div>
        <div className={styles.heroContent}>
          <div className={styles.badge}>UNICEF EdTech Initiative</div>
          <h1 className={styles.heroTitle}>
            Country<br />
            <span className={styles.heroTitleAccent}>Profiles</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Comprehensive EdTech suitability and compliance assessments 
            for education systems worldwide.
          </p>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>{countries.length}</span>
              <span className={styles.statLabel}>Countries</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>{regions.length}</span>
              <span className={styles.statLabel}>Regions</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>13</span>
              <span className={styles.statLabel}>Assessment Areas</span>
            </div>
          </div>
        </div>
      </header>

      {/* Countries Grid */}
      <section className={styles.countriesSection}>
        <div className={styles.container}>
          {regions.map((region, regionIndex) => (
            <div key={region} className={styles.regionGroup}>
              <h2 className={styles.regionTitle}>
                <span className={styles.regionIcon}>●</span>
                {region}
                <span className={styles.regionCount}>
                  {countriesByRegion[region].length} {countriesByRegion[region].length === 1 ? 'country' : 'countries'}
                </span>
              </h2>
              <div className={styles.grid}>
                {countriesByRegion[region].map((country, index) => (
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
