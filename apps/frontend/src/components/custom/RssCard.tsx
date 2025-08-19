'use client'

import { Card, CardBody, CardFooter, CardHeader, Flex, Heading, Image, Link, Text, VStack } from '@chakra-ui/react'
import { ContentWithMediaDto } from '@gazette/shared'
import { Heart } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface LikeButtonProps {
  contentId: string
  contentTitle: string
  isLiked: boolean
  onLike: (contentId: string) => void
  onDislike: (contentId: string) => void
}

function LikeButton({ contentId, contentTitle, isLiked, onLike, onDislike }: LikeButtonProps) {
  const handleClick = () => {
    if (isLiked) {
      onDislike(contentId)
    }
    else {
      onLike(contentId)
    }
  }

  const handleMouseEnter = (e: React.MouseEvent<SVGSVGElement>) => {
    e.currentTarget.style.stroke = '#283618'
    if (isLiked) {
      e.currentTarget.style.fill = '#283618'
    }
  }

  const handleMouseLeave = (e: React.MouseEvent<SVGSVGElement>) => {
    e.currentTarget.style.stroke = '#606c38'
    if (isLiked) {
      e.currentTarget.style.fill = '#606c38'
    }
  }

  return (
    <Flex
      as="button"
      type="button"
      cursor="pointer"
      transition="transform 0.2s ease-in-out"
      borderRadius="md"
      p={1}
      _hover={{ transform: 'translateY(-2px)' }}
      onClick={handleClick}
      aria-label={
        isLiked
          ? `Retirer l'article "${contentTitle}" des favoris`
          : `Ajouter l'article "${contentTitle}" aux favoris`
      }
    >
      <Heart
        stroke="#606c38"
        size={30}
        strokeWidth={2}
        fill={isLiked ? '#606c38' : 'none'}
        style={{
          transition: 'stroke 0.2s ease-in-out, fill 0.2s ease-in-out',
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    </Flex>
  )
}

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

      transition="all 0.2s ease-in-out"
      aria-label={`Article: ${content.title}`}
      position="relative"
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
        />

      </CardHeader>

      <CardBody padding={{ base: 3, md: 3 }} border="none">
        <VStack spacing={{ base: 3, md: 3 }} align="stretch">
          <Heading
            textStyle="cardSubtitle"
            noOfLines={3}
            fontSize={{ base: '1rem', md: '1.2rem', lg: '1.5rem' }}
          >
            {content.title}
          </Heading>
          <Text fontSize="0.75rem" color="gray.500">
            {new Date(content.date).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </Text>
          <Text
            textStyle="cardContent"
            noOfLines={{ base: 3, md: 4 }}
            fontSize="0.9rem"
            display={{ base: 'none', md: '-webkit-box' }}
            overflow="hidden"
            textOverflow="ellipsis"
            sx={{
              WebkitLineClamp: { base: 3, md: 4 },
              WebkitBoxOrient: 'vertical',
            }}
          >
            {content.description}
          </Text>
        </VStack>
      </CardBody>

      <CardFooter padding={{ base: '18px', md: '24px' }} position="absolute" bottom={0} right={0} width="100%" display="flex" alignItems="center" justifyContent="space-between">
        <Link
          href={content.link}
          isExternal
          color="chaletGreen"
          textStyle="cardLink"
          _hover={{ color: 'darkGreen' }}
        >
          {t('common.readArticle')}
        </Link>

        {!isLikeOnlyMode && (
          <LikeButton
            contentId={content.id}
            contentTitle={content.title}
            isLiked={isCurrentlyLiked}
            onLike={like}
            onDislike={dislike!}
          />
        )}

      </CardFooter>
    </Card>
  )
}

export default RssCard
