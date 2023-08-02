import app from './app.js'
import { logger } from './config/logger.js'

const port = process.env.PORT || '3000'

process.on('unhandledRejection', err => {
  logger.error(`"unhandledRejection":"${err}"`)
  logger.error(
    `"promise":"${
      (
        err as {
          promise: Promise<unknown>
        }
      ).promise
    }""`
  )
})

// error handler for uncaught exceptions
process.on('uncaughtException', error => {
  logger.error(`"Cause": "${error.cause}"`)
  logger.error(`"uncaughtException": "${error}" `)
})

process.on('SIGINT', () => {
  logger.info('SIGINT signal received.')
  process.exit(0)
})

app.listen(port, () => {
  logger.info(`Server listening on ${port} 🚀`)
})
