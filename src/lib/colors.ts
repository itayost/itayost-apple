// Centralized color map for service colors
// Prevents dynamic Tailwind class construction (e.g., `bg-${color}`)
// which breaks Tailwind's CSS purging in production builds.

export interface ServiceColors {
  bg: string
  text: string
  bgLight: string
}

const serviceColorMap: Record<string, ServiceColors> = {
  'brand-blue': {
    bg: 'bg-brand-blue',
    text: 'text-brand-blue',
    bgLight: 'bg-brand-blue/5',
  },
  'brand-orange': {
    bg: 'bg-brand-orange',
    text: 'text-brand-orange',
    bgLight: 'bg-brand-orange/5',
  },
  'brand-green': {
    bg: 'bg-brand-green',
    text: 'text-brand-green',
    bgLight: 'bg-brand-green/5',
  },
  'brand-navy': {
    bg: 'bg-brand-navy',
    text: 'text-brand-navy',
    bgLight: 'bg-brand-navy/5',
  },
}

const fallback: ServiceColors = {
  bg: 'bg-brand-blue',
  text: 'text-brand-blue',
  bgLight: 'bg-brand-blue/5',
}

export function getServiceColors(colorKey: string): ServiceColors {
  return serviceColorMap[colorKey] || fallback
}
