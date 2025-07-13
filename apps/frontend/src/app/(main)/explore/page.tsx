'use client'

import { Flex, Heading, VStack } from '@chakra-ui/react'
import RssCard from '@/components/custom/RssCard'
import { AuthGuard } from '@/components/guards/AuthGuard'
import { ResponsiveLayout } from '@/components/layout/ResponsiveLayout'
import Title from '@/components/layout/Title'
import { useAuth } from '@/hooks/useAuth'
import { useContents } from '@/hooks/useContents'

function ExplorePageContent() {
  const { user } = useAuth()

  const { contents } = useContents()

  return (
    <ResponsiveLayout>
      <VStack spacing={8} align="stretch">
        <Title text={`Bienvenue ${user?.pseudo || user?.email || 'Utilisateur'}`} fontColor="color.chaletGreen" />

        <Heading>Vos articles</Heading>
        <Flex gap="20px" flexWrap="wrap" justifyContent="space-between">
          {' '}
          {contents.map(content => (
            <RssCard
              key={content.title}
              title={content.title}
              link={content.link}
              pubDate={content.pubDate}
              description={content.description}
              source={content.source}
              logo={content.logo}
            />
          ))}
        </Flex>
      </VStack>
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
