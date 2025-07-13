export interface CreateLikeDto {
  userId: string
  contentId: string
}

export interface LikeDto {
  id: string
  userId: string
  contentId: string
  createdAt: string
}
