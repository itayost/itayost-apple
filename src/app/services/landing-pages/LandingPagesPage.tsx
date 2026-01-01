'use client'

import { getServiceBySlug } from '@/data/services'
import {
  ServiceHero,
  ServiceFeatures,
  ServiceProcess,
  ServiceTechnologies,
  ServicePortfolio,
  ServiceFAQ,
  ServiceCTA,
  RelatedServices
} from '@/components/services'

export default function LandingPagesPage() {
  const service = getServiceBySlug('landing-pages')

  if (!service) {
    return <div>Service not found</div>
  }

  return (
    <main className="min-h-screen">
      <ServiceHero service={service} />

      {/* Long Description Section */}
      <section className="bg-white py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <p className="text-lg leading-relaxed text-brand-gray-700 lg:text-xl">
              {service.longDescription}
            </p>
          </div>
        </div>
      </section>

      <ServiceFeatures features={service.features} color={service.color} accentColor={service.accentColor} />
      <ServiceProcess process={service.process} color={service.color} accentColor={service.accentColor} />
      {service.technologies && (
        <ServiceTechnologies technologies={service.technologies} color={service.color} accentColor={service.accentColor} />
      )}
      <ServicePortfolio portfolioIds={service.portfolio} color={service.color} accentColor={service.accentColor} />
      <ServiceFAQ faq={service.faq} color={service.color} accentColor={service.accentColor} />
      <RelatedServices currentServiceId={service.id} />
      <ServiceCTA service={service} />
    </main>
  )
}
