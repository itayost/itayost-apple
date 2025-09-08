'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-[#FBFBFD] via-white to-[#F5F5F7] overflow-hidden relative">
      {/* Animated Background Elements */}
      <motion.div
        className="absolute inset-0"
        style={{
          x: mousePosition.x,
          y: mousePosition.y,
        }}
      >
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-[#0071E3] to-[#BF5AF2] rounded-full opacity-10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-[#FF375F] to-[#FF9500] rounded-full opacity-10 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </motion.div>

      <div className="relative z-10 text-center max-w-2xl">
        {/* 404 Number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <motion.h1 
            className="text-[clamp(8rem,20vw,15rem)] font-bold leading-none bg-gradient-to-r from-[#0071E3] to-[#BF5AF2] bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              backgroundSize: '200% 200%',
            }}
          >
            404
          </motion.h1>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-3xl font-semibold mb-4 text-[#1D1D1F]">
            Oops! Page Not Found
          </h2>
          <p className="text-xl text-[#86868B] mb-8">
            The page you're looking for seems to have wandered off into the digital void.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <Link href="/">
            <motion.button
              className="px-8 py-4 bg-[#0071E3] text-white rounded-full font-medium hover:bg-[#0077ED] hover:shadow-xl transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Go Home
            </motion.button>
          </Link>
          
          <motion.button
            onClick={() => window.history.back()}
            className="px-8 py-4 bg-white text-[#424245] border border-[#C7C7CC] rounded-full font-medium hover:bg-[#F5F5F7] transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Go Back
          </motion.button>
        </motion.div>

        {/* Fun Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16"
        >
          <motion.div
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="inline-block text-6xl"
          >
            🔍
          </motion.div>
          <p className="mt-4 text-sm text-[#86868B]">
            Searching for that page...
          </p>
        </motion.div>
      </div>
    </main>
  )
}
