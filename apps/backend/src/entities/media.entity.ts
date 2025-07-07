import { Collection, Entity, OneToMany, Property } from '@mikro-orm/core'
import { PrimaryKeyUuid } from '../utils/PrimaryKeyUuid.decorator'
import { Subscription } from './subscription.entity'

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

  @Property()
  createdAt = new Date()

  @OneToMany(() => Subscription, subscription => subscription.media)
  subscribers = new Collection<Subscription>(this)
}
