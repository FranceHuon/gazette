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
            fontFamily={{ base: 'Poppins', lg: 'Staatliches' }}
            fontSize={{ base: '1rem', lg: '2rem' }}
          >
            {t('logout')}
          </Link>
        </ListItem>
        <ListItem>
          <Icon as={Trash} mr={2} />
          <Link
            onClick={handleDeleteAccount}
            cursor="pointer"
            fontFamily={{ base: 'Poppins', lg: 'Staatliches' }}
            fontSize={{ base: '1rem', lg: '2rem' }}
          >
            {t('delete')}
          </Link>
        </ListItem>
        <ListItem>
          <Icon as={HelpCircle} mr={2} />
          <Link
            href="/about"
            fontFamily={{ base: 'Poppins', lg: 'Staatliches' }}
            fontSize={{ base: '1rem', lg: '2rem' }}
          >
            {t('about')}
          </Link>
        </ListItem>
        <ListItem>
          <Icon as={FileBadge} mr={2} />
          <Link
            fontFamily={{ base: 'Poppins', lg: 'Staatliches' }}
            fontSize={{ base: '1rem', lg: '2rem' }}
          >
            {t('policy')}
          </Link>
        </ListItem>
      </List>
    </Box>
  )
}

export default SettingsMenu
