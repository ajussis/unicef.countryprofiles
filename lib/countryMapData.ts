export interface CountryMapData {
  name: string
  slug: string
  coordinates: [number, number] // [lat, lng]
  products: string[]
}

export const countryMapData: CountryMapData[] = [
  {
    name: 'Benin',
    slug: 'benin',
    coordinates: [9.3077, 2.3158],
    products: []
  },
  {
    name: 'Bolivia',
    slug: 'bolivia',
    coordinates: [-16.2902, -63.5887],
    products: ['Afini']
  },
  {
    name: 'Brazil',
    slug: 'brazil',
    coordinates: [-14.2350, -51.9253],
    products: ['PhET Interactive Simulations', 'Escribo', 'Árvore', 'Micro:bit', 'Eduten', 'Grapho Game', 'Matific', 'MathLAB', 'TeachersPRO', 'Curious Reader']
  },
  {
    name: 'Chad',
    slug: 'chad',
    coordinates: [15.4542, 18.7322],
    products: []
  },
  {
    name: 'Egypt',
    slug: 'egypt',
    coordinates: [26.8206, 30.8025],
    products: []
  },
  {
    name: 'Ghana',
    slug: 'ghana',
    coordinates: [7.9465, -1.0232],
    products: ['Tangible', 'Curious Reader']
  },
  {
    name: 'Guinea',
    slug: 'guinea',
    coordinates: [9.9456, -9.6966],
    products: []
  },
  {
    name: 'India',
    slug: 'india',
    coordinates: [20.5937, 78.9629],
    products: ['PhET Interactive Simulations', 'Building Blocks', 'ThingLink', 'Class Saathi', 'Mindspark', 'Curious Reader']
  },
  {
    name: 'Kenya',
    slug: 'kenya',
    coordinates: [-0.0236, 37.9062],
    products: ['onecourse', 'Maths-Whizz', 'Tangible', 'BookSmart', 'EIDU', 'NABU\'s multilingual web reader', 'Angaza Elimu']
  },
  {
    name: 'Kyrgyzstan',
    slug: 'kyrgyzstan',
    coordinates: [41.2044, 74.7661],
    products: []
  },
  {
    name: 'Malaysia',
    slug: 'malaysia',
    coordinates: [4.2105, 101.9758],
    products: ['Enuma']
  },
  {
    name: 'Namibia',
    slug: 'namibia',
    coordinates: [-22.9576, 18.4904],
    products: []
  },
  {
    name: 'Philippines',
    slug: 'philippines',
    coordinates: [12.8797, 121.7740],
    products: ['NABU\'s multilingual web reader']
  },
  {
    name: 'Uzbekistan',
    slug: 'uzbekistan',
    coordinates: [41.3775, 64.5853],
    products: []
  },
  {
    name: 'Zimbabwe',
    slug: 'zimbabwe',
    coordinates: [-19.0154, 29.1549],
    products: ['MathLAB', 'Curious Reader']
  }
]
