
const logger = require("../config/logger");
const dbConnection = (db) => {

    db.mongoose
        .connect(db.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => {
            console.log("Connected to the database!");
        })
        .catch(err => {
            logger.error(`Cannot connect to the database!", ${err}`);
            process.exit();
        });

}

module.exports = {
    dbConnection
}