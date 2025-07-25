import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { Box, Spinner } from '@chakra-ui/react'

// Lazy loading des composants lourds
export const LazyWelcomeDisplay = dynamic(
  () => import('@/components/custom/WelcomeDisplay'),
  {
    loading: () => (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" color="color.chaletGreen" />
      </Box>
    ),
    ssr: false,
  }
)

export const LazyRssCard = dynamic(
  () => import('@/components/custom/RssCard'),
  {
    loading: () => (
      <Box p={4} textAlign="center">
        <Spinner color="color.chaletGreen" />
      </Box>
    ),
  }
)

export const LazyModal = dynamic(
  () => import('@/components/custom/Modal').then(mod => ({ default: mod.WelcomeModal })),
  {
    loading: () => null,
    ssr: false,
  }
)

// Wrapper pour Suspense
export function LazyWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" color="color.chaletGreen" />
      </Box>
    }>
      {children}
    </Suspense>
  )
} 