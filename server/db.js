const level = require("level");
var db = level("node-db");
exports.db = db;
