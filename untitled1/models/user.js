var mongoose = require('../db').mongoose;
var schema = new mongoose.Schema({
    name:String,
    password:String
});
var User = mongoose.model('User', schema);
module.exports = User;