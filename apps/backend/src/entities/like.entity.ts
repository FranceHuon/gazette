import { Entity, ManyToOne, Property } from '@mikro-orm/core'
import { Content } from '@/entities/content.entity'
import { User } from '@/entities/user.entity'
import { PrimaryKeyUuid } from '@/utils/PrimaryKeyUuid.decorator'

@Entity()
export class Like {
  @PrimaryKeyUuid()
  id!: string

  @ManyToOne(() => User)
  user!: User

  @ManyToOne(() => Content)
  content!: Content

  @Property()
  createdAt = new Date()
}
