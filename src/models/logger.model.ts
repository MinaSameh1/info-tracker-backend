import mongoose from 'mongoose'

export interface Logger {
  user?: mongoose.Types.ObjectId
  action: string
  type: 'info' | 'error' | 'debug' | 'bad_request'
  resource: string
  payload?: Record<string, unknown>
  ip?: string
  userAgent?: string
  contentLength?: number
}

export type LoggerDocument = mongoose.HydratedDocument<Logger>

const LoggerSchema = new mongoose.Schema<LoggerDocument>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
    type: {
      type: String,
      default: 'info',
      enum: ['info', 'error', 'debug', 'bad_request']
    },
    action: {
      type: String
    },
    payload: {
      type: Object
    },
    resource: {
      type: String
    },
    ip: {
      type: String
    },
    userAgent: {
      type: String
    },
    contentLength: {
      type: Number
    }
  },
  { timestamps: true, versionKey: false, collection: 'activityLogs' }
)

export const LoggerModel = mongoose.model('logger', LoggerSchema)

export default LoggerModel
