import { EntityManager } from '@mikro-orm/core'
import { Injectable } from '@nestjs/common'
import { RSS_SOURCES } from '../config/rss-sources'
import { Media } from '../entities/media.entity'

@Injectable()
export class MediaSeeder {
  constructor(private readonly em: EntityManager) {}

  async seed(): Promise<void> {
    console.log('[MediaSeeder] Début de la création des médias...')

    for (const [sourceKey, sourceConfig] of Object.entries(RSS_SOURCES)) {
      // Vérifier si le média existe déjà
      const existing = await this.em.findOne(Media, { urlRss: sourceConfig.url })

      if (existing) {
        console.log(`[MediaSeeder] Média existant: ${existing.name} (${existing.id})`)
        continue
      }

      const media = new Media()
      media.name = sourceConfig.name
      media.description = sourceConfig.description
      media.picture = sourceConfig.picture
      media.urlRss = sourceConfig.url

      await this.em.persistAndFlush(media)
      console.log(`[MediaSeeder] Nouveau média créé: ${media.name} (${media.id})`)
    }

    console.log('[MediaSeeder] Création des médias terminée')
  }
}
