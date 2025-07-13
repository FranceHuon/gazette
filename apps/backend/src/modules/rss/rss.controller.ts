import { ContentDto } from '@gazette/shared'
import { Controller, Get } from '@nestjs/common'
import { RssService } from './rss.service'

@Controller('rss')
export class RssController {
  constructor(private readonly rssService: RssService) {}

  @Get()
  async getFeeds(): Promise<ContentDto[]> {
    return this.rssService.fetchAllFeeds()
  }

  @Get('bondyblog')
  async getBondyBlogFeed(): Promise<ContentDto[]> {
    return this.rssService.fetchBondyBlogFeed()
  }

  @Get('arretsurimage')
  async getArretSurImageFeed(): Promise<ContentDto[]> {
    return this.rssService.fetchArretSurImageFeed()
  }

  @Get('blast')
  async getBlastFeed(): Promise<ContentDto[]> {
    return this.rssService.fetchBlastFeed()
  }
}
