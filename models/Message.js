var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Hrdata', {
    useNewUrlParser: true
})
var Schema = mongoose.Schema;

var AllaccountSchema = new Schema({
    //时间
    date:{
        type: Date,
        default: Date.now
    },
    allhrmessages:{
        type:String
    }
});




module.exports = Message = mongoose.model('setMessage', AllaccountSchema);
