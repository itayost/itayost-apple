export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-gray-50 to-white">
      <div className="container mx-auto px-4 py-16">
        {/* Header Skeleton */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="h-12 w-64 bg-brand-gray-200 rounded-lg mx-auto mb-6 animate-pulse" />
          <div className="h-6 w-96 bg-brand-gray-200 rounded-lg mx-auto animate-pulse" />
        </div>

        {/* Blog Posts Grid Skeleton */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Image Skeleton */}
              <div className="h-48 bg-brand-gray-200 animate-pulse" />

              {/* Content Skeleton */}
              <div className="p-6 space-y-4">
                <div className="h-4 w-20 bg-brand-gray-200 rounded animate-pulse" />
                <div className="h-6 w-full bg-brand-gray-200 rounded animate-pulse" />
                <div className="h-4 w-3/4 bg-brand-gray-200 rounded animate-pulse" />
                <div className="flex gap-2 pt-4">
                  <div className="h-6 w-16 bg-brand-gray-200 rounded-full animate-pulse" />
                  <div className="h-6 w-16 bg-brand-gray-200 rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Loading Text */}
        <div className="text-center mt-12">
          <p className="text-brand-gray-600 animate-pulse">טוען פוסטים...</p>
        </div>
      </div>
    </div>
  )
}
