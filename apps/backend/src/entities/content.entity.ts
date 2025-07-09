import { Entity, ManyToOne, Property } from '@mikro-orm/core'
import { PrimaryKeyUuid } from '../utils/PrimaryKeyUuid.decorator'
import { Media } from './media.entity'

@Entity()
export class Content {
  @PrimaryKeyUuid()
  id!: string

  @Property()
  title!: string

  @Property()
  date = new Date()

  @Property({ nullable: true })
  description!: string

  @Property({ nullable: true })
  link!: string

  @Property()
  createdAt = new Date()

  @ManyToOne(() => Media, { nullable: true })
  media: Media
}
