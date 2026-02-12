'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home, SearchX } from 'lucide-react'
import { content } from '@/config/content'
import { bouncyEasing } from '@/constants/animations'

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-white">
      <div className="text-center max-w-lg">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.6,
            ease: bouncyEasing
          }}
        >
          {/* 404 Icon */}
          <motion.div
            className="mb-8 flex justify-center"
            animate={{
              rotate: [0, -10, 10, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="bg-brand-blue rounded-3xl p-8">
              <SearchX className="w-24 h-24 text-white" />
            </div>
          </motion.div>

          {/* 404 Text */}
          <motion.h1
            className="text-8xl md:text-9xl font-bold text-brand-navy mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: bouncyEasing }}
          >
            404
          </motion.h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: bouncyEasing }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-brand-navy">
            {content.notFound.title}
          </h2>
          <p className="text-xl text-brand-gray-700 mb-8 max-w-md mx-auto leading-relaxed">
            {content.notFound.message}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: bouncyEasing }}
        >
          <Link href="/">
            <motion.button
              className="inline-flex items-center gap-2 px-10 py-5 bg-brand-blue text-white rounded-full font-semibold text-lg shadow-2xl hover:shadow-3xl transition-shadow"
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3, ease: bouncyEasing }
              }}
              whileTap={{
                scale: 0.95,
                transition: { duration: 0.3, ease: bouncyEasing }
              }}
            >
              <Home className="w-5 h-5" />
              {content.notFound.button}
            </motion.button>
          </Link>
        </motion.div>

        {/* Animated background elements - simple floating shapes */}
        <motion.div
          className="absolute top-20 right-20 w-32 h-32 bg-brand-blue/10 rounded-full blur-2xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-40 h-40 bg-brand-orange/10 rounded-full blur-2xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </main>
  )
}
