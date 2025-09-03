import { Entity, ManyToOne, Property } from '@mikro-orm/core'
import { Media } from '@/entities/media.entity'
import { PrimaryKeyUuid } from '@/utils/PrimaryKeyUuid.decorator'

@Entity()
export class Content {
  @PrimaryKeyUuid()
  id!: string

  @Property()
  title!: string

  @Property()
  date = new Date()

  @Property({ nullable: true, length: 2000 })
  description!: string

  @Property({ nullable: true })
  link!: string

  @Property()
  createdAt = new Date()

  @ManyToOne(() => Media, { nullable: true })
  media: Media
}
