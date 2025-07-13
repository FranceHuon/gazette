import { Card, CardBody, Flex, Heading, Image, Text } from '@chakra-ui/react'
import { MediaDto } from '@gazette/shared'
import { useTranslation } from 'react-i18next'
import Button from './Button'

interface MediaCardProps {
  media: MediaDto
  onSubscribe: (mediaId: string) => void
  onUnsubscribe?: (mediaId: string) => void
  isSubscribed?: (mediaId: string) => boolean
  width: string
  height: string
}
function MediaCard({ media, onSubscribe, onUnsubscribe, isSubscribed, width, height }: MediaCardProps) {
  const { t } = useTranslation('common', {
    keyPrefix: 'navigateApp',
  })

  const isSubscribeOnlyMode = !onUnsubscribe || !isSubscribed
  const isCurrentlySubscribed = isSubscribed ? isSubscribed(media.id) : false

  return (
    <Card width={width} height={height} borderRadius="40px" overflow="hidden">
      <CardBody>
        <Flex flexDirection="column" gap={6}>
          <Flex mb={4} width="100px" height="100px">
            <Image
              src={media.picture}
              alt={media.name}
              maxW="100%"
              maxH="120px"
              objectFit="contain"
              fallbackSrc="https://via.placeholder.com/120x120?text=Logo"
            />
          </Flex>

          <Flex flexDirection="column" gap={2} height="150px" justifyContent="center">
            <Heading size="xl">
              {media.name}
            </Heading>
            <Text fontSize="xl" textAlign="left">
              {media.description}
            </Text>
          </Flex>

          <Flex justifyContent="flex-end" mb={2}>
            {!isSubscribeOnlyMode && isCurrentlySubscribed
              ? (
                  <Button
                    fontColor="white"
                    backgroundColor="red.500"
                    text={t('unsubscribe')}
                    height="50px"
                    width="150px"
                    onClick={() => onUnsubscribe!(media.id)}
                  />
                )
              : (
                  <Button
                    fontColor="white"
                    backgroundColor="color.chaletGreen"
                    text={t('subscribe')}
                    height="50px"
                    width="150px"
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
