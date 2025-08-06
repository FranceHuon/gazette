'use client'

import { Box, Flex, useBreakpointValue } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import FormSignUp from '@/components/custom/FormSignUp'
import GazetteIllu from '@/components/custom/GazetteIllu'
import Title from '@/components/layout/Title'

export default function SignupPage() {
  const { t } = useTranslation('common', {
    keyPrefix: 'accountManagement',
  })

  const isMobile = useBreakpointValue({ base: true, md: false })

  return (
    <Flex alignItems="center" height="100vh" width="100vw" direction={{ base: 'column', md: 'row' }}>
      {isMobile ? <Box bgColor="chaletGreen" width="100%" height="40%" display="flex" alignItems="center" justifyContent="center" color="white" textAlign="center" fontSize="6rem" fontFamily="Staatliches">Gazette</Box> : <GazetteIllu />}
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        width={{ base: '100%', md: '50%' }}
        px={{ base: 6, md: 0 }}
        flexGrow={1}
        gap={1}
      >
        <Title text={t('signIn')} fontColor="chaletGreen" fontSize={{ base: '2rem', md: '5rem' }} />
        <FormSignUp />
      </Flex>
    </Flex>
  )
}
