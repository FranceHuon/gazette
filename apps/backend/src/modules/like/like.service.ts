import { CreateLikeDto } from '@gazette/shared'
import { EntityManager } from '@mikro-orm/core'
import { Inject, Injectable } from '@nestjs/common'
import { Content } from '@/entities/content.entity'
import { Like } from '@/entities/like.entity'
import { BaseUserRelationService } from '@/utils/base-user-relation.service'

@Injectable()
export class LikesService extends BaseUserRelationService<Like> {
  constructor(@Inject(EntityManager) em: EntityManager) {
    super(em)
  }

  async create(dto: CreateLikeDto): Promise<Like> {
    const user = await this.validateUser(dto.userId)
    const content = await this.validateEntity(Content, dto.contentId, 'Content not found')

    const existingLike = await this.checkExisting(Like, {
      user: { id: dto.userId },
      content: { id: dto.contentId },
    })

    if (existingLike) {
      return existingLike
    }

    const like = new Like()
    like.user = user
    like.content = content
    return this.createEntity(like)
  }

  async findByUserId(userId: string): Promise<Like[]> {
    return this.findEntitiesByUserId(Like, userId, ['content', 'user'])
  }

  async delete(id: string): Promise<void> {
    return this.deleteEntity(Like, id, 'Like not found')
  }
}
