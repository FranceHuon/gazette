import { SubscriptionContext } from '@/contexts/SubscriptionContext.types'
import { useContextSafe } from './useContext'

export function useSubscriptionsContext() {
  return useContextSafe(SubscriptionContext, 'useSubscriptionsContext must be used within a SubscriptionProvider')
}
