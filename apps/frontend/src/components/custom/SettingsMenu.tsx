import { Box, Icon, Link, List, ListItem } from '@chakra-ui/react'
import { FileBadge, HelpCircle, LogOut, Trash } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/hooks/useAuth'
import { useToaster } from '@/components/ui/toaster'

function SettingsMenu() {
  const { t } = useTranslation('common', {
    keyPrefix: 'accountManagement',
  })

  const { logout, deleteAccount } = useAuth()
  const toaster = useToaster()

  const handleLogout = async () => {
    try {
      await logout()
    }
    catch (error) {
      console.error('Erreur lors de la déconnexion:', error)
    }
  }

  const handleDeleteAccount = async () => {
    try {
      const confirmed = window.confirm(t('confirmDelete'))
      if (confirmed) {
        await deleteAccount()
        toaster.create({
          description: t('accountDeleted'),
          type: 'success',
          duration: 5000,
        })
      }
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
