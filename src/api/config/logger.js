const winston = require("winston")
const DailyRotateFile = require("winston-daily-rotate-file")
const appName = "Pizza Shop"

const logFormat = winston.format.combine(
    winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss.SSS'}),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json(),
)

const transport = new DailyRotateFile({
    filename: ".//logs//Pizza-%DATE%.log",
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    prepend: true,
    level: "debug",
})

transport.on('rotate', function (oldFilename, newFilename) {
// call function like upload to s3 or on cloud
})

const LoggerInstance = winston.createLogger({
    format: logFormat,
    transports: [
        transport,
        new winston.transports.Console({level: "info"})
    ]
})


class Logger {
    constructor (scriptName) {
        this.scriptName = scriptName.split(/[\\/]/).pop()
        this.methodName = ''
    }

    withMethod (name) {
        this.methodName = name
        return this
    }

    format (payload) {
        const metadata = payload.metadata || {}
        return {
            app_name: appName,
            message: payload.message,
            log_info: JSON.stringify({ file: this.scriptName, ...payload.log_info }),
            ...metadata
        }
    }

    info (message) {
        const msg = this.format(message)
        LoggerInstance.info('', msg)
    }

    error (message) {
        const msg = this.format(message)
        LoggerInstance.error('', msg)
    }

    debug (message) {
        const msg = this.format(message)
        LoggerInstance.debug('', msg)
    }

    warn (message) {
        const msg = this.format(message)
        LoggerInstance.warn('', msg)
    }

    critical (message) {
        const msg = { level: 'critical', ...this.format(message) }
        LoggerInstance.error('', msg)
    }

    log (level, payload) {
        const msg = {
            level,
            app_name: appName,
            message: payload.message,
            log_info: JSON.stringify({ script_name: this.scriptName, ...payload.log_info }),
            ...payload.metadata
        }
        LoggerInstance.error('', msg)
    }
}

module.exports = Logger