import { EntityRepository } from '@mikro-orm/core'
import { Injectable } from '@nestjs/common'
import { Content } from 'src/entities/content.entity'
import { Media } from 'src/entities/media.entity'
import { RssService } from '../rss/rss.service'

@Injectable()
export class ContentService {
  constructor(
    private readonly rssService: RssService,
    private readonly mediaRepository: EntityRepository<Media>,
    private readonly contentRepository: EntityRepository<Content>,
  ) {}

  async syncRssFeeds(): Promise<{ created: number, updated: number, errors: number }> {
    const rssItems = await this.rssService.fetchAllFeeds()
    const medias = await this.mediaRepository.findAll()

    const mediaMap = new Map(
      medias.map((media) => {
        const host = new URL(media.urlRss).hostname.replace(/^www\./, '')
        return [host, media]
      }),
    )

    const result = { created: 0, updated: 0, errors: 0 }

    for (const item of rssItems) {
      let itemHost: string

      try {
        itemHost = new URL(item.link).hostname.replace(/^www\./, '')
      }
      catch (err) {
        result.errors++
        continue
      }

      const media = mediaMap.get(itemHost)

      if (!media) {
        result.errors++
        continue
      }

      const existing = await this.contentRepository.findOne({ link: item.link })
      if (existing) {
        result.updated++
        continue
      }

      const content = this.contentRepository.create({
        title: item.title,
        description: item.description,
        link: item.link,
        date: new Date(item.pubDate),
        mediaId: media,
        createdAt: new Date(),

      })

      await this.contentRepository.persistAndFlush(content)
      result.created++
    }
    return result 
  }
}
