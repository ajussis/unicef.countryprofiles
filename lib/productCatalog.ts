/** Product metadata for Learning Cabinet tool links and logos */
export interface ProductInfo {
  slug: string
  logo?: string
}

/** Maps product display names to Learning Cabinet tool slug and optional logo URL */
export const productCatalog: Record<string, ProductInfo> = {
  'onecourse': { slug: 'onecourse', logo: 'https://www.onebillion.org/wp-content/uploads/2021/02/onebillion-logo.png' },
  'Angaza Elimu': { slug: 'angaza-elimu', logo: 'https://angazaelimu.com/favicon.ico' },
  'EIDU': { slug: 'eidu', logo: 'https://eidu.com/favicon.ico' },
  'Maths-Whizz': { slug: 'maths-whizz', logo: 'https://www.whizz.com/favicon.ico' },
  'Tangible': { slug: 'tangible', logo: 'https://www.tangible.one/favicon.ico' },
  'BookSmart': { slug: 'booksmart', logo: 'https://www.worldreader.org/favicon.ico' },
  "NABU's multilingual web reader and mobile app": { slug: 'nabus-multilingual-web-reader-and-mobile-app', logo: 'https://www.nabu.org/favicon.ico' },
  'Curious Reader': { slug: 'curious-reader', logo: 'https://www.curiousreader.org/favicon.ico' },
  'Reading Eggs': { slug: 'reading-eggs', logo: 'https://readingeggs.com/favicon.ico' },
  'Micro:bit': { slug: 'microbit', logo: 'https://microbit.org/favicon.ico' },
  'Eduten': { slug: 'eduten', logo: 'https://www.eduten.com/favicon.ico' },
  'Matific': { slug: 'matific', logo: 'https://www.matific.com/favicon.ico' },
  'MathLAB': { slug: 'mathlab' },
  "Amira Reading Suite": { slug: 'amira-reading-suite', logo: 'https://www.amiralearning.com/favicon.ico' },
}

const LC_BASE = 'https://www.learningcabinet.org/tool/'

export function getProductUrl(productName: string): string {
  const info = productCatalog[productName]
  if (info?.slug) {
    return `${LC_BASE}${info.slug}/`
  }
  // Fallback: derive slug from name (lowercase, replace spaces/special chars with hyphens)
  const slug = productName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
  return `${LC_BASE}${slug}/`
}

export function getProductLogo(productName: string): string | undefined {
  return productCatalog[productName]?.logo
}
