import type { CreateUserDto, CreateUserResponse, UserProfileDto } from '@gazette/shared'
import { api } from '../../config'

export async function createUser(user: CreateUserDto): Promise<CreateUserResponse> {
  console.warn('Data sent to API:', user)
  try {
    const response = await api.post('users', { json: user })
    const data = await response.json()
    console.warn('Backend response:', data)
    return data as CreateUserResponse
  }
  catch (error: unknown) {
    console.error('User creation error:', error)
    if (error && typeof error === 'object' && 'response' in error) {
      const errorResponse = error as { response: { json: () => Promise<unknown> } }
      const errorData = await errorResponse.response.json()
      console.error('Backend error details:', errorData)
    }
    throw error
  }
}

export async function getAllUsers(): Promise<CreateUserDto[]> {
  return await api
    .get('users')
    .json()
}
export async function loginUser(
  email: string,
  password: string,
): Promise<{ message: string }> {
  return await api
    .post('auth/login', {
      json: { email, password },
    })
    .json()
}

export async function logoutUser(): Promise<void> {
  return await api
    .post('auth/logout')
    .json()
}

export async function getUserProfile(): Promise<UserProfileDto> {
  return await api
    .get('auth/profile')
    .json()
}

export async function deleteUserAccount(): Promise<void> {
  return await api
    .delete('users/me')
    .json()
}

export async function changePassword(currentPassword: string, newPassword: string, confirmPassword: string): Promise<void> {
  try {
    await api
      .post('auth/change-password', {
        json: { currentPassword, newPassword, confirmPassword },
      })
  }
  catch (error) {
    console.error('Failed to change password:', error)
    throw error
  }
}
