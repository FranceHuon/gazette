import { useContext } from 'react'
import { LikeContext } from '@/contexts/LikeContext.types'

export function useLikes() {
  const context = useContext(LikeContext)
  if (context === undefined) {
    throw new Error('useLikes must be used within a LikeProvider')
  }
  return context
}
