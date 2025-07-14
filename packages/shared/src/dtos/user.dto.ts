export interface UserResponse {
  id: string
  firstName: string
  lastName: string
  email: string
  createdAt: Date
  updatedAt: Date
}

export interface LoginDto {
  email: string
  password: string
}

// CreateUserDto is now defined in schemas/index.ts using Zod

export interface ApiUser {
  id: string
  email: string
  pseudo: string
}

export interface UserProfileDto {
  message: string
  user: ApiUser
}

export interface UserDto {
  id: string
  email: string
  pseudo: string
}

export function transformApiUserToUserDto(apiUser: ApiUser): UserDto {
  return {
    id: apiUser.id,
    email: apiUser.email,
    pseudo: apiUser.pseudo,
  }
}
