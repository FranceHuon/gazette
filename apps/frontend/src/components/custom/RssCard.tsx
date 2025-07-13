import { Badge, Box, Card, CardBody, CardFooter, Heading, HStack, Link, Text, VStack } from '@chakra-ui/react'
import { Heart } from 'lucide-react'

interface RssCardProps {
  title: string
  link: string
  comments?: string
  pubDate?: string
  category?: string
  description?: string
  content?: string
  author?: string
  guid?: string
  source?: string
  logo?: string
}

function RssCard({
  title,
  link,
  pubDate,
  category,
  author,
  source,
  description,
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
                {source && (
                  <Badge colorScheme="blue" variant="subtle">
                    {source}
                  </Badge>
                )}
                {category && (
                  <Badge colorScheme="green" variant="subtle">
                    {category}
                  </Badge>
                )}
              </HStack>
              {pubDate && (
                <Text fontSize="sm" color="gray.500">
                  {formatDate(pubDate)}
                </Text>
              )}
            </HStack>

            <Heading size="md" lineHeight="1.2" textAlign="center">
              {title}
            </Heading>

            {description && (
              <Text color="gray.600" fontSize="sm" lineHeight="1.4">
                {description}
              </Text>
            )}

            {author && (
              <Text fontSize="xs" color="gray.500" fontStyle="italic">
                Par
                {' '}
                {author}
              </Text>
            )}
          </VStack>
        </CardBody>

        <CardFooter pt={0}>
          <HStack justify="space-between" w="full">
            <Link
              href={link}
              isExternal
              color="blue.500"
              fontSize="sm"
              _hover={{ textDecoration: 'underline' }}
            >
              Lire l'article Lien
            </Link>
            <Heart stroke="#606c38" strokeWidth={3} />
          </HStack>
        </CardFooter>
      </Box>
    </Card>
  )
}

export default RssCard
