import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'
import { Like } from '@/entities/like.entity'
import { Media } from '@/entities/media.entity'
import { User } from '@/entities/user.entity'
import { JwtConfigModule } from '@/modules/jwt/jwt.config.module'
import { LikesController } from './like.controller'
import { LikesService } from './like.service'

@Module({
  imports: [
    MikroOrmModule.forFeature([Like, User, Media]),
    JwtConfigModule,
  ],
  controllers: [LikesController],
  providers: [LikesService],
  exports: [LikesService],
})
export class LikesModule {}
