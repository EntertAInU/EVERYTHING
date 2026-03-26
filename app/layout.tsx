import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: 'Everything Under the Sun | AI Strategy · Digital Sovereignty · Creative Innovation',
  description: 'EUtS is a multi-vertical company specializing in AI R&D, digital forensics & device security, film & music production, sustainable technology, and revenue growth strategy. Veteran owned. Los Angeles & Croatia.',
  generator: 'Next.js',
  applicationName: 'Everything Under the Sun',
  keywords: [
    'AI consulting', 'digital sovereignty', 'device security', 'vulnerability research',
    'revenue growth strategy', 'film production', 'music production', 'sustainable technology',
    'marketing strategy', 'AI R&D', 'digital forensics', 'hardware hardening',
    'privacy consulting', 'veteran owned business', 'Los Angeles', 'Croatia',
    'Everything Under the Sun', 'EUtS', 'EverythingARTI'
  ],
  authors: [{ name: 'Everything Under the Sun, LLC' }],
  creator: 'Everything Under the Sun, LLC',
  publisher: 'Everything Under the Sun, LLC',
  metadataBase: new URL('https://everythingarti.org'),
  alternates: {
    canonical: 'https://everythingarti.org',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://everythingarti.org',
    siteName: 'Everything Under the Sun',
    title: 'Everything Under the Sun | AI Strategy · Digital Sovereignty · Creative Innovation',
    description: 'Multi-vertical company delivering AI R&D, digital forensics, film & music production, and proven revenue growth strategy. From $50M to $500M. Veteran owned.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Everything Under the Sun - Strategy for Humanity',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Everything Under the Sun | AI Strategy · Digital Sovereignty',
    description: 'Multi-vertical company delivering AI R&D, digital forensics, and proven revenue growth strategy. Veteran owned.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  category: 'technology',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Everything Under the Sun, LLC',
    alternateName: 'EUtS',
    url: 'https://everythingarti.org',
    logo: 'https://everythingarti.org/favicon.svg',
    description: 'Multi-vertical company specializing in AI R&D, digital forensics & device security, film & music production, sustainable technology, and revenue growth strategy.',
    foundingDate: '2019',
    founder: {
      '@type': 'Person',
      name: 'Blaise',
      jobTitle: 'CEO & Founder',
    },
    address: [
      {
        '@type': 'PostalAddress',
        addressLocality: 'Los Angeles',
        addressRegion: 'CA',
        addressCountry: 'US',
      },
      {
        '@type': 'PostalAddress',
        addressLocality: 'Vela Luka, Korčula',
        addressCountry: 'HR',
      },
    ],
    sameAs: [
      'https://everythingis.online',
      'https://everythingisawesome.org',
      'https://libertadai.com',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-213-769-7079',
      email: 'wave@everythingis.online',
      contactType: 'customer service',
    },
    knowsAbout: [
      'Artificial Intelligence',
      'Digital Forensics',
      'Device Security',
      'Vulnerability Research',
      'Revenue Growth Strategy',
      'Film Production',
      'Music Production',
      'Sustainable Technology',
      'Hardware Hardening',
      'Privacy by Design',
    ],
  }

  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  )
}
