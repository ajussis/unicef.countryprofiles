import { notFound } from 'next/navigation'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { getRegionBySlug, getRegionMapData, getProductsActiveInRegionWithCountries } from '@/lib/regions'
import { getAllCountries, getCountryFlag } from '@/lib/countries'
import Chatbot from '@/components/Chatbot'
import RegionToolsToggle from '@/components/RegionToolsToggle'
import RegionOverview from '@/components/RegionOverview'
import RegionsCountriesNav from '@/components/RegionsCountriesNav'
import styles from './page.module.css'

const RegionMap = dynamic(() => import('@/components/RegionMap'), { ssr: false })

export async function generateStaticParams() {
  const { getAllRegionSlugs } = await import('@/lib/regions')
  return getAllRegionSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const region = getRegionBySlug(params.slug)
  if (!region) return { title: 'Region Not Found' }
  return {
    title: `${region.name} | Regional EdTech Profile`,
    description: region.description,
  }
}

export default function RegionPage({ params }: { params: { slug: string } }) {
  const region = getRegionBySlug(params.slug)
  if (!region) notFound()

  const regionMapMarkers = getRegionMapData(region)
  const allCountries = getAllCountries()
  const countriesInRegion = region.countryNames.flatMap((name) => {
    const c = allCountries.find((x) => x.name === name)
    return c ? [c] : []
  })

  return (
    <main className={styles.main}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Link href="/" className={styles.backLink}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M16 10H4M4 10L9 5M4 10L9 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>All Country Profiles</span>
          </Link>
          <h1 className={styles.title}>{region.name}</h1>
          <p className={styles.subtitle}>Regional EdTech Profile</p>
          <div className={styles.countriesRow}>
            {countriesInRegion.map((country) => (
              <Link
                key={country.slug}
                href={`/country/${country.slug}`}
                className={styles.countryPill}
              >
                <span className={styles.countryFlag}>{getCountryFlag(country.name)}</span>
                <span>{country.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* Info block + Advisor */}
      <section className={styles.heroSection}>
        <div className={styles.heroGrid}>
          <div className={styles.infoBlock}>
            {region.overview ? (
              <RegionOverview overview={region.overview} />
            ) : (
              <>
                <h2 className={styles.infoTitle}>Regional overview</h2>
                <p className={styles.infoDescription}>{region.description}</p>
                <div className={styles.metrics}>
                  <div className={styles.metric}>
                    <span className={styles.metricLabel}>Education systems</span>
                    <p className={styles.metricText}>{region.metrics.educationSystem}</p>
                  </div>
                  <div className={styles.metric}>
                    <span className={styles.metricLabel}>Technology</span>
                    <p className={styles.metricText}>{region.metrics.technology}</p>
                  </div>
                  <div className={styles.metric}>
                    <span className={styles.metricLabel}>Internet connectivity</span>
                    <p className={styles.metricText}>{region.metrics.connectivity}</p>
                  </div>
                  <div className={styles.metric}>
                    <span className={styles.metricLabel}>EdTech deployment</span>
                    <p className={styles.metricText}>{region.metrics.edtechDeployment}</p>
                  </div>
                </div>
              </>
            )}
          </div>
          <aside className={styles.sidebar}>
            <Chatbot region={region.name} inline />
          </aside>
        </div>
      </section>

      {/* Map */}
      <section className={styles.mapSection}>
        <div className={styles.mapWrap}>
          <RegionMap
            center={region.mapCenter}
            zoom={region.mapZoom}
            markers={regionMapMarkers}
            title="Countries in this region"
            subtitle="Click a marker for country profile and active EdTech products"
            mapHeight={520}
            wide
          />
        </div>
      </section>

      {/* Country profile cards */}
      <section className={styles.countriesSection}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>Country profiles</h2>
          <div className={styles.cardGrid}>
            {countriesInRegion.map((country) => (
              <Link
                href={`/country/${country.slug}`}
                key={country.slug}
                className={styles.card}
              >
                <div className={styles.cardFlag}>{getCountryFlag(country.name)}</div>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{country.name}</h3>
                  <p className={styles.cardDescription}>EdTech Suitability & Compliance Profile</p>
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
      </section>

      {/* Learning Cabinet tools */}
      <section className={styles.toolsSection}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>Learning Cabinet tools</h2>
          <RegionToolsToggle
            productsFromRegion={region.productsFromRegion}
            productsActiveInRegion={getProductsActiveInRegionWithCountries(region)}
          />
        </div>
      </section>

      {/* News */}
      <section className={styles.newsSection}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>News & updates</h2>
          <div className={styles.newsGrid}>
            {region.news.map((item, idx) => (
              <a
                key={idx}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.newsCard}
              >
                <h3 className={styles.newsTitle}>{item.title}</h3>
                <span className={styles.newsMeta}>
                  {item.source} · {item.date}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <RegionsCountriesNav excludeRegion={region.name} />

      <footer className={styles.footer}>
        <div className={styles.sectionContainer}>
          <Link href="/" className={styles.footerBack}>
            ← Back to Country Profiles
          </Link>
          <p className={styles.footerCopyright}>
            2024 Edition · Built for The Learning Cabinet
          </p>
        </div>
      </footer>
    </main>
  )
}

