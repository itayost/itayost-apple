export default function ContactLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-apple-gray-50 to-white">
      <div className="container mx-auto px-4 py-16">
        {/* Header Skeleton */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="h-12 w-64 bg-apple-gray-200 rounded-lg mx-auto mb-6 animate-pulse" />
          <div className="h-6 w-96 bg-apple-gray-200 rounded-lg mx-auto animate-pulse" />
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Contact Form Skeleton */}
          <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
            <div className="h-6 w-32 bg-apple-gray-200 rounded animate-pulse mb-8" />

            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 w-24 bg-apple-gray-200 rounded animate-pulse" />
                <div className="h-12 w-full bg-apple-gray-200 rounded-lg animate-pulse" />
              </div>
            ))}

            <div className="h-12 w-full bg-apple-blue/20 rounded-full animate-pulse mt-8" />
          </div>

          {/* Contact Info Skeleton */}
          <div className="space-y-6">
            <div className="h-6 w-40 bg-apple-gray-200 rounded animate-pulse mb-8" />

            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-12 h-12 bg-apple-gray-200 rounded-full animate-pulse flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-5 w-32 bg-apple-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-48 bg-apple-gray-200 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-center mt-12">
          <p className="text-apple-gray-600 animate-pulse">טוען טופס יצירת קשר...</p>
        </div>
      </div>
    </div>
  )
}
