var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Hrdata', {
    useNewUrlParser: true
})
var Schema = mongoose.Schema;

var monthendSchema = new Schema({
    //时间
    date:{
        type: Date,
        default: Date.now
    },
    //月末处理
    monthendprocessing:{
        type:String
    },
    //月末处理备注
    monthendtwo:{
        type:String
    }
});




module.exports = Monthend = mongoose.model('monthend', monthendSchema);
