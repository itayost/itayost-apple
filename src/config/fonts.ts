// Alternative Hebrew Font Options for Next.js
// You can easily switch between these fonts by changing the import in layout.tsx

// Option 1: Heebo (Currently Active)
// Modern, clean, excellent Hebrew-English balance
/*
import { Heebo } from 'next/font/google'
const heebo = Heebo({
  subsets: ['hebrew', 'latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-heebo',
  display: 'swap',
})
*/

// Option 2: Rubik
// Geometric, modern, Apple-like aesthetic
/*
import { Rubik } from 'next/font/google'
const rubik = Rubik({
  subsets: ['hebrew', 'latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-rubik',
  display: 'swap',
})
*/

// Option 3: Assistant
// Clean, professional, designed by Israeli type designer
/*
import { Assistant } from 'next/font/google'
const assistant = Assistant({
  subsets: ['hebrew', 'latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-assistant',
  display: 'swap',
})
*/

// Option 4: IBM Plex Sans Hebrew
// Professional, tech-oriented, great for developer portfolios
/*
import { IBM_Plex_Sans_Hebrew } from 'next/font/google'
const ibmPlex = IBM_Plex_Sans_Hebrew({
  subsets: ['hebrew', 'latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  variable: '--font-ibm-plex',
  display: 'swap',
})
*/

// Option 5: Open Sans + Hebrew
// Classic, highly readable, versatile
/*
import { Open_Sans } from 'next/font/google'
const openSans = Open_Sans({
  subsets: ['hebrew', 'latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-open-sans',
  display: 'swap',
})
*/

// Font Weight Guidelines for Hebrew:
// - Headlines (h1): 700-900 (Bold to Black)
// - Subheadings (h2-h3): 600-700 (Semi-bold to Bold)
// - Body text: 400-500 (Regular to Medium)
// - Captions/small text: 300-400 (Light to Regular)

// Typography Tips for Hebrew:
// 1. Hebrew text often needs slightly more line-height than English
// 2. Letter-spacing should be minimal for Hebrew (0-0.01em)
// 3. Font weights may appear heavier in Hebrew, adjust accordingly
// 4. Mixed Hebrew-English content works best with fonts designed for both

export const fontConfig = {
  heebo: {
    name: 'Heebo',
    weights: ['300', '400', '500', '600', '700', '800', '900'],
    features: 'Modern, clean, excellent Hebrew-English balance',
    bestFor: 'General use, modern websites, tech companies',
  },
  rubik: {
    name: 'Rubik',
    weights: ['300', '400', '500', '600', '700', '800', '900'],
    features: 'Geometric, modern, Apple-like aesthetic',
    bestFor: 'Tech startups, modern portfolios, minimalist designs',
  },
  assistant: {
    name: 'Assistant',
    weights: ['200', '300', '400', '500', '600', '700', '800'],
    features: 'Clean, professional, designed for Hebrew',
    bestFor: 'Corporate sites, professional services, readable body text',
  },
  ibmPlex: {
    name: 'IBM Plex Sans Hebrew',
    weights: ['100', '200', '300', '400', '500', '600', '700'],
    features: 'Professional, technical, monospace option available',
    bestFor: 'Developer portfolios, tech documentation, code-heavy sites',
  },
  openSans: {
    name: 'Open Sans',
    weights: ['300', '400', '500', '600', '700', '800'],
    features: 'Classic, highly readable, versatile',
    bestFor: 'Content-heavy sites, blogs, e-commerce',
  },
}