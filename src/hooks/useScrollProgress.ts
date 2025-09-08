import { useEffect, useState } from 'react'

export function useScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null)

  useEffect(() => {
    let lastScrollY = window.scrollY
    let scrollTimeout: NodeJS.Timeout

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = (currentScrollY / maxScroll) * 100

      setScrollY(currentScrollY)
      setScrollProgress(progress)
      setIsScrolling(true)

      // Determine scroll direction
      if (currentScrollY > lastScrollY) {
        setScrollDirection('down')
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection('up')
      }

      lastScrollY = currentScrollY

      // Clear existing timeout
      clearTimeout(scrollTimeout)

      // Set scrolling to false after scroll stops
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false)
      }, 150)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(scrollTimeout)
    }
  }, [])

  return {
    scrollProgress,
    scrollY,
    isScrolling,
    scrollDirection,
  }
}
