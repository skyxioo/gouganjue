var settings = require('./settings');
var mongoose = require('mongoose');
mongoose.connect("mongodb://" + settings.ip + ":" + settings.port + "/" + settings.db);
var db = mongoose.connection;
module.exports = {
    dbCon:db,
    mongoose:mongoose
};
