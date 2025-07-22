'use client'

import { Flex, Heading, VStack } from '@chakra-ui/react'
import RssCard from '@/components/custom/RssCard'
import { AuthGuard } from '@/components/guards/AuthGuard'
import { ResponsiveLayout } from '@/components/layout/ResponsiveLayout'
import Title from '@/components/layout/Title'
import { useAuth } from '@/hooks/useAuth'
import { useContents } from '@/hooks/useContents'
import { useLikes } from '@/hooks/useLikes'

function ExplorePageContent() {
  const { user } = useAuth()
  const { contents } = useContents()
  const { like, dislike, isLiked } = useLikes()

  const likedContents = contents?.filter(content => isLiked(content.id)) || []
  const unlikedContents = contents?.filter(content => !isLiked(content.id)) || []

  const handleLike = (contentId: string) => {
    like(contentId)
  }

  const handleDislike = (contentId: string) => {
    dislike(contentId)
  }

  return (
    <ResponsiveLayout>
      <Flex flexDirection="column" gap="40px" padding="40px" width="100%">
        <Title text={`Bienvenue ${user?.pseudo || user?.email || 'Utilisateur'}`} fontColor="color.chaletGreen" />

        <Heading>Vos articles</Heading>
        <Flex gap="40px" flexWrap="wrap" justifyContent="space-between" margin="40px">
          {likedContents.map(content => (
            <RssCard
              key={content.id}
              content={content}
              like={handleLike}
              dislike={handleDislike}
              isLiked={isLiked}
            />
          ))}
        </Flex>
        <Heading>Articles qui pourraient vous intéresser</Heading>
        <Flex gap="40px" flexWrap="wrap" justifyContent="space-between" margin="40px">
          {unlikedContents.map(content => (
            <RssCard
              key={content.id}
              content={content}
              like={handleLike}
              dislike={handleDislike}
              isLiked={isLiked}
            />
          ))}
        </Flex>
        </Flex>
    </ResponsiveLayout>
  )
}

export default function ExplorePage() {
  return (
    <AuthGuard>
      <ExplorePageContent />
    </AuthGuard>
  )
}
