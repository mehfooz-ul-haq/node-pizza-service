const mongoose = require("mongoose");
const dbConfig = require("../config/dbConfig.js");

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.orders = require("./ordersModel")(mongoose);

module.exports = db;