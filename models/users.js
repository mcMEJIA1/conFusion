var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    firstname: {
        type: String,
        default: ''
    },
    lastname: {
        type: String,
        default: ''
    },
    facebookId: {
        type: String
    },
    admin: {
        type: Boolean,
        default: false
    }
});

/*For handle username and password 
    (password bestored as a salt key and a hash value ) */
User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);