import { CreateSubscriptionDto, SubscriptionDto } from '@gazette/shared'
import { api } from '@/config'

export async function createSubscription(dto: CreateSubscriptionDto): Promise<SubscriptionDto> {
  return api.post('subscriptions', { json: dto }).json()
}

export async function getUserSubscriptions(): Promise<SubscriptionDto[]> {
  return api.get('user/subscriptions').json()
}

export async function deleteSubscription(subscriptionId: string): Promise<void> {
  return api.delete(`subscriptions/${subscriptionId}`).json()
}
