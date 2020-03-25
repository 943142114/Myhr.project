var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create Schema
var ProfileSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    staffnumber:{
        type:Number,
        required:true
    },
    staffname:{
        type:String
    },
    staffsex:{
        type:String
    },
    staffBirthday:{
        type:String
    },
    idnumber:{
        type:Number
    },
    marriage:{
        type:String
    },
    nation:{
        type:String
    },
    politics:{
        type:String
    },
    phonenumber:{
        type:Number
    },
    contactaddress:{
        type:String
    },
    education:{
        type:String
    },
    major:{
        type:String
    },
    school:{
        type:String
    },
    position:{
        type:String
    },
    ptitle:{
        type:String
    },
    department:{
      type:String
    },
    basepay:{
        type:Number
    },
    formofemployment:{
        type:String
    },
    internshiptime:{
        type:String
    },
    workertime:{
        type:String
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
