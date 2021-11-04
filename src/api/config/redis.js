const Redis = require('ioredis')
const config = require('./config')
const Logger = require('./logger')

const redisConfig = config.redis
const logger = new Logger(__filename)

const redisOptions = {
    enableReadyCheck: true,
    maxRetriesPerRequest: 3,
    autoResubscribe: true,
    enableOfflineQueue: true,
    retryStrategy: function (times) {
        return 2000 // reconnect after 2 seconds
    },
    reconnectOnError: function (err) {
        // only reconnect on error if the node you are connected to
        // has switched to READONLY mode
        return err.message.startsWith('READONLY')
    }
}

const clientOptions = {
    nodes: [{host: redisConfig.host, port: redisConfig.port}],
    options: {
        ...redisOptions,
        redisOptions: {}
    }
}

if (redisConfig.password) {
    clientOptions.options.redisOptions.password = redisConfig.password
}

const getClient = () => {
    if (redisConfig.mode === 'cluster') {
        return new Redis.Cluster(clientOptions.nodes, clientOptions.options)
    }
    return new Redis({
        port: redisConfig.post,
        host: redisConfig.host,
        password: redisConfig.password,
        ...redisOptions
    })
}

const connect = () => {
    const client = getClient()

    client.on('ready', () => {
        console.log('Connected to Redis!')
        logger.info({
            message: 'REDIS_CONNECTION',
            log_info: {
                message: 'Connected to Redis!'
            }
        })
    })
    client.on('error', (error) => {
        logger.error({
            message: 'REDIS_CONNECTION_ERROR',
            log_info: {...error}
        })
    })
    client.on('node error', (error) => {
        logger.error({
            message: 'REDIS_CONNECTION_ERROR',
            log_info: {...error}
        })
    })
    return client
}

class RedisClient {
    static init() {
        RedisClient.getInstance()
    }

    static getInstance() {
        if (!RedisClient.instance) {
            RedisClient.instance = connect()
        }
        return RedisClient.instance
    }
}

module.exports = RedisClient
