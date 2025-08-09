import { use } from 'react'
import { SubscriptionContext } from '@/contexts/SubscriptionContext.types'

export function useSubscriptionsContext() {
  const context = use(SubscriptionContext)
  if (context === undefined) {
    throw new Error('useSubscriptionsContext must be used within a SubscriptionProvider')
  }
  return context
}
