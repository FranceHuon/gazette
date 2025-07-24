import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'
import { Media } from 'src/entities/media.entity'
import { JwtConfigModule } from '../jwt/jwt.config.module'
import { MediaController } from './media.controlller'
import { MediaService } from './media.service'

@Module({
  imports: [
    MikroOrmModule.forFeature([Media]),
    JwtConfigModule,
  ],
  controllers: [MediaController],
  providers: [MediaService],
  exports: [MediaService],
})
export class MediaModule {}
