'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { getRelatedServices, type Service } from '@/data/services'

interface RelatedServicesProps {
  currentServiceId: string
  title?: string
}

export default function RelatedServices({
  currentServiceId,
  title = 'שירותים משלימים',
}: RelatedServicesProps) {
  const relatedServices = getRelatedServices(currentServiceId)

  if (relatedServices.length === 0) return null

  return (
    <section className="py-16 bg-brand-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl lg:text-3xl font-bold text-brand-navy mb-3">
            {title}
          </h2>
          <p className="text-brand-gray-600">
            לקוחות רבים משלבים שירותים אלו יחד לתוצאות מיטביות
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {relatedServices.map((service, index) => (
            <RelatedServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function RelatedServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Link
        href={`/services/${service.slug}`}
        className="block bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group"
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">{service.icon}</span>
          <h3 className="text-lg font-bold text-brand-navy group-hover:text-brand-blue transition-colors">
            {service.name}
          </h3>
        </div>
        <p className="text-brand-gray-600 text-sm mb-4 line-clamp-2">
          {service.tagline}
        </p>
        <div className="flex items-center gap-2 text-brand-blue text-sm font-medium">
          <span>למידע נוסף</span>
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        </div>
      </Link>
    </motion.div>
  )
}
