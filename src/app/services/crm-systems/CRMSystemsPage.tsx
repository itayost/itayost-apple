'use client'

import { getServiceBySlug } from '@/data/services'
import {
  ServiceHero,
  ServiceFeatures,
  ServiceProcess,
  ServiceTechnologies,
  ServicePortfolio,
  ServiceFAQ,
  ServiceCTA
} from '@/components/services'

export default function CRMSystemsPage() {
  const service = getServiceBySlug('crm-systems')

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
            <p className="text-lg leading-relaxed text-apple-gray-700 lg:text-xl">
              {service.longDescription}
            </p>
          </div>
        </div>
      </section>

      <ServiceFeatures features={service.features} gradient={service.gradient} />
      <ServiceProcess process={service.process} gradient={service.gradient} />
      {service.technologies && (
        <ServiceTechnologies technologies={service.technologies} gradient={service.gradient} />
      )}
      <ServicePortfolio portfolioIds={service.portfolio} gradient={service.gradient} />
      <ServiceFAQ faq={service.faq} gradient={service.gradient} />
      <ServiceCTA service={service} />
    </main>
  )
}
