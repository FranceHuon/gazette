'use client'

import { Box, Text } from '@chakra-ui/react'
import { Compass, Library, Newspaper, User } from 'lucide-react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/hooks/useAuth'

interface NavItemProps {
  href: string
  icon: React.ComponentType<{ size?: string | number }>
  label: string
  isScrolled: boolean
  spacing: string | number
}

function NavItem({ href, icon: Icon, label, isScrolled }: NavItemProps) {
  return (
    <Link href={href}>
      <Box
        as="a"
        role="button"
        tabIndex={0}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        transition="all 0.2s ease"
        color="chaletGreen"
        borderRadius="md"
        p={2}
        _hover={{
          'transform': 'translateY(-2px)',
          'color': '#283618',
          'backgroundColor': 'rgba(40, 54, 24, 0.1)',
          '& svg': {
            color: '#283618',
          },
        }}
        _focusVisible={{
          transform: 'translateY(-2px) scale(1.05)',
          backgroundColor: 'rgba(96, 108, 56, 0.1)',
          boxShadow: '0 4px 12px rgba(96, 108, 56, 0.3)',
        }}
        onKeyDown={(e: React.KeyboardEvent) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            window.location.href = href
          }
        }}
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

  const menuItems = [
    {
      href: '/explore',
      icon: Compass,
      label: t('explore'),
    },
    { href: '/library', icon: Library, label: t('library'),
    },
    {
      href: '/subscriptions',
      icon: Newspaper,
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
        />
      ))}
    </Box>
  )
}

export default Navbar
