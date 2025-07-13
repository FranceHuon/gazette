import { Module } from '@nestjs/common'
import { JwtConfigModule } from '../jwt/jwt.config.module'
import { MediaModule } from '../media/media.module'
import { RssModule } from '../rss/rss.module'
import { ContentController } from './content.controller'
import { ContentService } from './content.service'

@Module({
  imports: [RssModule, MediaModule, JwtConfigModule],
  controllers: [ContentController],
  providers: [ContentService],
  exports: [ContentService],
})
export class ContentModule {}
