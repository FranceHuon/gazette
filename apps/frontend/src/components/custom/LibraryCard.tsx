'use client'

import { Box, Card, Flex, Heading, Image, Link, useBreakpointValue } from '@chakra-ui/react'
import { ContentWithMediaDto } from '@gazette/shared'
import { Trash2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface LibraryCardProps {
  content: ContentWithMediaDto
  dislike: (contentId: string) => void
  isFirst: boolean
  isLast: boolean
}

function LibraryCard({ content, dislike, isFirst, isLast }: LibraryCardProps) {
  const { t } = useTranslation()
  const iconSize = useBreakpointValue({ base: 20, md: 30 })

  return (
    <Card
      width="100%"
      height={{ base: '120px', md: '140px' }}
      borderRadius={{ base: '20px', md: '30px', lg: '24px' }}
      padding={{ base: '16px', md: '20px' }}
      paddingBottom={{ base: '16px', md: isLast ? '20px' : '64px' }}
      marginTop={isFirst ? '12px' : '-66px'}
      boxShadow="rgba(0, 0, 0, 0.1) 0px 0px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px"
      _hover={{ transform: 'translateY(-10px)', boxShadow: 'xl' }}
      transition="all 0.2s ease-in-out"
      border="1px solid rgba(0, 0, 0, 0.1)"
      role="article"
      aria-label={`Article: ${content.title}`}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Flex flexDirection="row" justifyContent="space-between" gap={4} flex={1}>
        <Flex gap={{ base: 2, md: 6 }} flex={1}>
          <Flex
            width={{ base: '50px', md: '60px' }}
            height={{ base: '50px', md: '60px' }}
            alignItems="center"
            justifyContent="center"
            padding={{ base: 1, md: 2 }}
            marginRight={{ base: 4, md: 0 }}
            flexShrink={0}
          >
            <Image
              src={content.media.picture}
              alt={content.media.name}
              maxW="100%"
              maxH={{ base: '80px', md: '120px' }}
              objectFit="contain"
            />
          </Flex>
          <Flex flexDirection="column" justifyContent="space-between" alignItems="flex-start" flex={1}>
            <Heading
              fontFamily={{ base: 'body', md: 'heading' }}
              noOfLines={{ base: 2, md: 3 }}
              fontSize={{ base: '0.8rem', md: '1.2rem', lg: '1.5rem' }}
              lineHeight="1.2"
            >
              {content.title}
            </Heading>
            <Flex
              flexDirection={{ base: 'row', md: 'column' }}
              alignItems={{ base: 'center', md: 'flex-start' }}
              justifyContent={{ base: 'space-between', md: 'flex-start' }}
              width="100%"
              mt={{ base: 2, md: 0 }}
            >
              <Link
                href={content.link}
                isExternal
                color="chaletGreen"
                textStyle="cardLink"
                fontSize={{ base: '0.8rem', md: '1.2rem', lg: '1.2rem' }}
                _hover={{ color: 'darkGreen' }}
              >
                {t('common.readArticle')}
              </Link>
              <Box
                as="button"
                type="button"
                onClick={() => dislike!(content.id)}
                cursor="pointer"
                _hover={{ transform: 'translateY(-2px)' }}
                transition="transform 0.2s ease-in-out"
                alignItems="center"
                justifyContent="center"
                display={{ base: 'flex', md: 'none' }}
              >
                <Trash2
                  stroke="#606c38"
                  size={iconSize}
                  strokeWidth={2}
                  style={{
                    transition: 'stroke 0.2s ease-in-out',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.stroke = '#283618'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.stroke = '#606c38'
                  }}
                />
              </Box>
            </Flex>
          </Flex>
        </Flex>
        <Box
          as="button"
          type="button"
          onClick={() => dislike!(content.id)}
          cursor="pointer"
          _hover={{ transform: 'translateY(-2px)' }}
          transition="transform 0.2s ease-in-out"
          alignItems="center"
          justifyContent="center"
          mr={{ base: 2, md: 4 }}
          display={{ base: 'none', md: 'flex' }}
          alignSelf="flex-start"
        >
          <Trash2
            stroke="#606c38"
            size={iconSize}
            strokeWidth={2}
            style={{
              transition: 'stroke 0.2s ease-in-out',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.stroke = '#283618'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.stroke = '#606c38'
            }}
          />
        </Box>
      </Flex>
    </Card>
  )
}
export default LibraryCard
