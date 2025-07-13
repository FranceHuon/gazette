import { CreateLikeDto } from '@gazette/shared'
import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common'
import { Like } from 'src/entities/like.entity'
import { AuthGuard } from '../auth/auth.guard'
import { LikesService } from './like.service'

interface RequestWithUser extends Request {
  user: {
    id: string
    email: string
    pseudo: string
    role: string
  }
}

@Controller()
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Get('user/likes')
  @UseGuards(AuthGuard)
  async getUserLikes(@Req() req: RequestWithUser) {
    const likes = await this.likesService.findByUserId(req.user.id)
    return likes.map(like => ({
      id: like.id,
      userId: like.user.id,
      contentId: like.content.id,
      createdAt: like.createdAt.toISOString(),
    }))
  }

  @Post('likes')
  async like(@Body() dto: CreateLikeDto): Promise<Like> {
    return this.likesService.create(dto)
  }

  @Delete('likes/:id')
  async unlike(@Param('id') id: string): Promise<void> {
    return this.likesService.delete(id)
  }
}
