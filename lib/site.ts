import type { ImageKey } from './image-data'

export const site = {
  name: 'Pure Water Solutions',
  url: 'https://purewatersol.in',
  title: 'Pure Water Solutions | RO Repair & Water Purifier Service in Wakad, Pune',
  description:
    'Pure Water Solutions provides RO repair, water purifier servicing, filter replacement, installation and maintenance in Wakad, Pimpri-Chinchwad, Pune. Contact us for service enquiries.',
  shortDescription:
    'RO repair, water purifier maintenance, filter replacement and installation services in Wakad, Pimpri-Chinchwad and nearby areas of Pune.',
  phoneDisplay: '+91 93592 71864',
  phoneTel: '+919359271864',
  whatsappNumber: '919359271864',
  email: 'purewatersol88@gmail.com',
  privacyUrl: 'https://purewatersol.in/privacy-policy.html',
  address: {
    street: 'Flat No. 101, Siddhivinayak Apartment, Venu Nagar Cotes, Wakad',
    locality: 'Pimpri-Chinchwad',
    region: 'Maharashtra',
    postalCode: '411057',
    country: 'India',
    countryCode: 'IN',
  },
  serviceAreas: ['Wakad', 'Pimpri-Chinchwad', 'Pune', 'Maharashtra'],
} as const

export const fullAddress = `${site.address.street}, ${site.address.locality}, ${site.address.region} ${site.address.postalCode}, ${site.address.country}`

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`
}

export const whatsappMessages = {
  book: 'Hello, I would like to book an RO service. Please share the details.',
  general: 'Hello, I would like to know more about your RO and water purifier services.',
  service: (title: string) =>
    `Hello, I would like to enquire about your "${title}" service. Please share the details.`,
  product: (name: string) =>
    `Hello, I am interested in the ${name} water purifier. Please share the price and details.`,
}

const mapsQuery = encodeURIComponent(`${site.name}, ${fullAddress}`)
export const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(fullAddress)}`
export const mapsEmbedUrl = `https://www.google.com/maps?q=${mapsQuery}&z=15&output=embed`

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About Us' },
  { id: 'services', label: 'Services' },
  { id: 'products', label: 'Products' },
  { id: 'contact', label: 'Contact' },
] as const

export type Service = { slug: string; title: string; image: ImageKey; alt: string }

export const services: Service[] = [
  {
    slug: 'repair-check-up',
    title: 'Repair Check-up',
    image: 'service:repair-checkup',
    alt: 'Pure Water Solutions technician inspecting an open wall-mounted RO water purifier during a repair check-up',
  },
  {
    slug: 'filter-check-up',
    title: 'Filter Check-up',
    image: 'service:filter-checkup',
    alt: 'Pure Water Solutions technician examining a used RO sediment filter cartridge',
  },
  {
    slug: 'complete-filter-replacement',
    title: 'Complete Filter Replacement',
    image: 'service:filter-replacement',
    alt: 'Set of new RO replacement filters, membrane and tubing on a kitchen counter',
  },
  {
    slug: 'wall-mounted-ro-installation',
    title: 'Wall-Mounted RO Installation',
    image: 'service:wall-mounted-installation',
    alt: 'Pure Water Solutions technician mounting a new RO water purifier on a kitchen wall',
  },
  {
    slug: 'under-the-counter-ro-installation',
    title: 'Under-the-Counter RO Installation',
    image: 'service:under-counter-installation',
    alt: 'Pure Water Solutions technician installing an under-the-counter RO system below a kitchen sink',
  },
  {
    slug: 'ro-uninstallation',
    title: 'RO Uninstallation',
    image: 'service:ro-uninstallation',
    alt: 'Pure Water Solutions technician disconnecting the tubes of a wall-mounted RO purifier for uninstallation',
  },
]

export const enquiryServiceOptions = [...services.map((service) => service.title), 'New Water Purifier', 'Other']

export type ProductImage = { key: ImageKey; alt: string }
export type Product = { name: string; brand: string; variant?: string; images: ProductImage[] }
export type ProductGroup = { title?: string; products: Product[] }
export type BrandCategory = { id: string; label: string; heading: string; groups: ProductGroup[] }

