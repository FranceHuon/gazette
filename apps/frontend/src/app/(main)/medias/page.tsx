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

  const handleSubscribe = (mediaId: string) => {
    subscribe(mediaId)
  }

  const handleUnsubscribe = (mediaId: string) => {
    unsubscribe(mediaId)
  }

  return (
    <ResponsiveLayout>
      <Flex
        flexDirection="column"
        flexGrow={1}
        height="100%"
        gap={{ base: '24px', md: '32px', lg: '40px' }}
        width="100%"
      >
        <Heading
          as="h1"
          fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
          color="chaletGreen"
          mb={4}
          display={{ base: 'none', lg: 'block' }}
        >
          Médias
        </Heading>

        <Flex
          flexDirection="column"
          gap={{ base: '12px', md: '24px', lg: '32px' }}
          backgroundColor="lightGray"
          borderRadius={{ base: '20px', md: '30px', lg: '40px' }}
          padding={{ base: '24px', md: '32px', lg: '40px' }}
          marginBottom={{ base: '20px', md: '0' }}
        >
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
