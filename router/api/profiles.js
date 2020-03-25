var express = require('express');
var router = express.Router();
var passport = require('passport')
var Profile = require('../../models/Profile');

// @route  GET api/profiles/test
// @desc   返回的请求的json数据
// @access public
router.get('/test', (req, res) => {
    res.json({msg: 'profile works'});
});

//增API
// @route  post api/profiles/add
// @desc   创建信息接口
// @access 私密的
router.post('/add', passport.authenticate("jwt", {session: false}), (req, res) => {
    var profilefields = {}

    // if (req.body.type) profilefields.type = req.body.type;
    // if (req.body.describe) profilefields.describe = req.body.describe;
    // if (req.body.incode) profilefields.incode = req.body.incode;
    // if (req.body.expend) profilefields.expend = req.body.expend;
    // if (req.body.cash) profilefields.cash = req.body.cash;
    // if (req.body.remark) profilefields.remark = req.body.remark;

    if (req.body.staffnumber) profilefields.staffnumber = req.body.staffnumber;
    if(req.body.staffname) profilefields.staffname = req.body.staffname;
    if (req.body.staffsex) profilefields.staffsex = req.body.staffsex;
    if (req.body.staffBirthday) profilefields.staffBirthday = req.body.staffBirthday;
    if (req.body.idnumber) profilefields.idnumber = req.body.idnumber;
    if (req.body.marriage) profilefields.marriage = req.body.marriage;
    if (req.body.nation) profilefields.nation = req.body.nation;
    if (req.body.politics) profilefields.politics = req.body.politics;
    if (req.body.phonenumber) profilefields.phonenumber = req.body.phonenumber;
    if (req.body.contactaddress) profilefields.contactaddress = req.body.contactaddress;
    if (req.body.education) profilefields.education = req.body.education;
    if (req.body.major) profilefields.major = req.body.major;
    if (req.body.school) profilefields.school = req.body.school;
    if (req.body.position) profilefields.position = req.body.position;
    if (req.body.ptitle) profilefields.ptitle = req.body.ptitle;
    if (req.body.basepay) profilefields.basepay = req.body.basepay;
    if (req.body.internshiptime) profilefields.internshiptime = req.body.internshiptime;
    if (req.body.workertime) profilefields.workertime = req.body.workertime;
    if (req.body.department) profilefields.department = req.body.department;
    if (req.body.formofemployment) profilefields.formofemployment = req.body.formofemployment;



    new Profile(profilefields).save().then(profile =>{
        res.json(profile)
    })
})

//查所有API
// @route  post api/profiles
// @desc   获取所有信息
// @access 私密的
router.get('/', passport.authenticate("jwt", {session: false}), (req, res) => {
    Profile.find()
        .then(profile => {
            if (!profile){
                return res.status(404).json('没有任何内容')
            }
            res.json(profile)
        })
        .catch(err => res.status(404).json(err))
})

//查单个API
// @route  post api/profiles/add
// @desc   获取所有信息
// @access 私密的
router.get('/:id', passport.authenticate("jwt", {session: false}), (req, res) => {
    Profile.findOne({_id:req.params.id})
        .then(profile => {
            if (!profile){
                return res.status(404).json('没有任何内容')
            }

            res.json(profile)
        })
        .catch(err => res.status(404).json(err))
})

//改（编辑）API
// @route  post api/profile/edit
// @desc   编辑信息接口
// @access 私密的
router.post('/edit/:id', passport.authenticate("jwt", {session: false}), (req, res) => {
    var profilefields = {}

    // if (req.body.type) profilefields.type = req.body.type;
    // if (req.body.describe) profilefields.describe = req.body.describe;
    // if (req.body.incode) profilefields.incode = req.body.incode;
    // if (req.body.expend) profilefields.expend = req.body.expend;
    // if (req.body.cash) profilefields.cash = req.body.cash;
    // if (req.body.remark) profilefields.remark = req.body.remark;

    if (req.body.staffnumber) profilefields.staffnumber = req.body.staffnumber;
    if(req.body.staffname) profilefields.staffname = req.body.staffname;
    if (req.body.staffsex) profilefields.staffsex = req.body.staffsex;
    if (req.body.staffBirthday) profilefields.staffBirthday = req.body.staffBirthday;
    if (req.body.idnumber) profilefields.idnumber = req.body.idnumber;
    if (req.body.marriage) profilefields.marriage = req.body.marriage;
    if (req.body.nation) profilefields.nation = req.body.nation;
    if (req.body.politics) profilefields.politics = req.body.politics;
    if (req.body.phonenumber) profilefields.phonenumber = req.body.phonenumber;
    if (req.body.contactaddress) profilefields.contactaddress = req.body.contactaddress;
    if (req.body.education) profilefields.education = req.body.education;
    if (req.body.major) profilefields.major = req.body.major;
    if (req.body.school) profilefields.school = req.body.school;
    if (req.body.position) profilefields.position = req.body.position;
    if (req.body.ptitle) profilefields.ptitle = req.body.ptitle;
    if (req.body.basepay) profilefields.basepay = req.body.basepay;
    if (req.body.internshiptime) profilefields.internshiptime = req.body.internshiptime;
    if (req.body.workertime) profilefields.workertime = req.body.workertime;
    if (req.body.department) profilefields.department = req.body.department;
    if (req.body.formofemployment) profilefields.formofemployment = req.body.formofemployment;

    Profile.findOneAndUpdate({_id:req.params.id},{$set:profilefields},{new:true}).then(profile => res.json(profile))

})


//删除信息API
// @route  post api/profiles/delete/：id
// @desc   编辑信息接口
// @access 私密的
router.delete('/delete/:id', passport.authenticate("jwt", {session: false}), (req, res) => {
    Profile.findOneAndRemove({_id:req.params.id}).then(profile =>{
        profile.save().then(profile => res.json(profile))
    })
        .catch(err => res.status(404).json('删除失败！'))
})



module.exports = router
