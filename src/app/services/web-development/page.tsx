import WebDevelopmentPage from './WebDevelopmentPage'
import { generateServiceMetadata, ServicePageWithJsonLd } from '@/lib/service-page'

export const metadata = generateServiceMetadata('web-development')

export default function Page() {
  return (
    <ServicePageWithJsonLd slug="web-development">
      <WebDevelopmentPage />
    </ServicePageWithJsonLd>
  )
}
