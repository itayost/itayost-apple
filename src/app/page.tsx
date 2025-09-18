import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { seoConfig } from '@/config/seo'
import { JsonLd } from '@/components/common/JsonLd'

// Components - same for all screen sizes
const Hero = dynamic(() => import('@/components/sections/Hero'), {
  loading: () => <div className="min-h-screen bg-gradient-to-b from-white to-apple-gray-50" />,
  ssr: true
})

const Services = dynamic(() => import('@/components/sections/Services'), {
  loading: () => <div className="min-h-[600px] bg-white" />,
  ssr: true
})

const Portfolio = dynamic(() => import('@/components/sections/Portfolio'), {
  loading: () => <div className="min-h-[600px] bg-apple-gray-50" />,
  ssr: true
})

const Contact = dynamic(() => import('@/components/sections/Contact'), {
  loading: () => <div className="min-h-[600px] bg-white" />,
  ssr: true
})

export const metadata: Metadata = {
  title: seoConfig.pages.home.title,
  description: seoConfig.pages.home.description,
  keywords: seoConfig.pages.home.keywords,
  openGraph: {
    title: seoConfig.pages.home.title,
    description: seoConfig.pages.home.description,
    url: seoConfig.pages.home.canonical,
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ITAYOST - פיתוח אתרים ואפליקציות',
      },
    ],
  },
  alternates: {
    canonical: seoConfig.pages.home.canonical,
  },
}

export default function HomePage() {
  // Structured data for homepage
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      seoConfig.structuredData.organization,
      seoConfig.structuredData.website,
      seoConfig.structuredData.localBusiness,
      seoConfig.structuredData.breadcrumbs('/'),
    ],
  }

  return (
    <>
      <JsonLd data={structuredData} />
      <main className="overflow-hidden bg-white performance-container">
        {/* Hero section */}
        <Hero />

        {/* Services section */}
        <Suspense fallback={<div className="min-h-[600px]" />}>
          <Services />
        </Suspense>

        {/* Portfolio section */}
        <Suspense fallback={<div className="min-h-[600px]" />}>
          <Portfolio />
        </Suspense>

        {/* Contact section */}
        <Suspense fallback={<div className="min-h-[600px]" />}>
          <Contact />
        </Suspense>
      </main>
    </>
  )
}