'use client'

import { useState } from 'react'
import Link from 'next/link'
import { getCountryFlag, africaRegionOrder } from '@/lib/countryFlags'
import { getRegionSlugForRegionName } from '@/lib/regions'
import styles from './CountriesSection.module.css'

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

interface CountriesSectionProps {
  countriesByContinent: ContinentData
  sortedContinents: string[]
}

export default function CountriesSection({
  countriesByContinent,
  sortedContinents,
}: CountriesSectionProps) {

  // Continent expansion: default expanded so region headers are visible
  const [expandedContinents, setExpandedContinents] = useState<Set<string>>(() => new Set(sortedContinents))

  // Region expansion: default collapsed
  const [expandedRegions, setExpandedRegions] = useState<Set<string>>(() => new Set())

  const toggleContinent = (continent: string) => {
    setExpandedContinents((prev) => {
      const next = new Set(prev)
      if (next.has(continent)) next.delete(continent)
      else next.add(continent)
      return next
    })
  }

  const regionKey = (continent: string, region: string) => `${continent}|${region}`

  const toggleRegion = (continent: string, region: string) => {
    const key = regionKey(continent, region)
    setExpandedRegions((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  return (
    <section className={styles.countriesSection}>
      <div className={styles.container}>
        {sortedContinents.map((continent) => {
          const regions = countriesByContinent[continent]
          const sortedRegions =
            continent === 'Africa'
              ? africaRegionOrder.filter((r) => regions[r])
              : Object.keys(regions).sort()
          const continentCountryCount = Object.values(regions).flat().length
          const isContinentExpanded = expandedContinents.has(continent)

          return (
            <div key={continent} className={styles.continentGroup}>
              <button
                type="button"
                className={styles.continentTitle}
                onClick={() => toggleContinent(continent)}
                aria-expanded={isContinentExpanded}
              >
                <span className={styles.continentTitleText}>{continent}</span>
                <span className={styles.continentCount}>
                  {continentCountryCount} {continentCountryCount === 1 ? 'country' : 'countries'}
                </span>
                <span className={styles.toggleIcon} aria-hidden>
                  {isContinentExpanded ? '−' : '+'}
                </span>
              </button>

              {isContinentExpanded &&
                sortedRegions.map((regionName) => {
                  const regionSlug = getRegionSlugForRegionName(regionName)
                  const key = regionKey(continent, regionName)
                  const isRegionExpanded = expandedRegions.has(key)

                  return (
                    <div key={regionName} className={styles.regionGroup}>
                      <button
                        type="button"
                        className={styles.regionTitle}
                        onClick={() => toggleRegion(continent, regionName)}
                        aria-expanded={isRegionExpanded}
                      >
                        <span className={styles.regionIcon}>●</span>
                        <span className={styles.regionTitleText}>{regionName}</span>
                        <span className={styles.regionCount}>
                          {regions[regionName].length} {regions[regionName].length === 1 ? 'country' : 'countries'}
                        </span>
                        <span className={styles.toggleIcon} aria-hidden>
                          {isRegionExpanded ? '−' : '+'}
                        </span>
                      </button>

                      {isRegionExpanded && (
                        <div className={styles.regionContent}>
                          {regionSlug && (
                            <Link href={`/region/${regionSlug}`} className={styles.regionCta}>
                              <div className={styles.regionCtaContent}>
                                <span className={styles.regionCtaTitle}>Regional EdTech Profile</span>
                                <span className={styles.regionCtaDesc}>
                                  Explore {regionName} • {regions[regionName].length}{' '}
                                  {regions[regionName].length === 1 ? 'country' : 'countries'}
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
                              >
                                <div className={styles.cardFlag}>{getCountryFlag(country.name)}</div>
                                <div className={styles.cardContent}>
                                  <h3 className={styles.cardTitle}>{country.name}</h3>
                                  <p className={styles.cardDescription}>
                                    EdTech Suitability & Compliance Profile
                                  </p>
                                </div>
                                <div className={styles.cardArrow}>
                                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path
                                      d="M4 10H16M16 10L11 5M16 10L11 15"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
            </div>
          )
        })}
      </div>
    </section>
  )
}
