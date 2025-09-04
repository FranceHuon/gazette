import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'
import { User } from '@/entities/user.entity'
import { JwtConfigModule } from '@/modules/jwt/jwt.config.module'
import { SubscriptionsModule } from '@/modules/subscription/subscription.module'
import { UsersController } from './user.controller'
import { UsersService } from './user.service'

@Module({
  imports: [
    MikroOrmModule.forFeature([User]),
    JwtConfigModule,
    SubscriptionsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
