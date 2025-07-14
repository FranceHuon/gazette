import { RssItemDto } from '@gazette/shared'
import { api } from '@/config'

export async function fetchFeeds(): Promise<RssItemDto[]> {
  return api.get('rss').json<RssItemDto[]>()
}
