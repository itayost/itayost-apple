// Bouncy easing for Mailchimp-style animations
const bouncyEasing = [0.34, 1.56, 0.64, 1]

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        {/* Spinning Loader */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-brand-blue/10 blur-3xl rounded-full animate-pulse" />
          <div className="relative">
            <div className="w-24 h-24 border-4 border-brand-gray-200 border-t-brand-blue rounded-full animate-spin" />
          </div>
        </div>

        {/* Loading Text */}
        <p className="text-brand-gray-700 text-lg font-semibold animate-pulse">
          טוען...
        </p>
      </div>
    </div>
  )
}
