import { ContentDto } from '@gazette/shared'
import { api } from '@/config'

export async function getUserContent(): Promise<ContentDto[]> {
  return api.get('contents/user/subscriptions').json()
}
