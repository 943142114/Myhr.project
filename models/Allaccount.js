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
    //经办人字段
    handlepeople: {
        type:String
    },
    //备注
    two:{
        type:String
    },
    //月末处理
    monthendprocessing:{
        type:String
    },
    //月末处理备注
    monthendtwo:{
        type:String
    },
    hrmessages:{
        type:String
    }
});




module.exports = Account = mongoose.model('setaccounts', AllaccountSchema);
