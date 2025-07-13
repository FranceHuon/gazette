import { EntityManager } from '@mikro-orm/core'
import { Injectable } from '@nestjs/common'
import { Media } from 'src/entities/media.entity'

@Injectable()
export class MediaService {
  constructor(private readonly em: EntityManager) {}

  async findAll(): Promise<Media[]> {
    return this.em.find(Media, {})
  }

  async findBySource(source: string): Promise<Media | null> {
    // Mapping des sources vers les URLs RSS pour trouver le bon média
    const sourceToUrlMap: Record<string, string> = {
      bondyblog: 'https://www.bondyblog.fr/feed/',
      arretsurimage: 'https://api.arretsurimages.net/api/public/rss/all-content',
      blast: 'https://api.blast-info.fr/rss.xml',
    }

    const targetUrl = sourceToUrlMap[source]
    if (!targetUrl) {
      return null
    }

    const media = await this.em.findOne(Media, { urlRss: targetUrl })
    return media
  }

  async getMediaMap(): Promise<Map<string, Media>> {
    const em = this.em.fork()
    const medias = await em.find(Media, {})
    const mediaMap = new Map<string, Media>()

    // Fonction pour déterminer la source à partir de l'URL RSS
    const getSourceFromUrl = (urlRss: string): string | null => {
      const url = urlRss.toLowerCase()

      if (url.includes('bondyblog')) {
        return 'bondyblog'
      }
      else if (url.includes('arretsurimages') || url.includes('arretsurimage')) {
        return 'arretsurimage'
      }
      else if (url.includes('blast-info') || url.includes('blast')) {
        return 'blast'
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

  // Fonction pour récupérer un média par sa source RSS
  async getMediaBySource(source: string): Promise<Media | null> {
    const mediaMap = await this.getMediaMap()
    return mediaMap.get(source) || null
  }

  // Fonction pour récupérer tous les IDs des médias avec leurs sources
  async getMediaIdsBySource(): Promise<Record<string, string>> {
    const mediaMap = await this.getMediaMap()
    const result: Record<string, string> = {}

    for (const [source, media] of mediaMap.entries()) {
      result[source] = media.id
    }
    return result
  }

  // Méthode pour obtenir un média par son nom (utile pour le debug)
  async findByName(name: string): Promise<Media | null> {
    return this.em.findOne(Media, { name })
  }

  // Méthode pour lister tous les médias avec leurs détails
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
