export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-prose text-center">
        <h1 className="text-3xl font-bold mb-2">404 — Page not found</h1>
        <p className="text-sm text-muted-foreground">
          The page you are looking for does not exist. Return to the home page or use the
          navigation to find what you need.
        </p>
        <div className="mt-6">
          <a href="/" className="text-blue-600 underline">Go home</a>
        </div>
      </div>
    </div>
  )
}
