import MobileAppsPage from './MobileAppsPage'
import { generateServiceMetadata, ServicePageWithJsonLd } from '@/lib/service-page'

export const metadata = generateServiceMetadata('mobile-apps')

export default function Page() {
  return (
    <ServicePageWithJsonLd slug="mobile-apps">
      <MobileAppsPage />
    </ServicePageWithJsonLd>
  )
}
