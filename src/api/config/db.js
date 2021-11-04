const Logger = require("../config/logger");
const logger = new Logger(__filename)
const dbConnection = (db) => {

    db.mongoose
        .connect(db.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => {
            logger.info("Connected to the database!")
            console.log("Connected to the database!");
        })
        .catch(err => {
            logger.error(`Cannot connect to the database!", ${err}`);
            console.log(`Cannot connect to the database!", ${err}`);
            process.exit();
        });

}

module.exports = {
    dbConnection
}