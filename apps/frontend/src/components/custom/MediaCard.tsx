import { Card, CardBody, Flex, Heading, Image, Text } from '@chakra-ui/react'
import { MediaDto } from '@gazette/shared'
import { useTranslation } from 'react-i18next'
import Button from './Button'

interface MediaCardProps {
  media: MediaDto
  onSubscribe: (mediaId: string) => void
  onUnsubscribe?: (mediaId: string) => void
  isSubscribed?: (mediaId: string) => boolean
}

function MediaCard({
  media,
  onSubscribe,
  onUnsubscribe,
  isSubscribed,
}: MediaCardProps) {
  const { t } = useTranslation('common', {
    keyPrefix: 'subscriptions',
  })

  const isSubscribeOnlyMode = !onUnsubscribe || !isSubscribed
  const isCurrentlySubscribed = isSubscribed ? isSubscribed(media.id) : false

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
      aria-label={`Média ${media.name}`}
    >
      <CardBody padding={{ base: '16px', md: '20px' }}>
        <Flex flexDirection="column" alignItems="flex-start" height="100%">
          <Flex
            width={{ base: '60px', md: '100px' }}
            height={{ base: '60px', md: '100px' }}
            justifyContent="center"
            border="1px solid rgba(240,240,240,1)"
            padding={4}
            borderRadius={24}
          >
            <Image
              src={media.picture}
              alt={media.name}
              maxW="100%"
              maxH={{ base: '80px', md: '120px' }}
              objectFit="contain"
              fallbackSrc="https://via.placeholder.com/120x120?text=Logo"
            />
          </Flex>

          <Flex
            flexDirection="column"
            gap={{ base: 1, md: 2 }}
            flex="1"
            justifyContent="center"
          >
            <Heading
              size={{ base: 'lg', md: 'xl' }}
              fontSize={{ base: '1rem', md: '1.2rem', lg: '1.5rem' }}
              lineHeight="1.2"
            >
              {media.name}
            </Heading>
            <Text
              fontSize={{ base: 'md', md: 'lg' }}
              textAlign="left"
              lineHeight="1.4"
              noOfLines={{ base: 3, md: 4 }}
            >
              {media.description}
            </Text>
          </Flex>

          <Flex padding={{ base: '18px', md: '24px' }} justifyContent="flex-end" bottom={0} right={0} position="absolute">
            {!isSubscribeOnlyMode && isCurrentlySubscribed
              ? (
                  <Button
                    color="white"
                    bgColor="darkGreen"
                    text={t('unsubscribe')}
                    height="50px"
                    onClick={() => onUnsubscribe!(media.id)}
                  />
                )
              : (
                  <Button
                    color="white"
                    bgColor="chaletGreen"
                    text={t('subscribe')}
                    height="50px"
                    onClick={() => onSubscribe(media.id)}
                  />
                )}
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  )
}

export default MediaCard
