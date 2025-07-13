import { CreateSubscriptionDto, SubscriptionDto } from '@gazette/shared'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useContext, useMemo } from 'react'
import { createSubscription, deleteSubscription, getUserSubscriptions } from '@/services/api/subscriptions'
import { AuthContext } from './AuthContext'
import { SubscriptionContext } from './SubscriptionContext.types'

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient()
  const context = useContext(AuthContext)
  const userId = context?.user?.id || ''

  const { data: subscriptions = [], isLoading, isError } = useQuery({
    queryKey: ['subscriptions', userId],
    queryFn: () => getUserSubscriptions(),
    enabled: !!userId,
    staleTime: 1000 * 60,
  })

  const createMutation = useMutation({
    mutationFn: (dto: CreateSubscriptionDto) => createSubscription(dto),
    onSuccess: () => {
      console.warn('Subscription created successfully')
      queryClient.invalidateQueries({ queryKey: ['subscriptions', userId] })
    },
    onError: (error) => {
      console.warn('Error creating subscription:', error)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (subscriptionId: string) => deleteSubscription(subscriptionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscriptions', userId] })
    },
    onError: (error) => {
      console.warn('Error deleting subscription:', error)
    },
  })

  const subscribe = (mediaId: string) => {
    console.warn('subscribe called with mediaId:', mediaId, 'userId:', userId)
    if (!userId) {
      console.warn('No userId found, returning early')
      return
    }
    console.warn('Calling createMutation with:', { userId, mediaId })
    createMutation.mutate({ userId, mediaId })
  }

  const unsubscribe = (mediaId: string) => {
    if (!userId)
      return
    const sub = subscriptions.find((s: SubscriptionDto) => s.mediaId === mediaId)
    if (sub)
      deleteMutation.mutate(sub.id)
  }

  const isSubscribed = (mediaId: string): boolean => {
    const subscribed = subscriptions.some((s: SubscriptionDto) => s.mediaId === mediaId)
    return subscribed
  }

  const value = useMemo(() => ({ subscriptions, isLoading, isError, subscribe, unsubscribe, isSubscribed }), [subscriptions, isLoading, isError])

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  )
}
