import PaidAdsPage from './PaidAdsPage'
import { generateServiceMetadata, ServicePageWithJsonLd } from '@/lib/service-page'

export const metadata = generateServiceMetadata('paid-ads')

export default function Page() {
  return (
    <ServicePageWithJsonLd slug="paid-ads">
      <PaidAdsPage />
    </ServicePageWithJsonLd>
  )
}
