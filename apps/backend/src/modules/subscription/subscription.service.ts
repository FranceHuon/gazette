import { CreateSubscriptionDto } from '@gazette/shared'
import { EntityManager } from '@mikro-orm/core'
import { Injectable } from '@nestjs/common'
import { Media } from '@/entities/media.entity'
import { Subscription } from '@/entities/subscription.entity'
import { BaseUserRelationService } from '@/utils/base-user-relation.service'

@Injectable()
export class SubscriptionsService extends BaseUserRelationService<Subscription> {
  constructor(em: EntityManager) {
    super(em)
  }

  async create(dto: CreateSubscriptionDto, userId: string): Promise<Subscription> {
    const user = await this.validateUser(userId)
    const media = await this.validateEntity(Media, dto.mediaId, 'Media not found')

    const existingSubscription = await this.checkExisting(Subscription, {
      user: { id: userId },
      media: { id: dto.mediaId },
    })

    if (existingSubscription) {
      return existingSubscription
    }

    const subscription = new Subscription()
    subscription.user = user
    subscription.media = media
    return this.createEntity(subscription)
  }

  async findByUserId(userId: string): Promise<Subscription[]> {
    return this.findEntitiesByUserId(Subscription, userId, ['media', 'user'])
  }

  async delete(id: string): Promise<void> {
    // Idempotent deletion (no error if not found)
    return this.deleteEntity(Subscription, id)
  }
}
