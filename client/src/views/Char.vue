<template>
    <div class="fillcontain ">

        <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 20px;">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: 'home' }">人事管理</el-breadcrumb-item>
            <el-breadcrumb-item >在线聊天</el-breadcrumb-item>
        </el-breadcrumb>
        <div>欢迎登录！{{user.name}}</div>

        <input type="text" v-model="msg">
        <button @click="sendata">发送</button>
        <div>{{fadatamsg}}</div>
        <div class="chatall">
            <div class="left">
                <img src="../assets/Chat.png" alt="" class="img1">
                <img src="../assets/list.png" alt="" class="img2">
            </div>

            <div class="center">
                <p class="centerspan">当前在线用户人</p>
                <hr>
            </div>

            <div class="right">
                <div></div>
                <div></div>
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
                fadatamsg:''
            }
        },
        computed: {
            user() {
                return this.$store.getters.user;
            }
        },

        //在挂载vue时就加载mounted,并且加载其中的socket
        mounted() {
            socket.on('notcie',function (iofo) {
                console.log('服务端'+iofo)
            }),

            //我就是那个新名字  用来接收服务端发来的东西
            socket.on('fad',ms =>{
                this.fadatamsg = ms.msg
            })
        },

        //vue页面中使用到的方法
        methods:{
            sendata(){
                //得到客户端要发的消息
                socket.emit('senddata', {
                    msg:this.msg
                })
            }
        }
    }
</script>

<style scoped>
    .fillcontain {
        width: 100%;
        height: 100%;
        padding: 16px;
        box-sizing: border-box;
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
        height: 100%;
        background-color: rgb(245,245,245);
    }
</style>

