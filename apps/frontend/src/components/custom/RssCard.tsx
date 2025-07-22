import { Card, CardBody, CardFooter, CardHeader, Heading, Link, Text, VStack } from '@chakra-ui/react'
import { ContentWithMediaDto } from '@gazette/shared'
import { Heart } from 'lucide-react'

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
  const isLikeOnlyMode = !dislike || !isLiked
  const isCurrentlyLiked = isLiked ? isLiked(content.id) : false

  return (
    <Card
      width={{ base: '100%', sm: '350px', md: '450px', lg: '600px' }}
      height={{ base: 'auto', sm: '400px', md: '500px', lg: '600px' }}
      minHeight={{ base: '400px', sm: '400px', md: '500px', lg: '600px' }}
      borderRadius={{ base: '20px', md: '30px', lg: '40px' }}
      padding={{ base: '16px', md: '20px' }}
      boxShadow="lg"
      _hover={{ transform: 'translateY(-2px)', boxShadow: 'xl' }}
      transition="all 0.2s ease-in-out"
    >
      <CardHeader padding={{ base: '12px', md: '16px' }}>
        <Heading
          textStyle="cardTitle"
          noOfLines={2}
        >
          {content.media?.name}
        </Heading>
      </CardHeader>

      <CardBody padding={{ base: '12px', md: '16px' }}>
        <VStack spacing={{ base: 3, md: 4 }} align="stretch">
          <Heading
            textStyle="cardSubtitle"
            noOfLines={3}
          >
            {content.title}
          </Heading>
          <Text
            textStyle="cardContent"
            noOfLines={{ base: 3, md: 4, lg: 5 }}
          >
            {content.description}
          </Text>
          <Link
            href={content.link}
            isExternal
            color="blue.500"
            textStyle="cardLink"
            _hover={{ textDecoration: 'underline' }}
          >
            Lire l'article →
          </Link>
        </VStack>
      </CardBody>

      <CardFooter padding={{ base: '12px', md: '16px' }} justifyContent="flex-end">
        {!isLikeOnlyMode && isCurrentlyLiked
          ? (
              <Heart
                stroke="#606c38"
                size={40}
                strokeWidth={3}
                fill="#606c38"
                onClick={() => dislike!(content.id)}
                cursor="pointer"
              />
            )
          : (
              <Heart
                stroke="#606c38"
                size={40}
                strokeWidth={3}
                onClick={() => like(content.id)}
                cursor="pointer"
              />
            )}
      </CardFooter>
    </Card>
  )
}

export default RssCard
