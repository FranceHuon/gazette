'use client'

import { Box, Card, Flex, Heading, Image, Link } from '@chakra-ui/react'
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

  return (
    <Card
      width="100%"
      height="auto"
      minHeight={{ base: '20px', sm: '25px', md: '30px', lg: '40px' }}
      borderRadius={{ base: '20px', md: '30px', lg: '24px' }}
      padding={{ base: '16px', md: '20px' }}
      paddingBottom={{ base: '16px', md: isLast ? '20px' : '64px' }}
      marginTop={isFirst ? '12px' : '-66px'}
      boxShadow="rgba(0, 0, 0, 0.1) 0px 0px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px"
      _hover={{ transform: 'translateY(-10px)', boxShadow: 'xl' }}
      _focusWithin={{
        transform: 'translateY(-10px)',
        boxShadow: 'xl',
        outline: '2px solid',
        outlineColor: 'chaletGreen',
        outlineOffset: '2px',
      }}
      transition="all 0.2s ease-in-out"
      border="1px solid rgba(0, 0, 0, 0.1)"
      role="article"
      aria-label={`Article: ${content.title}`}
    >
      <Flex flexDirection="row" justifyContent="space-between" gap={4}>
        <Flex gap={6}>
          <Flex
            width={{ base: '60px', md: '60px' }}
            height={{ base: '60px', md: '60px' }}
            alignItems="center"
            justifyContent="center"
            padding={2}
            borderRadius={24}
          >
            <Image
              src={content.media.picture}
              alt={content.media.name}
              maxW="100%"
              maxH={{ base: '80px', md: '120px' }}
              objectFit="contain"
              fallbackSrc="https://via.placeholder.com/120x120?text=Logo"
            />
          </Flex>
          <Flex flexDirection="column" gap={2} alignItems="flex-start">
            <Heading
              textStyle="cardTitle"
              noOfLines={2}
              fontSize={{ base: '1rem', md: '1.2rem', lg: '1.5rem' }}
            >
              {content.title}
            </Heading>
            <Link
              href={content.link}
              isExternal
              color="chaletGreen"
              textStyle="cardLink"
              _hover={{ color: 'darkGreen' }}
            >
              {t('common.readArticle')}
            </Link>
          </Flex>
        </Flex>
        <Box
          as="button"
          type="button"
          onClick={() => dislike!(content.id)}
          cursor="pointer"
          borderRadius="md"
          p={1}
          _hover={{ transform: 'translateY(-2px)' }}
          _focusVisible={{
            transform: 'translateY(-2px) scale(1.05)',
            boxShadow: '0 4px 12px rgba(96, 108, 56, 0.3)',
          }}
          transition="transform 0.2s ease-in-out"
          alignItems="center"
          justifyContent="center"
          mr={4}
          onKeyDown={(e: React.KeyboardEvent) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              dislike!(content.id)
            }
          }}
          aria-label={`Supprimer l'article "${content.title}" de la bibliothèque`}
          tabIndex={0}
        >
          <Trash2
            stroke="#606c38"
            size={30}
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
