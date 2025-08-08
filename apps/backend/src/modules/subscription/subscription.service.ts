import { CreateSubscriptionDto } from '@gazette/shared'
import { EntityManager } from '@mikro-orm/core'
import { Injectable, NotFoundException } from '@nestjs/common'
import { Media } from 'src/entities/media.entity'
import { Subscription } from 'src/entities/subscription.entity'
import { User } from 'src/entities/user.entity'

@Injectable()
export class SubscriptionsService {
  constructor(private readonly em: EntityManager) {}

  async create(dto: CreateSubscriptionDto, userId: string): Promise<Subscription> {
    const user = await this.em.findOne(User, { id: userId })
    if (!user)
      throw new NotFoundException('User not found')
    const media = await this.em.findOne(Media, { id: dto.mediaId })
    if (!media)
      throw new NotFoundException('Media not found')
    const existingSubscription = await this.em.findOne(Subscription, {
      user: { id: userId },
      media: { id: dto.mediaId },
    })

    if (existingSubscription) {
      return existingSubscription
    }

    const subscription = new Subscription()
    subscription.user = user
    subscription.media = media

    await this.em.persistAndFlush(subscription)
    return subscription
  }

  async findByUserId(userId: string): Promise<Subscription[]> {
    const subscriptions = await this.em.find(Subscription, { user: userId }, { populate: ['media'] })
    return subscriptions
  }

  async delete(id: string): Promise<void> {
    const subscription = await this.em.findOne(Subscription, { id })

    if (!subscription) {
      // Idempotent: si la subscription n'existe pas, on considère que c'est un succès
      return
    }

    await this.em.removeAndFlush(subscription)
  }
}
