'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { countryMapData } from '@/lib/countryMapData'
import styles from './CountryMap.module.css'

// Dynamic import for Leaflet to avoid SSR issues
export default function CountryMap() {
  const [MapComponent, setMapComponent] = useState<React.ComponentType | null>(null)

  useEffect(() => {
    // Dynamically import Leaflet components only on client side
    const loadMap = async () => {
      const L = await import('leaflet')
      const { MapContainer, TileLayer, Marker, Popup } = await import('react-leaflet')
      
      // Fix for default marker icons in Leaflet with webpack
      delete (L.Icon.Default.prototype as { _getIconUrl?: unknown })._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      })

      // Create the map component
      const Map = () => (
        <MapContainer
          center={[20, 30]}
          zoom={2}
          scrollWheelZoom={false}
          className={styles.map}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {countryMapData.map((country) => (
            <Marker key={country.slug} position={country.coordinates}>
              <Popup className={styles.popup}>
                <div className={styles.popupContent}>
                  <h3 className={styles.popupTitle}>{country.name}</h3>
                  <Link href={`/country/${country.slug}`} className={styles.profileLink}>
                    View Country Profile →
                  </Link>
                  {country.products.length > 0 && (
                    <div className={styles.products}>
                      <span className={styles.productsLabel}>EdTech Products Active:</span>
                      <ul className={styles.productList}>
                        {country.products.slice(0, 5).map((product, idx) => (
                          <li key={idx}>
                            <a 
                              href={`https://www.learningcabinet.org/search/edtech-tools/?search=${encodeURIComponent(product)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={styles.productLink}
                            >
                              {product}
                            </a>
                          </li>
                        ))}
                        {country.products.length > 5 && (
                          <li className={styles.moreProducts}>
                            +{country.products.length - 5} more
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )

      setMapComponent(() => Map)
    }

    loadMap()
  }, [])

  if (!MapComponent) {
    return (
      <div className={styles.mapContainer}>
        <div className={styles.mapPlaceholder}>
          <span>Loading map...</span>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.mapContainer}>
      <h2 className={styles.mapTitle}>Explore Countries</h2>
      <p className={styles.mapSubtitle}>Click on a marker to view country profile and active EdTech products</p>
      <MapComponent />
    </div>
  )
}
