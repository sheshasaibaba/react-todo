export function ErrorFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <div className="mb-4 flex justify-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <span className="text-3xl">⚠️</span>
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
          Oops! Something went wrong
        </h1>
        
        <p className="text-gray-600 text-center mb-4">
          We're sorry for the inconvenience. An unexpected error occurred.
        </p>

        <div className="flex gap-3">
          <button
            onClick={() => window.location.href = '/'}
            className="flex-1 px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition font-medium"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  )
}
