import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const countriesDirectory = path.join(process.cwd(), 'content/countries')

export interface Country {
  slug: string
  name: string
  title: string
  description: string
  content: string
}

// Map of country names to emoji flags
const countryFlags: Record<string, string> = {
  'Algeria': '🇩🇿',
  'Benin': '🇧🇯',
  'Bolivia': '🇧🇴',
  'Brazil': '🇧🇷',
  'Cameroon': '🇨🇲',
  'Chad': '🇹🇩',
  'Egypt': '🇪🇬',
  'Ghana': '🇬🇭',
  'Guinea': '🇬🇳',
  'India': '🇮🇳',
  'Ivory Coast': '🇨🇮',
  'Kenya': '🇰🇪',
  'Kyrgyzstan': '🇰🇬',
  'Libya': '🇱🇾',
  'Malawi': '🇲🇼',
  'Malaysia': '🇲🇾',
  'Morocco': '🇲🇦',
  'Mozambique': '🇲🇿',
  'Namibia': '🇳🇦',
  'Nigeria': '🇳🇬',
  'Philippines': '🇵🇭',
  'Senegal': '🇸🇳',
  'South Africa': '🇿🇦',
  'Tanzania': '🇹🇿',
  'Tunisia': '🇹🇳',
  'Uganda': '🇺🇬',
  'Uzbekistan': '🇺🇿',
  'Zambia': '🇿🇲',
  'Zimbabwe': '🇿🇼',
}

// Map of country names to regions for categorization
const countryRegions: Record<string, string> = {
  'Algeria': 'North Africa',
  'Benin': 'West & Central Africa',
  'Bolivia': 'Latin America',
  'Brazil': 'Latin America',
  'Cameroon': 'West & Central Africa',
  'Chad': 'West & Central Africa',
  'Egypt': 'North Africa',
  'Ghana': 'West & Central Africa',
  'Guinea': 'West & Central Africa',
  'India': 'South Asia',
  'Ivory Coast': 'West & Central Africa',
  'Kenya': 'East & Southern Africa',
  'Kyrgyzstan': 'Central Asia',
  'Libya': 'North Africa',
  'Malawi': 'East & Southern Africa',
  'Malaysia': 'East Asia & Pacific',
  'Morocco': 'North Africa',
  'Mozambique': 'East & Southern Africa',
  'Namibia': 'East & Southern Africa',
  'Nigeria': 'West & Central Africa',
  'Philippines': 'East Asia & Pacific',
  'Senegal': 'West & Central Africa',
  'South Africa': 'East & Southern Africa',
  'Tanzania': 'East & Southern Africa',
  'Tunisia': 'North Africa',
  'Uganda': 'East & Southern Africa',
  'Uzbekistan': 'Central Asia',
  'Zambia': 'East & Southern Africa',
  'Zimbabwe': 'East & Southern Africa',
}

// Map regions to continents
const regionToContinentMap: Record<string, string> = {
  'West & Central Africa': 'Africa',
  'East & Southern Africa': 'Africa',
  'North Africa': 'Africa',
  'Latin America': 'Americas',
  'South Asia': 'Asia',
  'Central Asia': 'Asia',
  'East Asia & Pacific': 'Asia & Pacific',
}

// Continent display order
export const continentOrder = ['Africa', 'Americas', 'Asia', 'Asia & Pacific', 'Europe']

export function getCountryFlag(name: string): string {
  return countryFlags[name] || '🌍'
}

export function getCountryRegion(name: string): string {
  return countryRegions[name] || 'Global'
}

export function getCountryContinent(name: string): string {
  const region = countryRegions[name]
  return regionToContinentMap[region] || 'Other'
}

function extractTitleAndDescription(content: string): { title: string; description: string } {
  // Extract title from first line (# Country — Title)
  const titleMatch = content.match(/^#\s+(.+)$/m)
  const title = titleMatch ? titleMatch[1] : ''

  // Extract description from second non-empty line
  const lines = content.split('\n').filter(line => line.trim())
  const description = lines.length > 1 ? lines[1].trim() : ''

  return { title, description }
}

export function getAllCountries(): Country[] {
  // Ensure directory exists
  if (!fs.existsSync(countriesDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(countriesDirectory)

  const countries = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '').toLowerCase()
      const name = fileName.replace(/\.md$/, '')
      const fullPath = path.join(countriesDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')

      const { content } = matter(fileContents)
      const { title, description } = extractTitleAndDescription(content)

      return {
        slug,
        name,
        title,
        description,
        content,
      }
    })
    .sort((a, b) => a.name.localeCompare(b.name))

  return countries
}

export function getCountryBySlug(slug: string): Country | null {
  const countries = getAllCountries()
  return countries.find(country => country.slug === slug) || null
}

export function getAllCountrySlugs(): string[] {
  const countries = getAllCountries()
  return countries.map(country => country.slug)
}
