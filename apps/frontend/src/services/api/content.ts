import { ContentWithMediaDto } from '@gazette/shared'
import { api } from '@/config'

export async function getUserContent(): Promise<ContentWithMediaDto[]> {
  return api.get('contents/user/subscriptions').json()
}
