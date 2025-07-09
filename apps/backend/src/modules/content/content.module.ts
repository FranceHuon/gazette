import { Module } from '@nestjs/common'
import { RssModule } from '../rss/rss.module'
import { ContentController } from './content.controller'
import { ContentService } from './content.service'

@Module({
  imports: [RssModule],
  controllers: [ContentController],
  providers: [ContentService],
  exports: [ContentService],
})
export class ContentModule {}
