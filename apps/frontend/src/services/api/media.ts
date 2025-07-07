import { MediaDto } from '@gazette/shared'
import { api } from '@/config'

export async function getAllMedias(): Promise<MediaDto[]> {
  return await api
    .get('medias')
    .json()
}
