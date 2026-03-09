import SeoPage from './SeoPage'
import { generateServiceMetadata, ServicePageWithJsonLd } from '@/lib/service-page'

export const metadata = generateServiceMetadata('seo')

export default function Page() {
  return (
    <ServicePageWithJsonLd slug="seo">
      <SeoPage />
    </ServicePageWithJsonLd>
  )
}
