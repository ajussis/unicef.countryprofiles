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
  'Botswana': '🇧🇼',
  'Brazil': '🇧🇷',
  'Burkina Faso': '🇧🇫',
  'Cameroon': '🇨🇲',
  'Central African Republic': '🇨🇫',
  'Chad': '🇹🇩',
  'Democratic Republic of the Congo': '🇨🇩',
  'Egypt': '🇪🇬',
  'Ethiopia': '🇪🇹',
  'Gabon': '🇬🇦',
  'Ghana': '🇬🇭',
  'Guinea': '🇬🇳',
  'India': '🇮🇳',
  'Ivory Coast': '🇨🇮',
  'Kenya': '🇰🇪',
  'Kyrgyzstan': '🇰🇬',
  'Libya': '🇱🇾',
  'Malawi': '🇲🇼',
  'Mali': '🇲🇱',
  'Malaysia': '🇲🇾',
  'Morocco': '🇲🇦',
  'Mozambique': '🇲🇿',
  'Namibia': '🇳🇦',
  'Niger': '🇳🇪',
  'Nigeria': '🇳🇬',
  'Philippines': '🇵🇭',
  'Rwanda': '🇷🇼',
  'Senegal': '🇸🇳',
  'Somalia': '🇸🇴',
  'South Africa': '🇿🇦',
  'Sudan': '🇸🇩',
  'Tanzania': '🇹🇿',
  'Tunisia': '🇹🇳',
  'Uganda': '🇺🇬',
  'Uzbekistan': '🇺🇿',
  'Western Sahara': '🇪🇭',
  'Zambia': '🇿🇲',
  'Zimbabwe': '🇿🇼',
}

// Map of country names to regions — Five Regions of Africa
const countryRegions: Record<string, string> = {
  'Algeria': 'North Africa',
  'Benin': 'West Africa',
  'Bolivia': 'Latin America',
  'Botswana': 'Southern Africa',
  'Brazil': 'Latin America',
  'Burkina Faso': 'West Africa',
  'Cameroon': 'Central Africa',
  'Central African Republic': 'Central Africa',
  'Chad': 'Central Africa',
  'Democratic Republic of the Congo': 'Central Africa',
  'Egypt': 'North Africa',
  'Ethiopia': 'East Africa',
  'Gabon': 'Central Africa',
  'Ghana': 'West Africa',
  'Guinea': 'West Africa',
  'India': 'South Asia',
  'Ivory Coast': 'West Africa',
  'Kenya': 'East Africa',
  'Kyrgyzstan': 'Central Asia',
  'Libya': 'North Africa',
  'Malawi': 'Southern Africa',
  'Mali': 'West Africa',
  'Malaysia': 'East Asia & Pacific',
  'Morocco': 'North Africa',
  'Mozambique': 'Southern Africa',
  'Namibia': 'Southern Africa',
  'Niger': 'West Africa',
  'Nigeria': 'West Africa',
  'Philippines': 'East Asia & Pacific',
  'Rwanda': 'East Africa',
  'Senegal': 'West Africa',
  'Somalia': 'East Africa',
  'South Africa': 'Southern Africa',
  'Sudan': 'North Africa',
  'Tanzania': 'East Africa',
  'Tunisia': 'North Africa',
  'Uganda': 'East Africa',
  'Uzbekistan': 'Central Asia',
  'Western Sahara': 'North Africa',
  'Zambia': 'Southern Africa',
  'Zimbabwe': 'Southern Africa',
}

// Map regions to continents
const regionToContinentMap: Record<string, string> = {
  'North Africa': 'Africa',
  'West Africa': 'Africa',
  'Central Africa': 'Africa',
  'East Africa': 'Africa',
  'Southern Africa': 'Africa',
  'Latin America': 'Americas',
  'South Asia': 'Asia',
  'Central Asia': 'Asia',
  'East Asia & Pacific': 'Asia & Pacific',
}

// Continent display order
export const continentOrder = ['Africa', 'Americas', 'Asia', 'Asia & Pacific', 'Europe']

// Africa region display order (Five Regions of Africa)
export const africaRegionOrder = [
  'North Africa',
  'West Africa',
  'Central Africa',
  'East Africa',
  'Southern Africa',
]

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
