import { ErrorBoundary } from 'react-error-boundary'
import {type ReactNode } from 'react'
import { ErrorFallback } from '@/components/ui/ErrorFallback'

interface ErrorBoundaryProviderProps {
    children: ReactNode
}

export function ErrorBoundaryProvider({ children }: ErrorBoundaryProviderProps) {
    const handleReset = () => {
        window.location.href = '/'
    }

    return (
        <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onReset={handleReset}>
            {children}
        </ErrorBoundary>
    )
}