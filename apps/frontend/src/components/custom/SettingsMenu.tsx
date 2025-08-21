import { Box, Flex, Link, Text } from '@chakra-ui/react'
import { ChevronRight, Info, Key, LogOut, Shield, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useToaster } from '@/components/ui/toaster'
import { useAuth } from '@/hooks/useAuth'
import PasswordModal from './Modal'

function SettingsMenu() {
  const { t } = useTranslation('common', {
    keyPrefix: 'auth',
  })

  const { logout, deleteAccount } = useAuth()
  const toaster = useToaster()
  const router = useRouter()
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await logout()
      router.push('/')
    }
    catch (error) {
      console.error('Logout error:', error)
    }
  }

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount()
      toaster.create({
        description: t('accountDeleted'),
        type: 'success',
        duration: 5000,
      })
      router.push('/')
    }
    catch (error) {
      console.error('Account deletion error:', error)
      toaster.create({
        description: t('errorDeletingAccount'),
        type: 'error',
        duration: 5000,
      })
    }
  }

  const menuItems = [
    {
      icon: Key,
      label: t('changePassword'),
      onClick: () => setIsPasswordModalOpen(true),
      color: 'chaletGreen',
      hoverColor: 'darkGreen',
    },
    {
      icon: LogOut,
      label: t('logout'),
      onClick: handleLogout,
      color: 'chaletGreen',
      hoverColor: 'darkGreen',
    },
    {
      icon: Trash2,
      label: t('deleteAccount'),
      onClick: handleDeleteAccount,
      color: 'red.500',
      hoverColor: 'red.600',
    },
    {
      icon: Info,
      label: t('about'),
      href: '/about',
      color: 'chaletGreen',
      hoverColor: 'darkGreen',
    },
    {
      icon: Shield,
      label: t('policy'),
      onClick: () => {}, // À implémenter
      color: 'chaletGreen',
      hoverColor: 'darkGreen',
    },
  ]

  return (
    <>
      <Flex direction="column" width="100%" gap={{ base: 3, md: 4 }}>
        {menuItems.map((item) => {
          const cardContent = (
            <Flex alignItems="center" justifyContent="space-between" width="100%">
              <Flex alignItems="center" gap={{ base: 4, md: 5 }}>
                <Box
                  p={2}
                  borderRadius="lg"
                  bgColor={item.color === 'red.500' ? 'red.50' : 'green.50'}
                  color={item.color}
                >
                  <item.icon size={20} strokeWidth={2} />
                </Box>
                <Text
                  fontSize={{ base: '16px', md: '18px', lg: '20px' }}
                  fontWeight="semibold"
                  color="gray.800"
                >
                  {item.label}
                </Text>
              </Flex>
              <ChevronRight
                size={18}
                color="#9CA3AF"
              />
            </Flex>
          )

          const cardProps = {
            bgColor: 'white',
            borderRadius: { base: '16px', md: '20px' },
            padding: { base: '20px', md: '24px' },
            width: '100%',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            _hover: {
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
              bgColor: 'gray.50',
            },
            border: '1px solid',
            borderColor: 'gray.100',
          }

          if (item.href) {
            return (
              <Link key={item.label} href={item.href}>
                <Box {...cardProps}>
                  {cardContent}
                </Box>
              </Link>
            )
          }

          return (
            <Box
              key={item.label}
              {...cardProps}
              onClick={item.onClick}
            >
              {cardContent}
            </Box>
          )
        })}
      </Flex>

      <PasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </>
  )
}

export default SettingsMenu
