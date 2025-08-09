'use client'

import { Card, CardBody, CardFooter, CardHeader, Flex, Heading, Image, Link, Text, VStack } from '@chakra-ui/react'
import { ContentWithMediaDto } from '@gazette/shared'
import { Heart } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface RssCardProps {
  content: ContentWithMediaDto
  like: (contentId: string) => void
  dislike: (contentId: string) => void
  isLiked: (contentId: string) => boolean
}

function RssCard({
  content,
  like,
  dislike,
  isLiked,
}: RssCardProps) {
  const { t } = useTranslation()
  const isLikeOnlyMode = !dislike || !isLiked
  const isCurrentlyLiked = isLiked ? isLiked(content.id) : false

  return (
    <Card
      width={{ base: '100%', sm: '250px', md: '300px', lg: '400px' }}
      height={{ base: 'auto', sm: '250px', md: '300px', lg: '400px' }}
      minHeight={{ base: '200px', sm: '250px', md: '300px', lg: '400px' }}
      borderRadius={{ base: '20px', md: '30px', lg: '40px' }}
      padding={{ base: '16px', md: '20px' }}
      boxShadow="rgba(0, 0, 0, 0.1) 0px 5px 10px -6px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px"
      _hover={{ transform: 'translateY(-2px)', boxShadow: 'xl' }}
      _focusWithin={{
        transform: 'translateY(-2px)',
        boxShadow: 'xl',
        outline: '2px solid',
        outlineColor: 'chaletGreen',
        outlineOffset: '2px',
      }}
      transition="all 0.2s ease-in-out"
      role="article"
      aria-label={`Article: ${content.title}`}
    >
      <CardHeader padding={{ base: '12px', md: '16px' }} display="flex" alignItems="center" justifyContent="space-between">
        <Heading
          textStyle="cardTitle"
          noOfLines={2}
          fontSize={{ base: '1rem', md: '1.2rem', lg: '1.5rem' }}
        >
          {content.media?.name}
        </Heading>

        <Image
          src={content.media?.picture}
          alt={content.media?.name}
          maxW={{ base: '50px', md: '50px' }}
          maxH={{ base: '50px', md: '50px' }}
          objectFit="contain"
          // fallbackSrc="https://via.placeholder.com/120x120?text=Logo"
        />
      </CardHeader>

      <CardBody padding={{ base: '12px', md: '16px' }} border="none">
        <VStack spacing={{ base: 3, md: 4 }} align="stretch">
          <Heading
            textStyle="cardSubtitle"
            noOfLines={3}
            fontSize={{ base: '1rem', md: '1.2rem', lg: '1.5rem' }}
          >
            {content.title}
          </Heading>
          <Text
            textStyle="cardContent"
            noOfLines={{ base: 3, md: 4, lg: 5 }}
            fontSize="0.9rem"
          >
            {content.description}
          </Text>
          <Link
            href={content.link}
            isExternal
            color="chaletGreen"
            textStyle="cardLink"
            _hover={{ color: 'darkGreen' }}
          >
            {t('common.readArticle')}
          </Link>
        </VStack>
      </CardBody>

      <CardFooter padding={{ base: '18px', md: '24px' }} justifyContent="flex-end" position="absolute" bottom={0} right={0}>
        {!isLikeOnlyMode && isCurrentlyLiked
          ? (
              <Flex
                as="button"
                type="button"
                cursor="pointer"
                transition="transform 0.2s ease-in-out"
                borderRadius="md"
                p={1}
                _hover={{ transform: 'translateY(-2px)' }}
                _focusVisible={{
                  transform: 'translateY(-2px) scale(1.05)',
                  boxShadow: '0 4px 12px rgba(96, 108, 56, 0.3)',
                }}
                onClick={() => dislike!(content.id)}
                onKeyDown={(e: React.KeyboardEvent) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    dislike!(content.id)
                  }
                }}
                aria-label={`Retirer l'article "${content.title}" des favoris`}
                tabIndex={0}
              >
                <Heart
                  stroke="#606c38"
                  size={30}
                  strokeWidth={2}
                  fill="#606c38"
                  style={{
                    transition: 'stroke 0.2s ease-in-out, fill 0.2s ease-in-out',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.stroke = '#283618'
                    e.currentTarget.style.fill = '#283618'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.stroke = '#606c38'
                    e.currentTarget.style.fill = '#606c38'
                  }}
                />
              </Flex>
            )
          : (
              <Flex
                as="button"
                type="button"
                cursor="pointer"
                transition="transform 0.2s ease-in-out"
                borderRadius="md"
                p={1}
                _hover={{ transform: 'translateY(-2px)' }}
                _focusVisible={{
                  transform: 'translateY(-2px) scale(1.05)',
                  boxShadow: '0 4px 12px rgba(96, 108, 56, 0.3)',
                }}
                onClick={() => like(content.id)}
                onKeyDown={(e: React.KeyboardEvent) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    like(content.id)
                  }
                }}
                aria-label={`Ajouter l'article "${content.title}" aux favoris`}
                tabIndex={0}
              >
                <Heart
                  stroke="#606c38"
                  fill="none"
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
              </Flex>
            )}
      </CardFooter>
    </Card>
  )
}

export default RssCard
