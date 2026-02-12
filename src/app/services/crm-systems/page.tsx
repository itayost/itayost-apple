import CRMSystemsPage from './CRMSystemsPage'
import { generateServiceMetadata, ServicePageWithJsonLd } from '@/lib/service-page'

export const metadata = generateServiceMetadata('crm-systems')

export default function Page() {
  return (
    <ServicePageWithJsonLd slug="crm-systems">
      <CRMSystemsPage />
    </ServicePageWithJsonLd>
  )
}
