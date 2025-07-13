import ky from 'ky'

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

export const api = ky.create({
  prefixUrl: API_BASE_URL,
  retry: 2,
  timeout: 10000,
  credentials: 'include',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
})
