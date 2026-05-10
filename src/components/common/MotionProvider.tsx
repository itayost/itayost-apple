'use client'

import { MotionConfig } from 'framer-motion'
import type { ReactNode } from 'react'

/**
 * Wraps the app in MotionConfig with reducedMotion="user" so all Framer
 * Motion components automatically skip animations when the OS setting
 * "Reduce Motion" is enabled. Pairs with the CSS @media
 * (prefers-reduced-motion: reduce) block in globals.css for full coverage.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
