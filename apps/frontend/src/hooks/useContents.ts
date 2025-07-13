import { ContentDto } from '@gazette/shared'
import { useQuery } from '@tanstack/react-query'
import { getUserContent } from '@/services/api/content'
import { useAuth } from './useAuth'

export function useContents() {
  const { user } = useAuth()
  const { data: contents = [], isLoading, isError } = useQuery<ContentDto[]>({
    queryKey: ['contents'],
    queryFn: () => getUserContent(),
    enabled: !!user,
  })

  return { contents, isLoading, isError }
}
