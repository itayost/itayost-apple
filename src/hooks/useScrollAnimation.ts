'use client'

import { useScroll, useTransform, MotionValue } from 'framer-motion'
import { RefObject } from 'react'

interface ScrollAnimationOptions {
  target?: RefObject<HTMLElement>
  offset?: [string, string]
  inputRange?: number[]
  outputRange?: number[]
}

export function useScrollAnimation({
  target,
  offset = ['start end', 'end start'],
  inputRange = [0, 1],
  outputRange = [0, 1],
}: ScrollAnimationOptions = {}): MotionValue<number> {
  const { scrollYProgress } = useScroll({
    target,
    offset,
  })

  return useTransform(scrollYProgress, inputRange, outputRange)
}