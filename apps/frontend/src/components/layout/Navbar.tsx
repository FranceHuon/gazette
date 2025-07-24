'use client'

import { Box, Text } from '@chakra-ui/react'
import { Compass, Library, Newspaper, User } from 'lucide-react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { useResponsiveTokens } from '../../theme/responsive'

interface NavItemProps {
  href: string
  icon: React.ComponentType<{ size?: string | number }>
  label: string
  isScrolled: boolean
  spacing: string | number
}

function NavItem({ href, icon: Icon, label, isScrolled, spacing }: NavItemProps) {
  return (
    <Link href={href}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        transition="all 0.2s ease"
        _hover={{ transform: 'translateY(-2px)', color: '#283618' }}
        gap={spacing}
      >
        <Icon size={isScrolled ? '1.5rem' : '2rem'} />
        <Text
          textStyle="navbar"
          display={{ base: 'none', sm: 'block' }}
          fontSize={isScrolled ? '1.5rem' : '2rem'}
          transition="all 0.2s ease"
        >
          {label}
        </Text>
      </Box>
    </Link>
  )
}

function Navbar({ isScrolled }: { isScrolled: boolean }) {
  const { t } = useTranslation('common', {
    keyPrefix: 'navigateApp',
  })

  const { spacing, navbarStyles } = useResponsiveTokens()

  const menuItems = [
    { href: '/library', icon: Newspaper, label: t('library') },
    {
      href: '/explore',
      icon: Compass,
      label: t('explore'),
    },
    {
      href: '/subscriptions',
      icon: Library,
      label: t('subscriptions'),
    },
    {
      href: '/settings',
      icon: User,
      label: t('account'),
    },
  ]

  return (
    <Box
      display="flex"
      py={3}
      px={2}
      {...navbarStyles}
      gap={isScrolled ? 8 : 12}
    >
      {menuItems.map(item => (
        <NavItem
          key={item.href}
          href={item.href}
          icon={item.icon}
          label={item.label}
          isScrolled={isScrolled}
          spacing={spacing || '0.5rem'}
        />
      ))}
    </Box>
  )
}

export default Navbar
