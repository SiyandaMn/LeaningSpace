var mongoose             = require("mongoose");
var pasportLocalMongoose = require("passport-local-mongoose");

var userschema = new mongoose.Schema({
    userName: String,
    password: String
});

userschema.plugin(pasportLocalMongoose);

module.exports = mongoose.model("user", userschema);