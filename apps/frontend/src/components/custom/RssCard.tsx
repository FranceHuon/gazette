import { Badge, Box, Card, CardBody, CardFooter, Heading, HStack, Link, Text, VStack } from '@chakra-ui/react'
import { ContentDto } from '@gazette/shared'
import { Heart } from 'lucide-react'

interface RssCardProps {
  content: ContentDto
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
  const formatDate = (dateString?: string) => {
    if (!dateString)
      return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const isLikeOnlyMode = !dislike || !isLiked
  const isCurrentlyLiked = isLiked ? isLiked(content.id) : false

  return (
    <Card
      flexDirection="row"
      width="400px"
      height="400px"
      maxW="xl"
      borderRadius="40px"
      maxH="xl"

    >
      <Box flex="1">
        <CardBody>
          <VStack align="stretch" spacing={3}>
            <HStack justify="space-between" align="start">
              <HStack spacing={2}>
                <Badge colorScheme="blue" variant="subtle">
                  {content.source}
                </Badge>
              </HStack>

              <Text fontSize="sm" color="gray.500">
                {formatDate(content.pubDate)}
              </Text>
            </HStack>
            <Heading size="md" lineHeight="1.2" textAlign="center">
              {content.title}
            </Heading>
            <Text color="gray.600" fontSize="sm" lineHeight="1.4">
              {content.description}
            </Text>
          </VStack>
        </CardBody>

        <CardFooter pt={0}>
          <HStack justify="space-between" w="full">
            <Link
              href={content.link}
              isExternal
              color="blue.500"
              fontSize="sm"
              _hover={{ textDecoration: 'underline' }}
            >
              Lire l'article Lien
            </Link>

            {!isLikeOnlyMode && isCurrentlyLiked
              ? (
                  <Heart stroke="#606c38" strokeWidth={3} fill="#606c38" onClick={() => dislike!(content.id)} cursor="pointer" />)
              : (<Heart stroke="#606c38" strokeWidth={3} onClick={() => like(content.id)} cursor="pointer" />)}
          </HStack>
        </CardFooter>
      </Box>
    </Card>
  )
}

export default RssCard
