// Central analytics utility for tracking events
// Supports Google Analytics 4 and can be extended for other platforms

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

// Track WhatsApp button clicks
export const trackWhatsAppClick = (
  sourcePage: string,
  buttonLocation: string = 'fab'
): void => {
  trackEvent('whatsapp_click', {
    source_page: sourcePage,
    button_location: buttonLocation,
    page_path: window.location.pathname,
    page_title: document.title,
  })
}

// Track form interactions
export const trackFormStart = (formName: string): void => {
  trackEvent('form_start', {
    form_name: formName,
    page_path: window.location.pathname,
  })
}

export const trackFormFieldFocus = (formName: string, fieldName: string): void => {
  trackEvent('form_field_focus', {
    form_name: formName,
    field_name: fieldName,
  })
}

export const trackFormFieldBlur = (
  formName: string,
  fieldName: string,
  hasValue: boolean
): void => {
  trackEvent('form_field_blur', {
    form_name: formName,
    field_name: fieldName,
    field_value: hasValue ? 'filled' : 'empty',
  })
}

export const trackFormFieldError = (
  formName: string,
  fieldName: string,
  errorMessage: string
): void => {
  trackEvent('form_field_error', {
    form_name: formName,
    field_name: fieldName,
    error_message: errorMessage,
  })
}

export const trackFormSubmit = (
  formName: string,
  success: boolean,
  errorMessage?: string
): void => {
  trackEvent('form_submit', {
    form_name: formName,
    success,
    error_message: errorMessage,
  })
}

// Track conversions (e.g., lead submissions)
export const trackConversion = (
  conversionName: string,
  value?: number,
  currency: string = 'ILS'
): void => {
  trackEvent('lead_submit', {
    conversion_name: conversionName,
    conversion_value: value,
    currency,
    page_path: window.location.pathname,
  })

  // Also send as GA4 conversion event
  if (isGAAvailable() && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: 'AW-CONVERSION-ID', // Replace with actual conversion ID if using Google Ads
      value: value,
      currency: currency,
    })
  }
}

// Track scroll depth
let scrollDepthTracked = new Set<number>()

export const trackScrollDepth = (): void => {
  if (typeof window === 'undefined') return

  const scrollPercentage = Math.round(
    (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
  )

  const milestones = [25, 50, 75, 100]
  milestones.forEach((milestone) => {
    if (scrollPercentage >= milestone && !scrollDepthTracked.has(milestone)) {
      scrollDepthTracked.add(milestone)
      trackEvent('scroll_depth', {
        scroll_percentage: milestone,
        page_path: window.location.pathname,
      })
    }
  })
}

// Reset scroll tracking when page changes
export const resetScrollTracking = (): void => {
  scrollDepthTracked = new Set<number>()
}

// Track service page views
export const trackServiceView = (serviceName: string, serviceSlug: string): void => {
  trackEvent('service_view', {
    service_name: serviceName,
    service_slug: serviceSlug,
    page_path: window.location.pathname,
  })
}

// Track portfolio item clicks
export const trackPortfolioClick = (
  portfolioItem: string,
  category: string
): void => {
  trackEvent('portfolio_click', {
    portfolio_item: portfolioItem,
    portfolio_category: category,
    page_path: window.location.pathname,
  })
}

// Track navigation clicks
export const trackNavigationClick = (
  linkText: string,
  linkUrl: string,
  isExternal: boolean = false
): void => {
  trackEvent('navigation_click', {
    link_text: linkText,
    link_url: linkUrl,
    link_type: isExternal ? 'external' : 'internal',
    page_path: window.location.pathname,
  })
}

// Track outbound links
export const trackOutboundLink = (url: string, linkText?: string): void => {
  trackEvent('outbound_link_click', {
    link_url: url,
    link_text: linkText || url,
    link_type: 'external',
    page_path: window.location.pathname,
  })
}

// Page view tracking (enhanced)
export const trackPageView = (url: string, title?: string): void => {
  if (!isGAAvailable() || !window.gtag) return

  window.gtag('config', process.env.NEXT_PUBLIC_GA_ID || '', {
    page_path: url,
    page_title: title || document.title,
  })

  // Reset scroll tracking for new page
  resetScrollTracking()
}

// Setup scroll depth tracking on mount
export const setupScrollTracking = (): (() => void) => {
  if (typeof window === 'undefined') return () => {}

  const handleScroll = () => {
    trackScrollDepth()
  }

  // Use passive listener for better performance
  window.addEventListener('scroll', handleScroll, { passive: true })

  return () => {
    window.removeEventListener('scroll', handleScroll)
  }
}
