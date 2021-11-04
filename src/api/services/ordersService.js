const dayjs = require('dayjs')
const db = require('../models')
const config = require('../config/config')
const staffService = require('./staffService')
const Logger = require('../config/logger')
const redis = require("../config/redis");

const dbOrder = db.Orders
const dbStaff = db.Staff
const logger = new Logger(__filename)

const processPizza = async (body) => {
    try {
        const pizzaStatus = await makePizza()
        const order = new dbOrder({stats: pizzaStatus, ...body});
        return await dbOrder.create(order)
    } catch (err) {
        logger.critical({
            message: 'ERROR_PROCESS_NEW_PIZZA',
            log_info: {
                message: err.message,
                stack: err.stack
            }
        })
    }
}

async function makePizza() {
    const processSteps = config.orderStepsAndTimeInSeconds

    const completedSteps = [];
    for (const [currentStep, seconds] of Object.entries(processSteps)) {
        const availableStaff = await staffService.getOneStaff(currentStep, false)

        if (!availableStaff) {
            process.nextTick(() => {
                console.log('nextTick callback', currentStep);
                const availableStaff = staffService.getOneStaff(currentStep, false)
                const step = processNextStep(currentStep, seconds, availableStaff.id)
                changeStaffStatus(seconds, availableStaff, true)
                completedSteps.push(step)
            });
            continue;
        }

        const step = processNextStep(currentStep, seconds, availableStaff.id)
        await staffService.changeMyStatus(availableStaff, true)

        // change staff status to free after his time is done
        changeStaffStatus(seconds, availableStaff, false)
        completedSteps.push(step)

    }

    return completedSteps;
}

// change staff status in db
function changeStaffStatus(seconds, availableStaff, status) {
    setTimeout(async function () {
        await staffService.changeMyStatus(availableStaff, status)
    }, seconds * 1000);

}

function processNextStep(step, seconds, staffId) {
    const timeIn = dayjs().unix()
    const timeOut = dayjs().add(seconds, 'seconds').unix()
    const timeDiff = `${timeOut - timeIn} seconds`
    return {step, staffId, timeIn, timeOut, timeDiff}
}

module.exports = {
    processPizza
}