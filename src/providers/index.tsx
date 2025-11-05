import { type ReactNode } from 'react';
import { TenStackProvider } from './tenStackProvider';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundaryProvider } from './ErrorBoundaryProvider';

export function AppProviders({ children }: { children: ReactNode }) {
    return (
        <ErrorBoundaryProvider>
        <BrowserRouter>
            <TenStackProvider>
                {children}
            </TenStackProvider>
        </BrowserRouter>
        </ErrorBoundaryProvider>
    );
}
