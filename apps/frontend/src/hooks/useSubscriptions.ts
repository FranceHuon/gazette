import { useContext } from 'react'
import { SubscriptionContext } from '@/contexts/SubscriptionContext.types'

export function useSubscriptionsContext() {
  const context = useContext(SubscriptionContext)
  if (context === undefined) {
    throw new Error('useSubscriptionsContext must be used within a SubscriptionProvider')
  }
  return context
}
