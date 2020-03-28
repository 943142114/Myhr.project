var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport')
var app = express();

// 引入users.js
var users = require('./router/api/routers');
var profiles = require('./router/api/profiles')
var accounts = require('./router/api/account')
var monthends = require('./router/api/monthends')



// DB config
// var db = require('./config/keys').mongoURI;

// 使用body-parser中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



//
// mongoose
//     .connect(
//         db,
//         { useNewUrlParser: true }
//     )
//     .then(() => console.log('MongoDB Connected'))
//     .catch(err => console.log(err));

//初始化passport 验证
app.use(passport.initialize())

mongoose.set('useFindAndModify', false)
// 使用routes
app.use('/api/users', users);
app.use('/api/profiles',profiles);
app.use('/api/accounts',accounts);
app.use('/api/monthends',monthends)


require('./config/passport')(passport)


var port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
