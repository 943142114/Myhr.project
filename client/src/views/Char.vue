<template>
    <div class="fillcontain ">

        <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 20px;">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: 'home' }">人事管理</el-breadcrumb-item>
            <el-breadcrumb-item >在线聊天</el-breadcrumb-item>
        </el-breadcrumb>
        <div>欢迎登录！{{user.name}}</div>

        <div class="chatall">
            <div class="left">
                <img src="../assets/Chat.png" alt="" class="img1">
                <img src="../assets/list.png" alt="" class="img2">
            </div>

            <div class="center">
                <div class="onpeople">当前在线 &nbsp;{{onliechat}}&nbsp;人</div>
            </div>

            <div class="right" id="msgboxright">
                <div class="denglu"><span>{{user.name}}登录了...</span></div>

                <div><ul v-for="(item,i) in msg_list" class="ul01">
                    <li class="li1">{{item.name}}({{item.timeda}})说：</li>
                    <li class="li2">{{item.msg}}</li>
                </ul>
                </div>



<!--                <div id="xiaoxi" v-for="(item,i) in msg_list" class="xiaoxi">-->
<!--                    <div class="user">{{item.name}}({{item.timeda}})说：</div>-->
<!--                    <br>-->
<!--                    <div class="msgxiaoxi" id="xiaoxi1"><span>{{item.msg}}</span></div>-->
<!--                    -->
<!--                </div>-->
            </div>

            <div class="right_bottom">
                <textarea name="" id="" cols="30" rows="10" v-model="msg" class="inp1" placeholder="请输入内容"></textarea>
                <button @click="sendata" class="btn01">发送</button>
            </div>

        </div>
    </div>
</template>

<script>
    //v-text  v-model
    export default {
        name: "Char",
        data(){
            return{
                msg:'',
                chatname:name,
                fadatamsg:'',
                msg_list:[],
                onliechat:''
            }
        },
        computed: {
            user() {
                return this.$store.getters.user;
            }
        },
        updated() {


            // if (user.name == name){
            //     console.log('1256464865')
            // }
        },
        //在挂载vue时就加载mounted,并且加载其中的socket
        mounted() {
            var username = user.name
            // console.log(username)
            var box = document.getElementById('msgboxright')
            socket.on('notcie',function (iofo) {
                console.log('服务端'+iofo)
            }),
            //我就是那个新名字  用来接收服务端发来的东西
            socket.on('fad',ms =>{
                    this.msg_list.push(ms)
                    box.scrollTop = box.scrollHeight
            }),
            socket.on('onlie',obj=> {
                this.onliechat = obj.onlinenumber.toString()
                console.log('当前在线' + this.onliechat + '人')
            })
        },
        //vue页面中使用到的方法
        methods:{
            sendata(){

                //得到客户端要发的消息
                var name = this.user.name
                var timedata = new Date()
                var testtimedata =timedata.getHours() + ':'+ timedata.getMinutes() + ':' + timedata.getSeconds()
                // console.log(testtimedata)
                // console.log(name)

                socket.emit('senddata', {
                    msg:this.msg,
                    name:name,
                    timeda:testtimedata
                })
                this.msg = ''
            }

        }
    }
</script>

<style scoped>
    .onpeople{
        font-size: 24px;
        margin-left: 50px;
        margin-top: 20px;
    }
    .onpeople:hover{
        color: red;
    }
    .ul01{
        margin-left: 20px;
        margin-top: 22px;
    }
    .li2{
        width: 200px;
        height: 30px;
        background-color: rgb(159,230,90);
        color: black;
        line-height: 30px;
        font-size: 18px;
        border-radius: 100px;
        margin-top: 5px;
        text-indent: 1em;
    }
    .fillcontain {
        width: 100%;
        height: 100%;
        padding: 16px;
        box-sizing: border-box;
    }
    .denglu{
        width: 250px;
        border-radius: 200px;
        height: 30px;
        background-color: rgb(213,213,213);
        text-align: center;
        line-height: 30px;
        margin-left: 150px;
        margin-top: 20px;
        margin-bottom: 30px;
    }
    .user{
        width: 200px;
        height: 50px;
        margin-top: 20px;
        margin-left: 10px;
    }
    .msgxiaoxi span{
        font-size: 20px;
    }
    .msgxiaoxi{
        width: 300px;
        height: 40px;
        text-align: left;
        line-height: 40px;
        border-radius: 100px;
        text-overflow: ellipsis;
        white-space: nowrap;
        background-color: dodgerblue;
        text-indent: 1em;
        color: #eeeeee;
        float: left;
    }
    .xiaoxi{
        width: 560px;
        height: 300px;
    }
    .inp1{
        width: 581px;
        height: 120px;
        border: 0px;
        margin-top: 1px;
        font-size: 18px;
        font-weight: bold;
        text-indent: 1em;
        outline: none;
        background-color: rgb(245,245,245);
    }
    .inp1:hover{
        background-color: rgb(255,255,255);
    }
    .btn01{
        width: 70px;
        height: 25px;
        position: absolute;
        margin-top: 80px;
        margin-left: -90px;
    }
    textarea{
         resize:none;
    }
    button:hover{
        background-color:rgb(18,150,17);
        color: #eeeeee;
        font-weight: bold;
        border: 0px;
    }
    .centerspan{
        font-size: 18px;
        margin-left: 30px;
        margin-top: 16px;
    }
    .img1{
        width: 40px;
        height: 40px;
        margin-left: 13px;
        margin-top: 10px;
    }
    .img2{
        width: 24px;
        height: 20px;
        margin-top: 539px;
        margin-left: 21px;
    }
    .chatall{
        width: 900px;
        height: 640px;
        background-color: rgb(230,230,230);
        border-radius: 5px;
        margin: 0 auto;
        box-shadow: 0 0 10px 0px #999;
    }
    .chatall div{
        float: left;
    }
    .left{
        width: 65px;
        height: 100%;
        background-color: rgb(44,39,38);
        border-radius: 5px 0 0 5px;
    }
    .center{
        width: 250px;
        height: 100%;
        background-color: rgb(230,230,230);
    }
    .right{
        width: 585px;
        height: 515px;
        overflow-y:scroll;
        background-color: rgb(245,245,245);

    }
</style>

