import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import './globals.css'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/common/WhatsAppButton'
import ClientProvider from '@/components/providers/ClientProvider'
import { seoConfig } from '@/config/seo'

// Import Google Fonts
import { Heebo } from 'next/font/google'

// Configure Heebo font
const heebo = Heebo({
  subsets: ['hebrew', 'latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-heebo',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.itayost.com'),
  title: {
    default: seoConfig.default.title,
    template: seoConfig.default.titleTemplate,
  },
  description: seoConfig.default.description,
  keywords: seoConfig.default.keywords,
  authors: [{ name: 'ITAYOST' }, { name: 'איתי אוסט' }],
  creator: 'ITAYOST',
  publisher: 'ITAYOST',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: seoConfig.default.title,
    description: seoConfig.default.description,
    url: 'https://www.itayost.com',
    siteName: 'ITAYOST',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ITAYOST - פיתוח אתרים ואפליקציות',
      },
    ],
    locale: 'he_IL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: seoConfig.default.title,
    description: seoConfig.default.description,
    creator: '@itayost',
    images: ['https://www.itayost.com/og-image.jpg'],
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
  alternates: {
    canonical: 'https://www.itayost.com',
    languages: {
      'he-IL': 'https://www.itayost.com',
      'en-US': 'https://www.itayost.com/en',
    },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0071E3',
}

// Structured Data Script Component
function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      seoConfig.structuredData.organization,
      seoConfig.structuredData.website,
      seoConfig.structuredData.localBusiness,
    ],
  }

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
      strategy="afterInteractive"
    />
  )
}

// Google Analytics Component
function GoogleAnalytics() {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'
  
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he" dir="rtl" className={heebo.variable}>
      <head>
        {/* Favicons */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon-96x96.png" type="image/png" sizes="96x96" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Canonical and Language */}
        <link rel="canonical" href="https://www.itayost.com" />
        <link rel="alternate" hrefLang="he-IL" href="https://www.itayost.com" />
        <link rel="alternate" hrefLang="x-default" href="https://www.itayost.com" />
        
        {/* Verification Tags */}
        <meta name="google-site-verification" content="YOUR_GOOGLE_VERIFICATION_CODE" />
        <meta name="msvalidate.01" content="YOUR_BING_VERIFICATION_CODE" />
        
        {/* Preconnect for Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Theme Color */}
        <meta name="theme-color" content="#0071E3" />
      </head>
      <body className="antialiased">
        <StructuredData />
        <GoogleAnalytics />
        <ClientProvider>
          <Navigation />
          {children}
          <Footer />
          <WhatsAppButton />
        </ClientProvider>
      </body>
    </html>
  )
}