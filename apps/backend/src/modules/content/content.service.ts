import { EntityManager } from '@mikro-orm/core'
import { Injectable } from '@nestjs/common'
import { Content } from '@/entities/content.entity'
import { Media } from '@/entities/media.entity'
import { RssService } from '@/modules/rss/rss.service'

@Injectable()
export class ContentService {
  constructor(
    private readonly rssService: RssService,
    private readonly em: EntityManager,
  ) {}

  async getByUserSubscriptions(userId: string): Promise<Content[]> {
    const contents = await this.em.find(Content, {
      media: {
        subscribers: {
          user: { id: userId },
        },
      },
    }, {
      populate: ['media'],
      orderBy: { date: 'DESC' },
    })
    return contents
  }

  async syncRssFeeds(): Promise<{ created: number, updated: number, errors: number }> {
    const em = this.em.fork()
    const rssItems = await this.rssService.fetchAllFeeds()

    const result = { created: 0, updated: 0, errors: 0 }

    for (const item of rssItems) {
      const media = await em.findOne(Media, { sourceKey: item.source })

      if (!media) {
        console.warn(`[ContentService] Aucun média trouvé pour la source: ${item.source}`)
        result.errors++
        continue
      }

      const existing = await em.findOne(Content, { link: item.link })
      if (existing) {
        result.updated++
        continue
      }

      const content = new Content()
      content.title = item.title
      content.description = item.description
      content.link = item.link
      content.date = new Date(item.pubDate)
      content.media = media
      content.createdAt = new Date()

      await em.persistAndFlush(content)
      result.created++
    }

    return result
  }
}
