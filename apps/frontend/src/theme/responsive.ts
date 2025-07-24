import { useBreakpointValue } from '@chakra-ui/react'

// Design tokens responsives centralisés
export function useResponsiveTokens() {
  const iconSize = useBreakpointValue({
    base: '1.5rem',
    sm: '1.75rem',
    md: '2rem',
    lg: '2.25rem',
  })

  const fontSize = useBreakpointValue({
    base: '0.875rem',
    sm: '0.9375rem',
    md: '1rem',
    lg: '2.125rem',
  })

  const spacing = useBreakpointValue({
    base: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '0.25rem',
  })

  const navbarStyles = useBreakpointValue({
    base: {
      bottom: 0,
      top: 'auto',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '100%',
      flexDirection: 'row' as const,
      justifyContent: 'space-around',
      borderRadius: '0',
      marginBottom: 5,
    },
    lg: {
      flexDirection: 'row' as const,
      color: 'color.chaletGreen',
    },
  })

  const titleFontSize = useBreakpointValue({
    base: '2rem',
    sm: '3rem',
    md: '5rem',
    lg: '7rem',
  })

  // Nouveaux tokens pour les cartes
  const cardDimensions = useBreakpointValue({
    base: { width: '100%', height: 'auto', minHeight: '400px' },
    sm: { width: '350px', height: '400px' },
    md: { width: '450px', height: '500px' },
    lg: { width: '600px', height: '600px' },
  })

  const cardSpacing = useBreakpointValue({
    base: '16px',
    md: '24px',
    lg: '40px',
  })

  const pagePadding = useBreakpointValue({
    base: '16px',
    md: '24px',
    lg: '40px',
  })

  const headingSizes = useBreakpointValue({
    base: { h1: 'xl', h2: 'lg', h3: 'md' },
    md: { h1: '2xl', h2: 'xl', h3: 'lg' },
    lg: { h1: '3xl', h2: '2xl', h3: 'xl' },
  })

  return {
    iconSize,
    fontSize,
    spacing,
    navbarStyles,
    titleFontSize,
    cardDimensions,
    cardSpacing,
    pagePadding,
    headingSizes,
  }
}

// Hook pour détecter si on est sur mobile
export function useIsMobile() {
  return useBreakpointValue({
    base: true,
    lg: false,
  }) || false
}

// Hook pour détecter si on est sur desktop
export function useIsDesktop() {
  return useBreakpointValue({
    base: false,
    lg: true,
  }) || false
}

// Hook pour les breakpoints personnalisés
export function useBreakpoint() {
  return useBreakpointValue({
    base: 'mobile',
    sm: 'small',
    md: 'tablet',
    lg: 'desktop',
    xl: 'wide',
  }) || 'mobile'
}
