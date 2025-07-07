import { RssItemDTO } from '@gazette/shared'
import { api } from '@/config'

export async function fetchFeeds(): Promise<RssItemDTO[]> {
  return api.get('rss').json<RssItemDTO[]>()
}
