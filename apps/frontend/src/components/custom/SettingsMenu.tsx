import { Box, Link, List, ListItem } from '@chakra-ui/react'
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
    <Box textAlign="left">
      <List spacing={2} variant="plain">
        <ListItem>
          <Link
            cursor="pointer"
            textStyle="nav"
          >
            {t('changePassword')}
          </Link>
        </ListItem>
        <ListItem>
          <Link
            onClick={handleLogout}
            cursor="pointer"
            textStyle="nav"
          >
            {t('logout')}
          </Link>
        </ListItem>
        <ListItem>
          <Link
            onClick={handleDeleteAccount}
            cursor="pointer"
            textStyle="nav"
          >
            {t('deleteAccount')}
          </Link>
        </ListItem>
        <ListItem>
          <Link
            href="/about"
            textStyle="nav"
          >
            {t('navigation.about', { ns: 'common' })}
          </Link>
        </ListItem>
        <ListItem>
          <Link
            textStyle="nav"
          >
            {t('navigation.policy', { ns: 'common' })}
          </Link>
        </ListItem>
      </List>

    </Box>
  )
}

export default SettingsMenu
