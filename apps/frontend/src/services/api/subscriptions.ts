import { CreateSubscriptionDto, SubscriptionDto } from '@gazette/shared'
import { api } from '@/config'

export async function createSubscription(dto: CreateSubscriptionDto): Promise<SubscriptionDto> {
  try {
    const response = await api.post('subscriptions', { json: dto })
    const result = await response.json() as SubscriptionDto
    return result
  }
  catch (error) {
    console.error('[createSubscription] Error:', error)
    throw error
  }
}

export async function getUserSubscriptions(): Promise<SubscriptionDto[]> {
  try {
    const response = await api.get('user/subscriptions')
    const result = await response.json() as SubscriptionDto[]
    return result
  }
  catch (error) {
    console.error('[getUserSubscriptions] Error:', error)
    throw error
  }
}

export async function deleteSubscription(subscriptionId: string): Promise<void> {
  try {
    await api.delete(`subscriptions/${subscriptionId}`).json()
  }
  catch (error) {
    console.error('[deleteSubscription] Error:', error)
    throw error
  }
}
