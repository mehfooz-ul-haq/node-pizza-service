module.exports = {
    async up(db, client) {
        await db.collection('staffs').insertMany(
            [{
                name: "Chef 1",
                type: "Dough",
                timeToTakeInSeconds: 7,
                isBusy: false,
            },{
                name: "Chef 2",
                type: "Dough",
                timeToTakeInSeconds: 7,
                isBusy: false,
            },{
                name: "Chef 1",
                type: "Topping",
                timeToTakeInSeconds: 4,
                isBusy: false,
            },{
                name: "Chef 2",
                type: "Topping",
                timeToTakeInSeconds: 4,
                isBusy: false,
            },{
                name: "Chef 3",
                type: "Topping",
                timeToTakeInSeconds: 4,
                isBusy: false,
            },{
                name: "Oven 1",
                type: "Oven",
                timeToTakeInSeconds: 10,
                isBusy: false,
            },{
                name: "Waiter 1",
                type: "Waiter",
                timeToTakeInSeconds: 5,
                isBusy: false,
            },{
                name: "Waiter 2",
                type: "Waiter",
                timeToTakeInSeconds: 5,
                isBusy: false,
            }]
        );
    },

    async down(db, client) {
        await db.collection('staffs').deleteMany({});
    }
};
