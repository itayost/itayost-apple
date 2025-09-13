'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// Dynamic imports with loading states for better performance
const Hero = dynamic(() => import('@/components/sections/Hero'), {
  loading: () => <div className="min-h-screen bg-gradient-to-b from-white to-apple-gray-50 animate-pulse" />
})

const Services = dynamic(() => import('@/components/sections/Services'), {
  loading: () => <div className="min-h-[600px] bg-white animate-pulse" />
})

const Portfolio = dynamic(() => import('@/components/sections/Portfolio'), {
  loading: () => <div className="min-h-[600px] bg-apple-gray-50 animate-pulse" />
})

const Contact = dynamic(() => import('@/components/sections/Contact'), {
  loading: () => <div className="min-h-[600px] bg-white animate-pulse" />
})

export default function HomePage() {
  return (
    <main className="overflow-hidden bg-white">
      <Suspense fallback={<div className="min-h-screen" />}>
        <Hero />
      </Suspense>
      
      <Suspense fallback={<div className="min-h-[600px]" />}>
        <Services />
      </Suspense>
      
      <Suspense fallback={<div className="min-h-[600px]" />}>
        <Portfolio />
      </Suspense>
      
      <Suspense fallback={<div className="min-h-[600px]" />}>
        <Contact />
      </Suspense>
    </main>
  )
}
