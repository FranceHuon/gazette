import { useToast } from '@chakra-ui/react'
import { CreateLikeDto, LikeDto } from '@gazette/shared'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { use, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { createLike, deleteLike, getUserLikes } from '@/services/api/likes'
import { AuthContext } from './AuthContext'
import { LikeContext } from './LikeContext.types'

interface LikeProviderProps {
  children: React.JSX.Element | React.JSX.Element[]
}

export function LikeProvider({ children }: LikeProviderProps) {
  const queryClient = useQueryClient()
  const context = use(AuthContext)
  const userId = context?.user?.id || ''
  const toast = useToast()
  const { t } = useTranslation()

  const { data: likes = [], isLoading, isError } = useQuery({
    queryKey: ['likes', userId],
    queryFn: () => getUserLikes(),
    enabled: !!userId,
  })

  const createMutation = useMutation({
    mutationFn: (dto: CreateLikeDto) => createLike(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['likes', userId] })
      toast({
        title: t('favorites.added'),
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
    },
    onError: (error) => {
      console.error('Like error:', error)
      toast({
        title: t('common.error'),
        description: t('favorites.addError'),
        status: 'error',
        duration: 4000,
        isClosable: true,
      })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (likeId: string) => deleteLike(likeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['likes', userId] })
      toast({
        title: t('favorites.removed'),
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
    },
    onError: (error) => {
      console.error('Unlike error:', error)
      toast({
        title: t('common.error'),
        description: t('favorites.removeError'),
        status: 'error',
        duration: 4000,
        isClosable: true,
      })
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
    <LikeContext value={value}>
      {children}
    </LikeContext>
  )
}
