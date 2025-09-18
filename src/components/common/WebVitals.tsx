'use client'

import { useEffect } from 'react'
import { onCLS, onFCP, onLCP, onTTFB, onINP, Metric } from 'web-vitals'

const vitalsUrl = '/api/vitals'

function sendToAnalytics(metric: Metric) {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-CSP6R559BD'

  // Send to Google Analytics 4
  if (typeof window !== 'undefined' && window.gtag && GA_MEASUREMENT_ID) {
    window.gtag('event', metric.name, {
      value: Math.round(metric.name === 'CLS' ? metric.delta * 1000 : metric.delta),
      metric_id: metric.id,
      metric_value: metric.value,
      metric_delta: metric.delta,
      metric_rating: metric.rating,
      engagement_time_msec: 100,
      custom_map: {
        metric_rating: metric.rating,
      }
    })
  }

  // Also send to our API endpoint for additional processing
  const body = JSON.stringify({
    id: metric.id,
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    delta: metric.delta,
    navigationType: metric.navigationType,
    url: window.location.href,
    userAgent: navigator.userAgent,
  })

  // Use sendBeacon if available for reliability
  if (navigator.sendBeacon) {
    navigator.sendBeacon(vitalsUrl, body)
  } else {
    fetch(vitalsUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      keepalive: true,
    }).catch(console.error)
  }
}

export function WebVitals() {
  useEffect(() => {
    // Core Web Vitals
    onCLS(sendToAnalytics) // Cumulative Layout Shift
    onFCP(sendToAnalytics) // First Contentful Paint
    onLCP(sendToAnalytics) // Largest Contentful Paint
    onTTFB(sendToAnalytics) // Time to First Byte
    onINP(sendToAnalytics) // Interaction to Next Paint (replaced FID)
  }, [])

  return null
}

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag?: (
      command: string,
      target: string,
      params?: Record<string, any>
    ) => void
  }
}