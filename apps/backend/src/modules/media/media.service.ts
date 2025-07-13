import { EntityManager } from '@mikro-orm/core'
import { Injectable } from '@nestjs/common'
import { Media } from 'src/entities/media.entity'
import { RSS_SOURCES, RssSourceKey } from '../../config/rss-sources'

@Injectable()
export class MediaService {
  constructor(private readonly em: EntityManager) {}

  async findAll(): Promise<Media[]> {
    return this.em.find(Media, {})
  }

  async findBySource(source: string): Promise<Media | null> {
    const sourceConfig = RSS_SOURCES[source as RssSourceKey]
    if (!sourceConfig) {
      return null
    }

    const media = await this.em.findOne(Media, { urlRss: sourceConfig.url })
    return media
  }

  async getMediaMap(): Promise<Map<string, Media>> {
    const em = this.em.fork()
    const medias = await em.find(Media, {})
    const mediaMap = new Map<string, Media>()

    const getSourceFromUrl = (urlRss: string): string | null => {
      const url = urlRss.toLowerCase()

      for (const [key, config] of Object.entries(RSS_SOURCES)) {
        if (url.includes(config.url.toLowerCase())) {
          return key
        }
      }

      return null
    }

    for (const media of medias) {
      const source = getSourceFromUrl(media.urlRss)
      if (source) {
        mediaMap.set(source, media)
      }
    }
    return mediaMap
  }

  async getMediaBySource(source: string): Promise<Media | null> {
    const mediaMap = await this.getMediaMap()
    return mediaMap.get(source) || null
  }

  async getMediaIdsBySource(): Promise<Record<string, string>> {
    const mediaMap = await this.getMediaMap()
    const result: Record<string, string> = {}

    for (const [source, media] of mediaMap.entries()) {
      result[source] = media.id
    }
    return result
  }

  async findByName(name: string): Promise<Media | null> {
    return this.em.findOne(Media, { name })
  }

  async getAllWithDetails(): Promise<Array<{ id: string, name: string, urlRss: string, description: string }>> {
    const medias = await this.findAll()
    return medias.map(media => ({
      id: media.id,
      name: media.name,
      urlRss: media.urlRss,
      description: media.description || '',
    }))
  }
}
