// Central analytics utility — sends events to BOTH GA4 and PostHog
// 7 focused events that answer real business questions

import posthog from 'posthog-js'
import type { AnalyticsEventName } from '@/types/analytics'

// Check if Google Analytics is available
const isGAAvailable = (): boolean => {
  return typeof window !== 'undefined' && typeof window.gtag !== 'undefined'
}

// Check if PostHog is available
const isPostHogAvailable = (): boolean => {
  return typeof window !== 'undefined' && posthog.__loaded === true
}

// Base function to track any event — sends to both GA4 and PostHog
export const trackEvent = (
  eventName: AnalyticsEventName,
  params: Record<string, string | number | boolean | undefined> = {}
): void => {
  // Send to GA4
  if (isGAAvailable()) {
    try {
      if (window.gtag) {
        window.gtag('event', eventName, {
          ...params,
          timestamp: Date.now(),
        })
      }
    } catch (error) {
      console.error('[Analytics] GA4 error:', error)
    }
  }

  // Send to PostHog
  if (isPostHogAvailable()) {
    try {
      posthog.capture(eventName, {
        ...params,
        $current_url: window.location.href,
      })
    } catch (error) {
      console.error('[Analytics] PostHog error:', error)
    }
  }

  // Dev logging
  if (process.env.NODE_ENV === 'development' && !isGAAvailable() && !isPostHogAvailable()) {
    console.log('[Analytics]', eventName, params)
  }
}

// Track lead generation (GA4 recommended event)
// Fires when: contact form submitted, newsletter signup, WhatsApp contact initiated
//
// `value` and `currency` are GA4 recommended parameters for `generate_lead`.
// Attaching a sensible estimated lead value per method lets GA4 surface a
// total conversion value in reports once the event is marked as a key event
// in Admin → Events. Values below are conservative ILS estimates of an
// average qualified lead and can be tuned as real pipeline data comes in.
const DEFAULT_LEAD_VALUE_ILS: Record<'form' | 'whatsapp' | 'phone' | 'newsletter', number> = {
  form: 250,
  whatsapp: 200,
  phone: 200,
  newsletter: 25,
}

export const trackGenerateLead = (
  method: 'form' | 'whatsapp' | 'phone' | 'newsletter',
  sourcePage: string,
  options?: { value?: number; currency?: string }
): void => {
  trackEvent('generate_lead', {
    method,
    source_page: sourcePage,
    value: options?.value ?? DEFAULT_LEAD_VALUE_ILS[method],
    currency: options?.currency ?? 'ILS',
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
