import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface ParallaxOptions {
  speed?: number
  offset?: number
  scale?: boolean
  opacity?: boolean
  rotate?: boolean
}

export function useParallax({
  speed = 0.5,
  offset = 0,
  scale = false,
  opacity = false,
  rotate = false,
}: ParallaxOptions = {}) {
  const ref = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState({
    y: 0,
    scale: 1,
    opacity: 1,
    rotate: 0,
  })
  const isInView = useInView(ref, { margin: "0px 0px -100px 0px" })

  useEffect(() => {
    if (!isInView || !ref.current) return

    const handleScroll = () => {
      if (!ref.current) return

      const rect = ref.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const elementCenter = rect.top + rect.height / 2
      const windowCenter = windowHeight / 2
      const distance = elementCenter - windowCenter
      
      // Calculate parallax offset
      const parallaxY = (distance * speed) + offset

      // Calculate scale if enabled
      const scaleValue = scale
        ? Math.max(0.8, Math.min(1, 1 - Math.abs(distance) / windowHeight * 0.3))
        : 1

      // Calculate opacity if enabled
      const opacityValue = opacity
        ? Math.max(0, Math.min(1, 1 - Math.abs(distance) / windowHeight))
        : 1

      // Calculate rotation if enabled
      const rotateValue = rotate
        ? (distance / windowHeight) * 10
        : 0

      setTransform({
        y: parallaxY,
        scale: scaleValue,
        opacity: opacityValue,
        rotate: rotateValue,
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial calculation

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isInView, speed, offset, scale, opacity, rotate])

  return {
    ref,
    transform,
    isInView,
  }
}
