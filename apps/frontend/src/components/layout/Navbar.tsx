'use client'

import { Box, Text } from '@chakra-ui/react'
import { BookHeart, Newspaper, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/hooks/useAuth'

interface NavItemProps {
  href: string
  icon: React.ComponentType<{ size?: string | number }>
  label: string
  isScrolled: boolean
  spacing: string | number
  isActive: boolean
}

function NavItem({ href, icon: Icon, label, isScrolled, isActive }: NavItemProps) {
  return (
    <Link href={href}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        transition="all 0.2s ease"
        color={isActive ? 'darkGreen' : 'chaletGreen'}
        transform={isActive ? 'translateY(-2px) scale(1.1)' : 'none'}
        _hover={{
          transform: isActive ? 'translateY(-2px) scale(1.1)' : 'translateY(-2px) scale(1.05)',
        }}
        _active={{
          'transform': 'translateY(-2px)',
          'color': 'darkGreen',
          '& svg': {
            color: 'darkGreen',
          },
        }}
        sx={isActive
          ? {
              '& svg': {
                color: 'darkGreen',
              },
            }
          : {}}
      >
        <Icon size={isScrolled ? '1.5rem' : '2rem'} />
        <Text
          fontFamily="heading"
          fontSize={{ base: '1rem', md: isScrolled ? '1.5rem' : '2rem' }}
          transition="all 0.2s ease"
          color="inherit"
        >
          {label}
        </Text>
      </Box>
    </Link>
  )
}

function Navbar({ isScrolled }: { isScrolled: boolean }) {
  const { t } = useTranslation('common', {
    keyPrefix: 'navigation',
  })

  const { user } = useAuth()
  const pathname = usePathname()

  const menuItems = [
    {
      href: '/articles',
      icon: Newspaper,
      label: t('articles'),
    },
    {
      href: '/subscriptions',
      icon: BookHeart,
      label: t('subscriptions'),
    },
    {
      href: '/settings',
      icon: User,
      label: user?.pseudo || t('settings'),
    },
  ]

  return (
    <Box
      display="flex"
      py={3}
      px={{ base: 8, md: 2 }}
      gap={{ base: 4, md: isScrolled ? 8 : 12 }}
      justifyContent={{ base: 'space-between', md: 'end' }}
      role="navigation"
      aria-label="Menu de navigation principal"
    >
      {menuItems.map(item => (
        <NavItem
          key={item.href}
          href={item.href}
          icon={item.icon}
          label={item.label}
          isScrolled={isScrolled}
          spacing={0.5}
          isActive={pathname === item.href}
        />
      ))}
    </Box>
  )
}

export default Navbar
