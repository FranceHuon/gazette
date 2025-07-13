import { EntityManager } from '@mikro-orm/core'
import { Injectable } from '@nestjs/common'
import { Media } from '../entities/media.entity'

@Injectable()
export class MediaSeeder {
  constructor(private readonly em: EntityManager) {}

  async seed(): Promise<void> {
    console.log('[MediaSeeder] Début de la création des médias...')

    const medias = [
      {
        name: 'Bondy Blog',
        description: 'Blog d\'actualités et d\'investigation',
        picture: 'https://www.bondyblog.fr/wp-content/uploads/2019/01/logo-bondy-blog.png',
        urlRss: 'https://www.bondyblog.fr/feed/',
      },
      {
        name: 'Arrêt sur Images',
        description: 'Média d\'analyse des médias',
        picture: 'https://www.arretsurimages.net/images/logo-asi.png',
        urlRss: 'https://api.arretsurimages.net/api/public/rss/all-content',
      },
      {
        name: 'Blast',
        description: 'Média d\'investigation',
        picture: 'https://www.blast-info.fr/assets/images/logo-blast.png',
        urlRss: 'https://api.blast-info.fr/rss.xml',
      },
    ]

    for (const mediaData of medias) {
      // Vérifier si le média existe déjà
      const existing = await this.em.findOne(Media, { urlRss: mediaData.urlRss })

      if (existing) {
        console.log(`[MediaSeeder] Média existant: ${existing.name} (${existing.id})`)
        continue
      }

      const media = new Media()
      media.name = mediaData.name
      media.description = mediaData.description
      media.picture = mediaData.picture
      media.urlRss = mediaData.urlRss

      await this.em.persistAndFlush(media)
      console.log(`[MediaSeeder] Nouveau média créé: ${media.name} (${media.id})`)
    }

    console.log('[MediaSeeder] Création des médias terminée')
  }
}
