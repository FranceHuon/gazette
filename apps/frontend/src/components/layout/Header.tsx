'use client'

import { Box, Flex, Link } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useScroll } from '@/hooks/useScroll'
import Navbar from './Navbar'
import Title from './Title'

function Header() {
  const { t } = useTranslation()
  const tAria = useTranslation('common', { keyPrefix: 'aria' }).t
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
      aria-label={tAria('mainHeader')}
    >
      <Flex
        direction="column"
      >
        <Link href="/" _hover={{ textDecoration: 'none' }}><Title text={t('common.appTitle')} fontColor="chaletGreen" lineHeight="1" fontSize={isScrolled ? '4rem' : '6rem'} _hover={{ color: 'darkGreen' }} letterSpacing="wider" /></Link>
      </Flex>
      <Navbar isScrolled={isScrolled} />
    </Box>
  )
}

export default Header
