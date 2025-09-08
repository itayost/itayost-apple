'use client'

import { Hero, Services, Portfolio, Contact } from '@/components'

export default function HomePage() {
  return (
    <main className="overflow-hidden bg-white">
      <Hero />
      <Services />
      <Portfolio />
      <Contact />
    </main>
  )
}