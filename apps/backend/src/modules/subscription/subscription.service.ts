import { CreateSubscriptionDto } from '@gazette/shared'
import { EntityManager } from '@mikro-orm/core'
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { Media } from 'src/entities/media.entity'
import { Subscription } from 'src/entities/subscription.entity'
import { User } from 'src/entities/user.entity'

@Injectable()
export class SubscriptionsService {
  constructor(private readonly em: EntityManager) {}

  async create(dto: CreateSubscriptionDto): Promise<Subscription> {
    const user = await this.em.findOne(User, { id: dto.userId })

    if (!user)
      throw new NotFoundException('User not found')

    const media = await this.em.findOne(Media, { id: dto.mediaId })
    if (!media)
      throw new NotFoundException('Media not found')

    // Vérifier si l'abonnement existe déjà
    const existingSubscription = await this.em.findOne(Subscription, {
      user: { id: dto.userId },
      media: { id: dto.mediaId },
    })

    if (existingSubscription) {
      throw new ConflictException('Subscription already exists')
    }

    const subscription = new Subscription()
    subscription.user = user
    subscription.media = media

    await this.em.persistAndFlush(subscription)
    return subscription
  }

  async findByUserId(userId: string): Promise<Subscription[]> {
    return this.em.find(Subscription, { user: userId }, { populate: ['media'] })
  }

  async delete(id: string): Promise<void> {
    const subscription = await this.em.findOne(Subscription, { id })

    if (!subscription) {
      throw new NotFoundException('Subscription not found')
    }

    await this.em.removeAndFlush(subscription)
  }
}
