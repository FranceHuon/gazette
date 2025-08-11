import { Box, Flex, Link, List, ListItem } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { useToaster } from '@/components/ui/toaster'
import { useAuth } from '@/hooks/useAuth'

function SettingsMenu() {
  const { t } = useTranslation('common', {
    keyPrefix: 'auth',
  })

  const { logout, deleteAccount } = useAuth()
  const toaster = useToaster()
  const router = useRouter()

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

  return (
    <Flex direction="column" width="100%" justifyContent="center" alignItems="center">
      <List spacing={4} variant="plain" width="100%">
        <Box bgColor="white" borderRadius="20px" padding="16px" width="100%" height="80px" display="flex" alignItems="center">
          <ListItem>
            <Link
              cursor="pointer"
              fontSize={{ base: '16px', md: '20px' }}
              fontWeight="bold"
            >
              {t('changePassword')}
            </Link>
          </ListItem>
        </Box>

        <Box bgColor="white" borderRadius="20px" padding="16px" width="100%" height="80px" display="flex" alignItems="center">
          <ListItem>
            <Link
              onClick={handleLogout}
              cursor="pointer"
              fontSize={{ base: '16px', md: '20px' }}
              fontWeight="bold"
            >
              {t('logout')}
            </Link>
          </ListItem>
        </Box>

        <Box bgColor="white" borderRadius="20px" padding="16px" width="100%" height="80px" display="flex" alignItems="center">
          <ListItem>
            <Link
              onClick={handleDeleteAccount}
              cursor="pointer"
              fontSize={{ base: '16px', md: '20px' }}
              fontWeight="bold"
            >
              {t('deleteAccount')}
            </Link>
          </ListItem>
        </Box>

        <Box bgColor="white" borderRadius="20px" padding="16px" width="100%" height="80px" display="flex" alignItems="center">
          <ListItem>
            <Link
              href="/about"
              fontSize={{ base: '16px', md: '20px' }}
              fontWeight="bold"
            >
              {t('about')}
            </Link>
          </ListItem>
        </Box>

        <Box bgColor="white" borderRadius="20px" padding="16px" width="100%" height="80px" display="flex" alignItems="center">
          <ListItem>
            <Link
              fontSize={{ base: '16px', md: '20px' }}
              fontWeight="bold"
            >
              {t('policy')}
            </Link>
          </ListItem>
        </Box>
      </List>

    </Flex>
  )
}

export default SettingsMenu
