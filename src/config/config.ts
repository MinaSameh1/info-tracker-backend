import { z } from 'zod'
import { connectToDatabase } from './db'

export function initalize() {
  connectToDatabase()
  validateProcessEnv()
}

function validateProcessEnv() {
  const envSchema = z.object({
    MONGO_URI: z.string(),
    JWT_SECRET: z.string(),
    PORT: z.string().optional().default('8000'),
    OTP_TOKEN: z.string(),
    // FB_APP_SERVICE_ACCOUNT: z.string(),
    APP_ENV: z.string().optional().default('PROD'),
    LOGGING_LEVEL: z
      .enum(['info', 'debug', 'warn', 'error'])
      .optional()
      .default('info')
  })

  // This will throw an error if any of the env vars are missing or invalid which will crash the server
  const obj = envSchema.parse(process.env)

  // clean up process.env
  process.env = obj
}

export const JWT_SECRET = process.env.JWT_SECRET as string
export const IS_DEV = (process.env.APP_ENV as string) === 'DEV'

export const LOGGING_LEVEL = process.env.LOGGING_LEVEL as string as
  | 'info'
  | 'debug'
  | 'warn'
  | 'error'
