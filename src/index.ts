import { https } from 'firebase-functions'
import app from './app.js'

export const saglnei = https.onRequest(app)
