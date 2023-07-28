import LoggerModel, { Logger } from '../models/logger.model'

export const LoggerRepository = Object.freeze({
  Create: (log: Logger) => LoggerModel.create(log)
})
