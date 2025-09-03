import { Collection, Entity, OneToMany, Property } from '@mikro-orm/core'
import { Subscription } from '@/entities/subscription.entity'
import { PrimaryKeyUuid } from '@/utils/PrimaryKeyUuid.decorator'

@Entity()
export class Media {
  @PrimaryKeyUuid()
  id!: string

  @Property()
  name!: string

  @Property({ nullable: true })
  description!: string

  @Property({ nullable: true })
  picture!: string

  @Property()
  urlRss!: string

  @Property({ nullable: true })
  sourceKey?: string

  @Property({ default: true })
  isActive = true

  @Property()
  createdAt = new Date()

  @OneToMany(() => Subscription, subscription => subscription.media)
  subscribers = new Collection<Subscription>(this)
}
