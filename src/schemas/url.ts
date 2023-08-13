import { z } from 'zod'

export const addUrlSchema = z.object({
  originalURL: z.string(),
})

export const byUserSchema = z.object({
  limit: z.number().min(1).max(100).nullish(),
  cursor: z.string().nullish(),
  username: z.string(),
  order: z.enum(['asc', 'desc']).default('desc'),
})
export const byLoggedInUserSchema = z.object({
  limit: z.number().min(1).max(100).nullish(),
  cursor: z.string().nullish(),
  order: z.enum(['asc', 'desc']).default('desc'),
})
