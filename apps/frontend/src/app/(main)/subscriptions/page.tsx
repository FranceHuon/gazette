'use client'

import { Flex, Heading, VStack } from '@chakra-ui/react'
import MediaCard from '@/components/custom/MediaCard'
import { AuthGuard } from '@/components/guards/AuthGuard'
import { ResponsiveLayout } from '@/components/layout/ResponsiveLayout'
import { CardGrid } from '@/components/ui/responsive-grid'
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
    <ResponsiveLayout>
      <Flex flexDirection="column" gap={{ base: '24px', md: '32px', lg: '40px' }} width="100%">
        <VStack spacing={{ base: '16px', md: '24px', lg: '32px' }} align="stretch">
          <Heading
            fontSize={{ base: 'xl', md: '2xl', lg: '3xl' }}
            color="chaletGreen"
          >
            Vos abonnements
          </Heading>
          <CardGrid>
            {subscribedMedias.map(media => (
              <MediaCard
                key={media.id}
                media={media}
                onSubscribe={handleSubscribe}
                onUnsubscribe={handleUnsubscribe}
                isSubscribed={isSubscribed}
              />
            ))}
          </CardGrid>
        </VStack>

        <VStack spacing={{ base: '16px', md: '24px', lg: '32px' }} align="stretch">
          <Heading
            fontSize={{ base: 'xl', md: '2xl', lg: '3xl' }}
            color="chaletGreen"
          >
            Médias disponibles
          </Heading>
          <CardGrid>
            {unsubscribedMedias.map(media => (
              <MediaCard
                key={media.id}
                media={media}
                onSubscribe={handleSubscribe}
                onUnsubscribe={handleUnsubscribe}
                isSubscribed={isSubscribed}
              />
            ))}
          </CardGrid>
        </VStack>
      </Flex>
    </ResponsiveLayout>
  )
}

export default function SubscriptionsPage() {
  return (
    <AuthGuard>
      <SubscriptionsPageContent />
    </AuthGuard>
  )
}
