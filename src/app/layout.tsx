import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  metadataBase: new URL('https://itayost.com'),
  title: 'ITAYOST - Digital Experiences',
  description: 'Building the future of digital with cutting-edge technology and beautiful design',
  keywords: 'web development, UI/UX design, mobile apps, digital transformation',
  authors: [{ name: 'ITAYOST' }],
  openGraph: {
    title: 'ITAYOST - Digital Experiences',
    description: 'Building the future of digital with cutting-edge technology and beautiful design',
    type: 'website',
    locale: 'en_US',
    url: 'https://itayost.com',
    siteName: 'ITAYOST',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ITAYOST - Digital Experiences',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ITAYOST - Digital Experiences',
    description: 'Building the future of digital with cutting-edge technology and beautiful design',
    images: ['/og-image.jpg'],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0071E3',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  )
}
