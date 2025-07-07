import { CreateSubscriptionDto, SubscriptionDto } from '@gazette/shared'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createSubscription, deleteSubscription, getUserSubscriptions } from '@/services/api/subscriptions'

export function useSubscription(userId: string) {
  const queryClient = useQueryClient()

  const { data: subscriptions = [], isLoading, isError } = useQuery<SubscriptionDto[]>({
    queryKey: ['subscriptions', userId],
    queryFn: () => getUserSubscriptions(userId!),
    enabled: !!userId,
  })

  const create = useMutation({
    mutationFn: (dto: CreateSubscriptionDto) => createSubscription(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscriptions', userId] })
    },
  })

  const remove = useMutation({
    mutationFn: (subscriptionId: string) => deleteSubscription(subscriptionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscriptions', userId] })
    },
  })

  const isSubscribed = (mediaId: string): boolean => {
    return subscriptions.some(s => s.mediaId === mediaId)
  }

  const getSubscriptionId = (mediaId: string): string | undefined => {
    return subscriptions.find(s => s.mediaId === mediaId)?.id
  }

  return {
    subscriptions,
    isLoading,
    isError,
    create,
    remove,
    isSubscribed,
    getSubscriptionId,
    subscribe: (mediaId: string) => {
      if (!userId)
        return
      create.mutate({ userId, mediaId })
    },
    unsubscribe: (mediaId: string) => {
      const id = getSubscriptionId(mediaId)
      if (id)
        remove.mutate(id)
    },
  }
}
