import { Box, Icon, Link, List, ListItem } from '@chakra-ui/react'
import { FileBadge, HelpCircle, LogOut, Trash } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/hooks/useAuth'

function SettingsMenu() {
  const { t } = useTranslation('common', {
    keyPrefix: 'accountManagement',
  })

  const { logout } = useAuth()

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
      console.warn('Suppression de compte à implémenter')
    }
    catch (error) {
      console.error(error)
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
