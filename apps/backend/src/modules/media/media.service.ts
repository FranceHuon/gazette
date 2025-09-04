import { EntityManager } from '@mikro-orm/core'
import { Injectable } from '@nestjs/common'
import { Media } from '@/entities/media.entity'

@Injectable()
export class MediaService {
  constructor(private readonly em: EntityManager) {}

  async findAll(): Promise<Media[]> {
    return this.em.find(Media, {})
  }
}
