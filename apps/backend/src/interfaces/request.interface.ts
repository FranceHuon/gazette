import type { Request } from 'express'

export interface RequestWithUser extends Request {
  user: {
    id: string
    email: string
    pseudo: string
  }
}
