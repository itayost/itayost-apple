'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

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

export default function HomePage() {
  return (
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
  )
}