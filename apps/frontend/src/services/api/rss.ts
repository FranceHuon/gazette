import { ContentDto } from '@gazette/shared'
import { api } from '@/config'

export async function fetchFeeds(): Promise<ContentDto[]> {
  return api.get('rss').json<ContentDto[]>()
}
