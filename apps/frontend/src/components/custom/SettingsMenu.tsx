import { Box, Icon, Link, List, ListItem } from '@chakra-ui/react'
import { FileBadge, HelpCircle, LogOut, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { useToaster } from '@/components/ui/toaster'
import { useAuth } from '@/hooks/useAuth'

function SettingsMenu() {
  const { t } = useTranslation('common', {
    keyPrefix: 'accountManagement',
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
      console.error('Erreur lors de la déconnexion:', error)
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
      console.error('Erreur lors de la suppression du compte:', error)
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
          <Icon as={LogOut} mr={2} />
          <Link
            onClick={handleLogout}
            cursor="pointer"
            textStyle="nav"
          >
            {t('logout')}
          </Link>
        </ListItem>
        <ListItem>
          <Icon as={Trash} mr={2} />
          <Link
            onClick={handleDeleteAccount}
            cursor="pointer"
            textStyle="nav"
          >
            {t('delete')}
          </Link>
        </ListItem>
        <ListItem>
          <Icon as={HelpCircle} mr={2} />
          <Link
            href="/about"
            textStyle="nav"
          >
            {t('about')}
          </Link>
        </ListItem>
        <ListItem>
          <Icon as={FileBadge} mr={2} />
          <Link
            textStyle="nav"
          >
            {t('policy')}
          </Link>
        </ListItem>
      </List>

    </Box>
  )
}

export default SettingsMenu
