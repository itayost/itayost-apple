import UIUXDesignPage from './UIUXDesignPage'
import { generateServiceMetadata, ServicePageWithJsonLd } from '@/lib/service-page'

export const metadata = generateServiceMetadata('ui-ux-design')

export default function Page() {
  return (
    <ServicePageWithJsonLd slug="ui-ux-design">
      <UIUXDesignPage />
    </ServicePageWithJsonLd>
  )
}
