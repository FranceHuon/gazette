import type { EntityManager } from '@mikro-orm/core'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { Seeder } from '@mikro-orm/seeder'
import { Media } from '../entities/media.entity'

export class MediaSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const dataPath = join(__dirname, 'data', 'media-data.json')
    const mediaData = JSON.parse(readFileSync(dataPath, 'utf-8'))

    for (const item of mediaData) {
      const existing = await em.findOne(Media, { urlRss: item.urlRss })

      if (!existing) {
        em.create(Media, item)
      }
    }
  }
}
