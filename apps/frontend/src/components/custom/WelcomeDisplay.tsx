'use client'

import { Flex, Heading, Link } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

function WelcomeDisplay() {
  const { t } = useTranslation('common', {
    keyPrefix: 'accountManagement',
  })
  return (
    <Flex
      flexDirection="column"
      width="100vw"
      height="100vh"
      bgColor="color.chaletGreen"
      display="flex"
      color="color.white"
      justifyContent="center"
      alignItems="center"
    >
      <Flex
        flexDirection="column"
        gap={{
          base: '6',
          lg: '20',
        }}
      >
        <Heading>Gazette, c'est quoi ?</Heading>
        <Heading
          width="100%"
          fontSize={{
            base: '6rem',
            lg: '20rem',
          }}
          fontWeight="bold"
          textAlign="center"
        >
          {t('appTitle')}
        </Heading>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          width="100%"
          marginTop={{
            lg: '2rem',
          }}
        >
          <Link
            href="/signin"
            fontSize={{
              base: '1rem',
              lg: '2rem',
            }}
            fontWeight="bold"
            color="color.white"
          >
            {t('create')}
          </Link>
          <Link
            href="/login"
            fontSize={{
              base: '1rem',
              lg: '2rem',
            }}
            fontWeight="bold"
            color="color.white"
          >
            {t('login')}
          </Link>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default WelcomeDisplay
