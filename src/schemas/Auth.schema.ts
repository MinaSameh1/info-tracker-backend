import { z } from 'zod'

export const LoginInput = z.object({
  body: z.object({
    username: z.string().min(3).max(255),
    password: z.string().min(6).max(255)
    // .regex(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
    //   'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number'
    // )
  })
})

export type LoginInputType = z.infer<typeof LoginInput>
