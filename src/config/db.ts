import { info } from 'firebase-functions/logger'
import mongoose from 'mongoose'
/**
 * Connect To DB
 */
mongoose.Promise = global.Promise
mongoose.set('strictQuery', false)

let isConnected = 0

export const connectToDatabase = async () => {
  if (isConnected) {
    info('DB: using existing database connection')
    return Promise.resolve()
  }
  const db = await mongoose.connect(process.env.MONGO_URI ?? '')
  isConnected = db.connections[0].readyState
  return db
}
