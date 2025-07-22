'use client'
import { Flex, Heading } from '@chakra-ui/react'
import MediaCard from '@/components/custom/MediaCard'
import { AuthGuard } from '@/components/guards/AuthGuard'
import { useMedias } from '@/hooks/useMedias'
import { useSubscriptionsContext } from '@/hooks/useSubscriptions'

function SubscriptionsPageContent() {
  const { medias } = useMedias()
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
