var express = require('express');
var router = express.Router();
var passport = require('passport');
var Monthend = require('../../models/Monthend');

// router.get('/test', (req, res) => {
//     res.json(req.body.wages)
// });


router.post('/add',passport.authenticate('jwt',{session:false}),
    (req,res)=>{
        const monthendfile ={}

        // 日期   time                date
        // 收入   income				Number
        // 支出   expenditure			Number
        // 备注   Remarks				string
        if (req.body.handlepeople) monthendfile.handlepeople =req.body.handlepeople;
        if (req.body.two) monthendfile.two =req.body.two;
        if (req.body.income) monthendfile.income = req.body.income;
        if (req.body.expenditure) monthendfile.expenditure = req.body.expenditure;
        if (req.body.Remarks) monthendfile.Remarks = req.body.Remarks;
        if (req.body.monthendprocessing) monthendfile.monthendprocessing = req.body.monthendprocessing;
        if (req.body.monthendtwo) monthendfile.monthendtwo = req.body.monthendtwo


        new Monthend(monthendfile).save().then(acc =>{
            res.json(acc)
        })
    }
);

//查找所有内容
router.get('/', passport.authenticate("jwt", {session: false}), (req, res) => {
    Monthend.find()
        .then(acc => {
            if (!acc){
                return res.status(404).json('没有任何内容')
            }
            res.json(acc)
        })
        .catch(err => res.status(404).json(err))
});

//查单个
router.get(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Monthend.findOne({ _id: req.params.id })
            .then(profile => {
                if (!profile) {
                    return res.status(404).json('没有任何内容');
                }

                res.json(profile);
            })
            .catch(err => res.status(404).json(err));
    }
);


//编辑
router.post('/edit/:id',passport.authenticate('jwt',{session:false}),
    (req,res)=>{
        const monthendfile ={}


        if (req.body.handlepeople) monthendfile.handlepeople =req.body.handlepeople;
        if (req.body.two) monthendfile.two =req.body.two;
        if (req.body.income) monthendfile.income = req.body.income;
        if (req.body.expenditure) monthendfile.expenditure = req.body.expenditure;
        if (req.body.Remarks) monthendfile.Remarks = req.body.Remarks;
        if (req.body.monthendprocessing) monthendfile.monthendprocessing = req.body.monthendprocessing;
        if (req.body.monthendtwo) monthendfile.monthendtwo = req.body.monthendtwo

        Monthend.findOneAndUpdate(
            { _id:req.params.id},
            { $set:monthendfile},
            { new :true}
        ).then(acc => res.json(acc))
    }
);

//删除
router.delete('/delete/:id',passport.authenticate('jwt',{session:false}),
    (req,res)=>{
        Monthend.findOneAndRemove({ _id: req.params.id})
            .then(acc =>{
                acc.save().then(acc => res.json(acc));
            })
            .catch(err => res.status(400).json('删除失败'))
    }
);



module.exports = router
