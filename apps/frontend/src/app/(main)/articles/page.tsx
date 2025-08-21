'use client'

import { Flex, Heading, Tab, TabList, TabPanel, TabPanels, Tabs, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import RssCard from '@/components/custom/RssCard'
import { AuthGuard } from '@/components/guards/AuthGuard'
import { ResponsiveLayout } from '@/components/layout/ResponsiveLayout'
import { CardGrid } from '@/components/ui/responsive-grid'
import { useContents } from '@/hooks/useContents'
import { useLikes } from '@/hooks/useLikes'

function ArticlesPageContent() {
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
        <Heading
          as="h1"
          fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
          color="chaletGreen"
          mb={4}
          display={{ base: 'none', lg: 'block' }}
        >
          Articles
        </Heading>

        <VStack spacing={{ base: '16px', md: '24px', lg: '32px' }} align="stretch">
          <Tabs isManual variant="unstyled" onChange={index => setActiveTabIndex(index)}>
            <TabList border="none">
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
                  fontSize={{ base: 'xl', md: '2rem', lg: '3rem' }}
                  color="chaletGreen"
                  px={4}
                  py={4}
                  cursor="pointer"
                  _hover={{
                    transform: 'translateY(-2px) scale(1.1)',
                  }}
                >
                  À Explorer
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
                  fontSize={{ base: 'xl', md: '2rem', lg: '3rem' }}
                  color="chaletGreen"
                  px={4}
                  py={4}
                  cursor="pointer"
                  _hover={{
                    transform: 'translateY(-2px) scale(1.1)',
                  }}
                >
                  Mes favoris
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
              </TabPanel>
              <TabPanel pt={{ base: '24px', md: '32px', lg: '40px' }} border="none">
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
