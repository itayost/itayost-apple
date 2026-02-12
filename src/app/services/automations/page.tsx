import AutomationsPage from './AutomationsPage'
import { generateServiceMetadata, ServicePageWithJsonLd } from '@/lib/service-page'

export const metadata = generateServiceMetadata('automations')

export default function Page() {
  return (
    <ServicePageWithJsonLd slug="automations">
      <AutomationsPage />
    </ServicePageWithJsonLd>
  )
}
