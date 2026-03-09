import ContentSocialPage from './ContentSocialPage'
import { generateServiceMetadata, ServicePageWithJsonLd } from '@/lib/service-page'

export const metadata = generateServiceMetadata('content-social')

export default function Page() {
  return (
    <ServicePageWithJsonLd slug="content-social">
      <ContentSocialPage />
    </ServicePageWithJsonLd>
  )
}
