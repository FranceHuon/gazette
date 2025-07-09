import { CreateSubscriptionDto } from '@gazette/shared'
import { Body, Controller, Delete, Param, Post } from '@nestjs/common'
import { Subscription } from 'src/entities/subscription.entity'
import { SubscriptionsService } from './subscription.service'

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private subscriptionsService: SubscriptionsService) {}

  @Post()
  async subscribe(@Body() dto: CreateSubscriptionDto): Promise<Subscription> {
    return this.subscriptionsService.create(dto)
  }

  @Delete(':id')
  async unsubscribe(@Param('id') id: string): Promise<void> {
    return this.subscriptionsService.delete(id)
  }
}
