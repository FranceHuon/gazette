import type { Request } from 'express'
import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from '../auth/auth.guard'
import { ContentService } from './content.service'

interface RequestWithUser extends Request {
  user: {
    sub: string
    email: string
    pseudo: string
    role: string
  }
}

@Controller('contents')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get()
  async getAll() {
    const contents = await this.contentService.getAll()
    return contents
  }

  @Get('media/:mediaId')
  async getByMediaId(@Param('mediaId') mediaId: string) {
    const contents = await this.contentService.getByMediaId(mediaId)
    return contents
  }

  @Get('user/subscriptions')
  @UseGuards(AuthGuard)
  async getUserSubscriptions(@Req() req: RequestWithUser) {
    const contents = await this.contentService.getByUserSubscriptions(req.user.sub)
    return contents
  }
}
