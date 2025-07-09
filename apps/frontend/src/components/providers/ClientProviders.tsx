'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from '@/components/ui/provider'
import { AuthProvider } from '@/contexts/AuthContext'
import { SubscriptionProvider } from '@/contexts/SubscriptionsContext'
import I18nProvider from './I18nProvider'

const queryClient = new QueryClient()

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider>
      <QueryClientProvider client={queryClient}>
        <Provider>
          <AuthProvider>
            <SubscriptionProvider>
              {children}
            </SubscriptionProvider>
          </AuthProvider>
        </Provider>
      </QueryClientProvider>
    </I18nProvider>
  )
}
