const db = require('../models')

const redis = require('../config/redis')
const Logger = require('../config/logger')

const dbStaff = db.Staff
const logger = new Logger(__filename)

const getAllStaff = async () => {
    try {
        return await dbStaff.find({})
    } catch (err) {
        logger.critical({
            message: 'ERROR_GET_ALL_STAFF',
            log_info: {
                message: err.message,
                stack: err.stack
            }
        })
    }
}

const getOneStaff = async (type, isBusy) => {
    try {
        return await dbStaff.findOne({type, isBusy})
    } catch (err) {
        logger.critical({
            message: 'ERROR_GET_ONE_STAFF',
            log_info: {
                message: err.message,
                stack: err.stack
            }
        })
    }
}


const changeMyStatus = async (staff, staffStatus) => {
    try {
        const status = await dbStaff.findByIdAndUpdate(staff.id, {isBusy: staffStatus})
        if (status && staffStatus) {
            const redisClient = redis.getInstance()
            const random = Math.floor(Math.random() * 100);
            const key = `staff_${random}_${staff.id}`
            const setKey = redisClient.set(key, staff)
            if (setKey) {
                redisClient.expire(key, 10)
            }
        }
        return status;

    } catch (err) {
        logger.critical({
            message: 'ERROR_BUSY_STAFF',
            log_info: {
                message: err.message,
                stack: err.stack
            }
        })
    }
}

module.exports = {
    // getAllStaff,
    getOneStaff,
    changeMyStatus,
}