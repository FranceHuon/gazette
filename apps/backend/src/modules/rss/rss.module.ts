import { Module } from '@nestjs/common'
import { RssService } from '@/modules/rss/rss.service'

@Module({
  providers: [RssService],
  exports: [RssService],
})
export class RssModule {}
