module.exports = {
    db: {
        url: "mongodb://127.0.0.1:27017/pizza",
        uri: "mongodb://127.0.0.1",
        port: 27017,
        name: "pizza",
    },
    redis: {
        host: '127.0.0.1',
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
