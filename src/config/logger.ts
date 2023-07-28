import { pino } from 'pino'
import PinoPretty from 'pino-pretty'
import { pinoHttp } from 'pino-http'
import { IS_DEV, LOGGING_LEVEL } from './config.js'
import { randomUUID } from 'crypto'

const pinoPretty = PinoPretty({
  ignore: 'pid,hostname',
  translateTime: 'SYS:standard',
  colorize: true
})

const getTimeForLogs = () =>
  `,"epoch":"${Date.now()}", "standard":"${new Date().toISOString()}"`

export const logger = IS_DEV
  ? pino({ timestamp: getTimeForLogs }, pinoPretty)
  : pino({ timestamp: getTimeForLogs })

export const loggerMiddleware = pinoHttp({
  stream: IS_DEV ? pinoPretty : undefined,

  timestamp: getTimeForLogs,

  genReqId: (req, res) => {
    const existingID = req.id ?? req.headers['x-request-id']
    if (existingID) return existingID
    const id = randomUUID()
    res.setHeader('X-Request-Id', id)
    return id
  },

  redact: ['req.headers.authorization'],

  serializers: {
    req: req => {
      const ip =
        req.headers['fastly-client-ip'] ||
        req.headers['x-forwarded-for'] ||
        req.ip

      return {
        id: req.id,
        method: req.method,
        url: req.url,
        path: req.path,
        query: req.query,
        params: req.params,
        headers: {
          host: req.headers.host,
          'user-agent': req.headers['user-agent']
        },
        ip: ip
      }
    },
    res: res => res.statusCode,

    err: err => ({
      type: err.type,
      code: err.code,
      message: err.message,
      stack: err.stack
    })
  },

  customLogLevel: (_req, res, err) => {
    if (res.statusCode >= 400 && res.statusCode < 500) return 'warn'
    if (res.statusCode >= 500 || err) return 'error'
    return LOGGING_LEVEL ?? 'info'
  }
})

if (process.env.LOGGING_LEVEL) {
  logger.level = LOGGING_LEVEL ?? 'info'
}

if (IS_DEV) logger.level = 'debug'
