import { Collection } from '@mikro-orm/core'
import { User } from '@/entities/user.entity'

export function createMockUser(overrides: Partial<User> = {}): User {
  const user = new User()
  user.id = '1'
  user.pseudo = 'Marie'
  user.email = 'marie@marie.com'
  user.password = 'hashedPassword'
  user.createdAt = new Date()
  user.lastConnection = new Date()
  user.subscriptions = new Collection(user, [])

  return Object.assign(user, overrides)
}
