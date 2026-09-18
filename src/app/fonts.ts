import { Assistant, Karantina, Playpen_Sans_Hebrew } from 'next/font/google'

// Printed-form display face: the headings of the order pad. Carries the LCP h1.
export const karantina = Karantina({
  subsets: ['hebrew', 'latin'],
  weight: ['400', '700'],
  variable: '--font-pad-display',
  display: 'swap',
  preload: true,
  fallback: ['Arial Narrow', 'sans-serif'],
})

// Body and UI face for the whole site.
export const assistant = Assistant({
  subsets: ['hebrew', 'latin'],
  weight: ['400', '600', '700'],
  variable: '--font-pad-body',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'Segoe UI', 'Arial', 'sans-serif'],
})

// Ballpoint handwriting on the order sheets. Decorative, never preloaded.
export const playpen = Playpen_Sans_Hebrew({
  subsets: ['hebrew', 'latin'],
  weight: ['400', '600'],
  variable: '--font-pad-hand',
  display: 'swap',
  preload: false,
  // next/font has no metric overrides for this face; the handwriting is decorative.
  adjustFontFallback: false,
  fallback: ['cursive'],
})

export const fontVariables = [
  karantina.variable,
  assistant.variable,
  playpen.variable,
].join(' ')
