'use client'

import { useState } from 'react'
import type {
  RegionOverviewContent,
  RegionalDecisionSnapshot,
  SectionWithInsight,
  EdTechMarketSection,
} from '@/lib/regions'
import styles from './RegionOverview.module.css'

function ToggleSection({
  id,
  title,
  children,
  defaultOpen = false,
}: {
  id: string
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className={styles.toggleSection}>
      <button
        type="button"
        className={styles.toggleHeader}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={id}
      >
        <span className={styles.toggleTitle}>{title}</span>
        <span className={styles.toggleIcon} aria-hidden>
          {open ? '−' : '+'}
        </span>
      </button>
      {open && (
        <div id={id} className={styles.toggleContent}>
          {children}
        </div>
      )}
    </div>
  )
}

function DecisionSnapshotBlock({ snapshot }: { snapshot: RegionalDecisionSnapshot }) {
  return (
    <div className={styles.decisionSnapshot}>
      <dl className={styles.snapshotList}>
        <dt>Delivery channel</dt>
        <dd>{snapshot.deliveryChannel}</dd>
        <dt>System readiness</dt>
        <dd>{snapshot.systemReadiness}</dd>
        <dt>Connectivity constraint</dt>
        <dd>{snapshot.connectivityConstraint}</dd>
        <dt>Funding climate</dt>
        <dd>{snapshot.fundingClimate}</dd>
        <dt>Market maturity</dt>
        <dd>{snapshot.marketMaturity}</dd>
      </dl>
      <div className={styles.primaryRisk}>
        <span className={styles.riskIcon}>⚠️</span>
        <strong>Primary deployment risk:</strong> {snapshot.primaryRisk}
      </div>
      <div className={styles.useCases}>
        <strong>🚀 Highest-potential use cases:</strong>
        <ul>
          {snapshot.useCases.map((uc, i) => (
            <li key={i}>{uc}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function SectionWithInsightBlock({ section }: { section: SectionWithInsight }) {
  return (
    <div className={styles.sectionWithInsight}>
      <p className={styles.sectionContent}>{section.content}</p>
      <div className={styles.whatThisMeans}>
        <strong>✅ What this means:</strong>
        <p>{section.whatThisMeans}</p>
      </div>
    </div>
  )
}

function EdTechMarketBlock({ section }: { section: EdTechMarketSection }) {
  return (
    <div className={styles.sectionWithInsight}>
      <p className={styles.sectionContent}>{section.content}</p>
      <dl className={styles.marketMeta}>
        <dt>Market maturity</dt>
        <dd>{section.maturity}</dd>
        <dt>Government leadership</dt>
        <dd>{section.governmentLeadership}</dd>
        <dt>Procurement behavior</dt>
        <dd>{section.procurementBehavior}</dd>
      </dl>
      <div className={styles.whatThisMeans}>
        <strong>✅ What this means:</strong>
        <p>{section.whatThisMeans}</p>
      </div>
    </div>
  )
}

export default function RegionOverview({ overview }: { overview: RegionOverviewContent }) {
  return (
    <div className={styles.root}>
      <h2 className={styles.mainTitle}>Regional Overview</h2>

      <ToggleSection id="decision-snapshot" title="Regional Decision Snapshot" defaultOpen>
        <DecisionSnapshotBlock snapshot={overview.decisionSnapshot} />
      </ToggleSection>

      <ToggleSection id="executive-context" title="Executive Context" defaultOpen>
        <p className={styles.sectionContent}>{overview.executiveContext}</p>
      </ToggleSection>

      <ToggleSection id="education-systems" title="Education Systems">
        <SectionWithInsightBlock section={overview.educationSystems} />
      </ToggleSection>

      <ToggleSection id="technology-environment" title="Technology Environment">
        <SectionWithInsightBlock section={overview.technologyEnvironment} />
      </ToggleSection>

      <ToggleSection id="internet-connectivity" title="Internet Connectivity">
        <SectionWithInsightBlock section={overview.internetConnectivity} />
      </ToggleSection>

      <ToggleSection id="edtech-market" title="EdTech Market Landscape">
        <EdTechMarketBlock section={overview.edtechMarketLandscape} />
      </ToggleSection>

      <ToggleSection id="recommended" title="Recommended EdTech Characteristics for This Region">
        <ul className={styles.recommendedList}>
          {overview.recommendedCharacteristics.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </ToggleSection>

      <ToggleSection id="risks" title="Regional Deployment Risks">
        <ul className={styles.risksList}>
          {overview.deploymentRisks.map((item, i) => (
            <li key={i}>
              <span className={styles.riskBullet}>⚠️</span> {item}
            </li>
          ))}
        </ul>
      </ToggleSection>
    </div>
  )
}
