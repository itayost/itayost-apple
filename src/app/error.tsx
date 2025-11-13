'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { AlertCircle, Home, RefreshCw } from 'lucide-react'

// Bouncy easing for Mailchimp-style animations
const bouncyEasing = [0.34, 1.56, 0.64, 1]

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to error reporting service (Sentry, LogRocket, etc.)
    // In production, you should send this to your error tracking service
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('Error boundary caught:', error)
    }
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-md w-full text-center">
        {/* Error Icon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: bouncyEasing }}
          className="mb-8 flex justify-center"
        >
          <motion.div
            className="relative"
            animate={{
              rotate: [0, -10, 10, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="absolute inset-0 bg-red-500/10 blur-3xl rounded-full" />
            <div className="relative bg-red-100 rounded-3xl p-6">
              <AlertCircle className="w-16 h-16 text-red-600" />
            </div>
          </motion.div>
        </motion.div>

        {/* Error Message */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease: bouncyEasing }}
          className="text-3xl font-bold text-brand-navy mb-4"
        >
          משהו השתבש
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: bouncyEasing }}
          className="text-brand-gray-700 mb-8 leading-relaxed text-lg"
        >
          מצטערים, נתקלנו בשגיאה בלתי צפויה. אנחנו עובדים על תיקון הבעיה.
        </motion.p>

        {/* Error Details (Development Only) */}
        {process.env.NODE_ENV === 'development' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: bouncyEasing }}
            className="mb-8 p-4 bg-red-50 border-2 border-red-200 rounded-2xl text-right"
          >
            <p className="text-sm text-red-800 font-mono break-all">
              {error.message}
            </p>
            {error.digest && (
              <p className="text-xs text-red-600 mt-2">
                Error ID: {error.digest}
              </p>
            )}
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6, ease: bouncyEasing }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            onClick={reset}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.3, ease: bouncyEasing }
            }}
            whileTap={{
              scale: 0.95,
              transition: { duration: 0.3, ease: bouncyEasing }
            }}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-blue text-white font-semibold rounded-full shadow-lg hover:shadow-2xl transition-shadow"
          >
            <RefreshCw className="w-5 h-5" />
            נסה שוב
          </motion.button>

          <motion.div
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.3, ease: bouncyEasing }
            }}
            whileTap={{
              scale: 0.95,
              transition: { duration: 0.3, ease: bouncyEasing }
            }}
          >
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-brand-blue font-semibold rounded-full border-2 border-brand-blue hover:bg-brand-blue/5 transition-all"
            >
              <Home className="w-5 h-5" />
              חזרה לדף הבית
            </Link>
          </motion.div>
        </motion.div>

        {/* Support Link */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6, ease: bouncyEasing }}
          className="mt-8 text-sm text-brand-gray-500"
        >
          אם הבעיה נמשכת,{' '}
          <Link
            href="/contact"
            className="text-brand-blue hover:underline font-semibold"
          >
            צור איתנו קשר
          </Link>
        </motion.p>
      </div>
    </div>
  )
}
