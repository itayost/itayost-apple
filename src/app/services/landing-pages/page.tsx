import LandingPagesPage from './LandingPagesPage'
import { generateServiceMetadata, ServicePageWithJsonLd } from '@/lib/service-page'

export const metadata = generateServiceMetadata('landing-pages')

export default function Page() {
  return (
    <ServicePageWithJsonLd slug="landing-pages">
      <LandingPagesPage />
    </ServicePageWithJsonLd>
  )
}
