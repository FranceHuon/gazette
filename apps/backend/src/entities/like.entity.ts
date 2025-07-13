import { Entity, ManyToOne, Property } from '@mikro-orm/core'
import { PrimaryKeyUuid } from '../utils/PrimaryKeyUuid.decorator'
import { Content } from './content.entity'
import { User } from './user.entity'

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
