import { EntityClass, EntityManager, FilterQuery } from '@mikro-orm/core'
import { Injectable, NotFoundException } from '@nestjs/common'
import { User } from '@/entities/user.entity'

/**
 * Base service class for entities that have a relationship with User
 * Provides common CRUD operations to avoid code duplication
 */
@Injectable()
export abstract class BaseUserRelationService<_T = object> {
  constructor(protected readonly em: EntityManager) {}

  protected async validateUser(userId: string): Promise<User> {
    const user = await this.em.findOne(User, { id: userId })
    if (!user) {
      throw new NotFoundException('User not found')
    }
    return user
  }

  protected async validateEntity<E extends object>(
    entityClass: EntityClass<E>,
    id: string,
    errorMessage: string,
  ): Promise<E> {
    const entity = await this.em.findOne(entityClass, { id } as FilterQuery<E>)
    if (!entity) {
      throw new NotFoundException(errorMessage)
    }
    return entity
  }

  protected async checkExisting<E extends object>(
    entityClass: EntityClass<E>,
    criteria: FilterQuery<E>,
  ): Promise<E | null> {
    return this.em.findOne(entityClass, criteria)
  }

  protected async createEntity<E>(entity: E): Promise<E> {
    await this.em.persistAndFlush(entity)
    return entity
  }

  protected async deleteEntity<E extends object>(
    entityClass: EntityClass<E>,
    id: string,
    errorMessage?: string,
  ): Promise<void> {
    const entity = await this.em.findOne(entityClass, { id } as FilterQuery<E>)
    if (!entity) {
      if (errorMessage) {
        throw new NotFoundException(errorMessage)
      }
      // Idempotent deletion if no error message provided
      return
    }
    await this.em.removeAndFlush(entity)
  }

  protected async findEntitiesByUserId<E extends object>(
    entityClass: EntityClass<E>,
    userId: string,
    populate?: string[],
  ): Promise<E[]> {
    const criteria: FilterQuery<E> = { user: userId } as FilterQuery<E>
    if (populate) {
      // Using the same pattern as ContentService
      return this.em.find(entityClass, criteria, { populate } as any)
    }
    return this.em.find(entityClass, criteria)
  }
}
