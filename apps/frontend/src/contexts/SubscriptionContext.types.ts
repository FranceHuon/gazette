import { SubscriptionDto } from '@gazette/shared'
import { createContext } from 'react'

export interface SubscriptionContextType {
  subscriptions: SubscriptionDto[]
  isLoading: boolean
  isError: boolean
  subscribe: (mediaId: string) => void
  unsubscribe: (mediaId: string) => void
  isSubscribed: (mediaId: string) => boolean
}

export const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined)
