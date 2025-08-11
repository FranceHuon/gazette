'use client'

import { Box, Flex } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

function GazetteMobile() {
  const { t } = useTranslation('common')
  return (
    <Flex width="80px" height="80px" bgColor="chaletGreen" borderRadius={{ base: '20px', md: '30px', lg: '40px' }} justifyContent="center" alignItems="center">
      <Box color="white" fontSize="4rem" fontFamily="Staatliches">
        {t('common.appTitleMobile')}
      </Box>
    </Flex>

  )
}

export default GazetteMobile
