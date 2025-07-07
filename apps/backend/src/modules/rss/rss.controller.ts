import { RssItemDTO } from '@gazette/shared'
import { Controller, Get } from '@nestjs/common'
import { RssService } from './rss.service'

@Controller('rss')
export class RssController {
  constructor(private readonly rssService: RssService) {}

  @Get()
  async getFeeds(): Promise<RssItemDTO[]> {
    return this.rssService.fetchAllFeeds()
  }

  @Get('bondyblog')
  async getBondyBlogFeed(): Promise<RssItemDTO[]> {
    return this.rssService.fetchBondyBlogFeed()
  }

  @Get('arretsurimage')
  async getArretSurImageFeed(): Promise<RssItemDTO[]> {
    return this.rssService.fetchArretSurImageFeed()
  }

  @Get('blast')
  async getBlastFeed(): Promise<RssItemDTO[]> {
    return this.rssService.fetchBlastFeed()
  }
}
