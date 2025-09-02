import { EntityManager } from '@mikro-orm/core'
import { Injectable } from '@nestjs/common'
import { Media } from 'src/entities/media.entity'

@Injectable()
export class MediaService {
  constructor(private readonly em: EntityManager) {}

  async findAll(): Promise<Media[]> {
    return this.em.find(Media, {})
  }

  async findBySource(sourceKey: string): Promise<Media | null> {
    return this.em.findOne(Media, { sourceKey })
  }
}
