import { Entity, ManyToOne, Property } from '@mikro-orm/core'
import { Media } from '@/entities/media.entity'
import { User } from '@/entities/user.entity'
import { PrimaryKeyUuid } from '@/utils/PrimaryKeyUuid.decorator'

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
