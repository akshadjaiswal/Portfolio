'use client'

import { AlertTriangle, RefreshCw } from 'lucide-react'

interface ErrorFallbackProps {
  error?: Error
  resetError?: () => void
  title?: string
  message?: string
  showDetails?: boolean
}

/**
 * ErrorFallback component for displaying user-friendly error messages
 *
 * Features:
 * - Theme-aware styling (light/dark mode)
 * - Customizable title and message
 * - Optional error details display
 * - Retry button with loading state
 * - Accessible with ARIA labels
 */
export function ErrorFallback({
  error,
  resetError,
  title = 'Something went wrong',
  message = 'We encountered an unexpected error. Please try again.',
  showDetails = true
}: ErrorFallbackProps) {
  return (
    <div className="flex items-center justify-center min-h-[300px] p-6 rounded-lg bg-white dark:bg-portfolio-surface border border-portfolio-border dark:border-portfolio-border">
      <div className="max-w-md w-full text-center space-y-4">
        {/* Error Icon */}
        <div className="flex justify-center">
          <div className="rounded-full bg-red-100 dark:bg-red-900/20 p-3">
            <AlertTriangle
              className="h-8 w-8 text-red-600 dark:text-red-400"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Error Title */}
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>

        {/* Error Message */}
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          {message}
        </p>

        {/* Error Details (Expandable) */}
        {showDetails && error && (
          <details className="text-left">
            <summary className="cursor-pointer text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
              View technical details
            </summary>
            <div className="mt-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-md border border-gray-200 dark:border-gray-700">
              <p className="text-xs font-mono text-red-600 dark:text-red-400 break-words">
                {error.message}
              </p>
              {error.stack && (
                <pre className="mt-2 text-xs text-gray-600 dark:text-gray-400 overflow-auto max-h-32">
                  {error.stack}
                </pre>
              )}
            </div>
          </details>
        )}

        {/* Retry Button */}
        {resetError && (
          <div className="pt-2">
            <button
              onClick={resetError}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-portfolio-silver dark:bg-white text-white dark:text-gray-900 rounded-lg font-medium hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-portfolio-silver focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-all"
              aria-label="Retry loading content"
            >
              <RefreshCw className="h-4 w-4" aria-hidden="true" />
              Try Again
            </button>
          </div>
        )}

        {/* Help Text */}
        <p className="text-xs text-gray-500 dark:text-gray-400 pt-2">
          If this problem persists, try refreshing the page or{' '}
          <a
            href="https://github.com/akshadjaiswal"
            target="_blank"
            rel="noopener noreferrer"
            className="text-portfolio-silver dark:text-white hover:underline"
          >
            report the issue
          </a>
        </p>
      </div>
    </div>
  )
}

export default ErrorFallback
