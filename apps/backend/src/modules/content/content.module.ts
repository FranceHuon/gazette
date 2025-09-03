import { Module } from '@nestjs/common'
import { ContentController } from '@/modules/content/content.controller'
import { ContentService } from '@/modules/content/content.service'
import { JwtConfigModule } from '@/modules/jwt/jwt.config.module'
import { MediaModule } from '@/modules/media/media.module'
import { RssModule } from '@/modules/rss/rss.module'

@Module({
  imports: [RssModule, MediaModule, JwtConfigModule],
  controllers: [ContentController],
  providers: [ContentService],
  exports: [ContentService],
})
export class ContentModule {}
