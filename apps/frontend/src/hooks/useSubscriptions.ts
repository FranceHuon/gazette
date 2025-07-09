import { useContext } from 'react'
import { SubscriptionsContext } from '@/contexts/SubscriptionsContext.types'

export function useSubscriptionsContext() {
  const context = useContext(SubscriptionsContext)
  if (context === undefined) {
    throw new Error('useSubscriptionsContext must be used within a SubscriptionProvider')
  }
  return context
}
