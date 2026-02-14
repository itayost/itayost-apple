// Central analytics utility for GA4 event tracking
// 7 focused events that answer real business questions

import type { AnalyticsEventName } from '@/types/analytics'

// Check if Google Analytics is available
const isGAAvailable = (): boolean => {
  return typeof window !== 'undefined' && typeof window.gtag !== 'undefined'
}

// Base function to track any event
export const trackEvent = (
  eventName: AnalyticsEventName,
  params: Record<string, string | number | boolean | undefined> = {}
): void => {
  if (!isGAAvailable()) {
    if (process.env.NODE_ENV === 'development') {
      console.log('[Analytics]', eventName, params)
    }
    return
  }

  try {
    if (window.gtag) {
      window.gtag('event', eventName, {
        ...params,
        timestamp: Date.now(),
      })
    }
  } catch (error) {
    console.error('[Analytics] Error tracking event:', error)
  }
}

// Track lead generation (GA4 recommended event)
// Fires when: contact form submitted, newsletter signup, WhatsApp contact initiated
export const trackGenerateLead = (
  method: 'form' | 'whatsapp' | 'phone' | 'newsletter',
  sourcePage: string
): void => {
  trackEvent('generate_lead', {
    method,
    source_page: sourcePage,
  })
}

// Track WhatsApp button clicks
export const trackWhatsAppClick = (
  sourcePage: string,
  buttonLocation: string = 'fab'
): void => {
  trackEvent('whatsapp_click', {
    source_page: sourcePage,
    button_location: buttonLocation,
  })
}

// Track contact link clicks (phone, email, whatsapp)
export const trackContactClick = (
  contactMethod: 'phone' | 'email' | 'whatsapp',
  sourceComponent: string
): void => {
  trackEvent('contact_click', {
    contact_method: contactMethod,
    source_component: sourceComponent,
  })
}

// Track CTA button clicks
export const trackCtaClick = (
  ctaText: string,
  ctaLocation: string,
  ctaDestination: string
): void => {
  trackEvent('cta_click', {
    cta_text: ctaText,
    cta_location: ctaLocation,
    cta_destination: ctaDestination,
  })
}

// Track service page views
export const trackServiceView = (
  serviceName: string,
  serviceSlug: string
): void => {
  trackEvent('service_view', {
    service_name: serviceName,
    service_slug: serviceSlug,
  })
}

// Track portfolio item clicks
export const trackPortfolioClick = (
  itemName: string,
  category: string
): void => {
  trackEvent('portfolio_click', {
    item_name: itemName,
    category,
  })
}

// Track outbound/external link clicks
export const trackOutboundClick = (
  linkUrl: string,
  linkText: string,
  sourceComponent: string
): void => {
  trackEvent('outbound_click', {
    link_url: linkUrl,
    link_text: linkText,
    source_component: sourceComponent,
  })
}
