import { FeedSource, RssItemDto } from '@gazette/shared'
import { EntityManager } from '@mikro-orm/core'
import { Injectable } from '@nestjs/common'
import { Media } from '@/entities/media.entity'
import { createGenericRssFeed } from '@/modules/rss/feeds/generic-rss.feed'

interface FeedConfig {
  sourceKey: string
  url: string
  titleCleaner?: (title: string) => string
  descriptionCleaner?: (description: string) => string
}

@Injectable()
export class RssService {
  constructor(private readonly em: EntityManager) {}

  async fetchAllFeeds(): Promise<RssItemDto[]> {
    const em = this.em.fork()
    const activeMedias = await em.find(Media, {
      isActive: true,
      sourceKey: { $ne: null },
    })

    const sources = activeMedias.map(media => this.createFeedSource(media))
    const results = await Promise.all(sources.map(src => src.fetch()))
    return results.flat()
  }

  private createFeedSource(media: Media): FeedSource {
    const config: FeedConfig = { sourceKey: media.sourceKey!, url: media.urlRss, titleCleaner: this.cleanText, descriptionCleaner: this.cleanHtmlAndText }

    return createGenericRssFeed(config)
  }

  private readonly cleanText = (text: string): string => {
    return text
      .replace(/&#8217;/g, '\'')
      .replace(/&#233;/g, 'é')
      .replace(/&rsquo;/g, '\'')
      .replace(/&eacute;/g, 'é')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .trim()
  }

  private readonly cleanHtmlAndText = (text: string): string => {
    return text
      .replace(/<[^>]*>/g, '')
      .replace(/&#8217;/g, '\'')
      .replace(/&#233;/g, 'é')
      .replace(/&rsquo;/g, '\'')
      .replace(/&eacute;/g, 'é')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .trim()
  }
}
