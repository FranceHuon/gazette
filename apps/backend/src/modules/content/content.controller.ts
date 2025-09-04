import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { RequestWithUser } from '@/interfaces/request.interface'
import { AuthGuard } from '@/modules/auth/auth.guard'
import { ContentService } from '@/modules/content/content.service'

@Controller('contents')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get('user/subscriptions')
  @UseGuards(AuthGuard)
  async getUserSubscriptions(@Req() req: RequestWithUser) {
    const contents = await this.contentService.getByUserSubscriptions(req.user.id)
    return contents
  }
}
