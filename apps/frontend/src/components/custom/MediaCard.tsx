'use client'

import { Card, CardBody, CardHeader, Flex, Heading, Image, Text } from '@chakra-ui/react'
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
      aria-label={`Média ${media.name}`}
      padding={{ base: '18px', md: '24px' }}
    >
      <CardHeader padding={0} display="flex" flexDirection={{ base: 'row', md: 'column' }} height={{ base: '60px', md: '100px' }} alignItems={{ base: 'center', md: 'flex-start' }} justifyContent={{ base: 'center', md: 'flex-start' }} gap={{ base: 3, md: 0 }}>
        <Flex
          width={{ base: '60px', md: '100px' }}
          height={{ base: '60px', md: '100px' }}
          minWidth={{ base: '60px', md: '100px' }}
          minHeight={{ base: '60px', md: '100px' }}
          maxWidth={{ base: '60px', md: '100px' }}
          maxHeight={{ base: '60px', md: '100px' }}
          justifyContent="center"
          alignItems="center"
          border="1px solid rgba(240,240,240,1)"
          padding={3}
          borderRadius={{ base: '13px', md: '24px' }}
        >
          <Image
            src={media.picture}
            alt={media.name}
            maxW="100%"
            maxH={{ base: '80px', md: '120px' }}
            objectFit="contain"
          />
        </Flex>

        <Heading
          size={{ base: 'lg', md: 'xl' }}
          fontSize={{ base: '1rem', md: '1.2rem', lg: '1.5rem' }}
          lineHeight="1.2"
          flex={{ base: '1', md: 'none' }}
          marginTop={{ base: 0, md: 4 }}
        >
          {media.name}
        </Heading>

      </CardHeader>

      <CardBody padding={0} paddingTop={{ base: '16px', md: '20px' }} paddingBottom={{ base: '60px', md: '80px' }} display="flex" flexDirection="column" gap={{ base: 1, md: 2 }} justifyContent="center" flex="1">
        <Text
          fontSize={{ base: 'md', md: 'lg' }}
          textAlign="left"
          lineHeight="1.4"
          noOfLines={{ base: 3, md: 4 }}
          marginBottom={{ base: 2, md: 2 }}
        >
          {media.description}
        </Text>

        <Flex padding={0} justifyContent="flex-end" bottom={{ base: '18px', md: '24px' }} right={{ base: '18px', md: '24px' }} position="absolute">
          {!isSubscribeOnlyMode && isCurrentlySubscribed
            ? (
                <Button
                  color="white"
                  bgColor="darkGreen"
                  text={t('unsubscribe')}
                  onClick={() => onUnsubscribe!(media.id)}
                />
              )
            : (
                <Button
                  color="white"
                  bgColor="chaletGreen"
                  text={t('subscribe')}
                  onClick={() => onSubscribe(media.id)}
                />
              )}
        </Flex>
      </CardBody>
    </Card>
  )
}

export default MediaCard
