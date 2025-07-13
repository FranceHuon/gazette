import { CreateLikeDto, LikeDto } from '@gazette/shared'
import { api } from '@/config'

export async function createLike(dto: CreateLikeDto): Promise<LikeDto> {
  return api.post('likes', { json: dto }).json()
}

export async function getUserLikes(): Promise<LikeDto[]> {
  return api.get('user/likes').json()
}

export async function deleteLike(likeId: string): Promise<void> {
  return api.delete(`likes/${likeId}`).json()
}
