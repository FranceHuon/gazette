import { Card, CardFooter, Flex, Heading, Image, Link, Text } from '@chakra-ui/react'
import { ContentWithMediaDto } from '@gazette/shared'
import { Heart } from 'lucide-react'

interface LibraryCardProps {
  content: ContentWithMediaDto
  like: (contentId: string) => void
  dislike: (contentId: string) => void
  isLiked: (contentId: string) => boolean
}

function LibraryCard({ content, like, dislike, isLiked }: LibraryCardProps) {
  const isLikeOnlyMode = !dislike || !isLiked
  const isCurrentlyLiked = isLiked ? isLiked(content.id) : false
  return (
    <Card
      width="100%"
      height="auto"
      minHeight={{ base: '20px', sm: '25px', md: '30px', lg: '40px' }}
      borderRadius={{ base: '20px', md: '30px', lg: '24px' }}
      padding={{ base: '16px', md: '20px' }}
      boxShadow="rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px"
      _hover={{ transform: 'translateY(-2px)', boxShadow: 'xl' }}
      transition="all 0.2s ease-in-out"
      border="1px solid rgba(0, 0, 0, 0.1)"
    >
      <Flex flexDirection="row" gap={4} justifyContent="space-around">
        <Flex
          alignItems="center"
          justifyContent="flex-start"
          position="absolute"
          left={0}
          top={0}
          gap={3}
          padding={2}
          paddingRight={4}
          border="1px solid rgba(240,240,240,1)"
          borderRadius={32}
        >
          <Flex
            width={{ base: '60px', md: '60px' }}
            height={{ base: '60px', md: '60px' }}
            alignItems="center"
            justifyContent="center"
            border="1px solid rgba(240,240,240,1)"
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
          <Text fontSize="sm" fontWeight="bold">
            {content.media.name}
          </Text>
        </Flex>
        <Flex flexDirection="column" gap={2}>
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
            color="blue.500"
            textStyle="cardLink"
            _hover={{ textDecoration: 'underline' }}
          >
            Lire l'article →
          </Link>
        </Flex>
        <CardFooter padding={{ base: '18px', md: '24px' }} justifyContent="flex-end" position="absolute" bottom={0} right={0}>
          {!isLikeOnlyMode && isCurrentlyLiked
            ? (
                <Flex
                  as="button"
                  type="button"
                  onClick={() => dislike!(content.id)}
                  cursor="pointer"
                  _hover={{ transform: 'translateY(-2px)', color: '#283618' }}
                  transition="transform 0.2s ease-in-out"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Heart
                    stroke="#606c38"
                    size={30}
                    strokeWidth={3}
                    fill="#606c38"
                  />
                </Flex>
              )
            : (
                <Flex
                  as="button"
                  type="button"
                  onClick={() => like(content.id)}
                  cursor="pointer"
                  _hover={{ transform: 'translateY(-2px)' }}
                  transition="transform 0.2s ease-in-out"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Heart
                    stroke="#606c38"
                    size={30}
                    strokeWidth={3}
                  />
                </Flex>
              )}
        </CardFooter>
      </Flex>
    </Card>
  )
}
export default LibraryCard
