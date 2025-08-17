'use client'

import { Flex, Heading } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import MediaCard from '@/components/custom/MediaCard'
import { AuthGuard } from '@/components/guards/AuthGuard'
import { ResponsiveLayout } from '@/components/layout/ResponsiveLayout'
import { CardGrid } from '@/components/ui/responsive-grid'
import { useMedias } from '@/hooks/useMedias'
import { useSubscriptionsContext } from '@/hooks/useSubscriptions'

function OnboardingPageContent() {
  const { t } = useTranslation()
  const { medias } = useMedias()
  const { subscribe, unsubscribe, isSubscribed } = useSubscriptionsContext()

  const handleSubscribe = (mediaId: string) => {
    subscribe(mediaId)
  }
  const handleUnsubscribe = (mediaId: string) => {
    unsubscribe(mediaId)
  }

  return (
    <ResponsiveLayout backgroundColor="lightGray">
      <Flex flexDirection="column" gap={{ base: '24px', md: '32px', lg: '40px' }} width="100%">
        <Flex direction="column" gap={{ base: '16px', md: '24px', lg: '32px' }} align="stretch">
          <Heading
            as="h1"
            fontSize={{ base: 'xl', md: '2xl', lg: '3xl' }}
            color="chaletGreen"
          >
            {t('subscriptions.availableMediasTitle')}
          </Heading>
          <CardGrid>
            {medias.map(media => (
              <MediaCard
                key={media.id}
                media={media}
                onSubscribe={handleSubscribe}
                onUnsubscribe={handleUnsubscribe}
                isSubscribed={isSubscribed}
              />
            ))}
          </CardGrid>
        </Flex>
      </Flex>
    </ResponsiveLayout>
  )
}

export default function OnboardingPage() {
  return (
    <AuthGuard>
      <OnboardingPageContent />
    </AuthGuard>
  )
}
