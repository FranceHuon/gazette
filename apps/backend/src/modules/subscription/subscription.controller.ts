import { CreateSubscriptionDto } from '@gazette/shared'
import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common'
import { Subscription } from '@/entities/subscription.entity'
import { RequestWithUser } from '@/interfaces/request.interface'
import { AuthGuard } from '@/modules/auth/auth.guard'
import { SubscriptionsService } from './subscription.service'

@Controller()
export class SubscriptionsController {
  constructor(private subscriptionsService: SubscriptionsService) {}

  @Get('user/subscriptions')
  @UseGuards(AuthGuard)
  async getUserSubscriptions(@Req() req: RequestWithUser) {
    const subscriptions = await this.subscriptionsService.findByUserId(req.user.id)
    return subscriptions.map(subscription => ({
      id: subscription.id,
      userId: subscription.user.id,
      mediaId: subscription.media.id,
      createdAt: subscription.createdAt.toISOString(),
    }))
  }

  @Post('subscriptions')
  @UseGuards(AuthGuard)
  async subscribe(@Body() dto: CreateSubscriptionDto, @Req() req: RequestWithUser): Promise<Subscription> {
    return this.subscriptionsService.create(dto, req.user.id)
  }

  @Delete('subscriptions/:id')
  @UseGuards(AuthGuard)
  async unsubscribe(@Param('id') id: string): Promise<void> {
    return this.subscriptionsService.delete(id)
  }
}
