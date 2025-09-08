// Central configuration file for the entire project
import { content } from './content'
import { seoConfig } from './seo'
import { socialLinks } from './socialLinks'

export const config = {
  // Site metadata
  site: {
    name: 'ItayOst',
    url: 'https://www.itayost.com',
    description: content.brand.description,
    tagline: content.brand.tagline,
  },
  
  // Contact information
  contact: {
    phone: '054-499-4417',
    phoneIntl: '+972544994417',
    email: 'itayost1@gmail.com',
    address: 'רמת גן',
    country: 'ישראל',
  },
  
  // Business hours
  hours: {
    weekdays: {
      days: ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי'],
      open: '09:00',
      close: '21:00',
    },
    friday: {
      day: 'שישי',
      open: '09:00',
      close: '15:00',
    },
    saturday: {
      day: 'שבת',
      closed: true,
    },
  },
  
  // Owner information
  owner: {
    name: 'איתי אוסטרייך',
    title: 'מפתח Full-Stack',
    founded: '2024',
  },
  
  // Feature flags
  features: {
    showPricing: false,
    showStats: false,
    showExperience: false,
    showBlog: false,
    enableAnalytics: true,
    enableWhatsApp: true,
  },
  
  // Theme configuration
  theme: {
    colors: {
      primary: '#0071E3',
      secondary: '#BF5AF2',
      success: '#30D158',
      warning: '#FF9F0A',
      danger: '#FF3B30',
      dark: '#1D1D1F',
      light: '#F5F5F7',
      gray: '#86868B',
    },
    fonts: {
      sans: 'SF Pro Display, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
      mono: 'SF Mono, Monaco, Consolas, Liberation Mono, Courier New, monospace',
    },
  },
  
  // Export all sub-configs
  content,
  seo: seoConfig,
  social: socialLinks,
}

// Type exports
export type Config = typeof config