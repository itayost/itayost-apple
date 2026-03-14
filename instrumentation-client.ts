import posthog from 'posthog-js'

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST

if (posthogKey && posthogHost && typeof window !== 'undefined') {
  posthog.init(posthogKey, {
    api_host: posthogHost,

    // Track anonymous visitors (not just identified ones)
    person_profiles: 'always',

    // Pageview & navigation tracking
    capture_pageview: true,
    capture_pageleave: true,

    // Autocapture clicks, inputs, form submits
    autocapture: true,

    // Session replay — watch real user sessions
    disable_session_recording: false,
    session_recording: {
      // Mask all text inputs for privacy (passwords, names, phones)
      maskAllInputs: true,
      // Mask sensitive text content
      maskTextSelector: '[data-ph-mask]',
    },

    // Performance & Web Vitals
    capture_performance: true,

    // Dead click detection (clicks that do nothing)
    capture_dead_clicks: true,

    // Enable toolbar for visual editor (heatmaps, etc.)
    advanced_disable_toolbar_metrics: false,
  })
}
