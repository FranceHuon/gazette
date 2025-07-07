export interface CreateSubscriptionDto {
  userId: string
  mediaId: string
}

export interface SubscriptionDto {
  id: string
  userId: string
  mediaId: string
  createdAt: string
}
