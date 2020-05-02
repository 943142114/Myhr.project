var express = require('express');
var router = express.Router();
var passport = require('passport');
var Message = require('../../models/Message');

// router.get('/test', (req, res) => {
//     res.json(req.body.wages)
// });


router.post('/add',passport.authenticate('jwt',{session:false}),
    (req,res)=>{
        const Messagefile ={}

        if (req.body.allhrmessages) Messagefile.allhrmessages = req.body.allhrmessages


        new Message(Messagefile).save().then(acc =>{
            res.json(acc)
        })
    }
);

//查找所有内容
router.get('/', passport.authenticate("jwt", {session: false}), (req, res) => {
    Message.find()
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
        Message.findOne({ _id: req.params.id })
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
        const Messagefile ={}

        if (req.body.allhrmessages) Messagefile.allhrmessages = req.body.allhrmessages
        Message.findOneAndUpdate(
            { _id:req.params.id},
            { $set:Messagefile},
            { new :true}
        ).then(acc => res.json(acc))
    }
);

//删除
router.delete('/delete/:id',passport.authenticate('jwt',{session:false}),
    (req,res)=>{
        Message.findOneAndRemove({ _id: req.params.id})
            .then(acc =>{
                acc.save().then(acc => res.json(acc));
            })
            .catch(err => res.status(400).json('删除失败'))
    }
);



module.exports = router
