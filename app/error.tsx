'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-prose text-center">
        <h1 className="text-3xl font-bold mb-2">Something went wrong</h1>
        <p className="text-sm text-muted-foreground mb-4">
          {error.message || 'An unexpected error occurred'}
        </p>
        <div className="mt-6 flex gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Try again
          </button>
          <a
            href="/"
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  )
}