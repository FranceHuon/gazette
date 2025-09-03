import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'
import { Media } from '@/entities/media.entity'
import { JwtConfigModule } from '@/modules/jwt/jwt.config.module'
import { MediaController } from '@/modules/media/media.controlller'
import { MediaService } from '@/modules/media/media.service'

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
