import { CreateLikeDto } from '@gazette/shared'
import { EntityManager } from '@mikro-orm/core'
import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { Content } from 'src/entities/content.entity'
import { Like } from 'src/entities/like.entity'
import { User } from 'src/entities/user.entity'

@Injectable()
export class LikesService {
  constructor(@Inject(EntityManager) private readonly em: EntityManager) {}

  async create(dto: CreateLikeDto): Promise<Like> {
    const user = await this.em.findOne(User, { id: dto.userId })
    if (!user)
      throw new NotFoundException('User not found')
    const content = await this.em.findOne(Content, { id: dto.contentId })
    if (!content)
      throw new NotFoundException('Content not found')
    const existingLike = await this.em.findOne(Like, {
      user: { id: dto.userId },
      content: { id: dto.contentId },
    })
    if (existingLike) {
      return existingLike
    }

    const like = new Like()
    like.user = user
    like.content = content
    await this.em.persistAndFlush(like)
    return like
  }

  async findByUserId(userId: string): Promise<Like[]> {
    const likes = await this.em.find(Like, { user: userId }, { populate: ['content'] })
    return likes
  }

  async delete(id: string): Promise<void> {
    const like = await this.em.findOne(Like, { id })
    if (!like)
      throw new NotFoundException('Like not found')
    await this.em.removeAndFlush(like)
  }
}
