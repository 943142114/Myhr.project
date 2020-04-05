var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport')
var app = express();

var http = require('http');
// 用http模块创建一个服务并把express的实例挂载上去
var server = http.Server(app);
// 引入socket.io并立即实例化，把server挂载上去
var io = require('socket.io')(server);

// 引入users.js
var users = require('./router/api/routers');
var profiles = require('./router/api/profiles')
var accounts = require('./router/api/account')
var monthends = require('./router/api/monthends')



io.on('connection', function(socket){
    console.log('已经连接!');
        socket.emit('notcie','测试消息')
    //on 获取到客户端发来的消息
    socket.on('senddata',res=>{
        //emit 给这消息起一个新的名字  发送到客户端
        io.emit('fad',res)
    })
});


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

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
