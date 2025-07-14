import { Collection, Entity, OneToMany, Property } from '@mikro-orm/core'
import { PrimaryKeyUuid } from '../utils/PrimaryKeyUuid.decorator'
import { Subscription } from './subscription.entity'

@Entity()
export class User {
  @PrimaryKeyUuid()
  id!: string

  @Property()
  pseudo!: string

  @Property()
  email!: string

  @Property()
  password!: string

  @Property()
  createdAt = new Date()

  @Property({ onUpdate: () => new Date() })
  lastConnection = new Date()

  @OneToMany(() => Subscription, subscription => subscription.user)
  subscriptions = new Collection<Subscription>(this)
}
