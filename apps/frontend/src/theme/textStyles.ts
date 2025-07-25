export const textStyles = {
  // Styles de base
  body: {
    fontFamily: '\'Poppins\', sans-serif',
    fontWeight: '500',
    fontSize: '16px',
    lineHeight: '24px',
    letterSpacing: '0',
  },

  // Styles pour les titres
  heading: {
    fontFamily: '\'Staatliches\', sans-serif',
    fontWeight: '400',
    fontSize: '32px',
    lineHeight: '40px',
    letterSpacing: '0',
  },

  // Styles pour les boutons
  button: {
    fontFamily: '\'Poppins\', sans-serif',
    fontWeight: '600',
    fontSize: '16px',
    lineHeight: '24px',
    letterSpacing: '0',
    textTransform: 'uppercase',
  },

  // Styles responsifs pour la navigation
  nav: {
    fontFamily: { base: '\'Poppins\', sans-serif', lg: '\'Staatliches\', sans-serif' },
    fontWeight: '400',
    fontSize: { base: '1rem', lg: '2rem' },
    lineHeight: '1.2',
  },

  // Styles pour la navbar (avec fontWeight semibold)
  navbar: {
    fontFamily: { base: '\'Poppins\', sans-serif', lg: '\'Staatliches\', sans-serif' },
    fontWeight: 'semibold',
    fontSize: { base: '0.875rem', sm: '0.9375rem', md: '1rem', lg: '2.125rem' },
    lineHeight: '1.2',
  },

  // Styles pour les titres d'app
  appTitle: {
    fontFamily: '\'Staatliches\', sans-serif',
    fontWeight: 'bold',
    fontSize: '10rem',
    lineHeight: '18rem',
  },

  // Styles pour les textes de contenu
  content: {
    fontFamily: '\'Poppins\', sans-serif',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '20px',
  },

  // Styles pour les labels de formulaire
  label: {
    fontFamily: '\'Poppins\', sans-serif',
    fontWeight: '500',
    fontSize: '14px',
    lineHeight: '20px',
  },

  // Styles pour les titres de modal
  modalTitle: {
    fontFamily: '\'Staatliches\', sans-serif',
    fontWeight: '400',
    fontSize: '3.5rem',
    lineHeight: '1.2',
    letterSpacing: '0.05em',
  },

  // Styles pour les boutons de modal
  modalButton: {
    fontFamily: '\'Staatliches\', sans-serif',
    fontWeight: '400',
    fontSize: '2.5rem',
    lineHeight: '1.2',
    letterSpacing: '0.05em',
  },

  // Styles pour les titres de bienvenue
  welcomeTitle: {
    fontFamily: '\'Staatliches\', sans-serif',
    fontWeight: 'bold',
    fontSize: { base: '4rem', lg: '8rem' }, // Réduit de 20rem à 8rem
    lineHeight: '1.2',
    textAlign: 'center',
  },

  // Styles pour les liens de bienvenue
  welcomeLink: {
    fontFamily: '\'Poppins\', sans-serif',
    fontWeight: 'bold',
    fontSize: { base: '1rem', lg: '2rem' },
    lineHeight: '1.2',
  },

  // Styles pour les titres de cartes
  cardTitle: {
    fontFamily: '\'Staatliches\', sans-serif',
    fontWeight: '400',
    fontSize: { base: 'lg', md: 'xl', lg: '2xl' },
    lineHeight: '1.2',
  },

  // Styles pour les sous-titres de cartes
  cardSubtitle: {
    fontFamily: '\'Staatliches\', sans-serif',
    fontWeight: '400',
    fontSize: { base: 'md', md: 'lg', lg: 'xl' },
    lineHeight: '1.3',
  },

  // Styles pour le contenu de cartes
  cardContent: {
    fontFamily: '\'Poppins\', sans-serif',
    fontWeight: '400',
    fontSize: { base: 'sm', md: 'md' },
    lineHeight: '1.4',
    color: 'gray.600',
  },

  // Styles pour les liens de cartes
  cardLink: {
    fontFamily: '\'Poppins\', sans-serif',
    fontWeight: 'medium',
    fontSize: { base: 'xs', md: 'sm' },
    lineHeight: '1.2',
  },
}
