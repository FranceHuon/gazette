import { ContentDto, FeedSource } from '@gazette/shared'
import { Injectable } from '@nestjs/common'
import { ArretSurImageFeed } from '../rss/feeds/arretsurimage.feed'
import { BlastFeed } from '../rss/feeds/blast.feed'
import { BondyBlogFeed } from '../rss/feeds/bondyblog.feed'

@Injectable()
export class RssService {
  private readonly sources: FeedSource[] = [BondyBlogFeed, ArretSurImageFeed, BlastFeed]

  async fetchAllFeeds(): Promise<ContentDto[]> {
    const results = await Promise.all(this.sources.map(src => src.fetch()))
    return results.flat()
  }

  async fetchBondyBlogFeed(): Promise<ContentDto[]> {
    return BondyBlogFeed.fetch()
  }

  async fetchArretSurImageFeed(): Promise<ContentDto[]> {
    return ArretSurImageFeed.fetch()
  }

  async fetchBlastFeed(): Promise<ContentDto[]> {
    return BlastFeed.fetch()
  }
}
