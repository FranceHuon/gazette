import { LikeDto } from '@gazette/shared'
import { createContext } from 'react'

export interface LikeContextType {
  likes: LikeDto[]
  isLoading: boolean
  isError: boolean
  like: (contentId: string) => void
  dislike: (contentId: string) => void
  isLiked: (contentId: string) => boolean
}

export const LikeContext = createContext<LikeContextType | undefined>(undefined)
