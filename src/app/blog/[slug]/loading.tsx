export default function BlogPostLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-gray-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <article className="max-w-4xl mx-auto">
          {/* Header Skeleton */}
          <div className="mb-8 space-y-4">
            <div className="h-12 w-3/4 bg-brand-gray-200 rounded-lg animate-pulse" />
            <div className="flex gap-4 items-center">
              <div className="h-4 w-32 bg-brand-gray-200 rounded animate-pulse" />
              <div className="h-4 w-24 bg-brand-gray-200 rounded animate-pulse" />
              <div className="h-4 w-20 bg-brand-gray-200 rounded animate-pulse" />
            </div>
          </div>

          {/* Featured Image Skeleton */}
          <div className="h-96 w-full bg-brand-gray-200 rounded-2xl mb-8 animate-pulse" />

          {/* Content Skeleton */}
          <div className="prose prose-lg max-w-none space-y-4">
            <div className="h-4 w-full bg-brand-gray-200 rounded animate-pulse" />
            <div className="h-4 w-full bg-brand-gray-200 rounded animate-pulse" />
            <div className="h-4 w-5/6 bg-brand-gray-200 rounded animate-pulse" />
            <div className="h-4 w-full bg-brand-gray-200 rounded animate-pulse" />
            <div className="h-4 w-4/5 bg-brand-gray-200 rounded animate-pulse" />

            <div className="h-8" />

            <div className="h-4 w-full bg-brand-gray-200 rounded animate-pulse" />
            <div className="h-4 w-full bg-brand-gray-200 rounded animate-pulse" />
            <div className="h-4 w-3/4 bg-brand-gray-200 rounded animate-pulse" />
          </div>

          {/* Loading Text */}
          <div className="text-center mt-12">
            <p className="text-brand-gray-600 animate-pulse">טוען מאמר...</p>
          </div>
        </article>
      </div>
    </div>
  )
}
