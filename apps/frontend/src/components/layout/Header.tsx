'use client'

import { Box, Flex } from '@chakra-ui/react'
import Navbar from './Navbar'
import Title from './Title'

interface HeaderProps {
  pageTitle: string
}

function Header({ pageTitle }: HeaderProps) {
  return (
    <Box
      as="header"
      width="100%"
      bg="white"
      position="sticky"
      top={0}
      zIndex={10}
    >
      <Flex
        display={{ base: 'none', lg: 'flex' }}
        width="100%"
        height="80px"
        alignItems="center"
        justifyContent="space-between"
        px={8}
        py={8}
        marginTop={8}
      >
        <Title text="Gazette" fontColor="color.chaletGreen" />
      </Flex>
      <Flex width="100%" px={8}>
        <Title text={pageTitle} fontColor="color.chaletGreen" />
        <Navbar />
      </Flex>
    </Box>
  )
}

export default Header
