'use client'

import { Flex, Heading, Text, VStack } from '@chakra-ui/react'
import { Rss } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import EmptyState from '@/components/custom/EmptyState'
import MediaCard from '@/components/custom/MediaCard'
import { AuthGuard } from '@/components/guards/AuthGuard'
import { ResponsiveLayout } from '@/components/layout/ResponsiveLayout'
import { useMedias } from '@/hooks/useMedias'
import { useSubscriptionsContext } from '@/hooks/useSubscriptions'

function MediasPageContent() {
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
    <ResponsiveLayout>
      <Flex
        flexDirection="column"
        flexGrow={1}
        height="100%"
        gap={{ base: '24px', md: '32px', lg: '40px' }}
        width="100%"
      >
        <VStack spacing={2} align="start" display={{ base: 'none', lg: 'flex' }} mb={6}>
          <Heading
            as="h1"
            fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
            color="chaletGreen"
            fontWeight="bold"
          >
            {t('navigation.medias')}
          </Heading>
          <Text
            fontSize={{ base: 'md', md: 'lg' }}
            color="gray.600"
            maxW="600px"
          >
            {t('explanations.mediasPage.subtitle')}
          </Text>
          <Text
            fontSize={{ base: 'sm', md: 'md' }}
            color="gray.600"
            maxW="700px"
          >
            {t('explanations.mediasPage.description')}
          </Text>
        </VStack>

        <Flex
          flexDirection="column"
          gap={{ base: '12px', md: '24px', lg: '32px' }}
          backgroundColor="lightGray"
          borderRadius={{ base: '20px', md: '30px', lg: '40px' }}
          padding={{ base: '24px', md: '32px', lg: '40px' }}
          marginBottom={{ base: '20px', md: '0' }}
        >
          {medias && medias.length > 0
            ? (
                medias.map((media, index) => (
                  <MediaCard
                    key={media.id}
                    media={media}
                    onSubscribe={handleSubscribe}
                    onUnsubscribe={handleUnsubscribe}
                    isSubscribed={isSubscribed}
                    isFirst={index === 0}
                    isLast={index === medias.length - 1}
                  />
                ))
              )
            : (
                <EmptyState
                  icon={Rss}
                  title={t('emptyStates.noMedias.title')}
                  description={t('emptyStates.noMedias.description')}
                  actionText={t('emptyStates.noMedias.actionText')}
                  onAction={() => window.location.reload()}
                />
              )}
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
