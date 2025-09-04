import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'
import { Media } from '@/entities/media.entity'
import { Subscription } from '@/entities/subscription.entity'
import { User } from '@/entities/user.entity'
import { JwtConfigModule } from '@/modules/jwt/jwt.config.module'
import { SubscriptionsController } from './subscription.controller'
import { SubscriptionsService } from './subscription.service'

@Module({
  imports: [MikroOrmModule.forFeature([Subscription, User, Media]), JwtConfigModule],
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService],
  exports: [SubscriptionsService],
})
export class SubscriptionsModule {}
