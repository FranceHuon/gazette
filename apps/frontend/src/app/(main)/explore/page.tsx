'use client'

import { Flex, Heading, VStack } from '@chakra-ui/react'
import RssCard from '@/components/custom/RssCard'
import { AuthGuard } from '@/components/guards/AuthGuard'
import { ResponsiveLayout } from '@/components/layout/ResponsiveLayout'
import { CardGrid } from '@/components/ui/responsive-grid'
import { useContents } from '@/hooks/useContents'
import { useLikes } from '@/hooks/useLikes'

function ExplorePageContent() {
  const { contents } = useContents()
  const { like, dislike, isLiked } = useLikes()

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
        flexGrow={1}
        height="100%"
        gap={{ base: '24px', md: '32px', lg: '40px' }}
        width="100%"
      >

        <VStack spacing={{ base: '16px', md: '24px', lg: '32px' }} align="stretch">
          <Heading
            fontSize={{ base: 'xl', md: '2rem', lg: '3rem' }}
            color="chaletGreen"
          >
            Articles qui pourraient vous intéresser
          </Heading>
          <CardGrid>
            {contents.map(content => (
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
