import { LikeContext } from '@/contexts/LikeContext.types'
import { useContextSafe } from './useContext'

export function useLikes() {
  return useContextSafe(LikeContext, 'useLikes must be used within a LikeProvider')
}
