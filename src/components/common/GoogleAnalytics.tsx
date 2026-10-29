'use client'

import Script from 'next/script'
import { useConsent } from '@/lib/use-consent'

// GA4 loads only once the visitor allowed analytics (src/lib/consent.ts).
export function GoogleAnalytics() {
  const consent = useConsent()
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID
  if (!GA_ID || !consent?.analytics) return null

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          window.gtag = function(){dataLayer.push(arguments);};
          window.gtag('js', new Date());
          window.gtag('config', '${GA_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  )
}
