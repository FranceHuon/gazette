import { Context, use } from 'react'

export function useContextSafe<T>(context: Context<T | undefined>, errorMessage: string): T {
  const contextValue = use(context)
  if (contextValue === undefined) {
    throw new Error(errorMessage)
  }
  return contextValue
}
