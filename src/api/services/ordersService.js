const dayjs = require('dayjs')
const db = require('../models')
const Logger = require('../config/logger')

const Orders = db.orders
const logger = new Logger(__filename)

const processPizza = async (body) => {
    try {
        const pizzaStatus = await makePizza()
        const dbData = {stats: pizzaStatus, ...body}
        const order = new Orders(dbData);
        return await Orders.create(order)
        // return dbData
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
    const chefs = {
        dough: [1, 2],
        toppings: [1, 2, 3],
        oven: [1],
        waiters: [1, 2],
    }

    const processSteps = {
        dough: 7,
        toppings: 4,
        oven: 10,
        waiters: 5,
    }

    const completedSteps = [];
    for (const [currentStep, seconds] of Object.entries(processSteps)) {
        // await sleep(seconds * 1000).then(() => {
        const stepChef = Math.floor(Math.random() * chefs[currentStep].length + 1)
        const step = processNextStep(currentStep, seconds, stepChef)
        completedSteps.push(step)
        // })
    }
    return completedSteps;
}

function processNextStep(step, seconds, chef = []) {
    const timeIn = dayjs().unix()
    const timeOut = dayjs().add(seconds, 'seconds').unix()
    const timeDiff = `${timeOut - timeIn} seconds`
    return {step, chef, timeIn, timeOut, timeDiff}
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
    processPizza
}