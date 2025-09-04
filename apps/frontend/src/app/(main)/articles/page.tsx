'use client'

import { Flex, Heading, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from '@chakra-ui/react'
import { BookOpen, Heart } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import EmptyState from '@/components/custom/EmptyState'
import RssCard from '@/components/custom/RssCard'
import { AuthGuard } from '@/components/guards/AuthGuard'
import { ResponsiveLayout } from '@/components/layout/ResponsiveLayout'
import { CardGrid } from '@/components/ui/responsive-grid'
import { useContents } from '@/hooks/useContents'
import { useLikes } from '@/hooks/useLikes'

function ArticlesPageContent() {
  const { t } = useTranslation()
  const { contents } = useContents()
  const { like, dislike, isLiked } = useLikes()
  const [activeTabIndex, setActiveTabIndex] = useState(0)

  const nonLikedContents = contents.filter(content => !isLiked(content.id))
  const likedContents = contents.filter(content => isLiked(content.id))

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
        <VStack spacing={2} align="start" display={{ base: 'none', lg: 'flex' }} mb={6}>
          <Heading
            as="h1"
            fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
            color="chaletGreen"
            fontWeight="bold"
          >
            {t('navigation.articles')}
          </Heading>
          <Text
            fontSize={{ base: 'md', md: 'lg' }}
            color="gray.600"
            maxW="600px"
          >
            {t('explanations.articlesPage.subtitle')}
          </Text>
        </VStack>

        <VStack spacing={{ base: '16px', md: '24px', lg: '32px' }} align="stretch">
          <Tabs isManual variant="unstyled" onChange={index => setActiveTabIndex(index)}>
            <TabList border="none" role="tablist" aria-label={t('aria.articleTabs')}>
              <Tab
                backgroundColor="white"
                borderTopLeftRadius={{ base: '20px', md: '30px', lg: '40px' }}
                borderTopRightRadius={{ base: '20px', md: '30px', lg: '40px' }}
                _selected={{
                  'backgroundColor': 'lightGray',
                  'transform': 'translateY(2px)',
                  '& h2': {
                    color: 'darkGreen',
                  },
                }}
                transition="all 0.2s ease"
              >
                <Heading
                  as="h2"
                  fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
                  color="chaletGreen"
                  px={4}
                  py={4}
                  cursor="pointer"
                  fontWeight="semibold"
                  _hover={{
                    transform: 'translateY(-2px) scale(1.1)',
                  }}
                >
                  {t('pages.toExplore')}
                </Heading>
              </Tab>
              <Tab
                backgroundColor="white"
                borderTopLeftRadius={{ base: '20px', md: '30px', lg: '40px' }}
                borderTopRightRadius={{ base: '20px', md: '30px', lg: '40px' }}
                _selected={{
                  'backgroundColor': 'lightGray',
                  'transform': 'translateY(2px)',
                  '& h2': {
                    color: 'darkGreen',
                  },
                }}

                transition="all 0.2s ease"
              >
                <Heading
                  as="h2"
                  fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
                  color="chaletGreen"
                  px={4}
                  py={4}
                  cursor="pointer"
                  fontWeight="semibold"
                  _hover={{
                    transform: 'translateY(-2px) scale(1.1)',
                  }}
                >
                  {t('pages.myFavorites')}
                </Heading>
              </Tab>
            </TabList>
            <TabPanels
              backgroundColor="lightGray"
              borderTopRightRadius={{ base: '20px', md: '30px', lg: '40px' }}
              borderTopLeftRadius={activeTabIndex === 1 ? { base: '20px', md: '30px', lg: '40px' } : '0'}
              border="none"
            >
              <TabPanel pt={{ base: '24px', md: '32px', lg: '40px' }} border="none">
                {nonLikedContents.length > 0
                  ? (
                      <CardGrid>
                        {nonLikedContents.map(content => (
                          <RssCard
                            key={content.id}
                            content={content}
                            like={handleLike}
                            dislike={handleDislike}
                            isLiked={isLiked}
                          />
                        ))}
                      </CardGrid>
                    )
                  : (
                      <EmptyState
                        icon={BookOpen}
                        title={t('emptyStates.noArticles.title')}
                        description={t('emptyStates.noArticles.description')}
                        actionText={t('emptyStates.noArticles.actionText')}
                        actionPath="/medias"
                      />
                    )}
              </TabPanel>
              <TabPanel pt={{ base: '24px', md: '32px', lg: '40px' }} border="none">
                {likedContents.length > 0
                  ? (
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
                    )
                  : (
                      <EmptyState
                        icon={Heart}
                        title={t('emptyStates.noFavorites.title')}
                        description={t('emptyStates.noFavorites.description')}
                        actionText={t('emptyStates.noFavorites.actionText')}
                        onAction={() => setActiveTabIndex(0)}
                      />
                    )}
              </TabPanel>
            </TabPanels>
          </Tabs>

        </VStack>
      </Flex>
    </ResponsiveLayout>
  )
}

export default function ArticlesPage() {
  return (
    <AuthGuard>
      <ArticlesPageContent />
    </AuthGuard>
  )
}
