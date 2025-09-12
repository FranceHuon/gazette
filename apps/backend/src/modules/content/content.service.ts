import { EntityManager } from '@mikro-orm/core'
import { Inject, Injectable, OnModuleInit } from '@nestjs/common'
import { Client } from 'typesense'
import { Content } from '@/entities/content.entity'
import { Media } from '@/entities/media.entity'
import { RssService } from '@/modules/rss/rss.service'
import { CONTENTS_SCHEMA } from './content.schema'

@Injectable()
export class ContentService implements OnModuleInit {
  constructor(
    private readonly rssService: RssService,
    private readonly em: EntityManager,
    @Inject('TYPESENSE_CLIENT') private readonly typesense: Client,
  ) {}

  async onModuleInit() {
    try {
      await this.typesense.collections().create(CONTENTS_SCHEMA)
      console.log('Collection created')
    }
    catch (error) {
      if (error?.httpStatus === 400 && error.message.includes('already exists')) {
        console.log('Collection already exists')
      }
      else {
        throw error
      }
    }
  }

  async testTypesense() {
    const health = await this.typesense.health.retrieve()
    console.log('Typesense health:', health)
  }

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

      try {
        await this.typesense
          .collections('contents')
          .documents()
          .upsert({
            id: content.id,
            title: content.title,
            description: content.description ?? '',
            link: content.link,
            date: content.date.getTime(),
            mediaId: content.media.id,
          })
      }
      catch (error) {
        console.error('Error upserting content to Typesense:', error)
      }
    }

    return result
  }
}
