import { FeedSource, RssItemDto } from '@gazette/shared'
import { Injectable } from '@nestjs/common'
import { RSS_FEEDS } from './feeds'

@Injectable()
export class RssService {
  private readonly sources: FeedSource[] = Object.values(RSS_FEEDS)

  async fetchAllFeeds(): Promise<RssItemDto[]> {
    const results = await Promise.all(this.sources.map(src => src.fetch()))
    return results.flat()
  }

  async fetchBondyBlogFeed(): Promise<RssItemDto[]> {
    return RSS_FEEDS.bondyblog.fetch()
  }

  async fetchArretSurImageFeed(): Promise<RssItemDto[]> {
    return RSS_FEEDS.arretsurimage.fetch()
  }

  async fetchBlastFeed(): Promise<RssItemDto[]> {
    return RSS_FEEDS.blast.fetch()
  }
}
