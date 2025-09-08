'use client'

import { Hero } from '@/components/sections/Hero'
import { Services } from '@/components/sections/Services'
import { Portfolio } from '@/components/sections/Portfolio'
import { Contact } from '@/components/sections/Contact'

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
