const express = require('express')
const path = require('path')
const createError = require('http-errors')
const cookieParser = require('cookie-parser')
const Redis = require('./api/config/redis')
const { dbConnection } = require("./api/config/db")
const Logger = require("./api/config/logger")
const logger = new Logger(__filename)

const app = express()
Redis.init()
const db = require("./api/models")
dbConnection(db)

// app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api', require('./api/routes'))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    console.log(err)
    console.log("Resource not found.")

    logger.error(`Resource not found.", ${err}`);
    res.status(err.status || 500)
    res.send({'error': 'Resource not found.'})
})

module.exports = app
