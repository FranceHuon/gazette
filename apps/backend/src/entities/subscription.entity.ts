import { Entity, ManyToOne, Property } from '@mikro-orm/core'
import { PrimaryKeyUuid } from '../utils/PrimaryKeyUuid.decorator'
import { Media } from './media.entity'
import { User } from './user.entity'

@Entity()
export class Subscription {
  @PrimaryKeyUuid()
  id!: string

  @ManyToOne(() => User)
  user!: User

  @ManyToOne(() => Media)
  media!: Media

  @Property()
  createdAt = new Date()
}
