import { Collection, Entity, OneToMany, Property } from '@mikro-orm/core'
import { Subscription } from '@/entities/subscription.entity'
import { PrimaryKeyUuid } from '@/utils/PrimaryKeyUuid.decorator'

@Entity()
export class User {
  @PrimaryKeyUuid()
  id!: string

  @Property()
  pseudo!: string

  @Property()
  email!: string

  @Property({ hidden: true })
  password!: string

  @Property()
  createdAt = new Date()

  @Property({ onUpdate: () => new Date() })
  lastConnection = new Date()

  @OneToMany(() => Subscription, subscription => subscription.user)
  subscriptions = new Collection<Subscription>(this)
}
