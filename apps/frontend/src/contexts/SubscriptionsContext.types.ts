import { SubscriptionDto } from '@gazette/shared'
import { createContext } from 'react'

export interface SubscriptionsContextType {
  subscriptions: SubscriptionDto[]
  isLoading: boolean
  isError: boolean
  subscribe: (mediaId: string) => void
  unsubscribe: (mediaId: string) => void
  isSubscribed: (mediaId: string) => boolean
}

export const SubscriptionsContext = createContext<SubscriptionsContextType | undefined>(undefined)
