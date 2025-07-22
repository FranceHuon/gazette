'use client'

import { Flex, Heading, VStack } from '@chakra-ui/react'
import RssCard from '@/components/custom/RssCard'
import { AuthGuard } from '@/components/guards/AuthGuard'
import { ResponsiveLayout } from '@/components/layout/ResponsiveLayout'
import Title from '@/components/layout/Title'
import { CardGrid } from '@/components/ui/responsive-grid'
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
      <Flex
        flexDirection="column"
        gap={{ base: '24px', md: '32px', lg: '40px' }}
        width="100%"
      >
        <Title
          text={`Bienvenue ${user?.pseudo || user?.email || 'Utilisateur'}`}
          fontColor="color.chaletGreen"
        />

        <VStack spacing={{ base: '16px', md: '24px', lg: '32px' }} align="stretch">
          <Heading
            fontSize={{ base: 'xl', md: '2xl', lg: '3xl' }}
            color="color.chaletGreen"
          >
            Vos articles
          </Heading>
          <CardGrid>
            {likedContents.map(content => (
              <RssCard
                key={content.id}
                content={content}
                like={handleLike}
                dislike={handleDislike}
                isLiked={isLiked}
              />
            ))}
          </CardGrid>
        </VStack>

        <VStack spacing={{ base: '16px', md: '24px', lg: '32px' }} align="stretch">
          <Heading
            fontSize={{ base: 'xl', md: '2xl', lg: '3xl' }}
            color="color.chaletGreen"
          >
            Articles qui pourraient vous intéresser
          </Heading>
          <CardGrid>
            {unlikedContents.map(content => (
              <RssCard
                key={content.id}
                content={content}
                like={handleLike}
                dislike={handleDislike}
                isLiked={isLiked}
              />
            ))}
          </CardGrid>
        </VStack>
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
