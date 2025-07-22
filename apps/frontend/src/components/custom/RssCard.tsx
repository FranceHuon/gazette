import { Badge, Box, Card, CardBody, CardFooter, CardHeader, Heading, HStack, Link, Text, VStack } from '@chakra-ui/react'
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
      width="600px"
      height="600px"
      borderRadius="40px"
      padding="20px"
      boxShadow="lg"
    >

      <CardHeader>
        <Heading>
          {content.media?.name}
        </Heading>
      </CardHeader>

      <CardBody>
        <Heading>
          {content.title}
        </Heading>
        <Text>
          {content.description}
        </Text>
        <Link
          href={content.link}
          isExternal
          color="blue.500"
          fontSize="sm"
          _hover={{ textDecoration: 'underline' }}
        >
          Lire l'article Lien
        </Link>
      </CardBody>

      <CardFooter>


        {!isLikeOnlyMode && isCurrentlyLiked
          ? (
            <Heart stroke="#606c38" size={40} strokeWidth={3} fill="#606c38" onClick={() => dislike!(content.id)} cursor="pointer" />)
          : (<Heart stroke="#606c38" size={40} strokeWidth={3} onClick={() => like(content.id)} cursor="pointer" />)}

      </CardFooter>
    </Card>
  )
}

export default RssCard
