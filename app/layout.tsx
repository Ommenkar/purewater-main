import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Outfit } from 'next/font/google'

import { fullAddress, services, site } from '@/lib/site'

import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    'RO Repair in Wakad',
    'RO Service in Wakad',
    'Water Purifier Repair in Wakad',
    'RO Installation in Wakad',
    'RO Filter Replacement in Wakad',
    'Water Purifier Service in Pimpri-Chinchwad',
    'RO Repair in Pimpri-Chinchwad',
    'Water Purifier Maintenance in Pune',
    'Kent RO Service',
    'Aquaguard RO Service',
    'Pureit Water Purifier Service',
    'RO Repair Near Me',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: '/',
    siteName: site.name,
    title: site.title,
    description: site.description,
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: `${site.name} – RO repair and water purifier service in Wakad, Pune` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: site.title,
    description: site.description,
    images: ['/og-image.jpg'],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: '/icon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon.png', sizes: '256x256', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
  },
  category: 'Home Services',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light',
  themeColor: '#ffffff',
}

const areaServed = site.serviceAreas.map((name) => ({ '@type': 'Place', name }))

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      '@id': `${site.url}/#business`,
      name: site.name,
      url: site.url,
      description: site.description,
      image: `${site.url}/og-image.jpg`,
      logo: `${site.url}/icon.png`,
      telephone: site.phoneTel,
      email: site.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: site.address.street,
        addressLocality: site.address.locality,
        addressRegion: site.address.region,
        postalCode: site.address.postalCode,
        addressCountry: site.address.countryCode,
      },
      areaServed,
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: site.phoneTel,
        email: site.email,
        contactType: 'customer service',
        areaServed: 'IN',
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'RO and water purifier services',
        itemListElement: services.map((service) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: service.title,
            serviceType: 'Water purifier service',
            provider: { '@id': `${site.url}/#business` },
            areaServed,
          },
        })),
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${site.url}/#website`,
      url: site.url,
      name: site.name,
      description: `RO repair and water purifier service at ${fullAddress}`,
      publisher: { '@id': `${site.url}/#business` },
      inLanguage: 'en-IN',
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en-IN" data-scroll-behavior="smooth" className={`${inter.variable} ${outfit.variable} bg-background`}>
      <body className="font-sans antialiased">
        <noscript>
          <style>{'.reveal,.animate-fade-up{opacity:1!important;transform:none!important}.word>span{transform:none!important}'}</style>
        </noscript>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
        />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
