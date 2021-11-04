const httpStatus = require('http-status-codes')
const Logger = require("../config/logger");
const {processPizza} = require('../services/ordersService')

const logger = new Logger(__filename)

//class
const processNewOrder = async (req, res) => {
    const ip = req.ip
    const agent = req.agent

    try {
        const {name, email, phone} = req.body
        const result = await processPizza({name, email, phone})

        if(!result) {
            logger.error({
                message: 'NEW_ORDER_ERROR',
                metadata: {...agent, ip},
                log_info: {request: req.body}
            })
            res.status(httpStatus.INTERNAL_SERVER_ERROR)
            res.send({"error": "Error in creating order. Please try again!"})
        }

        // logger.info({
        //     message: 'NEW_ORDER_SUCCESS',
        //     metadata: {...agent, ip},
        //     log_info: {request: req.body}
        // })
        res.status(httpStatus.OK)
        res.send(result)

    } catch (err) {
        logger.error({
            message: 'CALL_END_ERROR',
            metadata: {...agent, ip},
            log_info: {message: err.message, stack: err.stack, request: req.body}
        })
        res.status(httpStatus.INTERNAL_SERVER_ERROR)
        res.send({message: 'Error occurred', err})
    }
}

module.exports = {
    processNewOrder
}
