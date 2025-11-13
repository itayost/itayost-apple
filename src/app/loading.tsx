export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-apple-gray-50 to-white">
      <div className="text-center">
        {/* Spinning Loader */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-apple-blue/20 blur-3xl rounded-full animate-pulse" />
          <div className="relative">
            <div className="w-24 h-24 border-4 border-apple-gray-200 border-t-apple-blue rounded-full animate-spin" />
          </div>
        </div>

        {/* Loading Text */}
        <p className="text-apple-gray-600 text-lg font-medium animate-pulse">
          טוען...
        </p>
      </div>
    </div>
  )
}
