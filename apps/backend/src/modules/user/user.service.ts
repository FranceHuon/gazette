import { EntityManager } from '@mikro-orm/core'
import { Injectable, NotFoundException } from '@nestjs/common'
import { User } from 'src/entities/user.entity'
import { hashPassword, verifyPassword } from './user.utils'

@Injectable()
export class UsersService {
  constructor(private readonly em: EntityManager) {}
  async create(userData: {
    pseudo: string
    email: string
    password: string
  }): Promise<User> {
    const hashedPassword = await hashPassword(userData.password)
    const user = new User()
    user.pseudo = userData.pseudo
    user.email = userData.email
    user.password = hashedPassword
    await this.em.persistAndFlush(user)
    return user
  }

  async getAll(): Promise<User[]> {
    const users = await this.em.findAll(User)
    return users.map(user => ({
      pseudo: user.pseudo,
      email: user.email,
      password: user.password,
      id: user.id,
      createdAt: user.createdAt,
      lastConnection: user.lastConnection,
      subscriptions: user.subscriptions,
    }))
  }

  async findOne(email: string): Promise<User> {
    const user = await this.em.findOneOrFail(User, { email })
    return user
  }

  async delete(id: string): Promise<void> {
    const user = await this.em.findOneOrFail(User, { id })
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`)
    }
    await this.em.removeAndFlush(user)
  }
}

export { hashPassword, verifyPassword }
