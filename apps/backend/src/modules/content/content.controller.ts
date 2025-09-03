import type { Request } from 'express'
import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@/modules/auth/auth.guard'
import { ContentService } from '@/modules/content/content.service'

interface RequestWithUser extends Request {
  user: {
    id: string
    email: string
    pseudo: string
  }
}

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
