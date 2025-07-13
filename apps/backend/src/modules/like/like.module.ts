import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'
import { Like } from 'src/entities/like.entity'
import { Media } from 'src/entities/media.entity'
import { User } from 'src/entities/user.entity'
import { JwtConfigModule } from '../jwt/jwt.config.module'
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
