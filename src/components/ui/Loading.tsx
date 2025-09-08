'use client'

import { motion } from 'framer-motion'

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-8">
      <motion.div
        className="w-12 h-12 border-3 border-[#E8E8ED] border-t-[#0071E3] rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  )
}

export function LoadingDots() {
  return (
    <div className="flex items-center justify-center gap-2 p-8">
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="w-3 h-3 bg-[#0071E3] rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: index * 0.2,
          }}
        />
      ))}
    </div>
  )
}

export function LoadingPage() {
  return (
    <div className="fixed inset-0 bg-white/90 backdrop-blur-xl z-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        {/* Animated Logo */}
        <motion.div
          className="text-6xl font-bold bg-gradient-to-r from-[#0071E3] to-[#BF5AF2] bg-clip-text text-transparent mb-8"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundSize: '200% 200%',
          }}
        >
          ITAYOST
        </motion.div>

        {/* Loading Bar */}
        <div className="w-48 h-1 bg-[#E8E8ED] rounded-full overflow-hidden mx-auto">
          <motion.div
            className="h-full bg-gradient-to-r from-[#0071E3] to-[#BF5AF2]"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>
    </div>
  )
}

export function LoadingSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-4 bg-[#E8E8ED] rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-[#E8E8ED] rounded mb-4"></div>
      <div className="h-4 bg-[#E8E8ED] rounded w-5/6"></div>
    </div>
  )
}
