import LeadGenerationPage from './LeadGenerationPage'
import { generateServiceMetadata, ServicePageWithJsonLd } from '@/lib/service-page'

export const metadata = generateServiceMetadata('lead-generation')

export default function Page() {
  return (
    <ServicePageWithJsonLd slug="lead-generation">
      <LeadGenerationPage />
    </ServicePageWithJsonLd>
  )
}
