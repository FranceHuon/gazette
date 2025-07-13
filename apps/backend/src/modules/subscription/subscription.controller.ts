import type { Request } from 'express'
import { CreateSubscriptionDto } from '@gazette/shared'
import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common'
import { Subscription } from 'src/entities/subscription.entity'
import { AuthGuard } from '../auth/auth.guard'
import { SubscriptionsService } from './subscription.service'

interface RequestWithUser extends Request {
  user: {
    id: string
    email: string
    pseudo: string
    role: string
  }
}

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
  async subscribe(@Body() dto: CreateSubscriptionDto): Promise<Subscription> {
    return this.subscriptionsService.create(dto)
  }

  @Delete('subscriptions/:id')
  async unsubscribe(@Param('id') id: string): Promise<void> {
    return this.subscriptionsService.delete(id)
  }
}
