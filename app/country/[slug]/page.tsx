import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllCountrySlugs, getCountryBySlug, getCountryFlag, getCountryRegion } from '@/lib/countries'
import MarkdownContent from '@/components/MarkdownContent'
import styles from './page.module.css'

export async function generateStaticParams() {
  const slugs = getAllCountrySlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const country = getCountryBySlug(params.slug)
  
  if (!country) {
    return {
      title: 'Country Not Found',
    }
  }
  
  return {
    title: `${country.name} - EdTech Profile | UNICEF Country Profiles`,
    description: `EdTech suitability and compliance profile for ${country.name}. ${country.description}`,
  }
}

export default function CountryPage({ params }: { params: { slug: string } }) {
  const country = getCountryBySlug(params.slug)
  
  if (!country) {
    notFound()
  }
  
  const flag = getCountryFlag(country.name)
  const region = getCountryRegion(country.name)
  
  return (
    <main className={styles.main}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerBackground}>
          <div className={styles.headerPattern}></div>
        </div>
        <div className={styles.headerContent}>
          <Link href="/" className={styles.backLink}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M16 10H4M4 10L9 5M4 10L9 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>All Countries</span>
          </Link>
          
          <div className={styles.heroInfo}>
            <span className={styles.flag}>{flag}</span>
            <div className={styles.heroText}>
              <span className={styles.region}>{region}</span>
              <h1 className={styles.title}>{country.name}</h1>
              <p className={styles.subtitle}>EdTech Suitability & Compliance Profile</p>
            </div>
          </div>
          
          <div className={styles.quickNav}>
            <span className={styles.quickNavLabel}>Jump to:</span>
            <a href="#education-system" className={styles.quickNavLink}>Education System</a>
            <a href="#edtech-landscape" className={styles.quickNavLink}>EdTech Landscape</a>
            <a href="#data-governance" className={styles.quickNavLink}>Data Governance</a>
            <a href="#vendor-checklist" className={styles.quickNavLink}>Vendor Checklist</a>
          </div>
        </div>
      </header>

      {/* Content */}
      <article className={styles.article}>
        <div className={styles.container}>
          <div className={styles.content}>
            <MarkdownContent content={country.content} />
          </div>
          
          {/* Sidebar */}
          <aside className={styles.sidebar}>
            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarTitle}>Profile Summary</h3>
              <ul className={styles.sidebarList}>
                <li>
                  <span className={styles.sidebarLabel}>Country</span>
                  <span className={styles.sidebarValue}>{country.name}</span>
                </li>
                <li>
                  <span className={styles.sidebarLabel}>Region</span>
                  <span className={styles.sidebarValue}>{region}</span>
                </li>
                <li>
                  <span className={styles.sidebarLabel}>Edition</span>
                  <span className={styles.sidebarValue}>2024</span>
                </li>
              </ul>
            </div>
            
            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarTitle}>Key Sections</h3>
              <nav className={styles.tocNav}>
                <a href="#1-education-system-overview-context-setting">1. Education System</a>
                <a href="#2-edtech-implementation-landscape-current-state">2. EdTech Landscape</a>
                <a href="#3-core-pedagogy">3. Core Pedagogy</a>
                <a href="#4-focus-skills">4. Focus Skills</a>
                <a href="#5-content--curriculum-alignment">5. Curriculum Alignment</a>
                <a href="#6-teacher-professional-development">6. Teacher PD</a>
                <a href="#7-assessment-approach">7. Assessment</a>
                <a href="#8-data-governance--privacy">8. Data Governance</a>
                <a href="#9-technical-interoperability">9. Interoperability</a>
                <a href="#10-cybersecurity--child-online-safety">10. Cybersecurity</a>
                <a href="#11-delivery-constraints--design-preferences">11. Delivery Constraints</a>
                <a href="#12-notes--gaps">12. Notes & Gaps</a>
                <a href="#13-vendor-checklist-compact-extractable">13. Vendor Checklist</a>
              </nav>
            </div>
          </aside>
        </div>
      </article>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <Link href="/" className={styles.footerBack}>
            ← Back to All Countries
          </Link>
          <p className={styles.footerCopyright}>
            2024 Edition • Built for The Learning Cabinet
          </p>
        </div>
      </footer>
    </main>
  )
}
