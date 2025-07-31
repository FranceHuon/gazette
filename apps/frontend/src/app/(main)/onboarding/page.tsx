'use client'

import { Flex } from '@chakra-ui/react'
import MediaCard from '@/components/custom/MediaCard'
import { AuthGuard } from '@/components/guards/AuthGuard'
import { ResponsiveLayout } from '@/components/layout/ResponsiveLayout'
import { useMedias } from '@/hooks/useMedias'
import { useSubscriptionsContext } from '@/hooks/useSubscriptions'

function OnboardingPageContent() {
  const { medias } = useMedias()
  const { subscribe } = useSubscriptionsContext()

  const handleSubscribe = (mediaId: string) => {
    subscribe(mediaId)
  }

  return (
    <ResponsiveLayout>
      <Flex flexDirection="column" gap={4} flexGrow={1} height="100%">
        {medias.map(media => (
          <MediaCard
            key={media.id}
            media={media}
            onSubscribe={handleSubscribe}
          />
        ))}
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
