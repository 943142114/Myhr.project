var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Hrdata', {
    useNewUrlParser: true
})
var Schema = mongoose.Schema;
//登录信息token
// Create Schema
var UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required:true
    },
    identity: {
        type: String
        // required:true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('users', UserSchema);
