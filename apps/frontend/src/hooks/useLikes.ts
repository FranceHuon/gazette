import { use } from 'react'
import { LikeContext } from '@/contexts/LikeContext.types'

export function useLikes() {
  const context = use(LikeContext)
  if (context === undefined) {
    throw new Error('useLikes must be used within a LikeProvider')
  }
  return context
}
