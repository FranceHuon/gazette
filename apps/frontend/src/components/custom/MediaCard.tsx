'use client'

import { Card, Flex, Heading, Image, Text } from '@chakra-ui/react'
import { MediaDto } from '@gazette/shared'
import { useTranslation } from 'react-i18next'
import Button from './Button'

interface MediaCardProps {
  media: MediaDto
  onSubscribe: (mediaId: string) => void
  onUnsubscribe?: (mediaId: string) => void
  isSubscribed?: (mediaId: string) => boolean
  isFirst?: boolean
  isLast?: boolean
}

function MediaCard({
  media,
  onSubscribe,
  onUnsubscribe,
  isSubscribed,
  isFirst,
  isLast,
}: MediaCardProps) {
  const { t } = useTranslation('common', {
    keyPrefix: 'subscriptions',
  })

  const isSubscribeOnlyMode = !onUnsubscribe || !isSubscribed
  const isCurrentlySubscribed = isSubscribed ? isSubscribed(media.id) : false

  return (
    <Card
      width="100%"
      height={{ base: '180px', md: '160px' }}
      borderRadius={{
        base: isLast ? '20px' : '20px 20px 0 0',
        md: isLast ? '30px' : '30px 30px 0 0',
        lg: isLast ? '24px' : '24px 24px 0 0',
      }}
      padding={{ base: '16px', md: '22px' }}
      paddingBottom={{ base: isLast ? '20px' : '40px', md: isLast ? '20px' : '64px' }}
      marginTop={{
        base: isFirst ? '12px' : '-30px',
        md: isFirst ? '12px' : '-50px',
      }}
      boxShadow="rgba(0, 0, 0, 0.1) 0px 0px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px"
      _hover={{ transform: 'translateY(-10px)', boxShadow: 'xl' }}
      transition="all 0.2s ease-in-out"
      border="1px solid rgba(0, 0, 0, 0.1)"
      aria-label={`Média ${media.name}`}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      {/* Layout mobile */}
      <Flex flexDirection="column" gap={3} flex={1} display={{ base: 'flex', md: 'none' }}>
        <Flex gap={3} alignItems="flex-start">
          <Flex
            width="50px"
            height="50px"
            alignItems="center"
            justifyContent="center"
            padding={1}
            flexShrink={0}
          >
            <Image
              src={media.picture}
              alt={media.name}
              maxW="100%"
              maxH="80px"
              objectFit="contain"
            />
          </Flex>
          <Flex flexDirection="column" flex={1} gap={2}>
            <Heading
              fontFamily="body"
              noOfLines={2}
              fontSize="1.3rem"
              lineHeight="1.2"
            >
              {media.name}
            </Heading>
            <Text
              fontSize="sm"
              textAlign="left"
              lineHeight="1.4"
              noOfLines={2}
              color="gray.600"
            >
              {media.description}
            </Text>
          </Flex>
        </Flex>
        <Flex justifyContent="center" width="100%">
          {!isSubscribeOnlyMode && isCurrentlySubscribed
            ? (
                <Button
                  color="white"
                  bgColor="darkGreen"
                  text={t('unsubscribe')}
                  onClick={() => onUnsubscribe!(media.id)}
                  height="40px"
                  width="140px"
                  fontSize="14px"
                />
              )
            : (
                <Button
                  color="white"
                  bgColor="chaletGreen"
                  text={t('subscribe')}
                  onClick={() => onSubscribe(media.id)}
                  height="40px"
                  width="140px"
                  fontSize="14px"
                />
              )}
        </Flex>
      </Flex>

      {/* Layout desktop (conservé) */}
      <Flex flexDirection="row" justifyContent="space-between" gap={4} flex={1} display={{ base: 'none', md: 'flex' }}>
        <Flex gap={6} flex={1}>
          <Flex
            width="90px"
            height="90px"
            alignItems="center"
            justifyContent="center"
            padding={2}
            flexShrink={0}
          >
            <Image
              src={media.picture}
              alt={media.name}
              maxW="100%"
              maxH="140px"
              objectFit="contain"
            />
          </Flex>
          <Flex flexDirection="column" justifyContent="flex-start" alignItems="flex-start" flex={1} gap={3}>
            <Heading
              fontFamily="heading"
              noOfLines={3}
              fontSize={{ md: '1.4rem', lg: '1.7rem' }}
              lineHeight="1.2"
            >
              {media.name}
            </Heading>
            <Text
              fontSize={{ md: '2xl' }}
              textAlign="left"
              lineHeight="1.4"
              noOfLines={4}
            >
              {media.description}
            </Text>
          </Flex>
        </Flex>
        <Flex alignItems="center" justifyContent="center">
          {!isSubscribeOnlyMode && isCurrentlySubscribed
            ? (
                <Button
                  color="white"
                  bgColor="darkGreen"
                  text={t('unsubscribe')}
                  onClick={() => onUnsubscribe!(media.id)}
                  height="60px"
                  width="180px"
                  fontSize="20px"
                />
              )
            : (
                <Button
                  color="white"
                  bgColor="chaletGreen"
                  text={t('subscribe')}
                  onClick={() => onSubscribe(media.id)}
                  height="60px"
                  width="180px"
                  fontSize="20px"
                />
              )}
        </Flex>
      </Flex>
    </Card>
  )
}

export default MediaCard
