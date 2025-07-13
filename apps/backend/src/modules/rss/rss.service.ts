import { ContentDto, FeedSource } from '@gazette/shared'
import { Injectable } from '@nestjs/common'
import { RSS_FEEDS } from './feeds'

@Injectable()
export class RssService {
  private readonly sources: FeedSource[] = Object.values(RSS_FEEDS)

  async fetchAllFeeds(): Promise<ContentDto[]> {
    const results = await Promise.all(this.sources.map(src => src.fetch()))
    return results.flat()
  }

  async fetchBondyBlogFeed(): Promise<ContentDto[]> {
    return RSS_FEEDS.bondyblog.fetch()
  }

  async fetchArretSurImageFeed(): Promise<ContentDto[]> {
    return RSS_FEEDS.arretsurimage.fetch()
  }

  async fetchBlastFeed(): Promise<ContentDto[]> {
    return RSS_FEEDS.blast.fetch()
  }
}
