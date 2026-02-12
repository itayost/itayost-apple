import EcommercePage from './EcommercePage'
import { generateServiceMetadata, ServicePageWithJsonLd } from '@/lib/service-page'

export const metadata = generateServiceMetadata('ecommerce')

export default function Page() {
  return (
    <ServicePageWithJsonLd slug="ecommerce">
      <EcommercePage />
    </ServicePageWithJsonLd>
  )
}
