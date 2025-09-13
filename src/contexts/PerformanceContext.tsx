'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

interface PerformanceContextType {
  isMobile: boolean
  isLowPerformance: boolean
  reduceMotion: boolean
  gpuTier: 'low' | 'medium' | 'high'
  isTouchDevice: boolean
}

const PerformanceContext = createContext<PerformanceContextType>({
  isMobile: false,
  isLowPerformance: false,
  reduceMotion: false,
  gpuTier: 'medium',
  isTouchDevice: false
})

export const usePerformance = () => useContext(PerformanceContext)

export function PerformanceProvider({ children }: { children: ReactNode }) {
  const [performance, setPerformance] = useState<PerformanceContextType>({
    isMobile: false,
    isLowPerformance: false,
    reduceMotion: false,
    gpuTier: 'medium',
    isTouchDevice: false
  })

  useEffect(() => {
    // Detect mobile
    const checkMobile = () => {
      const userAgent = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
      const screenWidth = window.innerWidth < 768
      return userAgent || screenWidth
    }

    // Detect touch device
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0

    // Detect reduced motion preference
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Detect GPU performance (simplified)
    const detectGPU = (): 'low' | 'medium' | 'high' => {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext | null
      
      if (gl) {
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
        if (debugInfo) {
          const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
          
          // Check for low-end GPUs
          if (/Intel HD|Intel UHD|Mali-[GT]4|Adreno [1-4]/i.test(renderer)) {
            return 'low'
          } else if (/Mali-[GT][67]|Adreno [5-6]|Apple A[789]|Apple A1[0-2]/i.test(renderer)) {
            return 'medium'
          }
        }
      }
      
      // Default to medium for mobile devices, high for desktop
      return checkMobile() ? 'medium' : 'high'
    }

    // Check device memory (if available)
    const hasLowMemory = 'deviceMemory' in navigator && (navigator as any).deviceMemory < 4

    // Check connection speed (if available)
    const hasSlowConnection = 'connection' in navigator && 
      (navigator as any).connection?.effectiveType && 
      ['slow-2g', '2g', '3g'].includes((navigator as any).connection.effectiveType)

    const isMobile = checkMobile()
    const gpuTier = detectGPU()
    const isLowPerformance = isMobile || gpuTier === 'low' || reduceMotion || hasLowMemory || hasSlowConnection

    setPerformance({
      isMobile,
      isLowPerformance,
      reduceMotion,
      gpuTier,
      isTouchDevice
    })

    // Listen for window resize to update mobile detection
    const handleResize = () => {
      const newIsMobile = checkMobile()
      if (newIsMobile !== performance.isMobile) {
        setPerformance(prev => ({
          ...prev,
          isMobile: newIsMobile,
          isLowPerformance: newIsMobile || prev.gpuTier === 'low' || prev.reduceMotion
        }))
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <PerformanceContext.Provider value={performance}>
      {children}
    </PerformanceContext.Provider>
  )
}
