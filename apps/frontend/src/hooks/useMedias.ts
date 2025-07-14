import { MediaDto } from '@gazette/shared'
import { useQuery } from '@tanstack/react-query'
import { getAllMedias } from '@/services/api/media'
import { useAuth } from './useAuth'

export function useMedias() {
  const { user } = useAuth()
  const { data: medias = [], isLoading, isError } = useQuery<MediaDto[]>({
    queryKey: ['medias'],
    queryFn: () => getAllMedias(),
    enabled: !!user,
  })

  return { medias, isLoading, isError }
}
