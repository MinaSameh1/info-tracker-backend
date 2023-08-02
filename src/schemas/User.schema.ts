import { z } from 'zod'
import { Roles } from '../models/roles.entity'

export const UserInputSchema = z.object({
  name: z.string(),
  username: z.string().min(3).max(100),
  password: z.string().min(8).max(100),
  roles: z.enum(Object.values(Roles) as unknown as [string]).array(),
  active: z.boolean().default(true),
  notes: z.string().optional()
})

export const UserLoginSchema = z.object({
  username: z.string().min(3).max(100),
  password: z.string().min(8).max(100)
})

export const UserLoginBodySchema = z.object({ body: UserLoginSchema })

export const UserInputBodySchema = z.object({ body: UserInputSchema })

export const UserUpdateInputSchema = UserInputSchema.partial()

export type UserUpdateInput = z.infer<typeof UserUpdateInputSchema>

export type UserLogin = z.infer<typeof UserLoginSchema>

export type UserInput = z.infer<typeof UserInputSchema>
