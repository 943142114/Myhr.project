// @login & register
var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var keys = require('../../config/keys');
var gravatar = require('gravatar')
var jwt = require('jsonwebtoken')
var keys = require('../../config/keys')
var passport = require('passport')


var  User = require('../../models/User');

// @route  GET api/users/test
// @desc   返回的请求的json数据
// @access public
router.get('/test', (req, res) => {
    res.json({ msg: 'login works' });
});



// @route  POST api/register
// @desc   返回的请求的json数据
// @access public
router.post('/register',(req,res) => {
    User.findOne({email:req.body.email})
        .then((user) =>{
        if (user){
            return res.status(400).json("邮箱已经被注册！")
        }
        else{
            var avatar = gravatar.url('req.body.email', {s: '200', r: 'pg', d: 'mm'});

            var newUser = new User({
                name:req.body.name,
                email:req.body.email,
                avatar,
                password:req.body.password,
                identity: req.body.identity
            })

            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(newUser.password, salt, (err, hash)=> {
                    if (err) throw err
                    newUser.password = hash
                    newUser.save()
                        .then(user=>res.json(user))
                        .catch(err => console.log(err))
                    // Store hash in your password DB.
                });
            });
        }
    })


})


// @route  POST api/login
// @desc   返回请求  token
// @access public
router.post('/login',(req,res)=>{
    var email = req.body.email
    var password = req.body.password
    //查询数据库
    User.findOne({email})
        .then(user=>{
            if (!user){
                return res.status(404).json("用户不存在！")
            }
            //密码匹配
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch){
                        var rule = {
                            id:user.id,
                            name:user.name,
                            avatar:user.avatar,
                            email:user.email,
                            identity:user.identity}
                        jwt.sign(rule,keys.secretOrKey,{expiresIn:86400},(err,token)=> {
                            if (err) throw err;
                            res.json({
                                success:true,
                                token:"Bearer " + token
                            })
                        })
                        // res.json({msg:"success"})
                    }else{
                        return res.status(400).json("密码错误")
                    }
                });
        })
})




// @route  POST api/current
// @desc   return 客户信息
// @access 私密的
//passport 验证token
router.get('/current',passport.authenticate("jwt",{session:false}),(req,res)=>{
res.json({
    id:req.user.id,
    name:req.user.name,
    email:req.user.email,
    identity:req.user.identity
})
})

//修改权限

//接口通过！！！！！
router.post('/edit/:id',passport.authenticate("jwt",{session:false}),(req,res)=>{
    // res.json({
    //     id:req.user.id,
    //     name:req.user.name,
    //     email:req.user.email,
    //     identity:req.user.identity
    // })
    var competences = {}
    if (req.body.name) competences.name = req.body.name;
    if (req.body.identity) competences.identity = req.body.identity;
    if (req.body.email) competences.email = req.body.email

    User.findOneAndUpdate(
        {_id:req.params.id},
        {$set:competences},
        {new:true})
        .then(profile => res.json(profile))
})

//获取表格
router.get('/', passport.authenticate("jwt", {session: false}), (req, res) => {
    User.find()
        .then(profile => {
            if (!profile){
                return res.status(404).json('没有任何内容')
            }
            res.json(profile)
        })
        .catch(err => res.status(404).json(err))
})

//删除
router.delete('/delete/:id', passport.authenticate("jwt", {session: false}), (req, res) => {
    User.findOneAndRemove({_id:req.params.id}).then(profile =>{
        profile.save().then(profile => res.json(profile))
    })
        .catch(err => res.status(404).json('删除失败！'))
})



//添加
router.post('/add', passport.authenticate("jwt", {session: false}), (req, res) => {
    var competences = {}

    if (req.body.name) competences.name = req.body.name;
    if (req.body.identity) competences.identity = req.body.identity;
    if (req.body.email) competences.email = req.body.email

    new User(competences).save().then(profile =>{
        res.json(profile)
    })
})

module.exports = router
