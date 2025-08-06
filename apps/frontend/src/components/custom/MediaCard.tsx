import { Card, CardBody, Flex, Heading, Image, Text } from '@chakra-ui/react'
import { MediaDto } from '@gazette/shared'
import { useTranslation } from 'react-i18next'
import Button from './Button'

interface MediaCardProps {
  media: MediaDto
  onSubscribe: (mediaId: string) => void
  onUnsubscribe?: (mediaId: string) => void
  isSubscribed?: (mediaId: string) => boolean
  width?: string
  height?: string
}

function MediaCard({
  media,
  onSubscribe,
  onUnsubscribe,
  isSubscribed,
  width = '400px',
  height = '400px',
}: MediaCardProps) {
  const { t } = useTranslation('common', {
    keyPrefix: 'navigateApp',
  })

  const isSubscribeOnlyMode = !onUnsubscribe || !isSubscribed
  const isCurrentlySubscribed = isSubscribed ? isSubscribed(media.id) : false

  return (
    <Card
      width={{ base: '100%', sm: '350px', md: width, lg: width }}
      height={{ base: 'auto', sm: '400px', md: height, lg: height }}
      minHeight={{ base: '400px', sm: '400px', md: height, lg: height }}
      borderRadius={{ base: '20px', md: '30px', lg: '40px' }}
      overflow="hidden"
      boxShadow="rgba(0, 0, 0, 0.1) 0px 5px 10px -6px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px"
      _hover={{ transform: 'translateY(-2px)', boxShadow: 'xl' }}
      transition="all 0.2s ease-in-out"
    >
      <CardBody padding={{ base: '16px', md: '20px' }}>
        <Flex flexDirection="column" gap={{ base: 4, md: 6 }} alignItems="flex-start" height="100%">
          <Flex
            // mb={{ base: 3, md: 4 }}
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
              fontSize={{ base: 'lg', md: 'xl' }}
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

          <Flex justifyContent="flex-end" mt="auto">
            {!isSubscribeOnlyMode && isCurrentlySubscribed
              ? (
                  <Button
                    color="white"
                    bgColor="red.500"
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
