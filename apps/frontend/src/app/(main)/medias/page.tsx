'use client'

import { Flex, Heading } from '@chakra-ui/react'
import MediaCard from '@/components/custom/MediaCard'
import { AuthGuard } from '@/components/guards/AuthGuard'
import { ResponsiveLayout } from '@/components/layout/ResponsiveLayout'
import { useMedias } from '@/hooks/useMedias'
import { useSubscriptionsContext } from '@/hooks/useSubscriptions'

function MediasPageContent() {
  const { medias } = useMedias()
  const { subscribe, unsubscribe, isSubscribed } = useSubscriptionsContext()

  // const subscribedMedias = medias?.filter(media => isSubscribed(media.id)) || []
  // const unsubscribedMedias = medias?.filter(media => !isSubscribed(media.id)) || []

  const handleSubscribe = (mediaId: string) => {
    subscribe(mediaId)
  }

  const handleUnsubscribe = (mediaId: string) => {
    unsubscribe(mediaId)
  }

  return (
    <ResponsiveLayout backgroundColor="lightGray">
      <Flex flexDirection="column" gap={{ base: 12, md: 4 }} flexGrow={1} height="100%">
        <Heading as="h1" fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }} color="chaletGreen" mb={4}>
          Médias
        </Heading>
        {medias?.map((media, index) => (
          <MediaCard
            key={media.id}
            media={media}
            onSubscribe={handleSubscribe}
            onUnsubscribe={handleUnsubscribe}
            isSubscribed={isSubscribed}
            isFirst={index === 0}
            isLast={index === medias.length - 1}
          />
        ))}
      </Flex>
    </ResponsiveLayout>
  )
}

export default function SubscriptionsPage() {
  return (
    <AuthGuard>
      <MediasPageContent />
    </AuthGuard>
  )
}
