import { SubscriptionDto } from '@gazette/shared'
import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Query, Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from '../auth/auth.guard'
import { SubscriptionsService } from '../subscription/subscription.service'
import { UsersService } from './user.service'

interface RequestWithUser extends Request {
  user: {
    id: string
    email: string
    pseudo: string
  }
}

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

  @Get()
  @UseGuards(AuthGuard)
  async getAll() {
    const users = await this.usersService.getAll()
    return users
  }

  @Get('by-email')
  @UseGuards(AuthGuard)
  async findOne(@Query('email') email: string) {
    const user = await this.usersService.findOne(email)
    return user
  }

  @UseGuards(AuthGuard)
  @Delete('me')
  async deleteCurrentUser(@Req() req: RequestWithUser) {
    await this.usersService.delete(req.user.id)
    return { message: 'User deleted successfully' }
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    await this.usersService.delete(id)
    return { message: 'User deleted successfully' }
  }

  @Get(':userId/subscriptions')
  @UseGuards(AuthGuard)
  async getUserSubscriptions(@Param('userId') userId: string, @Req() req: RequestWithUser): Promise<SubscriptionDto[]> {
    if (req.user.id !== userId) {
      throw new NotFoundException('Access denied')
    }
    const subscriptions = await this.subscriptionsService.findByUserId(userId)
    if (!subscriptions) {
      throw new NotFoundException('Subscriptions not found for user')
    }
    return subscriptions.map(subscription => ({
      id: subscription.id,
      userId: subscription.user.id,
      mediaId: subscription.media.id,
      createdAt: subscription.createdAt.toISOString(),
    }))
  }
}
