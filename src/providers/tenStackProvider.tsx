import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import {type ReactNode } from 'react';

const queryClient = new QueryClient()

type TenStackProviderProps = {
    children : ReactNode
}


export function TenStackProvider({children}:TenStackProviderProps) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}