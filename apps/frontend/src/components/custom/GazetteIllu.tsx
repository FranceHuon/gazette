'use client'

import { Box, Flex, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

function GazetteIllu() {
  const { t } = useTranslation()
  return (
    <Box
      width="50%"
      height="100vh"
      bgColor="color.chaletGreen"
      display="flex"
      color="color.white"
      justifyContent="center"
      alignItems="center"
    >
      <Flex flexDirection="column">
        <Text textStyle="appTitle">
          {t('navigateApp.appTitle')}
        </Text>
        <Text textStyle="appTitle">
          {t('navigateApp.appTitle')}
        </Text>
        <Text textStyle="appTitle">
          {t('navigateApp.appTitle')}
        </Text>
      </Flex>
    </Box>
  )
}

export default GazetteIllu
