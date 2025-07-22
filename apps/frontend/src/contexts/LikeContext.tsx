import { CreateLikeDto, LikeDto } from '@gazette/shared'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback, useContext, useMemo } from 'react'
import { createLike, deleteLike, getUserLikes } from '@/services/api/likes'
import { AuthContext } from './AuthContext'
import { LikeContext } from './LikeContext.types'

export function LikeProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient()
  const context = useContext(AuthContext)
  const userId = context?.user?.id || ''

  const { data: likes = [], isLoading, isError } = useQuery({
    queryKey: ['likes', userId],
    queryFn: () => getUserLikes(),
    enabled: !!userId,
  })

  const createMutation = useMutation({
    mutationFn: (dto: CreateLikeDto) => createLike(dto),
    onSuccess: () => {
      console.warn('Like created successfully')
      queryClient.invalidateQueries({ queryKey: ['likes', userId] })
    },
    onError: (error) => {
      console.warn('Error creating like:', error)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (likeId: string) => deleteLike(likeId),
    onSuccess: () => {
      console.warn('Like deleted successfully')
      queryClient.invalidateQueries({ queryKey: ['likes', userId] })
    },
    onError: (error) => {
      console.warn('Error deleting like:', error)
    },
  })

  const like = useCallback((contentId: string) => {
    if (!userId) {
      return
    }
    createMutation.mutate({ userId, contentId })
  }, [userId, createMutation])

  const dislike = useCallback((contentId: string) => {
    if (!userId)
      return
    const like = likes.find((l: LikeDto) => l.contentId === contentId)
    if (like)
      deleteMutation.mutate(like.id)
  }, [userId, likes, deleteMutation])

  const isLiked = useCallback((contentId: string): boolean => {
    const liked = likes.some((l: LikeDto) => l.contentId === contentId)
    return liked
  }, [likes])

  const value = useMemo(() => ({ likes, isLoading, isError, like, dislike, isLiked }), [likes, isLoading, isError, like, dislike, isLiked])

  return (
    <LikeContext.Provider value={value}>
      {children}
    </LikeContext.Provider>
  )
}