export const brandCategories: BrandCategory[] = [
  {
    id: 'era',
    label: 'Era',
    heading: 'Aqua ERA',
    groups: [
      {
        products: [
          {
            name: 'Aqua ERA Elite Series',
            brand: 'Aqua ERA',
            variant: 'Blue',
            images: [{ key: 'product:aqua-era-elite', alt: 'Aqua ERA Elite Series water purifier in blue' }],
          },
          {
            name: 'Aqua ERA Core Series',
            brand: 'Aqua ERA',
            variant: 'Black',
            images: [{ key: 'product:aqua-era-core', alt: 'Aqua ERA Core Series water purifier in black' }],
          },
        ],
      },
    ],
  },
  {
    id: 'lx-one-lexzon',
    label: 'LX One & Lexzon',
    heading: 'LX One & Lexzon',
    groups: [
      {
        title: 'LX One',
        products: [
          {
            name: 'LX One Titanium Series',
            brand: 'LX One',
            variant: 'Grey',
            images: [{ key: 'product:lx-one-titanium-grey', alt: 'LX One Titanium Series water purifier cabinet in grey' }],
          },
          {
            name: 'LX One Titanium Series',
            brand: 'LX One',
            variant: 'Sapphire Silver',
            images: [
              {
                key: 'product:lx-one-titanium-silver',
                alt: 'LX One Titanium Series water purifier cabinet in Sapphire Silver',
              },
            ],
          },
          {
            name: 'LX One Titanium Series',
            brand: 'LX One',
            variant: 'Beige',
            images: [{ key: 'product:lx-one-titanium-gold', alt: 'LX One Titanium Series water purifier cabinet in beige' }],
          },
        ],
      },
      {
        title: 'Lexzon',
        products: [
          {
            name: 'Lexzon Compact Cabinet',
            brand: 'Lexzon by Lexcru',
            variant: 'Aqua Green',
            images: [{ key: 'product:lexzon-aqua-green', alt: 'Lexzon compact water purifier cabinet by Lexcru in Aqua Green' }],
          },
        ],
      },
    ],
  },
  {
    id: 'pureit',
    label: 'Pureit',
    heading: 'Pureit',
    groups: [
      {
        products: [
          {
            name: 'Pureit Copper Eco',
            brand: 'Pureit',
            images: [{ key: 'product:pureit-copper-eco', alt: 'Pureit Copper Eco water purifier in black and copper' }],
          },
          {
            name: 'Pureit Revito',
            brand: 'Pureit',
            images: [{ key: 'product:pureit-revito', alt: 'Pureit Revito water purifier in teal blue' }],
          },
          {
            name: 'Pureit Eco Water Saver',
            brand: 'Pureit',
            images: [
              {
                key: 'product:pureit-eco-water-saver',
                alt: 'Pureit Eco Water Saver purifier dispensing water into a glass',
              },
              {
                key: 'product:pureit-eco-water-saver-smartsense',
                alt: 'Pureit Eco Water Saver purifier with SmartSense indicators',
              },
            ],
          },
          {
            name: 'Pureit Classic',
            brand: 'Pureit',
            variant: 'RO + MF',
            images: [{ key: 'product:pureit-classic-ro-mf', alt: 'Pureit Classic RO + MF water purifier in white and blue' }],
          },
          {
            name: 'Pureit Classic',
            brand: 'Pureit',
            variant: 'RO + UV',
            images: [{ key: 'product:pureit-classic-ro-uv', alt: 'Pureit Classic RO + UV water purifier in white' }],
          },
        ],
      },
    ],
  },
  {
    id: 'native',
    label: 'Native',
    heading: 'Native',
    groups: [
      {
        products: [
          {
            name: 'Native Water Purifier',
            brand: 'Native',
            images: [{ key: 'product:native', alt: 'Native wall-mounted water purifier dispensing water into a glass' }],
          },
        ],
      },
    ],
  },
  {
    id: 'ao-smith',
    label: 'AO Smith',
    heading: 'AO Smith',
    groups: [
      {
        products: [
          {
            name: 'AO Smith Z8',
            brand: 'AO Smith',
            images: [{ key: 'product:ao-smith-z8', alt: 'AO Smith Z8 water purifier' }],
          },
          {
            name: 'AO Smith X2',
            brand: 'AO Smith',
            images: [{ key: 'product:ao-smith-x2', alt: 'AO Smith X2 water purifier in white and black' }],
          },
          {
            name: 'AO Smith Water Purifier',
            brand: 'AO Smith',
            variant: 'Black',
            images: [{ key: 'product:ao-smith-hot-black', alt: 'AO Smith water purifier in black with two dispensing taps' }],
          },
        ],
      },
    ],
  },
]

export const servicedBrands = ['Pureit', 'AO Smith', 'Aqua ERA', 'LX One', 'Lexzon', 'Native', 'Kent', 'Aquaguard']
