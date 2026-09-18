import { getPortfolioByIds } from '@/data/portfolio'
import { getServiceBySlug } from '@/data/services'
import { ServiceHero } from './ServiceHero'
import { ServiceFinePrint, ServiceIncluded, ServiceSchedule, ServiceWhy } from './ServiceSections'
import { ServiceClose, ServiceRelated, ServiceWork } from './ServiceClose'

/**
 * The shared service page for every /services/<slug> route, in the Carbon Order
 * Pad world: carbon hero, why it matters, what's included, the schedule, real
 * work, fine print, related services and the closing slip.
 */
export function ServicePageView({ slug }: { slug: string }) {
  const service = getServiceBySlug(slug)
  if (!service) return null

  const hasWork = getPortfolioByIds(service.portfolio).length > 0

  return (
    <div className="pad-world">
      <ServiceHero service={service} hasWork={hasWork} />
      <ServiceWhy service={service} />
      <ServiceIncluded features={service.features} />
      <ServiceSchedule process={service.process} technologies={service.technologies} />
      <ServiceWork portfolioIds={service.portfolio} />
      <ServiceFinePrint faq={service.faq} />
      <ServiceRelated serviceId={service.id} />
      <ServiceClose service={service} />
    </div>
  )
}
