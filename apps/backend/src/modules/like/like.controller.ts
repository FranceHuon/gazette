import { CreateLikeDto } from '@gazette/shared'
import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common'
import { Like } from '@/entities/like.entity'
import { RequestWithUser } from '@/interfaces/request.interface'
import { AuthGuard } from '@/modules/auth/auth.guard'
import { LikesService } from './like.service'

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
  @UseGuards(AuthGuard)
  async like(@Body() dto: CreateLikeDto, @Req() req: RequestWithUser): Promise<Like> {
    const likeDto = { ...dto, userId: req.user.id }
    return this.likesService.create(likeDto)
  }

  @Delete('likes/:id')
  @UseGuards(AuthGuard)
  async unlike(@Param('id') id: string): Promise<void> {
    return this.likesService.delete(id)
  }
}
