'use client'
import { Flex, Heading } from '@chakra-ui/react'
import { MediaDto } from '@gazette/shared'
import { useQuery } from '@tanstack/react-query'
import MediaCard from '@/components/custom/MediaCard'
import { AuthGuard } from '@/components/guards/AuthGuard'
import { api } from '@/config'
import { useAuth } from '@/hooks/useAuth'
import { useSubscriptionsContext } from '@/hooks/useSubscriptions'

function SubscriptionsPageContent() {
  const { user } = useAuth()

  const { data: medias } = useQuery<MediaDto[]>({
    queryKey: ['medias'],
    queryFn: async () => await api.get('medias').json(),
    enabled: !!user,
  })

  const { subscribe, unsubscribe, isSubscribed } = useSubscriptionsContext()
  const subscribedMedias = medias?.filter(media => isSubscribed(media.id)) || []
  const unsubscribedMedias = medias?.filter(media => !isSubscribed(media.id)) || []

  const handleSubscribe = (mediaId: string) => {
    subscribe(mediaId)
  }

  const handleUnsubscribe = (mediaId: string) => {
    unsubscribe(mediaId)
  }

  return (
    <Flex>
      <Heading>Vos abonnements</Heading>
      <Flex gap="60px" flexWrap="wrap" justifyContent="center">
        {subscribedMedias.map(media => (
          <MediaCard
            key={media.id}
            media={media}
            onSubscribe={handleSubscribe}
            onUnsubscribe={handleUnsubscribe}
            isSubscribed={isSubscribed}
            width="400px"
            height="400px"
          />
        ))}
      </Flex>

      <Heading>Médias disponibles</Heading>
      <Flex gap="60px" flexWrap="wrap" justifyContent="center">
        {unsubscribedMedias.map(media => (
          <MediaCard
            key={media.id}
            media={media}
            onSubscribe={handleSubscribe}
            onUnsubscribe={handleUnsubscribe}
            isSubscribed={isSubscribed}
            width="400px"
            height="400px"
          />
        ))}
      </Flex>
    </Flex>
  )
}

export default function SubscriptionsPage() {
  return (
    <AuthGuard>
      <SubscriptionsPageContent />
    </AuthGuard>
  )
}
