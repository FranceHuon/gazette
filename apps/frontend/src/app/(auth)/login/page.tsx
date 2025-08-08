'use client'

import { Box, Flex, useBreakpointValue } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import FormLogin from '@/components/custom/FormLogin'
import GazetteIllu from '@/components/custom/GazetteIllu'
import Title from '@/components/layout/Title'

export default function LoginPage() {
  const { t } = useTranslation('common')

  const isMobile = useBreakpointValue({ base: true, md: false })

  return (
    <Flex alignItems="center" height="100vh" width="100vw" direction={{ base: 'column', md: 'row' }}>
      {isMobile ? <Box bgColor="chaletGreen" width="100%" height="40%" display="flex" alignItems="center" justifyContent="center" color="white" textAlign="center" fontSize="6rem" fontFamily="Staatliches">{t('common.appTitle')}</Box> : <GazetteIllu />}
      <Flex direction="column" alignItems="center" justifyContent="center" width={{ base: '100%', md: '50%' }} px={{ base: 6, md: 0 }} flexGrow={1} gap={8}>
        <Title text={t('auth.login')} fontColor="chaletGreen" />
        <FormLogin />
      </Flex>
    </Flex>
  )
}
