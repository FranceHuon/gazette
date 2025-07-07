import { SubscriptionDto, UserRole } from '@gazette/shared'
import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Query, UseGuards } from '@nestjs/common'
import { Roles } from 'src/modules/roles/roles.decorator'
import { AuthGuard } from '../auth/auth.guard'
import { SubscriptionsService } from '../subscription/subscription.service'
import { UsersService } from './user.service'

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService, private subscriptionsService: SubscriptionsService) { }
  @Post()
  async create(
    @Body() body: { pseudo: string, email: string, password: string },
  ) {
    const user = body
    const newUser = await this.usersService.create(user)
    return newUser
  }

  @Get()
  async getAll() {
    const users = await this.usersService.getAll()
    return users
  }

  @Get('by-email')
  async findOne(@Query('email') email: string) {
    const user = await this.usersService.findOne(email)
    return user
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @Roles(UserRole.ADMIN)
  async deleteUser(@Param('id') id: string) {
    await this.usersService.delete(id)
    return { message: 'User deleted successfully' }
  }

  @Get(':userId/subscriptions')
  async getUserSubscriptions(@Param('userId') userId: string): Promise<SubscriptionDto[]> {
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
