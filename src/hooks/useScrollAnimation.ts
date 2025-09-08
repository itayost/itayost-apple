'use client'

import { useScroll, useTransform, MotionValue } from 'framer-motion'
import { RefObject } from 'react'

type ScrollOffset = 
  | `${number}px ${number}px`
  | `${number}px ${number}%`
  | `${number}% ${number}px`
  | `${number}% ${number}%`
  | 'start start'
  | 'start center'
  | 'start end'
  | 'center start'
  | 'center center'
  | 'center end'
  | 'end start'
  | 'end center'
  | 'end end'

interface ScrollAnimationOptions {
  target?: RefObject<HTMLElement>
  offset?: [ScrollOffset, ScrollOffset]
  inputRange?: number[]
  outputRange?: number[]
}

export function useScrollAnimation({
  target,
  offset = ['start end', 'end start'] as [ScrollOffset, ScrollOffset],
  inputRange = [0, 1],
  outputRange = [0, 1],
}: ScrollAnimationOptions = {}): MotionValue<number> {
  const { scrollYProgress } = useScroll({
    target,
    offset,
  })

  return useTransform(scrollYProgress, inputRange, outputRange)
}