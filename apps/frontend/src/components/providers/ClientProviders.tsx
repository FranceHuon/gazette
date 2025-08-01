'use client'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { AuthProvider } from '@/contexts/AuthContext'
import { LikeProvider } from '@/contexts/LikeContext'
import { SubscriptionProvider } from '@/contexts/SubscriptionContext'
import { theme } from '../../theme/theme'
import I18nProvider from './I18nProvider'

const queryClient = new QueryClient()

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <AuthProvider>
            <SubscriptionProvider>
              <LikeProvider>
                {children}
              </LikeProvider>
            </SubscriptionProvider>
          </AuthProvider>
        </ChakraProvider>
      </QueryClientProvider>
    </I18nProvider>
  )
}
