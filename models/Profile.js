var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Hrdata', {
    useNewUrlParser: true
})
var Schema = mongoose.Schema;

var ProfileSchema = new Schema({
    //时间
    date: {
        type: Date,
        default: Date.now
    },
    //员工编号
    staffnumber:{
        type:Number
    },
    //员工姓名
    staffname:{
        type:String
    },
    //员工性别
    staffsex:{
        type:String
    },
    //员工生日
    staffBirthday:{
        type:String
    },
    //身份证
    idnumber:{
        type:Number
    },
    //婚姻状况
    marriage:{
        type:String
    },
    //民族
    nation:{
        type:String
    },
    //政治面貌
    politics:{
        type:String
    },
    //电话号码
    phonenumber:{
        type:Number
    },
    //联系地址
    contactaddress:{
        type:String
    },
    //聘用形式
    education:{
        type:String
    },
    //专业
    major:{
        type:String
    },
    //毕业院校
    school:{
        type:String
    },
    //职位
    position:{
        type:String
    },
    //职称
    ptitle:{
        type:String
    },
    //不猛
    department:{
      type:String
    },
    basepay:{
        type:Number
    },
    //餐补
    formofemployment:{
        type:Number
    },
    //实习时间
    internshiptime:{
        type:String
    },
    //转正时间
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
    },
    //员工积分
    employeepoints:{
        type:Number
    },
    //员工积分备注
    employeepointsmark:{
        type:String
    }
    //考勤
    //绩效
});


module.exports = Profile = mongoose.model('profile', ProfileSchema);
