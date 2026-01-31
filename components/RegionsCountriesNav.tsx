import Link from 'next/link'
import {
  getAllCountries,
  getCountryFlag,
  getCountryRegion,
  getCountryContinent,
  africaRegionOrder,
  continentOrder,
} from '@/lib/countries'
import { getRegionSlugForRegionName } from '@/lib/regions'
import styles from './RegionsCountriesNav.module.css'

interface NavProps {
  excludeRegion?: string
  excludeCountry?: string
}

export default function RegionsCountriesNav({ excludeRegion, excludeCountry }: NavProps) {
  const allCountries = getAllCountries()

  // Group African countries by region
  const africaRegions = africaRegionOrder.map((regionName) => {
    const slug = getRegionSlugForRegionName(regionName)
    const countries = allCountries.filter(
      (c) => getCountryRegion(c.name) === regionName && getCountryContinent(c.name) === 'Africa'
    )
    return { name: regionName, slug, countries }
  }).filter((r) => r.slug && r.name !== excludeRegion)

  // Non-African: group by continent
  const otherContinents = continentOrder
    .filter((c) => c !== 'Africa')
    .map((continent) => ({
      name: continent,
      countries: allCountries.filter((c) => getCountryContinent(c.name) === continent),
    }))
    .filter((c) => c.countries.length > 0)

  // Build 3 columns: split Africa regions across cols 1-2, other in col 3
  const col1 = africaRegions.slice(0, 2)
  const col2 = africaRegions.slice(2, 4)
  const col3 = africaRegions.slice(4, 5)

  const renderRegionBlock = (region: { name: string; slug: string | null; countries: { slug: string; name: string }[] }) => (
    <div key={region.name} className={styles.navBlock}>
      <Link href={`/region/${region.slug}`} className={styles.navRegionLink}>
        {region.name}
      </Link>
      <ul className={styles.navCountryList}>
        {region.countries
          .filter((c) => c.slug !== excludeCountry)
          .map((country) => (
            <li key={country.slug}>
              <Link href={`/country/${country.slug}`} className={styles.navCountryLink}>
                <span className={styles.navFlag}>{getCountryFlag(country.name)}</span>
                {country.name}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  )

  const renderContinentBlock = (continent: { name: string; countries: { slug: string; name: string }[] }) => (
    <div key={continent.name} className={styles.navBlock}>
      <span className={styles.navContinentLabel}>{continent.name}</span>
      <ul className={styles.navCountryList}>
        {continent.countries
          .filter((c) => c.slug !== excludeCountry)
          .map((country) => (
            <li key={country.slug}>
              <Link href={`/country/${country.slug}`} className={styles.navCountryLink}>
                <span className={styles.navFlag}>{getCountryFlag(country.name)}</span>
                {country.name}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  )

  return (
    <section className={styles.regionsCountriesNav}>
      <div className={styles.navInner}>
        <h2 className={styles.navTitle}>Other regions and countries</h2>
        <div className={styles.navColumns}>
          <div className={styles.navColumn}>
            {col1.map(renderRegionBlock)}
          </div>
          <div className={styles.navColumn}>
            {col2.map(renderRegionBlock)}
            {col3.map(renderRegionBlock)}
          </div>
          <div className={styles.navColumn}>
            {otherContinents.map(renderContinentBlock)}
          </div>
        </div>
      </div>
    </section>
  )
}
