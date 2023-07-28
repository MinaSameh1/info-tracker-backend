import { z } from 'zod'

export const UserInputSchema = z.object({
  name: z.string(),
  username: z.string().min(3).max(100),
  password: z.string().min(8).max(100),
  role: z.enum(['admin', 'user']),
  status: z.enum(['active', 'inactive']),
  notes: z.string().optional()
})

export const UserLoginSchema = z.object({
  username: z.string().min(3).max(100),
  password: z.string().min(8).max(100)
})

export const UserLoginBodySchema = z.object({ body: UserLoginSchema })

export const UserInputBodySchema = z.object({ body: UserInputSchema })

export type UserInput = z.infer<typeof UserInputSchema>
