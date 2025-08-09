import { CreateSubscriptionDto, SubscriptionDto } from '@gazette/shared'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { use, useCallback, useMemo } from 'react'
import { createSubscription, deleteSubscription, getUserSubscriptions } from '@/services/api/subscriptions'
import { AuthContext } from './AuthContext'
import { SubscriptionContext } from './SubscriptionContext.types'

interface SubscriptionProviderProps {
  children: React.JSX.Element | React.JSX.Element[]
}

export function SubscriptionProvider({ children }: SubscriptionProviderProps) {
  const queryClient = useQueryClient()
  const context = use(AuthContext)
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

  const subscribe = useCallback((mediaId: string) => {
    if (!userId) {
      return
    }
    createMutation.mutate({ mediaId })
  }, [userId, createMutation])

  const unsubscribe = useCallback((mediaId: string) => {
    if (!userId)
      return
    const sub = subscriptions.find((s: SubscriptionDto) => s.mediaId === mediaId)
    if (sub)
      deleteMutation.mutate(sub.id)
  }, [userId, subscriptions, deleteMutation])

  const isSubscribed = useCallback((mediaId: string): boolean => {
    const subscribed = subscriptions.some((s: SubscriptionDto) => s.mediaId === mediaId)
    return subscribed
  }, [subscriptions])

  const value = useMemo(() => ({ subscriptions, isLoading, isError, subscribe, unsubscribe, isSubscribed }), [subscriptions, isLoading, isError, subscribe, unsubscribe, isSubscribed])

  return (
    <SubscriptionContext value={value}>
      {children}
    </SubscriptionContext>
  )
}
