'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertCircle, ArrowRight, RefreshCw } from 'lucide-react'

export default function BlogPostError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to error reporting service
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('Blog post error:', error)
    }
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-apple-gray-50 to-white">
      <div className="container mx-auto px-4 py-16 sm:py-24">
        <div className="max-w-2xl mx-auto text-center">
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
          <h1 className="text-3xl sm:text-4xl font-bold text-apple-gray-900 mb-4">
            שגיאה בטעינת הפוסט
          </h1>
          <p className="text-lg text-apple-gray-600 mb-8 leading-relaxed">
            מצטערים, לא הצלחנו לטעון את הפוסט. ייתכן שהוא הוסר או שיש בעיה זמנית בשרת.
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
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-apple-blue text-white font-medium rounded-full hover:bg-apple-blue/90 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <RefreshCw className="w-5 h-5" />
              נסה שוב
            </button>

            <Link
              href="/blog"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-apple-blue font-medium rounded-full border-2 border-apple-blue hover:bg-apple-blue/5 transition-all duration-200 hover:scale-105"
            >
              חזרה לבלוג
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
