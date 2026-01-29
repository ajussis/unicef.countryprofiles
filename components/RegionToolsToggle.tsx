'use client'

import { useState } from 'react'

interface RegionToolsToggleProps {
  productsFromRegion: string[]
  productsActiveInRegion: string[]
}

export default function RegionToolsToggle({
  productsFromRegion,
  productsActiveInRegion,
}: RegionToolsToggleProps) {
  const [activeTab, setActiveTab] = useState<'from' | 'active'>('from')

  const baseUrl = 'https://www.learningcabinet.org/search/edtech-tools/?search='

  return (
    <div className="region-tools-toggle">
      <div className="region-tools-tabs">
        <button
          type="button"
          className={`region-tools-tab ${activeTab === 'from' ? 'active' : ''}`}
          onClick={() => setActiveTab('from')}
        >
          From this region
        </button>
        <button
          type="button"
          className={`region-tools-tab ${activeTab === 'active' ? 'active' : ''}`}
          onClick={() => setActiveTab('active')}
        >
          Active in this region
        </button>
      </div>
      {activeTab === 'from' && (
        <div className="region-tools-content">
          <p className="region-tools-desc">
            EdTech products headquartered or originating from this region.
          </p>
          <div className="region-tool-cards">
            {productsFromRegion.length > 0 ? (
              productsFromRegion.map((name, idx) => (
                <a
                  key={idx}
                  href={`${baseUrl}${encodeURIComponent(name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="region-tool-card"
                >
                  <span className="region-tool-name">{name}</span>
                  <span className="region-tool-badge from">From region</span>
                </a>
              ))
            ) : (
              <p className="region-tools-empty">No products from this region listed yet.</p>
            )}
          </div>
        </div>
      )}
      {activeTab === 'active' && (
        <div className="region-tools-content">
          <p className="region-tools-desc">
            EdTech products with major operations or a majority of active users in this region.
          </p>
          <div className="region-tool-cards">
            {productsActiveInRegion.map((name, idx) => (
              <a
                key={idx}
                href={`${baseUrl}${encodeURIComponent(name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="region-tool-card"
              >
                <span className="region-tool-name">{name}</span>
                <span className="region-tool-badge active">Active here</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
