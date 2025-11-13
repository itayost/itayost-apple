'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertCircle, Home, RefreshCw } from 'lucide-react'

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-gray-50 to-white px-4">
      <div className="max-w-md w-full text-center">
        {/* Error Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full" />
            <div className="relative bg-red-100 rounded-full p-6">
              <AlertCircle className="w-16 h-16 text-red-600" />
            </div>
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-3xl font-bold text-brand-gray-900 mb-4">
          משהו השתבש
        </h1>
        <p className="text-brand-gray-600 mb-8 leading-relaxed">
          מצטערים, נתקלנו בשגיאה בלתי צפויה. אנחנו עובדים על תיקון הבעיה.
        </p>

        {/* Error Details (Development Only) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-right">
            <p className="text-sm text-red-800 font-mono break-all">
              {error.message}
            </p>
            {error.digest && (
              <p className="text-xs text-red-600 mt-2">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-blue text-white font-medium rounded-full hover:bg-brand-blue/90 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <RefreshCw className="w-5 h-5" />
            נסה שוב
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-brand-blue font-medium rounded-full border-2 border-brand-blue hover:bg-brand-blue/5 transition-all duration-200 hover:scale-105"
          >
            <Home className="w-5 h-5" />
            חזרה לדף הבית
          </Link>
        </div>

        {/* Support Link */}
        <p className="mt-8 text-sm text-brand-gray-500">
          אם הבעיה נמשכת,{' '}
          <Link
            href="/contact"
            className="text-brand-blue hover:underline font-medium"
          >
            צור איתנו קשר
          </Link>
        </p>
      </div>
    </div>
  )
}
