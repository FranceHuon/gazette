import { Body, Controller, Delete, Post, Req, UseGuards } from '@nestjs/common'
import { RequestWithUser } from '@/interfaces/request.interface'
import { AuthGuard } from '@/modules/auth/auth.guard'
import { SubscriptionsService } from '@/modules/subscription/subscription.service'
import { UsersService } from './user.service'

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService, private subscriptionsService: SubscriptionsService) { }

  @Post()
  async create(
    @Body() body: { pseudo: string, email: string, password: string },
  ) {
    const newUser = await this.usersService.create(body)
    return {
      user: {
        id: newUser.id,
        pseudo: newUser.pseudo,
        email: newUser.email,
        createdAt: newUser.createdAt,
      },
    }
  }

  @UseGuards(AuthGuard)
  @Delete('me')
  async deleteCurrentUser(@Req() req: RequestWithUser) {
    await this.usersService.delete(req.user.id)
    return { message: 'User deleted successfully' }
  }
}
