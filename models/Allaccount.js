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
    //收入
    income:{
        type:Number
    },
    //支出
    expenditure:{
        type:Number
    },
    //备注
    Remarks:{
        type:String
    },
    //备用字段
    one: {
        type:Number
    },
    two:{
        type:Number
    },
    three:{
        type:Number
    }
});




module.exports = Account = mongoose.model('setaccounts', AllaccountSchema);
