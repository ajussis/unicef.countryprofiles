/** Client-safe: country name to emoji flag. No Node.js dependencies. */
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

export function getCountryFlag(name: string): string {
  return countryFlags[name] || '🌍'
}

/** Africa region display order (client-safe) */
export const africaRegionOrder = [
  'North Africa',
  'West Africa',
  'Central Africa',
  'East Africa',
  'Southern Africa',
]
