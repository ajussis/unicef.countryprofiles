import dynamic from 'next/dynamic'
import { getAllCountries, getCountryRegion, getCountryContinent, continentOrder, africaRegionOrder } from '@/lib/countries'
import styles from './page.module.css'

// Dynamic import to avoid SSR issues with Leaflet
const CountryMap = dynamic(() => import('@/components/CountryMap'), {
  ssr: false,
  loading: () => <div style={{ height: '450px', background: '#f0f4f8', borderRadius: '12px', margin: '0 auto', maxWidth: '1200px' }} />
})

const CountriesSection = dynamic(() => import('@/components/CountriesSection'), { ssr: true })

export default function HomePage() {
  const countries = getAllCountries()
  const countriesByContinent = countries.reduce((acc, country) => {
    const continent = getCountryContinent(country.name)
    const region = getCountryRegion(country.name)
    if (!acc[continent]) acc[continent] = {}
    if (!acc[continent][region]) acc[continent][region] = []
    acc[continent][region].push(country)
    return acc
  }, {} as Record<string, Record<string, (typeof countries)[number][]>>)
  const sortedContinents = continentOrder.filter((c) => countriesByContinent[c])

  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Global South EdTech Intelligence</h1>
          <p className={styles.heroSubtitle}>
            Strategic insights into education technology markets, policy environments, and system readiness across emerging economies.
          </p>
        </div>
      </section>

      {/* Map Section */}
      <section className={styles.mapSection}>
        <CountryMap />
      </section>

      {/* Countries Grid */}
      <CountriesSection
        countriesByContinent={countriesByContinent}
        sortedContinents={sortedContinents}
      />

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
