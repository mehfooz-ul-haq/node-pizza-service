const mongoose = require("mongoose");
const config = require("../config/config.js");

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = config.db.url;

db.Orders = require("./ordersModel")(mongoose);
db.Staff = require("./staffModel")(mongoose);

module.exports = db;