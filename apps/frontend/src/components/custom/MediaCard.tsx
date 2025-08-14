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
      height={{ base: '120px', md: '160px' }}
      borderRadius={{
        base: isLast ? '20px' : '20px 20px 0 0',
        md: isLast ? '30px' : '30px 30px 0 0',
        lg: isLast ? '24px' : '24px 24px 0 0',
      }}
      padding={{ base: '16px', md: '22px' }}
      paddingBottom={{ base: '16px', md: isLast ? '20px' : '64px' }}
      marginTop={isFirst ? '12px' : '-50px'}
      boxShadow="rgba(0, 0, 0, 0.1) 0px 0px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px"
      _hover={{ transform: 'translateY(-10px)', boxShadow: 'xl' }}
      transition="all 0.2s ease-in-out"
      border="1px solid rgba(0, 0, 0, 0.1)"
      aria-label={`Média ${media.name}`}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Flex flexDirection="row" justifyContent="space-between" gap={4} flex={1}>
        <Flex gap={{ base: 2, md: 6 }} flex={1}>
          <Flex
            width={{ base: '50px', md: '90px' }}
            height={{ base: '50px', md: '90px' }}
            alignItems="center"
            justifyContent="center"
            padding={{ base: 1, md: 2 }}
            marginRight={{ base: 4, md: 0 }}
            flexShrink={0}
          >
            <Image
              src={media.picture}
              alt={media.name}
              maxW="100%"
              maxH={{ base: '80px', md: '140px' }}
              objectFit="contain"
            />

          </Flex>
          <Flex flexDirection="column" justifyContent="flex-start" alignItems="flex-start" flex={1} gap={{ base: 2, md: 3 }}>
            <Heading
              fontFamily={{ base: 'body', md: 'heading' }}
              noOfLines={{ base: 2, md: 3 }}
              fontSize={{ base: '1rem', md: '1.4rem', lg: '1.7rem' }}
              lineHeight="1.2"
            >
              {media.name}
            </Heading>

            <Flex
              flexDirection={{ base: 'row', md: 'column' }}
              alignItems={{ base: 'center', md: 'flex-start' }}
              justifyContent={{ base: 'space-between', md: 'flex-start' }}
              width="100%"
            >
              <Text
                fontSize={{ base: 'lg', md: '2xl' }}
                textAlign="left"
                lineHeight="1.4"
                noOfLines={{ base: 3, md: 4 }}
              >
                {media.description}
              </Text>
            </Flex>
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
                  height={{ base: '44px', md: '60px' }}
                  width={{ base: '110px', md: '180px' }}
                  fontSize={{ base: '20px', md: '20px' }}
                />
              )
            : (
                <Button
                  color="white"
                  bgColor="chaletGreen"
                  text={t('subscribe')}
                  onClick={() => onSubscribe(media.id)}
                  height={{ base: '44px', md: '60px' }}
                  width={{ base: '110px', md: '180px' }}
                  fontSize={{ base: '20px', md: '20px' }}
                />
              )}
        </Flex>
      </Flex>
    </Card>
  )
}

export default MediaCard
