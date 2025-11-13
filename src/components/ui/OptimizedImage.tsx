'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion } from 'framer-motion'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  priority?: boolean
  className?: string
  sizes?: string
  quality?: number
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  onLoad?: () => void
  title?: string
  loading?: 'lazy' | 'eager'
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  sizes = '100vw',
  quality = 75,
  placeholder = 'blur',
  blurDataURL,
  onLoad,
  title,
  loading = 'lazy',
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)

  // Generate a simple blur placeholder if none provided
  const defaultBlurDataURL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k='

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Loading skeleton */}
      {isLoading && (
        <motion.div
          className="absolute inset-0 bg-brand-gray-100 animate-pulse"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
      
      <Image
        src={src}
        alt={alt}
        title={title || alt}
        width={width}
        height={height}
        priority={priority}
        loading={priority ? 'eager' : loading}
        quality={quality}
        sizes={sizes}
        placeholder={placeholder}
        blurDataURL={blurDataURL || defaultBlurDataURL}
        className={`${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onLoad={() => {
          setIsLoading(false)
          onLoad?.()
        }}
        style={{
          width: width ? undefined : '100%',
          height: height ? undefined : 'auto',
        }}
      />
    </div>
  )
}

// Lazy load wrapper with intersection observer
export function LazyImage({
  threshold = 0.1,
  rootMargin = '50px',
  ...props
}: OptimizedImageProps & {
  threshold?: number
  rootMargin?: string
}) {
  const [isInView, setIsInView] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.3 }}
      onViewportEnter={() => setIsInView(true)}
      viewport={{ once: true, margin: rootMargin }}
    >
      {isInView ? <OptimizedImage {...props} /> : <ImagePlaceholder />}
    </motion.div>
  )
}

function ImagePlaceholder() {
  return (
    <div className="w-full h-full bg-[#F5F5F7] animate-pulse" />
  )
}
