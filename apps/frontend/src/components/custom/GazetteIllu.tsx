'use client'

import { Box, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

function GazetteIllu() {
  const { t } = useTranslation()
  const myArray = Array.from({ length: 3 })
  return (
    <Box
      width="50%"
      height="100%"
      bgColor="chaletGreen"
      display="flex"
      flexDirection="column"
      color="white"
      justifyContent="space-between"
      alignItems="center"
      py="8rem"
    >
      {myArray.map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Text key={index} fontSize="10rem" lineHeight="10rem" fontFamily="Staatliches">
          {t('navigateApp.appTitle')}
        </Text>
      ))}
    </Box>
  )
}

export default GazetteIllu
