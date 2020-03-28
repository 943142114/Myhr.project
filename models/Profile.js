var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Hrdata', {
    useNewUrlParser: true
})
var Schema = mongoose.Schema;

var ProfileSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    staffnumber:{
        type:Number
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
        type:Number
    },
    internshiptime:{
        type:String
    },
    workertime:{
        type:String
    },
    jiangjin:{
        type:Number
    },
    trafficlsubsidy:{
        type:Number
    },
    accumulationfund:{
        type:Number
    }
});


module.exports = Profile = mongoose.model('profile', ProfileSchema);
