import mongoose from 'mongoose'
import { logger } from './logger'
/**
 * Connect To DB
 */
mongoose.Promise = global.Promise
mongoose.set('strictQuery', false)

let isConnected = 0

export const connectToDatabase = async () => {
  try {
    if (isConnected) {
      logger.info('DB: using existing database connection 󱘖 ')
      return Promise.resolve()
    }
    const db = await mongoose.connect(process.env.MONGO_URI ?? '')
    isConnected = db.connections[0].readyState
    return db
  } catch (err) {
    logger.error('DB: error connecting to db' + err)
  }
}
