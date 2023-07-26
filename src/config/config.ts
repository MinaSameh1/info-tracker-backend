import { z } from 'zod'

export function initalize() {
  validateProcessEnv()
}

function validateProcessEnv() {
  const envSchema = z.object({
    MONGO_URI: z.string(),
    JWT_SECRET: z.string(),
    OTP_TOKEN: z.string(),
    SMS_KEY: z.string(),
    FB_APP_SERVICE_ACCOUNT: z.string(),
    APP_ENV: z.string().optional().default('PROD'),
    MAHASEEL_URL: z.string()
  })
  envSchema.parse(process.env)
}

export const JWT_SECRET = process.env.JWT_SECRET as string
