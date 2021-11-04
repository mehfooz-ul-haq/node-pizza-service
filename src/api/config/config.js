module.exports = {
    db: {
        url: "mongodb://192.168.10.15:27017/pizza"
    },
    redis: {
        host: '192.168.10.15',
        port: 6379,
        db: 1,
        password: null,
        mode: 'normal'
    },

    orderStepsAndTimeInSeconds: {
        Dough: 7,
        Topping: 4,
        Oven: 10,
        Waiter: 5,
    },
}