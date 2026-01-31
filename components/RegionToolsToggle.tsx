'use client'

import { useState } from 'react'
import type { ProductFromRegion } from '@/lib/regions'
import type { ProductActiveInRegion } from '@/lib/regions'
import { getProductUrl, getProductLogo } from '@/lib/productCatalog'

interface RegionToolsToggleProps {
  productsFromRegion: ProductFromRegion[]
  productsActiveInRegion: ProductActiveInRegion[]
}

function ToolLogo({ name }: { name: string }) {
  const logo = getProductLogo(name)
  const initial = name.charAt(0).toUpperCase()

  if (logo) {
    return (
      <div className="region-tool-icon region-tool-icon-img">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logo}
          alt=""
          width={48}
          height={48}
          onError={(e) => {
            e.currentTarget.style.display = 'none'
            const fallback = e.currentTarget.nextElementSibling
            if (fallback) (fallback as HTMLElement).style.display = 'flex'
          }}
        />
        <span className="region-tool-icon-fallback" style={{ display: 'none' }}>
          {initial}
        </span>
      </div>
    )
  }

  return (
    <div className="region-tool-icon">
      <span>{initial}</span>
    </div>
  )
}

export default function RegionToolsToggle({
  productsFromRegion,
  productsActiveInRegion,
}: RegionToolsToggleProps) {
  const [activeTab, setActiveTab] = useState<'from' | 'active'>('from')

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
              productsFromRegion.map((item, idx) => (
                <a
                  key={idx}
                  href={getProductUrl(item.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="region-tool-card region-tool-card-from"
                >
                  <ToolLogo name={item.name} />
                  <div className="region-tool-card-body">
                    <span className="region-tool-name">{item.name}</span>
                    <span className="region-tool-meta">{item.headquarters}</span>
                  </div>
                  <span className="region-tool-arrow">→</span>
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
            {productsActiveInRegion.map((item, idx) => (
              <a
                key={idx}
                href={getProductUrl(item.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="region-tool-card region-tool-card-active"
              >
                <ToolLogo name={item.name} />
                <div className="region-tool-card-body">
                  <span className="region-tool-name">{item.name}</span>
                  <span className="region-tool-countries">
                    {item.countries.join(', ')}
                  </span>
                </div>
                <span className="region-tool-arrow">→</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
