export interface CreateSubscriptionDto {
  mediaId: string
}

export interface SubscriptionDto {
  id: string
  userId: string
  mediaId: string
  createdAt: string
}
