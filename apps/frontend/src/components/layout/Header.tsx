'use client'

import { Box, Flex } from '@chakra-ui/react'
import { useScroll } from '@/hooks/useScroll'
import Navbar from './Navbar'
import Title from './Title'

interface HeaderProps {
  pageTitle: string
}

function Header({ pageTitle }: HeaderProps) {
  const { isScrolled } = useScroll({ threshold: 50 })

  return (
    <Box
      as="header"
      width="100%"
      bg={isScrolled ? 'rgba(255,255,255,0.8)' : 'white'}
      position="sticky"
      backdropFilter="blur(20px)"
      top={0}
      zIndex={10}
      display={{ base: 'none', lg: 'flex' }}
      alignItems="center"
      justifyContent="space-between"
      px={8}
      py={4}
      boxShadow={isScrolled ? 'rgba(0, 0, 0, 0.05) 0px 10px 15px -3px, rgba(0, 0, 0, 0.01) 0px 4px 6px -2px' : 'none'}
      transition="box-shadow 0.2s ease-in-out"
    >
      <Flex
        direction="column"
      >
        <Title text="Gazette" fontColor="chaletGreen" lineHeight="1" fontSize={isScrolled ? '4rem' : '6rem'} />
        <Title text={pageTitle} fontColor="chaletGreen" fontSize={isScrolled ? '1rem' : '2rem'} />
      </Flex>
      <Navbar isScrolled={isScrolled} />
    </Box>
  )
}

export default Header
