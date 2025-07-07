import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'
import { Media } from 'src/entities/media.entity'
import { Subscription } from 'src/entities/subscription.entity'
import { User } from 'src/entities/user.entity'
import { SubscriptionsController } from './subscription.controller'
import { SubscriptionsService } from './subscription.service'

@Module({
  imports: [MikroOrmModule.forFeature([Subscription, User, Media])],
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService],
  exports: [SubscriptionsService],
})
export class SubscriptionsModule {}
