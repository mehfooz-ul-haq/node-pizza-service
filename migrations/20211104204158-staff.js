module.exports = {
    async up(db, client) {
        // TODO write your migration here.
        // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
        // Example:
        await db.collection('staff').insertMany(
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
        // TODO write the statements to rollback your migration (if possible)
        // Example:
        // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
    }
};
