export interface LoginDto {
  email: string
  password: string
}

export interface CreateUserResponse {
  user: {
    id: string
    pseudo: string
    email: string
    createdAt: Date
  }
}

export interface UserDto {
  id: string
  email: string
  pseudo: string
}

export interface UserProfileDto {
  message: string
  user: UserDto
}
